import { ConfigParams } from 'pip-services3-commons-node';

import { ActivitiesFilePersistence } from '../../src/persistence/ActivitiesFilePersistence';
import { ActivitiesPersistenceFixture } from './ActivitiesPersistenceFixture';

suite('ActivitiesFilePersistence', ()=> {
    let persistence: ActivitiesFilePersistence;
    let fixture: ActivitiesPersistenceFixture;
    
    setup((done) => {
        persistence = new ActivitiesFilePersistence('./data/activities.test.json');

        fixture = new ActivitiesPersistenceFixture(persistence);
        
        persistence.open(null, (err) => {
            if (err) done(err);
            else persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('Log Party Activities', (done) => {
        fixture.testLogPartyActivities(done);
    });

    test('Get Party Activities', (done) => {
        fixture.testGetPartyActivities(done);
    });
    
});