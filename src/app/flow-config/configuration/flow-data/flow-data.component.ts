import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EndpointManagementService } from '../../services/endpoint-management.service';

@Component({
  selector: 'app-flow-data',
  templateUrl: './flow-data.component.html',
  styleUrls: ['./flow-data.component.scss']
})
export class FlowDataComponent implements OnInit {
  @ViewChild('infoModal', { static: true }) infoModal: TemplateRef<any>;

  orgData: any;
  ORG_ID: string;
  loading = false;
  infoTitle: string;
  infoBody: string;
  showButton = false;
  translateSubscribe: any;
  listSubs: any;
  updateSubs: any;
  languageChange: boolean=false;
  modalRef: any;
  useAsmApplication = true;
  language: any;
  success = false;
  dataSourceItems = [];
  public MODULE: string;

  constructor(
    private router: Router,
    public dialogService: NgbModal,
    private sso: SsoAuthService,
    private commonOrgService: CommonService,
    private translateService: TranslateService, 
    private service: EndpointManagementService,
    private titleService: Title
  ) {
    const url = this.router.url;    
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.language = this.translateService.defualtLanguage;
    this.translateSubscribe=this.translateService.selectedLanguage.subscribe(data => {      
      this.language = data;
      this.titleService.setTitle(`${this.language['ASM Application']} - ${this.language['Configurations']} - ${this.language['flowconfiguration']} - ${ this.MODULE === 'systemAdministration' ? 
      this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });
    this.MODULE = this.sso.getRedirectModule(url);
    this.titleService.setTitle(`${this.language['ASM Application']} - ${this.language['Configurations']} - ${this.language['flowconfiguration']} - ${ this.MODULE === 'systemAdministration' ? 
    this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.translateService.selectedLanguage.subscribe(data => {      
      this.language = data;
    })
    this.dataSourceItems = [{
    name: this.language['Use ASM applications data'],
    value: true,
    content: this.language['Uses information detected in IPFIX data provided from AXOS systems']
    },
    {
      name: this.language['Use application data defined by my organization'],
      value: false,
      content: this.language['Uses definitions from the Applications > Definitions tab']
    }
  ];
  this.getData();
  }

  ngOnDestroy(): void {
    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }
    if (this.listSubs) {
      this.listSubs.unsubscribe();
    }
    if (this.updateSubs) {
      this.updateSubs.unsubscribe();
    }
  }

  getData() {
    this.loading = true;
    this.listSubs = this.service.getOrg(this.ORG_ID).subscribe((res: any) => {
      if (res) {
        this.orgData = res;
        this.useAsmApplication =  res?.useAsmApplications;
      } else {
        this.showButton = true;
      }
      this.loading = false;
    }, (err: HttpErrorResponse) => {    
      this.pageErrorHandle(err);
    })
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  openInfoModal() {
    this.closeModal();
    this.modalRef = this.dialogService.open(this.infoModal);
  }

  save() {
    this.loading = true;
    this.commonOrgService.closeAlert();
    const params = {
      useAsmApplications: this.useAsmApplication
    };
    this.updateSubs = this.service.updateOrgPatch(this.ORG_ID, params).subscribe((res: any) => {
      this.useAsmApplication = res?.useAsmApplications;
      if(!this.useAsmApplication){
        this.routeToRealTimeDelay();
      }
      this.loading = false;
      this.showButton = false;
      this.success = true;
       this.getData();
    }, (err: HttpErrorResponse) => {      
      // this.getData();
      this.closeModal();
      this.pageErrorHandle(err);
      //this.warningmsg = false;
    })
  }

  detectChange(event) {
    if (this.useAsmApplication === this.orgData?.useAsmApplications) {
      this.showButton = false;
    } else {
      this.showButton = true;
    }
  }

  pageErrorHandle(err: HttpErrorResponse, value?) {
    let errorInfo = '';
    if (err.status == 400) {
      if (err.error === null) {
        this.infoBody = this.language['Invalid Request'];
      } else {
        this.infoBody = this.commonOrgService.pageInvalidRqstErrorHandle(err);
      }
      this.infoTitle = 'Error';
      this.openInfoModal();
      this.loading = false;
    } else {
      if (err.status == 401) {
        errorInfo = this.language['Access Denied'];
      } else {
        errorInfo = this.commonOrgService.pageErrorHandle(err);
        /* if (err.status == 404 && errorInfo == "Invalid organization provided for update") {
          errorInfo = this.language["Invalid Late Delay value provided for update"];
        } */
      }
        this.commonOrgService.openErrorAlert(errorInfo);
        this.commonOrgService.pageScrollTop();
      
      this.loading = false;
    }

  }
  public routeToRealTimeDelay() {
    this.service.flowDataSync.next({flowDataTab:false});
    this.router.navigateByUrl(`/${this.MODULE}/flowAnalyze/configurations/realtime-delay`);
  }

}
