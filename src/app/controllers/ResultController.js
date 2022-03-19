const { Chapter, Module } = require('../models');
const AnswerController = require('./AnswerController');
const HistoryController = require('./HistoryController');

class ResultController {
  async get(_req, res) {
    try {
      const chapters = await Chapter.findAll({
        attributes: ['title', 'id'],
        include: [
          {
            model: Module,
            as: 'module',
            attributes: [],
          },
        ],
        order: [['module', 'position'], 'position'],
      });

      await Promise.all(
        chapters.map(async (chapter) => {
          chapter.usersCount = await HistoryController.getUsersByChapter(
            chapter.id
          );

          chapter.wrongResponsesCount =
            await AnswerController.getResponsesByChapter(chapter.id, false);

          chapter.rightResponsesCount =
            await AnswerController.getResponsesByChapter(chapter.id, true);
        })
      );

      return res.status(200).json({
        error: false,
        data: chapters,
      });
    } catch (error) {
      console.error('RESULT CONTROLLER', error);
      return res.status(error.status || 500).json({
        error: true,
        message: error.message,
      });
    }
  }
}

module.exports = new ResultController();
