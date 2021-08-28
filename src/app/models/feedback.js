module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define(
    'Feedback',
    {
      text: {
        type: DataTypes.TEXT,
        required: false,
      },
      liked: {
        type: DataTypes.BOOLEAN,
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
      userEmail: {
        field: 'user_email',
        type: DataTypes.STRING,
        required: true,
        primaryKey: true,
        references: {
          model: {
            tableName: 'USER',
          },
          key: 'email',
        },
      },
    },
    {
      tableName: 'FEEDBACK',
    },
  );

  Feedback.associate = (models) => {
    Feedback.hasOne(models.User, {
      as: 'user',
      foreignKey: 'email',
      sourceKey: 'userEmail',
    });
  };

  return Feedback;
};
