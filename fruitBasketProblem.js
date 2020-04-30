const fs = require('fs');
const input = require('./data/input');
const FruitBasket = require('./serviceLayer/FruitBasket');

async function outputFruitBasket(fruitBasketArray, callback) {
  let outputArray = [];
  fruitBasketArray.forEach((fruitBasketObj) => {
    let fruitBasket = new FruitBasket(fruitBasketObj.max_weight);
    fruitBasket.setId(fruitBasketObj.id);
    fruitBasketObj.contents.forEach((content) => {
      fruitBasket.setContent(content);
    });
    let outputObj = fruitBasket.getOutput();
    outputArray.push(outputObj);
  });

  try {
    await _writeToFile(JSON.stringify(outputArray));
    callback(null, outputArray);
  } catch (e) {
    callback(e);
  }
}

async function _writeToFile(fileData) {
  var path = './data/output.json'
  return new Promise((resolve, reject) => {
    fs.writeFile(path, fileData, (err) => {
      if (err) {
        reject(new Error('There was an error while writing into the file'));
      }
      return resolve();
    });
  })
}

outputFruitBasket(input, (err, outputArray) => {
  if (err) {
    console.error(`There was an error while processing fruit basket problem`, err);
  } else {
    console.info('Fruit basket problem executed successfully');
  }
});

module.exports = outputFruitBasket;