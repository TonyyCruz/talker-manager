const express = require('express');
const bodyParser = require('body-parser');
const talkerMiddleware = require('./middlewares/talkerMiddleware');
const loginMiddleware = require('./middlewares/loginMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talkerMiddleware.getTalkers);

app.get('/talker/:id', talkerMiddleware.getTalkerId);

app.post('/login', loginMiddleware.loginVerify);

app.listen(PORT, () => {
  console.log(`Online, PORT: ${PORT}`);
});
