const Sequelize = require("sequelize");

class Associate extends Sequelize.Model{
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
                password: Sequelize.STRING,
                address: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
    }
    static associate(models){
        this.hasMany(models.Delivery, { foreignKey: "associateId" });
    }
}

module.exports = Associate;