"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var crypto = require("crypto");
var axios = require("axios");
var Client = /** @class */ (function () {
    function Client(credfinClient) {
        var secret = credfinClient.secret, identifier = credfinClient.identifier, name = credfinClient.name, environment = credfinClient.environment;
        if (!secret) {
            throw new Error("Required environment variable CREDFIN_SECRET=<webhook secret>");
        }
        if (!identifier) {
            throw new Error("Required environment variable CREDFIN_IDENTIFER=<webhook indentifer>");
        }
        if (!name) {
            throw new Error("Required environment variable CREDFIN_NAME=<webhook name>");
        }
        if (environment === 'STAGING') {
            console.log('Using credfin staging enviroment');
        }
        else if (environment === 'PRODUCTION') {
            console.log('Using credfin production enviroment');
        }
        else {
            throw new Error("Required environment variable CREDFIN_ENV=<STAGING | PRODUCTION>");
        }
        this.secret = secret;
        this.identifier = identifier;
        this.name = name;
        var baseURL = environment === 'PRODUCTION' ? "https://credfin.io" : "https://staging.credfin.io";
        // TODO Remove when this.name used
        console.log(this.name);
        this.instance = axios["default"].create({
            baseURL: baseURL
        });
        // Enable logging with debug
        if (process.env.NODE_ENV === 'debug') {
            this.instance.interceptors.request.use(function (request) {
                console.log("Starting Request", request);
                console.log(request.method);
                return request;
            });
            this.instance.interceptors.response.use(function (response) {
                console.log("Response:", response);
                return response;
            });
        }
    }
    Client.prototype.get = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var method, headers, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = "GET";
                        return [4 /*yield*/, this.generateHmacHeaders(path, method)];
                    case 1:
                        headers = _a.sent();
                        return [4 /*yield*/, this.instance
                                .request({
                                url: path,
                                headers: headers,
                                method: method
                            })["catch"](function (err) {
                                if (err.response) {
                                    console.log(err.response.data);
                                }
                                throw new Error(err);
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    Client.prototype.post = function (path, post) {
        if (post === void 0) { post = null; }
        return __awaiter(this, void 0, void 0, function () {
            var method, headers, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = "POST";
                        return [4 /*yield*/, this.generateHmacHeaders(path, method, post)];
                    case 1:
                        headers = _a.sent();
                        return [4 /*yield*/, this.instance
                                .request({
                                url: path,
                                headers: headers,
                                method: method
                            })["catch"](function (err) {
                                if (err.response) {
                                    console.log(err.response.data);
                                }
                                throw new Error(err);
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    Client.prototype.put = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var method, headers, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = "PUT";
                        return [4 /*yield*/, this.generateHmacHeaders(path, method)];
                    case 1:
                        headers = _a.sent();
                        return [4 /*yield*/, this.instance
                                .request({
                                url: path,
                                headers: headers,
                                method: method
                            })["catch"](function (err) {
                                if (err.response) {
                                    console.log(err.response.data);
                                }
                                throw new Error(err);
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    Client.prototype["delete"] = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var method, headers, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = "DELETE";
                        return [4 /*yield*/, this.generateHmacHeaders(path, method)];
                    case 1:
                        headers = _a.sent();
                        return [4 /*yield*/, this.instance
                                .request({
                                url: path,
                                headers: headers,
                                method: method
                            })["catch"](function (err) {
                                if (err.response) {
                                    console.log(err.response.data);
                                }
                                throw new Error(err);
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    Client.prototype.generateHmacHeaders = function (path, method, body) {
        return __awaiter(this, void 0, void 0, function () {
            var timestamp, contentType, hash, contentMD5, messageParts, message, hmac, hmacBase64, headers;
            return __generator(this, function (_a) {
                timestamp = new Date().toUTCString();
                contentType = "application/json";
                hash = crypto.createHash("md5");
                if (body) {
                    hash.update(body);
                }
                contentMD5 = hash.digest("base64");
                messageParts = [method, contentMD5, contentType, timestamp, path];
                message = messageParts.join("\n");
                hmac = crypto.createHmac("sha256", this.secret);
                hmac.update(message);
                hmacBase64 = hmac.digest("base64");
                console.log("HMAC " + this.identifier + ":" + hmacBase64);
                headers = {
                    Date: timestamp,
                    "Content-MD5": contentMD5,
                    "Content-Type": contentType,
                    Authorization: "HMAC " + this.identifier + ":" + hmacBase64
                };
                return [2 /*return*/, headers];
            });
        });
    };
    return Client;
}());
exports.Client = Client;
