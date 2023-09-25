//for DHCP IP ADDRESS

import { Directive, Input } from "@angular/core";
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { convertIpAddressToNumber } from "../service/utility.class";
import { validateIpIsMaxNetwork } from "./validators.directive";

@Directive({
    selector: '[maxNetworkBroadcast]',
    providers: [{provide: NG_VALIDATORS, useExisting: CustomMaxNetworkBroadcastDirective, multi: true}]
  })
  export class CustomMaxNetworkBroadcastDirective implements Validator {
    @Input('maxNetworkBroadcast') maxNetworkBroadcastValidate: string[] = [];
    
    validate(formGroup: FormGroup): ValidationErrors {
       return validateIpIsMaxNetwork(this.maxNetworkBroadcastValidate[0],this.maxNetworkBroadcastValidate[1],this.maxNetworkBroadcastValidate[2])(formGroup);
    }
}
  