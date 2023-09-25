import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, Validators } from '@angular/forms';

@Directive({
  selector: '[customPattern][formControlName],[customPattern][formControl],[customPattern][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CustomPatternDirective, multi: true }]
})
export class CustomPatternDirective implements Validator {
  @Input()
  customPattern: any;
  @Input('metaData')
  metaData: any;

  validate(c: FormControl): { [key: string]: any } {

    if (Validators.required(c)) {
      return null;
    }
    let val: string = c.value;
    if (val) {
      var trimedValue = val && val.trim();
      var SpecialCharacterPasswordDisabled = this.metaData?.properties?.filter(x => x.featureName == 'SpecialCharacterPasswordDisabled')[0]
      if (this.metaData && SpecialCharacterPasswordDisabled?.supported) {
        // var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        var format = /["$&"`;"]/;
        var isSpecialChar = format.test(trimedValue);
        if (isSpecialChar) {
          return isSpecialChar ? { "customPattern": true } : null;
        }

      }
      return trimedValue.length == val.length && this.customPattern.test(trimedValue) ? null : { "customPattern": true };
    }
  }
}