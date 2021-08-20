module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('HISTORY', {
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      required: true,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
      required: true,
    },
    user_email: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      required: true,
      isEmail: true,
      references: {
        model: {
          tableName: 'USER',
        },
        key: 'email',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    chapter_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      required: true,
      references: {
        model: {
          tableName: 'CHAPTER',
        },
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('History'),
};
