import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { addDeviceObj_with_all_data_ref } from 'src/assets/mockdata/support/netops-management/subscriber-management/subscriber-wizard/service-wizard/service-wizard';

import { VoiceLineServiceComponent } from './voice-line-service.component';

describe('VoiceLineServiceComponent', () => {
  let component: VoiceLineServiceComponent;
  let fixture: ComponentFixture<VoiceLineServiceComponent>;

  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoiceLineServiceComponent],
      imports: [
        RouterTestingModule, 
        HttpClientTestingModule, 
        NgSelectModule
      ],
      providers: [
        TranslateService
      ]
    })
      .compileComponents();
  });

  afterEach (() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceLineServiceComponent);
    component = fixture.componentInstance;
    component.lineObject = {};
    component.addDeviceObj = addDeviceObj_with_all_data_ref;
    fixture.detectChanges();

    translateService = TestBed.inject(TranslateService);

  });

  it('Ng-Oninit test', () => {
    component.lineObject = undefined;
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    component.ngOnInit();
    component.addDeviceObj;
    //expect(component.advanceSettingsLbl).toBe('Show Advanced Settings');
  });

  it('handleOnOffBtn test', () => {
    component.handleOnOffBtn('VoiceService');
    //expect(component.lineObject.inValidURI).toBeFalsy();
    //expect(component.lineObject.inValidDireConnectNum).toBeFalsy();
    fixture.detectChanges();
    component.handleOnOffBtn('DirectConnect');
    fixture.detectChanges();
    component.handleOnOffBtn('');
  });

  it('onToggleAdvSettings test', () => {
    component.onToggleAdvSettings();
    component.lineObject.systemLoss = 'GR-909';
    component.onSysLossChange();
    fixture.detectChanges();
    component.lineObject.systemLoss = 'ANSI';
    component.onSysLossChange();
    fixture.detectChanges();
    component.lineObject.systemLoss = 'ETSI-PSTN';
    component.onSysLossChange();
    fixture.detectChanges();
    component.lineObject.systemLoss = '';
    component.onSysLossChange();
    fixture.detectChanges();
  });

  it('checkValidation test', () => {
    component.lineObject.username = 'Abcd123@@';
    component.checkValidation('inValidUserName',component.lineObject.username);
    fixture.detectChanges();
    component.lineObject.direConnectNum = 'Abcd123';
    component.checkValidation('inValidDireConnectNum',component.lineObject.direConnectNum);
    fixture.detectChanges();
    component.lineObject.directConnectTimer = -1;
    component.checkValidation('inValidDireConnectTime',component.lineObject.directConnectTimer);
    fixture.detectChanges();
    component.lineObject.password = 'Abcd123@@';
    component.checkValidation('inValidPWD',component.lineObject.password);
    fixture.detectChanges();
    component.lineObject.systemTXLoss = 8;
    component.checkValidation('inValidsystemTXLoss',component.lineObject.systemTXLoss);
    fixture.detectChanges();
  });

});
