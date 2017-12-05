/** @module api/models/task */

/**
 * Modelo de Tarefa
 * @typedef {Object} Task
 * @property {string} title Titulo da Tarefa
 * @property {BOOLEAN} archived Tarefa está arquivada
 * @property {DATE} finishDate Data de finalização da Tarefa
 */

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    done: DataTypes.BOOLEAN,
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    finishDate: DataTypes.DATE
  });

  Task.associate = ({ List }) => {
    Task.belongsTo(List, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Task;
};
