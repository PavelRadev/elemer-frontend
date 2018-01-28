import {NamedClientService} from "./namedClientService.service";
import {CatTableValue} from "../models/CatTableValue";

export class CatTableValuesService extends NamedClientService<CatTableValue> {
    getServiceName(): string {
        return 'CatTableValuesService';
    }

    getApiBasePath(): string {
        return 'cat_table_values';
    }

    public fromJson(json: any): CatTableValue {
        return CatTableValue.FromJson(json);
    }

    public toJson(entity: CatTableValue): any {
        return entity.toJson();
    }
}