/* eslint-disable linebreak-style */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('CLASS', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        required: true,
      },
      name: {
        type: Sequelize.STRING,
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
  down: async (queryInterface) => queryInterface.dropTable('CLASS'),
};
