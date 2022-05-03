module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Associates",
      [
        {
          name: "Associado 1",
          cnpj: "111",
          password: "$2a$12$0pWQzXQlnowht82JPdVmFuNhfyD49xAN4oViOGOkTRUB/gbeMfy5C", //1234567a
          address: "Rua do associado 1",
        },
        {
          name: "Associado 2",
          cnpj: "222",
          password: "$2a$12$0pWQzXQlnowht82JPdVmFuNhfyD49xAN4oViOGOkTRUB/gbeMfy5C", //1234567a
          address: "Rua do associado 2",
        },
        {
          name: "Associado 3",
          cnpj: "333",
          password: "$2a$12$0pWQzXQlnowht82JPdVmFuNhfyD49xAN4oViOGOkTRUB/gbeMfy5C", //1234567a
          address: "Rua do associado 3",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Associates", null, {});
  },
};
