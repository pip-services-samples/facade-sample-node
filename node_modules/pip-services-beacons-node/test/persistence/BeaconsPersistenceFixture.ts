let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { BeaconV1 } from '../../src/data/version1/BeaconV1';
import { IBeaconsPersistence } from '../../src/persistence/IBeaconsPersistence';

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

export class BeaconsPersistenceFixture {
    private _persistence: IBeaconsPersistence;

    public constructor(persistence: IBeaconsPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateBeacons(done) {
        async.series([
            // Create first beacon
            (callback) => {
                this._persistence.create(
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
                this._persistence.create(
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
            // Create first beacon
            (callback) => {
                this._persistence.create(
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
                this._persistence.getPageByFilter(
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

                this._persistence.update(
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
                this._persistence.getOneByUdi(
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
                this._persistence.deleteById(
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
                this._persistence.getOneById(
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

    public testGetWithFilters(done) {
        async.series([
            // Create items
            (callback) => {
                this.testCreateBeacons(callback);
            },
            // Filter by org_id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'org_id', '1'
                    ),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
            // Filter by udi
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'udi', '000002'
                    ),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            },
            // Filter by udis
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'udis', '000001,000002,000004'
                    ),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
            // Filter by search
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'search', 'beacon2'
                    ),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            }
        ], done);
    }
}