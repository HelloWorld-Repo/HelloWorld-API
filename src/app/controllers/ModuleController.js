/* eslint-disable no-restricted-syntax */
const { Module } = require('../models');
const HistoryController = require('./HistoryController');

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

      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
          error: true,
          message: 'Já existe um módulo nessa posição',
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
      const module = await Module.findByPk(id);

      if (!module) {
        return res.status(404).json({
          error: true,
          message: 'Módulo não encontrado',
        });
      }

      if (title) module.title = title;
      if (position) module.position = position;

      await module.save();

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

      return res.status(500).json({
        error: true,
        message: 'Erro ao atualizar módulo',
      });
    }
  }

  async list(req, res) {
    try {
      const modules = await Module.findAll({
        include: 'chapters',
        order: ['position', ['chapters', 'position']],
      });

      // const promises = [];

      // for (const module of modules) {
      //   for (const chapter of module.chapters) {
      //     promises.push(async () => {
      //       chapter.done = await HistoryController.hasHistory(
      //         req.userEmail,
      //         chapter.id
      //       );
      //     });
      //   }
      // }

      // await Promise.all(promises);

      for (let module of modules) {
        for (let chapter of module.chapters) {
          chapter.done = await HistoryController.hasHistory(
            req.userEmail,
            chapter.id
          );
        }
      }

      return res.status(200).json({
        error: false,
        data: modules,
      });
    } catch (error) {
      console.error('MODULE CONTROLLER', error);
      return res.status(error.statusCode || 500).json({
        error: true,
        message: 'Erro ao buscar módulos',
      });
    }
  }
}

module.exports = new ModuleController();
