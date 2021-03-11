'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Workouts', [{
      type: 'Legs',
      work: '10 squats',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      type: 'Arms',
      work: '10 push-ups',
      ClientId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
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
}