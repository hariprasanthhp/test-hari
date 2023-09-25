import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import { NetopsManagementComponent } from './netops-management.component';
import { Router } from '@angular/router';

describe('NetopsManagementComponent', () => {
  let component: NetopsManagementComponent;
  let fixture: ComponentFixture<NetopsManagementComponent>;
  let router: Router;

  let mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/support/netops-management' };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetopsManagementComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      providers: [
        TranslateService,
        SsoAuthService,
        { provide: Router, useValue: mockUrl },
      ]
    })
      .compileComponents();
  });

  // beforeEach(() => {
  //   router = TestBed.inject(Router);
  //   fixture = TestBed.createComponent(NetopsManagementComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
