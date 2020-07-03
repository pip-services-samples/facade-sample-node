let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;
let restify = require('restify');

import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { BeaconV1 } from '../../src/data/version1/BeaconV1';
import { BeaconsLambdaFunction } from '../../src/container/BeaconsLambdaFunction';
import { BeaconsMemoryPersistence } from '../../src/persistence/BeaconsMemoryPersistence';

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

suite('BeaconsLambdaFunction', () => {
    let lambda: BeaconsLambdaFunction;

    suiteSetup((done) => {
        lambda = new BeaconsLambdaFunction();
        lambda.configure(ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-beacons:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-beacons:controller:default:default:1.0'
        ));

        lambda.open(null, done);
    });

    suiteTeardown((done) => {
        lambda.close(null, done);
    });

    setup((done) => {
        let persistence = lambda.getReferences().getOneRequired<BeaconsMemoryPersistence>(
            new Descriptor('pip-services-beacons', 'persistence', 'memory', '*', '1.0')
        );
        persistence.clear(null, done);
    });

    test('Calculate Position', (done) => {
        async.series([
            // Create first beacon
            (callback) => {
                lambda.act(
                    {
                        role: 'beacons',
                        cmd: 'create_beacon',
                        beacon: BEACON1
                    },
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
                lambda.act(
                    {
                        role: 'beacons',
                        cmd: 'create_beacon',
                        beacon: BEACON2
                    },
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
            // Calculate position for one beacon
            (callback) => {
                lambda.act(
                    {
                        role: 'beacons',
                        cmd: 'calculate_position',
                        org_id: '1',
                        udis: ['000001']
                    },
                    (err, position) => {
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