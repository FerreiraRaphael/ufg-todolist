module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    title: DataTypes.STRING
  });

  List.associate = ({ User, Task }) => {
    List.belongsTo(User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    List.hasMany(Task);
  };
  return List;
};
