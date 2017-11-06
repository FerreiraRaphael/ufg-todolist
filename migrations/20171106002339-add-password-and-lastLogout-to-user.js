"use strict";

module.exports = {
  up: (migration, Sequelize) => [
    migration.addColumn("Users", "password", {
      type: Sequelize.STRING,
      allowNull: false
    }),
    migration.addColumn("Users", "lastLogout", {
      type: Sequelize.DATE
    })
  ],
  down: (migration, Sequelize) => [
    migration.removeColumn("Users", "password"),
    migration.removeColumn("Users", "lastLogout")
  ]
};
