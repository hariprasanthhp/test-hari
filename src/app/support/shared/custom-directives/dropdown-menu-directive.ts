import { Directive, HostBinding } from '@angular/core';
import { CustomDropdownDirective } from './custom-dropdown-directive';

@Directive({
  selector: '[dropdownMenu]',
  host: {
    '[class.dropdown-menu]': 'true',
    '[class.show]': 'dropdown.isOpen'
  }
})
export class DropdownMenuDirective {
  constructor(
    public dropdown: CustomDropdownDirective
  ) { }
}