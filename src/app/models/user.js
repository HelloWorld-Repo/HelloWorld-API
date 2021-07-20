module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    email: {primaryKey: true, type: DataTypes.STRING},
    name: DataTypes.STRING,
    level: DataTypes.INTEGER,
    birthday: DataTypes.DATE,
    password_hash: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN,
    is_studant: DataTypes.BOOLEAN,
    is_first_contact: DataTypes.BOOLEAN,
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'USER'
  });

  return User;
}