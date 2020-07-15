import * as credfin from './Client';

import * as dotenv from 'dotenv'
dotenv.config()

const credfinClient = new credfin.Client();

const test = async () => {
const accountList = await credfinClient.get('/api/applications/963022/bundle');

if (accountList) {
  console.log(accountList.headers);
}

};

test();
