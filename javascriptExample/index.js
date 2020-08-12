const {Client} = require('@credfin/client');
require('dotenv').config();

const summaryId = '47316';

const client = new Client({
  identifier: process.env.CREDFIN_TOKEN_IDENTIFIER,
  secret: process.env.CREDFIN_TOKEN_SECRET
});

const example = async () => {
  const response = await client.get(`/api/applications/${summaryId}/summary`, (err) => {
    if (err.response) {
      console.log(err.response.data);
    }
    throw new Error(err.message);
  });
  
  console.log(JSON.stringify(response.data, null, 1));
};

example();

