"use strict";
module.exports = function(sequelize, DataTypes) {
  var List = sequelize.define("List", {
    title: DataTypes.STRING
  });

  List.associate = function({ User, Task }) {
    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Task.belongsTo(models.User);
    List.belongsTo(User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    List.hasMany(Task);
  };
  return List;
};
