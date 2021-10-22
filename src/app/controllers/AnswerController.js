const { Op } = require('sequelize');
const { Answer, Question, Chapter, Module } = require('../models');

class AnswerController {
  async updateOrCreate(req, res) {
    try {
      const { questionId, correctedAnswer } = req.body;
      const { userEmail } = req;

      const foundAnswer = await Answer.findOne({
        where: { questionId, userEmail },
      });

      if (!foundAnswer) {
        const answer = await Answer.create({
          ...req.body,
          userEmail,
        });

        return res.status(200).json({
          error: false,
          data: answer,
        });
      }

      foundAnswer.correctedAnswer = correctedAnswer;
      await foundAnswer.save();

      return res.status(200).json({
        error: false,
        data: foundAnswer,
      });
    } catch (error) {
      if (!req.body.questionId) {
        return res.status(400).json({
          error: true,
          message: 'O ID da questão é obrigatória',
        });
      }

      if (typeof req.body.correctedAnswer !== 'boolean') {
        return res.status(400).json({
          error: true,
          message: 'Informe se a questão foi respondida corretamente',
        });
      }

      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(404).json({
          error: true,
          message: 'Esse e-mail ou id não existe',
        });
      }

      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
          error: true,
          message: 'Já existe um histórico para esse usuário e capítulo',
        });
      }

      return res.status(error.status || 500).json({
        error: true,
        message: error.message,
      });
    }
  }

  async hasAnswer(userEmail, questionId) {
    try {
      const finished = await Answer.findOne({
        where: { userEmail, questionId },
      });
      return !!finished;
    } catch (error) {
      return false;
    }
  }

  async getAnsweredQuestions(userEmail, moduleId) {
    const questions = await Answer.count({
      where: {
        '$question.chapter.module.id$': moduleId,
        userEmail,
      },
      include: {
        model: Question,
        as: 'question',
        include: {
          model: Chapter,
          as: 'chapter',
          include: {
            as: 'module',
            model: Module,
          },
        },
      },
    });

    return questions;
  }

  async getCorrectAnsweredQuestions(userEmail, moduleId) {
    const questions = await Answer.count({
      where: {
        '$question.chapter.module.id$': moduleId,
        correctedAnswer: true,
        userEmail,
      },
      include: {
        model: Question,
        as: 'question',
        include: {
          model: Chapter,
          as: 'chapter',
          include: {
            as: 'module',
            model: Module,
          },
        },
      },
    });
    return questions;
  }

  async getWrongAnsweredQuestions(userEmail, moduleId) {
    const questions = await Answer.count({
      where: {
        '$question.chapter.module.id$': moduleId,
        correctedAnswer: false,
        userEmail,
      },
      include: {
        model: Question,
        as: 'question',
        include: {
          model: Chapter,
          as: 'chapter',
          include: {
            as: 'module',
            model: Module,
          },
        },
      },
    });

    return questions;
  }
}

module.exports = new AnswerController();
