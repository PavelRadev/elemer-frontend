import {CatTableValuesService} from "../../modules/data-services/services/CatTableValuesService";
import {CatTableColumn} from "../../modules/data-services/models/CatTableColumn";
export class ColumnValuePair {
    constructor(public columnName: string = "",
                public value: any = null,
                public availableColumns: CatTableColumn[] = [],
                public availableValues: string[] = []) {
    }

    public static FromJson(json: any): ColumnValuePair {
        return new ColumnValuePair(
            json['column_name'],
            json['value']
        );
    }

    public toJson(): any {
        let obj: any = {
            column_name: this.columnName,
            value: this.value
        };
        return obj;
    }
}