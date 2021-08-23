const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: true,
      message: 'Usuário não autenticado',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_JWT);

    req.userEmail = decoded.id;
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: 'Usuário não autenticado',
    });
  }

  return next();
};
