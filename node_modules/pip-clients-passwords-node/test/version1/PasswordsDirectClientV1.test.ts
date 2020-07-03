let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { PasswordsMemoryPersistence } from 'pip-services-passwords-node';
import { PasswordsController } from 'pip-services-passwords-node';
import { IPasswordsClientV1 } from '../../src/version1/IPasswordsClientV1';
import { PasswordsDirectClientV1 } from '../../src/version1/PasswordsDirectClientV1';
import { PasswordsClientFixtureV1 } from './PasswordsClientFixtureV1';

suite('PasswordsDirectClientV1', ()=> {
    let client: PasswordsDirectClientV1;
    let fixture: PasswordsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new PasswordsMemoryPersistence();
        let controller = new PasswordsController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-passwords', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-passwords', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new PasswordsDirectClientV1();
        client.setReferences(references);

        fixture = new PasswordsClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('Test Recover Password', (done) => {
        fixture.testRecoverPassword(done);
    });

    test('Test Change Password', (done) => {
        fixture.testChangePassword(done);
    });

    test('Test Signin with Wrong Password', (done) => {
        fixture.testSigninWithWrongPassword(done);
    });

});
