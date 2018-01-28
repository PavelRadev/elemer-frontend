import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchParamsSelectionWizardComponent} from "./params-selection-wizard/search-params-selection.wizard.component";
import {SearchInputModel} from "../../modules/data-services/models/SearchInputModel";
import {SearchOutputModel} from "../../modules/data-services/models/SearchOutputModel";
import {SearchService} from "../../modules/data-services/services/SearchService";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    searchInteractiveText = "Параметры поиска выбраны";
    lastSearchInputModel: SearchInputModel;
    searchResults: SearchOutputModel;
    searchResultsLoading = false;

    @ViewChild(SearchParamsSelectionWizardComponent) paramsSelectionWizard: SearchParamsSelectionWizardComponent;

    constructor(private searchService:SearchService) {
    }

    ngOnInit() {
    }

    openWizard(lastSearchInputModel: SearchInputModel = null) {
        this.paramsSelectionWizard.showWizard(lastSearchInputModel);
    }

    private makeInteractiveText(){
        if(!this.lastSearchInputModel) return;

    }

    searchParamsSelectionCompleted(newSearchInputModel: SearchInputModel) {
        this.lastSearchInputModel = newSearchInputModel;
        this.searchResultsLoading = true;

        this.searchService.getSearchResult(this.lastSearchInputModel).subscribe(result => {
            this.searchResults = result;
            console.log(this.searchResults);
            this.searchResultsLoading = false;
        });
    }
}
