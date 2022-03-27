const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const verifyLogin = require('../functions/functionEmail');
const token = require('../functions/functionToken');
// const fs = require('fs/promises');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
// const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_BAD_REQUEST_STATUS = 400;

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const verify = verifyLogin(email, password);
  const tok = token();
  // console.log(tok);
  
  // console.log(verify);
  if (verify) {
    return res.status(HTTP_BAD_REQUEST_STATUS).send(verify);
  } 
  return res.status(HTTP_OK_STATUS).json({ token: tok });
});

module.exports = router;
