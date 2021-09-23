/* eslint-disable linebreak-style */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('QUESTION', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        required: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        required: true,
      },
      type: {
        type: Sequelize.ENUM('1', '2', '3'),
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
    }),
  down: async (queryInterface) => queryInterface.dropTable('QUESTION'),
};
