import { TitleCasePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterService } from 'src/app-services/routing.services';
import { TranslateService } from 'src/app-services/translate.service';
import { ValidatorService } from 'src/app-services/validator.services';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { SubscriberServicesService } from '../service/subscriber-services.service';

import { SubscriberServicesComponent } from './subscriber-services.component';

describe('SubscriberServicesComponent', () => {
  let component: SubscriberServicesComponent;
  let fixture: ComponentFixture<SubscriberServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriberServicesComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule
],
      providers: [RouterService, ValidatorService, SubscriberServicesService, SsoAuthService, TranslateService, TitleCasePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
