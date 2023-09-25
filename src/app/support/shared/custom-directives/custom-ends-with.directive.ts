import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, Validators } from '@angular/forms';

@Directive({
  selector: '[customEndsWith][formControlName],[customEndsWith][formControl],[customEndsWith][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomEndsWithDirective, multi: true}]
})
export class CustomEndsWithDirective implements Validator {
    @Input()
    customEndsWith: any;

  validate(c: FormControl): {[key: string]: any} {
  
      if(Validators.required(c)) {
        return null;
      }
      let val: string = c.value;
      if(val) {
        return val.endsWith(this.customEndsWith)? {"customEndsWith": true} : null;
    }
  } 
}