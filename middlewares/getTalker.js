const findJsonFile = require('../services/findJsonFile');

const getTalkers = async (_req, res, next) => {
  try {
    const jsonTalkers = await findJsonFile('talker.json');
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
    const jsonTalkers = await findJsonFile('talker.json');
    const selectedPerson = jsonTalkers.find((p) => p.id === Number(id));

    if (!selectedPerson) {
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