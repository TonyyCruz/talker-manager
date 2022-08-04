const express = require('express');
const bodyParser = require('body-parser');
const { getTalkers, getTalkerId } = require('./middlewares/getTalker');
const { loginVerify } = require('./middlewares/postLogin');
const { postTalker } = require('./middlewares/postTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getTalkers);

app.get('/talker/:id', getTalkerId);

app.post('/login', loginVerify);

app.post('/talker', postTalker);

app.listen(PORT, () => {
  console.log(`Online, PORT: ${PORT}`);
});
