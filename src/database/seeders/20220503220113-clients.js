module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Clients",
      [
        {
          id: 1,
          name: "Cliente 1",
          cnpj: "111",
          address: "Rua do cliente 1",
        },
        {
          id: 2,
          name: "Cliente 2",
          cnpj: "222",
          address: "Rua do cliente 2",
        },
        {
          id: 3,
          name: "Cliente 3",
          cnpj: "333",
          address: "Rua do cliente 3",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Clients", null, {});
  },
};
