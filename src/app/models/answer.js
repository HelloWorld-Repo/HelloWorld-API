module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    'Answer',
    {
      correctedAnswer: {
        field: 'corrected_answer',
        type: DataTypes.BOOLEAN,
        allowNull: false,
        required: true,
      },
      userEmail: {
        field: 'user_email',
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        references: {
          model: {
            tableName: 'USER',
          },
          key: 'email',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      questionId: {
        field: 'question_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        primaryKey: true,
        references: {
          model: {
            tableName: 'QUESTION',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: false,
        required: true,
      },
      updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
        allowNull: false,
        required: true,
      },
    },
    {
      tableName: 'ANSWER',
    }
  );

  return Answer;
};
