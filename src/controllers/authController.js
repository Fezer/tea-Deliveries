const Associate = require("../models/Associate");
const Client = require("../models/Client");
const Motoboy = require("../models/Motoboy");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function generateToken(id, type) {
    process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
    const token = jwt.sign({ id, type }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return token;
}

module.exports = {
    async login(req, res) {
        const { cnpj, cpf, password } = req.body;
        if (cpf) {
            const motoboy = await Motoboy.findOne({ where: { cpf } });
            if (!motoboy) {
                return res.status(404).json({ msg: 'Nenhum usuario encontrado com esse CPF' });
            } else {
                if (bcrypt.compareSync(password, motoboy.password)) {
                    const token = generateToken(motoboy.id, 'motoboy');
                    return res.status(200).json({ msg: 'Usuario autenticado com sucesso!', token });
                } else {
                    return res.status(401).json({ msg: 'Senha incorreta' });
                }
            }
        }
        if (cnpj) {
            const associate = await Associate.findOne({ where: { cnpj } });
            if (!associate) {
                return res.status(404).json({ msg: 'Nenhum usuario encontrado com esse CNPJ' });
            } else {
                if (bcrypt.compareSync(password, associate.password)) {
                    const token = generateToken(associate.id, 'associate');
                    return res.status(200).json({ msg: 'Usuario autenticado com sucesso!', token });
                } else {
                    return res.status(401).json({ msg: 'Senha incorreta' });
                }
            }
        }
    },
    async logout(req, res) {
        process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
        return res.status(200).json({ msg: 'Usuario deslogou!' });
    }
};