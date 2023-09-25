import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ServifyService } from '../shared/service/servify.service';
import { SsoAuthService } from '../../../shared/services/sso-auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataServiceService } from '../../data.service';
import { TranslateService } from 'src/app-services/translate.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import * as Quill from 'quill';
import { CallOutComeService } from 'src/app/sys-admin/services/call-out-come.service';
import { environment } from 'src/environments/environment';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
@Component({
  selector: 'app-servify-care',
  templateUrl: './servify-care.component.html',
  styleUrls: ['./servify-care.component.scss']
})
export class ServifyCareComponent implements OnInit {
  @ViewChild('escalationProcessModal', { static: true }) private escalationProcessModal: TemplateRef<any>;
  @ViewChild('escalationProcessEditor', { static: true }) private escalationProcessEditor: TemplateRef<any>;
  loading: boolean;
  accountDetailsLoading = true;
  servifyStatusLoading = true;
  recentClaimsLoading = true;
  errorMsg: any;
  language: any;
  languageSubject: any;
  servifyInfo: any = {};
  servifyClaims = [];
  health: any;
  overallStatus: any;
  cancelledStatus: boolean;
  userId: any;
  PlanPurchaseddatefor30days: any;
  ClaimEligible: boolean = false;
  subscriptionEndDt: any;
  subscribedStatus: any;
  claimStatusinText: any;
  claimStatusClass: any;
  saveCallOutCome: boolean = true;
  quillnew: any;
  emailLoader = true;
  mailSubmit: boolean = false;
  fSize = Quill.import('attributors/style/size');
  fFamily = Quill.import('attributors/style/font');
  modalLoader = false;
  replyTo = '';
  sendTo = '';
  CSR_Data = JSON.parse(localStorage.getItem('calix.login_data'));
  BSP_Data = JSON.parse(sessionStorage.getItem('calix.subscriberInfo'));
  mailSubject = `Calix Partner Escalation from ${this.CSR_Data.firstName} ${this.CSR_Data.lastName} at ${this.CSR_Data.OrgName}`;
  alertMessage: any = '';
  isError: boolean = false;
  showUndo = false;
  defaultMail: any;
  servifyMail = 'noreply@';
  valueInserted = false;
  changescount = 0;

  constructor(
    private servifyService: ServifyService,
    private sso: SsoAuthService,
    private dataService: DataServiceService,
    private translateService: TranslateService,
    private callOutComeService: CallOutComeService,
    private modalService: NgbModal,
    private titleService: Title,
    private CommonFunctionsService: CommonFunctionsService,
  ) {
  }

  ngOnInit(): void {
    this.fSize.whitelist = ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '36px', '40px'];
    this.fFamily.whitelist = ['sans-serif', 'serif', 'monospace'];
    Quill.register(this.fFamily, true);
    Quill.register(this.fSize, true);
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['ServifyCare']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['ServifyCare']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    this.initialLoad();

