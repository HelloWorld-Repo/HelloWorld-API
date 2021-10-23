const { History } = require('../models');

class HistoryController {
  async create(req, res) {
    try {
      const { userEmail } = req;
      const history = await History.create({
        ...req.body,
        userEmail,
      });

      return res.status(200).json({
        error: false,
        data: history,
      });
    } catch (error) {
      if (!req.body.chapterId) {
        return res.status(400).json({
          error: true,
          message: 'O ID do capítulo é obrigatório',
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

  async hasHistory(userEmail, chapterId) {
    try {
      const finished = await History.findOne({
        where: { userEmail, chapterId },
      });
      return !!finished;
    } catch (error) {
      return false;
    }
  }

  async getChaptersCompletedCount(userEmail) {
    const count = History.count({
      where: {
        userEmail,
      },
    });


    return count;
  }
}

module.exports = new HistoryController();
