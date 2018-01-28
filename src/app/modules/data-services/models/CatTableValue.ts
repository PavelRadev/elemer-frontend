import * as moment from 'moment';
import {EntityWithTimestamps} from "./EntityWithTimestamps";
import {UtilsDateTime} from "../../utils/utilsDateTime";
import {CatTableColumn} from "./CatTableColumn";

export class CatTableValue extends EntityWithTimestamps {
    constructor(id: string = null,
                public rowId: string = null,
                public columnId: string = null,
                public value: string = null,
                createdAt: moment.Moment = null,
                updatedAt: moment.Moment = null,
                deletedAt: moment.Moment = null,
                public column:CatTableColumn = null) {
        super(id, createdAt, updatedAt);
    }

    public static FromJson(json: any): CatTableValue {
        return new CatTableValue(
            json['id'],
            json['row_id'],
            json['column_id'],
            json['value'],
            UtilsDateTime.GetMomentFromString(json['created_at']),
            UtilsDateTime.GetMomentFromString(json['updated_at']),
            UtilsDateTime.GetMomentFromString(json['deleted_at']),
            !!json['column'] ? CatTableColumn.FromJson(json['column']) : null,
        );
    }

    public toJson(): any {
        const obj: any = {
            id: this.id,
            row_id: this.rowId,
            column_id: this.columnId,
            value: this.value,
        };
        return obj;
    }
}