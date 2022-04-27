'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Deliveries", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Clients", key: "id"},
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
      },
      motoboyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Motoboys", key: "id"},
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
      },
      associateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Associates", key: "id"},
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      value: {
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
    await queryInterface.dropTable("Deliveries");
  },
};
