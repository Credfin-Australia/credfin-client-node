import * as crypto from "crypto";
import * as axios from "axios";

interface CredfinClient {
  environment?: string;
  secret?: string;
  identifier?: string;
  name?: string;
}

class Client {
  private instance: axios.AxiosInstance;
  private secret: string;
  private identifier: string;
  private name: string;


  constructor(credfinClient: CredfinClient) {
    const {secret, identifier, name, environment} = credfinClient;
    if (!secret) {
      throw new Error(
        "Required environment variable CREDFIN_SECRET=<webhook secret>"
      );
    }

    if (!identifier) {
      throw new Error(
        "Required environment variable CREDFIN_IDENTIFER=<webhook indentifer>"
      );
    }

    if (!name) {
      throw new Error(
        "Required environment variable CREDFIN_NAME=<webhook name>"
      );
    }

    if (environment === 'STAGING') {
      console.log('Using credfin staging enviroment');
    } else if (environment === 'PRODUCTION') {
      console.log('Using credfin production enviroment');
    } else  {
      throw new Error(
        "Required environment variable CREDFIN_ENV=<STAGING | PRODUCTION>" 
      );
    }
    // Returned from web hooks refer to webhook docs

    this.secret = secret;
    this.identifier = identifier;
    this.name = name;

    const baseURL = environment === 'PRODUCTION' ? `https://credfin.io` : `https://staging.credfin.io`;
    // TODO Remove when this.name used
    console.log(this.name);

    this.instance = axios.default.create({
      baseURL,
    });

    // Enable logging with debug
    if (process.env.NODE_ENV === 'debug') {
      this.instance.interceptors.request.use((request) => {
        console.log("Starting Request", request);
        console.log(request.method);
        return request;
      });

      this.instance.interceptors.response.use((response) => {
        console.log("Response:", response);
        return response;
      });
    }
  }

  async get(path: string, errorHandler: (err: axios.AxiosError) => any) {
    const method = "GET";
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

  async post(path: string, post: any = null) {
    const method = "POST";
    const headers = await this.generateHmacHeaders(path, method, post);
    const response = await this.instance
      .request({
        url: path,
        headers,
        method,
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
        throw new Error(err);
      });
    return response;
  }

  async put(path: string) {
    const method = "PUT";
    const headers = await this.generateHmacHeaders(path, method);
    const response = await this.instance
      .request({
        url: path,
        headers,
        method,
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
        throw new Error(err);
      });
    return response;
  }

  async delete(path: string) {
    const method = "DELETE";
    const headers = await this.generateHmacHeaders(path, method);
    const response = await this.instance
      .request({
        url: path,
        headers,
        method,
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
        throw new Error(err);
      });
    return response;
  }

  private async generateHmacHeaders(path: string, method: axios.Method, body?: any) {
    const timestamp = new Date().toUTCString();
    const contentType = "application/json";

    const hash = crypto.createHash("md5");
    if (body) {
      hash.update(body);
    }

    const contentMD5 = hash.digest("base64");

    const messageParts = [method, contentMD5, contentType, timestamp, path];
    const message = messageParts.join("\n");

    const hmac = crypto.createHmac("sha256", this.secret);
    hmac.update(message);
    const hmacBase64 = hmac.digest("base64");
    console.log(`HMAC ${this.identifier}:${hmacBase64}`);

    const headers = {
      Date: timestamp,
      "Content-MD5": contentMD5,
      "Content-Type": contentType,
      Authorization: `HMAC ${this.identifier}:${hmacBase64}`,
    };

    return headers;
  }
}

export { Client };
