import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, Validators } from '@angular/forms';

@Directive({
  selector: '[isASCII][formControlName],[isASCII][formControl],[isASCII][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: IsASCIIDirective, multi: true}]
})
export class IsASCIIDirective implements Validator {
  
  validate(c: FormControl): {[key: string]: any} {
  
      if(Validators.required(c)) {
        return null;
      }

      let value: string = c.value;
      if((!value) || /^[\x00-\x7F]*$/.test(value)){
        return {"isASCII": true};
      }else{
        return null;
      }
    }
}