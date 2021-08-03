const routes = require('express').Router();

const authMiddleware = require('./app/middleware/auth');

const SessionController = require('./app/controllers/SessionController');
const UserController = require('./app/controllers/UserController');

routes.post('/login', SessionController.login);
routes.post('/register', UserController.register);

routes.use(authMiddleware);
routes.get('/modules', (req, res) => res.status(200).send());

module.exports = routes;
