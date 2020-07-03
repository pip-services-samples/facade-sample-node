import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';

import { ActivitiesServiceFactory } from '../build/ActivitiesServiceFactory';

export class ActivitiesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("activities", "Party activities function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-activities', 'controller', 'default', '*', '*'));
        this._factories.add(new ActivitiesServiceFactory());
    }
}

export const handler = new ActivitiesLambdaFunction().getHandler();