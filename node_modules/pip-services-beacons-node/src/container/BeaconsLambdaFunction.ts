import { Descriptor } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { BeaconsServiceFactory } from '../build/BeaconsServiceFactory';

export class BeaconsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super('beacons', 'Beacons positioning function');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-beacons', 'controller', 'default', '*', '*'));
        this._factories.add(new BeaconsServiceFactory());
    }

    public getReferences(): IReferences {
        return this._references;
    }
}

export const handler = new BeaconsLambdaFunction().getHandler();