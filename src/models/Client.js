const Sequelize = require("sequelize");

class Client extends Sequelize.Model{
    static init(sequelize){
        super.init(
            {
                id:{
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV1,
                    primaryKey: true
                },
                name: Sequelize.STRING,
                cnpj: Sequelize.STRING,
                address: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
    }
    static associate(models){
        this.hasMany(models.Delivery, { foreignKey: "clientId" });
    }
}

module.exports = Client;