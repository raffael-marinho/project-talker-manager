const HTTP_BAD_REQUEST_STATUS = 400;
function authorizationTalkWatchedAt(req, res, next) {
  const { watchedAt } = req.body.talk;
  const validDate = /^(((?=3)3[0-1])|(?=[0-2])[0-2][1-9])\/(((?=1)1[0-2])|0[1-9])\/\d{4}/;
  if (!watchedAt.match(validDate)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
}
function authorizationTalkRate(req, res, next) {
  const { rate } = req.body.talk;
  if (rate < 1 || rate > 5) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
}
function authorizationTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk || talk.rate === undefined || !talk.watchedAt) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
}

module.exports = {
  authorizationTalk,
  authorizationTalkRate,
  authorizationTalkWatchedAt,
};
