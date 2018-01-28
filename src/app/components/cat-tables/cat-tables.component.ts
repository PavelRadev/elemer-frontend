import {Component, OnInit} from '@angular/core';
import {CatTablesService} from "../../modules/data-services/services/CatTablesService";
import {CatTable} from "../../modules/data-services/models/CatTable";

@Component({
  selector: 'app-cat-tables',
  templateUrl: './cat-tables.component.html'
})
export class CatTablesComponent implements OnInit {
  tables: CatTable[] = [];

  constructor(private catTablesService: CatTablesService) {
  }

  ngOnInit() {
    this.catTablesService.getAll().subscribe(entities => {
      this.tables = entities;
    });
  }

  removeEntity(id: string) {
    this.catTablesService.deleteById(id).subscribe(() => {
      this.tables = this.tables.filter(x => x.id !== id);
    });
  }
}
