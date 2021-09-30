/* eslint-disable linebreak-style */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable(
    'ANSWER',
    {
      corrected_answer: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        required: true,
      },
      user_email: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        references: {
          model: {
            tableName: 'USER',
          },
          key: 'email',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
        primaryKey: true,
        references: {
          model: {
            tableName: 'QUESTION',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
    },
  ),

  down: async (queryInterface) => queryInterface.dropTable('ANSWER'),
};
