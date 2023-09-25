import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ChannelConfigurationComponent } from './channel-configuration.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { By, Title } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { errorStatus404, errorStatus504 } from 'src/assets/mockdata/shared/error.data';

describe('ChannelConfigurationComponent', () => {
  let component: ChannelConfigurationComponent;
  let fixture: ComponentFixture<ChannelConfigurationComponent>;
  let dialogService: jasmine.SpyObj<any>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChannelConfigurationComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule
        , NgSelectModule],
      providers: [{
        provide: HttpClient, useValue: {
          get: () => (of({})),
          put: () => (of({})),
          delete: () => (of({})),
          post: () => (of({})),
        }
      },
      { provide: ActivatedRoute, useValue: {} },
      { provide: TranslateService, useClass: CustomTranslateService },
      {
        provide: Router, useValue: {
          navigate: jasmine.createSpy(),

        }
      },
      {
        provide: SsoAuthService, useValue: {
          setValidMailChimpAuth: jasmine.createSpy(),
          getOrgId: jasmine.createSpy().and.returnValue(''),

        }
      }, {
        provide: Title, useValue: {
          setTitle: jasmine.createSpy(),
        }
      },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ChannelConfigurationComponent);
        component = fixture.componentInstance;
      });
  });
  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    spyOn(component, 'getMrktngChnlAuth');    
    fixture.detectChanges();
    expect(component.getMrktngChnlAuth).toHaveBeenCalled();
  });

  it('should open dialog for mailchimpModalOpen', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.mailchimpModalOpen();

    expect(component.focusElement ).toEqual('mailchimp');
  });

  it('should open dialog for successConnectModalOpen', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.successConnectModalOpen();

    expect(component.focusElement ).toEqual('successConnect');
  });

  it('should open dialog for successConnectErrorModalOpen', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.successConnectErrorModalOpen();

    expect(component.focusElement ).toEqual('errorConnect');
  });

  it('should open dialog for saveConnectModalOpen', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.saveConnectModalOpen();

    expect(component.focusElement ).toEqual('saveConnect');
  });

  it('should open dialog for successLoadingModalOpen', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.successLoadingModalOpen();
  });

  it('should open dialog for errorMailModalOpen', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.errorMailModalOpen();

    expect(component.focusElement ).toEqual('errorMail');
  });

  it('should closeModal', () => {
    spyOn((component as any).dialogService,'dismissAll');
    component.focusElement = '';
    component.closeModal();
  });

  it('should openMarketingChannel', () => {
    spyOn((component as any).dialogService,'dismissAll');
    component.openMarketingChannel();
  });

  it('should getMrktngChnlAuth', () => {
    let json = { status: 'valid', audienceList: 'aaa', key: 'a2bD2', id: '12' };
    component.mailchimpPostError = false;
    spyOn((<any>component).http,'get').and.returnValue(of(json));

    component.getMrktngChnlAuth(0);

    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should getMrktngChnlAuth', () => {
    let json = { status: 'valid', audienceList: '', key: 'a2bD2', id: '12' };
    component.mailchimpPostError = false;
    spyOn((<any>component).http,'get').and.returnValue(of(json));

    component.getMrktngChnlAuth(0);

    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should getMrktngChnlAuth', () => {
    let json = { status: 'Error', audienceList: '', key: 'a2bD2', id: '12' };
    component.mailchimpPostError = false;
    spyOn((<any>component).http,'get').and.returnValue(of(json));

    component.getMrktngChnlAuth(0);

    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should getMrktngChnlAuth', () => {
    let json = { status: 'valid', audienceList: 'aaa', key: 'a2bD2', id: '12' };
    component.mailchimpPostError = false;
    component.language = [];
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus404));

    component.getMrktngChnlAuth(0);

    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should getMrktngChnlAuth', () => {
    let json = { status: 'valid', audienceList: 'aaa', key: 'a2bD2', id: '12' };
    component.mailchimpPostError = false;
    component.language = [];
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus504));

    component.getMrktngChnlAuth(0);

    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should selectstatus', () => {
    let event = {id:'1122',name:'text'};
    component.selectstatus(event);
  });

  it('should errorReset', () => {
    component.audiencePostSuccess = false;
    component.errorReset();
  });

  it('should updateAudi', () => {
    component.hasAudienceList  = false;
    component.updateAudi();
  });

  it('should saveAudi', () => {
    component.language = [];
    component.ListId = '';
    component.saveAudi();

    component.ListId = undefined;
    component.saveAudi();

    component.ListId = '1122';
    component.saveAudi();

    let json = { status: 'valid', audienceList: 'aaa', key: 'a2bD2', id: '12' };
    spyOn((<any>component).http,'put').and.returnValue(of(json));

    component.saveAudi();

    expect((component as any).http.put).toHaveBeenCalled();
  });

  it('should saveAudi', () => {
    component.language = [];
    component.ListId = '';
    component.saveAudi();

    component.ListId = undefined;
    component.saveAudi();

    component.ListId = '1122';
    component.saveAudi();    
    let json = { status: 'active', audienceList: 'aaa', key: 'a2bD2', id: '12' };
    spyOn((<any>component).http,'put').and.returnValue(of(json));

    component.saveAudi();

    expect((component as any).http.put).toHaveBeenCalled();
  });

  it('should saveAudi', () => {
    component.language = [];
    component.ListId = '';
    component.saveAudi();

    component.ListId = undefined;
    component.saveAudi();

    component.ListId = '1122';
    component.saveAudi();    
    let json = { status: 'success', audienceList: 'aaa', key: 'a2bD2', id: '12' };
    spyOn((<any>component).http,'put').and.returnValue(of(json));
    component.saveAudi();
    expect((component as any).http.put).toHaveBeenCalled();
  });

  it('should saveAudi', () => {
    component.language = [];
    component.ListId = '';
    component.saveAudi();

    component.ListId = undefined;
    component.saveAudi();

    component.ListId = '1122';
    component.saveAudi(); 
    let json = { status: 'error', audienceList: 'aaa', key: 'a2bD2', id: '12' };
    spyOn((<any>component).http,'put').and.returnValue(of(json));
    component.saveAudi();
    expect((component as any).http.put).toHaveBeenCalled();
  });

  it('should saveAudi', () => {
    component.language = [];
    component.ListId = '';
    component.saveAudi();

    component.ListId = undefined;
    component.saveAudi();

    component.ListId = '1122';
    component.saveAudi(); 
    let error = { status: 'error', message: 'Error'};
    spyOn((<any>component).http,'put').and.returnValue(throwError(error));
    component.saveAudi();
    expect((component as any).http.put).toHaveBeenCalled();
  });

  it('should closeComponent', () => {
    component.closeComponent();
  });

  it('should remove_connection', () => {
    let json = { status: 'active', audienceList: 'aaa', key: 'a2bD2', id: '12' };
    spyOn((<any>component).http,'delete').and.returnValue(of(json));

    component.remove_connection();

    expect((component as any).http.delete).toHaveBeenCalled();
  });

  it('should getTestconnection', () => {
    spyOn((<any>component).http,'post').and.returnValue(of({}));
    component.getTestconnection('mail');
    expect((component as any).http.post).toHaveBeenCalled();
  });

  it('should errorResetTab', () => {
    component.mailchimpPostErrorMsg = "";
    component.mailchimpPostError = false;
    component.errorResetTab();
  });
});


