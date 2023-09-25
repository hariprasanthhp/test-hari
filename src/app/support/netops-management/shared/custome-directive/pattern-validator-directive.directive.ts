import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appPattern]',
  providers: [{provide: NG_VALIDATORS, useExisting: PatternValidatorDirectiveDirective, multi: true}]
})
export class PatternValidatorDirectiveDirective {

  @Input('appPattern') pattern: string;

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.pattern ? this.patternValidator(new RegExp(this.pattern, 'i'))(control)
                              : null;
  }

 patternValidator(nameRe: RegExp): ValidatorFn {
   return (control: AbstractControl): {[key: string]: any} | null => {
           const regextest = nameRe.test(control.value);
           return (!regextest) ? {'apppattern': {value: control.value}} : null;
   };
  }

  constructor() { }

}
