import {BaseEntity} from "./BaseEntity";
import * as moment from 'moment';
import {EntityWithTimestamps} from "./EntityWithTimestamps";
import {UtilsDateTime} from "../../utils/utilsDateTime";

export class CatEntity extends EntityWithTimestamps {
    constructor(id: string = null,
                        public name: string = null,
                        public description: string = null,
                        createdAt: moment.Moment = null,
                        updatedAt: moment.Moment = null,
                        deletedAt: moment.Moment = null) {
        super(id, createdAt, updatedAt);
    }

    public static FromJson(json: any): CatEntity {
        return new CatEntity(
            json['id'],
            json['name'],
            json['description'],
            UtilsDateTime.GetMomentFromString(json['created_at']),
            UtilsDateTime.GetMomentFromString(json['updated_at']),
            UtilsDateTime.GetMomentFromString(json['deleted_at']),
        );
    }

    public toJson(): any {
        const obj: any = {
            id: this.id,
            name: this.name,
            description: this.description
        };
        return obj;
    }
}