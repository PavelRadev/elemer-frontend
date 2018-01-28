import * as moment from 'moment';
import {EntityWithTimestamps} from "./EntityWithTimestamps";
import {UtilsDateTime} from "../../utils/utilsDateTime";
import {CatTableRow} from "./CatTableRow";
import {CatTableColumn} from "./CatTableColumn";

export class CatTable extends EntityWithTimestamps {
    constructor(id: string = null,
                public name: string = null,
                public description: string = null,
                public entityId: string = null,
                createdAt: moment.Moment = null,
                updatedAt: moment.Moment = null,
                deletedAt: moment.Moment = null,
                public rows: CatTableRow[] = [],
                public columns: CatTableColumn[] = []) {
        super(id, createdAt, updatedAt);
    }

    public static FromJson(json: any): CatTable {
        return new CatTable(
            json['id'],
            json['name'],
            json['description'],
            json['entity_id'],
            UtilsDateTime.GetMomentFromString(json['created_at']),
            UtilsDateTime.GetMomentFromString(json['updated_at']),
            UtilsDateTime.GetMomentFromString(json['deleted_at']),
            json['rows'] ? json['rows'].map(i => CatTableRow.FromJson(i)) : [],
            json['columns'] ? json['columns'].map(i => CatTableColumn.FromJson(i)) : [],
        );
    }

    public toJson(): any {
        const obj: any = {
            id: this.id,
            name: this.name,
            description: this.description,
            entity_id: this.entityId
        };
        return obj;
    }
}