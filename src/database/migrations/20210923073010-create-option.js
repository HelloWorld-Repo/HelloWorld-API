/* eslint-disable linebreak-style */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable(
    'OPTION',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        required: true,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
        required: true,
      },
      is_right: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        required: true,
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
      question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
        references: {
          model: {
            tableName: 'QUESTION',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
  ),

  down: async (queryInterface) => queryInterface.dropTable('OPTION'),
};
