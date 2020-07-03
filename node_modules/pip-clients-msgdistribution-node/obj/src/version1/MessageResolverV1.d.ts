import { ConfigParams } from 'pip-services3-commons-node';
import { IReconfigurable } from 'pip-services3-commons-node';
import { MessageV1 } from './MessageV1';
export declare class MessageResolverV1 implements IReconfigurable {
    private _config;
    private _messages;
    constructor(config?: ConfigParams);
    configure(config: ConfigParams): void;
    put(name: string, template: any): void;
    resolve(name: string): MessageV1;
    static fromTuples(...tuples: any[]): MessageResolverV1;
}
