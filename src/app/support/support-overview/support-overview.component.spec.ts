import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import { SupportOverviewComponent } from './support-overview.component';

describe('SupportOverviewComponent', () => {
  let component: SupportOverviewComponent;
  let fixture: ComponentFixture<SupportOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportOverviewComponent ],
      imports: [HttpClientTestingModule
,RouterTestingModule],
      providers: [TranslateService,SsoAuthService]
    })
    // .compileComponents();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(SupportOverviewComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
