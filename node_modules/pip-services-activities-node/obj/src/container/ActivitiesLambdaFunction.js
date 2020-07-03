"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const ActivitiesServiceFactory_1 = require("../build/ActivitiesServiceFactory");
class ActivitiesLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("activities", "Party activities function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-activities', 'controller', 'default', '*', '*'));
        this._factories.add(new ActivitiesServiceFactory_1.ActivitiesServiceFactory());
    }
}
exports.ActivitiesLambdaFunction = ActivitiesLambdaFunction;
exports.handler = new ActivitiesLambdaFunction().getHandler();
//# sourceMappingURL=ActivitiesLambdaFunction.js.map