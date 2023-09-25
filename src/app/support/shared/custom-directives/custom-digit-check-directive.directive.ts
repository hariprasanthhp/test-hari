import { Directive, Input } from "@angular/core";
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { validateDigitCheck } from "./validators.directive";

@Directive({
    selector: '[customDigitCheck]',
    providers: [{provide: NG_VALIDATORS, useExisting: CustomDigitCheckDirective, multi: true}]
  })
  export class CustomDigitCheckDirective implements Validator {
    @Input('customDigitCheck') customDigitCheck: string[] = [];
    
    validate(formGroup: FormGroup): ValidationErrors {
       return validateDigitCheck(this.customDigitCheck[0],this.customDigitCheck[1])(formGroup)
    }
}
  