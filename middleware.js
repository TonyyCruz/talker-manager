const fs = require('fs/promises');

const getTalkers = async (req, res, next) => {
  try {
    const talkers = await fs.readFile('talker.json', 'utf-8');
    const jsonTalkers = JSON.parse(talkers);
    res.status(200).json(jsonTalkers);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTalkers,
};