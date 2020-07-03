import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from 'pip-services3-components-node';

import { AccountsNullClientV1 } from '../version1/AccountsNullClientV1';
import { AccountsMemoryClientV1 } from '../version1/AccountsMemoryClientV1';
import { AccountsDirectClientV1 } from '../version1/AccountsDirectClientV1';
import { AccountsHttpClientV1 } from '../version1/AccountsHttpClientV1';
import { AccountsCommandableGrpcClientV1 } from '../version1/AccountsCommandableGrpcClientV1';

export class AccountsClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-accounts', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('pip-services-accounts', 'client', 'null', 'default', '1.0');
	public static MemoryClientV1Descriptor = new Descriptor('pip-services-accounts', 'client', 'memory', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-accounts', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-accounts', 'client', 'http', 'default', '1.0');
	public static CommandableGrpcClientV1Descriptor = new Descriptor('pip-services-accounts', 'client', 'commandable-grpc', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(AccountsClientFactory.NullClientV1Descriptor, AccountsNullClientV1);
		this.registerAsType(AccountsClientFactory.MemoryClientV1Descriptor, AccountsMemoryClientV1);
		this.registerAsType(AccountsClientFactory.DirectClientV1Descriptor, AccountsDirectClientV1);
		this.registerAsType(AccountsClientFactory.HttpClientV1Descriptor, AccountsHttpClientV1);
		this.registerAsType(AccountsClientFactory.CommandableGrpcClientV1Descriptor, AccountsCommandableGrpcClientV1);
	}
	
}
