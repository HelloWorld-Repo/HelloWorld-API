'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('USER', {
      email: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        required: true,
        isEmail: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      birthday: {
        type: Sequelize.DATEONLY,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        required: true,
      },
      is_student: {
        type: Sequelize.BOOLEAN,
      },
      is_first_contact: {
        type: Sequelize.BOOLEAN,
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

  down: async (queryInterface) => queryInterface.dropTable('USER'),
};
