//for DHCP IP ADDRESS

import { Directive, Input } from "@angular/core";
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { convertIpAddressToNumber } from "../service/utility.class";
import { validateIpIsMinNetwork } from "./validators.directive";

@Directive({
    selector: '[minNetworkBroadcast]',
    providers: [{provide: NG_VALIDATORS, useExisting: CustomMinNetworkBroadcastDirective, multi: true}]
  })
  export class CustomMinNetworkBroadcastDirective implements Validator {
    @Input('minNetworkBroadcast') minNetworkBroadcastValidate: string[] = [];
    
    validate(formGroup: FormGroup): ValidationErrors {
       return validateIpIsMinNetwork(this.minNetworkBroadcastValidate[0],this.minNetworkBroadcastValidate[1],this.minNetworkBroadcastValidate[2])(formGroup);
    }
}
  