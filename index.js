const express = require('express');
const bodyParser = require('body-parser');
const { getTalkers, getTalkerId } = require('./middlewares/getTalker');
const { loginVerify } = require('./middlewares/postLogin');
const { postTalkerTest } = require('./middlewares/talkerTest');
const insertAndEditeTalker = require('./services/insert&EditTalker');
const { tokenValidation } = require('./middlewares/tokenValidation');
const { deleteTalker } = require('./middlewares/deleteTalker');
const { queryTalker } = require('./middlewares/queryTalker');

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

app.post('/talker', postTalkerTest, async (req, res, next) => {
  const { name, age, talk } = req.body;
  try {
    const newTalker = await insertAndEditeTalker({ name, age, talk });
    res.status(201).json(newTalker);
  } catch (err) {
    next(err);
  }
});

app.put('/talker/:id', postTalkerTest, async (req, res, next) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  try {
    const editedTalker = await insertAndEditeTalker({ name, age, talk, id });
    if (!editedTalker) return res.status(400).json({ message: 'Id Invalido' });
    res.status(200).json(editedTalker);
  } catch (err) {
    next(err);
  }
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
