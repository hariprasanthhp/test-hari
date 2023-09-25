import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { shareReplay } from 'rxjs-compat/operator/shareReplay';
import { TranslateService } from 'src/app-services/translate.service';
import { ValidatorService } from 'src/app-services/validator.services';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { OrganizationApiService } from 'src/app/sys-admin/services/organization-api.service';
import { WhitelabelService } from '../service/whitelabel.service';

@Component({
  selector: 'app-command-iq-white-label',
  templateUrl: './command-iq-white-label.component.html',
  styleUrls: ['./command-iq-white-label.component.scss']
})
export class CommandIQWhiteLabelComponent implements OnInit {
  CommanDIQForm: FormGroup;
  @ViewChild('removecommandInfoModal', { static: true }) private removecommandInfoModal: TemplateRef<any>;
  language: any;
  languageSubject: any;
  submitted: boolean;
  loading: boolean;
  warningMessage: any;
  isError: boolean;
  successInfo: any;
  success: boolean;
  supportInfo: any[];
  emailmsg: string;
  UrLError: boolean;
  UrLErrorForBilling:boolean
  emailerror: boolean;
  deleteDisabled: boolean;
  error: boolean;
  modalRef: any;
  phonearray: any[];
  isDev: boolean;
  getOrgInfoSubs: any;
  SPID: any;
  ADMIN_ORG_ID: string;

  constructor(private translateService: TranslateService, private dialogService: NgbModal, private validatorService: ValidatorService, private commonOrgService: CommonService, private service: WhitelabelService,
    private titleService: Title,
    private sso: SsoAuthService,
    private router: Router,
    private organizationApiService: OrganizationApiService,
  ) {
    let url = this.router.url;
      this.ADMIN_ORG_ID = this.sso.getOrganizationID(url);
      this.SPID = this.sso.getAdminSPID(this.ADMIN_ORG_ID);
    let MODULE = this.sso.getRedirectModule(url);
    this.titleService.setTitle(`CommandIQ Support Information - ${MODULE === 'systemAdministration' ? 'System Administration' : 'Administration'} - Calix Cloud`);
    this.commonOrgService.currentPageAdder('commandIQ');
  }

