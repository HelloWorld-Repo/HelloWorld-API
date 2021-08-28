const { User } = require('../models');
const UserController = require('./UserController');

class SessionController {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({
          error: true,
          message: 'E-mail não cadastrado',
        });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({
          error: true,
          message: 'Senha incorreta',
        });
      }

      const askForFeedback = await UserController.getAskForFeedback(email);

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
            level: user.level,
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

    // TODO: recuperar nível do usuário
  }
}

module.exports = new SessionController();
