import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';

export function nameValidator(control: AbstractControl): { [key: string]: any } | null {
  if (!control?.value) {
    return { 'required': true };
  }

  if (!control?.value?.trim()) {
    return { 'invalidName': true };
  }

  const regx = /^[A-Za-z0-9 ]+$/;

  if (!regx.test(control?.value)) {
    return { 'invalidName': true };
  }

  return null;

}

@Injectable({
  providedIn: 'root'
})
export class CommonWorkflowService {

  constructor() { }

  public tabChanged$ = new Subject();

  setTabChange() {
    this.tabChanged$.next(true);
  }
}
