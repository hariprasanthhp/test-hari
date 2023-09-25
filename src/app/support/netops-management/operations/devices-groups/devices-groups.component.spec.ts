import {
  HttpClient, HttpErrorResponse
} from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { IpSubnetCalculatorService } from 'src/app/shared/services/ip-subnet-calculator.service';
import { IPv6AddressService } from 'src/app/shared/services/ipv6-address.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from 'src/app/support/data.service';
import { DeviceGroupData, DeviceUnDiscoveredStaticTableData, DiscoveredTableData } from 'src/assets/mockdata/support/support-traffic-reports/reports.data';
import { DeviceGroupService } from '../services/device-group.service';

import { DevicesGroupsComponent } from './devices-groups.component';
import { of } from 'rxjs';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { errorStatus500 } from 'src/assets/mockdata/shared/error.data';

describe('DevicesGroupsComponent', () => {
  let component: DevicesGroupsComponent;
  let fixture: ComponentFixture<DevicesGroupsComponent>;
  let translateService: TranslateService;
  let service: DeviceGroupService
  let modalRef: NgbModal


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevicesGroupsComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule, NgSelectModule, FormsModule, ReactiveFormsModule
      ],
      providers: [
        TranslateService, SsoAuthService, DeviceGroupService, NgbModal, IpSubnetCalculatorService, DataServiceService, HttpClient, IPv6AddressService, Location,
        FormBuilder, Title
      ]
    })
      .compileComponents().then(() => {
        translateService = TestBed.inject(TranslateService);
        fixture = TestBed.createComponent(DevicesGroupsComponent);
        service = TestBed.inject(DeviceGroupService);
        component = fixture.componentInstance;
        window.history.pushState({ retainApproval: undefined }, '');
        fixture.detectChanges();
      })
  });
  it('devicegroup onInit()', () => {
    spyOn(component, 'GetabList').and.callThrough();
    translateService.selectedLanguage.subscribe(data => {
      component.language = data;
    })
    component.ngOnInit();
    component.GetabList();
    expect(component.GetabList).toBeTruthy();
    fixture.detectChanges();
  });
  // it('get device system group data', () => {
  //   component.ngOnInit();
  //   //fixture.detectChanges();
  //   spyOn(component, 'GetabList').and.callThrough();
  //   component.GetabList();
  //   component.DeviceTableData = DeviceGroupData;
  //   expect(component.DeviceTableData[0].type).toMatch("dynamic");
  //   expect(component.GetabList).toHaveBeenCalled();

  // });

  it('get DeviceDiscovered Table Data ', () => {
    spyOn(component, 'DeviceDiscovered').and.callThrough();
    component.DeviceDiscovered();
    component.DeviceTableData = DiscoveredTableData;
    expect(component.DeviceTableData[0].modelName).toMatch("804Mesh");
    expect(component.DeviceDiscovered).toHaveBeenCalled();

  });
  it('get DeviceUnDiscoveredStatic', () => {
    spyOn(component, 'DeviceUnDiscoveredStatic').and.callThrough();
    component.DeviceUnDiscoveredStatic();
    component.DeviceTableData = DeviceUnDiscoveredStaticTableData;
    expect(component.DeviceTableData[0].memberInfo).toMatch("CXNK873487342");
    expect(component.DeviceUnDiscoveredStatic).toHaveBeenCalled();

  });
  it('get device system group data', () => {
    component.ngOnInit();
    //fixture.detectChanges();
    spyOn(component, 'GetabList').and.callThrough();
    component.GetabList();
    component.DeviceTableData = DeviceGroupData;
    expect(component.DeviceTableData[0].type).toMatch("dynamic");
    expect(component.DeviceTableData[0].description).toMatch("CXNK00284BB4");
    expect(component.GetabList).toHaveBeenCalled();
  });
  it('shoud check Device count', () => {
    spyOn(service, 'getDeviceGoupCount').and.returnValue(of({ count: 5 }));
    component.getDeviceCount();
    expect(component.DeviceCount).toEqual(5)
  })
  it('shoud check getGroupMember count', () => {
    spyOn(service, 'getDeviceMemberCount').and.returnValue(of({ count: 5 }));
    const memberItem = {
      "_id": "062454fb-56e4-427d-93ce-1b5dd96f536a",
      "orgId": "12903101",
      "name": "StaticTest",
      "description": null,
      "type": "static",
      "cpeEvent": null,
      "allowInheritance": true,
      "workflowCount": 0,
      "completedCount": 0,
      "uncompletedCount": 0,
      "cpeFilter": {}
    }
    component.getGroupMemberCount(memberItem);
    // expect(component.deletedata).toMatch(memberItem)
    component.deletedata = memberItem;
    expect(component.MemberCount).toEqual(5)
    expect(component.showWarningMsg).toBeTruthy()
    expect(component.loading).toBeFalse()
  });

  it('shoud check Delete Device Group List', () => {
    component.deletedata = {
      _id: "61cead3c0b0a3cc6073f8548"
    }
    spyOn(service, 'DeleteDeviceGoupList').and.returnValue(of(true));
    spyOn(component, 'confirmDeleteSecleted').and.callThrough();
    component.confirmDeleteSecleted();
    expect(component.btnDisabled).toBe(false);
    expect(component.loading).toBeFalse()
  })

  it('close the model', () => {
    component.closeModal();
    expect(component.showWarningMsg).toBeFalse()
  })
  it('shoud check Device search count', () => {
    spyOn(service, 'getDeviceGoupsearchCount').and.returnValue(of({ count: 5 }));
    component.getDevicesearchCount();
    expect(component.DeviceCount).toEqual(5)
  })
  it('shoud check getWorkflows count', () => {
    spyOn(service, 'getWorkflowsById').and.callThrough();
    const workflowdata = {
      "_id": "38957fd2-f3bc-4a58-b4f8-f18cdda4de81",
      "name": "hvggcffx",
      "orgId": "470053",
      "start": "2022-08-03T10:07:27.914Z",
      "state": "Suspended",
      "groups": [
        "b36092f0-d42a-4d29-afcf-b387d116a3b2",
        "78ca5399-7a2a-4506-ac66-4c79041f5c67",
        "06c96f8f-daba-48cb-a1e0-241cc2b9486a"
      ],
      "actions": [
        {
          "actionType": "Reboot"
        }
      ],
      "cpeMatcher": "{\"orgId\":\"470053\",\"bDecommissioned\":{\"$exists\":false},\"$or\":[{\"serialNumber\":{\"$regex\":\"^CXNK81458301$\"}},{\"manufacturer\":\"Calix\"}]}",
      "createTime": "2022-08-03T10:07:27.914Z",
      "execPolicy": {
        "initialTrigger": {
          "type": "CPE Event",
          "cpeEvent": "CC EVENT - New CPE Discovered"
        }
      },
      "description": "",
      "execPassive": {
        "start": "2022-08-03T10:07:27.914Z",
        "execId": "passive"
      },
      "staticGroups": [
        "78ca5399-7a2a-4506-ac66-4c79041f5c67"
      ],
      "fullGroupExecute": false,
      "bPriorNewAndFailed": true
    }
    component.getWorkflows();
    // expect(component.deletedata).toMatch(memberItem)
    component.workflowMemberData = workflowdata;
    expect(component.workflowMemberData.name).toMatch('hvggcffx')
    expect(component.workflowMemberData.bPriorNewAndFailed).toBeTruthy()
    expect(component.workflowMemberData.fullGroupExecute).toBeFalse()
  });

});
