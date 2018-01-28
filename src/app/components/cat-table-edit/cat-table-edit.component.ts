import {Component, OnInit, ViewChild} from '@angular/core';
import {CatTable} from "../../modules/data-services/models/CatTable";
import {CatTablesService} from "../../modules/data-services/services/CatTablesService";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {UtilsError} from "../../modules/utils/utilsError";
import {CatEntity} from "../../modules/data-services/models/CatEntity";
import {CatEntitiesService} from "../../modules/data-services/services/CatEntitiesService";
import * as _ from "lodash";
import {TableDataViewModel} from "../../shared/viewModels/TableDataViewModel";
import {TableComponent} from "../table/table.component";

@Component({
    selector: 'app-cat-table-edit',
    templateUrl: './cat-table-edit.component.html'
})
export class CatTableEditComponent implements OnInit {
    model: CatTable = null;
    entities: CatEntity[] = [];
    isQueryProcessing = false;

    @ViewChild(TableComponent) tableComponent: TableComponent;

    tableData: TableDataViewModel = new TableDataViewModel();

    constructor(private catTablesService: CatTablesService,
                private toastr: ToastrService,
                private catEntitiesService: CatEntitiesService,
                private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            if (!!params['id']) {
                if (params['id'] === 'new')
                    this.model = new CatTable();
                else
                    this.catTablesService.getById(params['id']).subscribe(entity => {
                        this.model = entity;
                        this.tableComponent.initialize(this.model);
                        this.tableData.initFromCatTableModel(this.model);
                    });
            }
        });
    }

    ngOnInit() {
        this.catEntitiesService.getAll().subscribe(entities => {
            this.entities = _.orderBy(entities, [e => e.name]);
        });
    }

    saveEntity() {
        if (!!this.model && !!this.model.id) {
            this.isQueryProcessing = true;
            this.catTablesService.update(this.model).subscribe(model => {
                _.merge(this.model, model);
                this.isQueryProcessing = false;
            }, err => {
                UtilsError.HandleError(err, this.toastr);
                this.isQueryProcessing = false;
            });
        } else if (!!this.model && !this.model.id) {
            this.catTablesService.create(this.model).subscribe(model => {
                _.merge(this.model, model);
                this.tableComponent.initialize(this.model);
                this.isQueryProcessing = false;
            }, err => {
                UtilsError.HandleError(err, this.toastr);
                this.isQueryProcessing = false;
            });
        }
    }
}
