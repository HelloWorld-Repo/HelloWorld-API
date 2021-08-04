const routes = require('express').Router();

const authMiddleware = require('./app/middleware/auth');
const adminMiddleware = require('./app/middleware/admin');

const SessionController = require('./app/controllers/SessionController');
const UserController = require('./app/controllers/UserController');
const ModuleController = require('./app/controllers/ModuleController');

routes.post('/login', SessionController.login);
routes.post('/register', UserController.register);

routes.use(authMiddleware);
routes.get('/modules', (req, res) => res.status(200).send());

routes.use(adminMiddleware);
routes.post('/module', ModuleController.create);
routes.patch('/module', ModuleController.update);

module.exports = routes;
