import * as moment from 'moment';
import {EntityWithTimestamps} from "./EntityWithTimestamps";
import {UtilsDateTime} from "../../utils/utilsDateTime";

export class CatTableColumn extends EntityWithTimestamps {
    constructor(id: string = null,
                public name: string = null,
                public typeId: string = null,
                public tableId: string = null,
                public parentColumnId: string = null,
                createdAt: moment.Moment = null,
                updatedAt: moment.Moment = null,
                deletedAt: moment.Moment = null,
                public fullName:string = null) {
        super(id, createdAt, updatedAt);
    }

    public static FromJson(json: any): CatTableColumn {
        return new CatTableColumn(
            json['id'],
            json['name'],
            json['type_id'],
            json['table_id'],
            json['parent_column_id'],
            UtilsDateTime.GetMomentFromString(json['created_at']),
            UtilsDateTime.GetMomentFromString(json['updated_at']),
            UtilsDateTime.GetMomentFromString(json['deleted_at']),
            json['full_name']
        );
    }

    public toJson(): any {
        const obj: any = {
            id: this.id,
            name: this.name,
            type_id: this.typeId,
            table_id: this.tableId,
            parent_column_id: this.parentColumnId
        };
        return obj;
    }
}