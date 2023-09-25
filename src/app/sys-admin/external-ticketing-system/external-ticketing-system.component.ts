import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NgForm } from '@angular/forms';
import * as jquery from 'jquery';
import { ExternaTicketingServiceService } from 'src/app/support/netops-management/shared/externa-ticketing-service.service';
import { CommonService } from '../services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-external-ticketing-system',
  templateUrl: './external-ticketing-system.component.html',
  styleUrls: ['./external-ticketing-system.component.scss'],
  providers: [ExternaTicketingServiceService]
})
export class ExternalTicketingSystemComponent implements OnInit {


  language;
  languageSubject;
  orgId = this.sso.getOrgId()
  externalTicketData: any = {};
  loading = false;
  saveDisable: boolean = false;
  errorThrown: boolean;
  test: any;
  TempexternalTicketData: any = {}
  Frame = [{ id: 'NISC', name: 'NISC' }];
  exteranalTicketDefualtValue: string = 'NISC';
  public successMsg: string;
  public errorMsg: string;
  MODULE:any;
  patternvalidation = '^https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]?:[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]?\/[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]?.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]?.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]?.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]$' &&
    '^https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}$'
  public extUserPassword: string;
  constructor(
    private translateService: TranslateService,
    private sso: SsoAuthService,
    private externalTicketingservice: ExternaTicketingServiceService,
    private commonOrgService: CommonService,
    private router: Router,
    private titleService: Title,

  ) {
    this.commonOrgService.currentPageAdder('externalticketingsystem');

    let url = this.router.url;
    this.MODULE = this.sso.getRedirectModule(url);
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['External_ticket_System']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['External_ticket_System']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    this.getExternalticketDetails()
  }
  extrefError404: boolean = false;
  private showSuccessAlert(msg: string) {
    jquery('.alert.alert-success').show();
    this.successMsg = msg;
    setTimeout(() => {
      this.closeAlert();
    }, 2000);
  }
  private showDeleteAlert(msg: string) {
    jquery('.alert.alert-error').show();
    jquery('.alert.alert-error').addClass('alert-danger')
    this.errorMsg = msg;
    // setTimeout(() => {
    //   this.closeAlert();
    // }, 20000);
  }
  getExternalticketDetails() {
    this.loading = true;
    this.externalTicketingservice.externalticketDetails(this.orgId).subscribe(data => {
      this.externalTicketData = data
      this.TempexternalTicketData = JSON.parse(JSON.stringify(this.externalTicketData))
      this.extUserPassword = data?.password;
      // this.test = data
      this.extrefError404 = false;
      // ththis.externalTicketDatais.loading = false;
      this.saveDisable = false;
      this.loading = false;
      // if (this.externalTicketData.errorcode == "NOT_FOUND") {
      //   this.errorThrown = true;
      // }
    }, (err) => {
      if (err.status === 404) {
        // this.externalTicketData = {};
        this.extrefError404 = true;
        this.loading = false;
        this.clearFields();
      }
      this.loading = false;

    })
  }
  // if (this.externalTicketData.errorcode == "NOT_FOUND") {
  //   this.errorThrown = true;
  // }
  cancelExternalticketDetails(ngform: NgForm) {

    this.externalTicketData = JSON.parse(JSON.stringify(this.TempexternalTicketData));
    this.extUserPassword = this.TempexternalTicketData?.password;
    // if (Object.keys(this.TempexternalTicketData).length === 0) {
    //   ngform.reset();
    // }
  }
  externalTicketFormUpdate(externalTicketData: NgForm) {
    this.loading = true;

    // this.externalTicketingservice.externalticketDetails(this.orgId).subscribe(data => {
    //   this.externalTicketData = data
    //   this.test = data
    //   // ththis.externalTicketDatais.loading = false;
    //   this.saveDisable = false;
    //   // if (this.externalTicketData.errorcode == "NOT_FOUND") {
    //   //   this.errorThrown = true;
    //   // }
    // });


    const obj = {
      "orgId": parseInt(this.orgId),
      "companyNumber": externalTicketData.value.companyNumber,
      "url": externalTicketData.value.url,
      "username": externalTicketData.value.username,
      "password": this.extUserPassword,
      "name": externalTicketData.value.name
    }

    // this.externalTicketingservice.updateExternalticketDetails(obj).subscribe(data => {
    //   this.externalTicketData = data
    //   // this.loading = false;
    // });
    // this.loading = true;
    if (this.extrefError404) {
      this.externalTicketingservice.updatePutExternalticketDetails(obj).subscribe(data => {
        this.externalTicketData = data
        this.getExternalticketDetails()

        this.loading = false;
        this.showSuccessAlert("Added Successfully");
        this.isButtonDisabled = true;
        this.externalTicketData.form.markAsDirty()
        this.externalTicketData.form.markAsPristine()
        this.externalTicketData.form.resetForm();
        // this.isTestButtonDisabled = false;

      }, (err) => {
        if (err.status === 404){
          this.clearFields();
        }
        this.loading = false;
      });
    }
    else {
      this.externalTicketingservice.updateExternalticketDetails(obj).subscribe(data => {
        this.externalTicketData = data
        this.getExternalticketDetails()
        this.loading = false;
        this.showSuccessAlert("Updated Successfully");
        this.isButtonDisabled = true;
        this.externalTicketData.form.markAsDirty()
        this.externalTicketData.form.markAsPristine()
        this.externalTicketData.form.markAsUnTouched()
        // this.isTestButtonDisabled = false;
      }, (err) => {
        if (err.status === 404){
          this.clearFields();
        }
        this.loading = false;
      });
    }
  }
  deleteticketDetails(ngform: NgForm) {
    this.loading = true;
    this.externalTicketingservice.deleteExternalticketDetails(this.orgId).subscribe(data => {
      this.externalTicketData = {};
      this.TempexternalTicketData = {};
      this.extUserPassword = '';
      // ngform.reset()
      this.test = undefined;
      this.loading = false;
      this.showDeleteAlert("Deleted Successfully")
    }, (err) => {
      this.loading = false;
    });
    this.getExternalticketDetails();
    // ngform.reset();
    // this.exteranalTicketDefualtValue = 'NISC';
    // this.config.bindValue = 'NISC'
    // this.Frame[0].name = 'NISC'

  }
  public closeAlert(): void {
    jquery('.alert').hide();
  }

/*   changeTR143() {
    if (this.externalTicketData.url.length == 0 || this.externalTicketData.username.length == 0 || this.externalTicketData.password.length == 0 || this.externalTicketData.companyNumber.length == 0) {
      this.saveDisable = true;
    } else {
      this.saveDisable = false;
    }
  } */

