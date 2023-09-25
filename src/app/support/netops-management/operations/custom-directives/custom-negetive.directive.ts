import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, Validators } from '@angular/forms';

@Directive({
  selector: '[customNeg][formControlName],[customNeg][formControl],[customNeg][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomNegDirective, multi: true}]
})
export class CustomNegDirective implements Validator {
  
  validate(c: FormControl): {[key: string]: any} {
  
      if(Validators.required(c)) {
        return null;
      }

      let val: number = c.value;
     if(!isNaN(val)) {

        return val < 0 ? {"customNeg": true} : null;
      } else {
        return null;
      }
    } 
}