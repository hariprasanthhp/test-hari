import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingCloudComponent } from './marketing-cloud.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { ZipCodeApiService } from '../services/zipcode-upload.service';
import { ValidatorService } from 'src/app-services/validator.services';
import { Subject, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('MarketingCloudComponent', () => {
  let component: MarketingCloudComponent;
  let fixture: ComponentFixture<MarketingCloudComponent>;
  let modalService: NgbModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, RouterTestingModule,
      ],
      declarations: [ MarketingCloudComponent ],
      providers:[TranslateService,NgbModal,SsoAuthService,CommonService,ValidatorService, {
        provide: Router, useValue: {
          navigate: () => { },
          url: ''
        }
      }, {
        provide: ZipCodeApiService, useValue: {
          marketingCloudCheck: () => (of({})),
          marketingCloudCheckUpdate: () => (of({}))
        }
      }]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(MarketingCloudComponent);
      component = fixture.componentInstance;
      component.languageSubject = new Subject();
      modalService = TestBed.inject(NgbModal);

    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnDestroy', () => {
    spyOn(component.languageSubject, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.languageSubject.unsubscribe).toHaveBeenCalled();
  });

  it('should call setPageTitle', () => {
    component.language = [];
    component.setPageTitle();
  });

  it('should call refresh', () => {
    component.refresh();
  });

  it('should call saveSubscriberStatus', () => {
    component.frombillingStatusEnabled = true;
    component.suspendedDuration = '';
    component.saveSubscriberStatus();

    component.frombillingStatusEnabled = false;
    component.suspendedDuration = '6';
    component.saveSubscriberStatus();
  });

  it('should call openSaveModel1', () => {
    modalService = jasmine.createSpyObj('ModalService', ['open']);
    component.openSaveModel1();
  });

  it('should call openSaveModel', () => {
    modalService = jasmine.createSpyObj('ModalService', ['open']);
    component.openSaveModel();
  });

  it('should call getZipcodeEntryList', () => {
    let res = {billingStatusEnabled:true,suspendedDuration:5}
    spyOn((<any>component).zipcodeService,'marketingCloudCheck').and.returnValue(of(res))
    component.getZipcodeEntryList();
    expect((component as any).zipcodeService.marketingCloudCheck).toHaveBeenCalled();
  });

  it('should call getZipcodeEntryList', () => {
    let res = {billingStatusEnabled:true,suspendedDuration:0}
    spyOn((<any>component).zipcodeService,'marketingCloudCheck').and.returnValue(of(res))
    component.getZipcodeEntryList();
    expect((component as any).zipcodeService.marketingCloudCheck).toHaveBeenCalled();
  });

  it('should call getZipcodeEntryList', () => {
    let error = {error:{message:'Error'}}
    spyOn((<any>component).zipcodeService,'marketingCloudCheck').and.returnValue(throwError(error))
    component.getZipcodeEntryList();
    expect((component as any).zipcodeService.marketingCloudCheck).toHaveBeenCalled();
  });

  it('should call closeAlert', () => {
    component.closeAlert();
  });

  it('should call onChange', () => {
    let event = {target:{value:'1'}};
    let from = 1;
    component.onChange(event,from);
  });

  it('should call onChange', () => {
    let event = {target:{value:'1'}};
    let from = 2;
    component.onChange(event,from);
  });

  it('should call saveDuration', () => {
    let payload ={
      "billingStatusEnabled": true,
        orgid:'',
      "suspendedDuration": 0
    }
    let res = {billingStatusEnabled:true,suspendedDuration:0}
    spyOn((<any>component).zipcodeService,'marketingCloudCheckUpdate').and.returnValue(of(res))
    component.saveDuration();
    expect((component as any).zipcodeService.marketingCloudCheckUpdate).toHaveBeenCalledWith(payload);
  });

  it('should call campaignTargetChange', () => {
    component.campaignTargetChange('1');

    component.campaignTargetChange('');

  });
});
