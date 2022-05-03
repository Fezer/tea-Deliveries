const Sequelize = require("sequelize");

class Associate extends Sequelize.Model{
    static init(sequelize){
        super.init(
            {
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
        this.belongsTo(models.Delivery, { foreignKey: "associateId" });
    }
}

module.exports = Associate;