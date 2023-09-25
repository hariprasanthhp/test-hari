import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, Validators } from '@angular/forms';
import { IpPattern } from '../service/utility.class';

@Directive({
  selector: '[customDnsVal][formControlName],[customDnsVal][formControl],[customDnsVal][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomDnsValidationDirective, multi: true}]
})
export class CustomDnsValidationDirective implements Validator {
 
   validate(c: FormControl): {[key: string]: any} {

      if(Validators.required(c)) {
        return null;
      }

    let val:string = c.value;
      if(!val || val == 'N/A'){
        return null;
      }
      let DnsPattern = IpPattern;
    
      if(!DnsPattern.test(val) ) {
         return {"custonDnsPattern": true};
      } else {
        return null;
      }
    } 
}