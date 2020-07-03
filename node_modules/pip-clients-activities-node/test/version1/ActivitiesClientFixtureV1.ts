let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PartyActivityV1 } from '../../src/version1/PartyActivityV1';
import { IActivitiesClientV1 } from '../../src/version1/IActivitiesClientV1';

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

export class ActivitiesClientFixtureV1 {
    private _client: IActivitiesClientV1;
    
    constructor(client: IActivitiesClientV1) {
        this._client = client;
    }
        
    testBatchPartyActivities(done) {
        async.series([
            // Log an activity batch
            (callback) => {
                this._client.batchPartyActivities(
                    null,
                    [
                        ACTIVITY,
                        ACTIVITY,
                        ACTIVITY
                    ],
                    (err) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
            // Get activities
            (callback) => {
                this._client.getPartyActivities(
                    null,
                    FilterParams.fromTuples('party_id:', '1'),
                    null,
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
    }
}
