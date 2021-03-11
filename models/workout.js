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
    type: DataTypes.STRING,
    work: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Workout',
  });
  return Workout;
};