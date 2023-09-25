import { Directive, ElementRef } from '@angular/core';
import { CustomDropdownDirective } from './custom-dropdown-directive';

@Directive({
  selector: '[dropdownToggle]',
  host: {
    class: 'search-dropdown-toggle',
    'aria-haspopup': 'true',
    '[attr.aria-expanded]': 'dropdown.isOpen',
    '(click)': 'dropdown.toggle()'
  }
})
export class DropdownToggleDirective {
  constructor(
    public dropdown: CustomDropdownDirective,
    elementRef: ElementRef
  ) {
    dropdown.toggleElement = elementRef.nativeElement;
  }
}