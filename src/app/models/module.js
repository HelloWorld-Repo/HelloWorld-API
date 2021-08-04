module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define(
    'Module',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      position: { type: DataTypes.INTEGER, unique: true },
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
    }
  );

  return Module;
};
