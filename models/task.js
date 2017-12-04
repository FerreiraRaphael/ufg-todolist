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
