module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('USER', 'reset_pass', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      required: true,
    });
  },
  down(queryInterface) {
    return queryInterface.removeColumn('USER', 'reset_pass');
  },
};
