import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectIqSkippedDevicesComponent } from './protect-iq-skipped-devices.component';
import { ProtectIqService } from '../../shared/service/protect-iq.service';
import { TranslateService } from 'src/app-services/translate.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';

describe('ProtectIqSkippedDevicesComponent', () => {
  let component: ProtectIqSkippedDevicesComponent;
  let fixture: ComponentFixture<ProtectIqSkippedDevicesComponent>;
  let protectIqService: ProtectIqService;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProtectIqSkippedDevicesComponent],
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
    fixture = TestBed.createComponent(ProtectIqSkippedDevicesComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    protectIqService = TestBed.inject(ProtectIqService);
    history.pushState({
      userId: 'test',
      configWrite: true
    }, '');
    fixture.detectChanges();
  });

  it('should set the language and load data on initialization', () => {
    component.translateService.selectedLanguage.next({});
    component.selectedTab('');
  });

  it('should load data - when API succeeds', () => {
    let mockdata = {
      samsung: [],
      apple: []
    };
    spyOn(protectIqService, 'getSkipList').and.returnValue(of(mockdata));
    component.loadData();
  });

  it('should load data - when API fails', () => {
    spyOn(protectIqService, 'getSkipList').and.returnValue(throwError(errorStatus401));
    component.loadData();
  });

  it('should toggle device skip status individually - when API succeeds', () => {
    spyOn(protectIqService, 'updateSkipStatus').and.returnValue(of({}));
    component.toggleSkipStatus('', true);
  });

  it('should toggle device skip status individually - when API fails', () => {
    spyOn(protectIqService, 'updateSkipStatus').and.returnValue(throwError(errorStatus401));
    component.toggleSkipStatus('', true);
  });

  it('should toggle device skip status collectively - when API succeeds', () => {
    spyOn(protectIqService, 'setAllSkipStatus').and.returnValue(of({}));
    component.toggleDevicesSkipStatus(true);
  });

  it('should toggle device skip status collectively - when API fails', () => {
    spyOn(protectIqService, 'setAllSkipStatus').and.returnValue(throwError(errorStatus401));
    component.toggleDevicesSkipStatus(true);
  });

});
