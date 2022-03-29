const HTTP_UNAUTHORIZED_STATUS = 401;

function authorizationToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token || token.length === 0) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({
      message: 'Token não encontrado',
    });
  }
  if (token.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({
      message: 'Token inválido',
    });
  }
  next();
}

module.exports = authorizationToken;
