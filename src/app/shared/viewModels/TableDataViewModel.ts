import {TableHeaderRowViewModel} from "./TableHeaderRowViewModel";
import {CatTableRow} from "../../modules/data-services/models/CatTableRow";
import {CatTable} from "../../modules/data-services/models/CatTable";
import {TableColumnViewModel} from "./TableColumnViewModel";
import * as _ from "lodash";
import {forEach} from "@angular/router/src/utils/collection";

export class TableDataViewModel {
    constructor(public headerRows: TableHeaderRowViewModel[] = [],
                public rows: CatTableRow[] = [] ) {
    }

    private static IncrementFirstShownParentRowspan(column: TableColumnViewModel) {
        if (!column.parent) return;

        let currentCollumn: TableColumnViewModel = column;
        while (!!currentCollumn.parent) {
            if (currentCollumn.parent.isShown) {
                currentCollumn.parent.rowspan += 1;
                return;
            }
            currentCollumn = currentCollumn.parent;
        }
    }

    initFromCatTableModel(catTable: CatTable) {
        this.headerRows = [];
        this.rows = [];

        catTable.columns = _.orderBy(catTable.columns, [c => c.name]);

        // Первый ряд шапки формируют колонки, которые не имеют родительских
        let firstLineColumns = catTable.columns.filter(c => !c.parentColumnId);
        let headerFirstRow = new TableHeaderRowViewModel();
        headerFirstRow.number = 1;
        headerFirstRow.columns = firstLineColumns.map(c => new TableColumnViewModel(c.id, c.name, 1, 1));
        this.headerRows.push(headerFirstRow);

        let prevRow = headerFirstRow;
        let prevIds = headerFirstRow.columns.map(x => x.id);

        let currentLineNumber = headerFirstRow.number = 1;
        let hasMoreLines = catTable.columns.filter(c => prevIds.indexOf(c.parentColumnId) > -1).length > 0;
        while (hasMoreLines) {
            currentLineNumber += 1;
            let newHeaderLine = new TableHeaderRowViewModel();
            newHeaderLine.number = currentLineNumber;

            let currentLineColumns = catTable.columns.filter(c => prevIds.indexOf(c.parentColumnId) > -1);

            prevRow.columns.forEach(prevColItem => {
                let childs = currentLineColumns.filter(clc => clc.parentColumnId === prevColItem.id);
                if (childs.length === 0) {
                    // prevColItem.rowspan += 1;
                    let prevColumnClone = _.cloneDeep(prevColItem);
                    prevColumnClone.isShown = false;
                    prevColumnClone.parent = prevColItem;
                    TableDataViewModel.IncrementFirstShownParentRowspan(prevColumnClone);
                    prevColItem.childs.push(prevColumnClone);
                    newHeaderLine.columns.push(prevColumnClone);
                } else {
                    prevColItem.colspan = childs.length;
                    _.orderBy(childs, [c => c.name])
                        .forEach(ch => {
                            let newItem = new TableColumnViewModel(ch.id, ch.name, 1, 1, true, prevColItem);
                            prevColItem.childs.push(newItem);
                            newHeaderLine.columns.push(newItem);
                        });
                }
            });

            this.headerRows.push(newHeaderLine);

            prevIds = prevRow.columns.map(x => x.id);
            prevRow = newHeaderLine;
            hasMoreLines = catTable.columns.filter(c => prevIds.indexOf(c.parentColumnId) > -1).length > 0;
        }

        let lastRowsColumns = this.getLastLineColumns();

        catTable.rows.forEach(tr => {
            let newRowsLine = _.cloneDeep(tr);
            newRowsLine.values = [];

            lastRowsColumns.columns.forEach(lrc => {
                let valueOfColumn = _.find(tr.values, v => v.columnId === lrc.id);

                if (!!valueOfColumn) newRowsLine.values.push(valueOfColumn);
            });

            this.rows.push(newRowsLine);
        });
    }

    private getLastLineColumns(): TableHeaderRowViewModel {
        if (this.headerRows.length === 0) return null;

        return _.head(_.orderBy(this.headerRows, [hr => hr.number], ['desc']));
    }
}