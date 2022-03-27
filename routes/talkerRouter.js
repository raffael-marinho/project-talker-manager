const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
router.get('/talker', async (_request, response) => {
  const talker = await fs.readFile('talker.json', 'utf-8');
  // console.log(talker);
  const talkerObj = JSON.parse(talker);
  // console.log(talkerObj);
  if (!talkerObj) {
    return response.status(HTTP_OK_STATUS).send([]);
  }
  return response.status(HTTP_OK_STATUS).send(talkerObj);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile('talker.json', 'utf-8');
  const talkersObj = JSON.parse(talkers);
  const talker = talkersObj.find((talkerObj) => talkerObj.id === parseInt(id, 20));

  if (!talker) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  return res.status(HTTP_OK_STATUS).send(talker);
});

module.exports = router;
