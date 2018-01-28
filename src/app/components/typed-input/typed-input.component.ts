import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {UtilsString} from "../../modules/utils/utilsStrings";

@Component({
    selector: 'app-typed-input',
    templateUrl: './typed-input.component.html'
})
export class TypedInputComponent implements OnInit {
    public componentValue: any;
    public availableTypes: any = {
        number: "number",
        boolean: "boolean",
        string: "string"
    };

    @Input() editingEnabled = false;
    @Input() debounceTime = 500;
    @Input() name = 'value';
    @Input() id = 'value';

    @Input()
    get value() {
        return this.componentValue;
    }

    @Output() valueChange = new EventEmitter();

    @Output() valueChangedAfterDebounce = new EventEmitter<any>();

    private saveCall$ = new Subject<any>();

    set value(val) {
        this.componentValue = UtilsString.GetCorrectVariable(String(val));
        this.valueChange.emit(String(this.componentValue));
    }

    typeOfValue() {
        return typeof this.componentValue;
    }

    constructor() {
        this.saveCall$.debounceTime(this.debounceTime).subscribe(() => {
            this.valueChangedAfterDebounce.emit(this.value);
        });
    }

    ngOnInit() {
    }

    callSave() {
        this.saveCall$.next();
    }
}