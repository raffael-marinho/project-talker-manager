const HTTP_BAD_REQUEST_STATUS = 400;
function authorizationName(req, res, next) {
  const { name } = req.body;
  if (!name || name.length === 0) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
}
function authorizationAge(req, res, next) {
  const { age } = req.body;
  if (!age || age.length === 0) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  next();
}

module.exports = { authorizationAge, authorizationName };
