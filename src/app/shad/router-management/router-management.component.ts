import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
import { ManageRouterService } from "../service/manage-router.service";
//import { RouterService } from '../../../app-services/routing.services';
import * as $ from "jquery";
import { SsoAuthService } from "../../shared/services/sso-auth.service";
import { TranslateService } from 'src/app-services/translate.service';


@Component({
  selector: 'app-router-management',
  templateUrl: './router-management.component.html',
  styleUrls: ['./router-management.component.scss']
})
export class RouterManagementComponent implements OnInit {

  //@ViewChild('content', { static: true }) private contentModal: TemplateRef<any>;

  @ViewChild('removeRouterModal', { static: true }) private removeRouterModal: TemplateRef<any>;
  @ViewChild('removeRouterInfoModal', { static: true }) private removeRouterInfoModal: TemplateRef<any>;
  @ViewChild('removeRouterConfirmModal', { static: true }) private removeRouterConfirmModal: TemplateRef<any>;
  @ViewChild('removeRouterSuccessModal', { static: true }) private removeRouterSuccessModal: TemplateRef<any>;
  @ViewChild('firmwareUpdateRouterModal', { static: true }) private firmwareUpdateRouterModal: TemplateRef<any>;
  @ViewChild('notremoveRouterInfoModal', { static: true }) private notremoveRouterInfoModal: TemplateRef<any>;
  @ViewChild('confirmfirmwareUpdateRouterModal', { static: true }) private confirmfirmwareUpdateRouterModal: TemplateRef<any>;
  @ViewChild('errorfirmwareUpdateRouterModal', { static: true }) private errorfirmwareUpdateRouterModal: TemplateRef<any>;
  @ViewChild('successfirmwareUpdateRouterModal', { static: true }) private successfirmwareUpdateRouterModal: TemplateRef<any>;
  @ViewChild('macErrorModal', { static: true }) private macErrorModal: TemplateRef<any>;
  @ViewChild('servicePermissionModal', { static: true }) private servicePermissionModal: TemplateRef<any>;
  @ViewChild('servicePermissionErrorModal', { static: true }) private servicePermissionErrorModal: TemplateRef<any>;

  refreshApps: boolean = false;
  macErrorHeader: string = '';
  macErrorBody: string = '';
  routerRemoveText: string = '';
  loader: boolean = false;
  id: any = '';
  editMode = false;
  searched = false;

  routerData: any;
  checkedServices: any = [];
  modalRef: any;

  removeRouterData: any;
  updateRouterData: any;
  appdata: any;
  appRouterId: any;
  appRouterName: any;
  interval: any;
  doInstallService: any;
  doGetRouterData: any;
  doGetAppData: any;
  hideApplicationsList: boolean = false;

  allowInstall: boolean = false;
  allowServicePer: boolean = false;

  language: any = {};
  languageSubject;

  constructor(
    private dialogService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private service: ManageRouterService,
    //private routerService: RouterService,
    private sso: SsoAuthService,
    private translateService: TranslateService

  ) { }

  ngOnInit() {

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    // scopes

    let scope = this.sso.getScopes();

    if (scope['cloud.shad.service'] && scope['cloud.shad.service'].indexOf('write') !== -1) {
      this.allowInstall = true;
      this.allowServicePer = true;
    }

    //scopes ended

    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id != undefined) {
      if (!this.isValidMAC(this.id)) {
        this.macErrorHeader = this.language['MAC_Address'];
        this.macErrorBody = this.language['Please enter valid MAC Address'];
        if (this.modalRef) {
          this.close();
        }

        this.modalRef = this.dialogService.open(this.macErrorModal);
        return;
      }
      this.editMode = true;
      this.searched = true;
      this.loader = true;
      this.service.getRouter(this.id);

    }


    this.getRouterData();
    this.getAppData();



