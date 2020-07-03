let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { AccountsMemoryPersistence } from 'pip-services-accounts-node';
import { AccountsController } from 'pip-services-accounts-node';
import { AccountsGrpcServiceV1 } from 'pip-services-accounts-node';
import { IAccountsClientV1 } from '../../src/version1/IAccountsClientV1';
import { AccountsGrpcClientV1 } from '../../src/version1/AccountsGrpcClientV1';
import { AccountsClientFixtureV1 } from './AccountsClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('AccountsGrpcClientV1', ()=> {
    let service: AccountsGrpcServiceV1;
    let client: AccountsGrpcClientV1;
    let fixture: AccountsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new AccountsMemoryPersistence();
        let controller = new AccountsController();

        service = new AccountsGrpcServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-accounts', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-accounts', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-accounts', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new AccountsGrpcClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new AccountsClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });
    
    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
