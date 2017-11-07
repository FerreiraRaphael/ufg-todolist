module.exports = {
  up(migration, Sequelize) {
    return [
      migration.addColumn('Users', 'password', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      migration.addColumn('Users', 'lastLogout', {
        type: Sequelize.DATE
      })
    ];
  },
  down(migration, Sequelize) {
    return [
      migration.removeColumn('Users', 'password'),
      migration.removeColumn('Users', 'lastLogout')
    ];
  }
};
