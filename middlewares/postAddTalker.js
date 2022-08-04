const { insertAndEditeTalker } = require('../services/insert&EditTalker');

//  ====  ENVIA O OBJETO COM O TALKER EDITADO POP "req.editedTalker" ==== //
const postAddTalker = async (req, res, next) => {
  const { name, age, talk } = req.body;
  try {
    const newTalker = await insertAndEditeTalker({ name, age, talk });
    req.newTalker = newTalker;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postAddTalker,
};
