function verifyEmail(req, res, next) {
  const { email } = req.body;
  if (!email || email.length === 0) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  next();
}
function verifyPassword(req, res, next) {
  const { password } = req.body;
  if (!password || password.length === 0) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  next();
}
function verifySintaxEmail(req, res, next) {
  const { email } = req.body;
  const validation = /\S+@\S+\.\S+/;
  // console.log(email.match(validation));
  if (!email.match(validation)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
}
function verifySintaxPassword(req, res, next) {
  const { password } = req.body;
  const quantity = 6;
  if (password.length < quantity) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
}

module.exports = { verifyEmail, verifyPassword, verifySintaxEmail, verifySintaxPassword };
