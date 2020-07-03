import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { BeaconV1 } from '../../src/version1/BeaconV1';
import { BeaconsDirectClientV1 } from '../../src/version1/BeaconsDirectClientV1';
import { BeaconsClientFixtureV1 } from './BeaconsClientFixtureV1';

import { BeaconsMemoryPersistence } from 'pip-services-beacons-node';
import { BeaconsController } from 'pip-services-beacons-node';

suite('BeaconsDirectClientV1', () => {
    let client: BeaconsDirectClientV1;
    let fixture: BeaconsClientFixtureV1;
    let persistence: BeaconsMemoryPersistence;
    let controller: BeaconsController;

    suiteSetup((done) => {
        persistence = new BeaconsMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new BeaconsController();

        client = new BeaconsDirectClientV1();

        let references = References.fromTuples(
            new Descriptor('pip-services-beacons', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-beacons', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-beacons', 'client', 'direct', 'default', '1.0'), client
        );

        controller.setReferences(references);
        client.setReferences(references);

        fixture = new BeaconsClientFixtureV1(client);

        client.open(null, done);
    });

    suiteTeardown((done) => {
        client.close(null, done);
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