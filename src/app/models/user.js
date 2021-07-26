const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: { primaryKey: true, type: DataTypes.STRING },
      name: DataTypes.STRING,
      level: DataTypes.VIRTUAL,
      birthday: DataTypes.DATEONLY,
      passwordHash: {
        field: 'password_hash',
        type: DataTypes.STRING,
      },
      isAdmin: {
        field: 'is_admin',
        type: DataTypes.BOOLEAN,
      },
      isStudant: {
        field: 'is_studant',
        type: DataTypes.BOOLEAN,
      },
      isFirstContact: {
        field: 'is_first_contact',
        type: DataTypes.BOOLEAN,
      },
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
      tableName: 'USER',
    },
  );

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash);
  };

  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.email }, process.env.SECRET_JWT);
  };

  return User;
};
