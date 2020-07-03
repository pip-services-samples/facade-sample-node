import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { BeaconV1 } from '../data/version1/BeaconV1';
import { IBeaconsController } from './IBeaconsController';
export declare class BeaconsController implements IBeaconsController, IConfigurable, IReferenceable, ICommandable {
    private static _defaultConfig;
    private _persistence;
    private _dependencyResolver;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<BeaconV1>) => void): void;
    getBeaconById(correlationId: string, id: string, callback: (err: any, item: BeaconV1) => void): void;
    getBeaconByUdi(correlationId: string, udi: string, callback: (err: any, item: BeaconV1) => void): void;
    calculatePosition(correlationId: string, orgId: string, udis: string[], callback: (err: any, position: any) => void): void;
    private fixBeacon;
    createBeacon(correlationId: string, item: BeaconV1, callback: (err: any, item: BeaconV1) => void): void;
    updateBeacon(correlationId: string, item: BeaconV1, callback: (err: any, item: BeaconV1) => void): void;
    deleteBeaconById(correlationId: string, id: string, callback: (err: any, item: BeaconV1) => void): void;
}
