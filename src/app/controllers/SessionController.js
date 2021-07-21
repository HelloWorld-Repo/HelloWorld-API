const { User } = require('../models');

class SessionController {
  async login(req, res) {
    const { email, password } = req.body;

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

    // TODO: recuperar nível do usuário

    return res.status(200).json({
      error: false,
      data: {
        user,
        token: user.generateToken(),
      },
    });
  }
}

module.exports = new SessionController();
