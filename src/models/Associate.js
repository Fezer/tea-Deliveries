const Sequelize = require("sequelize");

class Associate extends Sequelize.Model{
    static init(sequelize){
        super.init(
            {
                id: Sequelize.INTEGER,
                name: Sequelize.INTEGER,
                cnpj: Sequelize.DATE,
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