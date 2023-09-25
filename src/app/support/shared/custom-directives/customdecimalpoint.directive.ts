import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustomdecimalpoint]'
})
export class CustomdecimalpointDirective {

  // Allow decimal numbers and negative values [+-]?
  private regex: RegExp = new RegExp(/^[+-]?\d{1,2}\.?\d{0,2}$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Ctrl, Backspace, tab, end, and home keys
    if (event.ctrlKey || this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;

    if (event.key == '-' && current.indexOf(event.key) == -1) return;
    if (!current) return;
    if ((this.el.nativeElement.selectionEnd - this.el.nativeElement.selectionStart) > 0) return;
    this.el.nativeElement.setAttribute("type", "text");
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    let pasted = event.clipboardData.getData('text/plain');

    if (String(pasted).match(this.regex)) {
      const current: string = this.el.nativeElement.value;
      const start = this.el.nativeElement.selectionStart;
      const end = this.el.nativeElement.selectionEnd;
      const next = end - start > 0
        ? [current.slice(0, start), pasted, current.slice(end)].join('')
        : [current.slice(0, start), pasted, current.slice(start)].join('');

      if (String(next).match(this.regex)) {
        return;
      } else {
        event.preventDefault();
      }
    } else {
      event.preventDefault();
    }
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent) {
    event.preventDefault();
  }
}
