import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { ProtectIqService } from '../shared/service/protect-iq.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as Quill from 'quill';
import { HttpErrorResponse } from '@angular/common/http';
import { CallOutComeService } from 'src/app/sys-admin/services/call-out-come.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
@Component({
  selector: 'app-arlo-smart',
  templateUrl: './arlo-smart.component.html',
  styleUrls: ['./arlo-smart.component.scss']
})
export class ArloSmartComponent implements OnInit, OnDestroy {
  @ViewChild('escalationProcessEditor', { static: true }) private escalationProcessEditor: TemplateRef<any>;
  account: any = {};
  health: any = [];
  devices: any = [];
  alertMessage: any = '';
  isError: boolean = false;
  accountLoader = false;
  healthLoader = false;
  deviceLoader = false;
  orgId = '';
  overallStatus: number = 1;
  language: any;
  languageSubject: any;
  warningMsg: string;
  RG: any = [];
  isRefresh = false;
  replyTo = '';
  sendTo = '';
  CSR_Data = JSON.parse(localStorage.getItem('calix.login_data'));
  BSP_Data = JSON.parse(sessionStorage.getItem('calix.subscriberInfo'));
  mailSubject = `Calix Partner Escalation from ${this.CSR_Data.firstName} ${this.CSR_Data.lastName} at ${this.CSR_Data.OrgName}`;
  saveCallOutCome: boolean = true;
  quillnew: any;
  mailSubmit: boolean = false;
  fSize = Quill.import('attributors/style/size');
  fFamily = Quill.import('attributors/style/font');
  modalLoader = false;
  emailLoader = false;
  showUndo = false;
  defaultMail: any;
  arloMail = 'noreply@';
  valueInserted = false;
  changescount = 0;

  constructor(
    private service: ProtectIqService,
    private sso: SsoAuthService,
    private translateService: TranslateService,
    private router: Router, private titleService: Title,
    private modalService: NgbModal,
    private callOutComeService: CallOutComeService,
    private CommonFunctionsService: CommonFunctionsService,
  ) {
  }

