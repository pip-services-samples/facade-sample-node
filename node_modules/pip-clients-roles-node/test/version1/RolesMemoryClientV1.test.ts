let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { RolesMemoryClientV1 } from '../../src/version1/RolesMemoryClientV1';
import { RolesClientFixtureV1 } from './RolesClientFixtureV1';

suite('RolesMemoryClientV1', ()=> {
    let client: RolesMemoryClientV1;
    let fixture: RolesClientFixtureV1;

    setup(() => {
        client = new RolesMemoryClientV1();

        fixture = new RolesClientFixtureV1(client);
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
