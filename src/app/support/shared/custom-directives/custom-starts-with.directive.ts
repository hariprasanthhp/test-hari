import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, Validators } from '@angular/forms';

@Directive({
  selector: '[customStartsWith][formControlName],[customStartsWith][formControl],[customStartsWith][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomStartsWithDirective, multi: true}]
})
export class CustomStartsWithDirective implements Validator {
    @Input()
    customStartsWith: any;

  validate(c: FormControl): {[key: string]: any} {
  
      if(Validators.required(c)) {
        return null;
      }
      let val: string = c.value;
      if(val) {
        return val.startsWith(this.customStartsWith)? null : {"customStartsWith": true};
    }
  } 
}