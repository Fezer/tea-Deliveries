const Sequelize = require("sequelize");
const dbConfig = require("./config/dbconfig");
const Client = require("../models/Client");
const Delivery = require("../models/Delivery");
const Associate = require("../models/Associate");
const Motoboy = require("../models/Motoboy");
const connection = new Sequelize(dbConfig);

Client.init(connection);
Delivery.init(connection);
Associate.init(connection);
Motoboy.init(connection);

Client.associate(connection.models);
Delivery.associate(connection.models);
Associate.associate(connection.models);
Motoboy.associate(connection.models);

module.exports = connection;
