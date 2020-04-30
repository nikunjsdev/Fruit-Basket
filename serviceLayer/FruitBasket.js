const Fruit = require('../serviceLayer/Fruit');

class FruitBasket {
  constructor (max_weight) {
    this.max_weight = max_weight;
    this.contents = [];
  }

  setId(id) {
    this.id = id;
  }

  setContent(content) {
    this.contents.push(new Fruit(content));
  }

  getOutput() {
    let output = this.contents.reduce((acc, item) => {
      acc.total_fruits = (acc.total_fruits || 0) + 1;
      acc.total_weight = (acc.total_weight || 0) + item.weight;

      if(acc.fruit_counts) {
        let fruitCountObj = acc.fruit_counts.find(({type}) => type === item.type);
        if(fruitCountObj) {
          fruitCountObj.count++;
        } else {
          acc.fruit_counts.push({type: item.type, count: 1});
        }
      } else {
        acc.fruit_counts = [{type: item.type, count: 1}];
      }
      return acc;
    }, {});

    if(output.total_weight > this.max_weight) {
      return null;
    }
    output.id = this.id;
    return output;
  }
}

module.exports = FruitBasket;