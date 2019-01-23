const brain = require('brain.js');
const data = require('./trainingData.json');

const network = new brain.recurrent.LSTM();

const trainingData = data.map(item => ({
  input: item.text,
  output: item.category
}));

network.train(trainingData, {
  iterations: 100
});

const output = network.run("learn to code");
//make sure user is on session and filter by userID
console.log(`Category: ${output}`);

// search by category body and brain.