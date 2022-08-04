const insertJsonFile = require('../services/insertJsonFile');

const regexData = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

const tokenIsRequired = 'Token não encontrado';
const tokenInvalid = 'Token inválido';
const nameIsRequired = 'O campo "name" é obrigatório';
const nameInvalid = 'O "name" deve ter pelo menos 3 caracteres';
const ageIsRequired = '"O campo "age" é obrigatório';
const ageInvalid = 'A pessoa palestrante deve ser maior de idade';
const talkIsRequired = 'O campo "talk" é obrigatório';
const watchedAtIsRequired = 'O campo "watchedAt" é obrigatório';
const invalidDate = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
const rateIsRequired = 'O campo "rate" é obrigatório';
const invalidRate = 'O campo "rate" deve ser um inteiro de 1 à 5';

const verifyToken = (token) => {
  if (!token) return { message: tokenIsRequired, status: 401, fail: true };
  if (token.length !== 16) return { message: tokenInvalid, status: 401, fail: true };
  return { fail: false };
};

const nameAndAgeVerify = (name, age) => {
  if (!name) return { message: nameIsRequired, status: 400, fail: true };
  if (name.length < 3) return { message: nameInvalid, status: 400, fail: true };
  if (!age) return { message: ageIsRequired, status: 400, fail: true };
  if (age < 18) return { message: ageInvalid, status: 400, fail: true };
  return { fail: false };
};

const verifyWatchedAt = (watchedAt) => {
  if (!watchedAt) return { message: watchedAtIsRequired, status: 400, fail: true };
  if (!regexData.test(watchedAt)) return { message: invalidDate, status: 400, fail: true };
  return { fail: false };
};

const verifyRate = (rate) => {
  if (!rate) return { message: rateIsRequired, status: 400, fail: true };
  const checkRate = Number.isInteger(rate) && rate > 0 && rate < 6;
  if (!checkRate) return { message: invalidRate, status: 400, fail: true };
  return { fail: false };
};

const talkVerify = (talk) => {
  if (!talk) return { message: talkIsRequired, status: 400, fail: true };

  const watch = verifyWatchedAt(talk.watchedAt);
  if (watch.fail) return { message: watch.message, status: watch.status, fail: watch.fail };

  const rate = verifyRate(talk.rate);
  if (rate.fail) return { message: rate.message, status: rate.status, fail: rate.fail };

  return { fail: false };
};

const postTalker = async (req, res, next) => {
  const { name, age, talk } = req.body;
  const { authorization } = req.headers;

  const tokenVal = verifyToken(authorization);
  if (tokenVal.fail) return res.status(tokenVal.status).json({ message: tokenVal.message });

  const nameAndAge = nameAndAgeVerify(name, age);
  if (nameAndAge.fail) return res.status(nameAndAge.status).json({ message: nameAndAge.message });
  
  const talkChk = talkVerify(talk);
  if (talkChk.fail) return res.status(talkChk.status).json({ message: talkChk.message });

  try {
    const newTalker = await insertJsonFile(name, age, talk);
    res.status(201).json(newTalker);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postTalker,
};