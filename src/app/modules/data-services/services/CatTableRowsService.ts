import {NamedClientService} from "./namedClientService.service";
import {CatTableRow} from "../models/CatTableRow";

export class CatTableRowsService extends NamedClientService<CatTableRow> {
    getServiceName(): string {
        return 'CatTableRowsService';
    }

    getApiBasePath(): string {
        return 'cat_table_rows';
    }

    public fromJson(json: any): CatTableRow {
        return CatTableRow.FromJson(json);
    }

    public toJson(entity: CatTableRow): any {
        return entity.toJson();
    }
}