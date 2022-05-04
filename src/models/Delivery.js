const Sequelize = require("sequelize");

class Delivery extends Sequelize.Model{
    static init(sequelize){
        super.init(
            {
                associateId: Sequelize.INTEGER,
                clientId: Sequelize.INTEGER,
                motoboyId: Sequelize.INTEGER,
                description: Sequelize.STRING,
                status: Sequelize.STRING,
                value: Sequelize.FLOAT,
            },
            {
                sequelize,
            }
        );
    }
    static associate(models){
        this.belongsTo(models.Associate, { foreignKey: "associateId"});
        this.belongsTo(models.Client, { foreignKey: "clientId"});
        this.belongsTo(models.Motoboy, { foreignKey: "motoboyId"});
    }
}

module.exports = Delivery;