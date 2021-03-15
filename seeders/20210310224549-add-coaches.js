'use strict';

const coach = require("../models/coach");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Coaches', [{
      firstName: 'Jake',
      lastName: 'Luecke',
      email: 'jake@gmail.com',
      specialty: 'Crossfit',
      password: '$2b$10$/8DySr9wBlA/.pg8Y4LsmOyNd2GMe4.zjjsDmMG.fBsmCIoWu6EOK', //password
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Kendall',
      lastName: 'Oliver',
      email: 'kendall@gmail.com',
      specialty: 'Power Lifting',
      password: '$2b$10$/8DySr9wBlA/.pg8Y4LsmOyNd2GMe4.zjjsDmMG.fBsmCIoWu6EOK', //password
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ...coaches
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
