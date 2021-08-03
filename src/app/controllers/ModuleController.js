const { Module } = require('../models');

class ModuleController {
  async create(req, res) {
    try {
      const module = await Module.create({
        ...req.body,
      });

      return res.status(200).json({
        error: false,
        data: module,
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
          error: true,
          message: 'Já existe um módulo nessa posição',
        });
      }

      if (error.name === 'SequelizeDatabaseError') {
        if (!req.body.position) {
          return res.status(400).json({
            error: true,
            message: 'A posição do módulo é obrigatória',
          });
        }

        if (!req.body.title) {
          res.status(400).json({
            error: true,
            message: 'O nome do módulo é obrigatório',
          });
        }
      }

      return res.status(error.status || 500).json({
        error: true,
        message: error.message,
      });
    }
  }
}

module.exports = new ModuleController();
