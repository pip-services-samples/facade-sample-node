let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { ActivitiesMemoryPersistence } from 'pip-services-activities-node';
import { ActivitiesController } from 'pip-services-activities-node';
import { ActivitiesHttpServiceV1 } from 'pip-services-activities-node';
import { IActivitiesClientV1 } from '../../src/version1/IActivitiesClientV1';
import { ActivitiesHttpClientV1 } from '../../src/version1/ActivitiesHttpClientV1';
import { ActivitiesClientFixtureV1 } from './ActivitiesClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('ActivitiesHttpClientV1', ()=> {
    let service: ActivitiesHttpServiceV1;
    let client: ActivitiesHttpClientV1;
    let fixture: ActivitiesClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new ActivitiesMemoryPersistence();
        let controller = new ActivitiesController();

        service = new ActivitiesHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-activities', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-activities', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-activities', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new ActivitiesHttpClientV1();
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
