/* eslint-disable linebreak-style */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable(
    'FEEDBACK',
    {
      text: {
        type: Sequelize.TEXT,
        required: false,
      },
      liked: {
        type: Sequelize.BOOLEAN,
        required: true,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        required: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        required: true,
      },
      user_email: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        isEmail: true,
        unique: true,
        primaryKey: true,
        references: {
          model: {
            tableName: 'USER',
          },
          key: 'email',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
  ),

  down: async (queryInterface) => queryInterface.dropTable('FEEDBACK'),
};
