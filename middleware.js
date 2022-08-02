const fs = require('fs/promises');

// const catchJsonFile = (file) => JSON.parse(fs.readFile(file, 'utf-8'));

const getTalkers = async (_req, res, next) => {
  try {
    const talkers = await fs.readFile('talker.json', 'utf-8');
    if (talkers.length === 0 || talkers === '') {
      return res.status(200).json([]);
    }

    const jsonTalkers = JSON.parse(talkers);
    res.status(200).json(jsonTalkers);
  } catch (err) {
    next(err);
  }
};

// const getTalkerId = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const talkers = await fs.readFile('talker.json', 'utf-8');
//     const jsonTalkers = JSON.parse(talkers);
//     if (jsonTalkers === undefined) 

//     res.status(200).json(jsonTalkers);
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = {
  getTalkers,
  // getTalkerId,
};