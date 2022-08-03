const fs = require('fs/promises');
const catchJsonFile = require('./findJsonFile');

const insertJsonFile = async (name, age, talk) => {
  const fileData = await catchJsonFile('talker.json');
  const newTalkerObj = {
    id: fileData.length + 1,
    name,
    age,
    talk,
  };

  const newFileData = fileData.push(newTalkerObj);

  try {
    fs.writeFile('talker.json', newFileData);
    return newTalkerObj;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = insertJsonFile;