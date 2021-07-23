import {expect} from 'chai';
import 'mocha';
import {createCredfinClient} from '../lib/index';
import * as dotenv from 'dotenv';

dotenv.config();

// Use your specific bundle id for testing this endpoint
const bundleId = '';
const summaryId = '963653';

// Note that es5 function syntax required otherwise breaks Chai
describe('Client Unit Tests', function () {
  const credfinClient = createCredfinClient({
    secret: process.env.CREDFIN_TOKEN_SECRET,
    identifier: process.env.CREDFIN_TOKEN_IDENTIFIER,
  });

  describe('application bundle', async function () {
    this.timeout(30000);
    before(async function () {
      try {
        this.accountList = await credfinClient.get(`/api/applications/${summaryId}/summary`);
      } catch (error) {
        console.error({
          config: error.config,
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        });
      }
    });

    it('Confirm Response Values is 200', async function () {
      console.log(`account id: ${JSON.stringify(this.accountList.data.id)}`);
      expect(this.accountList.status).to.equal(200);
    });

    it('Confirm that response contains id', async function () {
      expect(this.accountList.data.id).to.equal(+summaryId);
    });
  });
});
