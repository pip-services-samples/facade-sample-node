let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;
let restify = require('restify');

import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { BeaconV1 } from '../../../src/data/version1/BeaconV1';
import { BeaconsMemoryPersistence } from '../../../src/persistence/BeaconsMemoryPersistence';
import { BeaconsController } from '../../../src/logic/BeaconsController';
import { BeaconsHttpServiceV1 } from '../../../src/services/version1/BeaconsHttpServiceV1';

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

suite('BeaconsHttpServiceV1', () => {
    let persistence: BeaconsMemoryPersistence;
    let controller: BeaconsController;
    let service: BeaconsHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        persistence = new BeaconsMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new BeaconsController();

        service = new BeaconsHttpServiceV1();
        service.configure(ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.host', 'localhost',
            'connection.port', 3000
        ));

        let references = References.fromTuples(
            new Descriptor('pip-services-beacons', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-beacons', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-beacons', 'service', 'http', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });

    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup((done) => {
        let url = "http://localhost:3000";
        rest = restify.createJsonClient({ url: url, version: '*' });
        persistence.clear(null, done);
    });

    test('CRUD Operations', (done) => {
        let beacon1: BeaconV1;

        async.series([
            // Create first beacon
            (callback) => {
                rest.post('/v1/beacons/create_beacon',
                    {
                        beacon: BEACON1
                    },
                    (err, req, res, beacon) => {
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
                rest.post('/v1/beacons/create_beacon',
                    {
                        beacon: BEACON2
                    },
                    (err, req, res, beacon) => {
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
                rest.post('/v1/beacons/get_beacons',
                    {},
                    (err, req, res, page) => {
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

                rest.post('/v1/beacons/update_beacon',
                    {
                        beacon: beacon1
                    },
                    (err, req, res, beacon) => {
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
                rest.post('/v1/beacons/get_beacon_by_udi',
                    {
                        udi: beacon1.udi
                    },
                    (err, req, res, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(beacon.id, beacon1.id);
                        
                        callback();
                    }
                );
            },
            // Delete beacon
            (callback) => {
                rest.post('/v1/beacons/delete_beacon_by_id',
                    {
                        beacon_id: beacon1.id
                    },
                    (err, req, res, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(beacon.id, beacon1.id);

                        callback();
                    }
                );
            },
            // Try to get deleted beacon
            (callback) => {
                rest.post('/v1/beacons/get_beacon_by_id',
                    {
                        beacon_id: beacon1.id
                    },
                    (err, req, res, beacon) => {
                        assert.isNull(err);

                        //assert.isNull(beacon || null);

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
                rest.post('/v1/beacons/create_beacon',
                    {
                        beacon: BEACON1
                    },
                    (err, req, res, beacon) => {
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
                rest.post('/v1/beacons/create_beacon',
                    {
                        beacon: BEACON2
                    },
                    (err, req, res, beacon) => {
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
            // Calculate position for one beacon
            (callback) => {
                rest.post('/v1/beacons/calculate_position',
                    {
                        org_id: '1',
                        udis: ['000001']
                    },
                    (err, req, res, position) => {
                        assert.isNull(err);

                        assert.isObject(position);
                        assert.equal(position.type, 'Point');
                        assert.equal(position.coordinates[0], 0);
                        assert.equal(position.coordinates[1], 0);
                         
                        callback();
                    }
                );
            }
        ], done);
    });
    
});