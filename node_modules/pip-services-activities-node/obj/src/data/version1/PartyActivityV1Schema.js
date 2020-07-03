"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const ReferenceV1Schema_1 = require("./ReferenceV1Schema");
class PartyActivityV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        let referenceSchema = new ReferenceV1Schema_1.ReferenceV1Schema();
        this.withOptionalProperty('id', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('org_id', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('time', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withRequiredProperty('type', pip_services3_commons_node_3.TypeCode.String);
        this.withRequiredProperty('party', referenceSchema);
        this.withOptionalProperty('ref_item', referenceSchema);
        this.withOptionalProperty('ref_parents', new pip_services3_commons_node_2.ArraySchema(referenceSchema));
        this.withOptionalProperty('ref_party', referenceSchema);
        this.withOptionalProperty('details', pip_services3_commons_node_3.TypeCode.Map);
    }
}
exports.PartyActivityV1Schema = PartyActivityV1Schema;
//# sourceMappingURL=PartyActivityV1Schema.js.map