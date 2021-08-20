module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define(
    'Chapter',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true,
      },
      position: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false,
      },
      title: { type: DataTypes.STRING, required: true, allowNull: false },
      explanation: { type: DataTypes.TEXT, required: true },
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
        required: true,
      },
      moduleId: {
        field: 'module_id',
        type: DataTypes.INTEGER,
        required: true,
        references: {
          model: {
            tableName: 'MODULE',
          },
          key: 'id',
        },
      },
      done: {
        type: DataTypes.VIRTUAL,
      },
    },
    {
      tableName: 'CHAPTER',
    },
  );

  Chapter.associate = (models) => {
    Chapter.hasOne(models.Module, {
      as: 'module',
      foreignKey: 'id',
      sourceKey: 'moduleId',
    });
  };

  return Chapter;
};
