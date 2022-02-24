const { User } = require('../models');
const UserController = require('./UserController');
const HistoryController = require('./HistoryController');

class SessionController {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!(await user.checkPassword(password))) {
        return res.status(404).json({
          error: true,
          message: 'E-mail ou senha incorretos',
        });
      }

      const askForFeedback = await UserController.getAskForFeedback(email);
      const level = await HistoryController.getChaptersCompletedCount(email);

      return res.status(200).json({
        error: false,
        data: {
          user: {
            email,
            name: user.name,
            birthday: user.birthday,
            isAdmin: user.isAdmin,
            isStudent: user.isStudent,
            isFirstContact: user.isFirstContact,
            resetPassword: user.resetPassword,
            level,
            askForFeedback,
          },
          token: user.generateToken(),
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  }
}

module.exports = new SessionController();
