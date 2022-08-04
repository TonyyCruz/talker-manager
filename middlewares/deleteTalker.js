const fs = require('fs/promises');
const findJsonFile = require('../services/findJsonFile');

const talkerFile = 'talker.json';

const deleteTalker = async (req, res, next) => {
  const { id } = req.params;
  try {
    const fileData = await findJsonFile(talkerFile);
    const talkerIdx = fileData.findIndex((t) => t.id === Number(id));
    if (talkerIdx < 0) return res.status(400).json({ message: 'Id invalido' });
    fileData.splice(talkerIdx, 1);
    fs.writeFile(talkerFile, JSON.stringify(fileData, null, 2));

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  deleteTalker,
};