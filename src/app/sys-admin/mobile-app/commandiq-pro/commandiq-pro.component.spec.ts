import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandiqProComponent } from './commandiq-pro.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CommandiqProComponent', () => {
  let component: CommandiqProComponent;
  let fixture: ComponentFixture<CommandiqProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandiqProComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandiqProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
