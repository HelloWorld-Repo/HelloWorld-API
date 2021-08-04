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
    const { id, position, title } = req.body;

    if (!id) {
      return res.status(412).json({
        error: true,
        message: 'O ID do módulo é obrigatório',
      });
    }

    try {
      const chapter = await Chapter.findByPk(id);

      if (!chapter) {
        return res.status(404).json({
          error: true,
          message: 'Módulo não encontrado',
        });
      }

      chapter.title = title;
      chapter.position = position;

      chapter.save();

      return res.status(200).json({
        error: false,
        data: chapter,
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Erro ao atualizar módulo',
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
        message: 'Erro ao buscar módulos',
      });
    }
  }
}

module.exports = new ChapterController();
