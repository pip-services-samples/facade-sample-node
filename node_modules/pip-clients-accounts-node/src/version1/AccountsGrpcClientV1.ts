let _ = require('lodash');
let services = require('../../../src/protos/accounts_v1_grpc_pb');
let messages = require('../../../src/protos/accounts_v1_pb');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { GrpcClient } from 'pip-services3-grpc-node';

import { IAccountsClientV1 } from './IAccountsClientV1';
import { AccountV1 } from './AccountV1';
import { AccountsGrpcConverterV1 } from './AccountsGrpcConverterV1';

export class AccountsGrpcClientV1 extends GrpcClient implements IAccountsClientV1 {
        
    public constructor() {
        super(services.AccountsClient);
    }

    public getAccounts(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, result: DataPage<AccountV1>) => void): void {

        let request = new messages.AccountPageRequest();

        AccountsGrpcConverterV1.setMap(request.getFilterMap(), filter);
        request.setPaging(AccountsGrpcConverterV1.fromPagingParams(paging));

        let timing = this.instrument(correlationId, 'accounts.get_accounts');

        this.call('get_accounts',
            correlationId, 
            request,
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = AccountsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? AccountsGrpcConverterV1.toAccountPage(response.getPage())
                    : null;

                callback(err, result);
            }
        );
    }

    public getAccountById(correlationId: string, accountId: string,
        callback: (err: any, result: AccountV1) => void): void {

        let request = new messages.AccountIdRequest();
        request.setAccountId(accountId);

        let timing = this.instrument(correlationId, 'accounts.get_account_by_id');

        this.call('get_account_by_id',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = AccountsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? AccountsGrpcConverterV1.toAccount(response.getAccount())
                    : null;

                callback(err, result);
            }
        );        
    }

    public getAccountByLogin(correlationId: string, login: string,
        callback: (err: any, result: AccountV1) => void): void {

        let request = new messages.AccountLoginRequest();
        request.setLogin(login);

        let timing = this.instrument(correlationId, 'accounts.get_account_by_login');

        this.call('get_account_by_login',
            correlationId, 
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = AccountsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? AccountsGrpcConverterV1.toAccount(response.getAccount())
                    : null;

                callback(err, result);
            }
        );
    }

    public getAccountByIdOrLogin(correlationId: string, idOrLogin: string,
        callback: (err: any, result: AccountV1) => void): void {

        let request = new messages.AccountLoginRequest();
        request.setLogin(idOrLogin);

        let timing = this.instrument(correlationId, 'accounts.get_account_by_id_or_login');

        this.call('get_account_by_id_or_login',
            correlationId, 
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = AccountsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? AccountsGrpcConverterV1.toAccount(response.getAccount())
                    : null;

                callback(err, result);
            }
        );
    }

    public createAccount(correlationId: string, account: AccountV1,
        callback: (err: any, result: AccountV1) => void): void {

        let accountObj = AccountsGrpcConverterV1.fromAccount(account);

        let request = new messages.AccountObjectRequest();
        request.setAccount(accountObj);

        let timing = this.instrument(correlationId, 'accounts.create_account');

        this.call('create_account',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = AccountsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? AccountsGrpcConverterV1.toAccount(response.getAccount())
                    : null;

                callback(err, result);
            }
        );
    }

    public updateAccount(correlationId: string, account: AccountV1,
        callback: (err: any, result: AccountV1) => void): void {

        let accountObj = AccountsGrpcConverterV1.fromAccount(account);

        let request = new messages.AccountObjectRequest();
        request.setAccount(accountObj);
    
        let timing = this.instrument(correlationId, 'accounts.update_account');

        this.call('update_account',
            correlationId, 
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = AccountsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? AccountsGrpcConverterV1.toAccount(response.getAccount())
                    : null;

                callback(err, result);
            }
        );
    }

    public deleteAccountById(correlationId: string, accountId: string,
        callback: (err: any, result: AccountV1) => void): void {

        let request = new messages.AccountIdRequest();
        request.setAccountId(accountId);

        let timing = this.instrument(correlationId, 'accounts.delete_account_by_id');

        this.call('delete_account_by_id',
            correlationId, 
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = AccountsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? AccountsGrpcConverterV1.toAccount(response.getAccount())
                    : null;

                callback(err, result);
            }
        );
    }
  
}
