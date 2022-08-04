const findJsonFile = require('../services/findJsonFile');

const queryTalker = async (req, res, next) => {
  const { q } = req.query;
  try {
    const talkers = await findJsonFile('talker.json');
    if (!q || q === undefined) return res.status(200).json(talkers);
    const searchTalker = talkers.filter(({ name }) => (
      name.toLowerCase().includes(q.toLowerCase())));

      res.status(200).json(searchTalker);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  queryTalker,
};