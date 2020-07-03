"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const BeaconsServiceFactory_1 = require("../build/BeaconsServiceFactory");
class BeaconsLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super('beacons', 'Beacons positioning function');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-beacons', 'controller', 'default', '*', '*'));
        this._factories.add(new BeaconsServiceFactory_1.BeaconsServiceFactory());
    }
    getReferences() {
        return this._references;
    }
}
exports.BeaconsLambdaFunction = BeaconsLambdaFunction;
exports.handler = new BeaconsLambdaFunction().getHandler();
//# sourceMappingURL=BeaconsLambdaFunction.js.map