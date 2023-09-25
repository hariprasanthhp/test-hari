import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[trimSpace]'
})
export class TrimSpaceDirective {
  @Input() formValue:any;
  constructor(private elementRef: ElementRef) { }


  // @HostListener('window:keyup')
  // @HostListener('window:keydown')
  // @HostListener('document:keypress')

  // removeSpaces() {
  //   setTimeout(() => {
  //     if (!(/^[\s]+/.test(this.elementRef.nativeElement.value))) return;
  //     let cursorPosition = this.elementRef.nativeElement.selectionStart, total = this.elementRef.nativeElement.value.length;
  //     this.elementRef.nativeElement.value = this.elementRef.nativeElement.value.replace(/^\s+/, '');
  //     this.elementRef.nativeElement.setSelectionRange(cursorPosition - (total - this.elementRef.nativeElement.value.length), cursorPosition - (total - this.elementRef.nativeElement.value.length));
  //   }, 0);
  // }

  // @HostListener('ngModelChange')
  // removeUnwantedSpaces() {
  //   if (!(/^[\s]+/.test(this.elementRef.nativeElement.value))) return;
  //   let cursorPosition = this.elementRef.nativeElement.selectionStart, total = this.elementRef.nativeElement.value.length;
  //   this.elementRef.nativeElement.value = this.elementRef.nativeElement.value.replace(/^\s+/, '');
  //   this.elementRef.nativeElement.setSelectionRange(cursorPosition - (total - this.elementRef.nativeElement.value.length), cursorPosition - (total - this.elementRef.nativeElement.value.length));
  // }

  @HostListener('blur')
  removeEndSpace() {
    if(!/^[\s]+|[\s]+$/.test(this.elementRef.nativeElement.value))return;
        // this.elementRef.nativeElement.value = this.elementRef.nativeElement.value.trim();
    if (this.formValue?.value ) {
      if (typeof this.formValue.value == 'object' && this.formValue.value !== null && !Array.isArray(this.formValue.value)) {
        this.formValue.patchValue(this.removeSpaceFromObjects(this.formValue.value));
      } else if (typeof this.formValue.value == 'object' && Array.isArray(this.formValue.value)) {
        this.formValue.patchValue(this.removeSpaceFromArrayElements(this.formValue.value));
      }else if( typeof this.formValue.value == 'string') {
        this.formValue.patchValue(this.formValue.value.trim());  
      }
    }else if (typeof this.formValue == 'object') {
      // this.elementRef.nativeElement.value =
      //   this.elementRef.nativeElement.value.trim();
      if (typeof this.formValue == 'object' && this.formValue !== null && !Array.isArray(this.formValue)) {
        this.formValue = this.removeSpaceFromObjects(this.formValue);
      } else if (typeof this.formValue == 'object' && Array.isArray(this.formValue)) {
        this.formValue = this.removeSpaceFromArrayElements(this.formValue);
      }
    }

  }
    removeSpaceFromObjects(obj) {
    for (let key in obj) {
      if (typeof obj[key] == 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        obj[key] = this.removeSpaceFromObjects(obj[key]);
      } else if (typeof obj[key] == 'object' && Array.isArray(obj[key])) {
        obj[key] = this.removeSpaceFromArrayElements(obj[key]);
      } else if (typeof obj[key] == 'string') {
          obj[key] = obj[key].trim();
      }
    }
    return obj;
  }
  removeSpaceFromArrayElements(arr) {
    return arr.map((element) => {
      if (typeof element == 'object' && typeof element !== null && !Array.isArray(element)) {
        return this.removeSpaceFromObjects(element);
      } else if (typeof element == 'object' && Array.isArray(element)) {
        return this.removeSpaceFromArrayElements(element);
      } else if (typeof element == 'string') {
       return element = element.trim();
      }
    });
  }

}
