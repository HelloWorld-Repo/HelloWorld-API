module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define(
    'Module',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true,
        allowNull: false,
      },
      position: {
        type: DataTypes.INTEGER,
        unique: true,
        required: true,
        allowNull: false,
      },
      title: { type: DataTypes.STRING, required: true, allowNull: false },
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
      tableName: 'MODULE',
    },
  );

  return Module;
};
