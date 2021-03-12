'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workout extends Model {
    static associate(models) {
      Workout.belongsTo(models.Coach);
      Workout.belongsTo(models.Client);
    }
  };
  Workout.init({
    exercise: DataTypes.STRING,
    sets: DataTypes.INTEGER,
    reps: DataTypes.INTEGER,
    weight: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Workout',
  });
  return Workout;
};