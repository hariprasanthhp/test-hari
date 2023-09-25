import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { CaptivePortalService } from '../shared/service/captive-portal.service';
import { Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-captive-portal',
  templateUrl: './captive-portal.component.html',
  styleUrls: ['./captive-portal.component.scss']
})
export class CaptivePortalComponent implements OnInit {
  @ViewChild('deleteImg', { static: true }) private deleteImg: TemplateRef<any>;
  language: any;
  languageSubject;
  portalDetail: any = {};
  tabSelected: String = 'content';
  bgColor = "#cdcdcd";
  fontColor = "#cdcdcd";
  PfColor = "#cdcdcd";
  bfColor = "#cdcdcd";
  days = [];
  networkAccess = [];
  currentTime = new Date();
  addNetwork = {
    networkAccess: 'Always',
    day: [],
    startTime: new Date(),
    stopTime: new Date(new Date().setMinutes(new Date().getMinutes() + 1))
  }
  weekDays=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  ;
  weekDaysFormat = {
    'Mon': 1,
    'Tue': 2,
    'Wed': 3,
    'Thu': 4,
    'Fri': 5,
    'Sat': 6,
    'Sun': 7
  };
  count = {
    "Mon":0,"Tue":0,"Wed":0,"Thu":0,"Fri":0,"Sat":0,"Sun":0
  };
  previewData: any = {};
  customHours: any = [];
  matchedCriteria: boolean = true;
  loader: boolean = false;
  warningMessage: string = '';

  errorValidation: any = {};

  // addtimedisabled = '';
  checkUrl: boolean = true;
  getCaptiveTime: any;

  RetentionDays: any = [
    { id: '1 day', value: 1 },
    { id: '15 days', value: 15 },
    { id: '30 days', value: 30 },
    { id: '60 days', value: 60 },
    { id: '90 days', value: 90 },
  ];
  imgType: any = "";
  addtimedisabled: any = {
    Everyday: false,
    Custom: false,
    Always: false,
  };

