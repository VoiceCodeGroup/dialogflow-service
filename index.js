const dialogflow = require('dialogflow');
const { buffer, text, json } = require('micro');
const cors = require('micro-cors')();

const projectId = 'voxcode-3b433';
const sessionId = 'quickstart-session-id';

const languageCode = 'en-US';

// Instantiate a DialogFlow client.

const sessionClient = new dialogflow.SessionsClient({ keyFilename: 'VoxCode-25315b0b4fa3.json' });
// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

 const handler = async (req, res) => {
  const data = await json(req);
  console.log(data);
  const query = data.text;
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode
      }
    }
  };

  return sessionClient
    .detectIntent(request)
    .then(responses => {
      console.log('Detected intent');
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      //Won't parse objects that have double quotation marks in them already 
      var obj = JSON.parse(`{"response": "${result.fulfillmentText}"}`);
      console.log(obj);
      return obj;

      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }
    })
    .catch(err => {
      console.error('ERROR:', err);
      return '<div>Hello World!</div>';
    });
};

module.exports = cors(handler);
