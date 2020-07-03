import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from 'pip-services3-components-node';

import { ActivitiesNullClientV1 } from '../version1/ActivitiesNullClientV1';
import { ActivitiesDirectClientV1 } from '../version1/ActivitiesDirectClientV1';
import { ActivitiesHttpClientV1 } from '../version1/ActivitiesHttpClientV1';
import { ActivitiesCommandableGrpcClientV1 } from '../version1/ActivitiesCommandableGrpcClientV1';
import { ActivitiesGrpcClientV1 } from '../version1/ActivitiesGrpcClientV1';
import { ActivitiesLambdaClientV1 } from '../version1/ActivitiesLambdaClientV1';

export class ActivitiesClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-activities', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('pip-services-activities', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-activities', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-activities', 'client', 'http', 'default', '1.0');
	public static CommandableGrpcClientV1Descriptor = new Descriptor('pip-services-activities', 'client', 'commandable-grpc', 'default', '1.0');
	public static GrpcClientV1Descriptor = new Descriptor('pip-services-activities', 'client', 'grpc', 'default', '1.0');
	public static LambdaClientV1Descriptor = new Descriptor('pip-services-activities', 'client', 'lambda', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(ActivitiesClientFactory.NullClientV1Descriptor, ActivitiesNullClientV1);
		this.registerAsType(ActivitiesClientFactory.DirectClientV1Descriptor, ActivitiesDirectClientV1);
		this.registerAsType(ActivitiesClientFactory.HttpClientV1Descriptor, ActivitiesHttpClientV1);
		this.registerAsType(ActivitiesClientFactory.CommandableGrpcClientV1Descriptor, ActivitiesCommandableGrpcClientV1);
		this.registerAsType(ActivitiesClientFactory.GrpcClientV1Descriptor, ActivitiesGrpcClientV1);
		this.registerAsType(ActivitiesClientFactory.LambdaClientV1Descriptor, ActivitiesLambdaClientV1);
	}
	
}
