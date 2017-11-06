"use strict";

module.exports = (sequelize, { STRING, DATE }) => {
  const bcrypt = require("bcrypt");

  const User = sequelize.define("User", {
    username: STRING,
    password: STRING,
    lastLogout: DATE
  });

  User.hook("beforeCreate", async function hashPassword(user) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    user.lastLogout = user.createdAt;
  });

  User.hook("beforeSave", async function hashPassword(user) {
    if (user.changed("password")) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);

      user.password = hash;
    }
  });

  // User.beforeSave();

  User.associate = function({ Task, List }) {
    User.hasMany(Task);
    User.hasMany(List);
  };

  return User;
};
