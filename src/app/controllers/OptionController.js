/* eslint-disable no-restricted-syntax */
const { Option } = require('../models');

class OptionController {
  async create(req, res) {
    try {
      const option = await Option.create({
        ...req.body,
      });

      return res.status(200).json({
        error: false,
        data: option,
      });
    } catch (error) {
      if (!req.body.text) {
        return res.status(400).json({
          error: true,
          message: 'O texto da opção é obrigatório',
        });
      }
      if (typeof req.body.isRight !== 'boolean') {
        return res.status(400).json({
          error: true,
          message: 'Você deve informar se a opção é correta',
        });
      }
      if (!req.body.questionId) {
        return res.status(400).json({
          error: true,
          message: 'Você deve informar a qual questão essa opção pertence',
        });
      }

      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(404).json({
          error: true,
          message: 'A questão não foi encontrada',
        });
      }

      return res.status(error.status || 500).json({
        error: true,
        message: error.message,
      });
    }
  }

  async update(req, res) {
    const { id, text, isRight } = req.body;

    if (!id) {
      return res.status(412).json({
        error: true,
        message: 'O ID da questão é obrigatório',
      });
    }

    try {
      const option = await Option.findByPk(id);

      if (!option) {
        return res.status(404).json({
          error: true,
          message: 'Questão não encontrada',
        });
      }

      if (text) option.text = text;
      if (isRight !== null) option.isRight = isRight;
      await option.save();

      return res.status(200).json({
        error: false,
        data: option,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        message: 'Erro ao atualizar opção da questão',
      });
    }
  }
}

module.exports = new OptionController();
