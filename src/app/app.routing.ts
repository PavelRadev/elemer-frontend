import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {MainLayoutComponent} from "./components/main-layout/main-layout.component";
import {CatEntitiesComponent} from "./components/cat-entities/cat-entities.component";
import {CatEntityEditComponent} from "./components/cat-entity-edit/cat-entity-edit.component";
import {CatTablesComponent} from "./components/cat-tables/cat-tables.component";
import {CatTableEditComponent} from "./components/cat-table-edit/cat-table-edit.component";
import {SearchComponent} from "./components/search/search.component";

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/search',
        data: { title: 'Главная' }
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'search',
                component: SearchComponent
            },
            {
                path: 'cat-entities',
                children: [
                    {
                        path: '',
                        component: CatEntitiesComponent
                    },
                    {
                        path: ':id',
                        component: CatEntityEditComponent
                    }
                ]

            },
            {
                path: 'cat-tables',
                children: [
                    {
                        path: '',
                        component: CatTablesComponent
                    },
                    {
                        path: ':id',
                        component: CatTableEditComponent
                    }
                ]

            }
        ]
    },
    {
        path: 'page_not_found',
        component: PageNotFoundComponent,
        data: { title: 'Страница не найдена' }
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        data: { title: 'Страница не найдена' }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
