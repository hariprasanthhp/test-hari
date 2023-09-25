import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, Validators } from '@angular/forms';

@Directive({
  selector: '[customWhiteSpace][formControlName],[customWhiteSpace][formControl],[customWhiteSpace][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomWhiteSpaceDirective, multi: true}]
})
export class CustomWhiteSpaceDirective implements Validator {
  
  validate(c: FormControl): {[key: string]: any} {
  
      if(Validators.required(c)) {
        return null;
      }

      let value: string = c.value;

        if ((value === '') || (/^\s+|\s+$/g.test(value))) {
                return {"customWhiteSpace": true};
        }else{
            return null;
        }
    }
}