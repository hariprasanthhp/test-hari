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
import { DataServiceService } from '../../data.service';
import { ExperianceIQService } from '../shared/service/experiance-iq.service';
import { ProtectIqService } from '../shared/service/protect-iq.service';

import { ExperienceIqComponent } from './experience-iq.component';

import {
  subscribedstatus, datamock, alertmock, arloaccountmock, onboardmock, scopesmock, FeatureAvailabilitymock,
  qoslistmock, deviceeditmock, categorydatamock, scheduleDataMock, eventMock, activateMock, nameMock, nameMock1,
  defaultProfileMock, checkBoxEventMock, devicedataMock, profileMock, deleteProfileMock, service_enable_disable,
  peopleMock, profileObjMock, profileObjMock1, deletePeopleMock, selectedAppMock, onSubmitUserMock, stationMock, dayNumberMock,
  summery_data1, removeProfileDevice, getAllCategoryMock, categoryChangeMock, getProfileAppListMock, getProfileAppListMock1, webAppListMock,
  featureListMock, getDnsMock, websiteMock, updateWebUrlMock, updateWebUrlRespMock, updateAppMock, updateAllowForAppMock, closeDatePickerMock, updateAllowForMock, editSpecificDayMock, endBedTimeMock, getProfileUsageMock, checkSameTimeMock, checkSameTime1Mock, fetchTimeLimitsDataMock, remoceProfileDayMock, addDeviceSelectedDevice, WFHMock, globalObjMock, eventMock1
} from 'src/assets/mockdata/support/edge-suites/experience-iq';
import { AlertTypeConverterPipe } from '../../shared/custom-pipes/exp-alert-type.pipe';
import { priormock } from 'src/assets/mockdata/support/edge-suites/experience-iq';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExperianceIQStatusPipe } from '../../shared/custom-pipes/experianceiq-status-pipe';
import { DeviceImagePipe } from '../../shared/custom-pipes/device-image.pipe';
import { DeviceStatusPipe } from '../../shared/custom-pipes/device-status.pipe';
import { PatternValidatorDirectiveDirective } from '../../netops-management/shared/custome-directive/pattern-validator-directive.directive';
import { DummyComponent } from '../../netops-management/operations/dummy/dummy.component';
import { sessionmock } from 'src/assets/mockdata/support/edge-suites/experience-iq';
import { summery_data } from 'src/assets/mockdata/support/edge-suites/experience-iq';
import { list } from 'src/assets/mockdata/support/edge-suites/experience-iq';
import { categorylistmock } from 'src/assets/mockdata/support/edge-suites/experience-iq';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UsageEnum } from '../shared/models/usage-model';
import { SmbExperienceIqComponent } from './smb-experience-iq/smb-experience-iq.component';
import { PrimaryNetworkExperienceIqComponent } from './primary-network-experience-iq/primary-network-experience-iq.component';

