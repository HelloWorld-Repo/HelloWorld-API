const { questionTypesEnum } = require('../enums');

module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
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
      chapterId: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false,
        references: {
          model: {
            tableName: 'CHAPTER',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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

  Question.associate = (models) => {
    Question.hasMany(models.Option, {
      as: 'options',
      foreignKey: 'questionId',
    });

    Question.belongsTo(models.Chapter, {
      foreignKey: 'chapterId',
      targetKey: 'id',
    });
  };

  return Question;
};
