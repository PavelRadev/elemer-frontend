import {Component, OnInit} from '@angular/core';
import {CatColumnTypesService} from "../../modules/data-services/services/CatColumnTypesService";
import {CatEntitiesService} from "../../modules/data-services/services/CatEntitiesService";
import {CatEntity} from "../../modules/data-services/models/CatEntity";

@Component({
    selector: 'app-cat-entities',
    templateUrl: './cat-entities.component.html'
})
export class CatEntitiesComponent implements OnInit {
    entities: CatEntity[] = [];

    constructor(private catEntitiesService: CatEntitiesService) {
    }

    ngOnInit() {
        this.catEntitiesService.getAll().subscribe(entities => {
            this.entities = entities;
        });
    }

    removeEntity(id: string) {
        this.catEntitiesService.deleteById(id).subscribe(() => {
            this.entities = this.entities.filter(x => x.id !== id);
        });
    }
}
