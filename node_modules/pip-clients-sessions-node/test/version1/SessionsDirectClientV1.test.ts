let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { SessionsMemoryPersistence } from 'pip-services-sessions-node';
import { SessionsController } from 'pip-services-sessions-node';
import { ISessionsClientV1 } from '../../src/version1/ISessionsClientV1';
import { SessionsDirectClientV1 } from '../../src/version1/SessionsDirectClientV1';
import { SessionsClientFixtureV1 } from './SessionsClientFixtureV1';

suite('SessionsDirectClientV1', ()=> {
    let client: SessionsDirectClientV1;
    let fixture: SessionsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new SessionsMemoryPersistence();
        let controller = new SessionsController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-sessions', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-sessions', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new SessionsDirectClientV1();
        client.setReferences(references);

        fixture = new SessionsClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('Open Session', (done) => {
        fixture.testOpenSession(done);
    });

    test('Close Session', (done) => {
        fixture.testCloseSession(done);
    });

});
