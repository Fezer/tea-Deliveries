const Sequelize = require("sequelize");

class Delivery extends Sequelize.Model{
    static init(sequelize){
        super.init(
            {

            },
            {
                sequelize,
            }
        );
    }
    static associate(models){
        
    }
}

module.exports = Delivery;