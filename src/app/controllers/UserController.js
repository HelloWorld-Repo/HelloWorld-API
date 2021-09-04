const bcrypt = require('bcryptjs');

const { User, Feedback } = require('../models');
const utils = require('../../utils');

class UserController {
  async register(req, res) {
    try {
      if (!req.body?.password) {
        return res.status(400).json({
          error: true,
          message: 'A senha não foi informada',
        });
      }

      const criptedPass = await bcrypt.hash(req.body.password, 8);

      const user = await User.create({
        ...req.body,
        level: 0,
        passwordHash: criptedPass,
      });

      return res.status(200).json({
        error: false,
        data: {
          email: user.email,
          name: user.name,
          birthday: user.birthday,
          isAdmin: user.isAdmin,
          isStudent: user.isStudent,
          isFirstContact: user.isFirstContact,
          level: user.level,
        },
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
          error: true,
          message: 'Já existe uma conta com esse e-mail',
        });
      }

      if (!req.body.email) {
        return res.status(400).json({
          error: true,
          message: 'O e-mail é obrigatório',
        });
      }

      if (req.body.isAdmin == null || typeof req.body.isAdmin === 'undefined') {
        return res.status(400).json({
          error: true,
          message: 'Informe se o usuário é administrador do sistema ou não',
        });
      }

      return res.status(error.status || 500).json({
        error: true,
        message: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const { userEmail } = req;
      const user = await User.findOne({ where: { email: userEmail } });

      if (!user) {
        return res.status(404).json({
          error: true,
          message: 'Usuário não encontrado',
        });
      }

      await user.destroy();
      return res.status(200).json({
        error: false,
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        message:
          'Não conseguimos remover essa conta, tente novamente mais tarde',
      });
    }
  }

  async getAskForFeedback(email) {
    const feedback = await Feedback.findOne({ where: { userEmail: email } });

    if (!feedback) return true;

    return utils.getIntervalBetweenDates(feedback?.updatedAt, Date.now()) > 30;
  }
}

module.exports = new UserController();
