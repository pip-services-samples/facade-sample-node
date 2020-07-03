let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { RolesMemoryPersistence } from 'pip-services-roles-node';
import { RolesController } from 'pip-services-roles-node';
import { IRolesClientV1 } from '../../src/version1/IRolesClientV1';
import { RolesDirectClientV1 } from '../../src/version1/RolesDirectClientV1';
import { RolesClientFixtureV1 } from './RolesClientFixtureV1';

suite('RolesDirectClientV1', ()=> {
    let persistence: RolesMemoryPersistence;
    let client: RolesDirectClientV1;
    let fixture: RolesClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        persistence = new RolesMemoryPersistence();
        let controller = new RolesController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-roles', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-roles', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new RolesDirectClientV1();
        client.setReferences(references);

        fixture = new RolesClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    setup((done) => {
        persistence.clear(null, done);
    });

    test('Get and Set Roles', (done) => {
        fixture.testGetAndSetRoles(done);
    });

    test('Grant and Revoke Roles', (done) => {
        fixture.testGrantAndRevokeRoles(done);
    });

    test('Authorize', (done) => {
        fixture.testAuthorize(done);
    });
});
