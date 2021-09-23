const { questionTypesEnum } = require('../enums');

module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define(
    'Question',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        required: true,
      },
      type: {
        type: DataTypes.ENUM(...questionTypesEnum),
        allowNull: false,
        required: true,
      },
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        required: true,
        allowNull: false,
      },
      updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
        required: true,
        allowNull: false,
      },
    },
    {
      tableName: 'QUESTION',
    }
  );

  Module.associate = (models) => {
    Module.hasMany(models.Chapter, {
      as: 'options',
      foreignKey: 'questionId',
    });
  };

  return Module;
};
