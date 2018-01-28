import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CatTable} from "../../modules/data-services/models/CatTable";
import {TableDataViewModel} from "../../shared/viewModels/TableDataViewModel";
import {CatTableRow} from "../../modules/data-services/models/CatTableRow";
import {CatTableRowsService} from "../../modules/data-services/services/CatTableRowsService";
import * as _ from "lodash";
import {CatTableColumnsService} from "../../modules/data-services/services/CatTableColumnsService";
import {CatTableColumn} from "../../modules/data-services/models/CatTableColumn";
import {CatTableValue} from "../../modules/data-services/models/CatTableValue";
import {CatTableValuesService} from "../../modules/data-services/services/CatTableValuesService";
import {CatColumnType} from "../../modules/data-services/models/CatColumnType";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
    isEditingMode = false;
    tableModel: CatTable = null;
    tableViewModel: TableDataViewModel = new TableDataViewModel();
    newColumnName = "";

    constructor(private changeDetector: ChangeDetectorRef,
                private catTableRowsService: CatTableRowsService,
                private catTableColumnsService: CatTableColumnsService,
                private catTableValuesService: CatTableValuesService) {
    }

    ngOnInit() {
    }

    initialize(tableData: CatTable) {
        this.tableModel = tableData;
        this.initTableViewModel();
    }

    private initTableViewModel() {
        if (!this.tableModel) return;
        this.tableViewModel.initFromCatTableModel(this.tableModel);
        this.detectChanges();
    }

    detectChanges() {
        this.changeDetector.markForCheck();
    }

    createEmptyRow() {
        let newRow = new CatTableRow();
        newRow.tableId = this.tableModel.id;
        this.catTableRowsService.create(newRow).subscribe(row => {
            this.tableModel.rows.push(row);
            this.initTableViewModel();
        });
    }

    removeRow(id: string) {
        this.catTableRowsService.deleteById(id).subscribe(() => {
            this.tableModel.rows = this.tableModel.rows.filter(r => r.id !== id);
            this.initTableViewModel();
        });
    }

    createColumn(name: string) {
        let newColumn = new CatTableColumn();
        newColumn.tableId = this.tableModel.id;
        newColumn.name = name;
        newColumn.typeId = CatColumnType.COLUMN_TYPE_ID_STRING;
        this.catTableColumnsService.createAndReturnTable(newColumn).subscribe(table => {
            _.merge(this.tableModel, table);
            this.initTableViewModel();
        });
    }

    saveValueAfterDebounce(value: CatTableValue) {
        this.catTableValuesService.update(value).subscribe(savedValue => {
            _.merge(value, savedValue);
        });
    }

    removeColumn(id: string) {
        this.catTableColumnsService.deleteById(id).subscribe(() => {
            this.tableModel.columns = this.tableModel.columns.filter(c => c.id !== id);
            this.initTableViewModel();
        });
    }
}
