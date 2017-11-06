"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: Sequelize.DATE
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable("Users");
  }
};