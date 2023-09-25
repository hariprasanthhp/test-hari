import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appFieldError]'
})
export class FieldErrorDirective {

  @Input() appFieldError = '';
  constructor(
    private el: ElementRef
  ) {
    this.setTextColor();
  }

  setTextColor() {
    this.el.nativeElement.style.color = this.appFieldError || 'red';
  }



}
