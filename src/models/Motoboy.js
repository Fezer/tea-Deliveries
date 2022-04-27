const Sequelize = require("sequelize");

class Motoboys extends Sequelize.Model{
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

module.exports = Motoboys;