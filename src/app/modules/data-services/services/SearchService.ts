import {NamedClientService} from "./namedClientService.service";
import {CatColumnType} from "../models/CatColumnType";
import {CatEntity} from "../models/CatEntity";
import {SearchInputModel} from "../models/SearchInputModel";
import {Observable} from "rxjs";
import {BaseEntity} from "../models/BaseEntity";
import {CatTableColumn} from "../models/CatTableColumn";
import {SearchOutputModel} from "../models/SearchOutputModel";

export class SearchService extends NamedClientService<BaseEntity> {
    getServiceName(): string {
        return 'CatEntitiesService';
    }

    getApiBasePath(): string {
        return 'search';
    }

    public fromJson(json: any): BaseEntity {
        return;
    }

    public toJson(entity: BaseEntity): any {
        return;
    }

    public getTableNames(catalogId: string = null, categoryId: string = null): Observable<string[]> {
        let params: any = {};
        if (!!catalogId) params.catalog_id = catalogId;
        if (!!categoryId) params.category_id = categoryId;
        return this.get(`${this.apiBasePath}/table_names`, params)
            .map(response => this.handleResponse(response).map((x) => String(x)));
    }

    public getColumns(catalogId: string = null, categoryId: string = null, tableName: string = null): Observable<CatTableColumn[]> {
        let params: any = {};
        if (!!catalogId) params.catalog_id = catalogId;
        if (!!categoryId) params.category_id = categoryId;
        if (!!tableName) params.table_name = tableName;

        return this.get(`${this.apiBasePath}/columns_names`, params)
            .map(response => this.handleResponse(response).map((x) => CatTableColumn.FromJson(x)));
    }

    public getColumnValues(catalogId: string = null, categoryId: string = null, tableName: string = null, columnName: string = null): Observable<any[]> {
        let params: any = {};
        if (!!catalogId) params.catalog_id = catalogId;
        if (!!categoryId) params.category_id = categoryId;
        if (!!tableName) params.table_name = tableName;
        if (!!columnName) params.column_name = columnName;

        return this.get(`${this.apiBasePath}/available_values`, params).map(response => this.handleResponse(response));
    }

    public getSearchResult(searchInput: SearchInputModel): Observable<SearchOutputModel> {
        console.log(searchInput.toJson());
        return this.post(`${this.apiBasePath}/search_results`, searchInput.toJson())
            .map(response => SearchOutputModel.FromJson(this.handleResponse(response)));
    }
}