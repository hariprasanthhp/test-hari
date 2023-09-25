import { EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationDataService } from '../../../foundation-data.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AddStaticGroupsComponent } from '../add-static-groups/add-static-groups.component';
@Component({
  selector: 'app-foundation-system-details',
  templateUrl: './foundation-system-details.component.html',
  styleUrls: ['./foundation-system-details.component.scss'],
})
export class FoundationSystemDetailsComponent implements OnInit, OnDestroy, OnChanges {
  language: any;
  languageSubject;
  modalRef: any;
  @Input() system_id;
  @Input() sys_Det;
  @Input() deviceDataList: any[];
  @Input() subscriberName: any[];
  @Input() subscriberLocationId: any;
  @Input() AllFormData;
  @Input() SSIDbackup;
  @Output() private Out_sysDet: EventEmitter<any> = new EventEmitter();
  @Output() private out_sys_Subsc_submit: EventEmitter<any> = new EventEmitter();
  @Output() private out_swap_system: EventEmitter<any> = new EventEmitter();
  @Output() private Out_System_Focus: EventEmitter<any> = new EventEmitter();
  @Output() private Out_Service_Status: EventEmitter<any> = new EventEmitter();
  @ViewChild(AddStaticGroupsComponent) staticGroup: AddStaticGroupsComponent
  // @Output() disableSaveChanges: EventEmitter<any> = new EventEmitter();


  @ViewChild('swapSystem', { static: true })
  private swapSystem: TemplateRef<any>;
  
  @ViewChild('warningWiFiConfirmation', { static: true })
  private warningWiFiConfirmation: TemplateRef<any>;
  @ViewChild('emptyEmailAlert', { static: true }) emptyEmailAlert: TemplateRef<any>;
  subscriberForm: FormGroup;
  systemForm: FormGroup;
  swapExisting: any;
  formData: any;
  formDataSubject: any;
  emailmsg: string;
  newsystemId: any;
  submitted: boolean;
  swapSysUpdate: any;
  errorInfo: any;
  error: boolean;
  success: boolean;
  ORG_ID: any;
  errmsg: string;
  macAddressLength: number = 20;
  subscriberLocationIdNotRequired: boolean;
  nameNotRequired: boolean;
  systemIdNotEditable: boolean;
  syetemIdRequired: boolean;
  systemModelRquired: boolean;
  successInfo: any;
  isStatic: boolean = false;
  fsanmsg: string;
  deviceData: any;
  loading: boolean;
  device: { modelName: any; opMode: any; };
  modelnoteditable: boolean;
  modelData: any;
  accountNotRequired: boolean;
  modelName: any;
  FsanErrorMsg: string;
  systemID: any;
  deviceinfo: { modelName: any; opMode: any; };
  system: any;
  value: string;
  model: any[];
  isModalError: boolean = false;
  modalWarningMessage: any = '';
  modalLoader: boolean;
  deleteFactoryResetSub: any;
  orgData: any;
  exosModel: boolean = true;
  showconfirmation: boolean = true;
  showWarning: boolean;
  hideSwap: boolean = true;
  emailError: boolean;
  StaticForm: any = {};
  syetemsAllData: any;
  @Input() staticGroups;
  @Output() private out_static_groups_change: EventEmitter<any> = new EventEmitter();
  @Output() private advanced_enable_disable: EventEmitter<any> = new EventEmitter();
  @Output() private out_static_groups_submit: EventEmitter<any> = new EventEmitter();
  dev: boolean;
  
