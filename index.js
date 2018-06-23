const dialogflow = require('dialogflow');
const { buffer, text, json } = require('micro');
const cors = require('micro-cors')();

const handler = async (req, res) => {
  return 'hello';
};

module.exports = cors(handler);
