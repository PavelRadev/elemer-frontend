import {BaseEntity} from "./BaseEntity";

export class CatColumnType extends BaseEntity {
    public static readonly COLUMN_TYPE_ID_STRING = 'ae81d060-f30a-11e7-b376-393070339baf';
    public static readonly COLUMN_TYPE_ID_NUMBER = 'ae81d270-f30a-11e7-8fb2-25682441e6a1';

    constructor(id: string = null,
                        public name: string = null,
                        public regex: string = null) {
        super();
        this.id = id;
    }

    public static FromJson(json: any): CatColumnType {
        return new CatColumnType(
            json['id'],
            json['name'],
            json['regex']
        );
    }

    public toJson(): any {
        const obj: any = {
            id: this.id,
            name: this.name,
            regex: this.regex
        };
        return obj;
    }
}