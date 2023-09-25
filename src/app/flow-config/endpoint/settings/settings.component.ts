declare var require: any;
const $: any = require('jquery');
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
// import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
// import { AuthService } from '../../../shared/services/auth.service';
import { EndpointManagementService } from '../../services/endpoint-management.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  @ViewChild('infoModal', { static: true }) private infoModal: TemplateRef<any>;
  @ViewChild('confirmModal', { static: true }) private confirmModal: TemplateRef<any>;


  language: any;
  pageAvailable: boolean = false;

  @ViewChild('closeConfirm', { static: true }) private closeConfirm;

  endpointDiscoveries: any;
  endpointDiscoverySelected: any = 'outbound';
  age: number;
  orgData: any;

  ORG_ID: string;
  loading: boolean;
  infoTitle: string;
  infoBody: string;
  showButton: boolean;
  loaded: boolean;
  modalRef: any;
  translateSubscribe: any;
  listSubs: any;
  createSubs: any;
  updateSubs: any;
  mappingSourceFlag = false;
  errorMessage:any;
  constructor(
    // private customTranslateService: CustomTranslateService,
    private router: Router,
    private service: EndpointManagementService,
    private sso: SsoAuthService,
    private dialogService: NgbModal,
    private commonOrgService: CommonService,
    private translateService: TranslateService,
    private titleService: Title
  ) {
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);

    this.language = this.translateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Settings']} - ${this.language['end']} - ${this.language['flowconfiguration']} - ${MODULE === 'systemAdministration' ? 
      this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });

    this.commonOrgService.closeAlert();//*Imp

    let MODULE = this.sso.getRedirectModule(url);
    this.titleService.setTitle(`${this.language['Settings']} - ${this.language['end']} - ${this.language['flowconfiguration']} - ${MODULE === 'systemAdministration' ? 
    this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
  }

  ngOnInit() {
    // this.endpointDiscoveries = [
    //   {
    //     name: 'Outbound Traffic',
    //     value: 'outbound'
    //   },
    //   {
    //     name: 'Inbound Traffic',
    //     value: 'inbound'
    //   },
    //   {
    //     name: 'All Traffic',
    //     value: 'both'
    //   }
    // ];

    //this.age = 0;
    this.getData();
  }

  ngAfterViewInit(): void {
    this.loaded = true;
  }

  ngOnDestroy(): void {

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.listSubs) {
      this.listSubs.unsubscribe();
    }
    if (this.createSubs) {
      this.createSubs.unsubscribe();
    }
    if (this.updateSubs) {
      this.updateSubs.unsubscribe();
    }


  }

  getData() {
    this.listSubs = this.service.getOrg(this.ORG_ID).subscribe((res: any) => {
      this.orgData = res;
      if (!res) {
        // this.createData();

      } else {
        if (this.orgData && this.orgData.retentionPeriodDays != undefined) {
          this.age = this.orgData.retentionPeriodDays;
        }
      }

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    })
  }

  createData() {
    let params = {
      orgId: this.ORG_ID,
      tenantId: 0
    }
    this.createSubs = this.service.createOrg(this.ORG_ID, params).subscribe((res: any) => {
      this.orgData = res;
      this.loading = false;
      this.showButton = false;
      if (this.orgData && this.orgData.retentionPeriodDays != undefined) {
        this.age = this.orgData.retentionPeriodDays;
      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    })
  }

  changeAge() {
    if (this.orgData && this.orgData.retentionPeriodDays) {
      if (this.orgData.retentionPeriodDays != this.age) {
        this.showButton = true;
      } else {
        this.showButton = false;
      }
    } else {
      this.showButton = true;
    }
  }

/* CCL-41516 & CCL-42411 */
  public validateTimeDelay(): void {
    if (this.age == null || isNaN(this.age) || ((this.age < 5 || this.age > 200))) {
      this.infoTitle = '';
      this.infoBody = this.language['Age Out days should be between 5 to 200'];
      this.closeModal();
      this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
      return;
    } else if (!this.orgData || !this.orgData.nameFormat || (!JSON.parse(this.orgData.nameFormat).length)) {
      this.mappingSourceFlag = true;
      this.openConfirmModal(false);
    } else {
      this.openConfirmModal(true)
    }
  }

  openConfirmModal(flag) {
    if (flag) {
      this.infoTitle = this.language['Confirm change :'];
      // if (this.age != undefined && this.age != 0) { /* CCL-41516  */
        this.infoBody = `${this.language.ageOut}: ${this.age} ${this.language.days}`;
        /* CCL-41516  */
      // } else if (this.age != undefined && this.age == 0) {
        // this.infoBody = `${this.language['Age Out: 0 day will disable Age Out Days']}`;
      // } else if (this.age == undefined) {
        // this.infoBody = `${this.language.ageOut}: ${this.language['180 (using default value) Days']}`;
      // }
      this.mappingSourceFlag = false;
    } else {
      this.infoTitle = `${this.language['Info']} :`;
      this.infoBody = this.language['There is no mapping source. Would you like to continue?'];
    }
    this.closeModal();
    this.modalRef = this.dialogService.open(this.confirmModal, { backdrop: 'static', keyboard: false });
  }

  save() {
    this.commonOrgService.closeAlert();
    let empty = {
      orgId: this.ORG_ID
    }
    let params = (this.orgData && this.orgData != null) ? this.orgData : empty;
    if (this.age != undefined) {
      params['retentionPeriodDays'] = this.age;
    } else {
      params['retentionPeriodDays'] = 180;
    }
    this.updateSubs = this.service.updateOrgPUT(this.ORG_ID, params).subscribe((res: any) => {
      this.orgData = res;
      this.loading = false;
      this.showButton = false;
      if (this.orgData && this.orgData.retentionPeriodDays) {
        this.age = this.orgData.retentionPeriodDays;
      }
      this.closeModal();
    }, (err: HttpErrorResponse) => {
      this.closeModal();
      this.pageErrorHandle(err);
    })
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  pageErrorHandle(err: HttpErrorResponse) {
    let errorInfo = '';
    if (err.status == 400) {
      this.infoBody = this.commonOrgService.pageInvalidRqstErrorHandle(err);
      this.infoTitle = 'Error';
      this.openInfoModal();
      this.loading = false;
    } else {
      if (err.status == 401) {
        this.errorMessage=this.language['Access Denied'];
        errorInfo = this.language['Access Denied'];
      } else {
        errorInfo = this.commonOrgService.pageErrorHandle(err);
        if (err.status == 404 && errorInfo == "Invalid organization provided for update") {
          errorInfo = this.language["Invalid Age Out value provided for update"];
        }
      }
      this.commonOrgService.openErrorAlert(errorInfo);
      this.commonOrgService.pageScrollTop();
      this.loading = false;
    }

  }

  openInfoModal() {
    this.closeModal();
    this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
  }

}
