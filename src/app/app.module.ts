import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ClarityModule} from "@clr/angular";
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app.routing";
import {CatEntitiesComponent} from './components/cat-entities/cat-entities.component';
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {DataServicesModule} from "./modules/data-services/data-services.module";
import {NgProgressModule} from "ng2-progressbar";
import {HttpModule} from "@angular/http";
import {LocalStorageModule} from "angular-2-local-storage";
import {CatEntityEditComponent} from './components/cat-entity-edit/cat-entity-edit.component';
import {FormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CatTablesComponent} from './components/cat-tables/cat-tables.component';
import {CatTableEditComponent} from './components/cat-table-edit/cat-table-edit.component';
import {SearchComponent} from "./components/search/search.component";
import {SearchParamsSelectionWizardComponent} from "./components/search/params-selection-wizard/search-params-selection.wizard.component";
import { TableComponent } from './components/table/table.component';
import {TypedInputComponent} from "./components/typed-input/typed-input.component";


@NgModule({
    declarations: [
        AppComponent,
        MainLayoutComponent,
        CatEntitiesComponent,
        PageNotFoundComponent,
        CatEntityEditComponent,
        CatTablesComponent,
        CatTableEditComponent,
        SearchComponent,
        SearchParamsSelectionWizardComponent,
        TableComponent,

        TypedInputComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ToastrModule.forRoot(),
        HttpModule,
        LocalStorageModule.withConfig({
            prefix: 'en',
            storageType: 'localStorage'
        }),
        DataServicesModule.forRoot(),
        ClarityModule.forRoot(),
        NgProgressModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
