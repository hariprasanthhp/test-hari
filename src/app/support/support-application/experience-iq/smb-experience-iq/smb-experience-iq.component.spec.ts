import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SmbExperienceIqComponent } from './smb-experience-iq.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { environment } from 'src/environments/environment';
import { of, throwError } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from 'src/app/support/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { categoryChangeMock, closeDatePickerMock, getAllCategoryMock, getDnsMock, getProfileAppListMock, getProfileAppListMock1, globalObjMock, roleprofile, roleProfileList, selectedAppMock, sessionmock, updateAllowForAppMock, updateAllowForMock, updateAppMock, updateWebUrlMock, updateWebUrlRespMock, webAppListMock, websiteMock } from 'src/assets/mockdata/support/edge-suites/experience-iq';
import { EnglishJSON } from 'src/assets/language/english.service';
import { SmbExperianceIQService } from '../../shared/service/smb-experiance-iq.service';
import { PrimaryNetworkExperienceIqComponent } from '../primary-network-experience-iq/primary-network-experience-iq.component';
import { SCOPES } from 'src/assets/mockdata/shared/services/scopes';
import { Apps } from '../../shared/models/search-app.model';

describe('SmbExperienceIqComponent', () => {
  let component: SmbExperienceIqComponent;
  let fixture: ComponentFixture<SmbExperienceIqComponent>;
  let translateService: TranslateService;
  let smbExperianceIQService: SmbExperianceIQService;
  let ssoService: SsoAuthService;
  let modalService: NgbModal;
  let dialogService: NgbModal;
  let dataService: DataServiceService;
  let dateUtils: DateUtilsService;
  let http: HttpClient;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmbExperienceIqComponent, PrimaryNetworkExperienceIqComponent],
      imports: [RouterTestingModule, HttpClientModule, HttpClientTestingModule, NgSelectModule, CalendarModule, FormsModule, ReactiveFormsModule],
      providers: [DateUtilsService, SsoAuthService
        , NgbModal, DataServiceService, TranslateService, SmbExperianceIQService]
    })
      .compileComponents()
      .then(() => {
        translateService = TestBed.inject(TranslateService);
        smbExperianceIQService = TestBed.inject(SmbExperianceIQService);
        ssoService = TestBed.inject(SsoAuthService);
        modalService = TestBed.inject(NgbModal);
        dialogService = TestBed.inject(NgbModal);
        dataService = TestBed.inject(DataServiceService);
        dateUtils = TestBed.inject(DateUtilsService);
        fixture = TestBed.createComponent(SmbExperienceIqComponent);
        component = fixture.componentInstance;
        localStorage.setItem('calix.scopes', JSON.stringify(SCOPES));
        sessionStorage.setItem("calix.deviceData", JSON.stringify(sessionmock))
        ssoService.setActionLog('CSC', 'pageHit', 'ExperianceIQ', '/support/application/experienceIQ', 'ExperianceIQ page loaded');
        component.selectedContentFilter = "N";
        component.profileId = "123"
        fixture.detectChanges();
      })
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should ngOnInit', () => {
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    environment.VALIDATE_SCOPE = "true"
    expect(component).toBeTruthy();
  });
  it('getScopes', () => {
    environment.VALIDATE_SCOPE = 'true';
    component.getScopes();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('typeaheadbasickeyup', () => {
    component.typeaheadbasickeyup(new Event('click'));
    component.model = ""
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('selectedItemMain ', () => {
    spyOn(smbExperianceIQService, 'editAppMain').and.returnValue(of({}));
    component.selectedItemMain(selectedAppMock);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('selectedItemMain error', () => {
    spyOn(smbExperianceIQService, 'editAppMain').and.returnValue(throwError(errorStatus401));
    component.selectedItemMain(selectedAppMock);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('getRoleProfileList', () => {
    component.websiteModel = 'www.google.com';
    spyOn(smbExperianceIQService, 'getRoleProfileList').and.returnValue(of(roleProfileList));
    component.getRoleProfileList(1);
    component.setRestrictionTab("2");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('getRoleProfileList', () => {
    component.websiteModel = 'www.google.com';
    spyOn(smbExperianceIQService, 'getRoleProfileList').and.returnValue(throwError(errorStatus401));
    component.getRoleProfileList(1);
    component.setRestrictionTab("2");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('addWebsiteMain', () => {
    component.websiteModel = 'www.google.com';
    spyOn(smbExperianceIQService, 'addWebAddressMain').and.returnValue(of(websiteMock));
    component.addWebsiteMain();
    component.getProfileWebListMain("2");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('addWebsiteMain error', () => {
    component.websiteModel = 'www.google.com';
    spyOn(smbExperianceIQService, 'addWebAddressMain').and.returnValue(throwError(errorStatus401));
    component.addWebsiteMain();
    component.getProfileWebListMain("2");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('addWebsiteMain', () => {
    spyOn(smbExperianceIQService, 'addWebAddressMain').and.returnValue(of(websiteMock));
    component.addWebsiteMain();
    component.getProfileWebListMain("2");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('getProfileAppListMain', () => {
    spyOn(smbExperianceIQService, 'getAppListMain').and.returnValue(of(getProfileAppListMock));
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('getProfileAppListMain ', () => {
    spyOn(smbExperianceIQService, 'getAppListMain').and.returnValue(of(getProfileAppListMock1));
    component.getProfileAppListMain();
    component.selectedApps = getProfileAppListMock1;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('getProfileAppListMain Error', () => {
    spyOn(smbExperianceIQService, 'getAppListMain').and.returnValue(throwError(errorStatus401));
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('getProfileWebListMain', () => {
    spyOn(smbExperianceIQService, 'getWebList').and.returnValue(of(webAppListMock));
    component.getProfileWebListMain("2");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getProfileWebListMain Error', () => {
    spyOn(smbExperianceIQService, 'getWebList').and.returnValue(throwError(errorStatus401));
    component.getProfileWebListMain("2");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('showAddWeb', () => {
    component.showAddWeb();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('openModal', () => {
    let content = fixture.debugElement.nativeElement.querySelector("#deleteAppWeb");
    component.openModal(content, "delete");
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
  it('removeWebsiteMain', () => {
    spyOn(smbExperianceIQService, 'removeWebUrlMain').and.returnValue(of({}));
    component.removeWebsiteMain("9cdd2b0d-f098-4662-9b39-d0dede450c0c");
    component.getProfileWebListMain("2");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('removeWebsiteMain error', () => {
    spyOn(smbExperianceIQService, 'removeWebUrlMain').and.returnValue(throwError(errorStatus401));
    component.removeWebsiteMain("9cdd2b0d-f098-4662-9b39-d0dede450c0c");
    component.getProfileWebListMain("2");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('removeProfileAppMain', () => {
    spyOn(smbExperianceIQService, 'deleteAppByProfileAndAppIdMain').and.returnValue(of({}));
    component.removeProfileAppMain(789);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('removeProfileAppMain error', () => {
    spyOn(smbExperianceIQService, 'deleteAppByProfileAndAppIdMain').and.returnValue(throwError(errorStatus401));
    component.removeProfileAppMain(789);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('updateAllowForCheckedMain', () => {
    component.customTimeUsage = [new Date()];
    component.updateAllowForCheckedMain(updateAllowForMock, 0, { target: { value: 'calix' } });
    component.updateAllowForAppMain(updateAllowForMock, 0);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('closeDatePicker', () => {
    component.customTimeUsage = [new Date()];
    component.datePicker = new Date();
    spyOn(smbExperianceIQService, 'editAppMain').and.returnValue(of({}));
    component.closeDatePickerMain(closeDatePickerMock, 0);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('onAllowForTimeSelected', () => {
    component.customTimeUsage[0] = new Date();
    component.onAllowForTimeSelected(new Event('onBlur'), new Date(), 0);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('allowForCalenderClicked', () => {
    component.customTimeUsage[0] = new Date();
    component.allowForCalenderClicked(0);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('onCalenderSelected', () => {
    component.onCalenderSelected(new Date(), 10);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('closeDatePickerMain', () => {
    component.customTimeUsage = [new Date()];
    component.datePicker = new Date();
    spyOn(smbExperianceIQService, 'editAppMain').and.returnValue(of({}));
    component.closeDatePickerMain(closeDatePickerMock, 0);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('closeDatePickerMain error', () => {
    component.customTimeUsage = [new Date()];
    component.datePicker = new Date();
    spyOn(smbExperianceIQService, 'editAppMain').and.returnValue(throwError(errorStatus401));
    component.closeDatePickerMain(closeDatePickerMock, 0);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('updateAllowForCheckedMain', () => {
    component.customTimeUsage = [new Date()];
    component.updateAllowForCheckedMain(updateAllowForMock, 0, { target: { value: 'calix' } });
    component.updateAllowForAppMain(updateAllowForMock, 0);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('updateAllowForAppMain ', () => {
    component.customTimeUsage = [new Date()];
    spyOn(smbExperianceIQService, 'editAppMain').and.returnValue(of({}));
    component.updateAllowForAppMain(updateAllowForAppMock, 0);
    component.setRestrictionTab(2);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('updateAllowForAppMain error', () => {
    component.customTimeUsage = [new Date()];
    spyOn(smbExperianceIQService, 'editAppMain').and.returnValue(throwError(errorStatus401));
    component.updateAllowForAppMain(updateAllowForAppMock, 0);
    component.setRestrictionTab(2);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateRoleProfile ', () => {
    component.customTimeUsage = [new Date()];
    component.selectedApps = getProfileAppListMock1;
    component.webList = webAppListMock;
    component.resSettings = roleprofile;
    spyOn(smbExperianceIQService, 'updateRoleProfile').and.returnValue(of({ roleprofile }));
    component.updateRoleProfile(true);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('updateRoleProfile error', () => {
    component.customTimeUsage = [new Date()];
    component.selectedApps = getProfileAppListMock1;
    component.webList = webAppListMock;
    component.resSettings = roleprofile;
    spyOn(smbExperianceIQService, 'updateRoleProfile').and.returnValue(throwError(errorStatus401));
    component.updateRoleProfile(true);

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('getResSettingsById', () => {
    component.allRestrictionsSettings = roleProfileList?.datas;
    component.resSettings = roleProfileList?.datas;
    spyOn(smbExperianceIQService, 'getResSettingsById').and.returnValue(of({ roleprofile }));
    component.setRestrictionTab("4");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getResSettingsById', () => {
    component.allRestrictionsSettings = roleProfileList?.datas;
    component.resSettings = roleProfileList?.datas;
    spyOn(smbExperianceIQService, 'getResSettingsById').and.returnValue(throwError(errorStatus401));
    component.setRestrictionTab(2);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  // it('searchAppMain', () => {
  //   const obsUsingCreate = Observable.create(observer => {
  //     observer.next('FaceBook')
  //     observer.complete()
  //   });
  //   const arraySource:Apps[] = of(new Apps())
  //   let apps: Apps[] = [];
  //   spyOn(smbExperianceIQService, 'searchAppMain').and.returnValue(of({ arraySource }));
  //   component.searchAppMain(obsUsingCreate);
  //   fixture.detectChanges();
  //   expect(component).toBeTruthy();
  // });



});
