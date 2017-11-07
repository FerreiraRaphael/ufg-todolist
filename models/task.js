module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    done: DataTypes.BOOLEAN
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
