'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Deliveries", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      clientId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Clients", key: "id"},
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      },
      motoboyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Motoboys", key: "id"},
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      },
      associateId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Associates", key: "id"},
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      value: {
        type: Sequelize.FLOAT,
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
