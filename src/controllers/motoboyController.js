const Motoboy = require("../models/Motoboy");
const bcrypt = require("bcryptjs");
const sequelize = require("sequelize");

function passwordValidation(password) {
    if (password.length < 8) {
      return "A senha deve possuir no mínimo 8 caracteres.";
    } else if (!password.match(/[a-zA-Z]/g)) {
      return "A senha deve conter no mínimo uma letra.";
    } else if (!password.match(/[0-9]+/)) {
      return "A senha deve conter no mínimo um número.";
    } else {
      return "OK";
    }
  }
  
  function hashPassword(password) {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

module.exports = {

    async createMotoboy(req, res) {
        try {
            const { name, cpf, password, confirmPassword, phone } = req.body;
            if (!name || !cpf || !password || !confirmPassword) {
              return res
                .status(404)
                .json({ msg: "Dados obrigatórios não foram preenchidos." });
            }
            if (password != confirmPassword) {
              return res
                .status(404)
                .json({ msg: "A senha e validação da senha não conferem" });
            }
      
            const passwordValid = passwordValidation(password);
            if (passwordValid != "OK") {
              return res.status(400).json({ msg: passwordValid });
            }
      
            const isMotoboyNew = await Motoboy.findOne({
              where: { cpf },
            });
      
            if (isMotoboyNew)
              return res.status(403).json({
                msg: "Motoboy já cadastrado ou já existe outro motoboy cadastrado com o mesmo cpf.",
              });
            else {
              const hash = hashPassword(password);
              const motoboy = await Motoboy.create({
                name,
                cpf,
                password: hash,
                phone,
              });
      
              if (motoboy)
                res.status(201).json({
                  msg: "Novo motoboy cadastrado com sucesso!",
                  motoboy: {
                    id: motoboy.id,
                    name: motoboy.name,
                    cpf: motoboy.cpf,
                    phone: motoboy.phone,
                  },
                });
              else
                res
                  .status(404)
                  .json({ msg: "Não foi possível cadastrar o novo motoboy :(" });
            }
          } catch (error) {
            console.log(error);
            return res.status(500).json({
              msg: "Isso é embaraçoso, mas ocorreu um erro inesperado no processamento da sua requisição :(",
            });
          }
    },
    
    async listAllMotoboys(req, res) {
        try {
            const motoboys = await Motoboy.findAll({
              attributes: ["id", "name", "cpf", "phone", "createdAt", "updatedAt"],
              order: [["name", "ASC"]],
            });
            if (!motoboys || motoboys == undefined) {
              return res
                .status(404)
                .json({ msg: "Não foi possível encontrar motoboys cadastrados." });
            } else {
              return res.status(200).json( motoboys );
            }
          } catch (error) {
            console.log(error);
            return res.status(500).json({
              msg: "Isso é embaraçoso, mas ocorreu um erro inesperado no processamento da sua requisição :(",
            });
          }
    },

    async listMotoboy(req, res) {
        try {
            const { cpf } = req.body;

            if (!cpf) {
                return res.status(422).json({ msg: "Parametro 'cpf' é obrigatório" });
            }

            const motoboy = await Motoboy.findOne({
                attributes: ["id", "name", "cpf", "phone", "createdAt", "updatedAt"],
                where: { cpf },
            });

            if (motoboy) {
                return res.status(200).json(motoboy);
            } else {
                return res.status(400).json({ msg: "Não econtrado" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Isso é embaraçoso, mas ocorreu um erro inesperado no processamento da sua requisição :(" });
        }
    },

    async editMotoboy(req, res) {
        try {
            const motoboyId = req.params.id;
            const motoboy = req.body;

            console.log(motoboyId);
            if (!motoboy.name && !motoboy.cpf && !motoboy.phone || !motoboyId) {
                return res.status(422).json({ msg: "Parametros 'name', 'cpf', 'phone', 'id' são obrigatórios" });
            }
            if (isNaN(motoboy.name) || isNaN(motoboy.phone)) {
                const motoboyExists = await Motoboy.findByPk(motoboyId);
                if (!motoboyExists) {
                    return res.status(404).json({ msg: "Motoboy não encontrado" });
                } else {
                    await Motoboy.update(motoboy, {
                        where: { id: motoboyId },
                    });
                    return res.status(200).json({ msg: "Motoboy atualizado com sucesso" });
                }
            } else {
                return res.status(500).json({ msg: "Não foi possível alterar os dados" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Não foi possível alterar os dados" });
        }
    },

    async removeMotoboy(req, res) {
        try {
            const motoboyId = req.params.id;
            const motoboy = await Motoboy.findByPk(motoboyId);
            if (!motoboy) {
              return res.status(404).json({
                msg: "Não foi encontrado um motoboy relacionado ao id informado.",
                motoboyId,
              });
            } else {
              await Motoboy.destroy({
                where: { id:motoboyId },
              });
              return res.status(200).json({
                msg: "O motoboy foi excluído.",
                atencao:
                  "Caso houvessem registros de entregas relacionadas ao motoboy, esses registros também foram excluídos.",
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