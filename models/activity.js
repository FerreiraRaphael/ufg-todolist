/** @module api/models/activity */

/**
 * Modelo de uma Atividade
 * @typedef {Object} Activity
 * @property {string} model Nome do Model que criou a atividade
 * @property {string} owner ID do criador da atividade
 * @property {string} description Descrição da atividade
 */
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    model: DataTypes.STRING,
    owner: DataTypes.STRING,
    description: DataTypes.STRING
  });

  return Activity;
};
