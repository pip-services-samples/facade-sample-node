"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class AccountsDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_2.Descriptor("pip-services-accounts", "controller", "*", "*", "*"));
        if (config)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getAccounts(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'accounts.get_accounts');
        this._controller.getAccounts(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    getAccountById(correlationId, id, callback) {
        let timing = this.instrument(correlationId, 'accounts.get_account_by_id');
        this._controller.getAccountById(correlationId, id, (err, account) => {
            timing.endTiming();
            callback(err, account);
        });
    }
    getAccountByLogin(correlationId, login, callback) {
        let timing = this.instrument(correlationId, 'accounts.get_account_by_login');
        this._controller.getAccountByLogin(correlationId, login, (err, account) => {
            timing.endTiming();
            callback(err, account);
        });
    }
    getAccountByIdOrLogin(correlationId, idOrLogin, callback) {
        let timing = this.instrument(correlationId, 'accounts.get_account_by_id_or_login');
        this._controller.getAccountByIdOrLogin(correlationId, idOrLogin, (err, account) => {
            timing.endTiming();
            callback(err, account);
        });
    }
    createAccount(correlationId, account, callback) {
        let timing = this.instrument(correlationId, 'accounts.create_account');
        this._controller.createAccount(correlationId, account, (err, account) => {
            timing.endTiming();
            callback(err, account);
        });
    }
    updateAccount(correlationId, account, callback) {
        let timing = this.instrument(correlationId, 'accounts.update_account');
        this._controller.updateAccount(correlationId, account, (err, account) => {
            timing.endTiming();
            callback(err, account);
        });
    }
    deleteAccountById(correlationId, id, callback) {
        let timing = this.instrument(correlationId, 'accounts.delete_account_by_id');
        this._controller.deleteAccountById(correlationId, id, (err, account) => {
            timing.endTiming();
            callback(err, account);
        });
    }
}
exports.AccountsDirectClientV1 = AccountsDirectClientV1;
//# sourceMappingURL=AccountsDirectClientV1.js.map