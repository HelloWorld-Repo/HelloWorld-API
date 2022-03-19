const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: true,
        message: 'Usuário não autenticado',
      });
    }

    const [, token] = authHeader.split(' ');

    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_JWT);

    if (!decoded?.id) {
      return res.status(401).json({
        error: true,
        message: 'Token de autenticação inválido',
      });
    }

    req.userEmail = decoded.id;
  } catch (error) {
    if(error?.name === 'TokenExpiredError'){
      return res.status(401).json({
        error: true,
        message: 'Token expirado',
      });
    }

    return res.status(500).json({
      error: true,
      message: 'Erro desconhecido',
    });
  }

  return next();
};
