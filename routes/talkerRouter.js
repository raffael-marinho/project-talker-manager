const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');
const fs = require('fs/promises');

const talkerJson = 'talker.json';

const authorizationToken = require('../functions/ValidateToken');
const {
  authorizationAge,
  authorizationName,
} = require('../functions/functionValidation');

const {
  authorizationTalk,
  authorizationTalkRate,
  authorizationTalkWatchedAt,
} = require('../functions/validationTalk');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NO_CONTENT_STATUS = 204;
const HTTP_NOT_FOUND_STATUS = 404;
router.get('/', async (_request, response) => {
  const talker = await fs.readFile(talkerJson, 'utf-8');
  // console.log(talker);
  const talkerObj = JSON.parse(talker);
  // console.log(talkerObj);
  if (!talkerObj) {
    return response.status(HTTP_OK_STATUS).send([]);
  }
  return response.status(HTTP_OK_STATUS).send(talkerObj);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(talkerJson, 'utf-8');
  const talkersObj = JSON.parse(talkers);
  const talker = talkersObj.find(
    (talkerObj) => talkerObj.id === parseInt(id, 20),
  );

  if (!talker) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  return res.status(HTTP_OK_STATUS).send(talker);
});

router.post(
  '/',
  authorizationToken,
  authorizationAge,
  authorizationName,
  authorizationTalk,
  authorizationTalkRate,
  authorizationTalkWatchedAt,
  async (req, res) => {
    const { name, age, talk } = req.body;
    // const newTalker = { name, age, talk };
    const talkers = await fs.readFile(talkerJson, 'utf-8');
    const talkersObj = JSON.parse(talkers);
    const objInfo = { name, age, talk, id: talkersObj.length + 1 };
    talkersObj.push(objInfo);
    await fs.writeFile(talkerJson, JSON.stringify(talkersObj));
    return res.status(HTTP_CREATED_STATUS).json(objInfo);
  },
);

router.put(
  '/:id',
  authorizationToken,
  authorizationAge,
  authorizationName,
  authorizationTalk,
  authorizationTalkRate,
  authorizationTalkWatchedAt,
  async (req, res) => {
    const { id } = req.params;
    // const { authorization } = req.headers;
    const { name, age, talk } = req.body;
    const talkers = await fs.readFile(talkerJson, 'utf-8');
    const talkersObj = JSON.parse(talkers);
    const talker = talkersObj.filter(
      (talkerObj) => talkerObj.id !== parseInt(id, 20),
    );
    const objInfo = { name, age, talk, id: Number(id) };
    talker.push(objInfo);
    await fs.writeFile(talkerJson, JSON.stringify(talker));
    return res.status(HTTP_OK_STATUS).send(objInfo);
  },
);

router.delete('/:id', authorizationToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(talkerJson, 'utf-8');
  const talkersObj = JSON.parse(talkers);
  const talker = talkersObj.filter(
    (talkerObj) => talkerObj.id !== parseInt(id, 20),
  );
  await fs.writeFile(talkerJson, JSON.stringify(talker));
  return res.status(HTTP_NO_CONTENT_STATUS).end();
});

module.exports = router;