  ngOnInit(): void {
    let base = `${environment.API_BASE}`;
    let host = window.location.host;
    if (base.indexOf('/dev.api.calix.ai') > -1 || host.indexOf('localhost') > -1) {
      this.isDev = true;
    } else this.isDev = false;
    if (!this.SPID) {
      this.getOrgInfoSubs = this.organizationApiService.orgInformation(this.ADMIN_ORG_ID).subscribe((res: any) => {
        this.sso.setAdminOrgInfo(res);
        if (res && res.spId) {
          this.SPID = res.spId;
          this.getSupportInfo();
        }
      }, (err: HttpErrorResponse) => {
      })
    }else{
      this.getSupportInfo();
    }
    //this.spid = this.sso.getSPID();
    

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    });
    this.CommanDIQForm = new FormGroup({
      companyAddress: new FormControl(''),
      supportPhoneNumber: new FormControl(''),
      supportEmail: new FormControl(''),
      supportUrl: new FormControl(''),
      billingUrl: new FormControl(''),
      spid: new FormControl(this.SPID)
    });
  }
  get modalForm() { return this.CommanDIQForm.controls; }

  updateInfo() {
    this.submitted = true;
    if (this.CommanDIQForm.value.supportEmail) {
      this.Emailchange(this.CommanDIQForm.value.supportEmail);
    }
    if (this.CommanDIQForm.value.supportUrl) {
      this.urlValidation(this.CommanDIQForm.value.supportUrl,'supportUrl');
    }
    if (this.CommanDIQForm.value.billingUrl) {
      this.urlValidation(this.CommanDIQForm.value.billingUrl,'billingUrl');
    }
    if (this.CommanDIQForm.value.supportUrl || this.CommanDIQForm.value.supportEmail) {
      if (this.emailerror || this.UrLError || this.UrLErrorForBilling) {
        return
      }
    }
    this.CommanDIQForm.patchValue({spid: this.SPID});
    this.service.UpdateSupportInfo(this.CommanDIQForm.value).subscribe((data: any) => {
      this.loading = false;
      let msg = "Successfully Updated";
      this.showSuccessMessage(msg);
      this.success = true;
      this.deleteDisabled = true;
      this.getSupportInfo();
      if (this.isError) {
        this.isError = false;
        this.warningMessage = '';
      }
    }, err => {
      this.loading = false;
      this.pageErrorHandle(err);
    })
  }
  showSuccessMessage(msg: any) {
    this.closeAlert();
    this.successInfo = msg;
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, 2500)
  }
  allowNumersOnly() {
    const string = this.CommanDIQForm.value.supportPhoneNumber;
    this.phonearray = string.split('');
    var regex = new RegExp("^[0-9+()-]+$");
    this.phonearray = this.phonearray.filter(item => (regex.test(item)));
    let text = this.phonearray.join("");
    this.CommanDIQForm.patchValue({ supportPhoneNumber: text })
    return false;
  }
  getSupportInfo() {
    this.loading = true;
    this.service.fetchSupportInfo(this.SPID).subscribe((data: any) => {
      this.loading = false;
      if (data) {
          // if( (data?.supportPhoneNumber || data?.supportEmail || data?.supportUrl)){
          //   this.CommanDIQForm.patchValue(data);
          // }else{
            this.CommanDIQForm.patchValue({supportPhoneNumber: data?.supportPhoneNumber,supportEmail: data?.supportEmail,supportUrl: data?.supportUrl,billingUrl: data?.billingUrl,companyAddress: data?.companyAddress});
          // }
      }
      this.emailerror = false
      this.UrLError = false
      this.UrLErrorForBilling=false
      this.supportInfo = data instanceof Array ? data : [data];
      this.loading = false;
    }, err => {
      this.pageErrorHandle(err);
    })

  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.warningMessage = this.language['Access Denied'];
    } else {
      this.warningMessage = this.commonOrgService.pageErrorHandle(err);
    }
    this.isError = true;
    this.loading = false;
  }
  DeleteInfo() {
    this.loading = true;
    this.submitted = false;
    this.service.DeleteSupportInfo().subscribe((data: any) => {
      this.loading = false;
      this.successInfo = "Successfully Deleted"
      this.closeAllModal();
      this.deleteDisabled = false;
      this.success = true;
      this.getSupportInfo();
    }, err => {
      this.pageErrorHandle(err);
    })
  }
  closeAllModal() {
    this.loading = false;
    this.dialogService.dismissAll();
  }
  closeAlert() {
    this.isError = false;
    this.success = false;
  }
  openDeletemodel() {
    this.getSupportInfo()

  }
  Emailchange(value) {
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
      this.emailmsg = "";
      this.emailerror = false
      return
    } else if (value == '') {
      this.emailmsg = "";
      this.emailerror = false
    }
    else {
      this.emailmsg = "You have entered an invalid email address!";
      this.emailerror = true
      return
    }
  }

  urlValidation(url, val) {
    if(val==='billingUrl'){
      if (url) {
        let errorObj = this.validatorService.urlValidation(url)
        this.UrLErrorForBilling = errorObj.error;
      } else if (url = '') {
        this.UrLErrorForBilling = true;
      }else {
        this.UrLErrorForBilling = false;
      }
    }else{
      if (url) {
        let errorObj = this.validatorService.urlValidation(url)
        this.UrLError = errorObj.error;
      } else if (url = '') {
        this.UrLError = true;
      }else {
        this.UrLError = false;
      }
    }
    

  }
  clsAlphaNoOnly(e) {
    var regex = new RegExp("^[0-9:+()-]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }

    e.preventDefault();
    return false;
  }
  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }

}
