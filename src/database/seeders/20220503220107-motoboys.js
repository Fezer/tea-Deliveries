module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Motoboys",
      [
        {
          id: 4,
          name: "Motoboy 1",
          cpf: "111",
          password: "$2a$12$0pWQzXQlnowht82JPdVmFuNhfyD49xAN4oViOGOkTRUB/gbeMfy5C", //1234567a
          phone: "11111111",
        },
        {
          id: 5,
          name: "Motoboy 2",
          cpf: "222",
          password: "$2a$12$0pWQzXQlnowht82JPdVmFuNhfyD49xAN4oViOGOkTRUB/gbeMfy5C", //1234567a
          phone: "22222222",
        },
        {
          id: 6,
          name: "Motoboy 3",
          cpf: "333",
          password: "$2a$12$0pWQzXQlnowht82JPdVmFuNhfyD49xAN4oViOGOkTRUB/gbeMfy5C", //1234567a
          phone: "33333333",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Motoboys", null, {});
  },
};
