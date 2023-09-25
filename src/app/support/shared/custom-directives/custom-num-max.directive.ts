import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, Validators } from '@angular/forms';

@Directive({
  selector: '[customNumMax][formControlName],[customNumMax][formControl],[customNumMax][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomNumMaxDirective, multi: true}]
})
export class CustomNumMaxDirective implements Validator {
  @Input()
  customNumMax: number;
  
  validate(c: FormControl): {[key: string]: any} {
    if(Validators.required(c)) {
      return null;
    }

    let val: number = c.value;

    if(!isNaN(this.customNumMax) && !isNaN(val) && val > 0) {
      return +val > this.customNumMax ? {"customNumMax": true} : null;
    } else {
      return null;
    }
  }
} 