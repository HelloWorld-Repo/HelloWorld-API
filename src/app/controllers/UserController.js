const bcrypt = require('bcryptjs');

const { User, Feedback, Class } = require('../models');
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
        isAdmin: false,
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
          classId: user.classId,
        },
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
          error: true,
          message: 'Já existe uma conta com esse e-mail',
        });
      }

      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(404).json({
          error: true,
          message: 'Essa turma não existe',
        });
      }

      if (!req.body.email) {
        return res.status(400).json({
          error: true,
          message: 'O e-mail é obrigatório',
        });
      }

      return res.status(error.status || 500).json({
        error: true,
        message: error.message,
      });
    }
  }

  async registerAdmin(req, res) {
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
        isAdmin: true,
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
          classId: user.classId,
        },
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
          error: true,
          message: 'Já existe uma conta com esse e-mail',
        });
      }

      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(404).json({
          error: true,
          message: 'Essa turma não existe',
        });
      }

      if (!req.body.email) {
        return res.status(400).json({
          error: true,
          message: 'O e-mail é obrigatório',
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
        data: { user: user.toJSON() },
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

  async update(req, res) {
    const {
      birthday,
      name,
      level,
      classId,
      userEmail: userFromBody,
    } = req.body;

    let { userEmail } = req;

    if (!userEmail) {
      userEmail = userFromBody;
    }

    try {
      const user = await User.findOne({ where: { email: userEmail } });

      if (!user) {
        return res.status(404).json({
          error: true,
          message: 'Usuário não encontrado',
        });
      }

      if (birthday) user.birthday = birthday;
      if (name) user.name = name;
      if (level) user.level = level;
      if (classId) user.classId = classId;

      await user.save();
      return res.status(200).json({
        error: false,
        data: { user: user.toJSON() },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        message:
          'Ocorreu um erro ao remover o usuário, tente nvamente mais tarde',
      });
    }
  }

  async getAskForFeedback(email) {
    const feedback = await Feedback.findOne({ where: { userEmail: email } });

    if (!feedback) {
      const user = await User.findOne({ where: { email } });
      return utils.getIntervalBetweenDates(user?.createdAt, Date.now()) > 7;
    }

    return utils.getIntervalBetweenDates(feedback?.updatedAt, Date.now()) > 30;
  }

  async list(req, res) {
    try {
      const students = await User.findAll({
        include: [
          {
            model: Class,
            as: 'class',
          },
        ],
        order: ['name'],
      });

      return res.status(200).json({
        error: false,
        data: students,
      });
    } catch (error) {
      console.error('USER CONTROLLER', error);
      return res.status(error.statusCode || 500).json({
        error: true,
        message: 'Erro ao buscar usuários',
      });
    }
  }
}

module.exports = new UserController();
