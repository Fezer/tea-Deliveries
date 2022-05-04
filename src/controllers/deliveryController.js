const Client = require("../models/Client");
const Delivery = require("../models/Delivery");
const Motoboy = require("../models/Motoboy");
const Sequelize = require("sequelize");

module.exports = {

    async createDelivery(req, res) {
        try {
            const { description, clientId, motoboyId } = req.body;
            if (!description || !clientId || !motoboyId) {
                return res
                    .status(404)
                    .json({ msg: "Dados obrigatórios não foram preenchidos." });
            }

            else {
                const delivery = await Delivery.create({
                    description,
                    clientId,
                    motoboyId,
                    associateId: req.associateId,
                    status: 'Criada',
                    value: 0.0,
                });

                if (delivery)
                    return res.status(201).json({
                        msg: "Novo delivery criado com sucesso!"
                    });
                else
                    return res
                        .status(404)
                        .json({ msg: "Não foi possível criar o novo delivery :(" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "Isso é embaraçoso, mas ocorreu um erro inesperado no processamento da sua requisição :(",
            });
        }
    },

    async listAllDeliveries(req, res) {
        try {
            let deliveries;
            if (!req.associateId) {
                deliveries = await Delivery.findAll({ where: { motoboyId: req.motoboyId }, include: Client });
            } else {
                deliveries = await Delivery.findAll({ where: { associateId: req.associateId }, include: [Motoboy, Client] });
            }

            if (deliveries) {
                return res.status(200).json(deliveries);
            }
            else
                return res.status(404).json({ msg: "Não foi possível encontrar entregas com o id passado" })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "Isso é embaraçoso, mas ocorreu um erro inesperado no processamento da sua requisição :(",
            });
        }
    },

    async listAllDoneDeliveries(req, res) {
        try {
            let motoboyId = req.motoboyId;
            if (!motoboyId && req.associateId) {
                if (!req.body.motoboyId) {
                    return res
                        .status(404)
                        .json({ msg: "Dados obrigatórios não foram preenchidos." });
                }
                motoboyId = req.body.motoboyId;
            }
            const deliveries = await Delivery.findAll({ where: { motoboyId, status: 'Concluida' }, include: Client });

            if (deliveries) {
                return res.status(200).json(deliveries);
            }
            else
                return res.status(404).json({ msg: "Não foi possível encontrar entregas concluidas para o motoboy" })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "Isso é embaraçoso, mas ocorreu um erro inesperado no processamento da sua requisição :(",
            });
        }
    },

    async listAllPendingDeliveries(req, res) {
        try {
            let deliveries;
            if (!req.associateId) {
                deliveries = await Delivery.findAll({ where: { motoboyId: req.motoboyId, status: 'Criada' }, include: Client });
            } else {
                deliveries = await Delivery.findAll({ where: { associateId: req.associateId, status: 'Criada' }, include: [Motoboy, Client] });
            }
            if (deliveries) {
                return res.status(200).json(deliveries);
            }
            else
                return res.status(404).json({ msg: "Não foi possível encontrar entregas pendentes para o motoboy" })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "Isso é embaraçoso, mas ocorreu um erro inesperado no processamento da sua requisição :(",
            });
        }
    },

    async listAllDeliveriesByMotoboy(req, res) {
        try {
            const associateId = req.associateId;
            const motoboysByAssociate = await Delivery.findAll({
                where: { associateId },
                group: ['motoboyId'],
                attributes: ['motoboyId']
            });
            if (!motoboysByAssociate) {
                return res.status(404).json({ msg: "Não foi possível encontrar entregas" })
            }

            const motoboyIdList = motoboysByAssociate.map((e) => e.motoboyId);

            var deliveriesByMotoboys = {};
            for (var id of motoboyIdList) {
                const deliveryBymotoboy = await Delivery.findAll({
                    where: {
                        associateId,
                        motoboyId: id
                    },
                    include: Client,
                    attributes: ['id', "description", "status", 'createdAt', 'updatedAt']
                });
                const add = { [id]: deliveryBymotoboy };
                const deliveries = { ...deliveriesByMotoboys, ...add };
                deliveriesByMotoboys = deliveries;
            }

            if (deliveriesByMotoboys) {
                return res.status(200).json(deliveriesByMotoboys);
            }
            else
                return res.status(404).json({ msg: "Não foi possível encontrar entregas" })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "Isso é embaraçoso, mas ocorreu um erro inesperado no processamento da sua requisição :(",
            });
        }
    },

    async editPendingDelivery(req, res) {
        try {
            const associateId = req.associateId;
            const motoboyId = req.motoboyId;
            const delivery = req.body;
            const deliveryId = req.params.id;
            console.log(deliveryId)

            if (!deliveryId) {
                return res.status(422).json({ msg: 'Dados obrigatórios não foram preenchidos' });
            }

            const fetchDelivery = await Delivery.findByPk(deliveryId);
            console.log(fetchDelivery)

            if (!fetchDelivery) {
                return res.status(404).json({ msg: "Não foi possível encontrar entrega" })
            }

            if (motoboyId) {
                console.log(delivery.value);
                if (!delivery.value || isNaN(delivery.value)) {
                    return res.status(422).json({ msg: 'Dados obrigatórios não foram preenchidos' });
                } else {
                    const newDelivery = { status: 'Concluída', value: delivery.value };
                    const test = await Delivery.update(newDelivery, {
                        where: { id: deliveryId },
                    });
                    console.log(test);
                    return res.status(200).json({ msg: 'Dados atualizados!' });
                }
            }

            if (associateId) {
                if (!delivery.motoboyId && !delivery.clientId && !delivery.description && !delivery.value && delivery.status) {
                    return res.status(422).json({ msg: 'Nenhum Dado foi preenchido' });
                } else {
                    await Delivery.update(delivery, {
                        where: { id: deliveryId },
                    });
                    return res.status(200).json({ msg: 'Dados atualizados!' });
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "Isso é embaraçoso, mas ocorreu um erro inesperado no processamento da sua requisição :(",
            });
        }
    },

    async removePendingDelivery(req, res) {
        try {
            const deliveryId = req.params.id;
            const delivery = await Delivery.findByPk(deliveryId);
            if (!delivery) {
                return res.status(404).json({
                    msg: "Não foi encontrado um delivery relacionado ao id informado.",
                    deliveryId,
                });
            } else {
                if (delivery.status != 'Concluída') {
                    await Delivery.destroy({
                        where: { id: deliveryId },
                    });
                    return res.status(200).json({
                        msg: "O delivery foi excluído.",
                        atencao:
                            "Caso houvessem registros de entregas relacionadas ao delivery, esses registros também foram excluídos.",
                    });
                }
                return res.status(403).json({
                    msg: "Delivery já concluído",
                    deliveryId,
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "Isso é embaraçoso, mas ocorreu um erro inesperado no processamento da sua requisição :(",
            });
        }
    },
};