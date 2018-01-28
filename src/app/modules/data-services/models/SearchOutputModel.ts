import {CatTableRow} from "./CatTableRow";

export class SearchOutputModel {
    constructor(public fullyAcceptedRows: CatTableRow[] = [],
                public partlyAcceptedRows: CatTableRow[] = []) {
    }

    public static FromJson(json: any): SearchOutputModel {
        return new SearchOutputModel(
            json['fully_accepted'] ? json['fully_accepted'].map(x => CatTableRow.FromJson(x)) : [],
            json['partly_accepted'] ? json['partly_accepted'].map(x => CatTableRow.FromJson(x)) : []
        );
    }
}