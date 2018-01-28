import {NamedClientService} from "./namedClientService.service";
import {CatTable} from "../models/CatTable";

export class CatTablesService  extends NamedClientService<CatTable>{
    getServiceName(): string {
        return 'CatTablesService';
    }
    getApiBasePath(): string {
        return 'cat_tables';
    }
    public fromJson(json: any): CatTable {
        return CatTable.FromJson(json);
    }
    public toJson(entity: CatTable): any {
        return entity.toJson();
    }
}