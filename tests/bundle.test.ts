import {expect} from 'chai';
import 'mocha';
import * as credfin from '../lib/index';
import * as dotenv from 'dotenv'

dotenv.config()

describe('smoke tests', () => {
  const credfinClient = new credfin.Client({
    secret: process.env.CREDFIN_SECRET,
    identifier: process.env.CREDFIN_IDENTIFIER,
    name: process.env.CREDFIN_NAME,
    environment: process.env.CREDFIN_ENV
  });

  describe('application bundle', () => {
    it('bundle', async () => {
      const accountList = await credfinClient.get('/api/applications/2313/bundle');
      expect(accountList.status).to.equal(200);
    }).timeout(30000);
  }) 
})
