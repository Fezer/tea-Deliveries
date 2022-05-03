const Sequelize = require("sequelize");

class Delivery extends Sequelize.Model{
    static init(sequelize){
        super.init(
            {
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
        this.hasMany(models.Associate, { foreignKey: "associateId"});
        this.hasMany(models.Client, { foreignKey: "clientId"});
        this.hasMany(models.Motoboy, { foreignKey: "motoboyId"});
    }
}

module.exports = Delivery;