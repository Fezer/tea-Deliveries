const Associate = require("../models/Associate");
const Client = require("../models/Client");
const Delivery = require("../models/Delivery");
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
  async createAssociate(req, res) {
    try {
      const { name, cnpj, password, passwordConf, address } = req.body;
      if (!name || !cnpj || !password || !passwordConf) {
        return res
          .status(404)
          .json({ msg: "Dados obrigatórios não foram preenchidos." });
      }
      if (password != passwordConf) {
        return res
          .status(404)
          .json({ msg: "A senha e validação da senha não conferem" });
      }

      const passwordValid = passwordValidation(password);
      if (passwordValid != "OK") {
        return res.status(400).json({ msg: passwordValid });
      }

      const isAssiciateNew = await Associate.findOne({
        where: { cnpj },
      });

      if (isAssiciateNew)
        return res.status(403).json({
          msg: "Associado já cadastrado ou já existe outro associado cadastrado com o mesmo CNPJ.",
        });
      else {
        const hash = hashPassword(password);
        const associate = await Associate.create({
          name,
          cnpj,
          passwordConf: hash,
          address,
        });

        if (associate)
          res
            .status(201)
            .json({ msg: "Novo associado cadastrado com sucesso!", associate });
        else
          res
            .status(404)
            .json({ msg: "Não foi possível cadastrar o novo associado :(" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Isso é embaraçoso, mas ocorreu um erro inesperado no processamento da sua requisição :(",
      });
    }
  },

  async listAllAssociates(req, res) {
    try {
      const associates = await Associate.findAll({
        attributes: [ "id", "name", "cnpj", "address", "createdAt", "updatedAt" ],
        order: [["name", "ASC"]],
      });
      if (!associates || associates == undefined) {
        return res
          .status(404)
          .json({ msg: "Não foi possível encontrar associados cadastrados." });
      } else {
        return res.status(200).json({ associates });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Isso é embaraçoso, mas ocorreu um erro inesperado no processamento da sua requisição :(",
      });
    }
  },

  async listAssociate(req, res) {
    try {
      const name = req.body.name;
      if (!name)
        return res.status(404).json({
          msg: "Nome do associado deve ser informado para ser consultado.",
        });

      const associate = await Associate.findAll({
        where: { name },
      });
      if (!associate || associate == undefined) {
        return res.status(404).json({
          msg: "Não foi possível encontrar nenhum associado cadastrado com o nome informado.",
        });
      } else {
        if (associate.length > 1) {
          return res.status(200).json({
            msg: "Encontramos mais de um associado cadastrado com este nome.",
            associate,
          });
        }
        return res.status(200).json({
          associate,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Isso é embaraçoso, mas ocorreu um erro inesperado no processamento da sua requisição :(",
      });
    }
  },

  async editAssociate(req, res) {
    try {
      const { name, cnpj, address } = req.body;

      if (!cnpj) {
        return res.status(400).json({
          msg: "É necessário informar o CNPJ do associado que se deseja editar.",
        });
      }

      if (!name) {
        return res
          .status(400)
          .json({ msg: "Dados do associado não foram preenchidos." });
      } else {
        const associate = await Associate.findOne({ where: { cnpj } });
        if (!associate) {
          return res.status(404).json({
            msg: "Não foi possível encontrar nenhum associado cadastrado com o CNPJ informado.",
          });
        } else {
          await Associate.update(
            { name, address },
            {
              where: { cnpj },
            }
          );
          return res
            .status(200)
            .json({ msg: "Dados do associado atualizados com sucesso." });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Isso é embaraçoso, mas ocorreu um erro inesperado no processamento da sua requisição :(",
      });
    }
  },

  async removeAssociate(req, res) {},
};
