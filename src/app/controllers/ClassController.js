/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { Class, User } = require('../models');
const HistoryController = require('./HistoryController');

class ClassController {
  async create(req, res) {
    try {
      const createdClass = await Class.create({
        ...req.body,
      });

      return res.status(200).json({
        error: false,
        data: createdClass,
      });
    } catch (error) {
      if (!req.body.name) {
        res.status(400).json({
          error: true,
          message: 'O nome da turma é obrigatório',
        });
      }
      return res.status(error.status || 500).json({
        error: true,
        message: error.message,
      });
    }
  }

  async update(req, res) {
    const { id, name } = req.body;

    if (!id) {
      return res.status(412).json({
        error: true,
        message: 'O ID da turma é obrigatório',
      });
    }

    try {
      const searchedClass = await Class.findByPk(id);

      if (!searchedClass) {
        return res.status(404).json({
          error: true,
          message: 'Turma não encontrado',
        });
      }

      if (name) searchedClass.name = name;

      await searchedClass.save();

      return res.status(200).json({
        error: false,
        data: searchedClass,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        message: 'Erro ao atualizar turma',
      });
    }
  }

  async list(req, res) {
    try {
      const classes = await Class.findAll({
        include: [
          {
            model: User,
            as: 'users',
            attributes: [
              'name',
              'email',
              'is_admin',
              'level',
              'birthday',
              'createdAt',
              'updatedAt',
            ],
          },
        ],
        order: ['created_at'],
      });

      await Promise.all(
        classes.map(async (classItem) => {
          await Promise.all(
            classItem?.users?.map(async (user) => {
              user.level = await HistoryController.getChaptersCompletedCount(
                user.email
              );
            })
          );
        })
      );

      return res.status(200).json({
        error: false,
        data: classes,
      });
    } catch (error) {
      console.error('CLASS CONTROLLER', error);
      return res.status(error.statusCode || 500).json({
        error: true,
        message: 'Erro ao buscar turmas',
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.body;
      const searchedClass = await Class.findByPk(id);

      if (!searchedClass) {
        return res.status(404).json({
          error: true,
          message: 'Turma não encontrada',
        });
      }

      await searchedClass.destroy();
      return res.status(200).json({
        error: false,
        data: { class: searchedClass.toJSON() },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        message:
          'Não conseguimos deletar essa turma, tente novamente mais tarde',
      });
    }
  }
}

module.exports = new ClassController();
