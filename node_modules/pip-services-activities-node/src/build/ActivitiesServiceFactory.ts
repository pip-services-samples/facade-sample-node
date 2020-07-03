import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { ActivitiesMongoDbPersistence } from '../persistence/ActivitiesMongoDbPersistence';
import { ActivitiesFilePersistence } from '../persistence/ActivitiesFilePersistence';
import { ActivitiesMemoryPersistence } from '../persistence/ActivitiesMemoryPersistence';
import { ActivitiesCouchbasePersistence } from '../persistence/ActivitiesCouchbasePersistence';
import { ActivitiesController } from '../logic/ActivitiesController';
import { ActivitiesHttpServiceV1 } from '../services/version1/ActivitiesHttpServiceV1';
import { ActivitiesGrpcServiceV1 } from '../services/version1/ActivitiesGrpcServiceV1';
import { ActivitiesCommandableGrpcServiceV1 } from '../services/version1/ActivitiesCommandableGrpcServiceV1';

export class ActivitiesServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-activities", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-activities", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-activities", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-activities", "persistence", "mongodb", "*", "1.0");
	public static CouchbasePersistenceDescriptor = new Descriptor("pip-services-activities", "persistence", "couchbase", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-activities", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-activities", "service", "http", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("pip-services-activities", "service", "grpc", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("pip-services-activities", "service", "commandable-grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(ActivitiesServiceFactory.MemoryPersistenceDescriptor, ActivitiesMemoryPersistence);
		this.registerAsType(ActivitiesServiceFactory.FilePersistenceDescriptor, ActivitiesFilePersistence);
		this.registerAsType(ActivitiesServiceFactory.MongoDbPersistenceDescriptor, ActivitiesMongoDbPersistence);
		this.registerAsType(ActivitiesServiceFactory.CouchbasePersistenceDescriptor, ActivitiesCouchbasePersistence);
		this.registerAsType(ActivitiesServiceFactory.ControllerDescriptor, ActivitiesController);
		this.registerAsType(ActivitiesServiceFactory.HttpServiceDescriptor, ActivitiesHttpServiceV1);
		this.registerAsType(ActivitiesServiceFactory.GrpcServiceDescriptor, ActivitiesGrpcServiceV1);
		this.registerAsType(ActivitiesServiceFactory.CommandableGrpcServiceDescriptor, ActivitiesCommandableGrpcServiceV1);
	}
	
}
