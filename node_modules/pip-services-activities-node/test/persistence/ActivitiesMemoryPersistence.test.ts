import { ActivitiesMemoryPersistence } from '../../src/persistence/ActivitiesMemoryPersistence';
import { ActivitiesPersistenceFixture } from './ActivitiesPersistenceFixture';

suite('ActivitiesMemoryPersistence', ()=> {
    let persistence: ActivitiesMemoryPersistence;
    let fixture: ActivitiesPersistenceFixture;
    
    setup((done) => {
        persistence = new ActivitiesMemoryPersistence();
        fixture = new ActivitiesPersistenceFixture(persistence);
        
        persistence.open(null, done);
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
