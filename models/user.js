/** @module api/models/user */

const bcrypt = require('bcrypt');

/**
 * Modelo de Usuário
 * @typedef {Object} User
 * @property {string} username Nome de usuário
 * @property {string} password Senha do Usuário
 * @property {DATE} lastLogout Ultima vez que usuário saiu do sistema
 */
module.exports = (sequelize, { STRING, DATE }) => {
  const User = sequelize.define('User', {
    username: STRING,
    password: STRING,
    lastLogout: DATE
  });

  /* eslint-disable no-param-reassign */
  User.hook('beforeCreate', async user => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    user.lastLogout = user.createdAt;
  });

  User.hook('beforeSave', async user => {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);

      user.password = hash;
    }
  });
  /* eslint-enable no-param-reassign */

  User.associate = ({ Task, List }) => {
    User.hasMany(Task);
    User.hasMany(List);
  };

  return User;
};
