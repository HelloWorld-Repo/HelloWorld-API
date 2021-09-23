/* eslint-disable no-restricted-syntax */
const { Question } = require('../models');
const { questionTypesEnum } = require('../enums');

class ModuleController {
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
        res.status(400).json({
          error: true,
          message: 'O tipo da questão é obrigatório',
        });
      }

      if (!questionTypesEnum.includes(req.body.type)) {
        res.status(400).json({
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
        message: 'Erro ao atualizar módulo',
      });
    }
  }
}

module.exports = new ModuleController();
