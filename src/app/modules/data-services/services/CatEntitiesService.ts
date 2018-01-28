import {NamedClientService} from "./namedClientService.service";
import {CatColumnType} from "../models/CatColumnType";
import {CatEntity} from "../models/CatEntity";

export class CatEntitiesService  extends NamedClientService<CatEntity>{
    getServiceName(): string {
        return 'CatEntitiesService';
    }
    getApiBasePath(): string {
        return 'cat_entities';
    }
    public fromJson(json: any): CatEntity {
        return CatEntity.FromJson(json);
    }
    public toJson(entity: CatEntity): any {
        return entity.toJson();
    }
}