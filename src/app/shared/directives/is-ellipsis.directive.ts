import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appIsEllipsis]'
})

export class IsEllipsisDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    const element = this.elementRef.nativeElement;
    if (element.offsetWidth < element.scrollWidth) {
      element.title = element.innerHTML;
    }
  }

  @HostListener('mouseleave')
  public onMouseLeave() {
    const element = this.elementRef.nativeElement;
    if (element.offsetWidth < element.scrollWidth) {
      element.title = null;
    }
  }

}
