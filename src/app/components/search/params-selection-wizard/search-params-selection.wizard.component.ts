import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ClrWizard} from "@clr/angular";
import {SearchInputModel} from "../../../modules/data-services/models/SearchInputModel";
import {CatTable} from "../../../modules/data-services/models/CatTable";
import {CatTablesService} from "../../../modules/data-services/services/CatTablesService";
import {SearchService} from "../../../modules/data-services/services/SearchService";
import {ColumnValuePair} from "../../../shared/classes/columnValuePair";
import {CatTableValuesService} from "../../../modules/data-services/services/CatTableValuesService";
import {CatTableColumn} from "../../../modules/data-services/models/CatTableColumn";

@Component({
    selector: 'app-search-params-selection-wizard',
    templateUrl: './search-params-selection.wizard.component.html'
})
export class SearchParamsSelectionWizardComponent implements OnInit, AfterViewInit {
    @ViewChild("wizard") wizard: ClrWizard;
    @Output() searchParamsSelectionCompleted: EventEmitter<SearchInputModel> = new EventEmitter<SearchInputModel>();
    searchModel: SearchInputModel;
    wizardShown = false;
    tablesLoading = false;
    columnsLoading = false;

    tablesList: string[] = [];
    availableColumns: CatTableColumn[] = [];

    tablesLoadNeeded = true;
    columnsLoadNeeded = true;

    constructor(private tablesService: CatTablesService,
                private searchService: SearchService,
                private catTableValuesService: CatTableValuesService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.wizard.wizardFinished.subscribe(event => {
            this.searchParamsSelectionCompleted.emit(this.searchModel);
        });
    }

    showWizard(lastSearchInputModel: SearchInputModel = null) {
        if (!!lastSearchInputModel)
            this.searchModel = lastSearchInputModel;
        else
            this.searchModel = new SearchInputModel();

        this.wizard.reset();
        this.wizardShown = true;
    }

    catalogIdChanged() {
        this.tablesLoadNeeded = true;
        this.columnsLoadNeeded = true;
    }

    categoryIdChanged() {
        this.tablesLoadNeeded = true;
        this.columnsLoadNeeded = true;
    }

    tablePageLoaded() {
        this.initTablesList();
    }

    paramsPageLoaded() {
        this.initColumnsList();
    }

    private initTablesList() {
        this.tablesLoading = true;
        this.searchService.getTableNames(this.searchModel.catalogId, this.searchModel.categoryId).subscribe(tables => {
            this.tablesList = tables;
            this.tablesLoading = false;
            this.tablesLoadNeeded = false;
        });
    }

    private initColumnsList() {
        this.columnsLoading = true;
        this.searchService.getColumns(this.searchModel.catalogId, this.searchModel.categoryId, this.searchModel.tableName)
            .subscribe(columns => {
                this.availableColumns = columns;
                this.columnsLoading = false;
                this.columnsLoadNeeded = false;
            });
    }

    addParameter() {
        let newColumnValuePair = new ColumnValuePair();
        let alreadyUsedNames = this.searchModel.columnValuePairs.map(x => x.columnName);

        newColumnValuePair.availableColumns = this.availableColumns.filter(n => alreadyUsedNames.indexOf(n.name) < 0);

        this.searchModel.columnValuePairs.push(newColumnValuePair);
    }

    columnValuePairColumnChanges(columnValuePair: ColumnValuePair) {
        columnValuePair.value = null;
        if (!columnValuePair.columnName) return;

        this.searchService.getColumnValues(this.searchModel.catalogId,
            this.searchModel.categoryId,
            this.searchModel.tableName,
            columnValuePair.columnName).subscribe(values => {
            columnValuePair.availableValues = values;
        });
    }

    removeParamsPair(columnValuePair: ColumnValuePair) {
        this.searchModel.columnValuePairs = this.searchModel.columnValuePairs.filter(x => x !== columnValuePair);
    }
}
