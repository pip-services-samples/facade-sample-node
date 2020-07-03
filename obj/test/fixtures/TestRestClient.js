"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let restify = require('restify-clients');
class TestRestClient {
    constructor() {
        let url = 'http://localhost:3000';
        this._rest = restify.createJsonClient({ url: url, version: '*' });
    }
    get(path, callback) {
        delete this._rest.headers['x-session-id'];
        this._rest.get(path, callback);
    }
    head(path, callback) {
        delete this._rest.headers['x-session-id'];
        this._rest.head(path, callback);
    }
    post(path, params, callback) {
        delete this._rest.headers['x-session-id'];
        this._rest.post(path, params, callback);
    }
    put(path, params, callback) {
        delete this._rest.headers['x-session-id'];
        this._rest.put(path, params, callback);
    }
    del(path, callback) {
        delete this._rest.headers['x-session-id'];
        this._rest.del(path, callback);
    }
    getAsUser(sessionId, path, callback) {
        this._rest.headers['x-session-id'] = sessionId;
        this._rest.get(path, callback);
    }
    headAsUser(sessionId, path, callback) {
        this._rest.headers['x-session-id'] = sessionId;
        this._rest.head(path, callback);
    }
    postAsUser(sessionId, path, params, callback) {
        this._rest.headers['x-session-id'] = sessionId;
        this._rest.post(path, params, callback);
    }
    putAsUser(sessionId, path, params, callback) {
        this._rest.headers['x-session-id'] = sessionId;
        this._rest.put(path, params, callback);
    }
    delAsUser(sessionId, path, callback) {
        this._rest.headers['x-session-id'] = sessionId;
        this._rest.del(path, callback);
    }
}
exports.TestRestClient = TestRestClient;
//# sourceMappingURL=TestRestClient.js.map