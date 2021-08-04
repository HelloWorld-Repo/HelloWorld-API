const routes = require('express').Router();

const authMiddleware = require('./app/middleware/auth');
const adminMiddleware = require('./app/middleware/admin');

const SessionController = require('./app/controllers/SessionController');
const UserController = require('./app/controllers/UserController');
const ModuleController = require('./app/controllers/ModuleController');
const ChapterController = require('./app/controllers/ChapterController');

routes.post('/login', SessionController.login);
routes.post('/register', UserController.register);

// These Routes needs sample athentication
routes.use(authMiddleware);

routes.get('/modules', ModuleController.list);

// These Routes needs admin athentication
routes.use(adminMiddleware);

routes.post('/module', ModuleController.create);
routes.patch('/module', ModuleController.update);

routes.post('/chapter', ChapterController.create);
routes.patch('/chapter', ChapterController.update);

module.exports = routes;
