import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { WifiSsidServiceComponent } from './wifi-ssid-service.component';
import { NgSelectModule } from '@ng-select/ng-select';

describe('WifiSsidServiceComponent', () => {
  let component: WifiSsidServiceComponent;
  let fixture: ComponentFixture<WifiSsidServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WifiSsidServiceComponent ],
      imports:[HttpClientTestingModule
, RouterTestingModule, NgSelectModule, FormsModule, ReactiveFormsModule],
      providers:[TranslateService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WifiSsidServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
