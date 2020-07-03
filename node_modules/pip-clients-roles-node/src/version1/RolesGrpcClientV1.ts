let _ = require('lodash');
let services = require('../../../src/protos/roles_v1_grpc_pb');
let messages = require('../../../src/protos/roles_v1_pb');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { GrpcClient } from 'pip-services3-grpc-node';

import { IRolesClientV1 } from './IRolesClientV1';
import { UserRolesV1 } from './UserRolesV1';
import { RolesGrpcConverterV1 } from './RolesGrpcConverterV1';

export class RolesGrpcClientV1 extends GrpcClient implements IRolesClientV1 {
        
    public constructor() {
        super(services.RolesClient);
    }

    public getRolesByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, result: DataPage<UserRolesV1>) => void): void {

        let request = new messages.RolesPageRequest();

        RolesGrpcConverterV1.setMap(request.getFilterMap(), filter);
        request.setPaging(RolesGrpcConverterV1.fromPagingParams(paging));

        let timing = this.instrument(correlationId, 'roles.get_roles_by_filter');

        this.call('get_roles_by_filter',
            correlationId, 
            request,
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = RolesGrpcConverterV1.toError(response.error);

                let result = response 
                    ? RolesGrpcConverterV1.toUserRolesPage(response.getPage())
                    : null;

                callback(err, result);
            }
        );
    }

    public getRolesById(correlationId: string, userId: string,
        callback: (err: any, roles: string[]) => void): void {

        let request = new messages.RoleIdRequest();
        request.setUserId(userId);

        let timing = this.instrument(correlationId, 'roles.get_roles_by_id');

        this.call('get_roles_by_id',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = RolesGrpcConverterV1.toError(response.error);

                let roles = response ? response.getRolesList() : null;

                callback(err, roles);
            }
        );        
    }

    public setRoles(correlationId: string, userId: string, roles: string[],
        callback?: (err: any, roles: string[]) => void) {

        let request = new messages.RolesRequest();
        request.setUserId(userId);
        request.setRolesList(roles);

        let timing = this.instrument(correlationId, 'roles.set_roles');

        this.call('set_roles',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = RolesGrpcConverterV1.toError(response.error);

                let roles = response ? response.getRolesList() : null;

                callback(err, roles);
            }
        );        
    }

    public grantRoles(correlationId: string, userId: string, roles: string[],
        callback?: (err: any, roles: string[]) => void) {

        let request = new messages.RolesRequest();
        request.setUserId(userId);
        request.setRolesList(roles);

        let timing = this.instrument(correlationId, 'roles.grant_roles');

        this.call('grant_roles',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = RolesGrpcConverterV1.toError(response.error);

                let roles = response ? response.getRolesList() : null;

                callback(err, roles);
            }
        );        
    }

    public revokeRoles(correlationId: string, userId: string, roles: string[],
        callback?: (err: any, roles: string[]) => void) {

        let request = new messages.RolesRequest();
        request.setUserId(userId);
        request.setRolesList(roles);

        let timing = this.instrument(correlationId, 'roles.revoke_roles');

        this.call('revoke_roles',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = RolesGrpcConverterV1.toError(response.error);

                let roles = response ? response.getRolesList() : null;

                callback(err, roles);
            }
        );        
    }

        
    public authorize(correlationId: string, userId: string, roles: string[],
        callback: (err: any, authorized: boolean) => void) {

        let request = new messages.RolesRequest();
        request.setUserId(userId);
        request.setRolesList(roles);

        let timing = this.instrument(correlationId, 'roles.authorize');

        this.call('authorize',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = RolesGrpcConverterV1.toError(response.error);

                let authorized = response ? response.getAuthorized() : null;

                callback(err, authorized);
            }
        );        
    }
  
}
