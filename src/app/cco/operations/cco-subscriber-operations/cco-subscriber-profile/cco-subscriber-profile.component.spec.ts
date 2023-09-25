import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { CcoOrgAdminService } from 'src/app/cco/shared/services/cco-org-admin.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { SubscriberService } from '../cco-subscriber-templates/subscriber-templates/subscribers/service/subscriber.service';
import { AddComponent } from './add/add.component';
import { of } from 'rxjs';
import { CcoSubscriberProfileComponent } from './cco-subscriber-profile.component';
import { OntCategoryConfigurationService } from './ont-category-configuration.service';
import { ProfileService } from './profile.service';
import{ serviceDefinitions,serviceTemplates,bandwidthTiers,multicastRange,multicastVlan,ouiMatchList} from 'src/assets/mockdata/cco/operations/serviceProfile/service-profile';

describe('CcoSubscriberProfileComponent', () => {
  let component: CcoSubscriberProfileComponent;
  let fixture: ComponentFixture<CcoSubscriberProfileComponent>;
  let subscriberService: SubscriberService;
  let service: ProfileService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcoSubscriberProfileComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'cco/operations/cco-subscriber-operations/operations/ONT-profile/add', component: AddComponent },
          { path: 'cco/operations/cco-subscriber-operations/operations/ONT-profile/edit', component: AddComponent },
        ]), HttpClientTestingModule
      ],
      providers: [
        TranslateService, 
        Title, CommonService, ProfileService, NgbModal, SubscriberService, CcoOrgAdminService, SsoAuthService,
        OntCategoryConfigurationService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoSubscriberProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


//service profile 
 
  // it('service definitions ', () => {
  //   spyOn(service, 'getsubscriber').and.returnValue(of(serviceDefinitions));
  //   expect(component.subscriberList[0]).toEqual(serviceDefinitions[0]);

  // });

  // it('service templates ', () => {
  //   spyOn(subscriberService, 'getsubscriber').and.returnValue(of(serviceTemplates));
  //   expect(component.subscriberList[1]).toEqual(serviceTemplates[0]);

  // });

  // it('bandwidth tiers ', () => {
  //   spyOn(subscriberService, 'getbandwidth').and.returnValue(of(bandwidthTiers));
  //   expect(component.subscriberList[2]).toEqual(bandwidthTiers[0]);

  // });

  // it('ouimatchlist ', () => {
  //   spyOn(service, 'getOuiList').and.returnValue(of(ouiMatchList));
  //   expect(component.subscriberList[3]).toEqual(ouiMatchList[0]);

  // });

  // it('multicastrange ', () => {
  //   spyOn(service, 'getMultipleRange').and.returnValue(of(multicastRange));
  //   expect(component.subscriberList[4]).toEqual(multicastRange[0]);

  // });

  // it('multicastvlan ', () => {

  //   spyOn(service, 'getMultiplecastVlan').and.returnValue(of(multicastVlan));
  //   expect(component.subscriberList[5]).toEqual(multicastVlan[0]);

  // });
 


});






