import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CaptivePortalService } from '../../shared/service/captive-portal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';

@Component({
  selector: 'customer-portal',
  templateUrl: './customer-portal.component.html',
  styleUrls: ['./customer-portal.component.scss']
})
export class CustomerPortalComponent implements OnInit {
  @ViewChild('deleteImageModal', { static: true }) private deleteCoverImageModal: TemplateRef<any>;

  loading = true;
  language: any;
  languageSubscription: any;
  activeTab = 'content';
  errorValidation: any = {};

  portalDetail = {
    userId: '',
    portalId: '',
    ssid: '',
    title: '',
    smbWifiNetworkType: 3,
    termsUrl: '',
    buttonText: 'Connect',
    bgColor: '#FAFAFA',
    fColor: '#111111',
    pbColor: '#00A3FF',
    bfColor: '#111111',
    loginRetentionDays: 30,
    schedules: [],
  }

  form: FormGroup;
  previewData: any;
  deleteImageEvent: any;
  errorMessage: string;

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public translateService: TranslateService,
    private ssoAuthService: SsoAuthService,
    private captivePortalService: CaptivePortalService,
    private commonService: CommonFunctionsService
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.titleService.setTitle(`${this.language['Customer Portal']} - ${this.language['SmartBiz']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    this.languageSubscription = this.translateService.selectedLanguage.subscribe(selectedLanguage => {
      this.language = selectedLanguage;
      this.titleService.setTitle(`${this.language['Customer Portal']} - ${this.language['SmartBiz']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    });
    this.initForm();
    this.getCaptivePortal();
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

  initForm() {
    this.form = this.formBuilder.group({
      userId: '',
      portalId: '',
      ssid: '',
      smbWifiNetworkType: 0,

      // content
      title: ['', Validators.maxLength(512)],
      termsUrl: '',
      buttonText: ['', Validators.maxLength(128)],
      coverImage: '',

      // branding
      bgColor: '',
      fColor: '',
      pbColor: '',
      bfColor: '',
      logoImage: '',

      // netowrk access
      schedules: this.formBuilder.array([]),

      // visitors
      loginRetentionDays: 1,
    });
  }

  uploadImage(event: any): any {
    let acceptedFormats = ['jpeg', 'JPEG', 'PNG', 'jpg', 'png', 'JPG', 'img', 'IMG', 'bin', 'BIN'];
    let file = event.file;
    let type = event.type;

    let uploadedFile = file.name.split('.');
    if (file && acceptedFormats.includes(uploadedFile[uploadedFile.length - 1])) {
      this.errorValidation[type] = false;
      if (type == 'coverImage') {
        this.form.patchValue({ coverImage: file });
      } else {
        this.form.patchValue({ logoImage: file });
      }
      this.setCaptivePortal(event.type == 'coverImage' ? 'content' : 'branding');
    } else {
      this.errorValidation[type] = true;
    }
  }

  deleteImage(event) {
    if (event.openDialog) {
      this.deleteImageEvent = event;
      this.modalService.open(this.deleteCoverImageModal, { size: 'lg', windowClass: "deleteImageModal-info", centered: true });
      return;
    }
    this.loading = true;
    this.captivePortalService.deleteUploadedImg((this.deleteImageEvent.type == 'coverImage' ? 'cover' : 'logo'), localStorage.getItem('ciquserid')).subscribe((response) => {
      response = {};
      this.loading = false;
      this.modalService.dismissAll();
      this.getCaptivePortal();
    }, error => {
      this.loading = false;
      this.modalService.dismissAll();
      this.errorMessage = this.ssoAuthService.pageErrorHandle(error);
    });
  }

  getCaptivePortal() {
    this.loading = true;
    this.captivePortalService.getCaptivePortal(localStorage.getItem('ciquserid')).subscribe((portalDetail: any) => {
      this.loading = false;
      Object.keys(portalDetail).map(key => {
        return portalDetail[key] = portalDetail[key] && portalDetail[key] == 'null' ? null : portalDetail[key];
      });
      this.patchPortalDetail(portalDetail);
    }, err => {
      this.loading = false;
      this.errorMessage = this.ssoAuthService.pageErrorHandle(err);
    });
  }

