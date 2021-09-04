const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        primaryKey: true,
        type: DataTypes.STRING,
        required: true,
        isEmail: true,
        unique: true,
      },
      name: DataTypes.STRING,
      level: DataTypes.VIRTUAL,
      birthday: DataTypes.DATEONLY,
      passwordHash: {
        field: 'password_hash',
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      isAdmin: {
        field: 'is_admin',
        type: DataTypes.BOOLEAN,
        required: true,
        allowNull: false,
      },
      isStudent: {
        field: 'is_student',
        type: DataTypes.BOOLEAN,
      },
      isFirstContact: {
        field: 'is_first_contact',
        type: DataTypes.BOOLEAN,
      },
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
      tableName: 'USER',
    }
  );

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.passwordHash);
  };

  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.email }, process.env.SECRET_JWT);
  };

  User.prototype.toJSON = function () {
    const values = Object.assign(this.get());

    delete values.passwordHash;
    return values;
  };

  return User;
};
