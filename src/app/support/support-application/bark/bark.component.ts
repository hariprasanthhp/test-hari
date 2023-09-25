import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { DataServiceService } from '../../data.service';
import { BarkService } from '../shared/service/bark.service';
import { ProtectIqService } from '../shared/service/protect-iq.service';
import * as Quill from 'quill';
import { bool } from 'aws-sdk/clients/signer';
import { CallOutComeService } from 'src/app/sys-admin/services/call-out-come.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
@Component({
  selector: 'app-bark',
  templateUrl: './bark.component.html',
  styleUrls: ['./bark.component.scss']
})

export class BarkComponent implements OnInit {
  @ViewChild('escalationProcessModal', { static: true }) private escalationProcessModal: TemplateRef<any>;
  @ViewChild('escalationProcessEditor', { static: true }) private escalationProcessEditor: TemplateRef<any>;
  language: any;
  languageSubject;
  loading: boolean;
  accountDetailsLoading = true;
  healthDetailsLoading = true;
  isError: boolean = false;
  alertMessage: any = '';
  account: any = {};
  res: any = {};
  orgId = '';
  RG: any = [];
  accountSetup: any;
  health: any;
  overallStatus: any;
  userId: any;
  BarkPlan: any;
  AccountSetupBark: any;
  barkMail = 'noreply@';
  replyTo = '';
  sendTo = '';
  CSR_Data = JSON.parse(localStorage.getItem('calix.login_data'));
  BSP_Data = JSON.parse(sessionStorage.getItem('calix.subscriberInfo'));
  mailSubject = `Calix Partner Escalation from ${this.CSR_Data.firstName} ${this.CSR_Data.lastName} at ${this.CSR_Data.OrgName}`;
  saveCallOutCome: boolean = true;
  modalLoader = false;

  // for editor (esclation process)
  quillnew: any;
  // Need to import quill font properties with primeng editor
  fSize = Quill.import('attributors/style/size');
  fFamily = Quill.import('attributors/style/font');
  mailSubmit = false;
  emailLoader = false;
  showUndo = false;
  defaultMail: any;
  valueInserted = false;
  changescount = 0;
  deviceInfo: any;

  constructor(private translateService: TranslateService,
    private dataService: DataServiceService,
    private modalService: NgbModal,
    private sso: SsoAuthService,
    private titleService: Title,
    private callOutComeService: CallOutComeService,
    private CommonFunctionsService: CommonFunctionsService,
    private service: BarkService,
    private protectIqservices: ProtectIqService,) {
    this.orgId = localStorage.getItem("calix.org_id");
    // this.getAccount();
  }

  // toolbarOptions = [
  //   ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  //   ['blockquote', 'code-block'],

  //   [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  //   [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  //   [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  //   [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  //   [{ 'direction': 'rtl' }],                         // text direction

  //   [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  //   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  //   [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  //   [{ 'font': [] }],
  //   [{ 'align': [] }],

  //   ['clean']                                         // remove formatting button
  // ];
  ngOnInit(): void {
    // Set Font Family & Font Size
    this.fSize.whitelist = ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '36px', '40px'];
    this.fFamily.whitelist = ['sans-serif', 'serif', 'monospace'];
    Quill.register(this.fFamily, true);
    Quill.register(this.fSize, true);


