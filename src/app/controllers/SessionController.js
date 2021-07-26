const { User } = require('../models');

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

      return res.status(200).json({
        error: false,
        data: {
          user: {
            email: user.email,
            name: user.name,
            birthday: user.birthday,
            isAdmin: user.isAdmin,
            isStudent: user.isStudent,
            isFirstContact: user.isFirstContact,
            level: user.level,
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

  async jwtTest(req, res) {
    return res.status(200).send();
  }
}

module.exports = new SessionController();
