import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, Validators } from '@angular/forms';

@Directive({
  selector: '[customNumMin][formControlName],[customNumMin][formControl],[customNumMin][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomNumMinDirective, multi: true}]
})
export class CustomNumMinDirective implements Validator {
  @Input()
  customNumMin: number;
  
  validate(c: FormControl): {[key: string]: any} {
  
      if(Validators.required(c)) {
        return null;
      }

      let val: number = c.value;
      if(!isNaN(this.customNumMin) && !isNaN(+val) && +val >= 0 ) {
         return +val < +this.customNumMin ? {"customNumMin": true} : null;
      } else {
        return null;
      }
    } 
}