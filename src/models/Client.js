const Sequelize = require("sequelize");

class Client extends Sequelize.Model{
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

module.exports = Client;