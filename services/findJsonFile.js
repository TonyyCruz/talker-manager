const fs = require('fs/promises');

const catchJsonFile = async (file) => {
  try {
    const talkers = await fs.readFile(file, 'utf-8');
    if (talkers.length === 0 || talkers === '') return [];
    return JSON.parse(talkers);
  } catch (err) {
      throw new Error(err);
    }
};

module.exports = catchJsonFile;