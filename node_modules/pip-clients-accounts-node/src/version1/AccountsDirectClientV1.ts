import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams} from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';

import { IAccountsClientV1 } from './IAccountsClientV1';
//import { IAccountsController } from 'pip-services-accounts-node';
import { AccountV1 } from './AccountV1';

export class AccountsDirectClientV1 extends DirectClient<any> implements IAccountsClientV1 {
            
    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-accounts", "controller", "*", "*", "*"));

        if (config)
            this.configure(ConfigParams.fromValue(config));
    }

    public getAccounts(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<AccountV1>) => void): void {
        let timing = this.instrument(correlationId, 'accounts.get_accounts');
        this._controller.getAccounts(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    public getAccountById(correlationId: string, id: string,
        callback: (err: any, account: AccountV1) => void): void {
        let timing = this.instrument(correlationId, 'accounts.get_account_by_id');
        this._controller.getAccountById(correlationId, id, (err, account) => {
            timing.endTiming();
            callback(err, account);
        });
    }

    public getAccountByLogin(correlationId: string, login: string,
        callback: (err: any, account: AccountV1) => void): void {
        let timing = this.instrument(correlationId, 'accounts.get_account_by_login');
        this._controller.getAccountByLogin(correlationId, login, (err, account) => {
            timing.endTiming();
            callback(err, account);
        });
    }

    public getAccountByIdOrLogin(correlationId: string, idOrLogin: string,
        callback: (err: any, account: AccountV1) => void): void {
        let timing = this.instrument(correlationId, 'accounts.get_account_by_id_or_login');
        this._controller.getAccountByIdOrLogin(correlationId, idOrLogin, (err, account) => {
            timing.endTiming();
            callback(err, account);
        });
    }

    public createAccount(correlationId: string, account: AccountV1,
        callback: (err: any, account: AccountV1) => void): void {
        let timing = this.instrument(correlationId, 'accounts.create_account');
        this._controller.createAccount(correlationId, account, (err, account) => {
            timing.endTiming();
            callback(err, account);
        });
    }

    public updateAccount(correlationId: string, account: AccountV1,
        callback: (err: any, account: AccountV1) => void): void {
        let timing = this.instrument(correlationId, 'accounts.update_account');
        this._controller.updateAccount(correlationId, account, (err, account) => {
            timing.endTiming();
            callback(err, account);
        });
    }

    public deleteAccountById(correlationId: string, id: string,
        callback: (err: any, account: AccountV1) => void): void {
        let timing = this.instrument(correlationId, 'accounts.delete_account_by_id');
        this._controller.deleteAccountById(correlationId, id, (err, account) => {
            timing.endTiming();
            callback(err, account);
        });
    }

}