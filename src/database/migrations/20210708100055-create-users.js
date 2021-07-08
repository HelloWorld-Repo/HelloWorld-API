'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('users', {
    email: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password_hash: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_admin: {
      type: Sequelize.BOOLEAN,
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

  down: async (queryInterface) => queryInterface.dropTable('users'),
};
