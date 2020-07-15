import * as crypto from "crypto";
import * as axios from 'axios';

const instance = axios.default.create({
  baseURL: 'https://staging.credfin.io'
});

// Enable logging with debug
instance.interceptors.request.use(request => {
  console.log('Starting Request', request)
  console.log(request.method);
  return request
})

instance.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
})

class Client {
  constructor() {
  }

  async get(path: string) {
    const method = 'GET';
    const headers = await getFromAPI(path, method);
    const response = await instance.request({
      url: path,
      headers,
      method,
    }).catch((err) => {
      if (err.response) {
        console.log(err.response.data);
      }
      throw new Error(err);
    });

    return response;
  }

  async post(path: string, post: any = null) {
    const method = 'POST';
    const headers = await getFromAPI(path, method, post);
    const response = await instance.request({
      url: path,
      headers,
      method,
    }).catch((err) => {
      if (err.response) {
        console.log(err.response.data);
      }
      throw new Error(err);
    });
    return response;
  }

  async put(path: string) {
    const method = 'PUT';
    const headers = await getFromAPI(path, method);
    const response = await instance.request({
      url: path,
      headers,
      method,
    }).catch((err) => {
      if (err.response) {
        console.log(err.response.data);
      }
      throw new Error(err);
    });
    return response;
  }

  async delete(path: string) {
    const method = 'DELETE';
    const headers = await getFromAPI(path, method);
    const response = await instance.request({
      url: path,
      headers,
      method,
    }).catch((err) => {
      if (err.response) {
        console.log(err.response.data);
      }
      throw new Error(err);
    });
    return response;
  }
}

const getFromAPI = async (path: string, method: axios.Method, body?: any) => {
  // TODO Move to config file
  const secret = process.env.CREDFIN_SECRET;
  console.log(secret);
  const identifier = process.env.CREDFIN_IDENTIFIER;
  const name = process.env.CREDFIN_NAME;

  console.log(`${secret} ${identifier} ${name}`);
  if (!secret) {
    throw new Error('Required environment variable CREDFIN_SECRET=<webhook secret>');
  }

  if (!identifier) {
    throw new Error('Required environment variable CREDFIN_IDENTIFER=<webhook indentifer>');
  }

  if (!name) {
    throw new Error('Required environment variable CREDFIN_NAME=<webhook name>')
  }

  const timestamp = new Date().toUTCString();
  const contentType = "application/json";

  const hash = crypto.createHash("md5");
  if (body) {
    hash.update(body);
  }

  const contentMD5 = hash.digest("base64");

  const messageParts = [method, contentMD5, contentType, timestamp, path];
  const message = messageParts.join("\n");

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);
  const hmacBase64 = hmac.digest("base64");
  console.log(`HMAC ${identifier}:${hmacBase64}`);

  const headers = {
    "Date": timestamp,
    "Content-MD5": contentMD5,
    "Content-Type": contentType,
    "Authorization": `HMAC ${identifier}:${hmacBase64}`,
  };

  return headers;
};

export { Client };
