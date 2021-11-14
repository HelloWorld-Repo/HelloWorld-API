module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('USER', 'class_id', {
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      references: {
        model: {
          tableName: 'CLASS',
        },
        key: 'id',
      },
    });
  },

  down(queryInterface) {
    return queryInterface.removeColumn('USER', 'class_id');
  },
};
