const { Feedback } = require('../models');

class FeedbackController {
  async updateOrCreate(req, res) {
    try {
      const { userEmail } = req;
      const foundFeedback = await Feedback.findOne({
        where: { userEmail },
      });

      if (!foundFeedback) {
        const feedback = await Feedback.create({
          ...req.body,
          userEmail,
        });

        return res.status(200).json({
          error: false,
          data: feedback,
        });
      }
      const { text, liked } = req.body;

      if (text) foundFeedback.text = text;
      if (liked !== null) foundFeedback.liked = liked;

      await foundFeedback.save();

      return res.status(200).json({
        error: false,
        data: foundFeedback,
      });
    } catch (error) {
      if (!req.body.userEmail) {
        return res.status(400).json({
          error: true,
          message: 'O e-mail do usuário é obrigatório',
        });
      }

      if (!req.body.liked) {
        return res.status(400).json({
          error: true,
          message: 'Nos diga se você gostou da experiência conosco',
        });
      }

      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(404).json({
          error: true,
          message: 'Esse usuário não existe',
        });
      }

      return res.status(error.status || 500).json({
        error: true,
        message: error.message,
      });
    }
  }

  async list(req, res) {
    try {
      const feedbacks = await Feedback.findAll();

      return res.status(200).json({
        error: false,
        data: feedbacks,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        error: true,
        message: 'Erro ao buscar feedbacks',
      });
    }
  }
}

module.exports = new FeedbackController();
