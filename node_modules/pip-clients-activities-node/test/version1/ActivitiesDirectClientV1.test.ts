let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { ActivitiesMemoryPersistence } from 'pip-services-activities-node';
import { ActivitiesController } from 'pip-services-activities-node';
import { IActivitiesClientV1 } from '../../src/version1/IActivitiesClientV1';
import { ActivitiesDirectClientV1 } from '../../src/version1/ActivitiesDirectClientV1';
import { ActivitiesClientFixtureV1 } from './ActivitiesClientFixtureV1';

suite('ActivitiesDirectClientV1', ()=> {
    let client: ActivitiesDirectClientV1;
    let fixture: ActivitiesClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new ActivitiesMemoryPersistence();
        let controller = new ActivitiesController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-activities', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-activities', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new ActivitiesDirectClientV1();
        client.setReferences(references);

        fixture = new ActivitiesClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('Batch Party Activities', (done) => {
        fixture.testBatchPartyActivities(done);
    });

});
