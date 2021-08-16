module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define(
    'History',
    {
      userEmail: {
        field: 'user_email',
        type: DataTypes.STRING,
        isEmail: true,
        primaryKey: true
      },
      chapterId: {
        field: 'chapter_id',
        type: DataTypes.INTEGER,
        primaryKey: true,
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
    },
    {
      tableName: 'HISTORY',
    },
  );

  History.associate = (models) => {
    History.belongsTo(models.Chapter, {
      as: 'chapter',
      foreignKey: 'chapterId',
      sourceKey: 'id',
    });

    History.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userEmail',
      sourceKey: 'email',
    });
  };

  return History;
};
