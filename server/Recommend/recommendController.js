const brain = require('brain.js');
const data = require('./trainingData.json');

const network = new brain.recurrent.LSTM();

module.exports = {
  recommendCategory: (req, res) => {
    const trainingData = data.map(item => ({
      input: item.text,
      output: item.category
    }));
    
    network.train(trainingData, {
      iterations: 25
    });
    const {text} = req.query;
    const output = network.run(text);
    console.log(text)
    //make sure user is on session and filter by userID
    console.log(`Category: ${output}`)
    res.status(200).send(output);
    
    // search by category body and brain.
  },
  getBrain: async (req, res) => {
    const db = req.app.get('db');
    let getBrain = await db.recommend_brain();
    res.status(200).send(getBrain)
  },
  getBody: async (req, res) => {
    const db = req.app.get('db');
    let getBody = await db.recommend_body();
    res.status(200).send(getBody)
  }
}

