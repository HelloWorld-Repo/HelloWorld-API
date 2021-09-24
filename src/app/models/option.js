module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define(
    'Option',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        required: true,
      },
      isRight: {
        field: 'is_right',
        type: DataTypes.BOOLEAN,
        allowNull: false,
        required: true,
      },
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
        required: true,
      },
      questionId: {
        field: 'question_id',
        type: DataTypes.INTEGER,
        required: true,
        references: {
          model: {
            tableName: 'QUESTION',
          },
          key: 'id',
        },
      },
      answered: {
        type: DataTypes.VIRTUAL,
      },
    },
    {
      tableName: 'OPTION',
    }
  );

  Option.associate = (models) => {
    Option.belongsTo(models.Question, {
      foreignKey: 'questionId',
      targetKey: 'id',
    });
  };

  return Option;
};
