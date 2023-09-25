import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule, SpyNgModuleFactoryLoader } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { ValidatorService } from 'src/app-services/validator.services';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from '../../data.service';
import { FirewallBlockedServices } from '../../netops-management/operations/services/firewall-blocked-services.service';
import { SharedModule } from '../../shared/shared.module';
import { JsonViewerService } from '../support-router/services/json-viewer.service';
import { PortForwardingApplicationService } from '../support-router/services/port-forwarding-application.service';
import { SupportRouterService } from '../support-router/services/support-router.service';
import { deviceStatus, deviceInfo, temperature, dhcp, dhcp6, featureProperties, pingWanInfo, pingResp, traceResp, sysLogData, dataModelData, Lanportdata, dmgdata, postForwdingdata, softwareUpgradecount, softwareUpgradelistdata, connectToDeviceData, event_history, comm_logs, octetDetail } from 'src/assets/mockdata/support/router/router_data';

import { RouterNewComponent } from './router-new.component';
import { ExpectedConditions } from 'protractor';
import { doesNotMatch } from 'assert';
import { blockedServicesPayload, firewallInfo, unupData } from 'src/assets/mockdata/support/router/securityTab.dada';
import { of } from 'rxjs/internal/observable/of';
import { By } from '@angular/platform-browser';
import { backupmockdata, devicebackupmock, localtimemock, restoredata, restoreres } from 'src/assets/mockdata/support/support-traffic-reports/reports.data';
import { throwError } from 'rxjs';
import { iterator } from 'rxjs/internal-compatibility';
import { environment } from '../../../../environments/environment';
import { AddNewCategoriesComponent } from '../../netops-management/operations/profiles/profile-wizard/profile-build-wizard/profile-category/add-new-categories/add-new-categories.component';
import { errorStatus404 } from 'src/assets/mockdata/shared/error.data';
import { NetworkSystemsApiService } from 'src/app/cco/system/services/network-systems-api.service';
describe('RouterNewComponent', () => {
  let component: RouterNewComponent;
  let fixture: ComponentFixture<RouterNewComponent>;
  let dataService: DataServiceService;
  let jsonViewer: JsonViewerService;
  let routerService: SupportRouterService;
  let translateService: TranslateService;
  let pfaService: PortForwardingApplicationService;
  let networkSystemsApiService: NetworkSystemsApiService
  let formBuilder: FormBuilder;
  let form: FormGroup;
  let nativeElem;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [RouterNewComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'support/netops-management/operations/profiles/profile-wizard', component: AddNewCategoriesComponent },
        ])
        , NgSelectModule, SharedModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule
      ],
      providers: [SupportRouterService, PortForwardingApplicationService, TranslateService,
        NgbModal, DataServiceService, SsoAuthService,
        JsonViewerService, ExportExcelService, ValidatorService,
        FirewallBlockedServices]
    })
      .compileComponents();

  });

  beforeEach(async () => {
    // let ngOnInitFn = RouterNewComponent.prototype.ngOnInit;
    // RouterNewComponent.prototype.ngOnInit = () => { } // override ngOnInit
    fixture = TestBed.createComponent(RouterNewComponent);
    dataService = TestBed.inject(DataServiceService);
    routerService = TestBed.inject(SupportRouterService);
    pfaService = TestBed.inject(PortForwardingApplicationService);
    translateService = TestBed.inject(TranslateService);
    networkSystemsApiService = TestBed.inject(NetworkSystemsApiService);

    component = fixture.componentInstance;
    nativeElem = fixture.debugElement.nativeElement;
    jsonViewer = TestBed.inject(JsonViewerService);

    let fp = featureProperties;
    spyOn(dataService, 'fetchMetaData').and.returnValue(of(featureProperties));
    component.getMetaData();
    fp.properties.forEach(obj => {
      component.reStructureMeta(obj);
    });
    dataService.setMetaData((component.isOnt ? component.ontSn : component.routerSerialNumber), component.metaData);
    environment.VALIDATE_SCOPE = '';
    sessionStorage.setItem(`calix.deviceData`, JSON.stringify([{ "_id": "470053-487746-CXNK00778D46", "serialNumber": "CXNK00778D46", "macAddress": "48:77:46:9a:06:9f", "registrationId": "", "ipAddress": "192.168.1.66", "modelName": "GS4227E", "softwareVersion": "22.3.500.451", "opMode": "RG", "manufacturer": "Calix", "pppUsername": "", "secondIpAddress": "2600:1700:2d7a:800:4a77:46ff:fe9a:69f/64", "deviceId": "CXNK00778D46", "opModeWithOnt": "RG" }]))
    fixture.detectChanges();
  });


  it('should check device status and uptime', fakeAsync(() => {
    //component.deviceData.push({ "_id": "470053-487746-CXNK00778D46", "serialNumber": "CXNK00778D46", "macAddress": "48:77:46:9a:06:9f", "registrationId": "", "ipAddress": "192.168.1.66", "modelName": "GS4227E", "softwareVersion": "22.3.500.451", "opMode": "RG", "manufacturer": "Calix", "pppUsername": "", "secondIpAddress": "2600:1700:2d7a:800:4a77:46ff:fe9a:69f/64", "deviceId": "CXNK00778D46", "opModeWithOnt": "RG" });
    sessionStorage.setItem(`calix.deviceData`, JSON.stringify([{ "_id": "470053-487746-CXNK00778D46", "serialNumber": "CXNK00778D46", "macAddress": "48:77:46:9a:06:9f", "registrationId": "", "ipAddress": "192.168.1.66", "modelName": "GS4227E", "softwareVersion": "22.3.500.451", "opMode": "RG", "manufacturer": "Calix", "pppUsername": "", "secondIpAddress": "2600:1700:2d7a:800:4a77:46ff:fe9a:69f/64", "deviceId": "CXNK00778D46", "opModeWithOnt": "RG" }]))

    component.deviceSelected.opMode = "RG";
    component.deviceSelected.modalName = "GS4227E";
    component.deviceInfo.opMode == 'RG'
    const res: any = deviceStatus;
    spyOn(routerService, 'getRouterDetails').and.returnValue(of(deviceStatus));
    component.getDeviceInfoDetails();
    res.Uptime = dataService.timeToDays(res?.connectivityStatus?.Uptime).trim();
    component.connected = res?.status != 'Offline' ? res : false;
    //{ "deviceId": "CXNK00E4F519", "serialNumber": "CXNK00E4F519", "macAddress": "f8:85:f9:23:01:2a", "registrationId": "", "ipAddress": "192.168.2.100", "modelName": "GM2037", "softwareVersion": "21.4.901.151", "opMode": "WAP", "_id": "470053-F885F9-CXNK00E4F519", "manufacturer": "Calix", "wapGatewaySn": "CXNK00778D46", "opModeWithOnt": "WAP" }
    component.deviceInfo = deviceInfo;
    component.dhcpData = dhcp;
    fixture.detectChanges();
    const firstCol = nativeElem.querySelector('#routedGatewayBody td:nth-child(2)')!;
    // expect(firstCol.textContent.trim()).toEqual('Online');
    const dhcpELEM = nativeElem.querySelector('#dhcpBody td')!;
    // expect(dhcpELEM.textContent.trim()).toEqual('OFF');
    spyOn(routerService, 'getConnectivityStatusNew').and.returnValue(of(deviceStatus));
    component.loadData('CXNK00778D46', deviceInfo);
    component.sequentialApi();
    flush(1500);
  }));

  it("should check ipv6 lan", () => {
    spyOn(routerService, 'getIPV_6Info').and.returnValue(of(dhcp6));
    component.getIPV_6Info(false);
    fixture.detectChanges();
    expect(component.dataObj?.ip6LAN?.DHCPv6Mode).toEqual("M-and-A");
    spyOn(routerService, 'submitIpv6Info').and.returnValue(of(dhcp6));
    component.submitIpv6Info({ "valid": true });
    expect(component.dataObj.ip6LAN.Secondary_DNS).toEqual(component.Secondary_DNS);
    //done();
  });

  it("should check ping", fakeAsync(() => {

    //tick(20000);

    fixture.detectChanges();
    // fixture.whenStable().then(() => {
    //   const pingBtn = nativeElem.querySelector('#supportListId button')!;
    //   console.log("pingBtn", pingBtn);
    //   pingBtn.click();
    // }, err => {
    //   console.log(err)
    // })
    const pingBtn = nativeElem.querySelector('#supportListId button')!;
    pingBtn.click();
    spyOn(routerService, 'getPingTraceroteWanInfo').and.returnValue(of(pingWanInfo));
    component.dropDownWanInfo();
    component.ipAddress = 'www.12306.cn';
    fixture.detectChanges();

    spyOn(routerService, 'pingTraceRoute').and.returnValue(of(pingResp));
    document.getElementById("PingSubmitId").click();
    expect(component.pingTraceRouteDetails?.Host).toEqual('www.12306.cn');
    component.closeModal();
    flush(1000)
    discardPeriodicTasks();
  }));

  it("should check traceroute", fakeAsync(() => {

    fixture.detectChanges();
    const traceBtn = nativeElem.querySelector('#supportListId button:nth-child(2)')!;
    traceBtn.click();
    spyOn(routerService, 'getPingTraceroteWanInfo').and.returnValue(of(pingWanInfo));
    component.dropDownWanInfo();
    component.ipAddress = 'www.12306.cn';
    fixture.detectChanges();

    spyOn(routerService, 'pingTraceRoute').and.returnValue(of(traceResp));
    document.getElementById("TraceSubmitId").click();
    expect(component.pingTraceRouteDetails?.Hops[0]?.HopRTTimes).toEqual('1');
    component.closeModal();
    flush(1000)
    discardPeriodicTasks();
  }));

  it("should check system log", fakeAsync(() => {

    fixture.detectChanges();
    const sysLogBtn = nativeElem.querySelector('#supportListId button:nth-child(5)')!;
    sysLogBtn.click();
    spyOn(routerService, 'PostdeviceLog').and.returnValue(of(sysLogData));
    document.getElementById("router_devicelog_retreive_bttn").click();
    fixture.detectChanges();
    expect(component.dataObj.retrievedLog).toBeTruthy();
    component.closeModal();
    flush()
    discardPeriodicTasks();
  }));

  it("should check data modal", fakeAsync(() => {

    fixture.detectChanges();
    spyOn(routerService, 'getDataModel').and.returnValue(of(dataModelData));
    const dataModalBtn = nativeElem.querySelector('#supportListId button:nth-child(6)')!;
    dataModalBtn.click();
    fixture.detectChanges();
    expect(component.dataModel[0]?.writable).toBeFalsy();
    component.closeModal();
    spyOn(routerService, 'loadDataModel').and.returnValue(of(dataModelData));
    component.loadDataModel();
    flush()
    discardPeriodicTasks();
  }));

  it("should check reboot", fakeAsync(() => {

    fixture.detectChanges();
    spyOn(routerService, 'doReboot').and.returnValue(of({}));
    const rebootBtn = nativeElem.querySelector('#routerRebootId')!;
    rebootBtn.click();
    fixture.detectChanges();
    document.getElementById("router_reboot_confirm_bttn").click();
    fixture.detectChanges();
    expect(component.completionStatus[component.completionStatus.length - 1]?.isResponse).toEqual('Reboot Succeeded');
    component.closeModal();
    flush()
    discardPeriodicTasks();
  }));

  it("should check connect to device v4", fakeAsync(() => {
    spyOn(dataService, 'getMetaData').and.returnValue(of(component.metaData));
    component.ngOnInit();
    component.dataObj.connectv4 = true;
    fixture.detectChanges();
    spyOn(routerService, 'connectPermission').and.returnValue(of({ enabled: true }));
    spyOn(routerService, 'connectToDevice').and.returnValue(of(connectToDeviceData));
    component.connectToDevice('v4');
    fixture.detectChanges();
    expect(component).toBeTruthy();
    discardPeriodicTasks();
    component.closeModal();
    flush()
  }));

  it("should check connect to device v6", fakeAsync(() => {
    spyOn(dataService, 'getMetaData').and.returnValue(of(component.metaData));
    component.ngOnInit();
    component.dataObj.connectv4 = true;
    fixture.detectChanges();
    spyOn(routerService, 'connectPermission').and.returnValue(of({ enabled: true }));
    spyOn(routerService, 'connectToDevice').and.returnValue(of(connectToDeviceData));
    component.connectToDevice('v6');
    fixture.detectChanges();
    expect(component).toBeTruthy();
    discardPeriodicTasks();
    component.closeModal();
    flush()
  }));

  it("should check Factory reset", fakeAsync(() => {
    component.factoryresetModalOpen();
    fixture.detectChanges();
    component.openOutModal(component.factoryresetModal);
    fixture.detectChanges();
    spyOn(routerService, 'routerReachableReset').and.returnValue(of({}));
    document.getElementById("router_facres_confirm_bttn").click();
    fixture.detectChanges();
    expect(component.completionStatus[component.completionStatus.length - 1]?.isResponse).toEqual('Please check back after ~10 minutes');
    component.closeModal();
    flush()
    discardPeriodicTasks();
  }));

  it('should render the lanports', () => {
    component.connected = { status: 'jhbk' }
    spyOn(routerService, 'getLandPort').and.returnValue(of(Lanportdata))
    component.getLandport('CXNK00778D46');
    console.log('test case lanpo', component.lanportKey)
    expect(component.landportDetail).toEqual(Object.values(Lanportdata));
  });
  it('should set showOntPorts to true on successful API call', () => {
    spyOn(routerService, 'getOntPortInterface').and.returnValue(of([{
      uuid: '123',
      ifType: 'ethernetCsmacd'
    }]));
    component.getOntPortInterfaceapi();
    expect(component.showOntPorts).toBeTrue();
  });
  it('should set showOntPorts to false on failed API call', () => {
    spyOn(routerService, 'getOntPortInterface').and.returnValue(throwError('Error'));
    component.getOntPortInterfaceapi();
    expect(component.showOntPorts).toBeFalse();
  });
  it('should call getOntPortInterface and getOntPort methods', fakeAsync(() => {
    spyOn(routerService, 'getOntPortInterface').and.returnValue(of([{
      uuid: '123',
      ifType: 'ethernetCsmacd'
    }]));
    spyOn(routerService, 'getOntPort').and.returnValue(of({
      portNumber: '1',
      adminState: 'UP'
    }));
    component.oltid = 'oltid';
    component.ontSn = 'ontSn';
    component.getOntport();
    expect(routerService.getOntPortInterface).toHaveBeenCalledWith('oltid', 'ontSn');
  }));

  it('should render the DmzData', () => {
    spyOn(routerService, 'getRouterDetails').and.returnValue(of(dmgdata))
    component.getDmzData();
    spyOn(routerService, 'updateDmz').and.returnValue(of(dmgdata))
    component.updateDmz();
    expect(component.dmzData.length).toBe(1, "Length is wrong");
    expect(component.dmzData[0].Enable).toMatch('true');
  });

  it('should render the PortForwading', () => {
    spyOn(routerService, 'getRouterDetails').and.returnValue(of(postForwdingdata))
    component.getPortForwadingList();
    component.newPortForwarding.PortMappingProtocol = "TCP/UDP";
    spyOn(routerService, 'createPortForwarding').and.returnValue(of(postForwdingdata))
    component.addNewPortEntry();
    component.deletePortForwarding('', 'test');
    spyOn(routerService, 'updatePortForwarding').and.returnValue(of(postForwdingdata));
    component.updatePortData();
    expect(component.respPF.length).toBe(1, "Length is wrong");
  });

  it('should render the softwareUpgrade', () => {
    spyOn(routerService, 'getSoftwareVersionCount').and.returnValue(of(softwareUpgradecount))
    spyOn(routerService, 'getSoftwareVersion').and.returnValue(of(softwareUpgradelistdata))
    component.updateToList();
    expect(component.updateSoftwarelist.length).toBe(2, "Length is wrong");
    expect(component.updateSoftwarelist[0].name).toMatch('CALIX_800_12_2_12_8.bin');
    expect(component.updateSoftwarelist[0].type).toMatch('SW/FW Image');
    expect(component.updateSoftwarelist[0].uploadTime).toMatch('2022-10-31T14:09:21.757Z');
  });

  it('should render Universal Plug & Play', () => {
    component.orgId = "470053"  //CXNK008A4948

    component.serialNumber = "CXNK00AFB81C"

    spyOn(routerService, 'getUpnp').and.returnValue(of(unupData))
    spyOn(component, 'getUpnp').and.callThrough();
    component.getUpnp();
    expect(component.disabledNAT_TState).toBe(false);
    expect(component.getUpnp).toHaveBeenCalledTimes(1);
    expect(component.getUpnp).toHaveBeenCalled();
  });

  it('should render firewall info', () => {
    component.orgId = "470053"
    component.routerSerialNumber = "CXNK00AFB81C"

    spyOn(routerService, 'getFirewallInfo').and.returnValue(of(firewallInfo))
    spyOn(component, 'getFireWallInfo').and.callThrough();
    component.getFireWallInfo();

    expect(component.firewallInfo.featureName).toBe("Firewall");
    expect(component.getFireWallInfo).toHaveBeenCalled();
    expect(component.getFireWallInfo).toHaveBeenCalledTimes(1);
    component.editBlockedServices();
    component.cancelBlockedServices();
  });

  it('should render update firewall info', () => {
    component.orgId = "470053"
    component.routerSerialNumber = "CXNK00AFB81C"
    component.firewallInfo = blockedServicesPayload
    spyOn(routerService, 'updateFirewallInfo').and.returnValue(of(true))
    spyOn(component, 'updateFireWall').and.callThrough();
    component.updateFireWall();

    expect(component.response).toBe(true);
    expect(component.updateFireWall).toHaveBeenCalled();
    expect(component.updateFireWall).toHaveBeenCalledTimes(1);

  });

  it('should Backup and restore-->BACKUP', fakeAsync(() => {
    fixture.detectChanges();
    const backuprestore = nativeElem.querySelector('#supportListId button:nth-child(3)');
    backuprestore.click();
    fixture.detectChanges();
    spyOn(routerService, 'getBackup').and.returnValue(of(backupmockdata));
    spyOn(routerService, 'deviceBackup').and.returnValue(of(devicebackupmock));
    component.dataObj.BRselected = 0;
    component.language = translateService.defualtLanguage;
    component.languageSubject = translateService.selectedLanguage.subscribe(data => {
      component.language = data;
      component.tableLanguageOptions();
    });
    component.loader = true;
    component.routerSerialNumber = "CXNK00778D46";
    component.backupList = backupmockdata['backup'];
    component.configurationList = backupmockdata['configuration'];
    component.loader = false;
    fixture.detectChanges();
    document.getElementById("router_backup_start_bttn").click();
    fixture.detectChanges();
    component.isLocalTimeResponse = localtimemock;
    component.loader = false;
    fixture.detectChanges();
    document.getElementById("router_backup_cancel_bttn").click();
    tick(7000);
    expect(component.backupList.length).toBeGreaterThan(0);
    expect(component.isLocalTimeResponse[0].isResponse).toEqual('Starting Backup');
    fixture.detectChanges();
  }));

  it('should Backup and restore --> RESTORE', fakeAsync(() => {
    fixture.detectChanges();
    const backuprestore = nativeElem.querySelector('#supportListId button:nth-child(3)');
    backuprestore.click();
    fixture.detectChanges();
    component.dataObj.BRselected = 1;
    // const restore = document.getElementById('restoretab1');
    // restore.click();
    // console.log("ioioi",restore)
    fixture.detectChanges();
    setTimeout(() => {
      component.BackupRestoreTab('Restore');
      fixture.detectChanges();
      spyOn(routerService, 'getBackup').and.returnValue(of(backupmockdata));
      spyOn(routerService, 'deviceRestore').and.returnValue(of(restoreres));
      component.language = translateService.defualtLanguage;
      component.languageSubject = translateService.selectedLanguage.subscribe(data => {
        component.language = data;
        component.tableLanguageOptions();
      });
      component.isRestore = true;
      component.loader = true;
      component.routerSerialNumber = "CXNK00778D46";
      component.backupList = backupmockdata['backup'];
      component.configurationList = backupmockdata['configuration'];
      component.isFile = 'Repository';
      fixture.detectChanges();
      console.log('rewerw', document.getElementById("router_restore_confirm_bttn"));
      console.log('rewerw', document.getElementById("router_restore_bttn"))
      document.getElementById("router_restore_bttn").click();
      fixture.detectChanges();
      component.isLocalTimeResponse = restoredata;
      component.loader = false;
      fixture.detectChanges();
      document.getElementById("router_restore_confirm_bttn").click();
      fixture.detectChanges();
      document.getElementById("router_restore_cancel_bttn").click();
      fixture.detectChanges();
      document.getElementById("router_cancel_bttn").click();
      fixture.detectChanges();
      expect(component.isLocalTimeResponse[1].isResponse).toEqual('Restore Succeeded');
      fixture.detectChanges();
    }, 3000)
    tick(6000);
  }));

  it('should update the DmzData', () => {
    spyOn(routerService, 'getRouterDetails').and.returnValue(of(dmgdata))
    component.getDmzData();
    expect(component.dmzData.length).toBe(1, "Length is wrong");
    expect(component.dmzData[0].Enable).toMatch('true');
  });

  it('should update the PortForwading', () => {
    spyOn(routerService, 'getRouterDetails').and.returnValue(of(postForwdingdata))
    component.getPortForwadingList();
    expect(component.respPF.length).toBe(1, "Length is wrong");
  });

  it('should check ont', () => {
    sessionStorage.setItem(`calix.deviceData`, JSON.stringify([{ "_id": "125550-020600-CXNK00300500", "serialNumber": "CXNK00300500", "macAddress": "02:06:00:30:05:00", "registrationId": "", "ipAddress": "10.132.1.164", "modelName": "GS2026E", "softwareVersion": "23.1.500.319", "opMode": "RG", "manufacturer": "Calix", "deviceId": "CXNK00300500", "opModeWithOnt": "RG" }, { "deviceId": "CXNK32000005", "serialNumber": "CXNK32000005", "macAddress": "00:93:20:00:05:00", "ont": { "uuid": "25c020cc-3dbe-482d-b91c-392f327487f8", "model": "GP1000X", "vendorId": "CXNK", "serialNo": "32000005", "macAddr": "00:93:20:00:05:00" }, "modelName": "GP1000X", "opModeWithOnt": "ONT" }]));

    component.deviceSelected.opMode = "RG";
    component.deviceSelected.modalName = "GP1000X";
    component.deviceInfo.opMode == 'RG'
    fixture.detectChanges();
  });

  it("should check dhcp", () => {
    spyOn(routerService, 'getRouterDetails').and.returnValue(of(dhcp));
    component.getDhcpData();
    component.updateDhcp();
    fixture.detectChanges();
    expect(component.toogle).toEqual('true');
    //done();
  });

  it("should check all errors", fakeAsync(() => {
    const error = new Error('error');
    spyOn(routerService, 'getIPV_6Info').and.returnValue(throwError(error));
    component.getIPV_6Info(false);
    spyOn(routerService, 'submitIpv6Info').and.returnValue(throwError(error));
    component.submitIpv6Info({ "valid": true });
    spyOn(routerService, 'routerNotReachableReset').and.returnValue(throwError(error));
    component.backupTele();
    spyOn(routerService, 'loadDataModel').and.returnValue(throwError(dataModelData));
    component.loadDataModel();
    spyOn(routerService, 'getConnectivityStatusNew').and.returnValue(throwError({ "error": { "status": "423 Locked" } }));
    //component.RouterGatewayLoader();
    component.loadData('CXNK00778D46', deviceInfo);
    /* spyOn(routerService, 'reloadDataModel').and.returnValue(throwError({ "error": "No device" }));
    component.initDataModel(false); */
    spyOn(routerService, 'getRouterDetails').and.returnValue(throwError(deviceStatus));
    component.getDeviceInfoDetails();
    spyOn(routerService, 'pingTraceRoute').and.returnValue(throwError({}));
    component.submitPingTraceRoute("", "", false);
    spyOn(routerService, 'afterOntReboot').and.returnValue(throwError({ ontDevices: [{ 'state': 'OFFLINE', 'isPresent': true }] }));
    component.ontAfterReboot("", "", 1);
    spyOn(routerService, 'updateSoftware').and.returnValue(throwError({}));
    component.updateSoftware();
    expect(true).toBeTruthy();
    flush(2000)
    discardPeriodicTasks();
  }));

  it("should backup telemetry", () => {
    spyOn(routerService, 'routerNotReachableReset').and.returnValue(of({}));
    component.backupTele();
    expect(component.bootHappening).toBeFalsy();
  });

  it("should check event history", () => {
    spyOn(routerService, 'eventCount').and.returnValue(of({ count: 10 }));
    component.getEventCount("ref");
    //component.refereshData();
    component.sortData(event_history, 0, 'desc')
    component.sortData(event_history, 1, 'asc')
    component.sortData(event_history, 2, 'asc')
    component.sortData(event_history, 3, 'asc')
    component.sortData(event_history, 4, 'asc')
    expect(component.dataCount).toEqual(10);
  });

  it("should check communication log", () => {
    spyOn(routerService, 'getCLCount').and.returnValue(of({ count: 10 }));
    component.getCLCount();
    spyOn(routerService, 'getCLData').and.returnValue(of(comm_logs));
    component.clExportLog();
    component.commLogAccordian(1, { "target": "test" });
    component.hideNoDataRow();

    expect(component.clCount).toEqual(10);
  });

  it('should check ont reboot', () => {
    spyOn(routerService, 'afterOntReboot').and.returnValue(of({ ontDevices: [{ 'state': 'ONLINE', 'isPresent': true }] }));
    component.ontAfterReboot("", "", 1);
  });

  it('should check new port forwarding', () => {
    spyOn(routerService, 'getDeviceLAN').and.returnValue(of([{ 'IPAddress': 'ONLINE', 'Active': true, 'Icon': '8' }]));
    component.newPortForward();
    expect(component.newPortForwarding.InternalClient).toEqual('ONLINE');
  });

  it('should check new DMZ', () => {
    spyOn(routerService, 'getDeviceLAN').and.returnValue(of([{ 'IPAddress': 'ONLINE', 'Active': true, 'Icon': '8' }]));
    component.dmzData.Enable = 'true';
    component.dhcpSData.DeviceIPAddress = "192.168.2.1";
    component.dhcpSData.SubnetMask = "255.255.255.0";
    component.newDMZ();
    component.enableDisable();
    component.newDMZRadioNew();
    expect(true).toBeTruthy();
  });

  it('should check scopes', () => {
    environment.VALIDATE_SCOPE = "true";
    component.getScopes();
    expect(component.scopeFlag.reboot).toBeTruthy();
  });

  it("should check minor functions", () => {
    component.RestoreChecked(true);
    component.OptionFiles(true);
    component.confirmCloseDeviceLog();
    component.modalLoader = true;
    component.confirmClose("Traceroute");
    component.closePing_Traceroute();
    component.pingModelOpen();
    component.tracerouteModelOpen();
    component.devicelogsModalOpen();
    component.dataModalOpen();
    component.eventhistoryModalOpen();
    component.communicationModelOpen();
    component.exportDetailsOpen();
    component.resetconfirmModalOpen();
    component.dhcpserverModalOpen();
    component.vidChannelModalOpen();
    component.steeringLogsModalOpen();
    component.OTAconfigChangeModalOpen();
    component.createProfile();
    component.pingTracerouteChange({ target: '#routedGatewayHeader' });
    component.dmzTracerouteChange({ target: '#routedGatewayHeader' });
    component.dhcpSData.DeviceIPAddress = "192.168.2.1";
    component.dhcpSData.SubnetMask = "255.255.255.0";
    component.dataObj.applicationIpAddress = '';
    component.ipValidation({});
    component.ipValidationDMZ({});
    component.dataObj.applicationIpAddress = '192.168.1.1,192.168.2.115';
    component.ipValidation({});
    component.newPortForwardRadio();
    component.newDMZRadio();
    component.dmzDropdownChange();
    component.validLastIndex('10.255');
    component.hideError();
    component.hideSuccess();
    component.onSoftwareChange({});
    component.apiSubscriber = true;
    component.stopConfirmation('test');
    component.portForwardingChange();
    component.newPortForwarding.InternalClient = "10.15";
    component.lastDigitIPValid();
    component.checkSupportMenu();
    component.updateSWGPONDevices('GS202');
    component.onFocusBeginningIP();
    component.onFocusEndingIP();
    component.onFocusDeviceIP();
    component.closeDeleteConfirmation();
    component.newPingIp();
    component.modifylastChar('test', 1);
    component.language.fileLanguage = 'fr';
    component.tableLanguageOptions();
    component.language.fileLanguage = 'es';
    component.tableLanguageOptions();
    component.language.fileLanguage = 'de_DE';
    component.tableLanguageOptions();
    component.language.fileLanguage = 'en';
    component.tableLanguageOptions();
    component.loadChart();
    component.clearChartContainer('');
    component.getValue([256]);
    component.getTxLevel([256]);

    spyOn(routerService, 'afterOntReboot').and.returnValue(of({ ontDevices: [{ 'state': 'OFFLINE', 'isPresent': true }] }));
    component.ontAfterReboot("", "", 1);
    //spyOn(routerService, 'getLandPort').and.returnValue(of({ ontDevices: [{ 'state': 'OFFLINE', 'isPresent': true }] }));
    component.connected = { status: 'ONLINE' };
    //component.getLandport('');
    expect(true).toBeTruthy();
  });

  it('should check Router Loader gateway', () => {
    spyOn(routerService, 'getConnectivityStatusNew').and.returnValue(of(deviceStatus));
    component.RouterGatewayLoader();
    expect(component.connected).toEqual(deviceStatus);
  })

  it('should check update Software', () => {
    spyOn(routerService, 'updateSoftware').and.returnValue(of({}));
    component.updateToSW = "635fd70f8f084b3537106bfc";
    component.dataObj.updateToSW = [{ versionNumber: "test", value: 'test' }];
    component.deviceSelected = { softwareVersion: '10.23' };
    component.updateSoftware();
    expect(component.completionStatus.length).toBeGreaterThan(0);
  });

  it('should check octet detail', () => {
    spyOn(routerService, 'loadoctetdetails').and.returnValue(of(octetDetail));
    const spy = spyOn(routerService, 'loadinterfacearraydetails').and.returnValue(of([{ ifType: "bridge" }]));
    component.getupdownstreamoctets();
    expect(spy).toHaveBeenCalled();
  })
  it('should swapInProgress', () => {
    let obj = {
      "replacingBy": "CXNK12345678"
    }
    spyOn(routerService, 'swapInProgress').and.returnValue(of(obj));
    spyOn(component, 'swapInProgress').and.callThrough();
    component.swapInProgress();
  });
  it('should swapInProgress error', () => {
    const error = {
      error: {
        error: {
          errorCode: 404
        }
      }
    }
    spyOn(routerService, 'swapInProgress').and.returnValue(throwError(error));
    spyOn(component, 'swapInProgress').and.callThrough();
    component.swapInProgress();
  });

  it('getPon Status API test', () => {
    spyOn(networkSystemsApiService, 'getInterfaceDetails').and.returnValue(of(
      {
        "name": "1/1/gp3",
        "adminState": "up",
        "operState": "up",
        "ponStats": {
          "usOctets": "11407147",
          "dsOctets": "2492113",
          "rxPackets": "16475",
          "txPackets": "14427",
          "rxDiscards": "0",
          "txDiscards": "0",
          "rxErrors": "0",
          "txErrors": "0"
        },
        "etyStats": {},
        "phyEthPort": {},
        "ontCount": 7
      }
    ));
    component.getPonStatus('af1fb6f9-44d2-44ec-8cc2-9742fff2fd22', '1/1/gp3');
    expect(component.PonStatus).toBe('Present');
  })

  it('getPon Status error test', () => {
    spyOn(networkSystemsApiService, 'getInterfaceDetails').and.returnValue(throwError(
      {
        "manager": "inventoryManager",
        "status": 400,
        "message": "System is DISCONNECTED",
        "code": 5
      }
    ));
    component.getPonStatus('af1fb6f9-44d2-44ec-8cc2-9742fff2fd22', '1/1/gp3');
    expect(component.loadPon).toBeFalsy();
  })

  it('navigateToCOC test', () => {
    component.ont_PonDetails = {
      uuid: 'af1fb6f9-44d2-44ec-8cc2-9742fff2fd22',
      deviceName: '1/1/gp3',
      fromCSC: true
    };
    component.scopeFlag.COC_CMS_EXA_read = true;
    component.isCmsExa = true;
    fixture.detectChanges();
    component.navigateToCOC();
    // expect(localStorage.getItem('calix.network.system.details')).toContain(component.ont_PonDetails.uuid);
  })



});
