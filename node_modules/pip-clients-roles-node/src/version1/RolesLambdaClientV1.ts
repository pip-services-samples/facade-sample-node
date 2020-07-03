import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableLambdaClient } from 'pip-services3-aws-node';

import { UserRolesV1 } from './UserRolesV1';
import { IRolesClientV1 } from './IRolesClientV1';

export class RolesLambdaClientV1 extends CommandableLambdaClient implements IRolesClientV1 {

    constructor(config?: any) {
        super('roles');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
        
    public getRolesByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<UserRolesV1>) => void): void {
        this.callCommand(
            'get_roles_by_filter',
            correlationId,
            {
                filter: filter,
                paging: paging
            },
            callback
        );
    }

    public getRolesById(correlationId: string, userId: string,
        callback: (err: any, roles: string[]) => void) {
        this.callCommand(
            'get_roles_by_id',
            correlationId,
            {
                user_id: userId
            },
            callback
        );
    }

    public setRoles(correlationId: string, userId: string, roles: string[],
        callback?: (err: any, roles: string[]) => void) {
        this.callCommand(
            'set_roles',
            correlationId,
            {
                user_id: userId,
                roles: roles
            },
            callback
        );
    }

    public grantRoles(correlationId: string, userId: string, roles: string[],
        callback?: (err: any, roles: string[]) => void) {
        this.callCommand(
            'grant_roles',
            correlationId,
            {
                user_id: userId,
                roles: roles
            },
            callback
        );
    }

    public revokeRoles(correlationId: string, userId: string, roles: string[],
        callback?: (err: any, roles: string[]) => void) {
        this.callCommand(
            'revoke_roles',
            correlationId,
            {
                user_id: userId,
                roles: roles
            },
            callback
        );
    }
    
    public authorize(correlationId: string, userId: string, roles: string[],
        callback: (err: any, authorized: boolean) => void) {
        this.callCommand(
            'authorize',
            correlationId,
            {
                user_id: userId,
                roles: roles
            },
            (err, result) => {
                callback(err, result ? result.authorized : null);
            }
        );
    }

}
