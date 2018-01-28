export class TableColumnViewModel {
    constructor(public id: string = null,
                public name: string = null,
                public colspan: number = 1,
                public rowspan: number = 1,
                public isShown: boolean = true,
                public parent: TableColumnViewModel = null,
                public childs: TableColumnViewModel[] = []) {
    }
}