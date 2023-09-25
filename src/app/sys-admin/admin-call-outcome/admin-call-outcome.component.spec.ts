import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { addDetailsOptions, addStatusDetails, callOutComeStatus, detailsOptions, editData, enableCategories, statusTypes, updateStatusDetails } from 'src/assets/mockdata/admin/calloutcome/calloutcome.data';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { SCOPES } from 'src/assets/mockdata/shared/services/scopes';
import { environment } from 'src/environments/environment';
import { CallOutComeService } from '../services/call-out-come.service';
import { CommonService } from '../services/common.service';

import { AdminCallOutcomeComponent } from './admin-call-outcome.component';

describe('AdminCallOutcomeComponent', () => {
  let component: AdminCallOutcomeComponent;
  let fixture: ComponentFixture<AdminCallOutcomeComponent>;
  let languageService: TranslateService;
  let service: CallOutComeService;

  let router: Router;
  const data = {

    "uuid": "5681ccc0-42b6-4603-a0fd-b4a94a5e28f5",
    "orgId": 10009,
    "name": "Account Inquiry",
    "ctime": "2021-10-06T12:30:33.000+0000",
    "mtime": "2022-08-05T13:34:10.000+0000",
    "selection": "single",
    "categories": {
      "Customer on Phone": {
        "subcategories": null,
        "selection": "single"
      },
      "Customer in-person": {
        "subcategories": null,
        "selection": "single"
      },
      "Customer not present": {
        "subcategories": null,
        "selection": "single"
      },
      "Call center escalation": {
        "subcategories": null,
        "selection": "single"
      }
    }
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCallOutcomeComponent],
      imports: [
        HttpClientTestingModule
        , RouterTestingModule, FormsModule
      ],
      providers: [
        CommonService, SsoAuthService, CallOutComeService, NgbModal, TranslateService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCallOutcomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    service = TestBed.inject(CallOutComeService)
    languageService = TestBed.inject(TranslateService)
    component.isNewStatus = false;
    fixture.detectChanges();
    localStorage.setItem('calix.scopes', JSON.stringify(SCOPES));
  });

  
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  // it('should initialize onInit()', () => {
  //   let eng = new EnglishJSON;
  //   languageService.selectedLanguage.next(of(eng));
  //   environment.VALIDATE_SCOPE = "true";
  //   spyOn(component, 'getScopes').and.callThrough()
  //   spyOn(component, 'getStatuses').and.callThrough()
  //   component.ngOnInit()
  //   expect(component.getScopes).toHaveBeenCalled()
  //   expect(component.getScopes).toHaveBeenCalledTimes(1)
  //   expect(component.getStatuses).toHaveBeenCalled()
  //   expect(component.getStatuses).toHaveBeenCalledTimes(1)
  // });

  // it('should getStatus details', () => {
  //   spyOn(service, 'GetStatuses').and.returnValue(of(callOutComeStatus))
  //   spyOn(component, 'getStatuses').and.callThrough()
  //   component.getStatuses()
  //   expect(component.callOutComeStatuses).toBeTruthy('value is not matched')
  //   expect(component.callOutComeStatuses).toBe(callOutComeStatus, 'value mimatched')
  //   expect(component.getStatuses).toHaveBeenCalled()
  //   expect(component.getStatuses).toHaveBeenCalledTimes(1)
  // })

  // it('should delete Status Details', () => {
  //   spyOn(service, 'DeleteStatus').and.returnValue(of([]))
  //   component.deleteStatus(data)
  //   expect(component.success).toBeTruthy()
  //   expect(component.success).toBe(true)
  // });

  // it('should update Status Details', () => {
  //   component.addOrUpdateStatus = '';
  //   component.callOutComeData.categories = enableCategories
  //   spyOn(service, 'UpdateStatus').and.returnValue(of(updateStatusDetails))
  //   service.UpdateStatus(data, 'other')
  //   component.saveStatus()
  //   expect(component.successInfo).toBeTruthy()
  //   expect(component.successInfo).toBe('Successfully Updated')
  //   expect(component.isNewStatus).toBeFalse()
  // })
  // it('should add Status Details', () => {
  //   component.addOrUpdateStatus = 'AddStatus';
  //   spyOn(service, 'CreateStatus').and.returnValue(of(addStatusDetails))
  //   service.CreateStatus(data)
  //   component.saveStatus()
  //   expect(component.successInfo).toBeTruthy()
  //   expect(component.successInfo).toBe('Successfully Created')
  //   expect(component.isNewStatus).toBeFalse()
  // })

  // it('should call editStatus Details', () => {
  //   spyOn(component, 'editStatus').and.callThrough()
  //   component.editStatus(data, true)
  //   expect(component.editStatus).toHaveBeenCalled()
  //   expect(component.editStatus).toHaveBeenCalledTimes(1)
  // })

  // it('should load status types details', () => {
  //   spyOn(service, 'loadstatustypes').and.returnValue(of(statusTypes))
  //   spyOn(component, 'loadstatustypes').and.callThrough()
  //   component.loadstatustypes()
  //   expect(component.statusTypes?.length).toBe(3, "Length is wrong");
  //   expect(component.loadstatustypes).toHaveBeenCalled()
  //   expect(component.loadstatustypes).toHaveBeenCalledTimes(1)
  // })
  // it('should new status', () => {
  //   spyOn(component, 'newStatus').and.callThrough()
  //   component.isNewStatus = false;
  //   // const openBtn = fixture.nativeElement.querySelector('#New-Status');
  //   // openBtn.click();
  //   component.newStatus(true);
  //   expect(component.newStatus).toHaveBeenCalled()
  // });
  // it('should enableCategoriesForStatus if case', () => {
  //   spyOn(component, 'enableCategoriesForStatus').and.callThrough()
  //   component.callOutComeData.selection = 'multiple';
  //   component.callOutComeData.categories = enableCategories
  //   component.enableCategoriesForStatus(true);
  //   expect(component.enableCategoriesForStatus).toHaveBeenCalled()
  // });
  // it('should enableCategoriesForStatus else case', () => {
  //   spyOn(component, 'enableCategoriesForStatus').and.callThrough()
  //   component.callOutComeData.selection = 'single';
  //   component.callOutComeData.categories = enableCategories
  //   component.enableCategoriesForStatus(false);
  //   expect(component.enableCategoriesForStatus).toHaveBeenCalled()
  // });
  // it('should add details options if case', () => {
  //   spyOn(component, 'addDetailsOptions').and.callThrough()
  //   component.callOutComeData.selection = 'multiple';
  //   component.addDetailsOptions(detailsOptions);
  //   expect(component.addDetailsOptions).toHaveBeenCalled()
  // });
  // it('should add details options else case', () => {
  //   spyOn(component, 'addDetailsOptions').and.callThrough()
  //   component.callOutComeData.selection = 'single';
  //   component.addDetailsOptions(detailsOptions);
  //   expect(component.addDetailsOptions).toHaveBeenCalled()
  // });
  // it('should onBlurEvent if case', () => {
  //   spyOn(component, 'onBlurEvent').and.callThrough()
  //   component.callOutComeData.selection = 'multiple';
  //   component.onBlurEvent(detailsOptions);
  //   expect(component.onBlurEvent).toHaveBeenCalled()
  // });
  // it('should onBlurEvent else case', () => {
  //   spyOn(component, 'onBlurEvent').and.callThrough()
  //   component.callOutComeData.selection = 'single';
  //   component.onBlurEvent(detailsOptions);
  //   expect(component.onBlurEvent).toHaveBeenCalled()
  // });
  // it('pageErrorHandle function if case', () => {
  //   spyOn(component, 'pageModalErrorHandle').and.callThrough();
  //   component.pageModalErrorHandle(errorStatus401);
  //   expect(component.pageModalErrorHandle).toHaveBeenCalled();
  // });
  // it('pageErrorHandle function else case', () => {
  //   spyOn(component, 'pageModalErrorHandle').and.callThrough();
  //   component.pageModalErrorHandle(errorStatus500);
  //   expect(component.pageModalErrorHandle).toHaveBeenCalled();
  // });
  // it('should changeOption', () => {
  //   var e = {
  //     target: "multiple"
  //   }

  //   spyOn(component, 'changeOption').and.callThrough();
  //   component.editData = editData;
  //   component.addOrUpdateStatus = "UpdateStatus";
  //   component.commonMethod(editData);
  //   component.changeOption(e);
  //   expect(component.changeOption).toHaveBeenCalled();
  // });
  // it('should changeOption', () => {
  //   var e = {
  //     target: "multiple"
  //   }

  //   spyOn(component, 'addCategory').and.callThrough();
  //   let obj = {
  //     statusForCategories: true,
  //     subCategories: [],
  //     categoryName: "",
  //     subCategoryName: '',
  //     enableAddDetailsOption: true,
  //   };
  //   component.addCategory();
  //   expect(component.addCategory).toHaveBeenCalled();
  // });

  // it('should check timer', () => {
  //   spyOn(service, 'getOutcomeTimer').and.returnValue(of({ abortTimer: 30 }));
  //   component.getTimer();
  //   component.updateTimer();
  //   expect(service.updateOutcomeTimer).toHaveBeenCalled();

  // })


});
