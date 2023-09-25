import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, Validators } from '@angular/forms';

@Directive({
  selector: '[customMin][formControlName],[customMin][formControl],[customMin][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomMinDirective, multi: true}]
})
export class CustomMinDirective implements Validator {
  @Input()
  customMin: number;
  
  validate(c: FormControl): {[key: string]: any} {
  
      if(Validators.required(c)) {
        return null;
      }

      let val: number = c.value;
      if(!isNaN(this.customMin)) {

        return val < this.customMin ? {"customMin": true} : null;
      } else {
        return null;
      }
    } 
}