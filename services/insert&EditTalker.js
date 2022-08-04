const fs = require('fs/promises');
const catchJsonFile = require('./findJsonFile');

const talkerFile = 'talker.json';
const idFile = 'improvisedId.json';

const improvisedId = async () => {
  try {
    const savedId = await catchJsonFile(idFile);
    if (savedId.length === 0) {
      const talkers = await catchJsonFile(talkerFile);
      const lastId = talkers[talkers.length - 1].id;
      const id = JSON.stringify({ id: lastId + 1 });
      fs.writeFile(idFile, id);
      return lastId + 1;
    }
    const id = JSON.stringify({ id: savedId.id + 1 });
    fs.writeFile(idFile, id);
    return savedId.id + 1;
  } catch (err) {
    throw new Error(err);
  }
};

const editeJsonFile = async (name, age, talk, id) => {
  const newTalkerObj = { name, age, id: Number(id), talk };
  const fileData = await catchJsonFile(talkerFile);
  const talkerIdx = fileData.findIndex((t) => t.id === Number(id));
  if (talkerIdx < 0) return false;
  fileData.splice(talkerIdx, 1, newTalkerObj);
  fs.writeFile(talkerFile, JSON.stringify(fileData, null, 2));
  return newTalkerObj;
};

// ==== CASO RECEBA UM ID IRA EDITAR, SE NÃO REFEBER O ID IRA ADICIONAR ==== //
const insertAndEditeTalker = async ({ name, age, talk, id }) => {
  if (id) return editeJsonFile(name, age, talk, id);

  const fileData = await catchJsonFile(talkerFile);
  const newId = await improvisedId();
  const newTalkerObj = { id: newId, name, age, talk };
  const newFileData = JSON.stringify([...fileData, newTalkerObj], null, 2);

  try {
    fs.writeFile(talkerFile, newFileData);
    return newTalkerObj;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = insertAndEditeTalker;