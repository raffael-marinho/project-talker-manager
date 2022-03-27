function verifyEmail(email) {
  if (!email || email.length === 0) {
    return {
      message: 'O campo "email" é obrigatório',
    };
  }
}
function verifyPassword(password) {
  if (!password || password.length === 0) {
    return {
      message: 'O campo "password" é obrigatório',
    };
  }
}
function verifySintaxEmail(email) {
  const validation = /\S+@\S+\.\S+/;
  // console.log(email.match(validation));
  if (!email.match(validation)) {
    return {
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }
}
function verifySintaxPassword(password) {
  const quantity = 6;
  if (password.length < quantity) {
    return {
      message: 'O "password" deve ter pelo menos 6 caracteres',
    };
  }
}
function verifyLogin(email, password) {
  return (
    verifyEmail(email)
    || verifyPassword(password)
    || verifySintaxEmail(email)
    || verifySintaxPassword(password)
  );
}

module.exports = verifyLogin;
