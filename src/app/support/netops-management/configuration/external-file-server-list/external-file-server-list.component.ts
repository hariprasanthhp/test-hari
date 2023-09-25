import { SsoAuthService } from './../../../../shared/services/sso-auth.service';
import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { ExternalFileServerModel } from '../../shared/model/external-file-server-model';
import { ExternalFileServerService } from '../../shared/service/external-file-server.service';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';

@Component({
  selector: 'app-external-file-server-list',
  templateUrl: './external-file-server-list.component.html',
  styleUrls: ['./external-file-server-list.component.scss'],
  //providers: [ExternalFileServerService, SsoAuthService]
})
export class ExternalFileServerListComponent implements OnInit {
  language: any;
  languageSubject;
  externalFileServerObj: ExternalFileServerModel = new ExternalFileServerModel();
  @ViewChild('deleteExternalFileServerModal', { static: true })
  private deleteExternalFileServerModal: TemplateRef<any>;
  orgId: string;
  public errorMsg: string;
  public showError: boolean = false;
  public showSuccess: boolean = false;
  public successMsg: string;
  tableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    processing: false,
    ordering: false,
    dom: "t"
  };
  modalRef: any;
  modalTitle;
  modalInfo;
  loading: boolean = true;
  addExternalServerForm: boolean = false;
  dtTrigger: Subject<any> = new Subject<any>();
  dtRendered = true;
  hasWriteAccess: boolean = false;
  scopes: string;
  deleteData: string;
  showExternalServerForm: boolean = true;
  hasScopeAccess = false;
  constructor(private translateService: TranslateService, public ssoAuthService: SsoAuthService,
    private cdr: ChangeDetectorRef, private dialogService: NgbModal,
    private externalFileServerService: ExternalFileServerService,
    private titleService: Title,
    private commonOrgService: CommonService,
    public router: Router) {
    this.scopes = this.ssoAuthService.getScopes();
  }
  setTitle(url) {
    if (this.router.url.includes('cco/services/configuration/external-file-server-list')) {
      this.titleService.setTitle(`${this.language['External File Server']} - ${this.language['Configuration']} - ${this.language['Services']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);

    } else if (this.router.url.includes('/support/netops-management')) {
      this.titleService.setTitle(`${this.language['External File Server']} - ${this.language['Configurations']} - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.successMsg = 'successfully Deleted!!';
      this.setTitle(this.router.url)
    });

    this.setTitle(this.router.url)
    this.orgId = this.ssoAuthService.getOrgId();
    if (!this.router.url.includes('cco/services')) {
      if (environment.VALIDATE_SCOPE) {
        this.scopes['cloud.rbac.csc.netops.config.ext_file_server'] = this.scopes['cloud.rbac.csc.netops.config.ext_file_server'] ? this.scopes['cloud.rbac.csc.netops.config.ext_file_server'] : [];
        if (this.scopes['cloud.rbac.csc.netops.config.ext_file_server'].length) {
          this.hasScopeAccess = true;
        }
        if (this.scopes && (this.scopes['cloud.rbac.csc.netops.config.ext_file_server'] && this.scopes['cloud.rbac.csc.netops.config.ext_file_server'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    } else {
      let enttlmnts = this.ssoAuthService.getEntitlements();
      if (this.router.url.includes('cco/services') && enttlmnts[210] && !enttlmnts[102]) {
        this.showExternalServerForm = false;
      }
      if (environment.VALIDATE_SCOPE) {
        if (this.scopes['cloud.rbac.coc.services.configuration.externalfileserver']?.length) {
          this.hasScopeAccess = true;
        }
        if (this.scopes && (this.scopes['cloud.rbac.coc.services.configuration.externalfileserver']?.includes('write'))) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    }

    if (!this.hasScopeAccess) {
      this.ssoAuthService.setPageAccess(false);
      return;
    }

    this.fetchExternalFileServerList();
  }

  fetchExternalFileServerList() {
    this.loading = true;
    this.externalFileServerService.getExternalFileServer(this.orgId).subscribe((res: ExternalFileServerModel) => {
      this.externalFileServerObj = res;

      if (this.externalFileServerObj.name) {

        this.addExternalServerForm = false;
      } else {
        // destroy you current configuration
        this.dtRendered = false;
        this.addExternalServerForm = true;
        this.tableOptions = {
          processing: false,
          ordering: false,
          dom: "t",
        }
        // make sure your template notices it
        this.cdr.detectChanges();
        // initialize them again
        this.dtRendered = true
        this.cdr.detectChanges();
      }
      this.dtTrigger.next();
      this.loading = false;
    }, err => {

      this.loading = false;
      // this.errorMsg = error.error.error;
      // this.showError = true;
      this.pageErrorHandle(err);
    })
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorMsg = this.language['Access Denied'];
    } else {
      this.errorMsg = this.ssoAuthService.pageErrorHandle(err);
    }
    if (err.status === 503) {
      this.errorMsg = "Service Temporarily Unavailable"
    }
    // this.closeAlert();
    this.showError = true;
  }

  deleteExternalFileServer() {
    this.closeModal();
    this.loading = true;
    this.externalFileServerService.deleteExternalFileServer(this.orgId).subscribe(x => {
      this.loading = false;
      this.deleteData = "";
      this.showSuccess = false;
      this.successMsg = this.language['successfully Deleted!!'];
      this.fetchExternalFileServerList();
    }, error => {

      this.loading = false;
      this.deleteData = "";
      this.errorMsg = error.error.error;
      this.showError = true;
    })
  }
  deleteConfigFileModal() {
    this.deleteData = this.orgId;
    this.modalTitle = "";
    this.modalInfo = `the selected external file server?`
    // this.closeModal();
    // this.modalRef = this.dialogService.open(this.deleteExternalFileServerModal);
  }

  closeModal(): void {
    this.deleteData = "";
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
  hideError() {
    this.showError = false;
    this.errorMsg = '';
  }
  hideSuccess() {
    this.showSuccess = false;
    this.successMsg = '';
  }

  gotoExternalFileServer() {

    if (window.location.href?.indexOf('/cco/services/configuration/external-file-server-list') !== -1) {
      this.router.navigate(['./cco/services/configuration/external-file-server-form']);
      return;
    }

    this.ssoAuthService.redirectByUrl([
      '/support/netops-management/configuration/external-file-server-form',
      '/cco/operations/cco-system-operations/external-file-server/external-file-server-form', '',
      '/cco/services/configuration/external-file-server-form'
    ])
  }
  ngOnDestroy() {
    this.languageSubject.unsubscribe();
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
