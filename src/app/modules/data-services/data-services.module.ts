import {NgModule, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiClientService } from "./services/api-client.service";
import { RouterModule } from "@angular/router";
import {CatColumnTypesService} from "./services/CatColumnTypesService";
import {CatEntitiesService} from "./services/CatEntitiesService";
import {CatTablesService} from "./services/CatTablesService";
import {CatTableColumnsService} from "./services/CatTableColumnsService";
import {CatTableRowsService} from "./services/CatTableRowsService";
import {CatTableValuesService} from "./services/CatTableValuesService";
import {SearchService} from "./services/SearchService";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
})
export class DataServicesModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DataServicesModule,
            providers: [
                ApiClientService,
                CatColumnTypesService,
                CatEntitiesService,
                CatTablesService,
                CatTableColumnsService,
                CatTableRowsService,
                CatTableValuesService,
                SearchService
            ]
        };
    }
}

