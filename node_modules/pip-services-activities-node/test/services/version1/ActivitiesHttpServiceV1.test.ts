let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { PartyActivityV1 } from '../../../src/data/version1/PartyActivityV1';
import { ActivitiesMemoryPersistence } from '../../../src/persistence/ActivitiesMemoryPersistence';
import { ActivitiesController } from '../../../src/logic/ActivitiesController';
import { ActivitiesHttpServiceV1 } from '../../../src/services/version1/ActivitiesHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

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

suite('ActivitiesRestServiceV1', ()=> {
    let service: ActivitiesHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let persistence = new ActivitiesMemoryPersistence();
        let controller = new ActivitiesController();

        service = new ActivitiesHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-activities', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-activities', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-activities', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('Batch Party Activities', (done) => {
        async.series([
            // Log an activity batch
            (callback) => {
                rest.post('/v1/activities/batch_party_activities',
                    {
                        activities: [
                            ACTIVITY,
                            ACTIVITY,
                            ACTIVITY
                        ]
                    },
                    (err, req, res) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
            // Get activities
            (callback) => {
                rest.post('/v1/activities/get_party_activities',
                    {
                        filter: null,
                        paging: null
                    },
                    (err, req, res, page) => {
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