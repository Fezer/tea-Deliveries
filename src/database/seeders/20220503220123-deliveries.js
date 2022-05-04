module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Deliveries",
      [
        {
          id: 10,
          clientId: 1,
          motoboyId: 4,
          associateId: 7,
          description: "Entrega 1",
          status: "Criada", //Premissa: toda a entrega nasce com o status "criada"
          value: 0.0, //Premissa: toda a entrega nasce com o valor zerado
        },
        {
          id: 11,
          clientId: 1,
          motoboyId: 5,
          associateId: 8,
          description: "Entrega 2",
          status: "Criada", //Premissa: toda a entrega nasce com o status "criada"
          value: 0.0, //Premissa: toda a entrega nasce com o valor zerado
        },
        {
          id: 12,
          clientId: 1,
          motoboyId: 6,
          associateId: 8,
          description: "Entrega 3",
          status: "Criada", //Premissa: toda a entrega nasce com o status "criada"
          value: 0.0, //Premissa: toda a entrega nasce com o valor zerado
        },
        {
          id: 13,
          clientId: 2,
          motoboyId: 6,
          associateId: 8,
          description: "Entrega 4",
          status: "Criada", //Premissa: toda a entrega nasce com o status "criada"
          value: 0.0, //Premissa: toda a entrega nasce com o valor zerado
        },
        {
          id: 14,
          clientId: 3,
          motoboyId: 4,
          associateId: 9,
          description: "Entrega 5",
          status: "Criada", //Premissa: toda a entrega nasce com o status "criada"
          value: 0.0, //Premissa: toda a entrega nasce com o valor zerado
        },
        {
          id: 15,
          clientId: 3,
          motoboyId: 5,
          associateId: 7,
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
