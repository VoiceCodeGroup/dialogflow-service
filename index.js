const dialogflow = require('dialogflow');
const { buffer, text, json } = require('micro');
const cors = require('micro-cors')();

const handler = async (req, res) => {
  const data = await json(req);
  console.log('Request', data);
  const projectId = 'voxcode-3b433';
  const sessionId = 'quickstart-session-id';
  const languageCode = 'en-US';
  const sessionClient = new dialogflow.SessionsClient({ keyFilename: 'VoxCode-25315b0b4fa3.json' });
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const query = data.text;
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode
      }
    }
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    console.log('RES', result);

    return result;
  } catch (err) {
    console.error('ERROR:', err);
    return '<div>Hello World!</div>';
  }
};

module.exports = cors(handler);
