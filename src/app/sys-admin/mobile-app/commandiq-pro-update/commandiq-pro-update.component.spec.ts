import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandiqProUpdateComponent } from './commandiq-pro-update.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { ColorPickerService } from 'ngx-color-picker';

describe('CommandiqProUpdateComponent', () => {
  let component: CommandiqProUpdateComponent;
  let fixture: ComponentFixture<CommandiqProUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandiqProUpdateComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule,NgSelectModule],
      providers: [ColorPickerService],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandiqProUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
