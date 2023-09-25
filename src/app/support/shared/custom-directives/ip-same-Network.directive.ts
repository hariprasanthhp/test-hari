//for DHCP IP ADDRESS

import { Directive, Input } from "@angular/core";
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { convertIpAddressToNumber } from "../service/utility.class";
import { validateIpIsSameNetwork } from "./validators.directive";

@Directive({
    selector: '[ipSameNetwork]',
    providers: [{provide: NG_VALIDATORS, useExisting: CustomIpsameNetworkDirective, multi: true}]
  })
  export class CustomIpsameNetworkDirective implements Validator {
    @Input('ipSameNetwork') ipSameNetwork: string[] = [];
    
    validate(formGroup: FormGroup): ValidationErrors {
       return validateIpIsSameNetwork
       (this.ipSameNetwork[0],this.ipSameNetwork[1],this.ipSameNetwork[2],this.ipSameNetwork[3])(formGroup);
    }
 }
  