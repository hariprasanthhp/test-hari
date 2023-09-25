import { Component, NgModule, VERSION, Pipe, PipeTransform } from '@angular/core'
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'

@Pipe({
  name: 'highlight'
})
export class HighlightSearch implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    } else args = String.raw`${args}`.replace(/\\/g, "\\\\");
    if (!value) {
      return
    }
    // Match in a case insensitive maneer
    const re = new RegExp(args.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi');
    const match = value.match(re);

    // If there's no match, just return the original value.
    if (!match) {
      return value;
    }

    const result = value.replace(re, "<mark style='background-color:#FFE000; padding: 0px;'>" + match[0] + "</mark>");
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }
}