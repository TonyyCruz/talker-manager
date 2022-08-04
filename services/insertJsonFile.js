const fs = require('fs/promises');
const catchJsonFile = require('./findJsonFile');

const improvisedId = async () => {
  try {
    const savedId = await catchJsonFile('improvisedId.json');
    if (savedId.length === 0) {
      const talkers = await catchJsonFile('talker.json');
      const lastId = talkers[talkers.length - 1].id;
      const id = JSON.stringify({ id: lastId + 1 });
      fs.writeFile('improvisedId.json', id);
      return lastId + 1;
    }
    const id = JSON.stringify({ id: savedId.id + 1 });
    fs.writeFile('improvisedId.json', id);
    return savedId.id + 1;
  } catch (err) {
    throw new Error(err);
  }
};

const insertJsonFile = async (name, age, talk) => {
  const fileData = await catchJsonFile('talker.json');
  const newId = await improvisedId();
  const newTalkerObj = {
    id: newId,
    name,
    age,
    talk,
  };

  const newFileData = JSON.stringify([...fileData, newTalkerObj], null, 2);

  try {
    fs.writeFile('talker.json', newFileData);
    return newTalkerObj;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = insertJsonFile;