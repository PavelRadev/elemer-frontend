import {Component, OnInit} from '@angular/core';
import {CatEntitiesService} from "../../modules/data-services/services/CatEntitiesService";
import {ActivatedRoute} from "@angular/router";
import {CatEntity} from "../../modules/data-services/models/CatEntity";
import * as _ from "lodash";
import {ToastrService} from "ngx-toastr";
import {UtilsError} from "../../modules/utils/utilsError";

@Component({
    selector: 'app-cat-entity-edit',
    templateUrl: './cat-entity-edit.component.html'
})
export class CatEntityEditComponent implements OnInit {
    model: CatEntity = null;
    isQueryProcessing = false;

    constructor(private catEntitiesService: CatEntitiesService,
                private toastr: ToastrService,
                private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            if (!!params['id']) {
                if (params['id'] === 'new')
                    this.model = new CatEntity();
                else
                    this.catEntitiesService.getById(params['id']).subscribe(entity => {
                        this.model = entity;
                    });
            }
        });
    }

    ngOnInit() {
    }

    saveEntity() {
        if (!!this.model && !!this.model.id) {
            this.isQueryProcessing = true;
            this.catEntitiesService.update(this.model).subscribe(model => {
                _.merge(this.model, model);
                this.isQueryProcessing = false;
            }, err => {
                UtilsError.HandleError(err, this.toastr);
                this.isQueryProcessing = false;
            });
        } else if (!!this.model && !this.model.id) {
            this.catEntitiesService.create(this.model).subscribe(model => {
                _.merge(this.model, model);
                this.isQueryProcessing = false;
            }, err => {
                UtilsError.HandleError(err, this.toastr);
                this.isQueryProcessing = false;
            });
        }
    }
}
