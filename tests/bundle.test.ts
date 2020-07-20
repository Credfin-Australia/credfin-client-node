import {expect} from 'chai';
import 'mocha';
import * as credfin from '../lib/index';
import * as dotenv from 'dotenv'

dotenv.config()

// Returned from web hooks refer to webhook docs
const bundleId = '2313';

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

    it('error handling', async () => {
      const accountList = await credfinClient.get(`/api/applications//bundle`,
      (err) => {
        if (err.response) {
          console.log(err.response.data);
        }
        return err.message;
      })
      expect(accountList).to.be.a('string');
    }).timeout(30000);
  }) 
})
