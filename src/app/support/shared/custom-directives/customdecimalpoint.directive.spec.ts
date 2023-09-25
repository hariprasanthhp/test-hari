import { DebugElement, ElementRef } from '@angular/core';
import { CustomdecimalpointDirective } from './customdecimalpoint.directive';
import { TestBed } from '@angular/core/testing';

describe('CustomdecimalpointDirective', () => {
  let element:DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomdecimalpointDirective],
      providers:[ElementRef]
    }).compileComponents();
  });

  it('should create an instance', () => {
    const directive = new CustomdecimalpointDirective(element);
    expect(directive).toBeTruthy();
  });
  
});
