module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    model: DataTypes.STRING,
    owner: DataTypes.STRING,
    description: DataTypes.STRING
  });

  return Activity;
};
