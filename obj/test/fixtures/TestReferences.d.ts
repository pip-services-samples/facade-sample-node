import { Descriptor } from 'pip-services3-commons-node';
import { ManagedReferences } from 'pip-services3-container-node';
export declare class TestReferences extends ManagedReferences {
    private _factory;
    constructor();
    private setupFactories;
    append(descriptor: Descriptor): void;
    private appendDependencies;
    private configureService;
    private createUsersAndSessions;
}
