import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from 'pip-services3-components-node';

import { BeaconsNullClientV1 } from '../version1/BeaconsNullClientV1';
import { BeaconsMemoryClientV1 } from '../version1/BeaconsMemoryClientV1';
import { BeaconsDirectClientV1 } from '../version1/BeaconsDirectClientV1';
import { BeaconsHttpClientV1 } from '../version1/BeaconsHttpClientV1';
import { BeaconsLambdaClientV1 } from '../version1/BeaconsLambdaClientV1';

export class BeaconsClientFactory extends Factory {
    public static NullClientV1Descriptor = new Descriptor('pip-services-beacons', 'client', 'null', '*', '1.0');
    public static MemoryClientV1Descriptor = new Descriptor('pip-services-beacons', 'client', 'memory', '*', '1.0');
    public static DirectClientV1Descriptor = new Descriptor('pip-services-beacons', 'client', 'direct', '*', '1.0');
    public static HttpClientV1Descriptor = new Descriptor('pip-services-beacons', 'client', 'http', '*', '1.0');
    public static LambdaClientV1Descriptor = new Descriptor('pip-services-beacons', 'client', 'lambda', '*', '1.0');
    
    constructor() {
        super();

        this.registerAsType(BeaconsClientFactory.NullClientV1Descriptor, BeaconsNullClientV1);
        this.registerAsType(BeaconsClientFactory.MemoryClientV1Descriptor, BeaconsMemoryClientV1);
        this.registerAsType(BeaconsClientFactory.DirectClientV1Descriptor, BeaconsDirectClientV1);
        this.registerAsType(BeaconsClientFactory.HttpClientV1Descriptor, BeaconsHttpClientV1);
        this.registerAsType(BeaconsClientFactory.LambdaClientV1Descriptor, BeaconsLambdaClientV1);
    }
}