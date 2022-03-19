const routes = require('express').Router();

const authMiddleware = require('./app/middlewares/auth');
const adminMiddleware = require('./app/middlewares/admin');
const fileMiddleware = require('./app/middlewares/file');

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
const ResultController = require('./app/controllers/ResultController');

routes.post('/login', SessionController.login);
routes.post('/register', UserController.register);
routes.post('/reset', UserController.resetPassword);

// These Routes needs sample athentication
routes.get('/modules', authMiddleware, ModuleController.list);
routes.get('/module', authMiddleware, ModuleController.get);
routes.get('/abstract', authMiddleware, ModuleController.listWithQuestions);

routes.get('/chapters', authMiddleware, ChapterController.list);
routes.get('/chapter', authMiddleware, ChapterController.get);

routes.post('/history', authMiddleware, HistoryController.create);

routes.post('/feedback', authMiddleware, FeedbackController.updateOrCreate);
routes.get('/feedbacks', authMiddleware, FeedbackController.list);

routes.delete('/user', authMiddleware, UserController.delete);
routes.patch('/user', authMiddleware, UserController.update);
routes.post('/password', authMiddleware, UserController.newPassword);

routes.get('/question', authMiddleware, QuestionController.get);
routes.get(
  '/questions',
  authMiddleware,
  QuestionController.getQuestionsFromChapter,
);

routes.post('/answer', authMiddleware, AnswerController.updateOrCreate);

// These Routes needs admin athentication
routes.get('/users', [authMiddleware, adminMiddleware], UserController.list);
routes.post(
  '/users/import',
  [authMiddleware, adminMiddleware, fileMiddleware.single('file')],
  UserController.import,
);

routes.post(
  '/admin',
  [authMiddleware, adminMiddleware],
  UserController.registerAdmin,
);

routes.post(
  '/module',
  [authMiddleware, adminMiddleware],
  ModuleController.create,
);
routes.patch(
  '/module',
  [authMiddleware, adminMiddleware],
  ModuleController.update,
);

routes.post(
  '/chapter',
  [authMiddleware, adminMiddleware],
  ChapterController.create,
);
routes.patch(
  '/chapter',
  [authMiddleware, adminMiddleware],
  ChapterController.update,
);

routes.post(
  '/question',
  [authMiddleware, adminMiddleware],
  QuestionController.create,
);
routes.patch(
  '/question',
  [authMiddleware, adminMiddleware],
  QuestionController.update,
);

routes.post(
  '/option',
  [authMiddleware, adminMiddleware],
  OptionController.create,
);
routes.patch(
  '/option',
  [authMiddleware, adminMiddleware],
  OptionController.update,
);

routes.post(
  '/class',
  [authMiddleware, adminMiddleware],
  ClassController.create,
);
routes.patch(
  '/class',
  [authMiddleware, adminMiddleware],
  ClassController.update,
);
routes.delete(
  '/class',
  [authMiddleware, adminMiddleware],
  ClassController.delete,
);

routes.get('/classes', [authMiddleware, adminMiddleware], ClassController.list);
routes.get('/result', [authMiddleware, adminMiddleware], ResultController.get);

module.exports = routes;
