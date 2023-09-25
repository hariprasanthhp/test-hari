// import { TrimSpaceDirective } from './trim-space.directive';

// describe('TrimSpaceDirective', () => {
//   it('should create an instance', () => {
//     const directive = new TrimSpaceDirective();
//     expect(directive).toBeTruthy();
//   });
// });



import { Component, DebugElement, ElementRef, HostListener } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
// import { by, By } from 'protractor';


import { TrimSpaceDirective } from './trim-space.directive';
@Component({
  template: `
    <input type="text"
    trimSpace />
  `
})
class HostComponent { }

describe('TrimSpaceDirective', () => {
  let component:HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let element:DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrimSpaceDirective, HostComponent],
     
      providers:[ElementRef,HostListener]
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    component = fixture.componentInstance
     element = fixture.debugElement.query(By.css('input'))
     console.log(element)
  });
  it('should create an instance', () => {
    const directive = new TrimSpaceDirective(element);
    expect(directive).toBeTruthy();
  });
});

