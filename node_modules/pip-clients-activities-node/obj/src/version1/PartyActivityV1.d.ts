import { IStringIdentifiable } from 'pip-services3-commons-node';
import { StringValueMap } from 'pip-services3-commons-node';
import { ReferenceV1 } from './ReferenceV1';
export declare class PartyActivityV1 implements IStringIdentifiable {
    constructor(id: string, type: string, party: ReferenceV1, ref_item?: ReferenceV1, ref_parents?: ReferenceV1[], ref_party?: ReferenceV1, details?: StringValueMap);
    id: string;
    org_id?: string;
    time: Date;
    type: string;
    party: ReferenceV1;
    ref_item: ReferenceV1;
    ref_parents: ReferenceV1[];
    ref_party: ReferenceV1;
    details: StringValueMap;
}