  constructor(private service: CaptivePortalService,
    private translateService: TranslateService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private router: Router,
    public sso: SsoAuthService,) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.RetentionDays = [
        { id: '1 ' + this.language['Day'], value: 1 },
        { id: '15 ' + this.language['Days'], value: 15 },
        { id: '30 ' + this.language['Days'], value: 30 },
        { id: '60 ' + this.language['Days'], value: 60 },
        { id: '90 ' + this.language['Days'], value: 90 },
      ];
      this.changeLanguage();
      this.warningMessage = this.warningMessage ? `${this.language['Sorry, you can only set time limits up to 5 per day']}` : '';

    })
    this.changeLanguage()
    this.getCaptivePortal();
    /* setTimeout(() => {
      this.setCaptivePortal();
    }, 1000); */

  }

  changeLanguage() {
    this.networkAccess = [
      { id: 'Always', name: 'Always On', label: this.language['Always_On'] },
      { id: 'Everyday', name: 'Everyday', label: this.language['Everyday'] },
      { id: 'Custom', name: 'Custom', label: this.language['Custom'] }
    ];
    this.days = [
      { id: 'mon', name: 'Monday', label: this.language['Monday'] },
      { id: 'tue', name: 'Tuesday', label: this.language['Tuesday'] },
      { id: 'wed', name: 'Wednesday', label: this.language['Wednesday'] },
      { id: 'thu', name: 'Thursday', label: this.language['Thursday'] },
      { id: 'fri', name: 'Friday', label: this.language['Friday'] },
      { id: 'sat', name: 'Saturday', label: this.language['Saturday'] },
      { id: 'sun', name: 'Sunday', label: this.language['Sunday'] },
    ];
  }
  getCaptivePortal() {
    this.loader = true;
    this.service.getCaptivePortal(localStorage.getItem('ciquserid')).subscribe((res: any) => {
      this.loader = false;
      this.portalDetail = res;

      //for setting Default values if we get null or res is empty object
      const portalData = {
        "userId": localStorage.getItem('ciquserid'),
        "portalId": (this.portalDetail.portalId && this.portalDetail.portalId != 'null') ? this.portalDetail.portalId : '',
        "ssid": (this.portalDetail.ssid && this.portalDetail.ssid != 'null') ? this.portalDetail.ssid : 'Customer Wi-fi',
        "title": (this.portalDetail.title && this.portalDetail.title != 'null') ? this.portalDetail.title : 'Join Wi-Fi Network',
        "smbWifiNetworkType": (this.portalDetail.smbWifiNetworkType && this.portalDetail.smbWifiNetworkType != 'null') ? this.portalDetail.smbWifiNetworkType : 3,
        "termsUrl": (this.portalDetail.termsUrl && this.portalDetail.termsUrl != 'null') ? this.portalDetail.termsUrl : '',
        "buttonText": (this.portalDetail.buttonText && this.portalDetail.buttonText != 'null') ? this.portalDetail.buttonText : 'Connect',
        "bgColor": (this.portalDetail.bgColor && this.portalDetail.bgColor != 'null') ? this.portalDetail.bgColor : '#FAFAFA',
        "fColor": (this.portalDetail.fColor && this.portalDetail.fColor != 'null') ? this.portalDetail.fColor : '#111111',
        "pbColor": (this.portalDetail.pbColor && this.portalDetail.pbColor != 'null') ? this.portalDetail.pbColor : '#00A3FF',
        "bfColor": (this.portalDetail.bfColor && this.portalDetail.bfColor) ? this.portalDetail.bfColor : '#111111',
        "coverImage": (this.portalDetail.coverImage && this.portalDetail.coverImage != 'null') ? this.portalDetail.coverImage : '',
        "logoImage": (this.portalDetail.logoImage && this.portalDetail.logoImage != 'null') ? this.portalDetail.logoImage : '',
        "loginRetentionDays": (this.portalDetail.loginRetentionDays && this.portalDetail.loginRetentionDays != 'null') ? this.portalDetail.loginRetentionDays : 30,
        "schedules": (this.portalDetail.schedules && this.portalDetail.schedules != 'null') ? this.portalDetail.schedules : []
      }

      this.portalDetail = portalData;
      this.previewData = JSON.parse(JSON.stringify(this.portalDetail));
      this.customHours = this.scheduleDisplayStructure(res?.schedules || []);
      this.addNetwork.networkAccess = this.customHours.length == 0 ? 'Always' : (this.customHours.length == 1 && this.customHours[0].weekDays.length == 7 ? 'Everyday' : 'Custom');
      
      
      if(this.addNetwork.networkAccess == 'Everyday'){
        this.customHours[0].weekDays = this.weekDays.join(',');
      }
      
      
      
      //this.portalDetail.coverImage = "https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2526&q=80"
      for (const key in this.count) {
        this.customHours.forEach(obj=>{
          if(obj.weekDays.includes(key)){
            if(this.count[key] <= 5) this.count[key] += 1;
            // if(this.count[key] > 5) return this.addtimedisabled[this.addNetwork.networkAccess] = true;
          }
        })
  
      }
    
    }, err => {
      this.loader = false;
      this.warningMessage = this.sso.pageErrorHandle(err);
    });
  }

  createCaptivePortal() {
    const coverImg = (this.portalDetail.coverImage instanceof Object && Object.keys(this.portalDetail.coverImage).length
      ? Object.values(this.portalDetail.coverImage).join('')
      : this.portalDetail.coverImage)
      || '';
    const logoImg = (this.portalDetail.logoImage instanceof Object && Object.keys(this.portalDetail.logoImage).length
      ? Object.values(this.portalDetail.logoImage).join('')
      : this.portalDetail.logoImage)
      || '';
    const inp = {
      "userId": localStorage.getItem('ciquserid'),
      "ssid": this.portalDetail.ssid || 'Customer Wi-Fi',
      "title": this.portalDetail.title || 'Join Wi-Fi Network',
      "smbWifiNetworkType": 3,
      "termsUrl": this.portalDetail.termsUrl || '',
      "buttonText": this.portalDetail.buttonText || 'Connect',
      "bgColor": this.portalDetail.bgColor || '#FAFAFA',
      "fColor": this.portalDetail.fColor || '#111111',
      "pbColor": this.portalDetail.pbColor || '#00A3FF',
      "bfColor": this.portalDetail.bfColor || '#111111',
      "loginRetentionDays": this.portalDetail.loginRetentionDays || 30,
      "schedules": JSON.stringify(this.portalDetail.schedules || [])
    }

    const formData = new FormData();
    Object.keys(inp).forEach(inpKey => {
      formData.append(inpKey, inp[inpKey]);
    });
    formData.append("coverImage", this.imageBase64ToBinary('coverImage'));
    formData.append("logoImage", this.imageBase64ToBinary('logoImage'));
    this.loader = true;
    this.service.createCaptivePortal(formData).subscribe((res: any) => {
      this.loader = false;
      res.coverImage = res.coverImage ? `${res.coverImage}?${new Date().getTime()}` : '';
      res.logoImage = res.logoImage ? `${res.logoImage}?${new Date().getTime()}` : '';
      this.portalDetail = res;
      this.previewData = JSON.parse(JSON.stringify(this.portalDetail));
      this.customHours = this.scheduleDisplayStructure(res?.schedules);
    }, err => {
      this.loader = false;
      this.warningMessage = this.sso.pageErrorHandle(err);
    });
  }

  setCaptivePortal() {
    let timeCompare = '';
    if (!this.sso.validateHexCode(this.portalDetail.bgColor) || !this.sso.validateHexCode(this.portalDetail.fColor) || !this.sso.validateHexCode(this.portalDetail.bfColor) || !this.sso.validateHexCode(this.portalDetail.pbColor) || (this.portalDetail.buttonText || '').length > 90 || (this.portalDetail.title || '').length > 64) {
      return;
    }

    if (!this.portalDetail.portalId) {
      this.createCaptivePortal();
      return;
    }


    const coverImg = (this.portalDetail.coverImage instanceof Object && Object.keys(this.portalDetail.coverImage).length
      ? Object.values(this.portalDetail.coverImage).join('')
      : this.portalDetail.coverImage)
      || '';
    const logoImg = (this.portalDetail.logoImage instanceof Object && Object.keys(this.portalDetail.logoImage).length
      ? Object.values(this.portalDetail.logoImage).join('')
      : this.portalDetail.logoImage)
      || '';
    const inp = {
      "userId": localStorage.getItem('ciquserid'),
      "portalId": this.portalDetail.portalId,
      "ssid": this.portalDetail.ssid || 'Customer Wi-Fi',
      "title": this.portalDetail.title || 'Join Wi-Fi Network',
      "smbWifiNetworkType": 3,
      "termsUrl": this.portalDetail.termsUrl || '',
      "buttonText": this.portalDetail.buttonText || 'Connect',
      "bgColor": this.portalDetail.bgColor || '#FAFAFA',
      "fColor": this.portalDetail.fColor || '#111111',
      "pbColor": this.portalDetail.pbColor || '#00A3FF',
      "bfColor": this.portalDetail.bfColor || '#111111',
      "loginRetentionDays": this.portalDetail.loginRetentionDays || 30,
      "schedules": JSON.stringify(this.portalDetail.schedules || [])
    }

    const formData = new FormData();
    Object.keys(inp).forEach(inpKey => {
      formData.append(inpKey, inp[inpKey]);
    });
    formData.append("coverImage", this.imageBase64ToBinary('coverImage'));
    formData.append("logoImage", this.imageBase64ToBinary('logoImage'));

    this.loader = true;
    this.service.setCaptivePortal(formData).subscribe((res: any) => {
      this.loader = false;
      res.coverImage = res.coverImage ? `${res.coverImage}?${new Date().getTime()}` : '';
      res.logoImage = res.logoImage ? `${res.logoImage}?${new Date().getTime()}` : '';
      this.portalDetail = res;
      this.previewData = JSON.parse(JSON.stringify(this.portalDetail));
      this.customHours = this.scheduleDisplayStructure(res?.schedules);
    }, err => {
      this.loader = false;
      this.warningMessage = this.sso.pageErrorHandle(err);
    });
  }

  validateTime(event) {
    let time = event.getHours().toString() + event.getMinutes().toString();
    this.portalDetail.schedules.forEach(element => {
      if (element.weekDays == this.addNetwork.day) {
        element.timeRanges.forEach(newtime => {
          if (newtime.startTime == time) {
            this.addtimedisabled[this.addNetwork.networkAccess] = true;
          }
          else this.addtimedisabled[this.addNetwork.networkAccess] = false;
        });

      }
      else this.addtimedisabled[this.addNetwork.networkAccess] = false;
    })
  }


  setEndTime(event) {
    const startTime = new Date(event);
    this.addNetwork.stopTime = new Date(startTime.setMinutes(startTime.getMinutes() + 1));
    this.validateDays()
  }

  setEndTimeEveryday(event) {
    const startTime = new Date(event);
    this.addNetwork.stopTime = new Date(startTime.setMinutes(startTime.getMinutes() + 1));
  }

  disablefield() {
    if (this.addNetwork.networkAccess == 'Everyday' && this.customHours.length > 0) {
      return true;
    }
    else return false;
  }

  addNetworkAccess() {
    if(this.addNetwork.networkAccess == 'Everyday'){
      this.addNetwork.day = this.addNetwork.networkAccess == 'Everyday'
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : [];
    }
    if (!this.addNetwork.day.length) {
      this.matchedCriteria = false;
      return;
    }

    this.validateDays();
    this.count = {
      "Mon":0,"Tue":0,"Wed":0,"Thu":0,"Fri":0,"Sat":0,"Sun":0
    };
    for (const key in this.count) {
      this.customHours?.forEach(obj=>{
        if(obj.weekDays.includes(key)){
          if(this.count[key] <= 5) this.count[key] += 1;
          // if(this.count[key] > 5) return this.addtimedisabled[this.addNetwork.networkAccess] = true;
        }
      })

    }


    if (this.addtimedisabled[this.addNetwork.networkAccess] == false && this.addNetwork.networkAccess != 'Everyday') {
this.addNetwork.day.map(element => {
 element = element.charAt(0).toUpperCase() + element.substr(1);


      for (const key in this.count) {
        if (element.includes(key)) {
          if (this.count[key] <= 5) this.count[key] += 1;
          if (this.count[key] > 5) {
            this.warningMessage = `${this.language['Sorry, you can only set time limits up to 5 per day']}`;
            this.addtimedisabled[this.addNetwork.networkAccess] = true;
            this.count[key] -=1;
            // if(this.addtimedisabled[this.addNetwork.networkAccess]) break;
            return
          }
        }
      }
    });
      if(this.addtimedisabled[this.addNetwork.networkAccess]) return;
    }

    if (this.addNetwork.networkAccess == 'Everyday') {
      this.addtimedisabled[this.addNetwork.networkAccess] = false;
    }

    const option: any = { timeStyle: 'short' };
    this.portalDetail.schedules = this.portalDetail.schedules || [];
    if (this.addNetwork.networkAccess == 'Everyday') {
      const everyDaySet = this.addNetwork.day.map(day => {
        return this.scheduleFormat(day);
      });
      this.portalDetail.schedules = everyDaySet;
      this.customHours = this.scheduleDisplayStructure(everyDaySet);
    } else {
      if (this.customHours.length == 0) this.portalDetail.schedules = [];
      this.addNetwork.day.forEach(day => {

        let startHours = (this.addNetwork.startTime.getHours() < 10 ? '0'+this.addNetwork.startTime.getHours().toString() : this.addNetwork.startTime.getHours().toString());
        let endHours = this.addNetwork.stopTime.getHours() < 10 ? '0'+this.addNetwork.stopTime.getHours().toString() : this.addNetwork.stopTime.getHours().toString();
    
        let newStartTime = this.addNetwork.startTime ? (startHours + this.addNetwork.startTime.getMinutes().toString()) : '';
        let newEndTime = this.addNetwork.stopTime ? (endHours + this.addNetwork.stopTime.getMinutes().toString()) : '';
    
        let startMinutes = this.addNetwork.startTime.getMinutes();
        let endMinutes = this.addNetwork.stopTime.getMinutes();
    
        if (startMinutes < 10) { newStartTime = startHours + "0" + startMinutes.toString(); }
        if (endMinutes < 10) { newEndTime = endHours + "0" + endMinutes.toString(); }

        let dayMatches = false;
        this.portalDetail.schedules.forEach(sch => {
          if (sch.weekDays == day) {
            dayMatches = true;
            let timeMatches = false;
            sch.timeRanges.forEach(time => {
              if (time.startTime == newStartTime
                && time.stopTime == newEndTime) timeMatches = true;
            });
            if (!timeMatches) {
              sch.timeRanges.push(this.scheduleFormat(day)?.timeRanges[0]);
            }
          }
        });
        if (!dayMatches) {
          this.portalDetail.schedules.push(this.scheduleFormat(day));
        }
      });
      this.customHours = this.scheduleDisplayStructure(this.portalDetail.schedules);

    }
    this.setCaptivePortal();

    console.log("count",this.count)
  }



  selectedDay:any;
  scheduleDisplayStructure(data) {
    // this.addtimedisabled[this.addNetwork.networkAccess] = false;
    let ranges = [];
    let scheduleData = JSON.parse(JSON.stringify(data));
    scheduleData.forEach(tr => {
      tr.timeRanges.forEach(time => {
        const range = String(time.startTime) + String(time.stopTime);
        if (!ranges.includes(range)) ranges.push(range);
      });
    });

    let customHours = [];
    ranges.forEach(range => {
      let days = [];
      scheduleData.forEach(tr => {
        tr.timeRanges.forEach(time => {
          if (range == String(time.startTime) + String(time.stopTime)) days.push(tr.weekDays);
        });
        
      }); 
      customHours.push({
        startTime: range.length == 8 ? range.substring(0, 4) : range.substring(0, 3),
        stopTime: range.length == 8 ? range.substring(4, 8) : range.substring(3, 7),
        weekDays: days.map( a => a.charAt(0).toUpperCase() + a.substr(1) ).sort((a,b)=>this.weekDaysFormat[a]-this.weekDaysFormat[b]),
      })
    });
    return customHours;
  }

  scheduleFormat(day) {
    return {
      "timeRanges": [
        {
          "startTime": this.scheduleTimeFormat(this.addNetwork.startTime),
          "stopTime": this.scheduleTimeFormat(this.addNetwork.stopTime)
        }
      ],
      "weekDays": day
    }
  }

  validateDays() {
    this.addtimedisabled[this.addNetwork.networkAccess] = false;
    let startHours = (this.addNetwork.startTime.getHours() < 10 ? '0'+this.addNetwork.startTime.getHours().toString() : this.addNetwork.startTime.getHours().toString());
    let endHours = (this.addNetwork.stopTime.getHours() < 10 ? '0'+this.addNetwork.stopTime.getHours().toString() : this.addNetwork.stopTime.getHours().toString());

    let newStartTime = this.addNetwork.startTime ? (startHours + this.addNetwork.startTime.getMinutes().toString()) : '';
    let newEndTime = this.addNetwork.stopTime ? (endHours + this.addNetwork.stopTime.getMinutes().toString()) : '';

    let startMinutes = this.addNetwork.startTime.getMinutes();
    let endMinutes = this.addNetwork.stopTime.getMinutes();

    if (startMinutes < 10) { newStartTime = startHours + "0" + startMinutes.toString(); }
    if (endMinutes < 10) { newEndTime = endHours + "0" + endMinutes.toString(); }

    this.addNetwork.day.forEach(day => {
      this.customHours.forEach(element => {
        let weekdays = element.weekDays;
        weekdays =  typeof weekdays == "string" ? weekdays.split(",") : weekdays;
        weekdays.forEach(weekdays => {
          if ((day.charAt(0).toUpperCase() + day.substr(1)) === weekdays) {
            let startTime = element.startTime;
            let endTime = element.stopTime;
            if ((newStartTime >= startTime && newStartTime <= endTime) || (newEndTime >= startTime && newEndTime <= endTime) 
            || (startTime >= newStartTime && startTime <= newEndTime) || (endTime >= newStartTime && endTime <= newEndTime)) {
              this.addtimedisabled[this.addNetwork.networkAccess] = true;
            } 
            else {
              this.addtimedisabled[this.addNetwork.networkAccess] = false;
            }
          }
          // this.addtimedisabled[this.addNetwork.networkAccess] = false;
        })
      })
    })
    this.addNetwork.day.map(element => {
      element = element.charAt(0).toUpperCase() + element.substr(1);
    for (const key in this.count) {
      if(element.includes(key)){
        if(this.count[key] > 5) { 
          this.warningMessage = `${this.language['Sorry, you can only set time limits up to 5 per day']}`;
          this.addtimedisabled[this.addNetwork.networkAccess] = true;
        }
      }
    }
  });
  }
  

  scheduleTimeFormat(time) {
    const option: any = { timeStyle: 'short' };
    return time.toLocaleString('en-GB', option).replace(':', '');
  }

  parseTime(date) {
    const hour = date.length == 4 ? date.substring(0, 2) : date.substring(0, 1);
    let hourTime: any = (parseInt(hour) > 12 ? parseInt(hour) - 12 : parseInt(hour));
    hourTime = hourTime > 9 ? hourTime : '0' + hourTime;
    return `${hourTime}:${(date.length == 4 ? date.substring(2, 4) : date.substring(1, 3))} ${(parseInt(hour) < 12  ? 'AM' : 'PM')}`
  }

  uploadImg(evt, key) {
    let accept = ['jpeg', 'JPEG', 'PNG', 'jpg', 'png', 'JPG', 'img', 'IMG', 'bin', 'BIN'];
    let uploadedFile = evt.target.files[0].name.split('.');
    if (evt.target.files && evt.target.files[0] && accept.includes(uploadedFile[uploadedFile.length - 1])) {
      this.errorValidation[key] = false;
      let reader = new FileReader();
      reader.onload = (e) => {
        this.portalDetail[key] = e.target['result'];
        this.setCaptivePortal();
      };
      reader.readAsDataURL(evt.target.files[0]);
    } else {
      this.errorValidation[key] = true;
    }
    /* if (evt.target.files) {
      this.portalDetail[key] = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(evt.target.files[0]));
      this.setCaptivePortal();
    } */
  }

  imageBase64ToBinary(key) {
    /* const form_Data = new FormData();
    if (this.portalDetail[key] != '') {
      form_Data.append(key, this.portalDetail[key]);
    } else  */
    let imgFile: any = '';
    if (document.querySelector(`#${key}`)) {
      const logo = (<HTMLInputElement>document.querySelector(`#${key}`)).files;

      if (logo.length) {
        $.each(logo, function (i, file) {
          imgFile = file;
        });
      }
    }
    return imgFile || this.portalDetail[key];
    //return atob((this.portalDetail[key] || ',').split(',')[1]);
  }


  previewModalOpen(modal) {
    this.modalService.open(modal, { windowClass: 'captive-large-modal' });
  }

  colorPickerEvent(evt) {
    if (!evt) this.setCaptivePortal();
  }

  networkChange(event) {
    this.addNetwork.day = this.addNetwork.networkAccess == 'Everyday'
      ? ['Mon', 'Tue', 'wed', 'thu', 'fri', 'sat', 'sun']
      : [];
    this.customHours = [];
    this.matchedCriteria = true;
    if (this.addNetwork.networkAccess == 'Always') {
      this.portalDetail.schedules = [];
      this.setCaptivePortal();
    }
    this.addtimedisabled = {};
    this.addNetwork.day.map( a => a.charAt(0).toUpperCase() + a.substr(1) );
    for (const key in this.count) {
      if(this.addNetwork.networkAccess == 'Everyday'){
        if(this.count[key] > 0)  this.count[key]=0;
      }
      else if(this.addNetwork.networkAccess == 'Custom'){
        if(this.count[key] > 0)  this.count[key]=0;
      }
      else if(this.addNetwork.networkAccess == 'Always'){
        if(this.count[key] > 0)  this.count[key]=0;
      }
      }
  }

  formatDays(days) {
    return days.split(',').map(str => (str.charAt(0).toUpperCase() + str.slice(1))).join(', ');
  }

  deleteAccess(tr) {
      let theEveryDays = [];
    for (let j = this.portalDetail.schedules.length - 1; j >= 0; j--) {
      let sch = this.portalDetail.schedules[j];
      for (let i = sch.timeRanges.length - 1; i >= 0; i--) {
        if (sch.timeRanges[i]['startTime'] == tr.startTime && sch.timeRanges[i]['stopTime'] == tr.stopTime) {
          sch.timeRanges.splice(i, 1);
          theEveryDays.push(sch.weekDays.charAt(0).toUpperCase() + sch.weekDays.substr(1));
        }
      }
      this.portalDetail.schedules[j] = sch;
      if (!sch.timeRanges.length) this.portalDetail.schedules.splice(j, 1)
    }
    for (const key in this.count) {
        if(theEveryDays.includes(key)){
          if(this.count[key] > 0) this.count[key] -= 1;
          if(this.count[key] < 5) this.addtimedisabled[this.addNetwork.networkAccess] = false;
        }
    }
    if (this.portalDetail.schedules.length <= 0) {
      this.addtimedisabled[this.addNetwork.networkAccess] = false;
    }
    this.customHours = this.scheduleDisplayStructure(this.portalDetail.schedules);
    this.validateDays();
    this.setCaptivePortal();
  }

  clearInput(val: any) {
    this.portalDetail[val] = '';
  }

  showPreview() {
    localStorage.setItem('captivePreview', JSON.stringify(this.previewData));
    let preview: any = window.open(`/customer-portal/preview`, '_blank');
  }

  validateUrl(event) {
    this.loader = true;
    let pattern = /((h|H)ttp(s)?:\/\/)+(www\.)?(([^www\.][-a-zA-Z0-9@:%._\+~#=]{2,236})\.[a-z]{2,6})\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    if (pattern.test(event.target.value) || !event.target.value) {
      this.checkUrl = true;
      this.loader = false;
      this.portalDetail.termsUrl = event.target.value;
      this.setCaptivePortal();
    } else {
      this.checkUrl = false;
      this.loader = false;
    };

  }
  checkUrlIsValid(event) {
    let pattern = /((h|H)ttp(s)?:\/\/)+(www\.)?(([^www\.][-a-zA-Z0-9@:%._\+~#=]{2,236})\.[a-z]{2,6})\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    this.checkUrl = (pattern.test(event.target.value) || !event.target.value) ? true : false;
  }

  removeImg(dialog = false, key) {
    if (dialog) {
      const activeModel = this.modalService.open(this.deleteImg, { size: 'lg', windowClass: "deleteImg-info", centered: true });
      this.imgType = key;
      return;
    }
    this.portalDetail[key] = '';
    (<HTMLInputElement>document.querySelector(`#${key}`)).value = '';
    this.service.deleteUploadedImg((key == 'coverImage' ? 'cover' : 'logo'), localStorage.getItem('ciquserid')).subscribe((res) => {
      this.loader = false;
      this.modalService.dismissAll();
      this.getCaptivePortal();
    }, err => {
      this.loader = false;
      this.modalService.dismissAll();
      this.warningMessage = this.sso.pageErrorHandle(err);
    });
  }
}