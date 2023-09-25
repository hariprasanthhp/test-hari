import { DebugElement, ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AutofocusDirective } from './autofocus.directive';

describe('AutofocusDirective', () => {
    let element:DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutofocusDirective],
      providers:[ElementRef]
    }).compileComponents();
  });


  it('should create an instance', () => {
    const directive = new AutofocusDirective(element);
    expect(directive).toBeTruthy();
  });
});
