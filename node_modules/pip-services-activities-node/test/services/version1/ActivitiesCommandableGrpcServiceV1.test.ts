let assert = require('chai').assert;
let grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
let async = require('async');

// let services = require('../../../../src/protos/party_activities_v1_grpc_pb');
// let messages = require('../../../../src/protos/party_activities_v1_pb');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { PartyActivityV1 } from '../../../src/data/version1/PartyActivityV1';
import { ActivitiesMemoryPersistence } from '../../../src/persistence/ActivitiesMemoryPersistence';
import { ActivitiesController } from '../../../src/logic/ActivitiesController';
import { ActivitiesCommandableGrpcServiceV1 } from '../../../src/services/version1/ActivitiesCommandableGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
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


suite('ActivitiesCommandableGrpcServiceV1', () => {
    let service: ActivitiesCommandableGrpcServiceV1;

    let client: any;

    suiteSetup((done) => {
        let persistence = new ActivitiesMemoryPersistence();
        let controller = new ActivitiesController();

        service = new ActivitiesCommandableGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-activities', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-activities', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-activities', 'service', 'commandable-grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });

    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../node_modules/pip-services3-grpc-node/src/protos/commandable.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).commandable.Commandable;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('Batch Party Activities', (done) => {
        async.series([
            // Log an activity batch
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/activities.batch_party_activities',
                        args_empty: false,
                        args_json: JSON.stringify({
                            activities: [ACTIVITY]
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isTrue(response.result_empty);
                        
                        callback();
                    }
                );
            },
            // Get activities
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/activities.get_party_activities',
                        args_empty: false,
                        args_json: JSON.stringify({
                            filter: null,
                            paging: null
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let page = JSON.parse(response.result_json);

                        assert.isObject(page);
                        assert.equal(page.data.length, 1);

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