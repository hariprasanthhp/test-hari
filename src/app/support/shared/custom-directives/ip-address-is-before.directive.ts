//for DHCP IP ADDRESS

import { Directive, Input } from "@angular/core";
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { validateIpIsBefore } from "./validators.directive";

@Directive({
    selector: '[ipAddressBefore]',
    providers: [{provide: NG_VALIDATORS, useExisting: CustomIpIsBeforeDirective, multi: true}]
  })
  export class CustomIpIsBeforeDirective implements Validator {
    @Input('ipAddressBefore') ipBeforeValidate: string[] = [];
    
    validate(formGroup: FormGroup): ValidationErrors {
       return validateIpIsBefore(this.ipBeforeValidate[0],this.ipBeforeValidate[1])(formGroup)
    }
}
  