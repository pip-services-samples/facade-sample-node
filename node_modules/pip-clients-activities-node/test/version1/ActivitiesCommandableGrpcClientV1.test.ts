let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { ActivitiesMemoryPersistence } from 'pip-services-activities-node';
import { ActivitiesController } from 'pip-services-activities-node';
import { ActivitiesCommandableGrpcServiceV1 } from 'pip-services-activities-node';
import { IActivitiesClientV1 } from '../../src/version1/IActivitiesClientV1';
import { ActivitiesCommandableGrpcClientV1 } from '../../src/version1/ActivitiesCommandableGrpcClientV1';
import { ActivitiesClientFixtureV1 } from './ActivitiesClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('ActivitiesCommandableGrpcClientV1', ()=> {
    let service: ActivitiesCommandableGrpcServiceV1;
    let client: ActivitiesCommandableGrpcClientV1;
    let fixture: ActivitiesClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new ActivitiesMemoryPersistence();
        let controller = new ActivitiesController();

        service = new ActivitiesCommandableGrpcServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-activities', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-activities', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-activities', 'service', 'commandable-grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new ActivitiesCommandableGrpcClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new ActivitiesClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });
    
    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('Batch Party Activities', (done) => {
        fixture.testBatchPartyActivities(done);
    });

});
