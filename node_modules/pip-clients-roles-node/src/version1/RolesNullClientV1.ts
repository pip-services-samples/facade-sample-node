import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { UserRolesV1 } from './UserRolesV1';
import { IRolesClientV1 } from './IRolesClientV1';

export class RolesNullClientV1 implements IRolesClientV1 {
    public getRolesByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<UserRolesV1>) => void): void {
        callback(null, new DataPage<UserRolesV1>([], 0));
    }

    public getRolesById(correlationId: string, userId: string,
        callback: (err: any, roles: string[]) => void) {
        callback(null, []);
    }

    public setRoles(correlationId: string, userId: string, roles: string[],
        callback?: (err: any, roles: string[]) => void) {
        if (callback) callback(null, roles || []);
    }

    public grantRoles(correlationId: string, userId: string, roles: string[],
        callback?: (err: any, roles: string[]) => void) {
        if (callback) callback(null, roles);
    }

    public revokeRoles(correlationId: string, userId: string, roles: string[],
        callback?: (err: any, roles: string[]) => void) {
        if (callback) callback(null, []);
    }
    
    public authorize(correlationId: string, userId: string, roles: string[],
        callback: (err: any, authorized: boolean) => void) {
        callback(null, true);
    }
}
