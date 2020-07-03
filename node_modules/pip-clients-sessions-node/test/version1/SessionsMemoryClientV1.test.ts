let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { SessionsMemoryClientV1 } from '../../src/version1/SessionsMemoryClientV1';
import { SessionsClientFixtureV1 } from './SessionsClientFixtureV1';

suite('SessionsMemoryClientV1', ()=> {
    let client: SessionsMemoryClientV1;
    let fixture: SessionsClientFixtureV1;

    setup(() => {
        client = new SessionsMemoryClientV1();

        fixture = new SessionsClientFixtureV1(client);
    });

    test('Open Session', (done) => {
        fixture.testOpenSession(done);
    });

    test('Close Session', (done) => {
        fixture.testCloseSession(done);
    });

});
