const express = require('express');
const bodyParser = require('body-parser');
const {
  getTalkers,
  getTalkerId,
  loginVerify,
  talkerValidation,
  tokenValidation,
  deleteTalker,
  queryTalker,
  putEditTalker,
  postAddTalker,
} = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getTalkers);

app.get('/talker/search', tokenValidation, queryTalker);

app.get('/talker/:id', getTalkerId);

app.post('/login', loginVerify);

app.use(tokenValidation);

app.post('/talker', talkerValidation, postAddTalker, (req, res) => {
  const { newTalker } = req;
  res.status(201).json(newTalker);
});

app.put('/talker/:id', talkerValidation, putEditTalker, (req, res) => {
  const { editedTalker } = req;
  res.status(200).json(editedTalker);
});

app.delete('/talker/:id', deleteTalker, (_req, res) => {
  res.status(204).json();
});

app.all('*', (req, res) => {
  res.status(404).json({ message: `A rota ${req.path} não existe.` });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Online, PORT: ${PORT}`);
});
