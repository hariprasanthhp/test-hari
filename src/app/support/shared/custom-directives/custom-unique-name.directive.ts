import { Directive, Input } from '@angular/core';
  import { NG_VALIDATORS, Validator, FormControl, Validators } from '@angular/forms';

  @Directive({
  selector: '[customUniqueName][formControlName],[customUniqueName][formControl],[customUniqueName][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomUniqueNameDirective, multi: true}]
  })
  export class CustomUniqueNameDirective implements Validator {
   @Input()
   customUniqueName:string[] = [];
  
		validate(c: FormControl): {[key: string]: any} {
  
		if(Validators.required(c)) {
			return null;
		}

        let value: string = c.value;
		for (var i = 0; i < this.customUniqueName.length; i++) {
            if (this.customUniqueName[i] === value && !c.pristine) {
                return {"customUniqueName": true};
            }
        }
        return null;
		}
	}