    this.interval = setInterval(() => {
      if (this.refreshApps) {
        this.service.getApplicationsByRouter(this.routerData['searchRouterId']);

        $('#new-router-id-status-submit').prop('disabled', true);
      } else {
        if (this.appdata && this.appdata['readyToInstallApps'] && !this.appdata['readyToInstallApps'].length) {
          $('#new-router-id-status-submit').prop('disabled', true);
        } else {
          $('#new-router-id-status-submit').prop('disabled', false);
        }

      }
    }, 5000);
  }

  isValidMAC(mac_address: any): any {
    let regexp = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/i;
    if (regexp.test(mac_address)) {
      return true;
    } else {
      return false;
    }
  }

  search() {

    this.searched = false;
    if (this.modalRef) {
      this.close();
    }

    if (!this.id) {
      this.macErrorHeader = this.language['MAC_Address'];
      this.macErrorBody = this.language['Please enter MAC Address'];
      setTimeout(() => {
        this.modalRef = this.dialogService.open(this.macErrorModal);
      }, 200);

      return;
    }

    this.id = this.id.trim();

    if (!this.isValidMAC(this.id)) {
      this.macErrorHeader = this.language['MAC_Address'];
      this.macErrorBody = this.language['Please enter valid MAC Address'];

      setTimeout(() => {
        this.modalRef = this.dialogService.open(this.macErrorModal);
      }, 200);

      return;
    }
    this.loader = true;
    //this.searched = false;
    this.service.getRouter(this.id);
    // this.getRouterData();
    // this.getAppData();
  }
  editFunction() {
    this.editMode = true;
  }
  cancel() {
    this.editMode = false;
    this.search();
  }
  submit() {
    /** to fix MAP-3170 */
    // if (this.routerData && this.routerData.parentRouter && this.routerData.parentRouter.status !== 'GOOD') {
    //   this.macErrorHeader = 'Info';
    //   this.macErrorBody = 'Router is Offline';
    //   if (this.modalRef) {
    //     this.close();
    //   }
    //   this.modalRef = this.dialogService.open(this.macErrorModal);
    //   return;
    // }
    this.checkedServices = this.service.removeDuplicates(this.checkedServices);

    let unSelectedContainers = [];

    ////console.log(this.routerData.containersSelected);

    for (let i = 0; i < this.routerData.containersSelected.length; i++) {
      if (this.checkedServices.indexOf(this.routerData.containersSelected[i]) == -1) {
        unSelectedContainers.push(this.routerData.containersSelected[i]);
      }
    }

    //console.log(unSelectedContainers);

    for (let i = 0; i < unSelectedContainers.length; i++) {
      if (this.appdata.processingApps.indexOf(unSelectedContainers[i]) !== -1) {
        let serviceName = this.routerData.containersAllowedObj[unSelectedContainers[i]];
        //Modal.show("Info", "Service " + serviceName + " installing is in progress");
        this.macErrorHeader = this.language['Info'];
        this.macErrorBody = this.language['Service']+ ' ' + serviceName + this.language['installing is in progress'];
        if (this.modalRef) {
          this.close();
        }
        this.modalRef = this.dialogService.open(this.macErrorModal);

        return;
      }

    }

    this.editMode = false;
    this.loader = true;
    this.service.routerContainerUpdate(this.checkedServices).subscribe(
      (res: any) => {
        this.loader = false;
        this.service.getRouter(this.routerData.searchRouterMacId);
        if (this.modalRef) {
          this.close();
        }

        this.modalRef = this.dialogService.open(this.servicePermissionModal);
      },
      (err: any) => {
        //console.log(err);
        this.loader = false;

      }
    );;
  }

  getRouterData() {
    this.doGetRouterData = this.service.routerDF$.subscribe(
      (res: any) => {
        console.log(res);
        this.checkedServices = [];
        if (res && res['routerDataLoaded']) {
          this.loader = false;
        }

        if (res && res['error'] && res['error'].error) {
          if (this.modalRef) {
            this.close();
          }
          this.macErrorHeader = this.language['Error'];
          this.macErrorBody = res['error'].error.errorDesc;

          this.modalRef = this.dialogService.open(this.macErrorModal);
          this.loader = false;
          return;
        }

        if (res && res['containerInputs']) {
          //console.log(res['containerInputs']);
          for (let i = 0; i < res['containerInputs'].length; i++) {
            if (res['containerInputs'][i]['checked']) {
              this.checkedServices.push(res['containerInputs'][i]['value']);
            }
          }
        }

        this.hideApplicationsList = res['hideApplicationsList'];

        this.routerData = res;
        this.changeRouterMac(res['searchRouterId']);
        this.searched = true;
        ////console.log(this.routerData);

      },
      (err: any) => {
        //console.log(err);
        this.loader = false;

      }
    );
  }

  onRightClick() {
    alert('right click');
  }

  selectService(e: any, value: any) {
    if (e.target.checked) {
      this.loader = true;
      this.checkedServices.push(value);
      this.service.checkContainerPermission(value).subscribe((data: any) => {
        this.loader = false;
        if (data && data.isServicePermissonValid) {
          //$(e).prop("checked", true);

        } else {
          this.checkedServices.splice(this.checkedServices.indexOf(value), 1);
          this.macErrorHeader = this.language['Info'];
          this.macErrorBody = this.language['This app is not available for user’s router'];
          if (this.modalRef) {
            this.close();
          }
          this.modalRef = this.dialogService.open(this.macErrorModal);
          return;
        }

      }, (err: any) => {
        this.loader = false;
        this.macErrorHeader = this.language['Info'];
        this.macErrorBody = this.language['This app is not available for user’s router'];
        if (this.modalRef) {
          this.close();
        }
        this.modalRef = this.dialogService.open(this.macErrorModal);
        return;
      });
    } else {
      this.checkedServices.splice(this.checkedServices.indexOf(value), 1);
    }

    //console.log(this.checkedServices);

  }

  close(): void {
    this.modalRef.close();
  }

  loadRemoveRouterModal(router: any): void {
    router['userId'] = this.routerData['userData']['userId'];
    this.removeRouterData = router;
    //console.log(this.removeRouterData);
    if (this.routerData['hasSub'] && this.routerData['parentRouter'].routerId == router.routerId) {
      this.routerRemoveText = this.language['All routers will be removed'];
    } else {
      this.routerRemoveText = this.language['Router will be removed'];
    }

    if (this.modalRef) {
      this.close();
    }

    this.modalRef = this.dialogService.open(this.removeRouterModal);
  }

  loadRemoveRouterInfoModal(): void {
    if (this.modalRef) {
      this.close();
    }
    //console.log(this.routerData['parentRouter']);
    if (this.routerData['hasSub'] && this.removeRouterData.routerId == this.routerData['parentRouter'].routerId) {
      this.modalRef = this.dialogService.open(this.notremoveRouterInfoModal);
      return;
    }
    this.modalRef = this.dialogService.open(this.removeRouterInfoModal);
  }

  loadRemoveRouterConfirmModal(): void {
    if (this.modalRef) {
      this.close();
    }
    this.modalRef = this.dialogService.open(this.removeRouterConfirmModal);
  }

  loadRemoveRouterSuccessModal(): void {
    if (this.modalRef) {
      this.close();
    }

    setTimeout(() => {
      this.modalRef = this.dialogService.open(this.removeRouterSuccessModal);
    }, 200);


  }

  disableRemoveRouterBtn: boolean = false;
  removeRouter(): void {
    //this.close();
    this.disableRemoveRouterBtn = true;
    this.service.removeRouter(this.removeRouterData).subscribe(() => {

      this.service.getRouterCount(this.id).subscribe((json: any) => {
        if (json && json.routers) {
          this.service.getRouter(this.id);
        } else {
          this.searched = false;
        }

      }, (error: any) => {
        this.searched = false;
      });

      this.disableRemoveRouterBtn = false;
      this.loadRemoveRouterSuccessModal();


    },
      (error: any) => {
        this.disableRemoveRouterBtn = false;
      }
    );
  }

  searchAfterRemoveRouterClose(): void {
    if (this.modalRef) {
      this.close();
    }



    //this.search();

  }

  updateFrimwareForSatellite($event: any, router: any): any {
    ////console.log($event.target);
    this.updateRouterData = router;
    if (this.routerData.parentRouter.firmwareVersion != this.updateRouterData.firmwareVersion) {
      if (this.modalRef) {
        this.close();
      }
      this.modalRef = this.dialogService.open(this.firmwareUpdateRouterModal);
    }

    return false;
  }

  confirmUpdateFirmwareVersion(): void {
    if (this.modalRef) {
      this.close();
    }
    this.modalRef = this.dialogService.open(this.confirmfirmwareUpdateRouterModal);
  }

  updateFirmwareVersion(): void {
    let data = {
      modelNumber: this.updateRouterData.modelNumber,
      firmwareVersion: this.routerData['parentRouter'].firmwareVersion
    };

    this.service.getFWIdByModelVersion(data).subscribe((jdata: any) => {
      if (jdata && typeof jdata.results == "object" && jdata.results.length) {
        let data = jdata.results;
        let firmwareId = data[0].id;
        let updateDateTime = Number((new Date()).getTime());

        let inpData = {
          firmwareId: firmwareId,
          macAddr: [this.updateRouterData.routerMac],
          updateType: "immediate",
          updateDateTime: Number(updateDateTime)
        }
        this.service.updateFirmwareVersion(inpData).subscribe((jdata: any) => {
          if (this.modalRef) {
            this.close();
          }
          this.modalRef = this.dialogService.open(this.successfirmwareUpdateRouterModal);
          setTimeout(() => {
            this.close();
            //this.routerService.routerManagementPageEdit(this.routerData.searchRouterMacId);
          }, 1000);

        });
      } else {
        if (this.modalRef) {
          this.close();
        }
        this.modalRef = this.dialogService.open(this.errorfirmwareUpdateRouterModal);
      }
    }, (err: any) => {

    });
  }

  changeRouterMac(routerId?: any) {
    ////console.log(routerId);
    this.appRouterId = routerId;
    this.service.getApplicationsByRouter(routerId);
  }

  getAppData() {
    this.doGetAppData = this.service.appsData$.subscribe((res) => {
      console.log(res);
      this.appdata = res;
      this.refreshApps = res['refreshApps'];
    });
  }

  checkAllowApp(e: any): void {
    let check = false;
    let allowToSelect = false;
    let selectedRT: any;
    if (e.target.checked) {
      //e.target.checked = false;
      check = true;
      selectedRT = e.target.value;
      this.appRouterName = selectedRT;

      for (var y = 0; y < this.routerData.containersSelected.length; y++) {
        if (selectedRT == this.routerData.containersSelected[y]) {
          allowToSelect = true;
        }
      }

      if (!allowToSelect) {
        if (this.modalRef) {
          this.close();
        }
        this.appRouterName = "";
        this.modalRef = this.dialogService.open(this.servicePermissionErrorModal);
      }

      // //console.log(selectedRT);
      // //console.log(check);
      // //console.log(allowToSelect);


    } else {
      this.appRouterName = '';
    }
    $(".ready-to-form-check-input").prop('checked', false);
    $('#new-router-id-status-submit').prop("disabled", true);
    if (check && allowToSelect) {
      e.target.checked = true;
      $('#new-router-id-status-submit').prop("disabled", false);
    }
  }

  installApplication(): void {
    $('#new-router-id-status-submit').prop('disabled', true);

    if (!this.appRouterName) {
      this.macErrorHeader = this.language['Info'];
      this.macErrorBody = this.language['Please select application'];
      if (this.modalRef) {
        this.close();
      }
      this.modalRef = this.dialogService.open(this.macErrorModal);

      return;
    }
    let params: any = {
      routerId: this.appRouterId,
      appId: this.appRouterName
    };

    this.service.checkContainerInstall(this.appRouterName).subscribe((data: any) => {
      if (data && data.isInstallationValid) {
        this.doInstallService = this.service.installApplication(params).subscribe((jdata: any) => {
          this.appRouterName = '';
          this.refreshApps = true;
          $('#new-router-id-status-submit').prop('disabled', false);
        }, (err: any) => {
          $('#new-router-id-status-submit').prop('disabled', false);
          this.macErrorHeader = this.language['Info'];
          this.macErrorBody = err.error.errorDesc;
          if (this.modalRef) {
            this.close();
          }
          this.modalRef = this.dialogService.open(this.macErrorModal);
        }, () => {
          $('#new-router-id-status-submit').prop('disabled', false);
        });

      } else {
        this.macErrorHeader = this.language['Info'];
        this.macErrorBody = this.language['This app is not able to be installed on selected router'];
        if (this.modalRef) {
          this.close();
        }
        this.modalRef = this.dialogService.open(this.macErrorModal);

      }
    }, (err: any) => {
      //console.log(err);
      this.macErrorHeader = this.language['Info'];
      this.macErrorBody = this.language['This app is not able to be installed on selected router'];
      if (this.modalRef) {
        this.close();
      }
      this.modalRef = this.dialogService.open(this.macErrorModal);
    });


  }

  keyDownFunction(event: any) {
    if (event.keyCode == 13) {
      this.search();
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);

    if (this.doInstallService) {
      this.doInstallService.unsubscribe();
    }

    if (this.doGetRouterData) {
      this.doGetRouterData.unsubscribe();
    }

    if (this.doGetAppData) {
      this.doGetAppData.unsubscribe();
    }
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }


  }



}
