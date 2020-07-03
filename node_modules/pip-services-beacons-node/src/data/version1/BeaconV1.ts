import { IStringIdentifiable } from 'pip-services3-commons-node';

export class BeaconV1 implements IStringIdentifiable {
    public id: string;
    public org_id: string;
    public type?: string;
    public udi: string;
    public label?: string;
    public center?: any; // GeoJSON
    public radius?: number; 
}