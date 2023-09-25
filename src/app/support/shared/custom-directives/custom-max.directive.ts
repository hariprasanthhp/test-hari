import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, Validators } from '@angular/forms';

@Directive({
  selector: '[customMax][formControlName],[customMax][formControl],[customMax][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomMaxDirective, multi: true}]
})
export class CustomMaxDirective implements Validator {
  @Input()
  customMax: number;
  
  validate(c: FormControl): {[key: string]: any} {
    if(Validators.required(c)) {
      return null;
    }

    let val: string = c.value;
    if(!isNaN(this.customMax)) {
      return val.length > this.customMax ? {"customMax": true} : null;
    } else {
      return null;
    }
  }
} 