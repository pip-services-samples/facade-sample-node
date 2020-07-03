import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

import { ReferenceV1Schema } from './ReferenceV1Schema';

export class PartyActivityV1Schema extends ObjectSchema {
    public constructor() {
        super();

        let referenceSchema = new ReferenceV1Schema();

        this.withOptionalProperty('id', TypeCode.String);
        this.withOptionalProperty('org_id', TypeCode.String);
        this.withOptionalProperty('time', TypeCode.DateTime);
        this.withRequiredProperty('type', TypeCode.String);
        this.withRequiredProperty('party', referenceSchema);
        this.withOptionalProperty('ref_item', referenceSchema);
        this.withOptionalProperty('ref_parents', new ArraySchema(referenceSchema));
        this.withOptionalProperty('ref_party', referenceSchema);
        this.withOptionalProperty('details', TypeCode.Map);
    }
}