    this.orgId = localStorage.getItem("calix.org_id");
    // this.RG = sessionStorage.getItem("calix.deviceData") ? JSON.parse(sessionStorage.getItem("calix.deviceData")).filter((obj: any) => (obj.opMode == 'RG')) : [];
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Bark']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    })
    this.titleService.setTitle(`${this.language['Bark']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    this.deviceInfo = JSON.parse(sessionStorage.getItem("calix.deviceData"));
    this.deviceInfo = this.deviceInfo.filter(obj => obj.opMode == "RG");
    this.deviceInfo = this.deviceInfo && this.deviceInfo.length ? this.deviceInfo[0].serialNumber : '';
    this.getAccount();

    this.getHealth();


    if (environment.SUMMARY_URL.includes('stg')) {
      this.barkMail += 'partnersupport.stg.calix.com';
    }
    else if (environment.SUMMARY_URL.includes('dev.calix.com')) {
      this.barkMail += 'partnersupport.dev.calix.com';
    }
    else if (environment.SUMMARY_URL.includes('devfunc.calix.com')) {
      this.barkMail += 'partnersupport.devf.calix.com';
    }
    else this.barkMail += 'partnersupport.calix.com';

    // this.getBarkAccountSetup();
  }
  getAccount() {
    this.accountDetailsLoading = true;
    const subId = sessionStorage.getItem(`calix.subscriberId`);
    const availInd = this.deviceInfo ? 1 : (subId ? 2 : 0);
    if (!availInd) return;
    this.protectIqservices.getArloAccount(this.orgId, (availInd == 1 ? this.deviceInfo : subId), availInd).subscribe((res: any) => {
      this.accountDetailsLoading = false;
      this.account = res?.edgeSuites ? (res.edgeSuites?.bark ? res.edgeSuites?.bark : {}) : {};
      this.userId = res.edgeSuites.bark?.userId
      if (this.account?.userId) this.getBarkAccountSetup(this.account?.userId);
      this.BarkPlan = this.account?.planCode === 'bark_premium' ? 'Premium - Monthly' : this.account?.planCode === 'bark_junior' ? 'Junior - Monthly' : '';
    }, (err: HttpErrorResponse) => {
      this.accountDetailsLoading = false;
      this.pageErrorHandle(err);
    })

  }

  getHealth() {
    this.healthDetailsLoading = true;
    this.service.getBarkHealth().subscribe((res: any) => {
      this.healthDetailsLoading = false;
      this.health = (res?.healths ? res.healths : (res ? res : []))
      console.log("health is ", this.health);
      this.overallStatus = this.health.filter(obj => !obj.status).length;
    }, (err: HttpErrorResponse) => {
      this.healthDetailsLoading = false;
      this.pageErrorHandle(err);
    })
  }


  getBarkAccountSetup(userId) {
    this.loading = true;
    if (this.userId != undefined) {
      console.log(' this.userId', this.userId)
      this.service.getBarkAccountSetup(userId).subscribe((res: any) => {
        this.loading = false;
        this.accountSetup = (res?.healths ? res.healths : (res ? res : []))
        console.log('account setup is ', this.accountSetup);
        this.AccountSetupBark = this.accountSetup?.status === 'completed' ? 'Completed' : this.accountSetup?.status === 'not completed' ? 'Not Completed' : '';
      }, (err: HttpErrorResponse) => {
        this.loading = false;
        this.pageErrorHandle(err);
      })
    }
    else {
      this.AccountSetupBark = '';
    }
    // this.accountSetup = this.service.getBarkAccountSetup()
  }
  escalationProcessModalOpen() {
    this.modalService.open(this.escalationProcessModal, { windowClass: 'custom-large-modal' });
  }
  escalationProcessEditorModal() {
    let self = this;
    self.valueInserted = false;
    // this.replyTo = '';
    // this.sendTo = '';
    self.valueInserted = false;
    self.changescount = 0;
    this.saveCallOutCome = true;
    this.mailSubject = `${this.language['Calix Partner Escalation from']} ${this.CSR_Data.firstName} ${this.CSR_Data.lastName} at ${this.sso.getOrgName()}`;
    const subscriberId = localStorage.getItem('calix.userId');
    this.service.getUserEmail(subscriberId).subscribe((res: any) => {
      this.replyTo = res.email;
      this.sendTo = 'help@bark.us' + ',' + res.email;
      this.emailLoader = false;
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
    })
    // this.sendTo = 'help@bark.us' + ',' +this.CSR_Data.username;
    this.modalService.open(this.escalationProcessEditor, { windowClass: 'bark-large-modal' });

    // Init with quill.js
    this.quillnew = new Quill('#editor-container', {
      modules: {
        toolbar: {
          container: '#toolbar-toolbar',
          handlers: {
            redo() {
              this.quill.history.redo();
            },
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
      self.showUndo = self.defaultMail.value != document.querySelector(".bark-mail-body").textContent;
      eventName.ops.forEach(element => {
        // console.log("element",element)
        // if(element.delete){
        //   self.changescount = 1;
        // }
        if (element.attributes) {
          let events = Object.keys(element?.attributes);
          events.forEach((event: any) => {
            if (element.attributes[event]) {
              self.changescount++;
            }
          })
        }
        if ((element.delete || element.insert) && self.valueInserted) {
          self.changescount++;
        }
        self.valueInserted = true;
      });
    });
    document.querySelector("#editor-container .ql-editor").innerHTML = this.emailTemplate().replace(/\n/g, '');
    this.defaultMail = Object.assign({}, { value: document.querySelector(".bark-mail-body").textContent });
  }

  emailTemplate(): string {
    return `<p>${this.language['Escalation Details']}</p>
<p></p>
<p>${this.language['Broadband Service Provider Name:']} ${this.sso.getOrgName()}</p>
<p>${this.language['Subscribers’ First and Last Name:']} ${this.BSP_Data.name}</p>
<p>${this.language['Subscribers’ Email Address:']} ${this.account?.email ? this.account?.email : ''}</p>
<p></p>
<p>${this.language['Short Description of the Problem']}</p>`;
  }

  copyToClipboard() {
    let text = 'Subject:\n';
    text += `${document.getElementById('arloTemplateSubject').textContent.trim()}\n\nBody:\n`
    document.querySelectorAll('#barkTemplateBody li').forEach(elem => {
      text += elem.textContent.trim() + '\n';
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
  pageErrorHandle(err) {
    if (err.status === 401) {
      // this.alertMessage = this.language['Access Denied'];
      this.alertMessage = err.error.errorMessage ? err.error.errorMessage : "Unknown Error";
    } else {
      this.alertMessage = this.sso.pageErrorHandle(err);
    }
    this.isError = true;
  }

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
      this.CommonFunctionsService.trackPendoEvents('Subscriber', 'Escalation to Bark is created')
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
    val = `${this.language['From']}: ${this.barkMail}
${this.language['sent']}: ${new Date().toLocaleString('default', sentFormat)}
${this.language['To']}: ${this.sendTo}
${this.language['subject']}: ${this.mailSubject}

${val.replace(/\n\n/g, '\n').replace(/\n\n\n/g, '\n\n')}`
    const callOutComeBtn: HTMLButtonElement = document.querySelector('#callOutcomeBtnId');
    callOutComeBtn.click();
    this.callOutComeService.escalationEmail = val;
    // setTimeout(() => {
    //   const coTxtArea: HTMLTextAreaElement = document.querySelector('#exampleFormControlTextarea1');
    //   coTxtArea.value = val;
    //   //this.callOutComeService.escalationEmail = val;
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
  removeUnwantedSpace(input, value) {
    this[input] = this.CommonFunctionsService.trimSpaceFromNonObjectInputs(value)
  }
}
