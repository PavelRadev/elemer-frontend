import {AppSettings} from '../../appSettings';
import {UtilsString} from './utilsStrings';
import {ToastrService} from "ngx-toastr";

export class UtilsError {
    public static HandleError(error: any,
                              toastr: ToastrService,
                              errorTitle = "Ошибка!") {
        if (!error || !toastr) return;
        console.error(error);
        toastr.error(UtilsString.ParseResponseErrorMessage(error), errorTitle);
    }
}