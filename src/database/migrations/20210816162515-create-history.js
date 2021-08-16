module.exports = {
  up: (queryInterface, Sequelize) => {
    // Product belongsToMany Tag
    return queryInterface.createTable(
      'HISTORY',
      {
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          allowNull: false,
          required: true,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          allowNull: false,
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
            onDelete: 'cascade',
            onUpdate: 'cascade',
          },
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
            onDelete: 'cascade',
            onUpdate: '',
          },
        },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    // remove table
    return queryInterface.dropTable('History');
  },
};