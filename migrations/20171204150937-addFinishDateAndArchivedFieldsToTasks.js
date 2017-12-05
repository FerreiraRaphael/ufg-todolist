module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .addColumn('Tasks', 'finishDate', {
        type: Sequelize.DATE
      })
      .then(() =>
        queryInterface.addColumn('Tasks', 'archived', {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        })
      ),

  down: queryInterface =>
    queryInterface
      .removeColumn('Tasks', 'finishDate')
      .then(() => queryInterface.removeColumn('Tasks', 'archived'))
};
