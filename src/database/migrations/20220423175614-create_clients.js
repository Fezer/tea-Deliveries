'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Clients", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Clients");
  },
};
