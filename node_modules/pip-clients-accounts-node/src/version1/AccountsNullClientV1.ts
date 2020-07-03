import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams} from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { IAccountsClientV1 } from './IAccountsClientV1';
import { AccountV1 } from './AccountV1';

export class AccountsNullClientV1 implements IAccountsClientV1 {

    public getAccounts(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<AccountV1>) => void): void {
        callback(null, new DataPage<AccountV1>([], 0));
    }

    public getAccountById(correlationId: string, id: string,
        callback: (err: any, account: AccountV1) => void): void {
        callback(null, null);
    }

    public getAccountByLogin(correlationId: string, login: string,
        callback: (err: any, account: AccountV1) => void): void {
        callback(null, null);
    }

    public getAccountByIdOrLogin(correlationId: string, idOrLogin: string,
        callback: (err: any, account: AccountV1) => void): void {
        callback(null, null);
    }

    public createAccount(correlationId: string, account: AccountV1,
        callback: (err: any, account: AccountV1) => void): void {
        callback(null, account);
    }

    public updateAccount(correlationId: string, account: AccountV1,
        callback: (err: any, account: AccountV1) => void): void {
        callback(null, account);
    }

    public deleteAccountById(correlationId: string, id: string,
        callback: (err: any, account: AccountV1) => void): void {
        callback(null, null);
    }

}