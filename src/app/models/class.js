module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    'Class',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        required: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        required: true,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        required: true,
        field: 'updated_at',
      },
    },
    {
      tableName: 'CLASS',
    },
  );

  Class.associate = (models) => {
    Class.hasMany(models.User, {
      as: 'users',
      foreignKey: 'classId',
    });
  };

  return Class;
};
