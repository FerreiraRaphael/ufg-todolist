module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Lists', 'archived', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }),

  down: queryInterface => queryInterface.removeColumn('Lists', 'archived')
};
