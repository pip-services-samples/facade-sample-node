let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { BeaconV1 } from '../../src/data/version1/BeaconV1';
import { BeaconsMemoryPersistence } from '../../src/persistence/BeaconsMemoryPersistence';
import { BeaconsController } from '../../src/logic/BeaconsController';

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

suite('BeaconsController', () => {
    let persistence: BeaconsMemoryPersistence;
    let controller: BeaconsController;

    setup((done) => {
        persistence = new BeaconsMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new BeaconsController();

        let references = References.fromTuples(
            new Descriptor('pip-services-beacons', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-beacons', 'controller', 'default', 'default', '1.0'), controller
        );

        controller.setReferences(references);

        persistence.open(null, done);
    });

    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        let beacon1: BeaconV1;

        async.series([
            // Create first beacon
            (callback) => {
                controller.createBeacon(
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
                controller.createBeacon(
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
            // Get all beacons
            (callback) => {
                controller.getBeacons(
                    null, 
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        beacon1 = page.data[0];

                        callback();
                    }
                );
            },
            // Update the beacon
            (callback) => {
                beacon1.label = 'ABC';

                controller.updateBeacon(
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
                controller.getBeaconByUdi(
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
                controller.deleteBeaconById(
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
                controller.getBeaconById(
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
    });

    test('Calculate Position', (done) => {
        async.series([
            // Create first beacon
            (callback) => {
                controller.createBeacon(
                    null,
                    BEACON1,
                    (err, beacon) => {
                        assert.isNull(err);
                        assert.isObject(beacon);
                        callback();
                    }
                );
            },
            // Create second beacon
            (callback) => {
                controller.createBeacon(
                    null,
                    BEACON2,
                    (err, beacon) => {
                        assert.isNull(err);
                        assert.isObject(beacon);
                        callback();
                    }
                );
            },
            // Calculate position for one beacon
            (callback) => {
                controller.calculatePosition(
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
                controller.calculatePosition(
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
            },
            // Calculate position for unknown beacons
            (callback) => {
                controller.calculatePosition(
                    null, 
                    '1', ['000003', '000004'],
                    (err, position) => {
                        assert.isNull(err);

                        assert.isNull(position);
                        
                        callback();
                    }
                );
            },
            // Calculate position for no beacons
            (callback) => {
                controller.calculatePosition(
                    null, 
                    '1', [],
                    (err, position) => {
                        assert.isNull(err);

                        assert.isNull(position);
                        
                        callback();
                    }
                );
            }
        ], done);
    });
    
});