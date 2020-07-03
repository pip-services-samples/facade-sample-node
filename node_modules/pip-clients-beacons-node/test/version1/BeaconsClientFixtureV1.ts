let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { BeaconV1 } from '../../src/version1/BeaconV1';
import { IBeaconsClientV1 } from '../../src/version1/IBeaconsClientV1';

let BEACON1: BeaconV1 = {
    id: '1',
    udi: '000001',
    org_id: '1',
    label: 'TestBeacon1',
    center: { type: 'Point', coordinates: [0, 0] },
    radius: 50
};
let BEACON2: BeaconV1 = {
    id: '2',
    udi: '000002',
    org_id: '1',
    label: 'TestBeacon2',
    center: { type: 'Point', coordinates: [2, 2] },
    radius: 70
};
let BEACON3: BeaconV1 = {
    id: '3',
    udi: '000003',
    org_id: '2',
    label: 'TestBeacon3',
    center: { type: 'Point', coordinates: [10, 10] },
    radius: 50
};

export class BeaconsClientFixtureV1 {
    private _client: IBeaconsClientV1;

    public constructor(client: IBeaconsClientV1) {
        this._client = client;
    }

    private testCreateBeacons(done) {
        async.series([
            // Create first beacon
            (callback) => {
                this._client.createBeacon(
                    null,
                    BEACON1,
                    (err, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(beacon.udi, BEACON1.udi);
                        assert.equal(beacon.org_id, BEACON1.org_id);
                        assert.equal(beacon.label, BEACON1.label);
                        assert.isNotNull(beacon.center);

                        callback();
                    }
                );
            },
            // Create second beacon
            (callback) => {
                this._client.createBeacon(
                    null,
                    BEACON2,
                    (err, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(beacon.udi, BEACON2.udi);
                        assert.equal(beacon.org_id, BEACON2.org_id);
                        assert.equal(beacon.label, BEACON2.label);
                        assert.isNotNull(beacon.center);

                        callback();
                    }
                );
            },
            // Create third beacon
            (callback) => {
                this._client.createBeacon(
                    null,
                    BEACON3,
                    (err, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(beacon.udi, BEACON3.udi);
                        assert.equal(beacon.org_id, BEACON3.org_id);
                        assert.equal(beacon.label, BEACON3.label);
                        assert.isNotNull(beacon.center);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testCrudOperations(done) {
        let beacon1: BeaconV1;

        async.series([
            // Create items
            (callback) => {
                this.testCreateBeacons(callback);
            },
            // Get all beacons
            (callback) => {
                this._client.getBeacons(
                    null, 
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        beacon1 = page.data[0];

                        callback();
                    }
                );
            },
            // Update the beacon
            (callback) => {
                beacon1.label = 'ABC';

                this._client.updateBeacon(
                    null,
                    beacon1,
                    (err, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(beacon.id, beacon1.id);
                        assert.equal(beacon.label, 'ABC');

                        callback();
                    }
                );
            },
            // Get beacon by udi
            (callback) => {
                this._client.getBeaconByUdi(
                    null,
                    beacon1.udi,
                    (err, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(beacon.id, beacon1.id);
                        
                        callback();
                    }
                );
            },
            // Delete beacon
            (callback) => {
                this._client.deleteBeaconById(
                    null, 
                    beacon1.id,
                    (err, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(beacon.id, beacon1.id);

                        callback();
                    }
                );
            },
            // Try to get deleted beacon
            (callback) => {
                this._client.getBeaconById(
                    null,
                    beacon1.id,
                    (err, beacon) => {
                        assert.isNull(err);

                        assert.isNull(beacon || null);

                        callback();
                    }
                )
            }
        ], done);
    }

    public testCalculatePositions(done) {
        let beacon1: BeaconV1;

        async.series([
            // Create items
            (callback) => {
                this.testCreateBeacons(callback);
            },
            // Calculate position for one beacon
            (callback) => {
                this._client.calculatePosition(
                    null, 
                    '1', ['000001'],
                    (err, position) => {
                        assert.isNull(err);

                        assert.isObject(position);
                        assert.equal(position.type, 'Point');
                        assert.equal(position.coordinates[0], 0);
                        assert.equal(position.coordinates[1], 0);
                        
                        callback();
                    }
                );
            },
            // Calculate position for two beacons
            (callback) => {
                this._client.calculatePosition(
                    null, 
                    '1', ['000001', '000002'],
                    (err, position) => {
                        assert.isNull(err);

                        assert.isObject(position);
                        assert.equal(position.type, 'Point');
                        assert.equal(position.coordinates[0], 1);
                        assert.equal(position.coordinates[1], 1);
                        
                        callback();
                    }
                );
            }
        ], done);
    }
    
}