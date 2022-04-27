const Sequelize = require("sequelize");

class Motoboy extends Sequelize.Model{
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

module.exports = Motoboy;