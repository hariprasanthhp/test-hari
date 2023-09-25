import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { IPv6AddressService } from 'src/app/shared/services/ipv6-address.service';

import { AddNewcategoriesOntComponent } from './add-newcategories-ont.component';

describe('AddNewcategoriesOntComponent', () => {
  let component: AddNewcategoriesOntComponent;
  let fixture: ComponentFixture<AddNewcategoriesOntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewcategoriesOntComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule, NgSelectModule, FormsModule, ReactiveFormsModule
      ],
      providers: [IPv6AddressService, TranslateService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewcategoriesOntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
