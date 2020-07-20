import {expect} from 'chai';
import 'mocha';
import * as credfin from '../lib/index';
import * as dotenv from 'dotenv'

dotenv.config()

// Use your specific bundle id for testing this endpoint
const bundleId = '963079';

describe('unit tests', () => {
  const credfinClient = new credfin.Client({
    secret: process.env.CREDFIN_SECRET,
    identifier: process.env.CREDFIN_IDENTIFIER,
    name: process.env.CREDFIN_NAME,
    environment: process.env.CREDFIN_ENV
  });

  describe('application bundle', () => {
    it('bundle', async () => {
      const accountList = await credfinClient.get(`/api/applications/${bundleId}/bundle`,
      (err) => {
        if (err.response) {
          console.log(err.response.data);
        }
        throw new Error(err.message);
      })
      expect(accountList.status).to.equal(200);
    }).timeout(30000);
  }) 
})
