module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Deliveries",
      [
        {
          clientId: 1,
          motoboyId: 1,
          associateId: 1,
          description: "Entrega 1",
          status: "Criada", //Premissa: toda a entrega nasce com o status "criada"
          value: 0.0, //Premissa: toda a entrega nasce com o valor zerado
        },
        {
          clientId: 1,
          motoboyId: 2,
          associateId: 2,
          description: "Entrega 2",
          status: "Criada", //Premissa: toda a entrega nasce com o status "criada"
          value: 0.0, //Premissa: toda a entrega nasce com o valor zerado
        },
        {
          clientId: 1,
          motoboyId: 3,
          associateId: 2,
          description: "Entrega 3",
          status: "Criada", //Premissa: toda a entrega nasce com o status "criada"
          value: 0.0, //Premissa: toda a entrega nasce com o valor zerado
        },
        {
          clientId: 2,
          motoboyId: 3,
          associateId: 2,
          description: "Entrega 4",
          status: "Criada", //Premissa: toda a entrega nasce com o status "criada"
          value: 0.0, //Premissa: toda a entrega nasce com o valor zerado
        },
        {
          clientId: 3,
          motoboyId: 1,
          associateId: 3,
          description: "Entrega 5",
          status: "Criada", //Premissa: toda a entrega nasce com o status "criada"
          value: 0.0, //Premissa: toda a entrega nasce com o valor zerado
        },
        {
          clientId: 3,
          motoboyId: 2,
          associateId: 1,
          description: "Entrega 6",
          status: "Criada", //Premissa: toda a entrega nasce com o status "criada"
          value: 0.0, //Premissa: toda a entrega nasce com o valor zerado
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Deliveries", null, {});
  },
};