    if (environment.SUMMARY_URL.includes('stg')) {
      this.servifyMail += 'partnersupport.stg.calix.com';
    }
    else if (environment.SUMMARY_URL.includes('dev.calix.com')) {
      this.servifyMail += 'partnersupport.dev.calix.com';
    }
    else if (environment.SUMMARY_URL.includes('devfunc.calix.com')) {
      this.servifyMail += 'partnersupport.devf.calix.com';
    }
    else this.servifyMail += 'partnersupport.calix.com';
  }

  initialLoad(isReload = false) {
    this.accountDetailsLoading = true;
    this.servifyService.getServifyInfo(this.sso.getOrgId(), this.sso.getCSCSubscriberId()).subscribe((res: any) => {
      this.servifyInfo = res;
      this.userId = res.userId;
      this.accountDetailsLoading = false;

      if (!isReload) {
        this.getClaims(res.userId);
        this.getHealth();
        this.ClaimsEligible(this.servifyInfo.planPurchaseDate, this.servifyInfo.cancelDate, this.servifyInfo.planChange);
        //this.showClaimStatus();
      }
    }, (err: HttpErrorResponse) => {
      this.accountDetailsLoading = false;
      this.recentClaimsLoading = false;
      if (!isReload) this.getHealth();
      if (err.status !== 404) this.pageErrorHandle(err);
    });
  }

  /* Function for checking Subscription end date, Claims eligible & to show cancellation statement */
  ClaimsEligible(PlanPurchasedDate, cancelDate, planChange) {
    //console.log(PlanPurchasedDate)
    //console.log(cancelDate);
    //let sstdate = new Date()
    let date = new Date(PlanPurchasedDate)
    //let stdate = new Date(sstdate.setDate(sstdate.getDate()))
    //let newDate = new Date(date.setDate(date.getDate()+30))
    let newDate = new Date(date.setDate(date.getDate()))
    //let enddate = newDate.getMonth()+1 + '/' + newDate.getDate() + '/' + newDate.getFullYear()
    let StartDate = new Date();
    let currentYear = StartDate.getFullYear();

    let EndDate = new Date(newDate);
    //  console.log(StartDate)
    //  console.log(EndDate);
    /************* For getting exact days for claim eligible for without cancellation *********/
    let Time = StartDate.getTime() - EndDate.getTime();
    let Days = Time / (1000 * 3600 * 24); //Diference in Days
    let ExactDays = Math.round(Days);
    /********** For cancellation & Subscription end date variables **********/
    let todayDate = new Date().toJSON().slice(0, 10);
    let cancelDtSplit: any
    let todayDateSplit: any = todayDate.split("-");
    let PlanPurchasedDtSplit: any = PlanPurchasedDate.split("-");
    let PlanPurchasedDt = new Date(PlanPurchasedDtSplit[0], parseInt(PlanPurchasedDtSplit[1]) - 1, PlanPurchasedDtSplit[2]);
    let check = new Date(todayDateSplit[0], parseInt(todayDateSplit[1]) - 1, todayDateSplit[2]);

    let monthset
    let from: any;

    let thisMonth
    let to

    if (cancelDate) {
      this.cancelledStatus = true
      cancelDtSplit = cancelDate.split("-");
      monthset = cancelDtSplit[1]
      from = new Date(cancelDtSplit[0], parseInt(cancelDtSplit[1]) - 1, cancelDtSplit[2]);  // -1 because months are from 0 to 11
      let PreviousDate = PlanPurchasedDtSplit[2] - 1; //planPurchaseDate: "2022-07-28"
      let mm = this.monthDiff(PlanPurchasedDt, check)
      PlanPurchasedDt.setDate(PlanPurchasedDt.getDate() - 1)
      PlanPurchasedDt.setMonth(PlanPurchasedDt.getMonth() + mm)
      let mmset = check.getTime() > PlanPurchasedDt.getTime() ? 1 : 0
      this.subscriptionEndDt = currentYear + "-" + (parseInt(todayDateSplit[1]) + mmset) + "-" + PreviousDate;
      let subscriptionEndDtSplit: any = this.subscriptionEndDt.split("-");
      to = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1]) - 1, subscriptionEndDtSplit[2]);
      /********** Claim eligible(for Cancellation) **********/
      if (ExactDays > 30) {
        if (check >= from && check <= to) {
          this.ClaimEligible = true
        }
        else {
          this.ClaimEligible = false
        }
      }
      else {
        this.subscribedStatus = false
        this.ClaimEligible = false
        this.subscriptionEndDt = cancelDate;
        let subscriptionEndDtSplit: any = this.subscriptionEndDt.split("-");
        to = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1]) - 1, subscriptionEndDtSplit[2]);
      }
    }
    else {
      this.cancelledStatus = false
      thisMonth = StartDate.getMonth() + 1;
      monthset = thisMonth
      /********** For setting Subscription end date **********/

      if (todayDateSplit[2] >= PlanPurchasedDtSplit[2]) {
        let PreviousDate = PlanPurchasedDtSplit[2] - 1;
        let nextMonth = StartDate.getMonth() + 2;
        this.subscriptionEndDt = currentYear + "-" + nextMonth + "-" + PreviousDate;
        let subscriptionEndDtSplit: any = this.subscriptionEndDt.split("-");
        to = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1]) - 1, subscriptionEndDtSplit[2]);
        //console.log(this.subscriptionEndDt);

      }
      else {
        let PreviousDate = PlanPurchasedDtSplit[2] - 1;
        this.subscriptionEndDt = currentYear + "-" + monthset + "-" + PreviousDate;
        let subscriptionEndDtSplit: any = this.subscriptionEndDt.split("-");
        to = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1]) - 1, subscriptionEndDtSplit[2]);
        //console.log(this.subscriptionEndDt);

      }
      /********** Claim eligible(Not for Cancellation) **********/
      if (ExactDays > 30) {
        this.ClaimEligible = true
      }
      else {
        this.ClaimEligible = false
      }
    }

    /********** For checking subscribed or unsubscribed based on subscription end date **********/
    if (cancelDate && ExactDays < 30) {
      this.subscribedStatus = false
    }
    else if (cancelDate && ExactDays > 30) {
      if (check > to) {
        this.subscribedStatus = false
      }
      else {
        this.subscribedStatus = true
      }
    }
    else {
      this.subscribedStatus = true
    }

  }

  /********** Date difference bewteen Purchase date and today date **********/
  monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  getClaims(userId) {
    this.recentClaimsLoading = true;
    if (userId) {
      this.servifyService.getServifyClaims(userId).subscribe((res: any) => {
        this.recentClaimsLoading = false;
        let tempArr = [];
        this.servifyClaims = (res?.claims || [])
          .sort((a, b) => b.created - a.created)
          .filter(obj => {
            if (!tempArr.includes(obj.claimId)) {
              tempArr.push(obj.claimId);
              return true;
            }
            return false;
          });
      }, (err: HttpErrorResponse) => {
        this.recentClaimsLoading = false;
        this.pageErrorHandle(err);
      });
    } else {
      this.recentClaimsLoading = false;
    }
  }

  /********** Show claim status based on status from api **********/
  showClaimStatus(claimStatus) {
    if (claimStatus == 'SC0059' || claimStatus == 'SC0100') {
      this.claimStatusinText = 'Open';
      this.claimStatusClass = 'progress-but';
    }
    else if (claimStatus == 'SC0004' || claimStatus == 'SC0003') {
      this.claimStatusinText = 'Closed';
      this.claimStatusClass = 'complete-but';
    }
    else {
      this.claimStatusinText = 'In Progress';
      this.claimStatusClass = 'suspended-but';
    }
  }


  getHealth() {
    this.servifyStatusLoading = true;
    this.servifyService.getServifyHealth().subscribe((res: any) => {
      this.servifyStatusLoading = false;
      this.health = (res?.healths ? res.healths : (res ? res : []))?.filter(obj => obj.health_name.includes('(US)'));
      this.overallStatus = this.health.filter(obj => !obj.status).length;
    }, (err: HttpErrorResponse) => {
      this.servifyStatusLoading = false;
      this.pageErrorHandle(err);
    })
  }

  pageErrorHandle(err) {
    if (err.status === 401) {
      // this.errorMsg = this.language['Access Denied'];
      this.alertMessage = err.error.errorMessage ? err.error.errorMessage : "Unknown Error";
    } else {
      this.alertMessage = this.sso.pageErrorHandle(err);
    }
    this.isError = true;
  }
  escalationProcessModalOpen() {
    this.modalService.open(this.escalationProcessEditor, { windowClass: 'custom-large-modal' });
  }

  copyToClipboard() {
    let text = 'Subject:\n';
    text += `${document.getElementById('servifyTemplateSubject').textContent.trim()}\n\nBody:\n`
    document.querySelectorAll('#servifyTemplateBody li').forEach(elem => {
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

  escalationProcessEditorModal() {
    let self = this;
    // this.replyTo = '';
    // this.sendTo = '';
    self.valueInserted = false;
    self.changescount = 0;
    this.saveCallOutCome = true;
    this.mailSubject = `${this.language['Calix Partner Escalation from']} ${this.CSR_Data.firstName} ${this.CSR_Data.lastName} at ${this.sso.getOrgName()}`;
    const subscriberId = localStorage.getItem('calix.userId');
    this.servifyService.getUserEmail(subscriberId).subscribe((res: any) => {
      this.replyTo = res.email;
      this.sendTo = 'calixpartnersupport@servifycare.com' + ',' + res.email;
      this.emailLoader = false;
    }, (err: HttpErrorResponse) => {
      this.loading = false;
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
        if (element.delete) {
          self.changescount = 1;
        }
        if (element.attributes) {
          let events = Object.keys(element?.attributes);
          events.forEach((event: any) => {
            if (element.attributes[event]) {
              self.changescount++;
            }
            if (element.attributes.italic) {
              self.changescount++;
            }
          })
        }
        if ((element.delete || element.insert) && self.valueInserted) {
          self.changescount++;
        }
        self.valueInserted = true;
        if (eventName.ops[1]?.attributes?.italic && element.insert == "(it is recommended not to include any personally identifiable information (PII) in the description):") {
          self.changescount = 0;
          self.valueInserted = false;
        }
      });
    });
    document.querySelector("#editor-container .ql-editor").innerHTML = this.emailTemplate().replace(/\n/g, '');
    this.defaultMail = Object.assign({}, { value: document.querySelector(".arlo-mail-body").textContent });
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
    this.servifyService.sendEmail([this.sendTo, this.mailSubject, content, this.replyTo]).subscribe((res: any) => {
      this.modalLoader = false;
      const contentSelector: any = document.querySelector('#editor-container > *');
      const contentSelectorTxt = contentSelector.innerText;
      this.modalService.dismissAll();
      this.setCallOutCome(contentSelectorTxt);
      this.CommonFunctionsService.trackPendoEvents('Subscriber', 'Escalation to Servify is created')
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
    val = `${this.language['From']}: ${this.servifyMail}
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

  emailTemplate(): string {
    return `<p>${this.language['Short Description of the Problem']}<em>${this.language['(it is recommended not to include any personally identifiable information (PII) in the description):']}</em></p>`;
  }
  removeUnwantedSpace(input, value) {
    this[input] = this.CommonFunctionsService.trimSpaceFromNonObjectInputs(value)
  }
}

