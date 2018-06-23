const express = require('express');
const app = express();
const prettier = require('prettier');
require('dotenv').load();

// You can find your project ID in your Dialogflow agent settings
const projectId = 'voxcode-3b433';
const sessionId = 'quickstart-session-id';

const languageCode = 'en-US';

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');

const sessionClient = new dialogflow.SessionsClient({ keyFilename: 'VoxCode-25315b0b4fa3.json' });
// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

app.get('/:shape/:color', function(req, res) {
  const query = `create a ${req.params.color} ${req.params.shape}`;

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

  // Send request and log result
  sessionClient
    .detectIntent(request)
    .then(responses => {
      console.log('Detected intent');
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

  console.log(req.params);
  sessionClient
    .detectIntent(request)
    .then(responses => {
      console.log('Detected intent');
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      res.send(result.fulfillmentText);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }
    })
    .catch(err => {
      res.send('<div>Hello World!</div>');
      console.error('ERROR:', err);
    });
});

app.get('/prettier', function(req, res) {
  console.log(prettier.format('<div>hi<div>hi<div>div</div></div></div>'));
  res.send(prettier.format('<div>hi<div>hi<div>div</div></div></div>'));
});

const port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log('Example app listening on port!' + port);
});
