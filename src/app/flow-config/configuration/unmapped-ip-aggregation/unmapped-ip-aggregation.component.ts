import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { EndpointManagementService } from '../../services/endpoint-management.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-unmapped-ip-aggregation',
  templateUrl: './unmapped-ip-aggregation.component.html',
  styleUrls: ['./unmapped-ip-aggregation.component.scss']
})
export class UnmappedIpAggregationComponent implements OnInit, OnDestroy {

  @ViewChild('infoModal', { static: true }) private infoModal: TemplateRef<any>;
  
  public language: any;
  public unmappedIpAggregationStatus = false;
  private ORG_ID: string;
  public loading: boolean;
  private orgSubs: any;
  private updateSubs: any;
  private orgData: any;
  public infoTitle: string;
  public infoBody: string;
  private modalRef: any;
  public showButton = false;

  constructor(private translateService: TranslateService,
    private titleService: Title,
    private router: Router,
    private sso: SsoAuthService,
    private service: EndpointManagementService,
    private commonOrgService: CommonService,
    private dialogService: NgbModal
    ) {
    const url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.language = this.translateService.defualtLanguage;
    this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Unmapped IP Aggregation']} - ${this.language['Configurations']} - ${this.language['flowconfiguration']} - ${MODULE === 'systemAdministration' ? 
      this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });
    const MODULE = this.sso.getRedirectModule(url);
    this.titleService.setTitle(`${this.language['Unmapped IP Aggregation']} - ${this.language['Configurations']} - ${this.language['flowconfiguration']} - ${MODULE === 'systemAdministration' ? 
    this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);

   }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.orgSubs) {
      this.orgSubs.unsubscribe();
    }
    if (this.updateSubs) {
      this.updateSubs.unsubscribe();
    }
  }

  private getData() {
    this.loading = true;
    this.orgSubs = this.service.getOrg(this.ORG_ID).subscribe((res: any) => {
      this.orgData = res;
      if (this.orgData) {
        if (this.orgData && this.orgData.entitlement && this.orgData.entitlement.length) {
          this.unmappedIpAggregationStatus = this.orgData.entitlement.split(',').includes('ALLOWUNMAPPED') ? true : false;
          this.orgData.entitlement.split(',').includes('ALLOWUNMAPPED')
        } else {
          this.unmappedIpAggregationStatus = false;
        }
      } else {
        this.unmappedIpAggregationStatus = false;
      }
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    })
  }

  public submit() {
    this.loading = true;
    this.commonOrgService.closeAlert();
    this.updateSubs = this.service.addUnmappedIdAggregation(this.ORG_ID, this.unmappedIpAggregationStatus).subscribe((res: any) => {
      this.loading = false;
      this.showButton = false;
      this.getData();
      this.closeModal();
    }, (err: HttpErrorResponse) => {
      this.closeModal();
      this.getData();
      this.pageErrorHandle(err);
    })
  }

  public changeUnmappedIpAggregation() {
    this.unmappedIpAggregationStatus = !this.unmappedIpAggregationStatus;
    const unMappedIpAggregationFlag = this.orgData?.entitlement?.split(',')?.includes('ALLOWUNMAPPED') ? true : false
    if (this.unmappedIpAggregationStatus === unMappedIpAggregationFlag) {
      this.showButton = false
    } else {
      this.showButton = true;
    }
  }

  public closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  private openInfoModal() {
    this.closeModal();
    this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
  }

  private pageErrorHandle(err: HttpErrorResponse) {
    let errorInfo = '';
    if (err.status == 400 || err.status == 404) {
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
      }
      this.commonOrgService.openErrorAlert(errorInfo);
      this.commonOrgService.pageScrollTop();
      this.loading = false;
    }
  }

}
