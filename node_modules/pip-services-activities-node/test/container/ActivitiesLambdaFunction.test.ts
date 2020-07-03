let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { PartyActivityV1 } from '../../src/data/version1/PartyActivityV1';
import { ActivitiesMemoryPersistence } from '../../src/persistence/ActivitiesMemoryPersistence';
import { ActivitiesController } from '../../src/logic/ActivitiesController';
import { ActivitiesLambdaFunction } from '../../src/container/ActivitiesLambdaFunction';

let ACTIVITY: PartyActivityV1 = {
    id: null,
    type: 'test',
    time: new Date(),
    party: {
        id: '1',
        type: 'party',
        name: 'Test User'
    },
    ref_item: {
        id: '2',
        type: 'party',
        name: 'Admin User'
    },
    ref_parents: [],
    ref_party: null,
    details: null
};

suite('ActivitiesLambdaFunction', ()=> {
    let lambda: ActivitiesLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-activities:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-activities:controller:default:default:1.0'
        );

        lambda = new ActivitiesLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('Batch Party Activities', (done) => {
        async.series([
            // Log an activity batch
            (callback) => {
                lambda.act(
                    {
                        role: 'activities',
                        cmd: 'batch_party_activities',

                        activities: [
                            ACTIVITY,
                            ACTIVITY,
                            ACTIVITY
                        ]
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
            // Get activities
            (callback) => {
                lambda.act(
                    {
                        role: 'activities',
                        cmd: 'get_party_activities',
                        filter: {                        
                            party_id: '1'
                        }
                    },
                    (err, page) => {                        
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.isTrue(page.data.length > 2);

                        let activity = page.data[0];
                        assert.equal(activity.type, ACTIVITY.type);
                        assert.isNotNull(activity.time);
                        assert.equal(activity.party.name, ACTIVITY.party.name);

                        callback();
                    }
                );
            }
        ], done);
    });
});