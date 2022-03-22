const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
router.get('/talker', async (_request, response) => {
  const talker = await fs.readFile('talker.json');
  const talkerObj = JSON.parse(talker);
  if (!talkerObj) {
    return response.status(HTTP_OK_STATUS).send([]);
  }
  return response.status(HTTP_OK_STATUS).send(talkerObj);
});

module.exports = router;
