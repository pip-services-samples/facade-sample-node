import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { BeaconV1 } from '../../src/version1/BeaconV1';
import { BeaconsHttpClientV1 } from '../../src/version1/BeaconsHttpClientV1';
import { BeaconsClientFixtureV1 } from './BeaconsClientFixtureV1';

import { BeaconsMemoryPersistence } from 'pip-services-beacons-node';
import { BeaconsController } from 'pip-services-beacons-node';
import { BeaconsHttpServiceV1 } from 'pip-services-beacons-node';

suite('BeaconsHttpClientV1', () => {
    let client: BeaconsHttpClientV1;
    let fixture: BeaconsClientFixtureV1;
    let persistence: BeaconsMemoryPersistence;
    let controller: BeaconsController;
    let service: BeaconsHttpServiceV1;

    suiteSetup((done) => {
        persistence = new BeaconsMemoryPersistence();
        persistence.configure(new ConfigParams());

        let httpConfig = ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.host', 'localhost',
            'connection.port', 3000
        );

        controller = new BeaconsController();
        
        service = new BeaconsHttpServiceV1();
        service.configure(httpConfig);

        client = new BeaconsHttpClientV1();
        client.configure(httpConfig);

        let references = References.fromTuples(
            new Descriptor('pip-services-beacons', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-beacons', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-beacons', 'service', 'http', 'default', '1.0'), service,
            new Descriptor('pip-services-beacons', 'client', 'direct', 'default', '1.0'), client
        );

        controller.setReferences(references);
        service.setReferences(references);
        client.setReferences(references);

        fixture = new BeaconsClientFixtureV1(client);

        service.open(null, (err) => {
            if (err) done(err);
            else client.open(null, done);
        });
    });

    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    setup((done) => {
        persistence.clear(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Calculate Position', (done) => {
        fixture.testCalculatePositions(done);
    });
    
});