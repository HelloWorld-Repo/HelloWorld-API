/* eslint-disable linebreak-style */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable(
      'CHAPTER',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          required: true,
        },
        position: {
          type: Sequelize.INTEGER,
          allowNull: false,
          required: true,
          unique: 'actions_unique',
        },
        title: {
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
        module_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          required: true,
          references: {
            model: {
              tableName: 'MODULE',
            },
            key: 'id',
            onDelete: '',
            onUpdate: '',
          },
          unique: 'actions_unique',
        },
      },
      {
        uniqueKeys: {
          actions_unique: {
            fields: ['module_id', 'position'],
          },
        },
      },
    ),

  down: async (queryInterface) => queryInterface.dropTable('CHAPTER'),
};
