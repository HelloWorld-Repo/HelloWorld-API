const routes = require('express').Router();
const { User } = require('./app/models');

User.create({
  email: 'gabriela@gmail.com',
  name: 'Gabriela Medeiros da Silva',
  level: 0,
  birthday: new Date(),
  password_hash: '123',
  is_admin: false,
  is_studant: true,
  is_first_contact: true
});

module.exports = routes;
