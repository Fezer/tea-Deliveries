const Associate = require("../models/Associate");
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
            const motorboysByAssociate = await Delivery.findAll({
                where: { associateId },
                group: ['motoboyId'],
                attributes: ['motoboyId']
            });
            if (!motorboysByAssociate) {
                return res.status(404).json({ msg: "Não foi possível encontrar entregas" })
            }

            const motoboyIdList = motorboysByAssociate.map((e) => e.motoboyId);

            console.log(motoboyIdList);
            var deliveriesByMotoboys = {};
            for (var id of motoboyIdList) {
                const deliveryByMotorboy = await Delivery.findAll({
                    where: {
                        associateId,
                        motoboyId: id
                    },
                    include: Client,
                    attributes: ['id', "description", "status", 'createdAt', 'updatedAt']
                });
                const add = { [id]: deliveryByMotorboy };
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
            const deliveryId = req.body;

            if (!deliveryId) {
                return res.status(422).json({ msg: 'Dados obrigatórios não foram preenchidos' });
            }

            const fetchDelivery = await Delivery.findByPk(deliveryId);

            if (!fetchDelivery) {
                return res.status(404).json({ msg: "Não foi possível encontrar entrega" })
            }

            if (motoboyId) {
                if (!delivery.value || isNaN(delivery.value)) {
                    return res.status(422).json({ msg: 'Dados obrigatórios não foram preenchidos' });
                } else {
                    await Client.update({ value: delivery.value , status: 'Concluida'}, {
                        where: { id: deliveryId },
                    });
                    return res.status(200).json({ msg: 'Dados atualizados!' });
                }
            }

            if (associateId) {
                if (!delivery.motoboyId && !delivery.clientId && !delivery.description && !delivery.value && delivery.status) {
                    return res.status(422).json({ msg: 'Nenhum Dado foi preenchido' });
                } else {
                    await Client.update(delivery, {
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

    },

};