describe('ExperienceIqComponent', () => {
  let component: ExperienceIqComponent;
  let fixture: ComponentFixture<ExperienceIqComponent>;
  let translateService: TranslateService;
  let experianceIQService: ExperianceIQService;
  let ssoService: SsoAuthService;
  let modalService: NgbModal;
  let dialogService: NgbModal;
  let protectIqservices: ProtectIqService;
  let dataService: DataServiceService;
  let dateUtils: DateUtilsService;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ExperienceIqComponent,
        AlertTypeConverterPipe,
        ExperianceIQStatusPipe,
        DeviceImagePipe,
        DeviceStatusPipe,
        PatternValidatorDirectiveDirective,
        DummyComponent,
        SmbExperienceIqComponent,
        PrimaryNetworkExperienceIqComponent
      ],
      imports: [RouterTestingModule, DragDropModule, HttpClientModule, HttpClientTestingModule, NgSelectModule, CalendarModule, FormsModule, ReactiveFormsModule],
      providers: [ExperianceIQService, DateUtilsService, SsoAuthService, NgbModal, ProtectIqService, DataServiceService, TranslateService]

    })
      .compileComponents()
      .then(() => {
        translateService = TestBed.inject(TranslateService);
        experianceIQService = TestBed.inject(ExperianceIQService);
        ssoService = TestBed.inject(SsoAuthService);
        modalService = TestBed.inject(NgbModal);
        dialogService = TestBed.inject(NgbModal);
        protectIqservices = TestBed.inject(ProtectIqService);
        dataService = TestBed.inject(DataServiceService);
        dateUtils = TestBed.inject(DateUtilsService);
        fixture = TestBed.createComponent(ExperienceIqComponent);
        component = fixture.componentInstance;
        sessionStorage.setItem("calix.deviceData", JSON.stringify(sessionmock))
        ssoService.setActionLog('CSC', 'pageHit', 'ExperianceIQ', '/support/application/experienceIQ', 'ExperianceIQ page loaded');
        component.orgId = 102;
        let systemId = component.deviceData[0].serialNumber = "CXNK008E9B78";
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

  it('should initialized experience iq onInit()', () => {
    spyOn(component, 'getSubscribedStatus').and.callThrough();
    spyOn(component, 'getDeviceStatus').and.callThrough()
    component.ngOnInit();
    expect(component.getSubscribedStatus).toHaveBeenCalled();
    expect(component.getDeviceStatus).toHaveBeenCalled();
    fixture.detectChanges();
  })

  it('experience iq subscription status', () => {
    component.deviceSubscription = true;
    component.deviceStatus = true;
    component.sectionToShow = 'details';
    spyOn(protectIqservices, 'getArloAccount').and.returnValue(of(subscribedstatus));
    component.getSubscribedStatus();
    component.loading = false;
    component.deviceSubscription = subscribedstatus.edgeSuites.experienceIQ.subscribed;
    expect(component.deviceSubscription).toBe(true);
    fixture.detectChanges();
  })

  it('experience iq DeviceStatus', () => {
    spyOn(experianceIQService, 'getApplicationStatus').and.returnValue(of(datamock));
    component.getDeviceStatus();
    component.loading = false;
    expect(component.deviceStatus).toBe(true);
    fixture.detectChanges();
  })

  it('experience iq EnableStatus', () => {
    spyOn(experianceIQService, 'getApplicationStatus').and.returnValue(of(datamock));
    component.toggleEnable(true);
    component.deviceStatus = true;
    component.getDeviceStatus(true);
    component.advLoading = false;
    expect(component.enabledUpdated).toBe(true);
    fixture.detectChanges();
  })

  it('experience iq AlertData', () => {
    component.deviceSubscription = true;
    component.deviceStatus = true;
    component.showPriority = true;
    component.sectionToShow = 'alert';
    spyOn(experianceIQService, 'getNotification').and.returnValue(of(alertmock));
    component.fetchAlertData();
    component.loading = false;
    component.notificationList = alertmock;
    component.notificationList.datas.forEach((x, i) => {
      component.isExpandedAlert.push(false);
    })
    // expect(component.notificationList.datas.length).toBeGreaterThan(0);
    expect(component).toBeTruthy();
    fixture.detectChanges();
  })

  it('experience iq people', () => {
    spyOn(experianceIQService, 'getAllUsersSummary').and.returnValue(of(summery_data));
    spyOn(experianceIQService, 'profileStationList').and.returnValue(of(list));
    spyOn(experianceIQService, 'getAllCategoryByProfileId').and.returnValue(of(categorylistmock));
    spyOn(experianceIQService, 'editCategoyByProfileId').and.returnValue(of());
    spyOn(component, 'getStationList').and.callThrough()
    // component.selectedContentFilter = categorylistmock.selectedGroup;
    component.sectionToShow = 'people';
    component.sectionToShow == 'restrictions';
    component.loading = false;
    component.onCatergoryChange(categorylistmock.categories);
    component.getAllSummary();
    component.getProfileCategoryList();
    component.goToProfile(summery_data.profiles[0]);
    fixture.detectChanges();
    expect(component.peopleListObj).toEqual(summery_data);
    expect(experianceIQService.getAllUsersSummary).toHaveBeenCalled();
    expect(component.getStationList).toHaveBeenCalled();

    fixture.detectChanges();
  })

  it('experience iq priorities', () => {
    component.deviceSubscription = true;
    component.deviceStatus = true;
    component.showPriority = true;
    component.sectionToShow = 'priorities';
    spyOn(experianceIQService, 'getprofileAdd_V1').and.returnValue(of());
    spyOn(experianceIQService, 'getqoslist_V2').and.returnValue(of(priormock));
    component.getQosListData();
    component.loading = false;
    component.safeSearchStatus = priormock.isQoSOn;
    component.profilelist = priormock;
    component.scheduleProfile = component.constructScheduleProfiledata(priormock.scheduleProfile)
    //  expect(component.notificationList.datas.length).toBeGreaterThan(0);
    expect(component).toBeTruthy();
    fixture.detectChanges();
  })

  it('experience iq restrictions', () => {
    spyOn(component, 'getiCloudMain').and.callThrough();
    component.sectionToShow = 'restrictions';
    component.availability = { defaultRestriction: true };
    fixture.detectChanges();
    component.getRestriction();
    expect(component.profiledRestriction).toBe(false);
    fixture.detectChanges();
  })

  it('checkSelectedDays', () => {
    component.checkSelectedDays();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })


  it('Recalibrate', () => {
    component.Recalibrate();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('showSuccessAlert', () => {
    component.showSuccessAlert('Sucess');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('closeAlert', () => {
    component.closeAlert();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('ExIQPrioritiesReset', fakeAsync(() => {
    spyOn(experianceIQService, 'EIQResetPriorites').and.returnValue(of({}));
    component.ExIQPrioritiesReset();
    component.ExIQPrioritiesDelete();
    tick(2000);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('EIQResetPrioriteserror', fakeAsync(() => {
    spyOn(experianceIQService, 'EIQResetPriorites').and.returnValue(throwError(errorStatus401));
    component.ExIQPrioritiesReset();
    component.ExIQPrioritiesDelete();
    tick(2000);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('EIQDeletePriorites', () => {
    spyOn(experianceIQService, 'EIQDeletePriorites').and.returnValue(of({}));
    component.ExIQPrioritiesDelete();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('EIQDeletePrioriteserror', () => {
    spyOn(experianceIQService, 'EIQDeletePriorites').and.returnValue(throwError(errorStatus401));
    component.ExIQPrioritiesDelete();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getSubscribedStatus', () => {
    spyOn(protectIqservices, 'getArloAccount').and.returnValue(throwError(errorStatus401));
    component.getSubscribedStatus();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('toggleSubscription', () => {
    spyOn(protectIqservices, 'toggleAppSubscriptionwithoutsubscriber').and.returnValue(of(null));
    component.toggleSubscription(true);
    setTimeout(() => {
      component.getSubscribedStatus(true);
    }, 2000);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('toggleSubscription', () => {
    spyOn(protectIqservices, 'toggleAppSubscriptionwithoutsubscriber').and.returnValue(throwError(errorStatus401));
    component.toggleSubscription(true);
    setTimeout(() => {
      component.getSubscribedStatus(true);
    }, 2000);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onBoardedCheck', () => {
    spyOn(protectIqservices, 'getUserId').and.returnValue(of(onboardmock));
    component.onBoardedCheck();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onBoardedCheck', () => {
    spyOn(protectIqservices, 'getUserId').and.returnValue(throwError(errorStatus401));
    component.onBoardedCheck();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateAppTile', () => {
    spyOn(protectIqservices, 'tileStatus').and.returnValue(throwError(errorStatus401));
    component.updateAppTile();
    window.localStorage.setItem('calix.scopes', JSON.stringify(scopesmock));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getEntitlemnt', () => {
    component.getEntitlemnt('207');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('showFeatureAvailability', () => {
    spyOn(protectIqservices, 'getFeatureAvailability').and.returnValue(of(FeatureAvailabilitymock));
    component.showFeatureAvailability();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('showFeatureAvailability', () => {
    spyOn(protectIqservices, 'getFeatureAvailability').and.returnValue(throwError(errorStatus401));
    component.showFeatureAvailability();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getQosList', () => {
    spyOn(experianceIQService, 'getQosV1').and.returnValue(of(qoslistmock));
    component.getQosList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getQosList', () => {
    spyOn(experianceIQService, 'getQosV1').and.returnValue(throwError(errorStatus401));
    component.getQosList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getDeviceEdit', fakeAsync(() => {
    spyOn(experianceIQService, 'editqosDeviceV1').and.returnValue(of(deviceeditmock));
    component.getDeviceEdit(true);
    tick(200);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('getDeviceEdit', fakeAsync(() => {
    spyOn(experianceIQService, 'editqosDeviceV1').and.returnValue(throwError(errorStatus401));
    component.getDeviceEdit(true);
    tick(200);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('categoryData', () => {
    component.categoryData(categorydatamock);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onCalenderSelected', () => {
    component.onCalenderSelected(new Date(), 10);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('onCalenderSelectedMain', () => {
    component.onCalenderSelectedMain(new Date(), 10);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('dayConvert', () => {
    component.dayConvert("01");
    fixture.detectChanges();
    component.dayConvert("0122378");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('setDateAndTimeFromString', () => {
    component.setDateAndTimeFromString("1309");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('constructScheduleProfiledata', () => {
    component.constructScheduleProfiledata(scheduleDataMock);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('experience iq DeviceStatus', () => {
    spyOn(experianceIQService, 'getApplicationStatus').and.returnValue(throwError(errorStatus401));
    component.getDeviceStatus();
    component.loading = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('Activate', () => {
    spyOn(experianceIQService, 'ActivateV1').and.returnValue(of(activateMock));
    component.Activate(eventMock);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Activate', () => {
    spyOn(experianceIQService, 'ActivateV1').and.returnValue(of(activateMock));
    component.Activate(eventMock1);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Activate', () => {
    spyOn(experianceIQService, 'ActivateV1').and.returnValue(throwError(errorStatus401));
    component.Activate(eventMock);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('checkName', () => {
    component.checkName(nameMock);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('checkName1', () => {
    component.checkName(nameMock1);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getQosListData', () => {
    spyOn(experianceIQService, 'getqoslist_V2').and.returnValue(throwError(errorStatus401));
    component.getQosListData();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('UpdateDefaultProfile', () => {
    component.UpdateDefaultProfile();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('resetPriorityModalValues', () => {
    component.resetPriorityModalValues();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('resetPriorityModalValues', () => {
    spyOn(experianceIQService, 'UpdateProfileV1').and.returnValue(throwError(errorStatus401));
    component.resetPriorityModalValues();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('checkBoxValue', () => {
    component.checkBoxValue(checkBoxEventMock, devicedataMock);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('ispermanent', () => {
    component.ispermanent(true);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('ispermanent', () => {
    component.ispermanent(false);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('AddDevice', () => {
    component.durationTimeValue = new Date();
    component.AddDeviceData = {
      "userId": "3fa779a2-8770-411b-8982-75570bb4680a",
      "isPermanent": false,
      "duration": "0",
      "selectedDevices": []
    }
    spyOn(experianceIQService, 'deviceUpdateV1').and.returnValue(of({
      "type": "Buffer",
      "data": [
      ]
    }));
    component.AddDevice(true);
    fixture.detectChanges();
    component.AddDevice();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('AddDevice', () => {
    component.durationTimeValue = new Date();
    spyOn(experianceIQService, 'deviceUpdateV1').and.returnValue(throwError(errorStatus401));
    component.AddDevice(true);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('removeDevice', () => {
    spyOn(experianceIQService, 'deleteDeviceV1').and.returnValue(of({}));
    component.removeDevice(devicedataMock, "");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('removeDevice', () => {
    spyOn(experianceIQService, 'deleteDeviceV1').and.returnValue(of({}));
    component.removeDevice(devicedataMock, true);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('setSelectedDates', () => {
    component.setSelectedDates("1");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateProfile', () => {
    spyOn(experianceIQService, 'getProfileV1').and.returnValue(of(profileMock));
    component.updateProfile(
      {
        "day": "Mon ",
        "startTime": "8:10 PM",
        "endTime": "10:11 PM",
        "id": "638e02eaf3395c353fd54180",
        "name": "bharath"
      });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('closeTrfficePriorityModal', () => {
    component.closeTrfficePriorityModal();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('DeleteProfile', () => {
    spyOn(experianceIQService, 'deleteProfileV1').and.returnValue(of({}));
    component.DeleteProfile();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('DeleteProfile', () => {
    spyOn(experianceIQService, 'deleteProfileV1').and.returnValue(throwError(errorStatus401));
    component.DeleteProfile();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('confirmDeleteProfile', () => {
    component.confirmDeleteProfile(deleteProfileMock);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('close_priority_alert', () => {
    component.close_priority_alert();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('closeAlertError', () => {
    component.closeAlertError();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('allowForCalenderClicked', () => {
    component.customTimeUsage[0] = new Date();
    component.allowForCalenderClicked(0);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onAllowForTimeSelected', () => {
    component.customTimeUsage[0] = new Date();
    component.onAllowForTimeSelected(new Event('onBlur'), new Date(), 0);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onalertFilterChange', () => {
    spyOn(experianceIQService, 'getNotification').and.returnValue(of(alertmock));
    component.onalertFilterChange();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onalertFilterChange', () => {
    spyOn(experianceIQService, 'getNotification').and.returnValue(throwError(errorStatus401));
    component.onalertFilterChange();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // it('subscribe/unsubscribe test res', fakeAsync(() => {
  //   spyOn(protectIqservices, 'setEnableStatus').and.returnValue(of(service_enable_disable));

  //   component.deviceStatus = false;
  //   component.toggleEnable(true);
  //   tick(110000);
  //   flush();
  // }));

  it('subscribe/unsubscribe test res', fakeAsync(() => {
    spyOn(protectIqservices, 'setEnableStatus').and.returnValue(of(service_enable_disable));
    component.enabledUpdated = true;
    component.deviceStatus = false;
    component.toggleEnable(true);
    tick(150000);
    flush();
    expect(component).toBeTruthy();
  }));

  it('subscribe/unsubscribe test error', fakeAsync(() => {
    spyOn(protectIqservices, 'setEnableStatus').and.returnValue(throwError(errorStatus401));

    component.deviceStatus = false;
    component.toggleEnable(true);
    tick(110000);
    flush();
    expect(component).toBeTruthy();
  }));

  // it('onSubscription test', fakeAsync(() => {
  //   component.deviceStatus = false;
  //   spyOn(experianceIQService, 'installApplication').and.returnValue(of({}));
  //   component.onSubscription(true);
  //   tick(110000);
  //   flush();
  // }));
  it('onSubscription test', fakeAsync(() => {
    component.deviceStatus = false;
    component.enabledUpdated = true;
    spyOn(experianceIQService, 'installApplication').and.returnValue(of({}));
    component.onSubscription(true);
    tick(110000);
    flush();
    expect(component).toBeTruthy();
  }));
  it('onSubscription test error', fakeAsync(() => {
    component.deviceStatus = false;
    spyOn(experianceIQService, 'installApplication').and.returnValue(throwError(errorStatus401));
    component.onSubscription(true);
    tick(110000);
    flush();
    expect(component).toBeTruthy();
  }));

  // it('onSubscription test', fakeAsync(() => {
  //   component.deviceStatus = true;
  //   spyOn(experianceIQService, 'unInstallApplication').and.returnValue(of({}));
  //   component.onSubscription(false);
  //   tick(150000);
  //   flush();
  // }));

  it('onSubscription test', fakeAsync(() => {
    component.deviceStatus = true;
    component.enabledUpdated = true;
    spyOn(experianceIQService, 'unInstallApplication').and.returnValue(of({}));
    component.onSubscription(false);
    tick(150000);
    flush();
    expect(component).toBeTruthy();
  }));
  it('onSubscription test error', fakeAsync(() => {
    component.deviceStatus = true;
    spyOn(experianceIQService, 'unInstallApplication').and.returnValue(throwError(errorStatus401));
    component.onSubscription(false);
    tick(150000);
    flush();
    expect(component).toBeTruthy();
  }));

  it('disconnectParticularProfile', () => {
    spyOn(experianceIQService, 'updateProfileBlockStatus').and.returnValue(of({}));
    component.disconnectParticularProfile(peopleMock, new Event("click"));
    component.getAllSummary();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('disconnectParticularProfile', () => {
    spyOn(experianceIQService, 'updateProfileBlockStatus').and.returnValue(throwError(errorStatus401));
    component.disconnectParticularProfile(peopleMock, new Event("click"));
    component.getAllSummary();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('connectParticularProfile', () => {
    spyOn(experianceIQService, 'updateProfileBlockStatus').and.returnValue(of({}));
    component.connectParticularProfile(peopleMock, new Event("click"));
    component.getAllSummary();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('connectParticularProfile', () => {
    spyOn(experianceIQService, 'updateProfileBlockStatus').and.returnValue(throwError(errorStatus401));
    component.connectParticularProfile(peopleMock, new Event("click"));
    component.getAllSummary();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onContentFilterChange', () => {
    spyOn(experianceIQService, 'updateContentFilter').and.returnValue(of({}));
    component.onContentFilterChange();
    component.getProfileCategoryList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onContentFilterChange', () => {
    spyOn(experianceIQService, 'updateContentFilter').and.returnValue(throwError(errorStatus401));
    component.onContentFilterChange();
    component.getProfileCategoryList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


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

  it('resetAlertBox', () => {
    component.resetAlertBox();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('changeSection', () => {
    component.changeSection(new Event("click"));
    fixture.detectChanges();
    component.changeSection('details');
    fixture.detectChanges();
    component.changeSection('alert');
    fixture.detectChanges();
    component.changeSection('people');
    fixture.detectChanges();
    component.changeSection('priorities');
    fixture.detectChanges();
    component.changeSection('restrictions');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('fetchAlertData error', () => {
    spyOn(experianceIQService, 'getNotification').and.returnValue(throwError(errorStatus401));
    component.fetchAlertData();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getAllSummary', () => {
    spyOn(experianceIQService, 'getAllUsersSummary').and.returnValue(throwError(errorStatus401));
    component.getAllSummary();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('udateStatusButton', () => {
    component.udateStatusButton(profileObjMock);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('udateStatusButton', () => {
    component.udateStatusButton(profileObjMock1);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('deleteExperianceIq', () => {
    component.deleteExperianceIq(deletePeopleMock, new Event('click'));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('selectedItem', () => {
    spyOn(experianceIQService, 'editAppByProfileId').and.returnValue(of({}));
    component.selectedItem(selectedAppMock);
    component.getProfileAppList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('selectedItem error', () => {
    spyOn(experianceIQService, 'editAppByProfileId').and.returnValue(throwError(errorStatus401));
    component.selectedItem(selectedAppMock);
    component.getProfileAppList();
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

  it('selectedItemMain error', () => {
    spyOn(experianceIQService, 'editAppMain').and.returnValue(throwError(errorStatus401));
    component.selectedItemMain(selectedAppMock);
    component.getProfileCategoryListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('onNoneClicked', () => {
    spyOn(experianceIQService, 'deleteALLBedTimeProfile').and.returnValue(of({}));
    component.onNoneClicked();
    component.fetchTimeLimitsData();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onNoneClicked error', () => {
    spyOn(experianceIQService, 'deleteALLBedTimeProfile').and.returnValue(throwError(errorStatus401));
    component.onNoneClicked();
    component.fetchTimeLimitsData();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('removeProfileApp', () => {
    spyOn(experianceIQService, 'deleteAppByProfileAndAppId').and.returnValue(of({}));
    component.removeProfileApp(789);
    component.getProfileAppList();
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


  it('confirmUserProfileDelete', () => {
    spyOn(experianceIQService, 'deleteProfile').and.returnValue(of({}));
    component.confirmUserProfileDelete();
    component.closeMessageModal();
    component.getAllSummary();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('confirmUserProfileDelete error', () => {
    spyOn(experianceIQService, 'deleteProfile').and.returnValue(throwError(errorStatus401));
    component.confirmUserProfileDelete();
    component.closeMessageModal();
    component.getAllSummary();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });



  it('updateProfileBlockedStatus', () => {
    spyOn(experianceIQService, 'updateAllProfileBlockStatus').and.returnValue(of({}));
    component.updateProfileBlockedStatus(true);
    component.getAllSummary();
    fixture.detectChanges();
  });

  it('updateProfileBlockedStatus error', () => {
    spyOn(experianceIQService, 'updateAllProfileBlockStatus').and.returnValue(throwError(errorStatus401));
    component.updateProfileBlockedStatus(true);
    component.getAllSummary();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('onsumbitNewUser', () => {
    component.imageUrl = 'https://cloud-stg.calix.com/support/home';
    spyOn(experianceIQService, 'addProfileNewDevice').and.returnValue(of(onSubmitUserMock));
    spyOn(experianceIQService, 'uploadAvatar').and.returnValue(of({}));
    component.onsumbitNewUser();
    component.getAllSummary();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('onsumbitNewUser', () => {
    component.imageUrl = 'https://cloud-stg.calix.com/support/home';
    spyOn(experianceIQService, 'addProfileNewDevice').and.returnValue(of(onSubmitUserMock));
    spyOn(experianceIQService, 'uploadAvatar').and.returnValue(throwError(errorStatus401));
    component.onsumbitNewUser();
    component.closeModal();
    component.getAllSummary();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onsumbitNewUser error', () => {
    spyOn(experianceIQService, 'addProfileNewDevice').and.returnValue(throwError(errorStatus401));
    component.onsumbitNewUser();
    component.closeModal();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('openModal', () => {
    let content = fixture.debugElement.nativeElement.querySelector("#editProfileModal");
    component.openModal(content, "addProfile");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('openModal', () => {
    let content = fixture.debugElement.nativeElement.querySelector("#editProfileModal");
    component.openModal(content, "editProfile");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getAllStationDevice', () => {
    spyOn(experianceIQService, 'stationListAll').and.returnValue(of(stationMock));
    component.getAllStationDevice();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getAllStationDevice error', () => {
    spyOn(experianceIQService, 'stationListAll').and.returnValue(throwError(errorStatus401));
    component.getAllStationDevice();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('hideError', () => {
    component.hideError();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getScopes', () => {
    environment.VALIDATE_SCOPE = 'true';
    component.getScopes();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('dayNumber', () => {
    component.dayNumber(0, dayNumberMock, true);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('goToProfile', () => {
    component.goToProfile(summery_data1.profiles[0]);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('closeProfile', () => {
    component.closeProfile();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('hideSuccess', () => {
    component.hideSuccess();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onSubmitEditProfile', () => {
    spyOn(experianceIQService, 'editProfileName').and.returnValue(of({}));
    spyOn(experianceIQService, 'uploadAvatar').and.returnValue(of({}));
    component.onSubmitEditProfile();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onSubmitEditProfile error', () => {
    spyOn(experianceIQService, 'editProfileName').and.returnValue(throwError(errorStatus401));
    component.onSubmitEditProfile();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('addDevicetoProfile', () => {
    spyOn(experianceIQService, 'addDeviceProfile').and.returnValue(of({}));
    component.addDevicetoProfile();
    component.getStationList(component.selectedProfile.profileId);
    component.closeModal();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('addDevicetoProfile', () => {
    spyOn(experianceIQService, 'addDeviceProfile').and.returnValue(throwError(errorStatus401));
    component.addDevicetoProfile();
    component.getStationList(component.selectedProfile.profileId);
    component.closeModal();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('removeProfileDevice', () => {
    component.removeProfileDevice(removeProfileDevice);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('confirmProfileDeviceDelete', () => {
    component.deleteDeviceData = component.deviceData;
    spyOn(experianceIQService, 'removeDeviceProfile').and.returnValue(of({}));
    component.confirmProfileDeviceDelete();
    component.getStationList(component.selectedProfile.profileId);
    component.deleteDeviceData = null;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('confirmProfileDeviceDelete', () => {
    component.deleteDeviceData = component.deviceData;
    spyOn(experianceIQService, 'removeDeviceProfile').and.returnValue(throwError(errorStatus401));
    component.confirmProfileDeviceDelete();
    component.getStationList(component.selectedProfile.profileId);
    component.deleteDeviceData = null;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('fetchRestrictionData', () => {
    component.fetchRestrictionData();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('fetchRestrictionData', () => {
    sessionStorage.setItem('defaultLanguage', 'en');
    component.fetchRestrictionData();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getProfileCategoryListMain', () => {
    spyOn(experianceIQService, 'getAllCategory').and.returnValue(of(getAllCategoryMock));
    component.getProfileCategoryListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateYoutubeRestrictionStatus', () => {
    spyOn(experianceIQService, 'updateYotubeRestrictionStatus').and.returnValue(of({}));
    component.updateYoutubeRestrictionStatus();
    component.getYoutubeRestrictionStatus();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateYoutubeRestrictionStatus', () => {
    spyOn(experianceIQService, 'updateYotubeRestrictionStatus').and.returnValue(throwError(errorStatus401));
    component.updateYoutubeRestrictionStatus();
    component.getYoutubeRestrictionStatus();
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

  it('updateYoutubeRestrictionStatusMain', () => {
    spyOn(experianceIQService, 'updateYotubeRestrictionStatusMain').and.returnValue(throwError(errorStatus401));
    component.updateYoutubeRestrictionStatusMain();
    component.getYoutubeRestrictionStatusMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateSafeSearchStatus', () => {
    spyOn(experianceIQService, 'updateSafeSearchStatus').and.returnValue(of({}));
    component.updateSafeSearchStatus();
    component.getProfileSafeSearchStatus();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateSafeSearchStatus', () => {
    spyOn(experianceIQService, 'updateSafeSearchStatus').and.returnValue(throwError(errorStatus401));
    component.updateSafeSearchStatus();
    component.getProfileSafeSearchStatus();
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

  it('updateSafeSearchStatusMain', () => {
    spyOn(experianceIQService, 'updateSafeSearchStatusMain').and.returnValue(throwError(errorStatus401));
    component.updateSafeSearchStatusMain();
    component.getProfileSafeSearchStatusMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('onCatergoryChange', () => {
    spyOn(experianceIQService, 'editCategoyByProfileId').and.returnValue(of({}));
    component.onCatergoryChange(categoryChangeMock);
    component.getProfileCategoryList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onCatergoryChange', () => {
    spyOn(experianceIQService, 'editCategoyByProfileId').and.returnValue(throwError(errorStatus401));
    component.onCatergoryChange(categoryChangeMock);
    component.getProfileCategoryList();
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

  it('onCatergoryChangeMain', () => {
    spyOn(experianceIQService, 'editCategoyMain').and.returnValue(throwError(errorStatus401));
    component.onCatergoryChangeMain(categoryChangeMock);
    component.getProfileCategoryListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getProfileAppList', () => {
    spyOn(experianceIQService, 'getAppListByProfileId').and.returnValue(of(getProfileAppListMock));
    component.getProfileAppList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getProfileAppList', () => {
    spyOn(experianceIQService, 'getAppListByProfileId').and.returnValue(of(getProfileAppListMock1));
    component.getProfileAppList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getProfileAppList', () => {
    spyOn(experianceIQService, 'getAppListByProfileId').and.returnValue(throwError(errorStatus401));
    component.getProfileAppList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getProfileWebList', () => {
    spyOn(experianceIQService, 'getProfileWebUrl').and.returnValue(of(webAppListMock));
    component.getProfileWebList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getProfileWebList', () => {
    spyOn(experianceIQService, 'getProfileWebUrl').and.returnValue(throwError(errorStatus401));
    component.getProfileWebList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getProfileAppListMain', () => {
    spyOn(experianceIQService, 'getAppListMain').and.returnValue(of(getProfileAppListMock));
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('getProfileAppListMain', () => {
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
    expect(component).toBeTruthy();
  });

  it('getProfileWebListMain', () => {
    spyOn(experianceIQService, 'getProfileWebUrlMain').and.returnValue(of(webAppListMock));
    component.getProfileWebListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getProfileWebListMain', () => {
    spyOn(experianceIQService, 'getProfileWebUrlMain').and.returnValue(throwError(errorStatus401));
    component.getProfileWebListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getProfileCategoryList', () => {
    spyOn(experianceIQService, 'getAllCategoryByProfileId').and.returnValue(of(webAppListMock));
    component.getProfileCategoryList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getProfileSafeSearchStatus', () => {
    spyOn(experianceIQService, 'getSafeSearchStatus').and.returnValue(of(false));
    component.getProfileSafeSearchStatus();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getProfileSafeSearchStatus', () => {
    spyOn(experianceIQService, 'getSafeSearchStatus').and.returnValue(throwError(errorStatus401));
    component.getProfileSafeSearchStatus();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('getProfileSafeSearchStatusMain', () => {
    spyOn(experianceIQService, 'getSafeSearchStatusMain').and.returnValue(of(false));
    component.getProfileSafeSearchStatusMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getProfileSafeSearchStatusMain', () => {
    spyOn(experianceIQService, 'getSafeSearchStatusMain').and.returnValue(throwError(errorStatus401));
    component.getProfileSafeSearchStatusMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getYoutubeRestrictionStatus', () => {
    spyOn(experianceIQService, 'getYotubeRestrictionStatus').and.returnValue(of(false));
    component.getYoutubeRestrictionStatus();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getYoutubeRestrictionStatus', () => {
    spyOn(experianceIQService, 'getYotubeRestrictionStatus').and.returnValue(throwError(errorStatus401));
    component.getYoutubeRestrictionStatus();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getYoutubeRestrictionStatusMain', () => {
    spyOn(experianceIQService, 'getYotubeRestrictionStatusMain').and.returnValue(of(false));
    component.getYoutubeRestrictionStatusMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getYoutubeRestrictionStatusMain', () => {
    spyOn(experianceIQService, 'getYotubeRestrictionStatusMain').and.returnValue(throwError(errorStatus401));
    component.getYoutubeRestrictionStatusMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getRestrictionFeatureList', () => {
    spyOn(experianceIQService, 'getFeatureList').and.returnValue(of(featureListMock));
    component.getRestrictionFeatureList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getRestrictionFeatureList', () => {
    spyOn(experianceIQService, 'getFeatureList').and.returnValue(throwError(errorStatus401));
    component.getRestrictionFeatureList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('getDns', () => {
    spyOn(experianceIQService, 'getDns').and.returnValue(of(getDnsMock));
    component.getDns();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getDns error', () => {
    spyOn(experianceIQService, 'getDns').and.returnValue(throwError(errorStatus401));
    component.getDns();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateDnsStatus', () => {
    spyOn(experianceIQService, 'setDns').and.returnValue(of({}));
    component.updateDnsStatus();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateDnsStatus', () => {
    spyOn(experianceIQService, 'setDns').and.returnValue(throwError(errorStatus401));
    component.updateDnsStatus();
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

  it('updateDnsStatusMain', () => {
    spyOn(experianceIQService, 'setDnsMain').and.returnValue(of({}));
    component.updateDnsStatusMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateDnsStatusMain', () => {
    spyOn(experianceIQService, 'setDnsMain').and.returnValue(throwError(errorStatus401));
    component.updateDnsStatusMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getiCloud', () => {
    spyOn(experianceIQService, 'getICloud').and.returnValue(of(getDnsMock));
    component.getiCloud();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getiCloud error', () => {
    spyOn(experianceIQService, 'getICloud').and.returnValue(throwError(errorStatus401));
    component.getiCloud();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('updateiCloudStatus', () => {
    spyOn(experianceIQService, 'setICloud').and.returnValue(of(getDnsMock));
    component.updateiCloudStatus();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateiCloudStatus error', () => {
    spyOn(experianceIQService, 'setICloud').and.returnValue(throwError(errorStatus401));
    component.updateiCloudStatus();
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


  it('updateiCloudMain', () => {
    spyOn(experianceIQService, 'setICloudMain').and.returnValue(of(getDnsMock));
    component.updateiCloudMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateiCloudMain error', () => {
    spyOn(experianceIQService, 'setICloudMain').and.returnValue(throwError(errorStatus401));
    component.updateiCloudMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('addWebsite', () => {
    component.websiteModel = 'www.google.com';
    spyOn(experianceIQService, 'addWebAddressProfile').and.returnValue(of(websiteMock));
    component.addWebsite();
    component.getProfileWebList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('addWebsite error', () => {
    component.websiteModel = 'www.google.com';
    spyOn(experianceIQService, 'addWebAddressProfile').and.returnValue(throwError(errorStatus401));
    component.addWebsite();
    component.getProfileWebList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('addWebsite', () => {
    spyOn(experianceIQService, 'addWebAddressProfile').and.returnValue(of(websiteMock));
    component.addWebsite();
    component.getProfileWebList();
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


  it('removeWebsite', () => {
    spyOn(experianceIQService, 'removeWebUrl').and.returnValue(of({}));
    component.removeWebsite("9cdd2b0d-f098-4662-9b39-d0dede450c0c");
    component.getProfileWebList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('removeWebsite error', () => {
    spyOn(experianceIQService, 'removeWebUrl').and.returnValue(throwError(errorStatus401));
    component.removeWebsite("9cdd2b0d-f098-4662-9b39-d0dede450c0c");
    component.getProfileWebList();
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

  it('updateWebUrl', () => {
    spyOn(experianceIQService, 'updateWebAddressProfile').and.returnValue(of(updateWebUrlRespMock));
    component.updateWebUrl(updateWebUrlMock);
    component.getProfileWebList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateWebUrl error', () => {
    spyOn(experianceIQService, 'updateWebAddressProfile').and.returnValue(throwError(errorStatus401));
    component.updateWebUrl(updateWebUrlMock);
    component.getProfileWebList();
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

  it('updateApp', () => {
    spyOn(experianceIQService, 'editAppByProfileId').and.returnValue(of({}));
    component.updateApp(updateAppMock, 0);
    component.getProfileAppList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateApp', () => {
    spyOn(experianceIQService, 'editAppByProfileId').and.returnValue(throwError(errorStatus401));
    component.updateApp(updateAppMock, 0);
    component.getProfileAppList();
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


  it('updateAllowForApp', () => {
    component.customTimeUsage = [new Date()];
    spyOn(experianceIQService, 'editAppByProfileId').and.returnValue(of({}));
    component.updateAllowForApp(updateAllowForAppMock, 0);
    component.getProfileAppList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateAllowForApp error', () => {
    component.customTimeUsage = [new Date()];
    spyOn(experianceIQService, 'editAppByProfileId').and.returnValue(throwError(errorStatus401));
    component.updateAllowForApp(updateAllowForAppMock, 0);
    component.getProfileAppList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateAllowForAppMain', () => {
    component.customTimeUsage = [new Date()];
    spyOn(experianceIQService, 'editAppMain').and.returnValue(of({}));
    component.updateAllowForAppMain(updateAllowForAppMock, 0);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateAllowForAppMain error', () => {
    component.customTimeUsage = [new Date()];
    spyOn(experianceIQService, 'editAppMain').and.returnValue(throwError(errorStatus401));
    component.updateAllowForAppMain(updateAllowForAppMock, 0);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('closeDatePicker', () => {
    component.customTimeUsage = [new Date()];
    component.datePicker = new Date();
    spyOn(experianceIQService, 'editAppByProfileId').and.returnValue(of({}));
    component.closeDatePicker(closeDatePickerMock, 0);
    component.getProfileAppList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('closeDatePicker error', () => {
    component.customTimeUsage = [new Date()];
    component.datePicker = new Date();
    spyOn(experianceIQService, 'editAppByProfileId').and.returnValue(throwError(errorStatus401));
    component.closeDatePicker(closeDatePickerMock, 0);
    component.getProfileAppList();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('closeDatePickerMain', () => {
    component.customTimeUsage = [new Date()];
    component.datePicker = new Date();
    spyOn(experianceIQService, 'editAppMain').and.returnValue(of({}));
    component.closeDatePickerMain(closeDatePickerMock, 0);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('closeDatePickerMain error', () => {
    component.customTimeUsage = [new Date()];
    component.datePicker = new Date();
    spyOn(experianceIQService, 'editAppMain').and.returnValue(throwError(errorStatus401));
    component.closeDatePickerMain(closeDatePickerMock, 0);
    component.getProfileAppListMain();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updateAllowForChecked', () => {
    component.customTimeUsage = [new Date()];
    component.updateAllowForChecked(updateAllowForMock, 0, { target: { value: 'calix' } });
    component.updateAllowForApp(updateAllowForMock, 0);
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

  it('deviceClicked', () => {
    component.deviceClicked();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('editSpecificDay', () => {
    let content = fixture.debugElement.nativeElement.querySelector("#editTimeLimitModal");
    component.editSpecificDay(content, editSpecificDayMock, 0);
    component.fetchTimeLimitsData();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('confirmEditModal', () => {
    component.editTimeLimitData = endBedTimeMock;
    spyOn(experianceIQService, 'editBedTimeProfile').and.returnValue(of({}));
    component.confirmEditModal();
    component.fetchTimeLimitsData();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('confirmEditModal error', () => {
    component.editTimeLimitData = endBedTimeMock;
    spyOn(experianceIQService, 'editBedTimeProfile').and.returnValue(throwError(errorStatus401));
    component.confirmEditModal();
    component.fetchTimeLimitsData();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('fetchUsageData', () => {
    component.fetchUsageData();
    component.getProfileUsage(UsageEnum.DAY);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getProfileUsage', () => {
    spyOn(experianceIQService, 'getUserProfileSummary').and.returnValue(of(getProfileUsageMock));
    component.getProfileUsage(UsageEnum.DAY);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getProfileUsage error', () => {
    spyOn(experianceIQService, 'getUserProfileSummary').and.returnValue(throwError(errorStatus401));
    component.getProfileUsage(UsageEnum.DAY);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('checkSameTimeExists', () => {
    component.checkSameTimeExists(checkSameTimeMock);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('checkSameTimeExists', () => {
    component.checkSameTimeExists(checkSameTime1Mock);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('fetchTimeLimitsData', () => {
    spyOn(experianceIQService, 'getBedTimeByProfileId').and.returnValue(of(fetchTimeLimitsDataMock));
    component.fetchTimeLimitsData();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('fetchTimeLimitsData error', () => {
    spyOn(experianceIQService, 'getBedTimeByProfileId').and.returnValue(throwError(errorStatus401));
    component.fetchTimeLimitsData();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('checkForCustomTimeEnabled', () => {
    component.checkForCustomTimeEnabled(fetchTimeLimitsDataMock);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('fetchWeekUsageData', () => {
    component.fetchWeekUsageData();
    component.getProfileUsage(UsageEnum.WEEK);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('fetchMonthUsageData', () => {
    component.fetchMonthUsageData();
    component.getProfileUsage(UsageEnum.MONTH);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('editEveryDay', () => {
    let content = fixture.debugElement.nativeElement.querySelector("#editEveryDayTimeLimitModal");
    component.editEveryDay(content);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onblurWebsite', () => {
    component.onblurWebsite();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onSubmitTimeLimit', () => {
    spyOn(experianceIQService, 'updateAllProfileBedTime').and.returnValue(of({}));
    component.onSubmitTimeLimit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onSubmitTimeLimit error', () => {
    spyOn(experianceIQService, 'updateAllProfileBedTime').and.returnValue(throwError(errorStatus401));
    component.onSubmitTimeLimit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('onSubmitIndividualTimeLimit', () => {
    spyOn(experianceIQService, 'editBedTimeProfile').and.returnValue(of({}));
    component.onSubmitIndividualTimeLimit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('onSubmitIndividualTimeLimit error', () => {
    spyOn(experianceIQService, 'editBedTimeProfile').and.returnValue(throwError(errorStatus401));
    component.onSubmitIndividualTimeLimit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('submitEveryDay', () => {
    spyOn(experianceIQService, 'updateAllProfileBedTime').and.returnValue(of({}));
    component.submitEveryDay();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('submitEveryDay error', () => {
    spyOn(experianceIQService, 'updateAllProfileBedTime').and.returnValue(throwError(errorStatus401));
    component.submitEveryDay();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('removeProfileDayTime', () => {
    spyOn(experianceIQService, 'deleteBedTImeByProfileId').and.returnValue(of(remoceProfileDayMock));
    component.removeProfileDayTime(0, 0);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('removeProfileDayTime error', () => {
    spyOn(experianceIQService, 'deleteBedTImeByProfileId').and.returnValue(throwError(errorStatus401));
    component.removeProfileDayTime(0, 0);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('removeProfileWholeDayLimit', () => {
    spyOn(experianceIQService, 'deleteProfileBedTimeByDayId').and.returnValue(of(remoceProfileDayMock));
    component.removeProfileWholeDayLimit(0);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('removeProfileWholeDayLimit error', () => {
    spyOn(experianceIQService, 'deleteProfileBedTimeByDayId').and.returnValue(throwError(errorStatus401));
    component.removeProfileWholeDayLimit(0);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('typeaheadbasickeyup', () => {
    component.typeaheadbasickeyup(new Event('click'));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('typeaheadbasickeyup', () => {
    component.model == ''
    component.typeaheadbasickeyup(new Event('click'));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('channelchangesModalOpen', () => {
    component.channelchangesModalOpen('new');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('addDevicePrioritiesModalOpen', () => {
    component.addDevicePrioritiesModalOpen(false);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // it('PrioritiesModalOpen', () => {
  //   component.PrioritiesModalOpen();
  //   fixture.detectChanges();
  //   expect(component).toBeTruthy();
  // });

  it('iconimage', () => {
    component.iconimage(0, "online");
    fixture.detectChanges();
    component.iconimage(0, "offline");
    fixture.detectChanges();
    component.iconimage(1, "online");
    fixture.detectChanges();
    component.iconimage(1, "offline");
    fixture.detectChanges();
    component.iconimage(2, "online");
    fixture.detectChanges();
    component.iconimage(2, "offline");
    fixture.detectChanges();
    component.iconimage(3, "online");
    fixture.detectChanges();
    component.iconimage(3, "offline");
    fixture.detectChanges();
    component.iconimage(4, "online");
    fixture.detectChanges();
    component.iconimage(4, "offline");
    fixture.detectChanges();
    component.iconimage(5, "online");
    fixture.detectChanges();
    component.iconimage(5, "offline");
    fixture.detectChanges();
    component.iconimage(6, "online");
    fixture.detectChanges();
    component.iconimage(6, "offline");
    fixture.detectChanges();
    component.iconimage(7, "online");
    fixture.detectChanges();
    component.iconimage(7, "offline");
    fixture.detectChanges();
    component.iconimage(8, "online");
    fixture.detectChanges();
    component.iconimage(8, "offline");
    fixture.detectChanges();
    component.iconimage(9, "online");
    fixture.detectChanges();
    component.iconimage(9, "offline");
    fixture.detectChanges();
    component.iconimage(10, "online");
    fixture.detectChanges();
    component.iconimage(10, "offline");
    fixture.detectChanges();
    component.iconimage(11, "online");
    fixture.detectChanges();
    component.iconimage(11, "offline");
    fixture.detectChanges();
    component.iconimage(30, "online");
    fixture.detectChanges();
    component.iconimage(30, "offline");
    fixture.detectChanges();
    component.iconimage('default', "online");
    fixture.detectChanges();
    component.iconimage('default', "offline");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('durationchange', () => {
    component.durationchange(new Event('click'));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('scheduleTimeValidation', () => {
    component.scheduleTimeValidation();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('isWfhAvailable', () => {
    spyOn(dataService, 'fetchMetaDatavaluesNew').and.returnValue(of(WFHMock));
    component.isWfhAvailable(false);
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

  it('Is smarttown activated', () => {
    subscribedstatus.edgeSuites.myCommunityIQ.passpoint.enable = true;
    spyOn(protectIqservices, 'getArloAccount').and.returnValue(of(subscribedstatus));
    component.getSubscribedStatus(true);
    expect(component).toBeTruthy();
    // expect(fixture.nativeElement.querySelector('#materialInline3').getAttribute('disabled')).toEqual(false);
    // expect(fixture.nativeElement.querySelector('#materialInline10').getAttribute('disabled')).toEqual(true);
  });

});
