import { Descriptor } from 'pip-services3-commons-node';
import { CommandableGrpcService } from 'pip-services3-grpc-node';

export class ActivitiesCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/activities');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-activities', 'controller', 'default', '*', '*'));
    }
}