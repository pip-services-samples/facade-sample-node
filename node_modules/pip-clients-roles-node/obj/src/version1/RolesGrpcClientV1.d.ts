import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { GrpcClient } from 'pip-services3-grpc-node';
import { IRolesClientV1 } from './IRolesClientV1';
import { UserRolesV1 } from './UserRolesV1';
export declare class RolesGrpcClientV1 extends GrpcClient implements IRolesClientV1 {
    constructor();
    getRolesByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, result: DataPage<UserRolesV1>) => void): void;
    getRolesById(correlationId: string, userId: string, callback: (err: any, roles: string[]) => void): void;
    setRoles(correlationId: string, userId: string, roles: string[], callback?: (err: any, roles: string[]) => void): void;
    grantRoles(correlationId: string, userId: string, roles: string[], callback?: (err: any, roles: string[]) => void): void;
    revokeRoles(correlationId: string, userId: string, roles: string[], callback?: (err: any, roles: string[]) => void): void;
    authorize(correlationId: string, userId: string, roles: string[], callback: (err: any, authorized: boolean) => void): void;
}
