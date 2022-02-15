module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.renameColumn(
      'USER',
      'is_student',
      'research_participant',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        required: true,
      }
    );
  },

  down(queryInterface) {
    return queryInterface.renameColumn(
      'USER',
      'research_participant',
      'is_student'
    );
  },
};