  // resetFields() {
  //   this.externalTicketData = '';
  // }
  passwordHide: boolean = false;
  passwordedit() {
    this.passwordHide = !this.passwordHide;
  }
  UrlTestConnection: any
  etsbaseUrl: string;
  isButtonDisabled: boolean = true;
  isTestButtonDisabled: boolean = true;
  testConnection(externalTicketData: NgForm) {
    let Url = "";
    this.etsbaseUrl = externalTicketData.value.url.split('/')[2];
    Url = `${externalTicketData.value.url.split('/')[0]}//${this.etsbaseUrl}/services/secured/trouble-ticket-priorities`;
    if (externalTicketData.value.url.includes('www.')) {
      this.etsbaseUrl = externalTicketData.value.url.split('/')[0]
      Url = `${externalTicketData.value.url.split('/')[0]}/services/secured/trouble-ticket-priorities`;

    }
    this.loading = true;
    const obj = {
      "orgId": parseInt(this.orgId),
      "companyNumber": externalTicketData.value.companyNumber,
      "url": Url,
      "username": externalTicketData.value.username,
      "password": this.extUserPassword,
      "name": externalTicketData.value.name
    }
    this.externalTicketingservice.testUrlExternalticketDetails(obj).subscribe(data => {
      this.UrlTestConnection = data
      this.showSuccessAlert(" Connection Successful");

      this.isButtonDisabled = false
      this.loading = false;


    }, err => {
      this.loading = false;
      if (err.status) {
        if (err.status === 500) {
          this.showDeleteAlert(' NISC URL is not valid');
        }
        else if (err.status === 401) {
          this.showDeleteAlert(' Username or Password is invalid');
        } else if (err.status === 403) {
          this.showDeleteAlert(" Credentials are correct but permissions are missing ")
        }
        else {
          this.showDeleteAlert(' NISC URL is not valid');
        }
      }
    });
  }
  changeButtonDisabled() {
    this.isButtonDisabled = true

  }

  clearFields(){
    this.externalTicketData.username='';
    this.extUserPassword ='';
    this.externalTicketData.companyNumber='';
    this.externalTicketData.url='';
  }


}