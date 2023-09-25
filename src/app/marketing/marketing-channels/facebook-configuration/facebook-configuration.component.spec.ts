import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookConfigurationComponent } from './facebook-configuration.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Title } from '@angular/platform-browser';
import { MarketingHomeApiService } from '../../marketing-home/marketing-home-Apiservice';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { errorStatus400, errorStatus401, errorStatus404, errorStatus500, errorStatus504 } from 'src/assets/mockdata/shared/error.data';

describe('FacebookConfigurationComponent', () => {
  let component: FacebookConfigurationComponent;
  let fixture: ComponentFixture<FacebookConfigurationComponent>;
  let dialogService: NgbModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacebookConfigurationComponent],
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
        fixture = TestBed.createComponent(FacebookConfigurationComponent);
        dialogService = TestBed.inject(NgbModal);
        component = fixture.componentInstance;
      });
  });

  it('should call removeUnwantedSpace', () => {
    component.removeUnwantedSpace('fbApikey','fbApikey');
  });

  it('should call onBrowserBackBtnClose', () => {
    let event = new Event('BackButton')
    component.onBrowserBackBtnClose(event)
  });

  
  it('should load data', () => {
    //arrange 
    spyOn(component, 'apiCall');
    //act
    fixture.detectChanges();
    //assert
    expect(component.apiCall).toHaveBeenCalled();
  });

  it('should call openMailchimp        ', () => {
    window.open = jasmine.createSpy('open');
    let blank = '_blank'
    const expectedUrl = `https://developers.facebook.com/`;

    component.openMailchimp();

    expect(window.open).toHaveBeenCalledWith(expectedUrl,blank);  
  });

  it('should call facebookModalOpen', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.facebookModalOpen();

    expect(component.focusElement ).toEqual('facebook');
  });

  it('should call mailchimpModalOpen', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);
    component.mailchimpModalOpen();
  });

  it('should call errorMailModalOpen', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.errorMailModalOpen();

    expect(component.focusElement).toEqual('errorMail');
  });

  it('should call api ', () => {
    spyOn(component, 'getMrktngChnlFaceAuth');
    component.apiCall();
    expect(component.getMrktngChnlFaceAuth).toHaveBeenCalled();
  });

  it('should get marketing facebook Authorization', () => {
    let res = {status: 'active'}
    spyOn((<any>component).http,'get').and.returnValue(of(res));
    component.getMrktngChnlFaceAuth();
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get marketing facebook Authorization', () => {
    let res = {status: 'other'}
    spyOn((<any>component).http,'get').and.returnValue(of(res));
    res.status = 'Failed - Expired'
    component.getMrktngChnlFaceAuth();
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get marketing facebook Authorization Error', () => {
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus504));
    component.language = [];
    component.getMrktngChnlFaceAuth();
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get marketing facebook Authorization Error', () => {
    let errorStatus502 = {status:502}
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus502));
    component.language = [];
    component.getMrktngChnlFaceAuth();
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get marketing facebook Authorization Error', () => {
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus500));
    component.language = [];
    component.getMrktngChnlFaceAuth();
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get marketing facebook Authorization Error', () => {
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus400));
    component.language = [];
    component.getMrktngChnlFaceAuth();
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get marketing facebook Authorization Error', () => {
    let errorStatus= {status:505}
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus));
    component.language = [];
    component.getMrktngChnlFaceAuth();
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should call errorReset', () => {
    component.errorReset();
  });

  it('should call checkValue', () => {
    let event = {target:{checked:true}};
    component.fbApiKey = undefined;
    component.fbBussines = undefined;
    component.checkValue(event);

    event = {target:{checked:false}};
    component.checkValue(event);
  });

  it('should call handleChange', () => {
    let event = {target:{value:[]}};
    component.handleChange(event);

    event = {target:{value:[{data:'value'}]}};
    component.handleChange(event);
  });

  it('should call enableFb1', () => {
    component.enableFb1();
    component.fbApiKey = 'Value';
    component.validCheck = true;
    component.fbBussines = 'Vlaue';
  });

  it('should call handleChange1', () => {
    let event = {target:{value:[]}};
    component.handleChange1(event);

    event = {target:{value:[{data:'value'}]}};
    component.handleChange1(event);
  });
  it('should call savefb', () => {
    fixture.detectChanges();
    fixture.debugElement.nativeElement.blur();
    component.fbApiKey = 'fbApikey';
    component.fbBussines = 'fbbussines';
    component.checkBox = true;
    let res = { status: 'active', audienceList: 'aaa', key: 'a2bD2', id: '12' }
    spyOn((<any>component).http,'put').and.returnValue(of(res));

    component.savefb();

    expect((component as any).http.put).toHaveBeenCalled();
  });

  it('should call savefb res status not valid', () => {
    fixture.detectChanges();
    fixture.debugElement.nativeElement.blur();
    component.fbApiKey = 'fbApikey';
    component.fbBussines = 'fbbussines';
    component.checkBox = true;
    let res = { status: 'other', audienceList: 'aaa', key: 'a2bD2', id: '12' }
    spyOn((<any>component).http,'put').and.returnValue(of(res));

    component.savefb();

    expect((component as any).http.put).toHaveBeenCalled();
  });

  it('should call savefb res status not failed', () => {
    fixture.detectChanges();
    fixture.debugElement.nativeElement.blur();
    component.fbApiKey = 'fbApikey';
    component.fbBussines = 'fbbussines';
    component.checkBox = true;
    let res = { status: 'failed', audienceList: 'aaa', key: 'a2bD2', id: '12' }
    spyOn((<any>component).http,'put').and.returnValue(of(res));

    component.savefb();

    expect((component as any).http.put).toHaveBeenCalled();
  });

  it('should call savefb res empty response', () => {
    fixture.detectChanges();
    fixture.debugElement.nativeElement.blur();
    component.fbApiKey = 'fbApikey';
    component.fbBussines = 'fbbussines';
    component.checkBox = true;
    let res = {};
    spyOn((<any>component).http,'put').and.returnValue(of(res));

    component.savefb();

    expect((component as any).http.put).toHaveBeenCalled();
  });

  it('should call savefb error status 404', () => {
    fixture.detectChanges();
    fixture.debugElement.nativeElement.blur();
    component.fbApiKey = 'fbApikey';
    component.fbBussines = 'fbbussines';
    component.checkBox = true;
    spyOn((<any>component).http,'put').and.returnValue(throwError(errorStatus404));

    component.savefb();

    expect((component as any).http.put).toHaveBeenCalled();
  });

  it('should call savefb error status 401', () => {
    fixture.detectChanges();
    fixture.debugElement.nativeElement.blur();
    component.fbApiKey = 'fbApikey';
    component.fbBussines = 'fbbussines';
    component.checkBox = true;
    spyOn((<any>component).http,'put').and.returnValue(throwError(errorStatus401));

    component.savefb();

    expect((component as any).http.put).toHaveBeenCalled();
  });

  it('should call savefb error status 504', () => {
    fixture.detectChanges();
    fixture.debugElement.nativeElement.blur();
    component.fbApiKey = 'fbApikey';
    component.fbBussines = 'fbbussines';
    component.checkBox = true;
    let res = { status: 'failed', audienceList: 'aaa', key: 'a2bD2', id: '12' }
    spyOn((<any>component).http,'put').and.returnValue(throwError(errorStatus504));

    component.savefb();

    expect((component as any).http.put).toHaveBeenCalled();
  });

  it('should call saveConnectModalOpen', () => {
    spyOn((<any>component).dialogService,'dismissAll');
    component.saveConnectModalOpen();
  });

  it('should call closeModalOk', () => {
    component.closeModalOk();
  });

  it('should call openMarketingChannel', () => {
    spyOn((<any>component).dialogService,'dismissAll');
    component.openMarketingChannel();
  });

  it('should call successLoadingModalOpen', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);
    component.successLoadingModalOpen();
  });

  it('should call closeComponent', () => {
    component.closeComponent();
  });

  it('should call onclose', () => {
    component.onclose();
  });

  it('should call testConnection', () => {
    let res ={ status: 200, audienceList: 'aaa', key: 'a2bD2', id: '12' };
    spyOn(component,'getTestconnection').and.returnValue(of(res))
    component.testConnection();
    expect(component.getTestconnection).toHaveBeenCalledWith('Facebook');
  });

  it('should call testConnection', () => {
    let res ={ status: 202, audienceList: 'aaa', key: 'a2bD2', id: '12' };
    spyOn(component,'getTestconnection').and.returnValue(of(res))
    component.testConnection();
    expect(component.getTestconnection).toHaveBeenCalledWith('Facebook');
  });

  it('should call testConnection error', () => {
    spyOn(component,'getTestconnection').and.returnValue(throwError(errorStatus404))
    component.testConnection();
    expect(component.getTestconnection).toHaveBeenCalledWith('Facebook');
  });

  it('should call testConnection error', () => {
    spyOn(component,'getTestconnection').and.returnValue(throwError(errorStatus401))
    component.testConnection();
    expect(component.getTestconnection).toHaveBeenCalledWith('Facebook');
  });

  it('should call getTestconnection', () => {
    let res ={ status: 202, audienceList: 'aaa', key: 'a2bD2', id: '12' };
    spyOn((<any>component).http,'post').and.returnValue(of(res));

    component.getTestconnection('mail');

    expect((component as any).http.post).toHaveBeenCalled();
  });

  it('should call remove_connection', () => {
    let res ={ status: 202, audienceList: 'aaa', key: 'a2bD2', id: '12' };
    spyOn((<any>component).http,'delete').and.returnValue(of(res));

    component.remove_connection();

    expect((component as any).http.delete).toHaveBeenCalled();
  });
});
