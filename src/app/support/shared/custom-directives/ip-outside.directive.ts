//for DHCP IP ADDRESS

import { Directive, Input } from "@angular/core";
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { validateIpIsOutside } from "./validators.directive";

@Directive({
    selector: '[ipOutside]',
    providers: [{provide: NG_VALIDATORS, useExisting: CustomIpOutsideDirective, multi: true}]
  })
  export class CustomIpOutsideDirective implements Validator {
    @Input('ipOutside') ipOutside: string[] = [];
    
    validate(formGroup: FormGroup): ValidationErrors {
       return validateIpIsOutside(this.ipOutside[0],this.ipOutside[1],this.ipOutside[2])(formGroup)
    }
}
  