import {BaseEntity} from "./BaseEntity";
import * as moment from 'moment';
import {EntityWithTimestamps} from "./EntityWithTimestamps";
import {UtilsDateTime} from "../../utils/utilsDateTime";
import {CatTableValue} from "./CatTableValue";
import {CatTable} from "./CatTable";

export class CatTableRow extends EntityWithTimestamps {
    constructor(id: string = null,
                public number: string = null,
                public tableId: string = null,
                createdAt: moment.Moment = null,
                updatedAt: moment.Moment = null,
                public deletedAt: moment.Moment = null,
                public values: CatTableValue[] = [],
                public table: CatTable = null) {
        super(id, createdAt, updatedAt);
    }

    public static FromJson(json: any): CatTableRow {
        return new CatTableRow(
            json['id'],
            json['number'],
            json['table_id'],
            UtilsDateTime.GetMomentFromString(json['created_at']),
            UtilsDateTime.GetMomentFromString(json['updated_at']),
            UtilsDateTime.GetMomentFromString(json['deleted_at']),
            json['values'] ? json['values'].map(i => CatTableValue.FromJson(i)) : [],
            json['table'] ? CatTable.FromJson(json['table']) : null
        );
    }

    public toJson(): any {
        const obj: any = {
            id: this.id,
            number: this.number,
            table_id: this.tableId,
        };
        return obj;
    }
}