import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { ValidatorService } from 'src/app-services/validator.services';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { ZipCodeApiService } from '../services/zipcode-upload.service';

@Component({
  selector: 'app-marketing-cloud',
  templateUrl: './marketing-cloud.component.html',
  styleUrls: ['./marketing-cloud.component.scss']
})
export class MarketingCloudComponent implements OnInit {
  language: any;
  languageSubject: any;
  undoIcon:boolean = false;
  suspendedDuration:any
  errorInfo:any
  type:any=''
  errorShow:boolean = false;
  billingStatusEnabled:boolean = false;
  frombillingStatusEnabled:boolean = false
  checkEnable:boolean = false
  checkedSub:boolean = false
  checkeddonot:boolean = false
  errorcheck:boolean= false
  refreshDefault :any
  defaultValue = 30
  @ViewChild('suspendedSubscribersDuration', { static: true }) private suspendedSubscribersDuration: TemplateRef<any>;
  @ViewChild('DontConvertSuspendedSubscribers', { static: true }) private DontConvertSuspendedSubscribers: TemplateRef<any>;
  constructor(private titleService:Title,
    private translateService:TranslateService,
    private modalService:NgbModal,
    private router:Router,
    public ssoService: SsoAuthService,
    private commonOrgService: CommonService,
    private zipcodeService: ZipCodeApiService,  private validatorService: ValidatorService,) {

      this.commonOrgService.currentPageAdder('marketing-cloud')
     }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.setPageTitle();
    this.getZipcodeEntryList()
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data) => {
      this.language = data;
      this.setPageTitle()
      this.getZipcodeEntryList()
    })
    
  }
  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }
  setPageTitle(){
    let url = this.router.url;
    if(url.includes('/organization-admin')){
      console.log(url)
      this.titleService.setTitle(`${this.language['cmcName']} - ${this.language['administration']} - ${this.language['Calix Cloud']}`);
    }
    else{
      this.titleService.setTitle(`${this.language['cmcName']} - ${this.language['System Administration']} - ${this.language['Calix Cloud']}`);
    }
  }
  refresh(){
    this.suspendedDuration =this.refreshDefault == 0 ? this.defaultValue : this.refreshDefault;
   // (<HTMLInputElement>document.getElementById('campaign-target')).value = '';
    this.errorShow = false
   // this.undoIcon = !this.undoIcon

   

  }
  saveSubscriberStatus() {

   // let modal =  this.frombillingStatusEnabled ? 'suspendedSubscribersDuration' : 'DontConvertSuspendedSubscribers'

    if(this.frombillingStatusEnabled){
      if(this.suspendedDuration == '' || this.suspendedDuration == undefined){
        this.errorShow = true
        return
      }else{
        this.errorShow = false
        this.openSaveModel()
      }
    }else{
      this.openSaveModel1()
   
  }
  }
openSaveModel1(){
  this.modalService.open(this.DontConvertSuspendedSubscribers, { backdrop: "static", keyboard: false, 
    centered: true,
    windowClass: 'alert-warning-modal',
  });
}
openSaveModel(){
  this.modalService.open(this.suspendedSubscribersDuration, { backdrop: "static", keyboard: false, 
    centered: true,
    windowClass: 'alert-warning-modal',
  });
}
  getZipcodeEntryList() {
    this.zipcodeService.marketingCloudCheck().subscribe((res: any) => {
        if (res) {
         // console.log(res,'res')
          this.billingStatusEnabled = res.billingStatusEnabled
          this.refreshDefault = res.suspendedDuration
          if(res.suspendedDuration != 0){
            this.suspendedDuration =  res.suspendedDuration
            this.checkedSub = true
            this.checkeddonot = false
            this.type='on';
          }else{
            this.suspendedDuration = this.refreshDefault == 0 ? this.defaultValue : this.refreshDefault;
            this.checkeddonot = true
            this.checkedSub = false
            this.type='on';
          }
         
          this.frombillingStatusEnabled = res.suspendedDuration != 0 ? true : false
          this.checkEnable =  res.suspendedDuration != 0 || res.suspendedDuration == 0 ? true : false
         
        }
    }, (error) => {
      this.billingStatusEnabled = false
      if(error){
        this.errorcheck = true
        this.errorInfo = error.error.message
      }
    
    })
  }
  closeAlert() {
    this.errorcheck = false;
  }
  onChange(e,from) {
    this.type= e.target.value;
    this.checkEnable = this.type != '' ? true : false
    this.errorShow = false
    this.frombillingStatusEnabled = from == 1 ? true : false
    if(from == 1){
      this.checkedSub = true
      this.checkeddonot = false
    }else{
      this.checkeddonot = true
      this.checkedSub = false
    }
    this.suspendedDuration = this.refreshDefault == 0 ? this.defaultValue : this.refreshDefault;
 }
 saveDuration(){
  let payload ={
    "billingStatusEnabled": true,
    orgid:this.ssoService.getOrgId(),
    "suspendedDuration": this.frombillingStatusEnabled ? this.suspendedDuration : 0
  }
  this.zipcodeService.marketingCloudCheckUpdate(payload).subscribe((res: any) => {
    if (res) {
      this.modalService.dismissAll();
      this.getZipcodeEntryList()
    }
}, (error) => {
 
})

 }
 campaignTargetChange(event){
  if (event) {
    this.suspendedDuration = event;
  } else {
    this.suspendedDuration = '';
    (<HTMLInputElement>document.getElementById('campaign-target')).value = '';
  }
  this.errorShow = this.validatorService.durationValidator(event);
 }
}
