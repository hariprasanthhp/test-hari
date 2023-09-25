import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ExternaTicketingServiceService } from 'src/app/support/netops-management/shared/externa-ticketing-service.service';
import { extrefConfigNsic, extrefConfigNsicTest } from 'src/assets/mockdata/admin/externalticket/externalticket.data';
import { CommonService } from '../services/common.service';
import { of } from "rxjs";

import { ExternalTicketingSystemComponent } from './external-ticketing-system.component';

describe('ExternalTicketingSystemComponent', () => {
  let component: ExternalTicketingSystemComponent;
  let fixture: ComponentFixture<ExternalTicketingSystemComponent>;
  let router:Router;
  let service:ExternaTicketingServiceService;
  let languageService:TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalTicketingSystemComponent ],
      imports: [
        RouterTestingModule, HttpClientTestingModule
, NgSelectModule, FormsModule
      ],
      providers: [
        CommonService, SsoAuthService, TranslateService, ExternaTicketingServiceService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalTicketingSystemComponent);
    component = fixture.componentInstance;
    service=TestBed.inject(ExternaTicketingServiceService)
    languageService=TestBed.inject(TranslateService)
    router=TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should initialize onInit()', () => {
    spyOn(component,'getExternalticketDetails').and.callThrough()
    languageService.selectedLanguage.subscribe(data=>{
      component.language=data;
    })
    component.ngOnInit()
    expect(component.getExternalticketDetails).toHaveBeenCalled()
  });

  // it('should get ExternalticketDetails', () => {
  //   let orgId='470053'
  //   spyOn(service,'externalticketDetails').and.returnValue(of(extrefConfigNsic))
  //   // service.externalticketDetails(orgId)
  //    spyOn(component,'getExternalticketDetails').and.callThrough()
  //   component.getExternalticketDetails()
  //   console.log(component.externalTicketResponse)
  //   // console.log(component.TempexternalTicketData)
  //   // expect(component.externalTicketData).toBeTruthy()
  //   // expect(component.externalTicketData).toBe(extrefConfigNsic)
  //   // expect(component.TempexternalTicketData).toBe(JSON.parse(JSON.stringify(extrefConfigNsic)))
  //   // expect(component.extrefError404).toBeFalse()
  //   // expect(component.loading).toBeFalse()
  //   // expect(component.saveDisable).toBeFalse()
  //   expect(component.getExternalticketDetails).toHaveBeenCalled()
  // });

  // it('should test connection',()=>{
  //   const frm = <NgForm>{
  //     valid: true
  //   };
  // //    component.externalTicketData={
  // //     accountId: "35be3a9b-280e-468f-a7a5-9aec55c715b1",
  // //     username: "CalixAPI",
  // //     password: "Lg8sj9yckvK5",
  // //     companyNumber: "144645656756",
  // //     url: "https://niscpartnerapi.cloud.coop/services/secured/troubleTicket/addComments",
  // //     name: "NISC",
  // //     orgId: 470053
  // // }
  // // component.externalTicketData.value.companyNumber="144645656756",
  //  spyOn(service,'testUrlExternalticketDetails').and.returnValue(of(extrefConfigNsicTest))
  //  component.testConnection(frm)
  //  expect(component.UrlTestConnection).toBeTruthy()
  //  expect(component.UrlTestConnection).toBe(extrefConfigNsicTest)
  //  expect(component.testConnection).toHaveBeenCalled()
  // })
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
