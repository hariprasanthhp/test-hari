import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';

import { AddServiceSystemComponent } from './add-service-system.component';
import { AddSubscriberService } from './add-subscriber.service';

describe('AddServiceSystemComponent', () => {
  let component: AddServiceSystemComponent;
  let fixture: ComponentFixture<AddServiceSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddServiceSystemComponent ],
      imports:[RouterTestingModule, HttpClientTestingModule
],
      providers:[TranslateService, SsoAuthService, AddSubscriberService, CommonService, Title]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServiceSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
