import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { environment } from 'src/environments/environment';
import { of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { PrimaryNetworkExperienceIqComponent } from './primary-network-experience-iq.component';
import { DataServiceService } from 'src/app/support/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { categoryChangeMock, closeDatePickerMock, getAllCategoryMock, getDnsMock, getProfileAppListMock, getProfileAppListMock1, globalObjMock, selectedAppMock, sessionmock, updateAllowForAppMock, updateAllowForMock, updateAppMock, updateWebUrlMock, updateWebUrlRespMock, webAppListMock, websiteMock } from 'src/assets/mockdata/support/edge-suites/experience-iq';
import { ExperianceIQService } from '../../shared/service/experiance-iq.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { SCOPES } from 'src/assets/mockdata/shared/services/scopes';
import { getAppList } from '../../shared/service/endPoints';
describe('PrimaryNetworkExperienceIqComponent', () => {
  let component: PrimaryNetworkExperienceIqComponent;
  let fixture: ComponentFixture<PrimaryNetworkExperienceIqComponent>;
  let translateService: TranslateService;
  let experianceIQService: ExperianceIQService;
  let ssoService: SsoAuthService;
  let modalService: NgbModal;
  let dialogService: NgbModal;
  let dataService: DataServiceService;
  let dateUtils: DateUtilsService;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimaryNetworkExperienceIqComponent],
      imports: [RouterTestingModule, HttpClientModule, HttpClientTestingModule, NgSelectModule, CalendarModule, FormsModule, ReactiveFormsModule],
      providers: [DateUtilsService, SsoAuthService, NgbModal, DataServiceService, TranslateService]
    })
      .compileComponents()
      .then(() => {
        translateService = TestBed.inject(TranslateService);
        experianceIQService = TestBed.inject(ExperianceIQService);
        ssoService = TestBed.inject(SsoAuthService);
        modalService = TestBed.inject(NgbModal);
        dialogService = TestBed.inject(NgbModal);
        dataService = TestBed.inject(DataServiceService);
        dateUtils = TestBed.inject(DateUtilsService);
        fixture = TestBed.createComponent(PrimaryNetworkExperienceIqComponent);
        component = fixture.componentInstance;
        localStorage.setItem('calix.scopes', JSON.stringify(SCOPES));
        sessionStorage.setItem("calix.deviceData", JSON.stringify(sessionmock))
        ssoService.setActionLog('CSC', 'pageHit', 'ExperianceIQ', '/support/application/experienceIQ', 'ExperianceIQ page loaded');
        component.orgId = 102;
        component.selectedContentFilter = "N";
        // component.showMenu = true;

        // component.sectionToShow = 'alert';
        // component.sectionToShow = 'people';
        // component.sectionToShow = 'priorities';
        // component.sectionToShow = 'restrictions';
        // component.sectionToShow = 'restrictions';
        fixture.detectChanges();
      })
  });

  it('should ngOnInit', () => {
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    environment.VALIDATE_SCOPE = "true"
    expect(component).toBeTruthy();
  });
  it('should setContentFilter', () => {
    component.softwareVrsion = 23.3;
    component.isSmbOnboarded = true;
    component.setContentFilter();
    expect(component).toBeTruthy();
  });
  it('getScopes', () => {
    environment.VALIDATE_SCOPE = 'true';
    component.getScopes();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('experience iq restrictions', () => {
    spyOn(component, 'getiCloudMain').and.callThrough();
    // component.sectionToShow = 'restrictions';
    // component.availability = { defaultRestriction: true };
    fixture.detectChanges();
    component.getRestriction();
    expect(component.profiledRestriction).toBe(false);
    expect(component.getiCloudMain).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })
  it('getProfileCategoryListMain', () => {
    spyOn(experianceIQService, 'getAllCategory').and.returnValue(of(getAllCategoryMock));
    component.getProfileCategoryListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('getProfileCategoryListMain error', () => {
    spyOn(experianceIQService, 'getAllCategory').and.returnValue(throwError(errorStatus401));
    component.getProfileCategoryListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  // it('onCalenderSelected', () => {
  //   component.onCalenderSelected(new Date(), 10);
  //   fixture.detectChanges();
  //   expect(component).toBeTruthy();
  // });
  it('onContentFilterChangeMain', () => {
    spyOn(experianceIQService, 'updateContentFilterMain').and.returnValue(of({}));
    component.onContentFilterChangeMain();
    component.getProfileCategoryListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onContentFilterChangeMain error', () => {
    spyOn(experianceIQService, 'updateContentFilterMain').and.returnValue(throwError(errorStatus401));
    component.onContentFilterChangeMain();
    component.getProfileCategoryListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('selectedItemMain error', () => {
    spyOn(experianceIQService, 'editAppMain').and.returnValue(of({}));
    component.selectedItemMain(selectedAppMock);
    component.getProfileCategoryListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('addWebsiteMain', () => {
    component.websiteModel = 'www.google.com';
    spyOn(experianceIQService, 'addWebAddressMain').and.returnValue(of(websiteMock));
    component.addWebsiteMain();
    component.getProfileWebListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('addWebsiteMain error', () => {
    component.websiteModel = 'www.google.com';
    spyOn(experianceIQService, 'addWebAddressMain').and.returnValue(throwError(errorStatus401));
    component.addWebsiteMain();
    component.getProfileWebListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('addWebsiteMain', () => {
    spyOn(experianceIQService, 'addWebAddressMain').and.returnValue(of(websiteMock));
    component.addWebsiteMain();
    component.getProfileWebListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('selectedItemMain error', () => {
    spyOn(experianceIQService, 'editAppMain').and.returnValue(throwError(errorStatus401));
    component.selectedItemMain(selectedAppMock);
    component.getProfileCategoryListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('openModal', () => {
    let content = fixture.debugElement.nativeElement.querySelector("#deleteAppWeb");
    component.openModal(content, "delete");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('hideError', () => {
    component.hideError();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('updateYoutubeRestrictionStatusMain', () => {
    spyOn(experianceIQService, 'updateYotubeRestrictionStatusMain').and.returnValue(of({}));
    component.updateYoutubeRestrictionStatusMain();
    component.getYoutubeRestrictionStatusMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('getYoutubeRestrictionStatusMain', () => {
    spyOn(experianceIQService, 'getYotubeRestrictionStatusMain').and.returnValue(of(false));
    component.getYoutubeRestrictionStatusMain();
    fixture.detectChanges();
  });

  it('getYoutubeRestrictionStatusMain', () => {
    spyOn(experianceIQService, 'getYotubeRestrictionStatusMain').and.returnValue(throwError(errorStatus401));
    component.getYoutubeRestrictionStatusMain();
    fixture.detectChanges();
  });
  it('updateYoutubeRestrictionStatusMain Error', () => {
    spyOn(experianceIQService, 'updateYotubeRestrictionStatusMain').and.returnValue(throwError(errorStatus401));
    component.updateYoutubeRestrictionStatusMain();
    component.getYoutubeRestrictionStatusMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('updateSafeSearchStatusMain', () => {
    spyOn(experianceIQService, 'updateSafeSearchStatusMain').and.returnValue(of({}));
    component.updateSafeSearchStatusMain();
    component.getProfileSafeSearchStatusMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('updateiCloudMain', () => {
    spyOn(experianceIQService, 'setICloudMain').and.returnValue(of(getDnsMock));
    component.updateiCloudMain();
    fixture.detectChanges();
  });

  it('updateiCloudMain error', () => {
    spyOn(experianceIQService, 'setICloudMain').and.returnValue(throwError(errorStatus401));
    component.updateiCloudMain();
    fixture.detectChanges();
  });
  it('updateDnsStatusMain', () => {
    spyOn(experianceIQService, 'setDnsMain').and.returnValue(of({}));
    component.updateDnsStatusMain();
    fixture.detectChanges();
  });

  it('updateDnsStatusMain', () => {
    spyOn(experianceIQService, 'setDnsMain').and.returnValue(throwError(errorStatus401));
    component.updateDnsStatusMain();
    fixture.detectChanges();
  });
  it('getProfileSafeSearchStatusMain', () => {
    spyOn(experianceIQService, 'getSafeSearchStatusMain').and.returnValue(of(false));
    component.getProfileSafeSearchStatusMain();
    fixture.detectChanges();
  });

  it('getProfileSafeSearchStatusMain', () => {
    spyOn(experianceIQService, 'getSafeSearchStatusMain').and.returnValue(throwError(errorStatus401));
    component.getProfileSafeSearchStatusMain();
    fixture.detectChanges();
  });
  it('updateSafeSearchStatusMain Errror', () => {
    spyOn(experianceIQService, 'updateSafeSearchStatusMain').and.returnValue(throwError(errorStatus401));
    component.updateSafeSearchStatusMain();
    component.getProfileSafeSearchStatusMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('onCatergoryChangeMain', () => {
    spyOn(experianceIQService, 'editCategoyMain').and.returnValue(of({}));
    component.onCatergoryChangeMain(categoryChangeMock);
    component.getProfileCategoryListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onCatergoryChangeMain Error', () => {
    spyOn(experianceIQService, 'editCategoyMain').and.returnValue(throwError(errorStatus401));
    component.onCatergoryChangeMain(categoryChangeMock);
    component.getProfileCategoryListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('getProfileAppListMain', () => {
    spyOn(experianceIQService, 'getAppListMain').and.returnValue(of(getProfileAppListMock));
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('getProfileAppListMain Error', () => {
    spyOn(experianceIQService, 'getAppListMain').and.returnValue(of(getProfileAppListMock1));
    component.getProfileAppListMain();
    component.selectedApps = getProfileAppListMock1;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('getProfileAppListMain', () => {
    spyOn(experianceIQService, 'getAppListMain').and.returnValue(throwError(errorStatus401));
    component.getProfileAppListMain();
    fixture.detectChanges();
  });
  it('getProfileWebListMain', () => {
    spyOn(experianceIQService, 'getProfileWebUrlMain').and.returnValue(of(webAppListMock));
    component.getProfileWebListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getProfileWebListMain Error', () => {
    spyOn(experianceIQService, 'getProfileWebUrlMain').and.returnValue(throwError(errorStatus401));
    component.getProfileWebListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('getDnsMain', () => {
    spyOn(experianceIQService, 'getDnsMain').and.returnValue(of(getDnsMock));
    component.getDnsMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getDnsMain error', () => {
    spyOn(experianceIQService, 'getDnsMain').and.returnValue(throwError(errorStatus401));
    component.getDnsMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getiCloudMain', () => {
    spyOn(experianceIQService, 'getICloudMain').and.returnValue(of(getDnsMock));
    component.getiCloudMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getiCloudMain error', () => {
    spyOn(experianceIQService, 'getICloudMain').and.returnValue(throwError(errorStatus401));
    component.getiCloudMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('removeWebsiteMain', () => {
    spyOn(experianceIQService, 'removeWebUrlMain').and.returnValue(of({}));
    component.removeWebsiteMain("9cdd2b0d-f098-4662-9b39-d0dede450c0c");
    component.getProfileWebListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('removeWebsiteMain error', () => {
    spyOn(experianceIQService, 'removeWebUrlMain').and.returnValue(throwError(errorStatus401));
    component.removeWebsiteMain("9cdd2b0d-f098-4662-9b39-d0dede450c0c");
    component.getProfileWebListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('removeProfileAppMain', () => {
    spyOn(experianceIQService, 'deleteAppByProfileAndAppIdMain').and.returnValue(of({}));
    component.removeProfileAppMain(789);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('removeProfileAppMain error', () => {
    spyOn(experianceIQService, 'deleteAppByProfileAndAppIdMain').and.returnValue(throwError(errorStatus401));
    component.removeProfileAppMain(789);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('updateWebUrlMain', () => {
    spyOn(experianceIQService, 'updateWebAddressMain').and.returnValue(of(updateWebUrlRespMock));
    component.updateWebUrlMain(updateWebUrlMock);
    component.getProfileWebListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateWebUrlMain error', () => {
    spyOn(experianceIQService, 'updateWebAddressMain').and.returnValue(throwError(errorStatus401));
    component.updateWebUrlMain(updateWebUrlMock);
    component.getProfileWebListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('updateAppMain', () => {
    spyOn(experianceIQService, 'editAppMain').and.returnValue(of({}));
    component.updateAppMain(updateAppMock, 0);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateAppMain', () => {
    spyOn(experianceIQService, 'editAppMain').and.returnValue(throwError(errorStatus401));
    component.updateAppMain(updateAppMock, 0);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  // it('onAllowForTimeSelected', () => {
  //   component.customTimeUsage[0] = new Date();
  //   component.onAllowForTimeSelected(new Event('onBlur'), new Date(), 0);
  //   fixture.detectChanges();
  //   expect(component).toBeTruthy();
  // });
  it('closeDatePicker', () => {
    component.customTimeUsage = [new Date()];
    component.datePicker = new Date();
    spyOn(experianceIQService, 'editAppByProfileId').and.returnValue(of({}));
    component.closeDatePicker(closeDatePickerMock, 0);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('closeDatePicker error', () => {
    component.customTimeUsage = [new Date()];
    component.datePicker = new Date();
    spyOn(experianceIQService, 'editAppByProfileId').and.returnValue(throwError(errorStatus401));
    component.closeDatePicker(closeDatePickerMock, 0);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  // it('updateAllowForAppMain error', () => {
  //   component.customTimeUsage = [new Date()];
  //   spyOn(experianceIQService, 'editAppMain').and.returnValue(throwError(errorStatus401));
  //   component.updateAllowForAppMain(updateAllowForAppMock, 0);
  //   component.getProfileAppListMain();
  //   fixture.detectChanges();
  //   expect(component).toBeTruthy();
  // });

  it('closeDatePicker', () => {
    component.customTimeUsage = [new Date()];
    component.datePicker = new Date();
    spyOn(experianceIQService, 'editAppByProfileId').and.returnValue(of({}));
    component.closeDatePicker(closeDatePickerMock, 0);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  // it('allowForCalenderClicked', () => {
  //   component.customTimeUsage[0] = new Date();
  //   component.allowForCalenderClicked(0);
  //   fixture.detectChanges();
  //   expect(component).toBeTruthy();
  // });
  // it('closeDatePickerMain', () => {
  //   component.customTimeUsage = [new Date()];
  //   component.datePicker = new Date();
  //   spyOn(experianceIQService, 'editAppMain').and.returnValue(of({}));
  //   component.closeDatePickerMain(closeDatePickerMock, 0);
  //   component.getProfileAppListMain();
  //   fixture.detectChanges();
  //   expect(component).toBeTruthy();
  // });

  // it('closeDatePickerMain error', () => {
  //   component.customTimeUsage = [new Date()];
  //   component.datePicker = new Date();
  //   spyOn(experianceIQService, 'editAppMain').and.returnValue(throwError(errorStatus401));
  //   component.closeDatePickerMain(closeDatePickerMock, 0);
  //   component.getProfileAppListMain();
  //   fixture.detectChanges();
  //   expect(component).toBeTruthy();
  // });
  // it('updateAllowForCheckedMain', () => {
  //   component.customTimeUsage = [new Date()];
  //   component.selectedApps.apps = getProfileAppListMock.apps;
  //   component.updateAllowForCheckedMain(updateAllowForMock, 0, { target: { value: 'calix' } });
  //   component.updateAllowForAppMain(updateAllowForMock, 0);
  //   fixture.detectChanges();
  // });
  it('typeaheadbasickeyup', () => {
    component.typeaheadbasickeyup(new Event('click'));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('setDeleteWebApp', () => {
    component.setDeleteWebApp("web", '5b4fdc02-113e-4e95-a78a-853e17a21c4a', true);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('deleteWebApp', () => {
    component.deleteWebApp();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('deleteWebApp', () => {
    component.gloObj = globalObjMock;
    component.deleteWebApp();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('showAddWeb', () => {
    component.showAddWeb();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


});
