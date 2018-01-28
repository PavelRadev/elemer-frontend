import {NamedClientService} from "./namedClientService.service";
import {CatColumnType} from "../models/CatColumnType";

export class CatColumnTypesService  extends NamedClientService<CatColumnType>{
    getServiceName(): string {
        return 'CatColumnTypesService';
    }
    getApiBasePath(): string {
        return 'cat_column_types';
    }
    public fromJson(json: any): CatColumnType {
        return CatColumnType.FromJson(json);
    }
    public toJson(entity: CatColumnType): any {
        return entity.toJson();
    }
}