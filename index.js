const express = require('express');
const bodyParser = require('body-parser');
const { getTalkers, getTalkerId } = require('./middlewares/getTalker');
const { loginVerify } = require('./middlewares/postLogin');
const { postTalkerTest } = require('./middlewares/talkerTest');
const insertJsonFile = require('./services/insertJsonFile');

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

app.post('/talker', postTalkerTest, async (req, res, next) => {
  const { name, age, talk } = req.body;
  try {
    const newTalker = await insertJsonFile({ name, age, talk });
    res.status(201).json(newTalker);
  } catch (err) {
    next(err);
  }
});

app.put('/talker/:id', postTalkerTest, async (req, res, next) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  try {
    const editedTalker = await insertJsonFile({ name, age, talk, id });
    if (!editedTalker) return res.status(400).json({ message: 'Id Invalido' });
    res.status(200).json(editedTalker);
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Online, PORT: ${PORT}`);
});
