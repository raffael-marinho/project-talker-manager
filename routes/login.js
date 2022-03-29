const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
// const verifyLogin = require('../functions/functionEmail');
const token = require('../functions/functionToken');
// const fs = require('fs/promises');
const {
  verifyEmail,
  verifyPassword,
  verifySintaxEmail,
  verifySintaxPassword,
} = require('../functions/functionEmail');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
// const HTTP_NOT_FOUND_STATUS = 404;
// const HTTP_BAD_REQUEST_STATUS = 400;

router.post(
  '/',
  verifyEmail,
  verifyPassword,
  verifySintaxEmail,
  verifySintaxPassword,
  async (req, res) => {
  const tok = token();

  return res.status(HTTP_OK_STATUS).json({ token: tok });
},
);

module.exports = router;
