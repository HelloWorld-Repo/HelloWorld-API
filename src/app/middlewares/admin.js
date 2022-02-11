const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { userEmail } = req;

    const user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'Usuário não encontrado',
      });
    }

    if (!user?.isAdmin) {
      return res.status(403).json({
        error: true,
        message: 'Sem permissão para acessar esse recurso',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }

  return next();
};
