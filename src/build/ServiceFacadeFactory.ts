import { CompositeFactory } from 'pip-services3-components-node';

import { AccountsServiceFactory } from 'pip-services-accounts-node';
import { SessionsServiceFactory } from 'pip-services-sessions-node';
import { PasswordsServiceFactory } from 'pip-services-passwords-node';
import { RolesServiceFactory } from 'pip-services-roles-node';
import { BeaconsServiceFactory } from 'pip-services-beacons-node';

export class ServiceFacadeFactory extends CompositeFactory {
    public constructor() {
        super();

        this.add(new AccountsServiceFactory());
        this.add(new SessionsServiceFactory());
        this.add(new PasswordsServiceFactory());
        this.add(new RolesServiceFactory());
        this.add(new BeaconsServiceFactory());
    }

}