  constructor(
    private translateService: TranslateService,
    private dialogService: NgbModal,
    private service: FoundationManageService,
    private commonOrgService: CommonService,
    private sso: SsoAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) {
    this.ORG_ID = this.sso.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data: any) => {
        this.language = data;
      }
    );


  }
  OnStaticFormData(event) {
    this.out_static_groups_change.emit(event);
    this.advanced_enable_disable.emit(false)
  }
  submitStaticGroups() {
    this.out_static_groups_submit.emit();
  }
  ngOnInit(): void {
    //debugger;
    let base = `${environment.API_BASE}`;

    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.dev = true;
    }
    if (this.staticGroups && Object.keys(this.staticGroups).length) {
      this.service.staticGroupSubject.next(this.StaticForm);
    }
    this.syetemsAllData = this.AllFormData;
    this.Out_System_Focus.emit(true)
    this.subscriberForm = new FormGroup({
      systemId: new FormControl(null, Validators.required),
      modelName: new FormControl(null),
      newSystemId: new FormControl(null),
      //isReloadSSID:new FormControl(false),
      subscriber: new FormGroup({
        subscriberEnable: new FormControl(null),
        subscriberLocationId: new FormControl(null),
        serviceAddress: new FormControl(null),
        phone: new FormControl(null),
        name: new FormControl(null),
        email: new FormControl(null),
        account: new FormControl(null)
      }),
      // staticGroup: new FormGroup({
      //   static: new FormControl(false),
      //   staticGroupList: new FormControl([]),
      // }),

    });
    this.getDeleteAndFactoryResetData();
    setTimeout(() => {
      if (this.sys_Det) {
        this.subscriberForm.patchValue(
          {
            systemId: this.sys_Det?.systemId ? this.sys_Det?.systemId : null,
             modelName: this.sys_Det?.modelName ? this.sys_Det?.modelName : null,
            newSystemId: this.sys_Det?.newSystemId ? this.sys_Det?.newSystemId : null,
            //isReloadSSID: this.sys_Det?.isReloadSSID ? this.sys_Det?.isReloadSSID : false,
            subscriber: {
              subscriberEnable: this.sys_Det?.subscriber?.name ? 'Yes' : 'No',
              subscriberLocationId: this.sys_Det?.subscriber?.subscriberLocationId ? this.sys_Det?.subscriber?.subscriberLocationId : null,
              serviceAddress: this.sys_Det?.subscriber?.serviceAddress ? this.sys_Det?.subscriber?.serviceAddress : null,
              phone: this.sys_Det?.subscriber?.phone ? this.sys_Det?.subscriber?.phone : null,
              name: this.sys_Det?.subscriber?.name ? this.sys_Det?.subscriber?.name : null,
              email: this.sys_Det?.subscriber?.email ? this.sys_Det?.subscriber?.email : null,
              account: this.sys_Det?.subscriber?.account ? this.sys_Det?.subscriber?.account : null
            }
          })
        
        }

      
      this.disablechange();
    },500);
    
      
    if (!this.subscriberName && !this.subscriberLocationId) {        
        this.subscriberForm.value.subscriber.subscriberEnable = 'No';
    }
    if (this.system_id !== 'New System' && (this.subscriberName || this.subscriberLocationId)) {
      this.subscriberForm.value.subscriber.subscriberEnable = 'Yes';
      this.subscriberForm.patchValue({ subscriber: { subscriberEnable: 'Yes' } });
    } else {
      
      this.subscriberForm.value.subscriber.subscriberEnable = 'No';
      this.subscriberForm.patchValue({ subscriber: { subscriberEnable: 'No' } });
     
      if (this.AllFormData?.systemId) {
          
         this.hideSwap = false
        }
      }

    

      setTimeout(() => {
        this.deviceDetails('edit')
        this.loading = false;
      }, 1500)
      //this.modelnoteditable = true;
     
    
    if (this.AllFormData?.systemId) {
      this.systemIdNotEditable = true;
     
    }

    this.getDeviceModels('Exos');

   

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.AllFormData && changes.AllFormData.currentValue) {
      this.AllFormData = changes.AllFormData.currentValue;
    }
      if (this.AllFormData?.systemId) {
        
            this.hideSwap = false;
           this.systemIdNotEditable = true;
      }
  
      
        let modelChk =this.sys_Det?.modelName
       
        
      }
  get f() { return this.subscriberForm.controls; }


  maxLength(type) {
    setTimeout(() => {
      if (this.subscriberForm.value[type].indexOf(':') !== -1) {
        this.macAddressLength = 17;
      } else {
        this.macAddressLength = 32;
      }
    }, 100)
  }

  requiredFieldChanges() {

    let formData = this.subscriberForm.value;
    const isEmpty = !Object.values(formData.subscriber).some(x => (x !== null && x !== ''));
    this.subscriberLocationIdNotRequired = true;
    this.nameNotRequired = true;
    //this.accountNotRequired = true;
    this.syetemIdRequired = false;
    this.systemModelRquired = false;
    if (!formData.systemId && !formData.subscriber?.subscriberLocationId && !formData.subscriber?.name) {
      this.subscriberLocationIdNotRequired = false;
      this.nameNotRequired = false;
      //this.accountNotRequired = false;
      this.syetemIdRequired = true;
      return
    } else if (formData.systemId) {
      if (isEmpty) {
        this.subscriberLocationIdNotRequired = true;
        this.nameNotRequired = true;
        //this.accountNotRequired = true;
      }
      if (!isEmpty) {
        if (!formData.subscriber?.subscriberLocationId) {
          this.subscriberLocationIdNotRequired = false;
        }
        if (!formData.subscriber?.name) {
          this.nameNotRequired = false;
        }
        // if (!formData.subscriber?.account) {
        //   this.accountNotRequired = false;
        // }
        if ((this.subscriberLocationIdNotRequired == false) || (this.nameNotRequired == false)) {
          return
        }

      }

    }
    else if (formData.subscriber?.subscriberLocationId) {
      this.subscriberLocationIdNotRequired = false;
      // this.syetemIdRequired = false;
      this.nameNotRequired = true;
      if (!formData.subscriber?.name) {
        this.nameNotRequired = false;
        return;
      }
    } else {
      this.subscriberLocationIdNotRequired = false;
      this.nameNotRequired = false;
      if (!formData.subscriber?.subscriberLocationId) {
        return;
      }
    }


  }

  changeStatic() {
    let formData = this.subscriberForm.value;
    // if (formData.staticGroup && formData.staticGroup?.static) {
    //   this.isStatic = true;
    // } else { this.isStatic = false; }
  }
  getModelFeature() {
    this.loading = true;
    let modelName = this.device?.modelName ? this.device?.modelName : this.deviceinfo?.modelName;
    this.service.getModeFeature(this.ORG_ID, modelName).subscribe((res: any) => {
      this.modelData = res ? res : []
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }
  deviceDetails(val) {
    this.value = val;
    this.loading = true;
    this.subscriberForm.patchValue({
      systemId : this.subscriberForm?.value?.systemId ? this.subscriberForm?.value.systemId.replace(/\s+/g,''):''
    })
    this.system = this.subscriberForm?.value.systemId;
    if (this.system == "") {
      this.modelnoteditable = false;
      this.subscriberForm.patchValue({ modelName: null });
      this.loading = false;
    }
    else {
      this.service.getDeviceInfo(this.ORG_ID, this.system).subscribe((res: any) => {
        this.deviceData = res ? res : [];
        this.device = {
          modelName: this.deviceData?.modelName ? this.deviceData?.modelName : this.sys_Det?.modelName,
          opMode: this.deviceData?.opMode
        }
        
        this.subscriberForm.patchValue(this.device);
        this.modelName = this.deviceData?.modelName;
        if(this.modelName){
          if(this.modelName.includes('844E') && this.device?.opMode =='WAP'){
            this.hideSwap=true
          }
        }
        if (!this.modelName) {
          this.subscriberForm.patchValue({ modelName: null });
        }
        if (this.deviceData?.modelName || (this.modelName === this.sys_Det?.modelName)) {
          this.modelnoteditable = true;
        }
        if (this.deviceData?.modelName) {
          this.getDeviceModels('nonexos');
        }
        else {
          this.modelnoteditable = false;
        }

        //if (this.deviceData?.length == 0) {
        this.provosionrecord();
        //}

        // else {
        //   this.loading = false;
        // }
        //this.getModelFeature();
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.loading = false;
      })
    }

  }

  provosionrecord() {
    //debugger;
    this.systemID = this.subscriberForm.value.systemId;
    this.loading = true;
    this.service.getProvisionrecord(this.ORG_ID, this.systemID).subscribe((res: any) => {
      this.deviceData = res ? res : [];
      if (this.value == 'edit') {
        this.deviceinfo = {
          modelName: this.deviceData?.modelName ? this.deviceData?.modelName : this.sys_Det?.modelName,
          opMode: this.deviceData?.opMode
        }
        this.subscriberForm.patchValue(this.deviceinfo);
      } else {
        this.deviceinfo = {
          modelName: this.deviceData?.modelName ? this.deviceData?.modelName : null,
          opMode: this.deviceData?.opMode
        }
        this.subscriberForm.patchValue(this.deviceinfo);
      }
      this.modelnoteditable = false;
      this.loading = false;
      //this.getDeviceInformation();


    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }
  invalidPhoneNumber: boolean = false;
  phoneNumberValidateFunctionClone = this.commonOrgService.validatePhoneNumber
  saveSystem() {
    //debugger;


    if (!this.subscriberForm.value.subscriber.email && this.AllFormData?.edgeSuites?.myCommunityIQ?.subscriber?.enable) {
      this.dialogService.open(this.emptyEmailAlert, {
        windowClass: 'custom-alert-warn'
      });
      return
    }
    this.submitted = true;
    this.formData = this.subscriberForm.value;
    if (this.formData.subscriber.phone && !this.commonOrgService.validatePhoneNumber(this.formData.subscriber.phone)) {
      return;
    }
    const isEmpty = !Object.values(this.formData.subscriber).some(x => (x !== null && x !== ''));
    this.subscriberLocationIdNotRequired = true;
    this.nameNotRequired = true;
    this.syetemIdRequired = false;
    this.systemModelRquired = false;
    if (this.formData.subscriber?.email) {
      this.emailchange(this.formData.subscriber?.email)
    }
    let staticGroupError  = this.staticGroup.saveSystem()
 
    if (!this.formData.systemId && !this.formData.subscriber?.subscriberLocationId && !this.formData.subscriber?.name) {
      this.subscriberLocationIdNotRequired = false;
      this.nameNotRequired = false;
      this.syetemIdRequired = true;
      return
    } else if (this.formData.systemId) {
      if (this.subscriberForm.value.subscriber.subscriberEnable === 'No') {
        this.subscriberLocationIdNotRequired = true;
        this.nameNotRequired = true;
        //this.accountNotRequired = true;
      }
      if (this.subscriberForm.value.subscriber.subscriberEnable === 'Yes') {
        if (!this.formData.subscriber?.subscriberLocationId) {
          this.subscriberLocationIdNotRequired = false;
        }
        if (!this.formData.subscriber?.name) {
          this.nameNotRequired = false;
        }
        if (this.formData.subscriber?.email) {
          this.emailchange(this.formData.subscriber?.email)
        }
        if ((this.subscriberLocationIdNotRequired == false) || (this.nameNotRequired == false) || this.emailError) {
          return
        }

      }

    }
    else if (this.formData.subscriber?.subscriberLocationId) {
      this.subscriberLocationIdNotRequired = false;
      // this.syetemIdRequired = false;
      this.nameNotRequired = true;
      if (!this.formData.subscriber?.name) {
        this.nameNotRequired = false;
        return;
      }
      if(this.emailError){
        return
      }
    } else {
      this.subscriberLocationIdNotRequired = false;
      this.nameNotRequired = false;
      if (!this.formData.subscriber?.subscriberLocationId) {
        return;
      }
    }
    if (this.subscriberForm.value.systemId && staticGroupError) {
      return;
    }
    this.Out_sysDet.emit(this.subscriberForm.value);
    this.out_sys_Subsc_submit.emit();

  }
  deviceModels = [];
  getDeviceModels(value) {
    this.loading = true;
    let params = { orgId: this.sso.getOrgId() }
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/device-type?matcher=${JSON.stringify(params)}`).subscribe((json: any) => {
      let obj = {};
      if (json) {
        json.forEach((element: any) => {
          if (element && element.modelName) {
            obj[element['modelName'.trim()]] = true;
          }
        });
        this.Modelitems = [];
        this.deviceModels = Object.keys(obj);
        const deviceModel = this.deviceModels.filter(el => {
          if (el.indexOf("GS") !== -1 || el.indexOf("GM") !== -1) {
            this.Modelitems.push(el)
          }
        })
      }
      if (value === 'Exos') {
        this.exosModel = true;
      } else {
        this.exosModel = false;
      }
      this.loading = false;
    }, (err: any) => {
      this.pageErrorHandle(err);
      this.loading = false;
    });
  }
  emailchange(value) {
    if (value) {
      if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
        this.emailmsg = "";
        this.emailError = false
        this.Out_sysDet.emit(this.subscriberForm.value)
        return
      }
      else {
        this.emailError = true
        this.emailmsg = "You have entered an invalid email address!";
        this.Out_sysDet.emit(this.subscriberForm.value)
        return
      }
    } else {
      this.emailmsg = "";
      this.emailError = false
      this.Out_sysDet.emit(this.subscriberForm.value)
    }



  }
  clsAlphaNoOnly(e) {
    if (e.key === ' ') { e.preventDefault(); }
    var regex = new RegExp("^[a-zA-Z0-9:-]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }

    e.preventDefault();
    return false;
  }
  systemchange() {
    this.Out_sysDet.emit(this.subscriberForm.value)
  }

  disablechange() {
    this.AllFormData = {
      systemId: this.AllFormData?.systemId ? this.AllFormData?.systemId : null,
      subscriber: {
        account: this.AllFormData?.subscriber?.account ? this.AllFormData?.subscriber?.account : null,
        email: this.AllFormData?.subscriber?.email ? this.AllFormData?.subscriber?.email : null,
        name: this.AllFormData?.subscriber?.name ? this.AllFormData?.subscriber?.name : null,
        serviceAddress: this.AllFormData?.subscriber?.serviceAddress ? this.AllFormData?.subscriber?.serviceAddress : null,
        subscriberLocationId: this.AllFormData?.subscriber?.subscriberLocationId ? this.AllFormData?.subscriber?.subscriberLocationId : null,
        phone: this.AllFormData?.subscriber?.phone ? this.AllFormData?.subscriber?.phone : null
      }

    }
    
    if (this.system_id === 'New System' && !this.subscriberName) {
      if (this.subscriberForm.value.subscriber.subscriberEnable === 'Yes' && this.subscriberForm.value.systemId) {
        this.Out_System_Focus.emit(false);
      } else if (this.subscriberForm.value.subscriber.subscriberEnable !== 'Yes' && this.subscriberForm.value.systemId) {
        this.Out_System_Focus.emit(false);
      } else if (this.subscriberForm.value.subscriber.subscriberEnable === 'Yes' && !this.subscriberForm.value.systemId) {
        this.Out_System_Focus.emit(false);
      } else if (this.subscriberForm.value.subscriber.subscriberEnable !== 'Yes' && !this.subscriberForm.value.systemId) {
        this.Out_System_Focus.emit(true);
      }
    } else {
      if ((this.AllFormData?.systemId !== this.subscriberForm.value.systemId) || (this.AllFormData?.subscriber?.subscriberLocationId !== this.subscriberForm.value.subscriber?.subscriberLocationId) || (this.AllFormData?.subscriber?.serviceAddress !== this.subscriberForm.value.subscriber?.serviceAddress) || (this.AllFormData?.subscriber?.phone !== this.subscriberForm.value.subscriber?.phone) || (this.AllFormData?.subscriber?.name !== this.subscriberForm.value.subscriber?.name) || (this.AllFormData?.subscriber?.email !== this.subscriberForm.value.subscriber?.email) || (this.AllFormData?.subscriber?.account !== this.subscriberForm.value.subscriber?.account)) {
        this.Out_System_Focus.emit(false);
      } else {
        this.Out_System_Focus.emit(true);
      }
    }
    if (this.subscriberForm.value.subscriber.subscriberEnable !== 'Yes') {
      this.subscriberForm.patchValue({
        subscriber: {
          subscriberEnable: 'No',
          subscriberLocationId: null,
          serviceAddress: '',
          phone: '',
          name: '',
          email: '',
          account: ''
        }
      });
    }
    // this.Out_sysDet.emit(this.subscriberForm.value)
  }
  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    //this.onBlurSystemId();
    this.Out_sysDet.emit(this.subscriberForm.value)
    // this.dataService.setSystemSubscription(this.subscriberForm.value);
  }

  swapSystemWithExisting() {
    this.submitted = false;
    this.modalRef = this.dialogService.open(this.swapSystem, {
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal',
    });
  }
  swapSystemchange(value) {
    this.newsystemId = value.replace(/\s+/g,'');
  }
  ReloadSSID(){
    this.isReloadSSID=!this.isReloadSSID
  }
  isReloadSSID:boolean=false;
  doSwapSystem(value?) {
    this.submitted = true;
    this.modalLoader = true;
    if (!this.subscriberForm.value.newSystemId) {
      return
    }
    const system = {
      "oldSystemId": this.system_id,
      "newSystemId": this.newsystemId,

    }
    //this.system_id = this.newsystemId;
    this.out_swap_system.emit();
    this.swapSysUpdate = this.service.updateNewSystem(this.ORG_ID, system,value).subscribe((res: any) => {
      this.subscriberForm.patchValue({ systemId: this.newsystemId })
      this.success = true;
      this.successInfo = 'Old system replaced by New system successfully';
      setTimeout(() => {
        this.success = false;
        this.goToList()
      }, 3000);
      this.deviceDetails('swap')
      this.modalLoader = false;
    }, (err: HttpErrorResponse) => {
      //console.log(err);
      this.modalLoader = false;
      this.pageErrorHandle(err);
    })


    this.closeAllModal();
  }
  goToList() {
    let searchText = sessionStorage.getItem('foundation_list_search');
    if (searchText) {
      this.router.navigate(['../foundation-system-list'], { relativeTo: this.route, state: { systemSearchText: searchText || '' } });
    } else this.router.navigate(['../foundation-system-list'], { relativeTo: this.route });
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status === 400 && [err["errorCode"], err?.error?.errorCode].includes("FAILED_RELOAD_SSID")){
      this.dialogService.open(this.warningWiFiConfirmation, {
        centered: true,
        windowClass: 'custom-warning-modal clx-custom-modal',
     });
    }else{
      if (err.status == 401) {
        this.errorInfo = this.language['Access Denied'];
      } else {
        this.errorInfo = this.commonOrgService.pageErrorHandle(err);
      }
      this.closeAlert();
      this.error = true;
    }
    
  }
  closeAlert() {
    this.error = false;
    this.success = false;
  }
  closeAllModal() {
    this.dialogService.dismissAll();
    this.showconfirmation = true;
    this.showWarning = false;
  }
  cancel() {
    this.subscriberForm.patchValue({ newSystemId: '' ,isReloadSSID:false});
    this.dialogService.dismissAll();
    this.showconfirmation = true;
    this.showWarning = false;
    this.Out_sysDet.emit(this.subscriberForm.value)
  }
  swapSysMsg = '';
  confirmWithswapMsg() {
    this.submitted = true;
    // this.showconfirmation = false;
    // this.showWarning = true;
    if (!this.subscriberForm.value.newSystemId) {
      return
    }
    else {
      this.showconfirmation = false;
      this.showWarning = true;
      if (this.orgData?.factoryResetOnRma === true) {
        this.swapSysMsg = `${this.language['warning_message_swap1']}
        <br/>
        ${this.language['warning_message_swap2']}
      <br/>
      <br/>
       ${this.language['Do you want Replace a system with another system?']}`
      } else {
        this.swapSysMsg = `
      ${this.language['warning_message_swap1']}
    <br/>
    <br/>
     ${this.language['Do you want Replace a system with another system?']}`
      }

    }

  }
  closeSbscrbrMsg() {
    this.swapSysMsg = '';
    this.showconfirmation = true;
  }
  getDeleteAndFactoryResetData() {
    this.deleteFactoryResetSub = this.service.getDeleteAndFactoryreset(this.ORG_ID).subscribe((res: any) => {
      this.orgData = res ? res : [];
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      //this.pageErrorHandle(err);
    })
  }
  Modelitems = [];

  // onBlurSystemId() {
  //   this.Out_System_Focus.emit(true);
  // }

  // onFocusSystemId() {
  //   this.Out_System_Focus.emit(true);
  // }
  numberOnly(event) {
    if(/[A-z\^\~\_]/.test(event.key))event.preventDefault();
   }
}
