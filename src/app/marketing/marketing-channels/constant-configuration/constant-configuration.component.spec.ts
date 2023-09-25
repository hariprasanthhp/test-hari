import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantConfigurationComponent } from './constant-configuration.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Title } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { of, throwError } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { errorStatus404, errorStatus504 } from 'src/assets/mockdata/shared/error.data';

describe('ConstantConfigurationComponent', () => {
  let component: ConstantConfigurationComponent;
  let fixture: ComponentFixture<ConstantConfigurationComponent>;
  let dialogService: NgbModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConstantConfigurationComponent],
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
          navigate: () => (of({})),

        }
      },
      {
        provide: SsoAuthService, useValue: {
          setValidConstantAuth: jasmine.createSpy(),
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
        fixture = TestBed.createComponent(ConstantConfigurationComponent);
        dialogService = TestBed.inject(NgbModal);
        component = fixture.componentInstance;
      });
  });


  it('should onBrowserBackBtnClose', () => {
    let event = new Event('backbutton');
    spyOn((<any>component).router,'navigate');

    component.onBrowserBackBtnClose(event);
  });

  it('should load data', () => {
    spyOn(component, 'getMrktngChnlAuth');
    fixture.detectChanges();
    expect(component.getMrktngChnlAuth).toHaveBeenCalled();
  });

  // it('should call keyEvent', () => {
  //   let event = new KeyboardEvent('keydown',{key : 'Enter'});
  //   component.focusElement = 'hubspot';
  //   component.keyEvent(event);

  //   component.focusElement = 'successConnect';
  //   component.keyEvent(event);

  //   component.focusElement = 'errorConnect';
  //   component.keyEvent(event);

  //   component.focusElement = 'saveConnect';
  //   component.keyEvent(event);

  //   component.focusElement = 'removeConnection';
  //   component.keyEvent(event);
  // });

  // it('should call openHubSpot', () => {
  //   spyOn((component as any).dialogService,'dismissAll');
    
  //   component.openHubSpot();

  //   expect((component as any).dialogService.dismissAll).toHaveBeenCalled();
  // });

  it('should call hubspotModalOpen', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.hubspotModalOpen();

    expect(component.focusElement ).toEqual('hubspot');
  });

  it('should call successConnectModalOpen', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.successConnectModalOpen();

    expect(component.focusElement ).toEqual('successConnect');
  });

  it('should call successConnectErrorModalOpen', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.successConnectErrorModalOpen();

    expect(component.focusElement ).toEqual('errorConnect');
  });

  it('should call saveConnectModalOpen', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.saveConnectModalOpen();

    expect(component.focusElement ).toEqual('saveConnect');
  });

  it('should call closeModal', () => {
    spyOn((component as any).dialogService,'dismissAll');
    component.closeModal();
  });

  it('should call openMarketingChannel', () => {
    spyOn((component as any).dialogService,'dismissAll');
    component.openMarketingChannel();
  });

  it('should call successLoadingModalOpen', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.successLoadingModalOpen();
  });

  it('should call errorMailModalOpen', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.errorMailModalOpen();

    expect(component.focusElement ).toEqual('removeConnection');
  });


  it('should get marketing channel authorization', () => {
    spyOn((<any>component).http,'get').and.returnValue(of({ status: 'active', audienceList: 'aaa', key: 'a2bD2', id: '12' }));
    component.getMrktngChnlAuth(0);    
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get marketing channel authorization', () => {
    spyOn((<any>component).http,'get').and.returnValue(of({ status: 'other', audienceList: 'aaa', key: 'a2bD2', id: '12' }));
    component.getMrktngChnlAuth(0);    
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get marketing channel authorization Error 404', () => {
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus404));
    component.language=[];
    component.getMrktngChnlAuth(0);    
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get marketing channel authorization Error 504', () => {
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus504));
    component.language=[];
    component.getMrktngChnlAuth(0);    
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should call selectstatus', () => {
    let event = {id:'11',name:'Event'}
    component.selectstatus(event);
  });

  it('should call errorReset', () => {
    component.errorReset();
    expect(component.audiencePostSuccess).toBeFalsy();
  });

  it('should call updateAudi', () => {
    component.updateAudi();
    expect(component.hasAudienceList ).toBeFalsy();
  });

  it('should call saveAudi', () => {
    component.ListId = null;
    component.saveAudi();
    expect(component.checkValid).toBeTruthy();

    component.ListId = '2211';
    component.language = [];
    component.saveAudi();
    expect(component.checkValid).toBeFalsy();

    spyOn((<any>component).http,'put').and.returnValue(of({ status: 'active', audienceList: 'aaa', key: 'a2bD2', id: '12' }));
    component.language = [];
    component.saveAudi();
    expect((component as any).http.put).toHaveBeenCalled();
  });

  it('should call saveAudi other status', () => {
    let res = { status: 'other', audienceList: 'aaa', key: 'a2bD2', id: '12' };
    spyOn((<any>component).http,'put').and.returnValue(of(res));
    component.language = [];
    component.saveAudi();
    // expect((component as any).http.put).toHaveBeenCalled();
  });

  // it('should call saveAudi empty json', () => {
  //     spyOn((<any>component).http,'put').and.returnValue(of({}));
  //    component.language = [];
  //    component.saveAudi();
  //    expect((component as any).http.put).toHaveBeenCalled();
  //  });

  //  it('should call saveAudi error', () => {
  //     spyOn((<any>component).http,'put').and.returnValue(throwError({}));
  //     component.saveAudi();
  //     expect((component as any).http.put).toHaveBeenCalled();
  //  });

   it('should call getAudience', () => {
    let res =[{ status: 'active', audienceList: 'aaa', key: 'a2bD2', id: '12' }];
    spyOn((<any>component).http,'get').and.returnValue(of(res));
    component.getAudience(1);
    component.statusData = res;
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should call getAudience', () => {
    let res =[{ }];
    spyOn((<any>component).http,'get').and.returnValue(of(res));
    component.getAudience(1);
    component.statusData = res;
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should call closeComponent', () => {
    component.closeComponent();
  });

  it('should call remove_connection', () => {
    let res =[{ }];
    spyOn((<any>component).http,'delete').and.returnValue(of(res));
    component.remove_connection();
    expect((component as any).http.delete).toHaveBeenCalled();
  });

  it('should call remove_connection', () => {
    let res ={ };
    spyOn((<any>component).http,'delete').and.returnValue(throwError(res));
    component.remove_connection();
    expect((component as any).http.delete).toHaveBeenCalled();
  });

  // it('should call testConnection', () => {
  //   let res ={ status: 200, audienceList: 'aaa', key: 'a2bD2', id: '12' };
  //   spyOn((<any>component).testConnectionBlur.nativeElement,'blur');
  //   spyOn(component,'getTestconnection').and.returnValue(of(res))
  //   component.testConnection();
  //   expect(component.getTestconnection).toHaveBeenCalledWith('ConstantContact');
  // });

  it('should call getTestconnection', () => {
    let res ={ };
    spyOn((<any>component).http,'post').and.returnValue(of(res));
    component.getTestconnection('mail');
    expect((component as any).http.post).toHaveBeenCalled();
  });

  it('should call errorResetTab', () => {
    component.errorResetTab();
  });
});

