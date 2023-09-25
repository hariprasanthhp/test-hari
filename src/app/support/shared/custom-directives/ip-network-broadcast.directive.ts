//for DHCP IP ADDRESS

import { Directive, Input } from "@angular/core";
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { validateIpNetwork } from "./validators.directive";

@Directive({
    selector: '[ipNetworkBroadcast]',
    providers: [{provide: NG_VALIDATORS, useExisting: CustomIpNetworkBroadcastDirective, multi: true}]
  })
  export class CustomIpNetworkBroadcastDirective implements Validator {
    @Input('ipNetworkBroadcast') ipNetworkBroadcastValidate: string[] = [];
    
    validate(formGroup: FormGroup): ValidationErrors {
       return validateIpNetwork(this.ipNetworkBroadcastValidate[0],this.ipNetworkBroadcastValidate[1])(formGroup);
    }
}
  