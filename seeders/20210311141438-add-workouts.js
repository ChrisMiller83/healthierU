'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Workouts', [{
      exercise: 'squats',
      sets: 5,
      reps: 10,
      weight: 100,
      ClientId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      exercise: 'bench',
      sets: 3,
      reps: 5,
      weight: 90,
      ClientId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      exercise: 'pull-ups',
      sets: 3,
      reps: 5,
      weight: 100,
      ClientId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      exercise: 'push-ups',
      sets: 3,
      reps: 10,
      weight: 100,
      ClientId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      exercise: 'run',
      sets: 3,
      reps: 10,
      weight: 100,
      ClientId: 2,
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