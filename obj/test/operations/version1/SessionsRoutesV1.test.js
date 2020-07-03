"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;
const TestReferences_1 = require("../../fixtures/TestReferences");
const TestRestClient_1 = require("../../fixtures/TestRestClient");
suite('SessionRoutes1.0', () => {
    let USER = {
        login: 'test',
        name: 'Test User',
        email: 'test@conceptual.vision',
        password: 'test123'
    };
    let references;
    let rest;
    setup((done) => {
        rest = new TestRestClient_1.TestRestClient();
        references = new TestReferences_1.TestReferences();
        references.open(null, done);
    });
    teardown((done) => {
        references.close(null, done);
    });
    test('should signup new user', (done) => {
        rest.post('/api/1.0/users/signup', USER, (err, req, res, session) => {
            assert.isNull(err);
            assert.isDefined(session);
            assert.isDefined(session.id);
            assert.equal(session.user_name, USER.name);
            done();
        });
    });
    test('should not signup with the same email', (done) => {
        async.series([
            // Sign up
            (callback) => {
                rest.post('/api/1.0/users/signup', USER, (err, req, res, session) => {
                    assert.isNull(err);
                    callback();
                });
            },
            // Try to sign up again
            (callback) => {
                rest.post('/api/1.0/users/signup', USER, (err, req, res, session) => {
                    assert.isNotNull(err);
                    callback();
                });
            }
        ], done);
    });
    test('should signout', (done) => {
        rest.post('/api/1.0/users/signout', null, (err, req, res, result) => {
            assert.isNull(err);
            done();
        });
    });
    test('should signin with email and password', (done) => {
        async.series([
            // Sign up
            (callback) => {
                rest.post('/api/1.0/users/signup', USER, (err, req, res, session) => {
                    assert.isNull(err);
                    callback();
                });
            },
            // Sign in with username
            (callback) => {
                rest.post('/api/1.0/users/signin', {
                    login: USER.login,
                    password: USER.password
                }, (err, req, res, session) => {
                    assert.isNull(err);
                    callback();
                });
            }
        ], done);
    });
});
//# sourceMappingURL=SessionsRoutesV1.test.js.map