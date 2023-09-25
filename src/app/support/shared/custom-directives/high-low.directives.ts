import { Directive, Input } from "@angular/core";
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { ValidatorsDirective } from "./validators.directive";

@Directive({
    selector: '[highLowValidate]',
    providers: [{ provide: NG_VALIDATORS, useExisting: HighLowDirective, multi: true }]
})
export class HighLowDirective implements Validator {
    @Input('highLowValidate') highLowValidate: string[] = [];

    validate(formGroup: FormGroup): ValidationErrors {
        if(this.highLowValidate.length > 2 ){
            return ValidatorsDirective(this.highLowValidate[0], this.highLowValidate[1],this.highLowValidate[2])(formGroup);
        }else{
            return ValidatorsDirective(this.highLowValidate[0], this.highLowValidate[1])(formGroup);
        }
        
    }
}