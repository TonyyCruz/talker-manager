const { getTalkers, getTalkerId } = require('./getTalker');
const { loginVerify } = require('./postLogin');
const { talkerValidation } = require('./talkerValidation');
const { tokenValidation } = require('./tokenValidation');
const { deleteTalker } = require('./deleteTalker');
const { queryTalker } = require('./queryTalker');

module.exports = {
  getTalkers,
  getTalkerId,
  loginVerify,
  talkerValidation,
  tokenValidation,
  deleteTalker,
  queryTalker,
};