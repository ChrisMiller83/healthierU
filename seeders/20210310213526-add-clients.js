'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Clients', [{
      firstName: 'Chris',
      lastName: 'Miller',
      email: 'chris@gmail.com',
      password: '$2b$10$/8DySr9wBlA/.pg8Y4LsmOyNd2GMe4.zjjsDmMG.fBsmCIoWu6EOK', //password
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Willie',
      lastName: 'Rose',
      email: 'willie@gmail.com',
      password: '$2b$10$/8DySr9wBlA/.pg8Y4LsmOyNd2GMe4.zjjsDmMG.fBsmCIoWu6EOK', //password
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]) 
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
