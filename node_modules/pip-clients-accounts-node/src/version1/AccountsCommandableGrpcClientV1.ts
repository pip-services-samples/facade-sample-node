import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableGrpcClient } from 'pip-services3-grpc-node';

import { AccountV1 } from './AccountV1';
import { IAccountsClientV1 } from './IAccountsClientV1';

export class AccountsCommandableGrpcClientV1 extends CommandableGrpcClient implements IAccountsClientV1 {

    constructor(config?: any) {
        super('v1/accounts');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public getAccounts(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<AccountV1>) => void): void {
        this.callCommand(
            'get_accounts',
            correlationId,
            {
                filter: filter,
                paging: paging
            },
            callback
        );
    }

    public getAccountById(correlationId: string, id: string,
        callback: (err: any, account: AccountV1) => void): void {
        this.callCommand(
            'get_account_by_id',
            correlationId,
            {
               account_id: id
            },
            callback
        );
    }

    public getAccountByLogin(correlationId: string, login: string,
        callback: (err: any, account: AccountV1) => void): void {
        this.callCommand(
            'get_account_by_login',
            correlationId,
            {
                login: login
            },
            callback
        );
    }

    public getAccountByIdOrLogin(correlationId: string, idOrLogin: string,
        callback: (err: any, account: AccountV1) => void): void {
        this.callCommand(
            'get_account_by_id_or_login',
            correlationId,
            {
                id_or_login: idOrLogin
            },
            callback
        );
    }

    public createAccount(correlationId: string, account: AccountV1,
        callback: (err: any, account: AccountV1) => void): void {
        this.callCommand(
            'create_account',
            correlationId,
            {
                account: account
            },
            callback
        );
    }

    public updateAccount(correlationId: string, account: AccountV1,
        callback: (err: any, account: AccountV1) => void): void {
        this.callCommand(
            'update_account',
            correlationId,
            {
                account: account
            },
            callback
        );
    }

    public deleteAccountById(correlationId: string, id: string,
        callback: (err: any, account: AccountV1) => void): void {
        this.callCommand(
            'delete_account_by_id',
            correlationId,
            {
                account_id: id
            },
            callback
        );
    }

}
