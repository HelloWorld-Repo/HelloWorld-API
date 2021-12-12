const routes = require('express').Router();

const authMiddleware = require('./app/middlewares/auth');
const adminMiddleware = require('./app/middlewares/admin');

const SessionController = require('./app/controllers/SessionController');
const UserController = require('./app/controllers/UserController');
const ModuleController = require('./app/controllers/ModuleController');
const ChapterController = require('./app/controllers/ChapterController');
const HistoryController = require('./app/controllers/HistoryController');
const FeedbackController = require('./app/controllers/FeedbackController');
const QuestionController = require('./app/controllers/QuestionController');
const OptionController = require('./app/controllers/OptionController');
const AnswerController = require('./app/controllers/AnswerController');
const ClassController = require('./app/controllers/ClassController');

routes.post('/login', SessionController.login);
routes.post('/register', UserController.register);

// These Routes needs sample athentication
routes.use(authMiddleware);

routes.get('/modules', ModuleController.list);
routes.get('/module', ModuleController.get);
routes.get('/abstract', ModuleController.listWithQuestions);

routes.get('/chapters', ChapterController.list);
routes.get('/chapter', ChapterController.get);

routes.post('/history', HistoryController.create);

routes.post('/feedback', FeedbackController.updateOrCreate);
routes.get('/feedbacks', FeedbackController.list);

routes.delete('/user', UserController.delete);
routes.patch('/user', UserController.update);

routes.get('/question', QuestionController.get);
routes.get('/questions', QuestionController.getQuestionsFromChapter);

routes.post('/answer', AnswerController.updateOrCreate);

// These Routes needs admin athentication
routes.use(adminMiddleware);

routes.get('/users', UserController.list);

routes.post('/module', ModuleController.create);
routes.patch('/module', ModuleController.update);

routes.post('/chapter', ChapterController.create);
routes.patch('/chapter', ChapterController.update);

routes.post('/question', QuestionController.create);
routes.patch('/question', QuestionController.update);

routes.post('/option', OptionController.create);
routes.patch('/option', OptionController.update);

routes.post('/class', ClassController.create);
routes.patch('/class', ClassController.update);
routes.delete('/class', ClassController.delete);
routes.get('/classes', ClassController.list);

module.exports = routes;
