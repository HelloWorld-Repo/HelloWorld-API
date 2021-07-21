const bcrypt = require('bcryptjs');

const { User } = require('../models');

class UserController {
  async register(req, res) {
    try {
      const criptedPass = await bcrypt.hash(req.body.password, 8);

      const user = await User.create({
        ...req.body,
        level: 0,
        password_hash: criptedPass,
      });

      res.status(200).json({
        error: false,
        data: {
          email: user.email,
          name: user.name,
          birthday: user.birthday,
          isAdmin: user.is_admin,
          isStudant: user.is_studant,
          isFirstContact: user.is_first_contact,
          level: user.level,
        },
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(error.status || 500).json({
          error: true,
          message: 'Já existe uma conta com esse e-mail',
        });
      } else {
        res.status(error.status || 500).json({
          error: true,
          message: error.message,
        });
      }
    }
  }
}

module.exports = new UserController();
