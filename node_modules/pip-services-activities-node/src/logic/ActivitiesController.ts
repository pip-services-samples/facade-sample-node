let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';

import { PartyActivityV1 } from '../data/version1/PartyActivityV1';
import { IActivitiesPersistence } from '../persistence/IActivitiesPersistence';
import { IActivitiesController } from './IActivitiesController';
import { ActivitiesCommandSet } from './ActivitiesCommandSet';

export class ActivitiesController implements IConfigurable, IReferenceable, ICommandable, IActivitiesController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-activities:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(ActivitiesController._defaultConfig);
    private _persistence: IActivitiesPersistence;
    private _commandSet: ActivitiesCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IActivitiesPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new ActivitiesCommandSet(this);
        return this._commandSet;
    }
    
    public getPartyActivities(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<PartyActivityV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
        
    public logPartyActivity(correlationId: string, activity: PartyActivityV1,
        callback?: (err: any, activity: PartyActivityV1) => void): void {
        
        activity.time = DateTimeConverter.toNullableDateTime(activity.time);
        activity.time = activity.time || new Date();

        this._persistence.create(correlationId, activity, callback);
    }
    
    public batchPartyActivities(correlationId: string, activities: PartyActivityV1[],
        callback?: (err: any) => void): void {
        async.each(
            activities,
            (activity, callback) => {
                this._persistence.create(correlationId, activity, callback );
            },
            (err) => { 
                if (callback) callback(err); 
            }
        );
    }

    public deletePartyActivities(correlationId: string, filter: FilterParams,
        callback?: (err: any) => void): void {
        this._persistence.deleteByFilter(correlationId, filter, callback);
    }

}
