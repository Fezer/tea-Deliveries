const Associate = require("../models/Associate");
const Client = require("../models/Client");
const Delivery = require("../models/Delivery");
const Motoboy = require("../models/Motoboy");
const sequelize = require("sequelize");

module.exports = {

    async createClient(req, res) {
        try {
            const { name, cnpj, address } = req.body;

            if (!name || !cnpj || !address) {
                return res.status(422).json({ msg: "Parametros 'name', 'cnpj', 'address' são obrigatórios" });
            }

            if (isNaN(name) && isNaN(address)) {
                const isNewClient = await Client.findOne({
                    where: { cnpj },
                });
                if (isNewClient) {
                    return res.status(403).json({ msg: "Cliente já foi cadastrado" });
                } else {
                    const client = await Client.create({
                        name,
                        cnpj,
                        address,
                    });
                    if (client)
                        return res.status(200).json({ msg: "Novo cliente foi adicionado" });
                    else
                        return res.status(404).json({ msg: "Não foi possível cadastrar novo cliente" });
                }
            } else {
                return res.status(422).json({ msg: "Tipos inválidos" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Não foi possível inserir os dados" });
        }
    },

    async listAllClients(req, res) {
        try {
            const clients = await Client.findAll();
            return res.status(200).json(clients);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Não foi possível recuperar os dados" });
        }
    },

    async listClient(req, res) {
        try {
            const { cnpj } = req.body;

            if (!cnpj) {
                return res.status(422).json({ msg: "Parametro 'cnpj' é obrigatório" });
            }

            const client = await Client.findOne({
                where: { cnpj },
            });

            if (client) {
                return res.status(200).json(client);
            } else {
                return res.status(400).json({ msg: "Não econtrado" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Não foi possível recuperar os dados" });
        }
    },

    async editClient(req, res) {
        try {
            const clientId = req.params.id;
            const client = req.body;

            if (!client.name && !client.cnpj && !client.address || !clientId) {
                return res.status(422).json({ msg: "Parametros 'name', 'cnpj', 'address', 'id' são obrigatórios" });
            }
            if (isNaN(client.name) || isNaN(client.address)) {
                const clientExists = await Client.findByPk(clientId);
                if (!clientExists) {
                    return res.status(404).json({ msg: "Cliente não encontrado" });
                } else {
                    await Client.update(client, {
                        where: { id: clientId },
                    });
                    return res.status(200).json({ msg: "Cliente atualizado com sucesso" });
                }
            } else {
                return res.status(500).json({ msg: "Não foi possível alterar os dados" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Não foi possível alterar os dados" });
        }
    },

    async removeClient(req, res) {
        try {
            const clientId = req.params.id;

            if (!clientId) {
                return res.status(422).json({ msg: "Parametro 'id' são obrigatórios" });
            }
            const clientExists = await Client.findByPk(clientId);
            if (!clientExists) {
                return res.status(404).json({ msg: "Cliente não encontrado" });
            } else {
                await Client.destroy({
                    where: { id: clientId },
                });
                return res.status(200).json({ msg: "Cliente excluído com sucesso" });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Não foi possível deletar o cliente" });
        }
    },

};