/* eslint-disable linebreak-style */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('MODULE', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),
  down: async (queryInterface) => queryInterface.dropTable('MODULE'),
};