  setCaptivePortal(tab) {
    if (!this.form.valid) return;
    this.loading = true;
    let portalDetail = this.form.value;
    if (
      !this.ssoAuthService.validateHexCode(portalDetail.bgColor) ||
      !this.ssoAuthService.validateHexCode(portalDetail.fColor) ||
      !this.ssoAuthService.validateHexCode(portalDetail.bfColor) ||
      !this.ssoAuthService.validateHexCode(portalDetail.pbColor)
    ) {
      this.loading = false;
      return;
    }
    if (!portalDetail.portalId) {
      this.createCaptivePortal();
      return;
    }
    const payload = this.formatPayload(portalDetail, 'edit');

    this.captivePortalService.setCaptivePortal(payload).subscribe((res: any) => {
      this.loading = false;
      res.coverImage = res.coverImage ? `${res.coverImage}?${new Date().getTime()}` : '';
      res.logoImage = res.logoImage ? `${res.logoImage}?${new Date().getTime()}` : '';
      this.portalDetail = res;
      this.previewData = JSON.parse(JSON.stringify(this.portalDetail));
      this.patchPortalDetail(res);

      if (tab == 'content') {
        this.commonService.trackPendoEvents('Subscriber', 'customer portal content change');
      } else if (tab == 'branding') {
        this.commonService.trackPendoEvents('Subscriber', 'customer portal branding change');
      } else if (tab == 'visitors') {
        this.commonService.trackPendoEvents('Subscriber', 'Customer portal login retention changes');
      }
    }, error => {
      this.loading = false;
      this.errorMessage = this.ssoAuthService.pageErrorHandle(error);
    });
  }

  createCaptivePortal() {
    this.loading = true;
    let portalDetail = this.form.value;
    const payload = this.formatPayload(portalDetail);

    this.captivePortalService.createCaptivePortal(payload).subscribe((res: any) => {
      this.loading = false;
      res.coverImage = res.coverImage ? `${res.coverImage}?${new Date().getTime()}` : '';
      res.logoImage = res.logoImage ? `${res.logoImage}?${new Date().getTime()}` : '';
      this.portalDetail = res;
      this.previewData = JSON.parse(JSON.stringify(this.portalDetail));
      this.patchPortalDetail(res);
    }, error => {
      this.loading = false;
      this.errorMessage = this.ssoAuthService.pageErrorHandle(error);
    });
  }

  formatPayload(portalDetail, type = 'add') {
    const payload = {
      userId: localStorage.getItem('ciquserid'),
      ssid: portalDetail.ssid || 'Customer Wi-Fi',
      title: portalDetail.title || 'Join Wi-Fi Network',
      smbWifiNetworkType: 3,
      termsUrl: portalDetail.termsUrl || '',
      buttonText: portalDetail.buttonText || 'Connect',
      bgColor: portalDetail.bgColor || '#FAFAFA',
      fColor: portalDetail.fColor || '#111111',
      pbColor: portalDetail.pbColor || '#00A3FF',
      bfColor: portalDetail.bfColor || '#111111',
      loginRetentionDays: portalDetail.loginRetentionDays || 30,
      schedules: JSON.stringify(portalDetail.schedules || []),
      coverImage: (portalDetail['coverImage'] || this.portalDetail['coverImage']) ?? '',
      logoImage: (portalDetail['logoImage'] || this.portalDetail['logoImage']) ?? '',
    };
    if (type == 'edit') {
      payload['portalId'] = portalDetail.portalId;
    }
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      formData.append(key, payload[key]);
    });

    return formData;
  }

  patchPortalDetail(portalDetail) {
    this.form.patchValue({
      userId: localStorage.getItem('ciquserid'),
      portalId: portalDetail.portalId ? portalDetail.portalId : '',
      ssid: portalDetail.ssid ? portalDetail.ssid : 'Customer Wi-fi',
      title: portalDetail.title ? portalDetail.title : 'Join Wi-Fi Network',
      smbWifiNetworkType: portalDetail.smbWifiNetworkType ? portalDetail.smbWifiNetworkType : 3,
      termsUrl: portalDetail.termsUrl ? portalDetail.termsUrl : '',
      buttonText: portalDetail.buttonText ? portalDetail.buttonText : 'Connect',
      bgColor: portalDetail.bgColor ? portalDetail.bgColor : '#FAFAFA',
      fColor: portalDetail.fColor ? portalDetail.fColor : '#111111',
      pbColor: portalDetail.pbColor ? portalDetail.pbColor : '#00A3FF',
      bfColor: portalDetail.bfColor ? portalDetail.bfColor : '#111111',
      coverImage: portalDetail.coverImage ? portalDetail.coverImage : '',
      logoImage: portalDetail.logoImage ? portalDetail.logoImage : '',
      loginRetentionDays: portalDetail.loginRetentionDays ? portalDetail.loginRetentionDays : 30,
      schedules: this.patchSchedules(portalDetail.schedules ? portalDetail.schedules : []),
    });
    this.previewData = portalDetail;
  }

  patchSchedules(schedules) {
    let scheduleFormArray = this.form.get('schedules') as FormArray;
    scheduleFormArray.clear();
    if (schedules.length) {
      schedules.forEach(schedule => {
        let scheduleFormGroup = this.formBuilder.group({
          timeRanges: [schedule.timeRanges],
          weekDays: schedule.weekDays,
        });
        scheduleFormArray.push(scheduleFormGroup);
      })
    }
  }

  showPreview() {
    localStorage.setItem('captivePreview', JSON.stringify(this.previewData));
    window.open('/customer-portal/preview', '_blank');
  }
}
