import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, OnDestroy, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { AddSubscriberService } from '../add-subscriber.service';
@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.scss']
})
export class AddDetailsComponent implements OnInit, OnDestroy {

  language: any;
  languageSubject;
  modalRef: any;

  @Input() public In_Details_Data;
  @Input() private createdSubscriberId;
  @Input() public createdSubcriberData
  @Output() private Out_Data_Change: EventEmitter<any> = new EventEmitter();
  @Output() private Out_Data_Submit: EventEmitter<any> = new EventEmitter();

  subscriberForm: FormGroup;
  submitted: boolean;

  errorInfo: string;
  error: boolean;
  emailmsg: string;
  isLatLongCoordinates:boolean = false;
  loading: boolean;
  GeomapInfosub: any;
  subscriberId: any;
  GeomapInfo: any;
  latitude: any;
  longtitude: any;
  constructor(
    private translateService: TranslateService,
    private CommonService:CommonService,
    private systemService: AddSubscriberService,
  ) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data: any) => {
        this.language = data;
      }
    );
  }

  ngOnInit(): void {
    this.subscriberForm = new FormGroup({
      subscriberLocationId: new FormControl(''),
      serviceAddress: new FormControl(''),
      phone: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      account: new FormControl(''),
      hubbLocationId: new FormControl(''),
      fccSubscriberId: new FormControl(''),

    });
    if (this.In_Details_Data) {
      this.subscriberForm.patchValue(this.In_Details_Data);
      this.subscriberId = this.subscriberId ?  this.subscriberId :this.In_Details_Data._id;
    }
  }

  ngOnDestroy() {
    if (this.languageSubject) this.languageSubject.unsubscribe;
    this.Out_Data_Change.emit(this.subscriberForm.value);
  }

  valid = {
    subscriberLocationId: true,
    serviceAddress: true,
    phone: true,
    name: true,
    email: true,
    account: true,
    hubbLocationId: true,
    fccSubscriberId: true,

  };
  clsAlphaNoOnly(e) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }

    e.preventDefault();
    return false;
  }

  formChange(field) {
    let value = this.subscriberForm.value[field];
    switch (field) {
      case 'name':
        value = value ? value.trim() : '';
        this.valid[field] = (value !== '');
        break;
      case 'subscriberLocationId':
        value = value ? value.trim() : '';
        this.valid[field] = (value !== '');
        break;
      case 'email':
        value = value ? value.trim() : '';
        this.valid[field] = (value === '' || (value !== '' && this.validateEmail(value)));
        break;
      case 'account':
        value = value ? value.trim() : '';
        let val2 = this.subscriberForm.value['fccSubscriberId'];
        this.valid[field] = (value === '' || (value !== '' && value !== val2));
        break;
      case 'fccSubscriberId':
        value = value ? value.trim() : '';
        let val3 = this.subscriberForm.value['account'];
        this.valid[field] = (value === '' || (value !== '' && value !== val3));
        break;
      default:
        break;
    }
  }

  validateEmail(value) {
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
      this.emailmsg = "";
      return true;
    } else {
      return false
    }

  }
  getGeomapAddress(value?){
    this.isLatLongCoordinates=true
    this.loading=true
    this.subscriberId = this.createdSubscriberId ?  this.createdSubscriberId :this.In_Details_Data._id;
    let url=value=='Update' ? this.systemService.updateGeomapAddress(this.createdSubscriberId) :this.systemService.getGeomapAddress(this.subscriberId)
    this.GeomapInfosub =url.subscribe((res: any) => {
      this.GeomapInfo = res ? res : {};
      this.latitude=this.GeomapInfo?.lat;
      this.longtitude=this.GeomapInfo?.lon;
      this.loading=false
    }, (err: HttpErrorResponse) => {
      //this.pageErrorHandle(err);
      this.loading = false;
    })
  }
phoneNumberValidationClone = this.CommonService.validatePhoneNumber;
  saveSubscriber() {
    this.submitted = true;
    let formData = this.subscriberForm.value;
    let formValid = true;

    if (!formData.name || (formData.name.trim() == '')) {
      this.valid.name = false;
    } else if (!formData.subscriberLocationId || (formData.subscriberLocationId.trim() == '')) {
      this.valid.subscriberLocationId = false;
    }

    if (formData.email) {
      this.valid.email = this.validateEmail(formData.email);
    }
    if(formData.phone){
      this.valid.phone = this.CommonService.validatePhoneNumber(formData.phone)
    }
    this.formChange('name');
    this.formChange('subscriberLocationId');
    this.formChange('email');
    this.formChange('account');
    this.formChange('fccSubscriberId');

    if (!this.valid.name || !this.valid.subscriberLocationId || !this.valid.email || !this.valid.fccSubscriberId || !this.valid.phone) {
      formValid = false;
      return;
    }

    this.Out_Data_Change.emit(this.subscriberForm.value);
    this.Out_Data_Submit.emit();
  }

  closeAlert() {

  }


  numberOnly(event) {
    if(/[A-z\^\~\_]/.test(event.key))event.preventDefault();
   }
}
