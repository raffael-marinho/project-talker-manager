const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  // response.status(HTTP_OK_STATUS).send();
  const talker = await fs.readFile('talker.json');
  const talkerObj = JSON.parse(talker);
  if (!talkerObj) {
    return response.status(HTTP_OK_STATUS).send([]);
  }
  return response.status(HTTP_OK_STATUS).send(talkerObj);
});

app.listen(PORT, () => {
  console.log('Online');
});
