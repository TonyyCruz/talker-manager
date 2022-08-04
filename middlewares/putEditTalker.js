const { insertAndEditeTalker } = require('../services/insert&EditTalker');

//  ====  ENVIA O OBJETO COM O TALKER EDITADO POP "req.editedTalker" ==== //
const putEditTalker = async (req, res, next) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  try {
    const editedTalker = await insertAndEditeTalker({ name, age, talk, id });
    if (!editedTalker) return res.status(400).json({ message: 'Id Invalido' });
    req.editedTalker = editedTalker;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  putEditTalker,
};