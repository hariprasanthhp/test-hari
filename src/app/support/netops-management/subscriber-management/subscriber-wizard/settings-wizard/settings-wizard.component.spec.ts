import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { BehaviorSubject, of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { addDeviceObj_for_service, addDeviceObj_for_settings } from 'src/assets/mockdata/support/netops-management/subscriber-management/subscriber-wizard/service-wizard/service-wizard';

import { SettingsWizardComponent } from './settings-wizard.component';

describe('SettingsWizardComponent', () => {
  let component: SettingsWizardComponent;
  let fixture: ComponentFixture<SettingsWizardComponent>;

  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsWizardComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        TranslateService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    translateService = TestBed.inject(TranslateService);

  });

  // afterEach (() => {
  //   fixture.destroy();
  //   TestBed.resetTestingModule();
  // });

  it('ng OnInit test', () => {
    component.addDeviceObj = addDeviceObj_for_settings;
    component.ngOnInit();
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    fixture.detectChanges();
  });

  it('ng Ondestroy test', () => {
    component.languageSubject = new BehaviorSubject({});
    fixture.detectChanges();
    component.ngOnDestroy();
  });

  it('changeLanPortoneDhcpLeaseLimit test', () => {
    component.addDeviceObj = addDeviceObj_for_settings;
    console.log('adfsasdfa', component.addDeviceObj);
    component.addDeviceObj.settings.lanPortOne.DHCPLeaseLimit = -2;
    component.changeLanPortoneDhcpLeaseLimit();
    fixture.detectChanges();
  });

  it('changeLanPortoneDhcpLeaseLimit else test', () => {
    component.addDeviceObj = addDeviceObj_for_settings;
    component.addDeviceObj.settings.lanPortOne.DHCPLeaseLimit = 550;
    component.changeLanPortoneDhcpLeaseLimit();
    fixture.detectChanges();
  });

  it('changeLanPorttwoDhcpLeaseLimit test', () => {
    component.addDeviceObj = addDeviceObj_for_settings;
    console.log('adfsasdfa', component.addDeviceObj);
    component.addDeviceObj.settings.lanPortTwo.DHCPLeaseLimit = -2;
    component.changeLanPorttwoDhcpLeaseLimit();
    fixture.detectChanges();
  });

  it('changeLanPorttwoDhcpLeaseLimit else test', () => {
    component.addDeviceObj = addDeviceObj_for_settings;
    component.addDeviceObj.settings.lanPortTwo.DHCPLeaseLimit = 550;
    component.changeLanPorttwoDhcpLeaseLimit();
    fixture.detectChanges();
  });

  it('changeLanPortthreeDhcpLeaseLimit test', () => {
    component.addDeviceObj = addDeviceObj_for_settings;
    console.log('adfsasdfa', component.addDeviceObj);
    component.addDeviceObj.settings.lanPortThree.DHCPLeaseLimit = -2;
    component.changeLanPortthreeDhcpLeaseLimit();
    fixture.detectChanges();
  });

  it('changeLanPortthreeDhcpLeaseLimit else test', () => {
    component.addDeviceObj = addDeviceObj_for_settings;
    component.addDeviceObj.settings.lanPortThree.DHCPLeaseLimit = 550;
    component.changeLanPortthreeDhcpLeaseLimit();
    fixture.detectChanges();
  });

  it('changeLanPortfourDhcpLeaseLimit test', () => {
    component.addDeviceObj = addDeviceObj_for_settings;
    console.log('adfsasdfa', component.addDeviceObj);
    component.addDeviceObj.settings.lanPortFour.DHCPLeaseLimit = -2;
    component.changeLanPortfourDhcpLeaseLimit();
    fixture.detectChanges();
  });

  it('changeLanPortfourDhcpLeaseLimit else test', () => {
    component.addDeviceObj = addDeviceObj_for_settings;
    component.addDeviceObj.settings.lanPortFour.DHCPLeaseLimit = 550;
    component.changeLanPortfourDhcpLeaseLimit();
    fixture.detectChanges();
  });
});
