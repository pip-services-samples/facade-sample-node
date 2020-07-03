"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;
const TestReferences_1 = require("../../fixtures/TestReferences");
const TestUsers_1 = require("../../fixtures/TestUsers");
const TestRestClient_1 = require("../../fixtures/TestRestClient");
const pip_clients_beacons_node_1 = require("pip-clients-beacons-node");
const BEACON1 = {
    id: '1',
    udi: '00001',
    type: pip_clients_beacons_node_1.BeaconTypeV1.AltBeacon,
    org_id: '1',
    label: 'TestBeacon1',
    center: { type: 'Point', coordinates: [0, 0] },
    radius: 50
};
const BEACON2 = {
    id: '2',
    udi: '00002',
    type: pip_clients_beacons_node_1.BeaconTypeV1.iBeacon,
    org_id: '1',
    label: 'TestBeacon2',
    center: { type: 'Point', coordinates: [2, 2] },
    radius: 70
};
suite('BeaconsRoutesV1', () => {
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
    test('CRUD Operations', (done) => {
        let beacon1;
        async.series([
            // Create the first beacon
            (callback) => {
                rest.postAsUser(TestUsers_1.TestUsers.AdminUserSessionId, '/api/1.0/beacons', BEACON1, (err, req, res, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(BEACON1.udi, beacon.udi);
                    assert.equal(BEACON1.org_id, beacon.org_id);
                    assert.equal(BEACON1.type, beacon.type);
                    assert.equal(BEACON1.label, beacon.label);
                    assert.isNotNull(beacon.center);
                    callback();
                });
            },
            // Create the second beacon
            (callback) => {
                rest.postAsUser(TestUsers_1.TestUsers.AdminUserSessionId, '/api/1.0/beacons', BEACON2, (err, req, res, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(BEACON2.udi, beacon.udi);
                    assert.equal(BEACON2.org_id, beacon.org_id);
                    assert.equal(BEACON2.type, beacon.type);
                    assert.equal(BEACON2.label, beacon.label);
                    assert.isNotNull(beacon.center);
                    callback();
                });
            },
            // Get all beacons
            (callback) => {
                rest.getAsUser(TestUsers_1.TestUsers.AdminUserSessionId, '/api/1.0/beacons', (err, req, res, page) => {
                    assert.isNull(err);
                    assert.isObject(page);
                    assert.lengthOf(page.data, 2);
                    beacon1 = page.data[0];
                    callback();
                });
            },
            // Update the beacon
            (callback) => {
                beacon1.label = 'ABC';
                rest.putAsUser(TestUsers_1.TestUsers.AdminUserSessionId, '/api/1.0/beacons', beacon1, (err, req, res, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon1.id, beacon.id);
                    assert.equal('ABC', beacon.label);
                    callback();
                });
            },
            // Get beacon by udi
            (callback) => {
                rest.getAsUser(TestUsers_1.TestUsers.User1SessionId, '/api/1.0/beacons/udi/' + beacon1.udi + '?user_id=' + TestUsers_1.TestUsers.User1Id, (err, req, res, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon1.id, beacon.id);
                    callback();
                });
            },
            // Calculate position for one beacon
            (callback) => {
                rest.postAsUser(TestUsers_1.TestUsers.User1SessionId, '/api/1.0/beacons/position', {
                    org_id: '1',
                    udis: ['00001']
                }, (err, req, res, position) => {
                    assert.isNull(err);
                    assert.isObject(position);
                    assert.equal('Point', position.type);
                    assert.lengthOf(position.coordinates, 2);
                    assert.equal(0, position.coordinates[0]);
                    assert.equal(0, position.coordinates[1]);
                    callback();
                });
            },
            // Delete the beacon
            (callback) => {
                rest.delAsUser(TestUsers_1.TestUsers.AdminUserSessionId, '/api/1.0/beacons/' + beacon1.id, (err, req, res, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon1.id, beacon.id);
                    callback();
                });
            },
            // Try to get deleted beacon
            (callback) => {
                rest.getAsUser(TestUsers_1.TestUsers.User1SessionId, '/api/1.0/beacons/' + beacon1.id + '?user_id=' + TestUsers_1.TestUsers.User1Id, (err, req, res, beacon) => {
                    assert.isNull(err);
                    //assert.isEmpty(beacon || null);
                    callback();
                });
            }
        ], done);
    });
});
//# sourceMappingURL=BeaconsRoutesV1.test.js.map