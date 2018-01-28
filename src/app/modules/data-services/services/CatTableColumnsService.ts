import {NamedClientService} from "./namedClientService.service";
import {CatTableColumn} from "../models/CatTableColumn";
import {Observable} from "rxjs";
import {CatTable} from "../models/CatTable";

export class CatTableColumnsService extends NamedClientService<CatTableColumn> {
    getServiceName(): string {
        return 'CatTableColumnsService';
    }

    getApiBasePath(): string {
        return 'cat_table_columns';
    }

    public fromJson(json: any): CatTableColumn {
        return CatTableColumn.FromJson(json);
    }

    public toJson(entity: CatTableColumn): any {
        return entity.toJson();
    }

    public create(entity: CatTableColumn): Observable<CatTableColumn> {
        throw new Error('deprecated! use createAndReturnTable instead');
    }

    public createAndReturnTable(entity: CatTableColumn): Observable<CatTable> {
        //noinspection TypeScriptValidateTypes
        return this.post(this.apiBasePath, this.toJson(entity)).map(response => {
            return CatTable.FromJson(this.handleResponse(response));
        });
    }
}