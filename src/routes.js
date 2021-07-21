const routes = require('express').Router();

const SessionController = require('./app/controllers/SessionController');
const UserController = require('./app/controllers/UserController');

routes.post('/login', SessionController.login);

routes.post('/register', UserController.register);

module.exports = routes;
