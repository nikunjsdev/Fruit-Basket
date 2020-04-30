const chai = require('chai');
const assert = chai.assert;
const fruitBasketProblem = require('../fruitBasketProblem');

const actualArray = require('../data/input');
const expectedResult = [
  {
    "total_fruits":3,
    "total_weight":5,
    "fruit_counts":[
      {
        "type":"apple",
        "count":2
      },
      {
        "type":"pear",
        "count":1
      }
    ],
    "id":"1ceb8c95-736f-4da3-86d9-86d55893b38a"
  }
];

describe('Testing cases for fruit basket problem, for case', () => {

  it('where the output is correct', (done) => {
    fruitBasketProblem(actualArray, (err, actualResult) => {
      assert.deepEqual(expectedResult, actualResult, 'There is no matching output');
      done();
    });
  });

  it('where the output is null as weight is greater than max weight', (done) => {
    const inputArray = [{
      "id": "1ceb8c95-736f-4da3-86d9-86d55893b38a",
      "max_weight": 1,
      "contents": [{
        "type": "apple",
        "color": "green",
        "weight": 1.5
      }, {
        "type": "apple",
        "color": "red",
        "weight": 1
      }, {
        "type": "pear",
        "color": "green",
        "weight": 2.5
      }]
    }];
    let expectedArray = [null];
    fruitBasketProblem(inputArray, (err, actualResult) => {
      assert.deepEqual(expectedArray, actualResult, 'There is no matching output');
      done();
    });
  });
});