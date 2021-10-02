/* eslint-disable no-restricted-syntax */
const Sequelize = require('sequelize');
const { Question, Option } = require('../models');
const { questionTypesEnum } = require('../enums');

class QuestionController {
  async create(req, res) {
    try {
      const module = await Question.create({
        ...req.body,
      });

      return res.status(200).json({
        error: false,
        data: module,
      });
    } catch (error) {
      if (!req.body.description) {
        return res.status(400).json({
          error: true,
          message: 'A descrição da questão é obrigatória',
        });
      }

      if (!req.body.type) {
        return res.status(400).json({
          error: true,
          message: 'O tipo da questão é obrigatório',
        });
      }

      if (!req.body.chapterId) {
        return res.status(400).json({
          error: true,
          message: 'Indentifique o capítulo ao qual essa questão pertence',
        });
      }

      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(404).json({
          error: true,
          message: 'Esse capítulo não existe',
        });
      }

      if (!questionTypesEnum.includes(req.body.type)) {
        return res.status(400).json({
          error: true,
          message: `O tipo da questão deve ser um desses: ${questionTypesEnum}`,
        });
      }

      return res.status(error.status || 500).json({
        error: true,
        message: error.message,
      });
    }
  }

  async update(req, res) {
    const { id, description } = req.body;

    if (!id) {
      return res.status(412).json({
        error: true,
        message: 'O ID da questão é obrigatório',
      });
    }

    try {
      const question = await Question.findByPk(id);

      if (!question) {
        return res.status(404).json({
          error: true,
          message: 'Questão não encontrada',
        });
      }

      if (description) question.description = description;
      await question.save();

      return res.status(200).json({
        error: false,
        data: question,
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Erro ao atualizar questão',
      });
    }
  }

  async get(req, res) {
    const { id } = req.query;

    if (!id) {
      return res.status(412).json({
        error: true,
        message: 'O ID da questão é obrigatório',
      });
    }

    try {
      const question = await Question.findByPk(id, {
        include: 'options',
      });

      if (!question) {
        return res.status(404).json({
          error: true,
          message: 'Questão não encontrada',
        });
      }

      return res.status(200).json({
        error: false,
        data: question,
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Erro ao recuperar questão',
      });
    }
  }

  async getQuestionsFromChapter(req, res) {
    const { chapterId } = req.query;

    if (!chapterId) {
      return res.status(412).json({
        error: true,
        message: 'O ID do capítulo é obrigatório',
      });
    }

    try {
      const questions = await Question.findAll({
        where: { chapterId },
        order: Sequelize.literal('random()'),
        limit: 3,
        include: [{ model: Option, as: 'options', separate: true }],
      });

      return res.status(200).json({
        error: false,
        data: questions || [],
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        message: 'Erro ao recuperar questões',
      });
    }
  }
}

module.exports = new QuestionController();
