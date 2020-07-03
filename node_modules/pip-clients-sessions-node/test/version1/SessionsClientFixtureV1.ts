let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';

import { ISessionsClientV1 } from '../../src/version1/ISessionsClientV1';
import { SessionV1 } from '../../src/version1/SessionV1';

export class SessionsClientFixtureV1 {
    private _client: ISessionsClientV1;
    
    constructor(client: ISessionsClientV1) {
        this._client = client;
    }
        
    testOpenSession(done) {
        var session1;
        
        async.series([
        // Open new session
            (callback) => {
                this._client.openSession(
                    null,
                    '1',
                    'User 1',
                   'localhost',
                   'test',
                   null,
                   'abc',
                    (err, session) => {
                        assert.isNull(err);

                        assert.isObject(session);
                        assert.isNotNull(session.id);
                        assert.isNotNull(session.request_time);
                        assert.equal(session.address, 'localhost');
                        assert.equal(session.client, 'test');
                        assert.equal(session.data, 'abc');

                        session1 = session;
                        
                        callback();
                    }
                );
            },
        // Store session data
            (callback) => {
                this._client.storeSessionData(
                    null,
                    session1.id,
                    'xyz',
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Update session user
            (callback) => {
                this._client.updateSessionUser(
                    null,
                    session1.id,
                    'xyz',
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Load created session
            (callback) => {
                this._client.getSessionById(
                    null,
                    session1.id,
                    (err, session) => {
                        assert.isNull(err);

                        assert.isObject(session);
                        assert.equal(session.id, session1.id);
                        assert.isNotNull(session.request_time);
                        assert.equal(session.address, 'localhost');
                        assert.equal(session.client, 'test');
                        assert.equal(session.data, 'xyz');

                        callback();
                    }
                );
            },
        // Get open sessions
            (callback) => {
                this._client.getSessions(
                    null,
                    FilterParams.fromTuples(
                        'user_id', '1',
                        'active', true
                    ),
                    null,
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(page.data, 1);
                        let session = page.data[0];

                        assert.equal(session.address, 'localhost');
                        assert.equal(session.client, 'test');

                        callback();
                    }
                );
            }
        ], done);
    }

    testCloseSession(done) {
        let session1: SessionV1;

        async.series([
        // Create a new session
            (callback) => {
                this._client.openSession(
                    null,
                    '1',
                    'User 1',
                    'localhost',
                    'test',
                    null,
                    null,
                    (err, session) => {
                        assert.isNull(err);

                        assert.isObject(session);
                        assert.isNotNull(session.request_time);

                        session1 = session;

                        callback();
                    }
                );
            },
        // Close created session
            (callback) => {
                this._client.closeSession(
                    null,
                    session1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Get open sessions
            (callback) => {
                this._client.getSessions(
                    null,
                    FilterParams.fromTuples(
                        'user_id', '1',
                        'active', true
                    ),
                    null,
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);

                        callback();
                    }
                );
            }
        ], done);
    }
}
