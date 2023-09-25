import { ExternalFileServerService } from './../../shared/service/external-file-server.service';
import { Component, OnInit, OnDestroy, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ExternalFileServerModel } from '../../shared/model/external-file-server-model';
import { UrlPattern } from '../../shared/service/utility-class';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-external-file-server-form',
  templateUrl: './external-file-server-form.component.html',
  styleUrls: ['./external-file-server-form.component.scss'],
  providers: [ExternalFileServerService, SsoAuthService]
})
export class ExternalFileServerFormComponent implements OnInit {
  @ViewChild('myForm') form: NgForm;
  disableSubmit: boolean = false;
  language: any;
  languageSubject;
  orgId: string;
  externalFileServerObj: ExternalFileServerModel = new ExternalFileServerModel();
  public errorMsg: string;
  public showError: boolean = false;
  public showSuccess: boolean = false;
  public successMsg: string;
  urlPattern = UrlPattern;
  loading: boolean = false;
  hasWriteAccess: boolean = false;
  scopes: string;
  isPwdVisble: boolean = true;
  constructor(private translateService: TranslateService, private router: Router, private titleService: Title,
    public ssoAuthService: SsoAuthService, private externalFileService: ExternalFileServerService) {
    this.orgId = this.ssoAuthService.getOrgId();
    this.scopes = this.ssoAuthService.getScopes();
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.successMsg = this.language['successfully updated'];
    });
    if (this.router.url.includes('cco/operations/cco-subscriber-operations')) {
      this.titleService.setTitle(`${this.language['External File Server']} - ${this.language['Configuration']} - ${this.language['Subscriber_Operations']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);

    } else if (this.router.url.includes('/support/netops-management')) {
      this.titleService.setTitle(`${this.language['External File Server']} - ${this.language['Configurations']} - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    }


    if (!this.router.url.includes('/cco/services/configuration')) {
      if (environment.VALIDATE_SCOPE) {
        this.scopes['cloud.rbac.csc.netops.config.ext_file_server'] = this.scopes['cloud.rbac.csc.netops.config.ext_file_server'] ? this.scopes['cloud.rbac.csc.netops.config.ext_file_server'] : [];
        if (this.scopes && (this.scopes['cloud.rbac.csc.netops.config.ext_file_server'] && this.scopes['cloud.rbac.csc.netops.config.ext_file_server'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
      }
      this.scopes['cloud.rbac.csc.netops.config.ext_file_server'] = this.scopes['cloud.rbac.csc.netops.config.ext_file_server'] ? this.scopes['cloud.rbac.csc.netops.config.ext_file_server'] : [];
      if (this.scopes && (this.scopes['cloud.rbac.csc.netops.config.ext_file_server'] && this.scopes['cloud.rbac.csc.netops.config.ext_file_server'].indexOf('write') !== -1)) {
        this.hasWriteAccess = true;
      }
    } else {
      if (environment.VALIDATE_SCOPE) {
        if (this.scopes && (this.scopes['cloud.rbac.coc.services.configuration.externalfileserver'].includes('write'))) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
      }
    }


    this.fetchExternalFileServer();
  }

  fetchExternalFileServer() {
    this.loading = true;
    this.externalFileService.getExternalFileServer(this.orgId).subscribe((res: ExternalFileServerModel) => {
      // this.externalFileServerObj = res;
      this.loading = false;
    }, error => {
      this.loading = false;

      this.errorMsg = error.error.error;
      this.showError = true;
    }
    )
  }
  formValidate() {
    if (this.form.form.status == "INVALID") {
      this.disableSubmit = true;
    } else {
      this.disableSubmit = false;
    }
  }

  onSubmit() {
    if (this.form.form.status == "INVALID") {
      this.disableSubmit = true;
    } else {
      this.disableSubmit = false;

      this.loading = true;

      this.externalFileService.postExternalFileServer(this.externalFileServerObj).subscribe(x => {
        this.loading = false;
        this.showSuccess = true;
        this.successMsg = this.language['successfully updated'];
        if (window.location.href?.indexOf('/cco/services/configuration/external-file-server-form') !== -1) {
          this.router.navigate(['./cco/services/configuration/external-file-server-list']);
          return;
        }
        this.ssoAuthService.redirectByUrl([
          '/support/netops-management/configuration/external-file-server-list',
          '/cco/operations/cco-system-operations/external-file-server', '',
          '/cco/operations/cco-subscriber-operations/configurations/external-file-server-list'
        ]);
      }, error => {

        this.loading = false;
        this.errorMsg = error.error.error;
        this.showError = true;
      }
      )
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

    if (window.location.href?.indexOf('/cco/services/configuration/external-file-server-form') !== -1) {
      this.router.navigate(['./cco/services/configuration/external-file-server-list']);
      return;
    }

    this.ssoAuthService.redirectByUrl([
      '/support/netops-management/configuration/external-file-server-list',
      '/cco/operations/cco-system-operations/external-file-server', '',
      '/cco/operations/cco-subscriber-operations/configurations/external-file-server-list'
    ]);
  }

  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }

}
