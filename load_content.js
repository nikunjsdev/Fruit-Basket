const fs = require('fs');
const path = process.argv[2];

async function getFileContents(path, callback) {

  const fileExist = await _checkFileExist(path);
  if (!fileExist) {
    return callback(new Error('File does not exist'));
  }

  try {
    const stats = await _getFileStat(path);
    console.log(stats);

    if (stats.size === 0) {
      return callback(new Error('File exists but there is no content'));
    }

    const buffer = await _getFileBuffer(path);
    return callback(null, buffer);

  } catch(err) {
    return callback(new Error('Error trying to get stats'));
  }
}

async function _checkFileExist(path) {
  return new Promise((resolve) => {
    fs.exists(path, (fileExist) => {
      return resolve(fileExist)
    })
  })
}

async function _getFileStat(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (error, fileStat) => {
      if (error) {
        return reject(error);
      }
      return resolve(fileStat)
    })
  })
}

async function _getFileBuffer(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, buffer) => {
      if (err) {
        return reject(err);
      }
      return resolve(buffer);
    })
  })
}

if(!path) {
  console.error('The file path name is missing');
  process.exit(1);
}

getFileContents(path, (err) => {
  if (err) {
    console.error(`There was an error getting contents for ${path}`, err);
    process.exit(1);
  }
  console.info('File was found and the contents were loaded');
  process.exit(0);
});