  ngOnInit(): void {
    this.fSize.whitelist = ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '36px', '40px'];
    this.fFamily.whitelist = ['sans-serif', 'serif', 'monospace'];
    Quill.register(this.fFamily, true);
    Quill.register(this.fSize, true);
    this.orgId = localStorage.getItem("calix.org_id");
    this.RG = sessionStorage.getItem("calix.deviceData") ? JSON.parse(sessionStorage.getItem("calix.deviceData")).filter((obj: any) => (obj.opMode == 'RG')) : [];
    this.getAccount();
    this.getHealth();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Arlo_Secure']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Arlo_Secure']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);

    if (environment.SUMMARY_URL.includes('stg')) {
      this.arloMail += 'partnersupport.stg.calix.com';
    }
    else if (environment.SUMMARY_URL.includes('dev.calix.com')) {
      this.arloMail += 'partnersupport.dev.calix.com';
    }
    else if (environment.SUMMARY_URL.includes('devfunc.calix.com')) {
      this.arloMail += 'partnersupport.devf.calix.com';
    }
    else this.arloMail += 'partnersupport.calix.com';
  }

  getAccount() {
    const subId = sessionStorage.getItem(`calix.subscriberId`);
    const availInd = this.RG.length ? 1 : (subId ? 2 : 0);
    if (!availInd) return;
    this.accountLoader = true;
    this.service.getArloAccount(this.orgId, (availInd == 1 ? this.RG[0]["serialNumber"] : subId), availInd).subscribe((res: any) => {
      this.accountLoader = false;
      this.account = res ? (res?.edgeSuites?.arloSmart ? res.edgeSuites.arloSmart : {}) : {};

      this.account.arloPlan = ['PARTNER_UNLIMITED_CANADA', 'PARTNER_UNLIMITED'].includes(this.account['plan'])
        ? 'Unlimited'
        : ['PARTNER_UNLIMITED_PLUS', 'PARTNER_UNLIMITED_PLUS_CANADA'].includes(this.account['plan'])
          ? 'Unlimited Plus'
          : ['PARTNER_REGULAR', 'PARTNER_REGULAR_CANADA'].includes(this.account['plan'])
            ? (this.account["2kCameras"] || '0')
            : "-";

      if (this.account.userId) this.getDevices(this.account.userId);
    }, err => {
      this.accountLoader = false;
      this.pageErrorHandle(err);
    });
  }

  getDevices(userId) {
    /* 
      User Id with Data - '184493be-dc0b-4821-a0bf-c86c98ec5566'
     */
    this.deviceLoader = true;
    let api = [this.service.getArloDevice(userId)];
    if (this.RG.length) api.push(this.service.getdevices(this.RG[0]["serialNumber"], this.orgId));
    forkJoin(api).subscribe((res: any) => {
      this.deviceLoader = false;
      const macs = (res[1] || []).filter(obj => obj.MACAddress).map(obj => obj.MACAddress);
      this.devices = (res[0]?.devices ? res[0].devices : (res[0] ? res[0] : [])).map(obj => {
        if (macs.includes(obj.macAddress)) obj.hasMacMatched = true;
        return obj;
      });
    }, err => {
      this.deviceLoader = false;
      this.pageErrorHandle(err);
    });
  }

  getHealth() {
    this.healthLoader = true;
    this.service.getArloOverallStatus().subscribe((res: any) => {
      this.healthLoader = false;
      this.health = res?.healths ? res.healths : (res ? res : [])
      this.overallStatus = this.health.filter(obj => !obj.status).length;
    }, err => {
      this.healthLoader = false;
      this.pageErrorHandle(err);
    });
  }

  updateDeviceInfo(deviceId, i) {
    this.isRefresh = true;
    this.deviceLoader = true;
    this.service.updateArloPostDevice(deviceId).subscribe((res: any) => {
      setTimeout(() => {
        this.service.updateArloDevice(deviceId).subscribe((res: any) => {
          this.deviceLoader = false;
          this.isRefresh = false;
          this.devices[i]['battery'] = res?.health?.batteryStatus;
          this.devices[i]['updated'] = res?.health?.updated;
          this.devices[i]['created'] = res?.health?.created;
        }, err => {
          this.deviceLoader = false;
          this.pageErrorHandle(err);
        });
      }, 30000);
    }, err => {
      this.deviceLoader = false;
      this.pageErrorHandle(err);
    });
  }

  pageErrorHandle(err: any) {
    if (err.status === 401) {
      //this.alertMessage = 'Access Denied';
      this.alertMessage = err.error.errorMessage ? err.error.errorMessage : "Unknown Error";
    } else {
      this.alertMessage = this.sso.pageErrorHandle(err);
    }
    this.isError = true;
  }

  copyToClipboard() {
    let text = 'Subject:\n';
    text += `${$('#arloTemplateSubject').text().trim()}\n\nBody:\n`
    $('#arloTemplateBody > *').each(function () {
      text += $(this).prop("tagName") == 'LI' ? ($(this).text().trim() + '\n') : '\n';
    });

    if (!navigator.clipboard) {
      this.copyForOldBrowser(text);
    } else {
      navigator.clipboard.writeText(text).then(function () {
        //console.log('Async: Copying to clipboard was successful!');
      }, function (err) {
        //console.error('Async: Could not copy text: ', err);
      });
    }
  }

  copyForOldBrowser(text: string) {
    let textArea: any = document.createElement("textarea");

    // Place in the top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of the white box if rendered for any reason.
    textArea.style.background = 'transparent';

    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      //console.log('Copying text command was ' + msg);
    } catch (err) {
      //console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }

  viewDeviceDetails(macAddr) {
    if (!macAddr) {
      this.warningMsg = 'Device is not available to show a detailed view';
      return;
    }
    if (!this.isRefresh) {
      this.router.navigate(['./support/device'], { state: { isDataModel: true, serialNumber: this.RG[0]["serialNumber"], macAddress: macAddr } })
    }
  }

  escalationProcessEditorModal() {
    let self = this;
    // this.replyTo = '';
    // this.sendTo = '';
    self.valueInserted = false;
    self.changescount = 0;
    this.saveCallOutCome = true;
    this.mailSubject = `${this.language['Calix Partner Escalation from']} ${this.CSR_Data.firstName} ${this.CSR_Data.lastName} at ${this.sso.getOrgName()}`;
    const subscriberId = localStorage.getItem('calix.userId');
    this.service.getUserEmail(subscriberId).subscribe((res: any) => {
      this.replyTo = res.email;


      if (environment.SUMMARY_URL.includes('stg')) {
        this.sendTo = res.email;
      }
      else if (environment.SUMMARY_URL.includes('dev.calix.com')) {
        this.sendTo = res.email;
      }
      else if (environment.SUMMARY_URL.includes('devfunc.calix.com')) {
        this.sendTo = res.email;
      }
      else this.sendTo = 'calixpartnersupport@arlo.com' + ',' + res.email;






      // this.sendTo = 'calixpartnersupport@arlo.com' + ',' + res.email;
      this.emailLoader = false;
    }, (err: HttpErrorResponse) => {
      this.modalLoader = false;
      this.pageErrorHandle(err);
    });
    this.modalService.open(this.escalationProcessEditor, { windowClass: 'arlo-editor-modal' });
    // Init with quill.js
    this.quillnew = new Quill('#editor-container', {
      modules: {
        toolbar: {
          container: '#toolbar-toolbar',
          handlers: {
            redo() { this.quill.history.redo(); },
            undo() {
              this.quill.history.undo();
              self.changescount--;
              if (this.quill.history.stack.undo.length == 1) {
                self.changescount = 0;
              }

            }
          }
        }
      },
      theme: 'snow'
    });
    this.quillnew.on('text-change', function (eventName) {
      let editorList = document.querySelectorAll('.ql-editor li');
      let newStyle;
      for (let i = 0; i < editorList.length; i++) {
        editorList[i].textContent == '' ? editorList[i].textContent = '  ' : '';
        if (editorList[i].children[0]) {
          if (editorList[i].children[0].attributes.getNamedItem('style')?.textContent.includes('font-size')) {
            newStyle = editorList[i].children[0].attributes.getNamedItem('style').textContent;
            editorList[i].children[0].parentElement.setAttribute('style', newStyle)
          }
        }
        editorList[i].textContent == '  ' ? editorList[i].setAttribute('style', newStyle) : '';
      }

      self.showUndo = self.defaultMail.value != document.querySelector(".arlo-mail-body").textContent;
      eventName.ops.forEach(element => {
        // if(element.delete){
        //   self.changescount = -1;
        //   // if(self.changescount == -1){
        //   //   self.changescount = 0;
        //   // }
        // }
        if (element.attributes) {
          let events = Object.keys(element?.attributes);
          events.forEach((event: any) => {
            if (element.attributes[event]) {
              self.changescount++;
            }
          })
        }
        if (((element.delete) || (element.insert)) && self.valueInserted) {
          self.changescount++;
        }
        self.valueInserted = true;
      });
    });
    document.querySelector("#editor-container .ql-editor").innerHTML = this.emailTemplate().replace(/\n/g, '');
    this.defaultMail = Object.assign({}, { value: document.querySelector(".arlo-mail-body").textContent });
  }

  emailTemplate(): string {
    return `<p>${this.language['Escalation Details']}</p>
<p></p>
<p>${this.language['broadband service providor name']}: ${this.sso.getOrgName()}</p>
<p>${this.language['Broadband Service Provider Case Number']}: </p>
<p>${this.language['Broadband Service Provider Support Agent Name']}: </p>
<p>${this.language['Broadband Service Provider Support Agent Email']}: </p>
<p>${this.language['Broadband Service Provider Support Agent Phone']}: </p>
<p>${this.language['subscriber first name']}: ${this.BSP_Data.name}</p>
<p>${this.language['subscriber last name']}: </p>
<p>${this.language['Subscriber Email']}: ${this.account?.email ? this.account?.email : ''}</p>
<p>${this.language['Subscriber Phone']}: ${this.BSP_Data.phone}</p>
<p>${this.language['Subscriber Availability']}: </p>
<p></p>
<p>${this.language['subscriber device model number']}: </p>
<p>${this.language['subscriber device serial number']}: </p>
<p>${this.language['Subscriber Case Description']}: </p> 
<p></p>
<p>${this.language['Short Description of the Problem']}</p>`;
  }
  //   ${this.appendSubscriberDeviceData('model')}
  // ${this.appendSubscriberDeviceData('serialNumber')}

  sendEmail() {
    if (!this.sendTo || !this.mailSubject || !document.querySelector('#editor-container > *') || !this.patternCheck(this.sendTo) || !this.patternCheck(this.replyTo)) {
      this.mailSubmit = true;
      return;
    }
    this.modalLoader = true;
    document.querySelector("#editor-container input").remove();
    let content = document.querySelector('#editor-container').innerHTML;
    const bspName = `<p></p><p></p><p>-${this.language['Sent by Calix on behalf of']} ${localStorage.getItem('calix.org_name')}</p>`
    content = content.substring(0, content.length - 6) + bspName + '</div>';
    this.service.sendEmail([this.sendTo, this.mailSubject, content, this.replyTo]).subscribe((res: any) => {
      this.modalLoader = false;
      const contentSelector: any = document.querySelector('#editor-container > *');
      const contentSelectorTxt = contentSelector.innerText;
      this.modalService.dismissAll();
      this.setCallOutCome(contentSelectorTxt);
      this.CommonFunctionsService.trackPendoEvents('Subscriber', 'Escalation to Arlo is created')
    }, (err: HttpErrorResponse) => {
      if (err.error.errorCode == 400 || err.error.errorCode == 401 || err.error.errorCode == 500) {
        this.alertMessage = err.error.errorMessage ? err.error.errorMessage : "Unknown Error";
        this.isError = true;
      }
      this.modalLoader = false;
      this.modalService.dismissAll();
      this.pageErrorHandle(err);
    })
  }

  setCallOutCome(val) {
    if (!this.saveCallOutCome) return;
    const sentFormat: any = { 'dateStyle': 'full', 'timeStyle': 'medium' };
    val = `${this.language['From']}: ${this.arloMail}
      ${this.language['sent']}: ${new Date().toLocaleString('default', sentFormat)}
      ${this.language['To']}: ${this.sendTo}
      ${this.language['subject']}: ${this.mailSubject}
      ${val.replace(/\n\n/g, '\n').replace(/\n\n\n/g, '\n\n')}
    `;
    const callOutComeBtn: HTMLButtonElement = document.querySelector('#callOutcomeBtnId');
    callOutComeBtn.click();
    this.callOutComeService.escalationEmail = val;
    // setTimeout(() => {
    //   const coTxtArea: HTMLTextAreaElement = document.querySelector('#exampleFormControlTextarea1');
    //   coTxtArea.value = val;
    // }, 500);
  }

  patternCheck(emails) {
    let invalidEmail = true;
    let emailsArray = emails.split(',');
    emailsArray.forEach(email => {
      if (!(/^[a-z0-9A-Z._%+-]+@[a-z0-9A-Z.-]+\.[a-zA-Z]{2,}$/.test(email))) {
        invalidEmail = false;
      }
    });
    return invalidEmail;
  }

  appendSubscriberDeviceData(type) {
    let stringArr = [];
    let deviceData = this.BSP_Data.devices;
    deviceData.forEach(el => {
      if (type == 'model') {
        stringArr.push(el.modelName);
      } else {
        stringArr.push(el.serialNumber);
      }

    });
    let deviceCollection = stringArr.join(', ');
    return deviceCollection;
  }
  removeUnwantedSpace(input, value) {
    this[input] = this.CommonFunctionsService.trimSpaceFromNonObjectInputs(value)
  }


}
