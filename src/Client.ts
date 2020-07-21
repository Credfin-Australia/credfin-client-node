import * as crypto from 'crypto';
import * as axios from 'axios';

interface CredfinClient {
  secret?: string;
  identifier?: string;
}

class Client {
  private instance: axios.AxiosInstance;
  private secret: string;
  private identifier: string;

  constructor(credfinClient: CredfinClient) {
    const { secret, identifier } = credfinClient;
    const requiredMessage = 'https://credfin.io/dashboard/user-settings';

    if (!secret) {
      throw new Error(`Missing Secret ${requiredMessage}`);
    }

    if (!identifier) {
      throw new Error(`Missing identifier ${requiredMessage}`);
    }

    this.secret = secret;
    this.identifier = identifier;

    const baseURL = 'https://credfin.io';

    this.instance = axios.default.create({
      baseURL,
    });

    // Enable logging with debug
    if (process.env.NODE_ENV === 'debug') {
      this.instance.interceptors.request.use((request) => {
        console.log('Starting Request', request);
        console.log(request.method);
        return request;
      });

      this.instance.interceptors.response.use((response) => {
        console.log('Response:', response);
        return response;
      });
    }
  }

  async get(path: string, errorHandler: (err: axios.AxiosError) => any): Promise<any> {
    const method = 'GET';
    const headers = await this.generateHmacHeaders(path, method);
    const response = await this.instance
      .request({
        url: path,
        headers,
        method,
      })
      .catch(errorHandler);
    return response;
  }

  private async generateHmacHeaders(
    path: string,
    method: axios.Method,
    body?: any
  ) {
    const timestamp = new Date().toUTCString();
    const contentType = 'application/json';

    const hash = crypto.createHash('md5');
    if (body) {
      hash.update(body);
    }

    const contentMD5 = hash.digest('base64');

    const messageParts = [method, contentMD5, contentType, timestamp, path];
    const message = messageParts.join('\n');

    const hmac = crypto.createHmac('sha256', this.secret);
    hmac.update(message);
    const hmacBase64 = hmac.digest('base64');
    console.log(`HMAC ${this.identifier}:${hmacBase64}`);

    const headers = {
      Date: timestamp,
      'Content-MD5': contentMD5,
      'Content-Type': contentType,
      Authorization: `HMAC ${this.identifier}:${hmacBase64}`,
    };

    return headers;
  }
}

export { Client };
