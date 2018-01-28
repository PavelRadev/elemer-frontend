import {ColumnValuePair} from "../../../shared/classes/columnValuePair";

export class SearchInputModel {
    constructor(public catalogId: string = "",
                public categoryId: string = "",
                public tableName: string = "",
                public columnValuePairs: ColumnValuePair[] = []) {
    }

    public static FromJson(json: any): SearchInputModel {
        return new SearchInputModel(
            json['catalog_id'],
            json['category_id'],
            json['table_name'],
            json['column_value_pairs'] ? json['column_value_pairs'].map(x => ColumnValuePair.FromJson(x)) : []
        );
    }

    public toJson(): any {
        const obj: any = {
                catalog_id: this.catalogId,
                category_id: this.categoryId,
                table_name: this.tableName,
                column_value_pairs: this.columnValuePairs.map(x => x.toJson())
            }
        ;
        return obj;
    }
}