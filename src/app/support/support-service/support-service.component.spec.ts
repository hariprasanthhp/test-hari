import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from '../data.service';
import { SharedModule } from '../shared/shared.module';

import { SupportServiceComponent } from './support-service.component';

describe('SupportServiceComponent', () => {
  let component: SupportServiceComponent;
  let fixture: ComponentFixture<SupportServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportServiceComponent],
      imports: [RouterTestingModule
, SharedModule, FormsModule, ReactiveFormsModule,HttpClientTestingModule],
      providers: [TranslateService, DataServiceService, SsoAuthService]

    })
      // .compileComponents();
  });

  // beforeEach(() => {
    // fixture = TestBed.createComponent(SupportServiceComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  // });
  // hiding for ng test code coverage folder generation issue..
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
