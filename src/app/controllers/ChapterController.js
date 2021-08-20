const { Chapter } = require('../models');

class ChapterController {
  async create(req, res) {
    try {
      const chapter = await Chapter.create({
        ...req.body,
      });

      return res.status(200).json({
        error: false,
        data: chapter,
      });
    } catch (error) {
      if (!req.body.position) {
        return res.status(400).json({
          error: true,
          message: 'A posição do capítulo é obrigatória',
        });
      }

      if (!req.body.title) {
        return res.status(400).json({
          error: true,
          message: 'O nome do capítulo é obrigatório',
        });
      }

      if (!req.body.explanation) {
        return res.status(400).json({
          error: true,
          message: 'Insira um texto com a explicação do capítulo',
        });
      }

      if (!req.body.moduleId) {
        return res.status(400).json({
          error: true,
          message: 'Um capítulo deve estar vinculado a um módulo',
        });
      }

      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(404).json({
          error: true,
          message: 'Esse módulo não existe',
        });
      }

      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
          error: true,
          message:
            'Não pode haver dois capítulos na mesma posição em um mesmo módulo',
        });
      }

      return res.status(error.status || 500).json({
        error: true,
        message: error.message,
      });
    }
  }

  async update(req, res) {
    const {
      id,
      position,
      title,
      moduleId,
    } = req.body;

    if (!id) {
      return res.status(412).json({
        error: true,
        message: 'Informe o identificador do capítulo',
      });
    }

    try {
      const chapter = await Chapter.findByPk(id);

      if (!chapter) {
        return res.status(404).json({
          error: true,
          message: 'Capítulo não encontrado',
        });
      }

      if (title) chapter.title = title;
      if (position) chapter.position = position;
      if (moduleId) chapter.moduleId = moduleId;

      await chapter.save();

      return res.status(200).json({
        error: false,
        data: chapter,
      });
    } catch (error) {
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(404).json({
          error: true,
          message: 'Esse módulo não existe',
        });
      }

      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(404).json({
          error: true,
          message: 'Já existe um capítulo nessa posição desse módulo',
        });
      }

      return res.status(500).json({
        error: true,
        message: 'Erro ao atualizar capítulo',
      });
    }
  }

  async list(req, res) {
    try {
      const chapters = await Chapter.findAll();

      return res.status(200).json({
        error: false,
        data: chapters,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        error: true,
        message: 'Erro ao buscar capítulos',
      });
    }
  }
}

module.exports = new ChapterController();
