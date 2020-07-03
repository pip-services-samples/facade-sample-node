import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class BeaconsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/beacons');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-beacons', 'controller', 'default', '*', '1.0'));
    }
}