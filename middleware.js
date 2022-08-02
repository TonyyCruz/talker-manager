const fs = require('fs/promises');

const catchJsonFile = async (file) => {
  try {
    const talkers = await fs.readFile(file, 'utf-8');
    if (talkers.length === 0 || talkers === '') { return []; }
    return JSON.parse(talkers);
  } catch (err) {
      throw new Error(err);
    }
};

const getTalkers = async (_req, res, next) => {
  try {
    const jsonTalkers = await catchJsonFile('talker.json');
        if (jsonTalkers.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(jsonTalkers);
  } catch (err) {
    next(err);
  }
};

const getTalkerId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const jsonTalkers = await catchJsonFile('talker.json');
    const selectedPerson = jsonTalkers.filter((p) => p.id === Number(id));

    if (selectedPerson.length === 0) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    res.status(200).json(selectedPerson);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTalkers,
  getTalkerId,
};