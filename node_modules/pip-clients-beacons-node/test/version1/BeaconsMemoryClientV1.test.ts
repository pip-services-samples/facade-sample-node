import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';

import { BeaconV1 } from '../../src/version1/BeaconV1';
import { BeaconsMemoryClientV1 } from '../../src/version1/BeaconsMemoryClientV1';
import { BeaconsClientFixtureV1 } from './BeaconsClientFixtureV1';

import { BeaconsMemoryPersistence } from 'pip-services-beacons-node';
import { BeaconsController } from 'pip-services-beacons-node';

suite('BeaconsMemoryClientV1', () => {
    let client: BeaconsMemoryClientV1;
    let fixture: BeaconsClientFixtureV1;

    setup(() => {
        client = new BeaconsMemoryClientV1();
        fixture = new BeaconsClientFixtureV1(client);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Calculate Position', (done) => {
        fixture.testCalculatePositions(done);
    });
    
});