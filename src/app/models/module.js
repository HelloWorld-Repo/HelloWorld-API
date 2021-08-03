module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define(
    'Module',
    {
      position: { primaryKey: true, type: DataTypes.INTEGER },
      title: DataTypes.STRING,
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'MODULE',
    },
  );

  return Module;
};
