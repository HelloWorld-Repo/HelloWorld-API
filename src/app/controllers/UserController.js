const bcrypt = require('bcryptjs');
const path = require('path');
const readXlsxFile = require('read-excel-file/node');
const { unlink } = require('fs/promises');

const { User, Feedback, Class } = require('../models');
const MailController = require('./MailController');
const transport = require('../../config/mail');
const utils = require('../../utils');
const HistoryController = require('./HistoryController');

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

      await transport.sendMail(
        MailController.newRegister(user.email, user.name),
      );

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
          researchParticipant: user.researchParticipant,
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
        req.body.password = utils.generateRandomPassword();
      }

      const criptedPass = await bcrypt.hash(req.body.password, 8);

      const user = await User.create({
        ...req.body,
        level: 0,
        passwordHash: criptedPass,
        isAdmin: true,
      });

      await transport.sendMail(
        MailController.newAdminRegister(
          user.email,
          user.name,
          req.body.password,
        ),
      );

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
          researchParticipant: user.researchParticipant,
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

  async update(req, res) {
    const {
      birthday, name, classId, userEmail: userFromBody,
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
      if (classId) user.classId = classId;

      await user.save();
      const level = await HistoryController.getChaptersCompletedCount(
        user?.email,
      );

      return res.status(200).json({
        error: false,
        data: { ...user, level },
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

  async resetPassword(req, res) {
    try {
      const { email } = req.body;

      const user = await User.findByPk(email);

      if (user) {
        const password = utils.generateRandomPassword();

        await transport.sendMail(
          MailController.recoveryPassword(email, user.name, password),
        );

        user.resetPassword = true;
        user.passwordHash = await bcrypt.hash(password, 8);
        await user.save();
      }

      return res.status(200).json({
        error: false,
        data: {},
      });
    } catch (error) {
      console.error('USER CONTROLLER', error);
      return res.status(501).json({
        error: true,
        message:
          'Ocorreu um erro ao recuperar a senha. Tente novamente mais tarde',
      });
    }
  }

  async newPassword(req, res) {
    try {
      const { userEmail } = req;
      const { password } = req.body;

      const user = await User.findByPk(userEmail);

      if (user) {
        user.passwordHash = await bcrypt.hash(password, 8);
        user.resetPassword = false;

        await user.save();
        await transport.sendMail(
          MailController.newPassword(userEmail, user.name),
        );

        return res.status(200).json({
          error: false,
          data: {},
        });
      }

      return res.status(404).json({
        error: true,
        message: 'Usuário não encontrado',
      });
    } catch (error) {
      console.error('USER CONTROLLER', error);
      return res.status(501).json({
        error: true,
        message: 'Ocorreu um erro inesperado. Tente novamente mais tarde',
      });
    }
  }

  async import(req, res) {
    const pathname = path.join(
      `${__dirname}/../../..`,
      '/tmp/files/',
      req.file.filename,
    );

    const classId = req?.body?.classId;

    try {
      if (!req.file) {
        return res.status(400).json({
          error: true,
          message: 'Insira um arquivo para continuar',
        });
      }

      const rows = await readXlsxFile(pathname);

      rows.shift();
      const success = [];
      const errors = [];

      await Promise.all(
        rows.map(async (row) => {
          const password = utils.generateRandomPassword();
          const passwordHash = await bcrypt.hash(password, 8);

          await User.create({
            name: row[0],
            email: row[1],
            passwordHash,
            resetPassword: true,
            isAdmin: false,
            classId,
          })
            .then(async (user) => {
              success.push(row[0]);
              await transport.sendMail(
                MailController.newImportRegister(
                  user.email,
                  user.name,
                  password,
                ),
              );
            })
            .catch((error) => {
              errors.push({
                user: row[0],
                error: error?.errors[0].message,
              });
            });
        }),
      );

      return res.status(200).json({ error: false, data: { errors } });
    } catch (error) {
      console.error('USER CONTROLLER', error);
      return res.status(501).json({
        error: true,
        message: 'Ocorreu um erro inesperado. Tente novamente mais tarde',
      });
    } finally {
      unlink(pathname);
    }
  }
}

module.exports = new UserController();
