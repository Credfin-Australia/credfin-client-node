import {createHash, createHmac} from 'crypto';
import Axios, {AxiosInstance} from 'axios';

const baseURL = 'https://credfin.io';

export interface CredfinApiToken {
  secret: string;
  identifier: string;
}

export interface HmacOptions {
  method: string;
  path: string;
  body?: string;
}

export const generateHmacHeaders = (
  {secret, identifier}: CredfinApiToken,
  {method, path, body}: HmacOptions,
): Record<string, string> => {
  const timestamp = new Date().toUTCString();
  const contentType = 'application/json';

  const hash = createHash('md5');
  if (body) {
    hash.update(body);
  }

  const contentMD5 = hash.digest('base64');

  const message = [method.toUpperCase(), contentMD5, contentType, timestamp, path].join('\n');

  const hmac = createHmac('sha256', secret);
  hmac.update(message);
  const hmacBase64 = hmac.digest('base64');

  const headers = {
    Date: timestamp,
    'Content-MD5': contentMD5,
    'Content-Type': 'application/json',
    Authorization: `HMAC ${identifier}:${hmacBase64}`,
  };

  return headers;
};

export const createCredfinClient = (token: CredfinApiToken): AxiosInstance => {
  const instance: AxiosInstance = Axios.create({baseURL});

  instance.interceptors.request.use((request) => {
    const headers = generateHmacHeaders(token, {
      method: request.method || 'GET',
      path: request.url || '',
      body: request.data,
    });

    request.headers = {...headers, ...request.headers};

    return request;
  });

  // Enable logging with debug
  if (process.env.NODE_ENV === 'debug') {
    instance.interceptors.request.use((request) => {
      console.log('Starting Request', request);
      return request;
    });

    instance.interceptors.response.use((response) => {
      console.log('Response', response);
      return response;
    });
  }

  return instance;
};
