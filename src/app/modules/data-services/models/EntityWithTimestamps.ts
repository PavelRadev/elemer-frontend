import {BaseEntity} from "./BaseEntity";
import * as moment from 'moment';
import {UtilsDateTime} from "../../utils/utilsDateTime";

export abstract class EntityWithTimestamps extends BaseEntity {
    public createdAtString: string;
    public updatedAtString: string;

    public constructor(id: string = null,
                       public createdAt: moment.Moment = null,
                       public updatedAt: moment.Moment = null) {
        super();
        this.id = id;

        this.initialize();
    }

    public initialize() {
        this.createdAtString = UtilsDateTime.MomentToDateTimeDisplayString(this.createdAt);
        this.updatedAtString = UtilsDateTime.MomentToDateTimeDisplayString(this.updatedAt);
    }
}