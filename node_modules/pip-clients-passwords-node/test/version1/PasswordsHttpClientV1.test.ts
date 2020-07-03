let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { PasswordsMemoryPersistence } from 'pip-services-passwords-node';
import { PasswordsController } from 'pip-services-passwords-node';
import { PasswordsHttpServiceV1 } from 'pip-services-passwords-node';
import { IPasswordsClientV1 } from '../../src/version1/IPasswordsClientV1';
import { PasswordsHttpClientV1 } from '../../src/version1/PasswordsHttpClientV1';
import { PasswordsClientFixtureV1 } from './PasswordsClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('PasswordsHttpClientV1', ()=> {
    let service: PasswordsHttpServiceV1;
    let client: PasswordsHttpClientV1;
    let fixture: PasswordsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new PasswordsMemoryPersistence();
        let controller = new PasswordsController();

        service = new PasswordsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-passwords', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-passwords', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-passwords', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new PasswordsHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new PasswordsClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });
    
    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
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
