const bcrypt = require('bcryptjs');

const { User } = require('../models');

class UserController {
  async register(req, res) {
    try {
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
          isStudant: user.isStudant,
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

      if (error.name === 'SequelizeDatabaseError') {
        if (!req.body.name) {
          return res.status(400).json({
            error: true,
            message: 'O nome é obrigatório',
          });
        }

        if (!req.body.email) {
          res.status(400).json({
            error: true,
            message: 'O e-mail é obrigatório',
          });
        }

        if (!req.body.birthday) {
          res.status(400).json({
            error: true,
            message: 'A data de aniversário é obrigatória',
          });
        }
      }

      return res.status(error.status || 500).json({
        error: true,
        message: error.message,
      });
    }
  }
}

module.exports = new UserController();
