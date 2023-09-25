import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from './../../../app-services/translate.service';
import { SupportHeaderComponent } from './support-header.component';
import { SsoAuthService } from './../../shared/services/sso-auth.service';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';

describe('SupportHeaderComponent', () => {
  let component: SupportHeaderComponent;
  let fixture: ComponentFixture<SupportHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportHeaderComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
, SharedUtilsModule],
      providers: [TranslateService, SsoAuthService]
    })
      .compileComponents();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(SupportHeaderComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
