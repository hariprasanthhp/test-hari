import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectIqSecuritySettingsComponent } from './protect-iq-security-settings.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { ProtectIqService } from '../../shared/service/protect-iq.service';
import { of, throwError } from 'rxjs';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';

describe('ProtectIqSecuritySettingsComponent', () => {
  let component: ProtectIqSecuritySettingsComponent;
  let fixture: ComponentFixture<ProtectIqSecuritySettingsComponent>;
  let protectIqService: ProtectIqService;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProtectIqSecuritySettingsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        TranslateService,
        ProtectIqService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectIqSecuritySettingsComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    protectIqService = TestBed.inject(ProtectIqService);
    history.pushState({
      userId: 'test',
    }, '');
    fixture.detectChanges();
  });

  it('should set the language and load data on initialization', () => {
    component.translateService.selectedLanguage.next({});
    component.ngOnInit();
  });

  it('should set the selected', () => {
    component.selectedTab('staff-network');
    component.selectedTab('customer-portal');
    component.selectedTab('point-of-sale');
  });

  // case 1 - load and save data without roleId
  it('should load data - when API succeeds', () => {
    let mockdata = {
      securitySettings: {
        count: 2,
        data: [
          {
            name: 'PA',
            enabled: true,
          },
          {
            name: 'PSD',
            enabled: true,
          },
        ]
      }
    }
    spyOn(protectIqService, 'getSecurityList').and.returnValue(of(mockdata));
    component.loadData();
  });

  it('should load data - when API fails', () => {
    spyOn(protectIqService, 'getSecurityList').and.returnValue(throwError(errorStatus401));
    component.loadData();
  });

  it('should save data - when API succeeds', () => {
    spyOn(protectIqService, 'setSecuritySettings').and.returnValue(of({}));
    component.onSettingChange('PA');
  });

  it('should save data - when API fails', () => {
    spyOn(protectIqService, 'setSecuritySettings').and.returnValue(throwError(errorStatus401));
    component.onSettingChange('PA');
  });

  // case 2 - load and save data with roleId
  it('should load data - when API succeeds', () => {
    component.roleId = 2;
    let mockdata = {
      securitySettings: {
        count: 2,
        data: [
          {
            name: 'PA',
            enabled: true,
          },
          {
            name: 'PSD',
            enabled: true,
          },
        ]
      }
    }
    spyOn(protectIqService, 'getSecurityListByRole').and.returnValue(of(mockdata));
    component.loadData();
  });

  it('should load data - when API fails', () => {
    spyOn(protectIqService, 'getSecurityListByRole').and.returnValue(throwError(errorStatus401));
    component.loadData();
  });

  it('should save data - when API succeeds', () => {
    component.roleId = 2;
    spyOn(protectIqService, 'setSecuritySettingsByRole').and.returnValue(of({}));
    component.onSettingChange('PA');
  });

  it('should save data - when API fails', () => {
    component.roleId = 2;
    spyOn(protectIqService, 'setSecuritySettingsByRole').and.returnValue(throwError(errorStatus401));
    component.onSettingChange('PA');
  });

});
