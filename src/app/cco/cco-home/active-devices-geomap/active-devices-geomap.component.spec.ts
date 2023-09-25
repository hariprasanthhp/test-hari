import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveDevicesGeomapComponent } from './active-devices-geomap.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { FormBuilder } from '@angular/forms';

describe('ActiveDevicesGeomapComponent', () => {
  let component: ActiveDevicesGeomapComponent;
  let fixture: ComponentFixture<ActiveDevicesGeomapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActiveDevicesGeomapComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      providers: [
        FormBuilder, TranslateService, SsoAuthService, {
          provide: Router, useValue: {
            navigate: () => { },
            url: ''
          }
        }] 
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveDevicesGeomapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
