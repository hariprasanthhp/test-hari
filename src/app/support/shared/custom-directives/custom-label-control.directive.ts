import { Directive, HostBinding, Optional, Input } from '@angular/core';
import { ControlContainer} from '@angular/forms';

@Directive({
  selector: 'h4[controlName]',
})
export class CustomLabelControl {
  @Input() controlName: string;

  constructor(@Optional() private parent: ControlContainer) {}

  @HostBinding('textContent')
  get controlValue() {
    return this.parent ? this.parent.control.get(this.controlName).value : '';
  }
}