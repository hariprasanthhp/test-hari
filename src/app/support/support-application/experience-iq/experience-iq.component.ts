import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { MultipleDaysModel } from '../shared/models/multiple-days.model';
import { SsoAuthService } from './../../../shared/services/sso-auth.service';
import { environment } from '../../../../environments/environment';
import { ExperianceIQService } from '../shared/service/experiance-iq.service';
import { userProfileSummaryModel } from '../shared/models/user-profile-summary.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jquery from 'jquery';
import { ProfileNewDeviceModel } from '../shared/models/profile-new-device.model';
import { profileDeviceModel } from '../shared/models/profile-device.model';
import { StationListAllModel } from '../shared/models/ststion-list-all.model';
import { ProfileModel } from '../shared/models/profile.model';
import { EditProfileNameModel } from '../shared/models/edit-profile-name.model';
import { FeatureList } from '../shared/models/feature-list.model';
import { SafeSearchModel } from '../shared/models/safe-search.model';
import { CategoriesModel } from '../shared/models/categories.model';
import { EditAppModel } from '../shared/models/edit-app.model';
import { cleanObject } from '../../shared/service/utility.class';
import { Apps, SearchAppModel } from '../shared/models/search-app.model';
import { profileWebUrl } from '../shared/models/get-profile-web-url.model';
import { catchError, tap, switchMap, distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { of, Observable, Subject } from 'rxjs';
import { DataSerialNumberModel } from '../../shared/models/data.serial-number.model';
import { WebAddressProfile } from '../shared/models/web-address-profile.model';
import { UsageEnum, UsageModel } from '../shared/models/usage-model';
import { BedTime, BedtimeModel, Days } from '../shared/models/bed-time.model';
import { EditBedTimeModel } from '../shared/models/edit-bedtime-profile.model';
import { BedTimeAllDay } from '../shared/models/bed-time-all-day.model';
import { ContentFilterModel } from '../shared/models/content-filter.model';
import { ExperianceIQDropDownValues, NotificationModel } from '../shared/models/notifications.model';
import { ExperianceIQUserModel } from '../shared/models/experiance-iq-user.model';
import { ProfileBlockStatusModel } from '../shared/models/profile-block-status.model';
import { ProfileAdd } from '../shared/models/profileadd.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProtectIqService } from '../shared/service/protect-iq.service';
import { DataServiceService } from '../../data.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-experience-iq',
  templateUrl: './experience-iq.component.html',
  styleUrls: ['./experience-iq.component.scss']
})
export class ExperienceIqComponent implements OnInit, OnDestroy {

  @ViewChild('channelchangesModal', { static: true }) private channelchangesModal: TemplateRef<any>;
  @ViewChild('addDevicePrioritiesModal', { static: true }) private addDevicePrioritiesModal: TemplateRef<any>;
  @ViewChild('PrioritiesModal', { static: true }) private PrioritiesModal: TemplateRef<any>;
  @ViewChild('RecalibratePrioritiesModal', { static: true }) private RecalibratePrioritiesModal: TemplateRef<any>;


  @ViewChild('myCalendar') datePicker;
  language: any;
  languageSubject;
  profileDetails: boolean;
  chanelChangesModelTitle: string;
  ModelButton: string;
  TrafficPrioritiesEdit = false;
  TrafficPriorityProfileData: any;
  deviceDuration: any;
  setDurationValue = 'duration';
  showSuccess: boolean = false;
  deviceDeleteModalRef: boolean = false;
  checkTimeLimit: boolean;
  sectionToShow = "details";
  selectedDay: number;
  deleteDevice: any;
  safeSearchStatusValue: boolean = false;
  startTimeValue = new Date();
  isWFHAvailable = false
  hasSubscriber;
  serialnumber;
  protectiqfromstatus;
  //endTimeValue = new Date(this.startTimeValue.getTime() + 1 * 60000);
  endTimeValue = new Date();
  everyDayStartTimeValue = new Date();
  everyDayEndTmeValue = new Date();
  safeSearchStatus = false;
  scopeFlag: any = {};
  profiledata: any = {};
  sunday: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  scheduledTimeError: boolean = false;
  peopleListObj: userProfileSummaryModel;
  createProfile: ProfileNewDeviceModel = new ProfileNewDeviceModel();
  stationList: StationListAllModel = new StationListAllModel();
  connectAllButton: boolean = false;
  disconnectAllButton: boolean = false;
  imageUrl: string;
  image: File;
  deleteProfileData: string;
  modalTitle;
  modalInfo;
  loading: boolean = false;
  deviceSave: boolean = true;
  public errorMsg: string;
  public showError: boolean = false;
  public successMsg: string;
  public successMessage: string;
  modalLoader: boolean = false;
  selectedProfile: ProfileModel = new ProfileModel();
  deviceList: StationListAllModel = new StationListAllModel();
  showDeviceInsideModel: boolean = false;
  showNameAndAvatarInsideModel: boolean = false;
  deleteDeviceData;
  categoriesList: CategoriesModel = new CategoriesModel();
  selectedApps: SearchAppModel = new SearchAppModel()
  webList: profileWebUrl = new profileWebUrl();
  addWebsiteToggle: boolean = true;
  customTimeUsage: Date[] = [];
  allowForChecked = [];
  deviceData: DataSerialNumberModel[];
  userId: string;
  profileUsage: UsageModel = new UsageModel();
  customeTimeLimit: string = 'none';
  currentSelectedDateIndex: number;
  currentSelectedDayEnableStatus: boolean;
  customTimeRadio: boolean = true;
  everydayEnabled: boolean = false;
  WeekDays = [0, 1, 2, 3, 4, 5, 6]
  modalRef: any;
  editTimeLimitData: any;
  editStartTimeValue: Date = new Date();
  editEndTimeValue: Date = new Date();
  durationTimeValue: any = 0;
  timelimitsList: BedtimeModel = new BedtimeModel();
  checkSameTime: boolean = false;
  everydayStartTime
  everydayEndTime
  model: any;
  websiteModel: any = "";
  searching: boolean = false;
  searchFailed: boolean = false;
  deviceSubscription: any = false;
  deviceStatus: any;
  isdevError: boolean = false;
  isError: boolean = false;
  warningMessage: any = '';
  selectedContentFilter: any;
  contentFilter = [{ name: "None", value: "N" }, { name: "Custom", disabled: true, value: "CU" }, { name: "Child (0-8 yrs Old)", value: "C" }, { name: "Pre-Teen (9-12 yrs Old)", value: "P" }, { name: "Teen (13-18 yrs Old)", value: "T" }]
  notificationFilter = ExperianceIQDropDownValues;
  selectednotificationFilter: any;
  ExperienceIQ = 'experienceIQ';
  notificationList: NotificationModel = new NotificationModel();
  isExpandedAlert = [];
  disableAddDeviceButton: boolean = true;
  minDuration: Date = new Date(0, 0, 0, 0, 5, 0, 0);
  profilelist: any;
  profileadddata: any;
  V2token: string;
  bisabledAllowForButton: any = [];//aswin-16-03-2021
  isProfilePaused: boolean;
  currentDevice: any;
  selectedDevice: any = [];
  macadress: any;
  name: any;
  selectedDevices: any = [];
  isPermanent: boolean = false;
  AddDeviceData: { userId: any; isPermanent: boolean; duration: string; selectedDevices: any[]; };
  MacAdress: any;
  profile: any;
  daysString: string;
  days: any[] = [];
  description: any;
  categories: any[];
  scheduleProfile: any;
  sheduleTime: any;
  getcategory: string[];
  categorieItem: any[];
  profileValue: any;
  updateProfiledata: string[];
  updateData: any;
  categoryReorder: boolean = false;
  defaultProfile: any;
  isqosalert: any;
  addSheduleBtnDisabled: boolean = false;
  scheduleDaysError: boolean = false;
  scheduleNameError: boolean = false;
  priority_alert_delete: boolean = false;
  priority_alert_api_error: boolean = false;
  api_error_msg: string;
  newData: any = {};
  showPriority: boolean = false;
  restrictContent = `Restrict  ${this.selectedProfile.name}\'s access to specific content
  by selecting categories to block.`;
  orgId: any;
  subscriberStructure: any;
  undiscoveredGS: any = false;
  subscriptionUpdated: boolean = false;
  advLoading: boolean = false;
  enabledUpdated: any = false;
  tempDeviceStatus: boolean;
  profiledRestriction = false;
  bisabledAllowForButtonMain: any = [];
  availability: any = {};
  gloObj: any = {
    isValidWebsite: true
  };

  showmsg: boolean = false;
  dnsStatus: any;
  icloudStatus: any;
  availableFor22a2: boolean;
  smbEnabled: boolean = true;
  smbOrSmarttownEnabled: boolean = false;
  isSmartTownActivated: boolean = false;
  staffProfiles: any = [];
  staffProfileDetail: any;
  dtTrigger: Subject<any> = new Subject<any>();
  dtTriggerStaff: Subject<any> = new Subject<any>();
  staffProfilesCheck: boolean = false;

  onDeviceSelected(event, device) {
    if (event.target.checked) {
      this.createProfile.stations.push(device)
    } else {
      let removeIndex = this.createProfile.stations.map(item => { return item.deviceId; }).indexOf(device.deviceId);
      // remove object
      this.createProfile.stations.splice(removeIndex, 1);
    }
    //removing undefined objects
    this.createProfile.stations = this.createProfile.stations.filter(x => x.deviceId)
    if (this.createProfile.stations?.length == 0) {
      this.disableAddDeviceButton = true;
    } else {
      this.disableAddDeviceButton = false;
    }
  }
  defaultDaysarray = [
    {
      day: "Sunday",
      shortday: "Sun",
      checked: false
    },
    {
      day: "Monday",
      shortday: "Mon",
      checked: false
    },
    {
      day: "Tuesday",
      shortday: "Tue",
      checked: false
    },
    {
      day: "Wednesday",
      shortday: "Wed",
      checked: false
    },
    {
      day: "Thursday",
      shortday: "Thu",
      checked: false
    },
    {
      day: "Friday",
      shortday: "Fri",
      checked: false
    },
    {
      day: "Saturday",
      shortday: "Sat",
      checked: false
    }
  ]

  tableOptions: DataTables.Settings = {
    pagingType: "full_numbers",
    pageLength: 10,
    searching: true,
    serverSide: false,
    processing: false,
    ordering: true,
    //responsive: true,
    dom: 'ftipr',
    order: [0, 'asc'],
    columnDefs: [
      //{ targets: [0, 1], orderable: true },
      { targets: 2, orderable: false }
    ],
  };

  tableOptionForProfileDetail: DataTables.Settings = {
    ordering: true,
    order: [0, 'asc'],
    dom: 't'
  };

  constructor(private translateService: TranslateService,
    private experianceIQService: ExperianceIQService,
    public ssoService: SsoAuthService,
    private modalService: NgbModal,
    private dialogService: NgbModal,
    private protectIqservices: ProtectIqService,
    private dataService: DataServiceService,
    private titleService: Title,
    private router: Router,
  ) {
    this.changeCustomTime();
    `${this.selectedProfile.name} `;
    this.deviceData = JSON.parse(sessionStorage.getItem("calix.deviceData"))
    this.undiscoveredGS = (this.deviceData &&
      !this.deviceData.filter(obj => (obj.opMode == 'RG' && obj.hasOwnProperty("modelName") && this.ssoService.acceptGSModel(obj.modelName)))?.length &&
      this.deviceData.filter(obj => !obj.hasOwnProperty("modelName"))?.length
    );
    this.deviceData = this.deviceData ? this.deviceData.filter(obj => obj.opMode == "RG") : [];
    this.gloObj.deviceDataCount = this.deviceData && this.deviceData?.length ? 1 : 0;
    this.deviceData = this.gloObj.deviceDataCount ? this.deviceData : [new DataSerialNumberModel()];
    this.selectedContentFilter = "N";
    this.selectednotificationFilter = "";
    this.ssoService.setActionLog('CSC', 'pageHit', 'ExperianceIQ', '/support/application/experienceIQ', 'ExperianceIQ page loaded');
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Restrictions']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
      this.contentFilter = [
        { name: this.language['None'], value: "N" },
        { name: this.language['Custom'], disabled: true, value: "CU" },
        { name: this.language['Child (0-8 yrs Old)'], value: "C" },
        { name: this.language['Pre-Teen (9-12 yrs Old)'], value: "P" },
        { name: this.language['Teen (13-18 yrs Old)'], value: "T" }
      ]

      if (sessionStorage.getItem('defaultLanguage') == 'en') {
        this.restrictContent = `Restrict  ${this.selectedProfile.name}\'s access to specific content
        by selecting categories to block.`
      } else {
        this.restrictContent = `Restreindre l'accès de ${this.selectedProfile.name} à un contenu spécifique
        en sélectionnant les catégories à bloquer.`
      }
      this.defaultDaysarray = [
        {
          day: this.language['Sunday'],
          shortday: "Sun",
          checked: false
        },
        {
          day: this.language['Monday'],
          shortday: "Mon",
          checked: false
        },
        {
          day: this.language['Tuesday'],
          shortday: "Tue",
          checked: false
        },
        {
          day: this.language['Wednesday'],
          shortday: "Wed",
          checked: false
        },
        {
          day: this.language['Thursday'],
          shortday: "Thu",
          checked: false
        },
        {
          day: this.language['Friday'],
          shortday: "Fri",
          checked: false
        },
        {
          day: this.language['Saturday'],
          shortday: "Sat",
          checked: false
        }
      ]
      // this.tableLanguageOptions();
      // this.rerender();
    })
  }
  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.categoryReorder = true;
    this.getcategory = this.categoryData(event.container.data);
  }

  arrayToStringConversion(array) {
    var arrayData = array.sort();
    var arrayString = arrayData.toString()
    var result = arrayString.replace(/,/g, "")
    return result

  }

  getSelectedDays(defaultDaysarray) {
    var dateString = "";

    for (var i in defaultDaysarray) {
      if (defaultDaysarray[i].checked) {
        var datePos = i.toString();
        dateString += datePos
      }
    }
    return dateString;

  }

  checkSelectedDays() {

    var selectedDays = this.defaultDaysarray.filter(
      value => value.checked === true);
    if (selectedDays?.length != 0) {
      return false
    } else {
      return true;
    }
  }

  addDays(event, value) {

    var dayNo = value.toString()
    if (event.target.checked) {
      this.modalLoader = false;
      // this.days.push(dayNo);//begin-aswin-13-03-21-network priority
      this.defaultDaysarray[value].checked = true;
    }
    else {
      // var inx = this.days.indexOf(value);//begin-aswin-13-03-21-network priority
      //  this.days.slice(inx,1)//begin-aswin-13-03-21-network priority
      this.defaultDaysarray[value].checked = false;
    };
    this.scheduleDaysError = this.checkSelectedDays();
    //return this.days
  }


  currentSubscriberInfo: any;

  ngOnInit(): void {
    this.titleService.setTitle(`${this.language['Restrictions']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);

    this.contentFilter = [
      { name: this.language['None'], value: "N" },
      { name: this.language['Custom'], disabled: true, value: "CU" },
      { name: this.language['Child (0-8 yrs Old)'], value: "C" },
      { name: this.language['Pre-Teen (9-12 yrs Old)'], value: "P" },
      { name: this.language['Teen (13-18 yrs Old)'], value: "T" }
    ]

    this.defaultDaysarray = [
      {
        day: this.language['Sunday'],
        shortday: "Sun",
        checked: false
      },
      {
        day: this.language['Monday'],
        shortday: "Mon",
        checked: false
      },
      {
        day: this.language['Tuesday'],
        shortday: "Tue",
        checked: false
      },
      {
        day: this.language['Wednesday'],
        shortday: "Wed",
        checked: false
      },
      {
        day: this.language['Thursday'],
        shortday: "Thu",
        checked: false
      },
      {
        day: this.language['Friday'],
        shortday: "Fri",
        checked: false
      },
      {
        day: this.language['Saturday'],
        shortday: "Sat",
        checked: false
      }
    ]

    this.showSuccess = false;
    this.showError = false;

    /*const v2mobileapData = {
      "email": "test005@gmail.com",
      "password": "12345678",
      "mobileDevice": {
        "id": "1ff87d70-b18c-449a-a41f-58c298762a54",
        "notificationToken": "FCM-0e13e24b0739a202af68c828af2ceedc430",
        "os": "ios",
        "msisdn": "4081234567",
        "locale": "en_US",
        "packageName": "com.calix.smarthome"
      }
    }
    this.experianceIQService.loginMobilev2(v2mobileapData).subscribe((res) =>{
      sessionStorage.setItem('loginv2mobileToken', res.token)
     //   console.log('v2lOGINDATA',res);
    })
    this.V2token = sessionStorage.getItem('loginv2mobileToken')*/
    // this.getDeviceEdit();

    //  this.experianceIQService.editqosProfileListV1(this.V2token).subscribe((res) =>{
    //
    //   this.scheduleProfile = res.scheduleProfile
    //   //this.profileList = [];
    //   for(var i = 0; i<this.scheduleProfile?.length; i++){
    //     var startTime = this.scheduleProfile[i].startTime;
    //     var endTime = this.scheduleProfile[i].endTime;

    //     this.sheduleTime = endTime - startTime
    //     this.scheduleProfile[i]['scheduletime'] = this.sheduleTime;
    //   }
    //   console.log('editdevice', this.scheduleProfile);
    // })
    //begin-aswin-13-03-21-network priority
    // this.experianceIQService.getQosV1(this.V2token).subscribe((res) =>{
    //   this.categories = [];
    //   this.profile = res.defaultProfile;
    //   this.defaultProfile = res.defaultProfile; // //begin-aswin-13-03-21-network priority
    //   for( var i =0; i<this.profile?.length; i++){
    //     var category = this.profile[i].description
    //     console.log(category)
    //     this.categories.push(category)
    //   }
    //  })
    //end-aswin-13-03-21-network priority
    this.isSmbOnboarded = this.ssoService.isSmbEnabled();
    this.softwareVrsion = this.ssoService.getSoftwareVersion(true);
    this.currentSubscriberInfo = this.ssoService.currentSubscriberInfo.subscribe(() => {
      this.isSmbOnboarded = this.ssoService.isSmbEnabled();
      this.softwareVrsion = this.ssoService.getSoftwareVersion(true);
    });


    this.hasSubscriber = history.state?.hasSubscriber || (sessionStorage.getItem(`calix.subscriberId`) && sessionStorage.getItem(`calix.subscriberId`) != 'undefined');
    this.getScopes();
    this.orgId = this.ssoService.getOrgId();
    this.subscriberStructure = this.dataService.getStoredSubscriberInfo() || { subscriberLocationId: sessionStorage.getItem(`calix.subLocationId`), _id: sessionStorage.getItem(`calix.subscriberId`) } || {};
    this.getSubscribedStatus();
    this.getDeviceStatus();
    var softwareVrsion = this.ssoService.getSoftwareVersion(true);
    if (softwareVrsion < 22.1) {
      this.isWfhAvailable();
    }



    //console.log("history.state", history.state.ispriorities)
    // console.log(JSON.stringify(history.state))

    /* if (history.state?.ispriorities) {
    //this.isqosalert = JSON.parse(localStorage.getItem("isqosalert"));

    if (history.state?.ispriorities) {   
     
      this.changeSection("priorities");
    } */
    //if(history.state?.ispriorities){this.changeSection("priorities")} 
    // alert(this.ssoService.exosVersionCheck('21.4'))

    this.isqosalert = this.ssoService.exosVersionCheck('22.1');
    this.availableFor22a2 = this.ssoService.exosVersionCheck('22.2', true);
    //this.tableLanguageOptions();
  }
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  ngOnDestroy() {
    if (this.currentSubscriberInfo)
      this.currentSubscriberInfo.unsubscribe();
    this.languageSubject?.unsubscribe();
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
    if (this.dtTriggerStaff) {
      this.dtTriggerStaff.unsubscribe();
    }
  }
  Recalibrate() {
    this.dialogService.open(this.RecalibratePrioritiesModal, { centered: true, windowClass: 'priority-modal' });
  }
  public showSuccessAlert(msg: string) {
    //jquery('.alert.alert-success').show();
    this.successMessage = msg;
  }
  public closeAlert(): void {
    //jquery('.alert').hide();
    this.showmsg = false;
  }
  ExIQPrioritiesReset() {
    this.loading = true;
    let result;
    let macAdr = [];
    JSON.parse(sessionStorage.getItem('calix.deviceData')).filter(element => {
      // result = { mode: element.opMode, macAdd: element.macAddress };
      if (element.opMode == 'RG') {
        macAdr.push(element.macAddress);
      }
    })
    // if (result.mode == 'RG') {
    //   macAdr = result.macAdd
    // }

    if (macAdr?.length) {
      this.experianceIQService.EIQResetPriorites(macAdr.toString()).subscribe(data => {
        setTimeout(() => {
          this.ExIQPrioritiesDelete();
        }, 2000);
      }, (err) => {
        setTimeout(() => {
          this.ExIQPrioritiesDelete();
        }, 2000);
      })
    } else {
      //console.log('No RG device is present')
    }
  }
  ExIQPrioritiesDelete() {

    this.loading = true;
    this.experianceIQService.EIQDeletePriorites(localStorage.getItem('ciquserid')).subscribe(data => {
      this.loading = false;
      this.showmsg = true;
      this.showSuccessAlert(this.language['Speed Test calculations have been reset, please re-run Speed Test.']);
    }, (err) => {
      this.loading = false;
      this.pageErrorHandle(err);
    });

  }
  getSubscribedStatus(checkUpdated = false) {
    this.loading = true;
    let devicedatafilter = this.deviceData.filter(obj => obj.opMode == "RG");
    this.serialnumber = devicedatafilter && devicedatafilter?.length ? devicedatafilter[0].serialNumber : ''
    //alert("500 expeiq this.deviceData"+serialnumber+"this.hasSubscriber"+this.hasSubscriber)

    const subId = sessionStorage.getItem(`calix.subscriberId`);
    const availInd = this.serialnumber ? 1 : (subId ? 2 : 0);
    if (!availInd) return;
    this.protectIqservices.getArloAccount(this.orgId, (availInd == 1 ? this.serialnumber : subId), availInd).subscribe((res: any) => {
      this.loading = false;
      if (res) {

        this.protectiqfromstatus = res.edgeSuites.protectIQ.subscribed
        this.smbOrSmarttownEnabled = (res?.edgeSuites?.myCommunityIQ?.passpoint?.enable && res?.edgeSuites?.myCommunityIQ?.passpoint?.status?.result !== 'failed')
          || (res?.edgeSuites?.myCommunityIQ?.eduroam?.enable && res?.edgeSuites?.myCommunityIQ?.eduroam?.status?.result !== 'failed')
          || (res?.edgeSuites?.smallBizIQ?.enable && res?.edgeSuites?.smallBizIQ?.status?.result !== 'failed');
        this.smbEnabled = res?.edgeSuites?.smallBizIQ?.enable || (sessionStorage['calix.subscriberId'] == 'undefined' && this.ssoService.isSmbEnabled());
        this.isSmartTownActivated = [res?.edgeSuites?.myCommunityIQ?.passpoint, res?.edgeSuites?.myCommunityIQ?.eduroam].some(ele => ele?.enable && ['pending', 'succeeded'].includes(ele?.status?.result));

        if (checkUpdated) {
          this.subscriptionUpdated = (this.deviceSubscription == res.edgeSuites.experienceIQ.subscribed);
          return;
        }
        else this.deviceSubscription = this.smbEnabled || !!res.edgeSuites.experienceIQ.subscribed;


        if (res.edgeSuites.experienceIQ.subscribed && !this.undiscoveredGS) this.deviceStatus = res.edgeSuites.experienceIQ.enabled//this.getDeviceStatus();;

      }
    }, err => {
      this.loading = false;
      this.pageErrorHandle(err);
    });

    /* if (this.hasSubscriber) {
      this.protectIqservices.subscribeStatus(this.orgId, 'ExperienceIQ', this.subscriberStructure.subscriberLocationId).subscribe((res: any) => {
        this.loading = false;
        if (res) {
          if (checkUpdated) {
            this.subscriptionUpdated = (this.deviceSubscription == res.subscribe);
            return;
          }
          else this.deviceSubscription = res.subscribe;
          if (res.subscribe && !this.undiscoveredGS) this.getDeviceStatus();
        }
      }, err => {
        this.loading = false;
        this.pageErrorHandle(err);
      });
    }
    else {
      this.protectIqservices.subscribeStatuswithoutsubscriber(this.orgId, this.serialnumber).subscribe((res: any) => {
        this.loading = false;
        if (res) {

          this.protectiqfromstatus = res.edgeSuites.protectIQ.subscribed

          if (checkUpdated) {
            this.subscriptionUpdated = (this.deviceSubscription == res.edgeSuites.experienceIQ.subscribed);
            return;
          }
          else this.deviceSubscription = res.edgeSuites.experienceIQ.subscribed;


          if (res.edgeSuites.experienceIQ.subscribed && !this.undiscoveredGS) this.deviceStatus = res.edgeSuites.experienceIQ.enabled//this.getDeviceStatus();;
          setTimeout(() => {
            this.showMenu = this.deviceStatus && this.deviceSubscription;
          }, 0);
        }
      }, err => {
        this.loading = false;
        this.pageErrorHandle(err);
      });
    } */
    /*this.protectIqservices.subscribeStatus(this.orgId, 'ExperienceIQ', this.subscriberStructure.subscriberLocationId).subscribe((res: any) => {
      this.loading = false;
      if (res) {
        if (checkUpdated) {
          this.subscriptionUpdated = (this.deviceSubscription == res.subscribe);
          return;
        }
        else this.deviceSubscription = res.subscribe;
        if (res.subscribe && !this.undiscoveredGS) this.getDeviceStatus();
      }
    }, err => {
      this.loading = false;
      this.pageErrorHandle(err);
    });*/
  }

  toggleSubscription(state) {
    if (this.deviceSubscription == state) return;
    this.deviceSubscription = state;
    this.advLoading = true;
    //this.deviceSubscription = !(this.deviceSubscription || (this.deviceSubscription == 'true'))
    if (this.hasSubscriber) {
      this.protectIqservices.toggleAppSubscription(this.orgId, 'ExperienceIQ', this.subscriberStructure.subscriberLocationId, this.deviceSubscription).subscribe((res: any) => {
        let i = 0;
        this.getSubscribedStatus(true);
        const statusInterval = setInterval(() => {
          i++;
          if (this.subscriptionUpdated && (this.undiscoveredGS || this.deviceSubscription == this.tempDeviceStatus)) {
            this.advLoading = false;
            clearInterval(statusInterval);
            this.updateAppTile();
            if (!this.undiscoveredGS) this.getDeviceStatus();
          } else if (i == 12) {
            this.advLoading = false;
            //this.deviceSubscription = !this.deviceSubscription;
            clearInterval(statusInterval);
            this.updateAppTile();
          } else {
            !this.subscriptionUpdated ? this.getSubscribedStatus(true) : this.getDeviceStatus(true);
          }
        }, 10000);
      }, err => {
        this.deviceSubscription = !this.deviceSubscription;
        this.advLoading = false;
        (err?.error?.error?.msg.includes('not communicating with router'))
          ? this.pageErrorHandle('Device is offline', true)
          : this.pageErrorHandle(err, true);
      });
    }

    else {

      let params = {
        protectIQ: {},
        experienceIQ: {},
      };

      params.experienceIQ = {
        subscribed: this.deviceSubscription
      }

      params.protectIQ = {
        subscribed: this.protectiqfromstatus
      }


      this.protectIqservices.toggleAppSubscriptionwithoutsubscriber(this.orgId, this.serialnumber, params).subscribe((res: any) => {
        let i = 0;
        let delay = 2000;
        if (res && res.estimatedDelay) {
          delay += res.estimatedDelay * 1000;
        }

        setTimeout(() => {
          this.getSubscribedStatus(true);
        }, delay);

        const statusInterval = setInterval(() => {
          i++;
          if (this.subscriptionUpdated && (this.undiscoveredGS || this.deviceSubscription == this.tempDeviceStatus)) {
            this.advLoading = false;
            clearInterval(statusInterval);
            this.updateAppTile();
            if (!this.undiscoveredGS) this.getDeviceStatus();
          } else if (i == 12) {
            this.advLoading = false;
            //this.deviceSubscription = !this.deviceSubscription;
            clearInterval(statusInterval);
            this.updateAppTile();
          } else {
            !this.subscriptionUpdated ? this.getSubscribedStatus(true) : this.getDeviceStatus(true);
          }
        }, 10000);
      }, err => {
        this.deviceSubscription = !this.deviceSubscription;
        this.advLoading = false;
        (err?.error?.error?.msg.includes('not communicating with router'))
          ? this.pageErrorHandle('Device is offline', true)
          : this.pageErrorHandle(err, true);
      });
    }

  }

  onBoardedCheck() {
    this.protectIqservices.getUserId(this.deviceData[0].serialNumber).subscribe((newData: any) => {
      if (newData && newData.userId) {
        this.newData = newData;
        this.userId = newData.userId;
        if (this.deviceStatus) this.showFeatureAvailability();
        if (history?.state?.ispriorities) {
          delete history.state.ispriorities;
          this.isWfhAvailable();
          this.changeSection('priorities');
        }
      }
    }, err => {
      this.pageErrorHandle(err);
    })
  }

  updateAppTile() {
    const sn = (this.deviceData && this.deviceData?.length ? this.deviceData[0].serialNumber : '') || sessionStorage.getItem('undiscoveredSn') || '';
    if (sn) {
      this.protectIqservices.tileStatus(this.orgId, sn, this.subscriberStructure._id).subscribe((data: any) => {
        data = data || {};
        let hasIQ = 0;
        const scopes = this.ssoService.getScopes();
        const hasServify = (
          data?.app?.servifyCare?.email
            && (this.getEntitlemnt('207') || this.getEntitlemnt('215') || this.getEntitlemnt('216') || this.getEntitlemnt('217'))
            && scopes['cloud.rbac.csc.apps.servify']
            ? 1 : 0
        );
        const hasArlo = (
          data?.app?.arloSmart?.email
            && (this.getEntitlemnt('206') || this.getEntitlemnt('212') || this.getEntitlemnt('213'))
            && scopes['cloud.rbac.csc.apps.arlo']
            ? 1 : 0
        );
        const hasMyComm = (
          data?.app?.myCommunityIQ?.subscriber?.enable
            && (this.getEntitlemnt('214'))
            && scopes['cloud.rbac.csc.apps.mycommunityiq']
            ? 1 : 0
        );

        const hasBark = (
          data?.app?.bark?.email
            && (this.getEntitlemnt('219') || this.getEntitlemnt('220'))
            && scopes['cloud.rbac.csc.apps.bark']
            ? 1 : 0
        );

        if (((this.getEntitlemnt('203') || this.getEntitlemnt('205') || (this.getEntitlemnt('218') && this.ssoService.isSmbEnabled()))) && scopes['cloud.rbac.csc.apps.protectiq'] && data?.app?.protectIQ?.subscribed) hasIQ++;
        if (((this.getEntitlemnt('204') || this.getEntitlemnt('205') || (this.getEntitlemnt('218') && this.ssoService.isSmbEnabled()))) && scopes['cloud.rbac.csc.apps.experienceiq'] && data?.app?.experienceIQ?.subscribed) hasIQ++;
        $('#commandIQEmailId').text((data?.commandIQ?.fduser ? '-' : (data?.commandIQ?.email || '-')));
        $('#appSubscribedId').text(((hasIQ + hasServify + hasArlo + hasMyComm + hasBark) != 0 ? (hasIQ + hasServify + hasArlo + hasMyComm + hasBark) : '-'));
        $('#appInstalledId').text((data?.installed?.count != undefined ? data?.installed?.count : '-'));

        let tileInfo: any = this.dataService.getSubscriberTabInfoData() || {};
        if (!tileInfo?.networkStatus?.appCount) tileInfo.networkStatus = { 'appCount': {} };
        tileInfo.networkStatus.appCount = {
          subscriberAppCount: (hasIQ + hasServify + hasArlo + hasMyComm + hasBark),
          enabledAppCount: data?.installed?.count
        }
        this.dataService.setSubscriberTabInfoData(tileInfo);
      }, err => {
        this.pageErrorHandle(err);
        this.loading = false;
      })
    }
  }

  getEntitlemnt(ind) {
    return this.ssoService.getEntitlementsArr().includes(ind);
  }

  showFeatureAvailability() {

    this.loading = true;
    this.protectIqservices.getFeatureAvailability(this.newData.userId).subscribe((data: any) => {
      this.loading = false;
      this.availability = data;
      /* Changes for Story - CCL-39006 */
      /* if (data?.bwShapingOn == true && this.scopeFlag.configWrite) {
        let obj = { target: { checked: false } };
        this.Activate(obj);
      } */
      if (this.deviceStatus && this.deviceSubscription) {
        this.showPriority = data.qosService;
      }

    }, (err) => {
      this.availability = {};
      this.showError = true;
      // if (err.error.errorType == 500) {
      //   this.errorMsg = this.warningMessage = err.error.errorDesc
      // }
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }
  getQosList() {
    this.experianceIQService.getQosV1(this.userId).subscribe((res) => {
      this.categories = [];
      this.profile = res.defaultProfile;
      this.defaultProfile = [...res.defaultProfile]; // //begin-aswin-13-03-21-network priority
      for (var i = 0; i < this.profile?.length; i++) {
        var category = this.profile[i].description
        this.categories.push(category)
      }
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }
  getDeviceEdit(init: any = '') {
    this.loading = true;
    this.deviceSave = true;
    this.experianceIQService.editqosDeviceV1(this.userId).subscribe((res) => {
      this.loading = false;
      this.currentDevice = res.currentDevices;
      this.selectedDevice = res.selectedDevices;
      /*this.selectedDevice.push({"macAddr":"54:e1:ad:a9:f4:32","name":"Elite","type":1},{"macAddr":"54:e1:ad:a9:f4:31","name":"Elite","type":1},{"macAddr":"38:a4:ed:d7:ff:85","name":"Redmi3S-Ponns","type":11},{"macAddr":"38:a4:ed:d7:ff:86","name":"Redmi3S-Ponns","type":11},{"macAddr":"38:a4:ed:d7:ff:87","name":"Redmi3S-Ponns","type":11},{"macAddr":"38:a4:ed:d7:ff:88","name":"Redmi3S-Ponns","type":11})*/
      this.deviceDuration = res.duration;
      if (this.deviceDuration != 0 && this.deviceDuration?.length == 4) {
        let d = new Date();
        d.setHours(this.deviceDuration.slice(0, 2));
        d.setMinutes(this.deviceDuration.slice(2, 4));
        this.durationTimeValue = d;
      } else {
        setTimeout(() => {
          let d = new Date();
          d.setHours(2);
          d.setMinutes(30);
          this.durationTimeValue = d
        }, 100);
      }
      if (res.isPermanent == true) {
        this.isPermanent = true;
        this.setDurationValue = 'always'
      } else {
        this.isPermanent = false;
        this.setDurationValue = 'duration'
      }
      let duration = this.getTime(this.durationTimeValue) != '00' ? this.getTime(this.durationTimeValue) : '0';

    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }
  categoryData(categoryData) {

    this.categorieItem = [];
    this.updateData = categoryData

    for (var i = 0; i < categoryData?.length; i++) {
      //var categorylist = this.getcategory[i].description;

      // this.categorieItem.push(categoryData[i].description)
      var category = categoryData[i].category.toLowerCase();
      this.categorieItem.push(category);
    }
    return this.categorieItem;
  }
  onCalenderSelected(event: Date, i) {
    if (event.getHours() == 0 && event.getMinutes() == 0) {
      this.bisabledAllowForButton[i] = true;
    } else {
      this.bisabledAllowForButton[i] = false;
    }
  }

  onCalenderSelectedMain(event: Date, i) {
    if (event.getHours() == 0 && event.getMinutes() == 0) {
      this.bisabledAllowForButtonMain[i] = true;
    } else {
      this.bisabledAllowForButtonMain[i] = false;
    }
  }

  dayConvert(daystring) {
    var dayString = "";
    var len = daystring?.length;
    var i = 1;
    if (len == 7) {
      dayString = 'All days '
    } else {
      for (let day of daystring) {
        if (i == len) {
          dayString += this.defaultDaysarray[day].shortday + '  ';
        } else {
          dayString += this.defaultDaysarray[day].shortday + ', ';
        }
        i++
      }
    }

    return dayString;
  }

  setDateAndTimeFromString(timestring) {

    var time = timestring.match(/.{1,2}/g)
    var date = new Date();
    date.setHours(time[0]);
    date.setMinutes(time[1]);
    return date;
  }
  constructScheduleProfiledata(scheduledata) {
    var returnData = [];
    for (var schedule of scheduledata) {
      var dateConvertString = this.dayConvert(schedule.day);
      var startTime = this.timeConvert(schedule.startTime);
      var endTime = this.timeConvert(schedule.endTime);
      var objData = {
        day: dateConvertString,
        startTime: startTime,
        endTime: endTime,
        id: schedule.id,
        name: schedule.name

      }
      returnData.push(objData);
    }



    return returnData;
  }

  getDeviceStatus(checkUpdated = false) {

    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    if (this.deviceData?.length && this.deviceData[0].serialNumber) {
      this.experianceIQService.getApplicationStatus(this.deviceData[0].serialNumber, 'CIEP').subscribe((data: any) => {
        this.loading = false;
        if (checkUpdated) {
          this.enabledUpdated = (this.deviceStatus == data.status.installed);
          this.tempDeviceStatus = data.status.installed;
          return;
        } else this.deviceStatus = data.status.installed;
        if (!this.newData.userId) this.onBoardedCheck();
        else if (this.deviceStatus) this.showFeatureAvailability();
      }, (err: HttpErrorResponse) => {
        this.loading = false;
        if (err.error.errorMessage) {
          this.errorMsg = err.error.errorMessage;
        } else {
          this.errorMsg = err.error.errorDesc;
        }
        this.showError = true;
        this.pageErrorHandle(err);
      })
    } else {
      this.deviceStatus = JSON.parse(sessionStorage.getItem('iqStatus'))?.experienceIQEnabled || false;
    }
  }

  Activate(event) {

    this.loading = true;
    //this.safeSearchStatus = event.target.checked
    //this.V2token = sessionStorage.getItem('loginv2mobileToken')
    if (event.target.checked) {

      this.experianceIQService.ActivateV1(this.userId).subscribe((data: any) => {
        this.loading = false;
        this.profilelist = data;
        this.getQosListData()
      }, (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMsg = err.error.errorDesc;
        this.showError = true;
        this.safeSearchStatusValue = false;
        this.safeSearchStatus = false;
      })
    }
    else {
      this.selectedDevice = [];
      let d = new Date();
      d.setHours(0);
      d.setMinutes(0);
      this.durationTimeValue = d;
      this.experianceIQService.DeactivateV1(this.userId).subscribe((data: any) => {
        this.loading = false;
        this.profilelist = data;
        this.getQosListData()
      }, (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMsg = err.error.errorDesc;
        this.showError = true;
      })

    }
  }

  checkName(event) {
    if (event.target.value) {
      this.modalLoader = false;
      this.scheduleNameError = false
    } else {
      this.scheduleNameError = true
    }
  }
  //begin-joy-08-03-21-network-priority
  getQosListData(init: any = '') {

    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    this.experianceIQService.getqoslist_V2(this.userId).subscribe((data: any) => {
      this.loading = false;
      this.safeSearchStatus = data.isQoSOn;
      this.profilelist = data;

      //this.scheduleProfile = data.scheduleProfile;
      this.scheduleProfile = this.constructScheduleProfiledata(data.scheduleProfile)

      if (this.scheduleProfile?.length == 3) {
        this.addSheduleBtnDisabled = true;
      } else {
        this.addSheduleBtnDisabled = false;
      }
      //begin-aswin-13-03-21-network priority
      if (this.safeSearchStatus) {
        this.getQosList();
        //this.editQosListData();
        this.getDeviceEdit(true);
      }
      //end-aswin-13-03-21-network priority
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }
  timeConvert(timestring) {

    var time = timestring.match(/.{1,2}/g)
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
    var timeHr = time[0] + ':' + time[1] + " " + time[5]
    return timeHr
  }
  UpdateDefaultProfile() {
    this.V2token = sessionStorage.getItem('loginv2mobileToken')
    if (this.categoryReorder) {
      var categories = {
        "userId": this.userId,
        "categories": this.getcategory
      }

      this.experianceIQService.updateDefaultProfileV1(this.V2token, categories).subscribe((res) => {

        this.getQosListData(); //15-03-2021-netowrk-priority-bug-fixing
        this.categoryReorder = false;
        this.closeModal();
      })
    } else {
      this.closeModal()
    }
    //const updateProfiledata = {categories}




  }

  resetPriorityModalValues() {
    this.profiledata.name = "";
    this.editStartTimeValue = new Date();
    const startValueCopy = new Date();
    this.editEndTimeValue = new Date(startValueCopy.setMinutes(startValueCopy.getMinutes() + 1));
    this.defaultDaysarray = this.defaultDaysarray.map(item => {
      item.checked = false;
      return item;
    });

    if (this.categoryReorder) {
      this.profile = [...this.defaultProfile];
      this.getcategory = this.categoryData(this.defaultProfile);
    }
  }

  saveshedule() {
    this.showSuccess = false;
    this.showError = false;
    this.modalLoader = true;
    this.V2token = sessionStorage.getItem('loginv2mobileToken');

    if (!this.categoryReorder && this.chanelChangesModelTitle.includes('Add')) {
      this.getcategory = this.categoryData(this.defaultProfile);
    }

    var selectedDays = this.defaultDaysarray.filter(
      value => value.checked === true);
    this.profiledata.name = this.profiledata.name.trim()
    if (this.profiledata.name && !(this.getTime(this.editStartTimeValue) >= this.getTime(this.editEndTimeValue)) && selectedDays?.length != 0) {
      this.scheduleDaysError = false;
      this.modalLoader = false;
      if (!this.TrafficPrioritiesEdit) {
        // if(!this.categoryReorder){
        //   this.getcategory = this.categoryData(this.defaultProfile);
        // }
        const AddProfileData = {
          userId: this.userId,
          name: this.profiledata.name,
          startTime: this.getTime(this.editStartTimeValue),
          endTime: this.getTime(this.editEndTimeValue),
          //day: this.arrayToStringConversion(this.days),
          day: this.getSelectedDays(this.defaultDaysarray),
          categories: this.getcategory

        }

        this.experianceIQService.getprofileAdd_V1(this.V2token, AddProfileData,).subscribe(res => {
          this.profileadddata = res;
          this.getQosListData();
          // this.profiledata.name = "";
          // this.editStartTimeValue = new Date();
          // this.editEndTimeValue = new Date();
          if (this.chanelChangesModelTitle.includes('Add')) {
            this.resetPriorityModalValues();
          }


          this.closeModal();
        }, (err: HttpErrorResponse) => {

          this.modalLoader = false;
          this.closeModal();
          this.errorMsg = err.error.errorDesc;
          this.showError = true;
        })

      } else {
        // if(!this.categoryReorder){
        //   this.getcategory = this.categoryData(this.defaultProfile);
        // }

        const EditProfileData = {
          id: this.TrafficPriorityProfileData.id,
          userId: this.userId,
          name: this.profiledata.name,
          startTime: this.getTime(this.editStartTimeValue),
          endTime: this.getTime(this.editEndTimeValue),
          // day: this.arrayToStringConversion(this.days),//begin-aswin-13-03-21-network priority
          day: this.getSelectedDays(this.defaultDaysarray),//begin-aswin-13-03-21-network priority
          categories: this.getcategory

        }

        this.experianceIQService.UpdateProfileV1(this.userId, EditProfileData,).subscribe(res => {
          this.profileadddata = res;
          this.getQosListData();
          // this.profiledata.name = "";
          // this.editStartTimeValue = new Date();
          // this.editEndTimeValue = new Date();
          // if (this.chanelChangesModelTitle.includes('Add')) {
            this.resetPriorityModalValues();
          // }



          this.closeModal();
        }, (err: HttpErrorResponse) => {
          this.modalLoader = false;
          this.closeModal();
          this.errorMsg = err.error.errorDesc;
          this.showError = true;
        })
      }
    } else {
      if (!this.profiledata.name) {
        this.scheduleNameError = true;
      } else {
        this.scheduleNameError = false;
      }
      if ((this.getTime(this.editStartTimeValue) >= this.getTime(this.editEndTimeValue))) {
        this.scheduledTimeError = true;

      } else {
        this.scheduledTimeError = false;

      }
      if (selectedDays?.length == 0) {
        this.scheduleDaysError = true;

      } else {
        this.scheduleDaysError = false;

      }
      //alert("select atleast one day");
    }


  }
  checkBoxValue(event, device) {

    if (event.target.checked) {
      //this.selectedDevices = [];
      const deviceData = {
        macAddr: device.macAddr,
        name: device.name,
      }
      this.selectedDevices.push(deviceData);

    } else {
      this.selectedDevices = this.selectedDevices.filter(obj =>

        obj.macAddr != device.macAddr
      )
    }
    if (this.selectedDevices?.length > 5) {
      $("#addDevice").attr("disabled", "");
      this.warningMessage = "You can add up to 5 devices";
      this.isdevError = true;
    } else {
      $("#addDevice").removeAttr("disabled");
      this.warningMessage = '';
      this.isdevError = false;
    }

  }
  ispermanent(checkedData) {
    this.isPermanent = checkedData;
    if (checkedData == 'true') {
      this.setDurationValue = 'duration'
    } else {
      this.setDurationValue = 'always'
    }
    this.deviceSave = false;
    //return this.isPermanent

  }
  minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
  }
  getTime(time) {

    //var date = new Date(time);
    var date = time;
    var h = date.getHours().toString();
    var m = date.getMinutes().toString();
    var Time = (h?.length == 2 ? h : 0 + h) + (m?.length == 2 ? m : 0 + m);
    // var date = new Date(time);
    // var date = time;
    //var hr = this.minTwoDigits(date.getHours().toString());
    //var min =  this.minTwoDigits(date.getMinutes().toString());
    //Time = hr + min
    // console.log(Time)
    return Time

  }

  AddDevice(flag = false) {
    if (!flag) {
      if (this.selectedDevices?.length == 0 || this.selectedDevices?.length == this.selectedDevice?.length) {
        this.isdevError = true;
        this.warningMessage = "No devices selected";
        return;
      } else {
        this.isdevError = false;
        this.warningMessage = '';
        this.modalLoader = true;
      }
    }
    this.AddDeviceData = {
      userId: this.userId,
      isPermanent: this.isPermanent,
      duration: this.getTime(this.durationTimeValue) != '00' ? this.getTime(this.durationTimeValue) : '0',
      selectedDevices: this.selectedDevices
    }
    this.experianceIQService.deviceUpdateV1(this.AddDeviceData).subscribe((res) => {
      this.modalLoader = false;
      this.closeModal();
      this.getDeviceEdit();
      this.getQosListData();
    }, (err: HttpErrorResponse) => {
      this.isdevError = true;
      this.warningMessage = err.error.errorDesc;
      this.modalLoader = false;
    })


  }
  removeDevice(device, action: any) {
    this.deleteDevice = device;
    this.deviceDeleteModalRef = true;
    if (action) {
      this.loading = true;
      this.MacAdress = device.macAddr;
      this.experianceIQService.deleteDeviceV1(this.userId, this.MacAdress).subscribe((res) => {
        this.loading = false;
        this.deviceDeleteModalRef = false;
        this.getDeviceEdit()
        this.getQosListData();
      })
    }
  }
  setSelectedDates(daysString) {

    for (var str of daysString) {
      this.defaultDaysarray[str].checked = true;
    }

  }
  // getProfileData(profileId) {

  // }
  updateProfile(profile) {

    this.loading = true

    this.V2token = sessionStorage.getItem('loginv2mobileToken')
    this.experianceIQService.getProfileV1(this.userId, profile.id).subscribe((res) => {

      this.loading = false
      this.TrafficPriorityProfileData = res
      this.profiledata.name = this.TrafficPriorityProfileData.name;
      this.editStartTimeValue = this.setDateAndTimeFromString(this.TrafficPriorityProfileData.startTime);
      this.editEndTimeValue = this.setDateAndTimeFromString(this.TrafficPriorityProfileData.endTime);
      this.setSelectedDates(this.TrafficPriorityProfileData.day);

      this.profile = this.TrafficPriorityProfileData.profiles;
      this.getcategory = this.categoryData(this.TrafficPriorityProfileData.profiles);
      this.channelchangesModalOpen('edit')
    })

  }
  closeTrfficePriorityModal() {
    // this.profiledata.name = "";
    // this.editStartTimeValue = new Date();
    // this.editEndTimeValue = new Date();
    // this.defaultDaysarray = this.defaultDaysarray.map(item => {
    //   item.checked = false;
    //   console.log('defaultdayarray', item)
    //   return item;
    // });
    // if (this.categoryReorder) {

    //   this.profile = this.defaultProfile

    // }
    this.resetPriorityModalValues();
    this.closeModal();

  }

  DeleteProfile() {

    //console.log(profile);
    //this.MacAdress = profile.id;
    this.V2token = sessionStorage.getItem('loginv2mobileToken')
    this.experianceIQService.deleteProfileV1(this.userId, this.MacAdress).subscribe((res) => {
      //console.log(res);
      this.MacAdress = "";
      this.priority_alert_delete = false;
      this.showError = false;
      this.getQosListData()
    }, (err: HttpErrorResponse) => {
      this.deviceStatus = true;
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })

  }
  confirmDeleteProfile(profile) {
    this.MacAdress = profile.id;
    this.modalInfo = `"${profile.name}"?`
    this.priority_alert_delete = true;

  }
  close_priority_alert(): void {
    this.showSuccess = false;
    this.showError = false;
    this.priority_alert_delete = false;
  }

  closeAlertError() {
    this.showError = false;
  }
  onEnabled() {
    // this.deviceStatus = !this.deviceStatus;
    this.loading = true;
    let deviceSubDetails = {
      sn: this.deviceData[0].serialNumber,
      appName: "CIEP"
    }
    this.showSuccess = false;
    this.showError = false;
    if (this.deviceSubscription) {
      this.experianceIQService.applicationEnable(deviceSubDetails).subscribe((data: any) => {
        this.loading = false;
        this.getDeviceStatus();
      }, (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMsg = err.error.errorDesc;
        this.showError = true;
        this.deviceStatus = false;
        this.deviceSubscription = false;
      })
    } else {
      this.experianceIQService.applicationDisbale(deviceSubDetails).subscribe((data: any) => {
        setTimeout(() => {
          this.loading = false;
          this.getDeviceStatus();
        }, 45000)
      }, (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMsg = err.error.errorDesc;
        this.showError = true;
        this.deviceStatus = false;
        this.deviceSubscription = false;
      })
    }
  }

  previousTimeEvent: Date = new Date();
  allowForCalenderClicked(i) {
    this.previousTimeEvent.setHours(this.customTimeUsage[i].getHours())
    this.previousTimeEvent.setMinutes(this.customTimeUsage[i].getMinutes())
  }

  onAllowForTimeSelected(selectedevent, event: Date, index: number) {
    if (event.getHours() == +"00" && event.getMinutes() == +"00") {
      this.customTimeUsage[index].setHours(1);
    } else if (selectedevent.relatedTarget &&
      selectedevent.relatedTarget.id && selectedevent.relatedTarget.id == "submitButton") {
    } else {
      this.customTimeUsage[index].setHours(this.previousTimeEvent.getHours(), this.previousTimeEvent.getMinutes());
    }
  }

  onalertFilterChange() {
    this.loading = true;
    this.isExpandedAlert = [];
    this.showSuccess = false;
    this.showError = false;
    this.experianceIQService.getNotification(this.userId, this.ExperienceIQ, this.selectednotificationFilter).subscribe(res => {
      this.loading = false;
      this.notificationList = res;
      this.notificationList.datas.forEach((x, i) => {
        this.isExpandedAlert.push(false);
      })
    }, (error: HttpErrorResponse) => {
      this.notificationList.datas = [];
      this.loading = false
      if (error.status != 404) {
        this.showSuccess = false;
        this.errorMsg = "";
        this.showError = false;
        this.loading = false;
        this.errorMsg = error.error.errorDesc;
        this.showError = true;
      } else {//begin-aswin-16-03-2021
        this.showSuccess = false;
        this.errorMsg = "";
        this.showError = false;
        this.loading = false;
        this.errorMsg = error.error.errorDesc;
        this.showError = false;
      }//end-aswin-16-03-2021
    })
  }

  toggleEnable(state) {
    if (this.deviceStatus == state) return;
    this.deviceStatus = state;
    this.advLoading = true;
    const input = { "app": "experienceIQ", "enable": this.deviceStatus };
    this.protectIqservices.setEnableStatus(this.orgId, this.deviceData[0].serialNumber, input).subscribe((data: any) => {
      setTimeout(() => {
        let i = 0;
        this.getDeviceStatus(true);
        const statusInterval = setInterval(() => {
          i++;
          if (this.enabledUpdated) {
            this.advLoading = false;
            clearInterval(statusInterval);
            this.updateAppTile();
            this.getDeviceStatus();
          } else if (i == 12) {
            this.advLoading = false;
            this.deviceStatus = !this.deviceStatus;
            clearInterval(statusInterval);
          } else {
            this.getDeviceStatus(true);
          }
        }, 10000);
      }, ((data?.estimatedDelay || 0) * 1000 + 2000));
    }, (err) => {
      this.advLoading = false
      this.deviceStatus = false;
      (err?.error?.error?.msg.includes('not communicating with router'))
        ? this.pageErrorHandle('Device is offline', true)
        : this.pageErrorHandle(err, true);
      //this.pageErrorHandle(err);
      //this.errorMsg = err.error.errorDesc;
      this.showError = true;
    });
  }

  onSubscription(state) {
    if (this.deviceStatus == state) return;
    this.deviceStatus = state;
    this.showSuccess = false;
    this.showError = false;
    this.advLoading = true;
    //this.deviceStatus = !(this.deviceStatus || (this.deviceStatus == 'true'));

    let deviceSubDetails = {
      fsn: this.deviceData[0].serialNumber,
      appName: "CIEP",
      orderId: this.newData.userId
    }
    if (this.deviceStatus) {
      this.experianceIQService.installApplication(deviceSubDetails).subscribe((data: any) => {
        let i = 0;
        this.getDeviceStatus(true);
        const statusInterval = setInterval(() => {
          i++;
          if (this.enabledUpdated) {
            this.advLoading = false;
            clearInterval(statusInterval);
            this.updateAppTile();
            this.getDeviceStatus();
          } else if (i == 12) {
            this.advLoading = false;
            this.deviceStatus = !this.deviceStatus;
            clearInterval(statusInterval);
          } else {
            this.getDeviceStatus(true);
          }
        }, 10000);
      }, (err: HttpErrorResponse) => {
        this.advLoading = false
        this.deviceStatus = false;
        (err?.error?.error?.msg.includes('not communicating with router'))
          ? this.pageErrorHandle('Device is offline', true)
          : this.pageErrorHandle(err, true);
        //this.pageErrorHandle(err);
        //this.errorMsg = err.error.errorDesc;
        this.showError = true;
      })
    } else {
      this.experianceIQService.unInstallApplication(deviceSubDetails).subscribe((data: any) => {
        let i = 0;
        this.getDeviceStatus(true);
        const statusInterval = setInterval(() => {
          i++;
          if (this.enabledUpdated) {
            this.advLoading = false;
            clearInterval(statusInterval);
            this.updateAppTile();
            this.getDeviceStatus();
          } else if (i == 12) {
            this.advLoading = false;
            this.deviceStatus = !this.deviceStatus;
            clearInterval(statusInterval);
          } else {
            this.getDeviceStatus(true);
          }
        }, 10000);
      }, (err: HttpErrorResponse) => {
        this.advLoading = false;
        this.deviceStatus = true;
        (err?.error?.error?.msg.includes('not communicating with router'))
          ? this.pageErrorHandle('Device is offline', true)
          : this.pageErrorHandle(err, true);
        //this.errorMsg = err.error.errorDesc;
        this.showError = true;
      })
    }
  }

  disconnectParticularProfile(people, event) {
    event.stopPropagation();
    this.showSuccess = false;
    this.showError = false;
    let body: ProfileBlockStatusModel = new ProfileBlockStatusModel();
    body.profileId = people.profileId;
    body.userId = this.userId;
    body.block = true;
    this.experianceIQService.updateProfileBlockStatus(body).subscribe(res => {
      this.getAllSummary();
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }
  connectParticularProfile(people, event) {
    event.stopPropagation();
    this.showSuccess = false;
    this.showError = false;
    let body: ProfileBlockStatusModel = new ProfileBlockStatusModel();
    body.profileId = people.profileId;
    body.userId = this.userId;
    body.block = false;
    this.experianceIQService.updateProfileBlockStatus(body).subscribe(res => {
      this.getAllSummary();
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }
  onContentFilterChange() {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    let body: ContentFilterModel = new ContentFilterModel();
    body.userId = this.userId;
    body.profileId = this.selectedProfile.profileId;
    body.group = this.selectedContentFilter;
    this.experianceIQService.updateContentFilter(body).subscribe(res => {
      this.getProfileCategoryList();
      this.loading = false;
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = error.error.errorDesc;
      this.showError = true;
    })
  }

  onContentFilterChangeMain() {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    const body = {
      userId: this.userId,
      group: this.selectedContentFilter
    };
    this.experianceIQService.updateContentFilterMain(body).subscribe(res => {
      this.getProfileCategoryListMain();
      this.loading = false;
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = error.error.errorDesc;
      this.showError = true;
    })
  }

  getloggedInUserId() {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    this.experianceIQService.getUserId(this.deviceData[0].serialNumber).subscribe(res => {
      this.loading = false;
      this.userId = res.userId;
      // this.getDeviceStatus();
    }, err => {
      this.loading = false;
    })
  }
  //begin-aswin-16-03-2021
  resetAlertBox() {
    this.showError = false;
    this.showSuccess = false;
    this.priority_alert_delete = false;
  }
  //end-aswin-16-03-2021
  changeSection(event) {

    switch (event) {
      case 'details': {
        this.sectionToShow = 'details';
        this.showError = false;
        this.showSuccess = false;
        this.resetAlertBox()//begin-aswin-16-03-2021
        break;
      }
      case 'alert': {
        this.sectionToShow = 'alert';
        this.fetchAlertData();
        this.showError = false;
        this.showSuccess = false;
        this.resetAlertBox()//begin-aswin-16-03-2021
        break;
      }
      case 'people': {
        this.sectionToShow = 'people';
        this.getAllSummary();
        this.showError = false;
        this.showSuccess = false;
        this.resetAlertBox()//begin-aswin-16-03-2021
        break;
      }
      case 'priorities': {
        this.sectionToShow = 'priorities';
        // this.getAllSummary();//begin-aswin-12-03-2021-unwanted api call.
        //if(this.safeSearchStatus){
        this.getQosListData('init');
        // this.getQosList();
        // this.editQosListData();
        // }
        this.showError = false;
        this.showSuccess = false;
        this.resetAlertBox()//begin-aswin-16-03-2021
        break;
      }
      case 'restrictions': {
        this.sectionToShow = 'restrictions';
        break;
      }
      case 'staff': {
        this.sectionToShow = 'staff';
        this.getStaffProfiles();
        break;
      }
    }

  }

  fetchAlertData() {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    this.isExpandedAlert = [];
    this.experianceIQService.getNotification(this.userId, this.ExperienceIQ, "").subscribe(res => {
      this.loading = false;
      this.notificationList = res;
      this.notificationList.datas.forEach((x, i) => {
        this.isExpandedAlert.push(false);
      })
      this.selectednotificationFilter = "";
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      this.notificationList.datas = [];
      if (error.status != 404) {
        this.showSuccess = false;
        this.errorMsg = "";
        this.showError = false;
        this.loading = false;
        this.errorMsg = error.error.errorDesc;
        this.showError = true;
      }
    })
  }
  getAllSummary() {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    this.experianceIQService.getAllUsersSummary(this.userId).subscribe((res: userProfileSummaryModel) => {
      this.peopleListObj = res;
      this.loading = false;
      this.udateStatusButton(this.peopleListObj);
    }, err => {
      this.loading = false;

    })
  }
  udateStatusButton(profileObj: userProfileSummaryModel) {
    for (let i = 0; i < profileObj.profiles?.length; i++) {
      if (profileObj.profiles[i].isBlocked) {
        this.disconnectAllButton = true;
        this.connectAllButton = false;
        break;
      } else {
        this.connectAllButton = true;
        this.disconnectAllButton = false;
      }
    }
    if (profileObj.profiles?.length == 0) {
      this.connectAllButton = false;
      this.disconnectAllButton = false;
    }
  }
  deleteExperianceIq(people, event) {
    event.stopPropagation();
    this.showSuccess = false;
    this.showError = false;
    this.deleteProfileData = people.profileId;
    this.modalTitle = 'Delete People';
    this.modalInfo = `"${people.name}"?`
  }

  appformatter = (result: Apps) => result.name || "";
  searchApp = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap((term: string) => term?.length < 2 ? of([]) :
        this.experianceIQService.searchApp(this.selectedProfile.profileId, term, this.userId).pipe(
          tap(() => {
            this.showSuccess = false;
            this.showError = false;
            this.searchFailed = false;
            this.isError = false;
          }),
          catchError((error) => {
            this.errorMsg = error.error.errorDesc;
            this.showError = false;
            this.searchFailed = true;
            this.pageErrorHandle(error);
            return of([]);
          })
        )
      ),
      tap(() => this.searching = false)
    )

  searchAppMain = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap((term: string) => term?.length < 2 ? of([]) :
        this.experianceIQService.searchAppMain(term, this.userId).pipe(
          tap(() => {
            this.showSuccess = false;
            this.showError = false;
            this.searchFailed = false;
            this.isError = false;
          }),
          catchError((error) => {
            this.errorMsg = error.error.errorDesc;
            this.showError = true;
            this.searchFailed = true;
            this.pageErrorHandle(error);
            return of([]);
          })
        )
      ),
      tap(() => this.searching = false)
    )

  selectedItem(selectedApp) {
    // this.clickedItem=item.item;
    this.showSuccess = false;
    this.showError = false;
    this.gloObj.restAppExist = (this.selectedApps?.apps || []).filter(obj => obj.id == selectedApp.item.id)?.length;
    if (this.gloObj.restAppExist) return;
    this.loading = true;
    let body: EditAppModel = new EditAppModel();
    body.profileId = this.selectedProfile.profileId;
    body.id = selectedApp.item.id;
    body.block = selectedApp.item.blocked;
    body.duration = selectedApp.item.timeUsage || '0';
    body.userId = this.userId;
    this.experianceIQService.editAppByProfileId(body).subscribe(x => {
      this.loading = false;
      this.model = ""
      this.appformatter(new Apps());
      this.getProfileAppList();
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = error.error.errorDesc;
      this.showError = true;
    })
  }

  selectedItemMain(selectedApp) {
    // this.clickedItem=item.item;
    this.showSuccess = false;
    this.showError = false;
    this.gloObj.restAppExist = (this.selectedApps?.apps || []).filter(obj => obj.id == selectedApp.item.id)?.length;
    if (this.gloObj.restAppExist) return;
    this.loading = true;
    const body = {
      id: selectedApp.item.id,
      block: selectedApp.item.blocked,
      duration: selectedApp.item.timeUsage || '0',
      userId: this.userId
    }
    this.experianceIQService.editAppMain(body).subscribe(x => {
      this.loading = false;
      this.model = ""
      this.appformatter(new Apps());
      this.getProfileAppListMain();
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = error.error.errorDesc;
      this.showError = true;
      this.pageErrorHandle(error);
    })
  }

  onNoneClicked() {
    this.showSuccess = false;
    this.showError = false;
    let body: BedTimeAllDay = new BedTimeAllDay();
    body.userId = this.userId;
    body.profileId = this.selectedProfile.profileId;
    body.enable = false;
    this.experianceIQService.deleteALLBedTimeProfile(this.selectedProfile.profileId, this.userId).subscribe(res => {
      this.fetchTimeLimitsData();
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }
  removeProfileApp(app: any) {
    this.showSuccess = false;
    this.showError = false;
    this.experianceIQService.deleteAppByProfileAndAppId(this.selectedProfile.profileId, String(app), this.userId).subscribe(res => {
      this.getProfileAppList();
    })
  }

  removeProfileAppMain(app: any) {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    this.experianceIQService.deleteAppByProfileAndAppIdMain(String(app), this.userId).subscribe(res => {
      this.loading = false;
      this.getProfileAppListMain();
    }, err => {
      this.loading = false;
      this.pageErrorHandle(err);
    })
  }

  confirmUserProfileDelete() {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    this.experianceIQService.deleteProfile(this.deleteProfileData, this.userId).subscribe(x => {
      this.closeMessageModal();
      this.getAllSummary();
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      this.closeMessageModal();
      this.errorMsg = error.error.errorDesc;
      this.showError = true;
    })
  }
  updateProfileBlockedStatus(type: boolean) {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    let body = {}
    if (type) {
      body = {
        "userId": this.userId,
        "block": true
      }
    } else {
      body = {
        "userId": this.userId,
        "block": false
      }
    }
    this.loading = true;
    this.experianceIQService.updateAllProfileBlockStatus(body).subscribe(x => {
      this.loading = false;
      this.getAllSummary();
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = error.error.errorDesc;
      this.showError = true;
    })
  }

  closeMessageModal(): void {
    this.showSuccess = false;
    this.showError = false;
    this.deleteProfileData = null;
    this.deleteDeviceData = null;
  }
  onsumbitNewUser() {
    this.showSuccess = false;
    this.showError = false;
    this.modalLoader = true;
    //filtering the records which has deviceId
    this.createProfile.userId = this.userId;
    this.createProfile.stations = this.createProfile.stations.filter(x => x.deviceId)
    this.experianceIQService.addProfileNewDevice(this.createProfile).subscribe(res => {
      if (this.imageUrl) {
        this.experianceIQService.uploadAvatar(this.image, res.profileId).subscribe(x => {
          this.closeModal();
          this.getAllSummary();
        }, (error: HttpErrorResponse) => {
          this.modalLoader = false;
          this.closeModal()
          this.errorMsg = error.error.errorDesc
          this.showError = true;
        })
      } else {
        this.closeModal();
        this.getAllSummary();
      }
    }, (err: HttpErrorResponse) => {

      this.modalLoader = false;
      this.closeModal();
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    }
    )
  }
  openModal(content: any, state: string) {
    this.showSuccess = false;
    this.showError = false;
    let ngbOptions =
      { ariaLabelledBy: 'modal-basic-title', centered: true, windowClass: 'custom-sm-modal' }
    this.createProfile = new profileDeviceModel();
    if (state == 'temp') { }
    else if (state != 'editProfile') {
      this.getAllStationDevice();
    }
    this.imageUrl = null;
    this.image = null;
    if (state === 'editProfile') {
      this.imageUrl = this.selectedProfile.avatarUrl;
      this.createProfile.name = this.selectedProfile.name;
    }
    this.modalService.open(content, ngbOptions).result.then((result) => {
      //console.log(result);

    },
      (reason) => {
      }
    )
  }

  getAllStationDevice() {
    this.showSuccess = false;
    this.showError = false;
    this.experianceIQService.stationListAll(this.userId).subscribe(res => {
      this.stationList = res;
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    }
    )
  }

  closeModal(err = '') {
    this.modalLoader = false;
    this.modalService.dismissAll();
    /*if (!err) {
      this.isError = false
    }*/
  }

  hideError() {
    this.showError = false;
    this.errorMsg = '';
  }

  getScopes() {
    let scopes = this.ssoService.getScopes();
    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.csc.apps.experienceiq.configuration'] = scopes['cloud.rbac.csc.apps.experienceiq.configuration'] ? scopes['cloud.rbac.csc.apps.experienceiq.configuration'] : [];
      scopes['cloud.rbac.csc.apps.experienceiq.enablement'] = scopes['cloud.rbac.csc.apps.experienceiq.enablement'] ? scopes['cloud.rbac.csc.apps.experienceiq.enablement'] : [];

      if (scopes && (scopes['cloud.rbac.csc.apps.experienceiq.configuration'])) {
        if (scopes['cloud.rbac.csc.apps.experienceiq.configuration'].indexOf('read') !== -1) this.scopeFlag.configRead = true;
        if (scopes['cloud.rbac.csc.apps.experienceiq.configuration'].indexOf('write') !== -1) this.scopeFlag.configWrite = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.apps.experienceiq.enablement'])) {
        if (scopes['cloud.rbac.csc.apps.experienceiq.enablement'].indexOf('read') !== -1) this.scopeFlag.enableRead = true;
        if (scopes['cloud.rbac.csc.apps.experienceiq.enablement'].indexOf('write') !== -1) this.scopeFlag.enableWrite = true;
      }
    } else {
      this.scopeFlag.configRead = true;
      this.scopeFlag.configWrite = true;
      this.scopeFlag.enableRead = true;
      this.scopeFlag.enableWrite = true;
    }
  }

  dayNumber(num: number, index: BedTime[], enableStatus) {
    this.selectedDay = num;
    let tempIndex = [];
    index.forEach(x => tempIndex.push(x.idx))
    this.findBedtimeIndex(tempIndex)
    this.currentSelectedDayEnableStatus = enableStatus
    /* setTimeout(() => {
      this.changeCustomTime();
    }, 0); */
  }

  findBedtimeIndex(arrayofIndex: any[]) {
    var a = arrayofIndex,
      count = arrayofIndex?.length;
    for (var i = 0; i <= count; i++) {
      if (a.indexOf(i) == -1) {
        this.currentSelectedDateIndex = i;
        break;
      }
    }
  }

  goToProfile(people) {
    this.deleteProfileData = null;
    this.selectedProfile = people;
    this.getStationList(people.profileId);
    this.profileDetails = true;
    if (people.isBlocked) this.isProfilePaused = true;
  }
  getStationList(profileId: string) {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    this.experianceIQService.profileStationList(profileId, this.userId).subscribe((res: StationListAllModel) => {
      this.loading = false;
      this.deviceList = res
    })
  }
  closeProfile() {
    this.deleteProfileData = null;
    this.deleteDeviceData = null;
    this.showSuccess = false;
    this.showError = false;
    this.profileDetails = false;
  }

  hideSuccess() {
    this.showSuccess = false;
    this.successMsg = '';
  }
  onSubmitEditProfile() {
    this.showSuccess = false;
    this.showError = false;
    this.modalLoader = true;
    let body: EditProfileNameModel = new EditProfileNameModel();
    body.userId = this.userId;
    body.profileId = this.selectedProfile.profileId;
    body.name = this.createProfile.name;
    this.experianceIQService.editProfileName(body).subscribe(res => {
      this.selectedProfile.name = body.name;
      this.modalLoader = false;
      if (this.image) {
        this.experianceIQService.uploadAvatar(this.image, this.selectedProfile.profileId).subscribe(x => {
          this.selectedProfile.avatarUrl = x.filePath;
          this.closeModal();
          this.modalLoader = false
        }, (err: HttpErrorResponse) => {
          this.closeModal();
          this.modalLoader = false;
          this.errorMsg = err.error.errorDesc;
          this.showError = true;
        })
      } else {
        this.closeModal();
        this.modalLoader = false
        this.profileDetails = false;
        this.sectionToShow = 'people';
      }
    }, (err: HttpErrorResponse) => {
      this.closeModal();
      this.modalLoader = false;
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }



  addDevicetoProfile() {
    this.showSuccess = false;
    this.showError = false;
    this.modalLoader = true;
    let body: profileDeviceModel = new profileDeviceModel();
    body.profileId = this.selectedProfile.profileId;
    body.userId = this.userId;
    //filtering the records which has deviceId
    this.createProfile.stations = this.createProfile.stations.filter(x => x.deviceId)
    body.stations = this.createProfile.stations;
    this.experianceIQService.addDeviceProfile(body).subscribe(res => {
      this.getStationList(this.selectedProfile.profileId);
      this.closeModal();
    }, (err: HttpErrorResponse) => {
      this.modalLoader = false;
      this.closeModal();
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  removeProfileDevice(device) {
    this.showSuccess = false;
    this.showError = false;
    this.deleteDeviceData = device;
    this.modalTitle = 'Delete Device';
    this.modalInfo = `the Device "${device.name}"?`;
  }
  confirmProfileDeviceDelete() {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    let body: profileDeviceModel = new profileDeviceModel();
    body.userId = this.userId;
    body.profileId = this.selectedProfile.profileId;
    body.stations.push(this.deleteDeviceData);
    body.stations = body.stations.filter(x => x.deviceId)
    this.experianceIQService.removeDeviceProfile(body).subscribe(res => {
      this.deleteDeviceData = null;
      this.getStationList(this.selectedProfile.profileId);
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.deleteDeviceData = null;
      this.closeModal();
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }
  youtubeRestrictionFeature = false;
  safeSearchFeature = false;
  youtubeRestrictionStatus = false;
  fetchRestrictionData() {
    this.showSuccess = false;
    this.showError = false;
    if (sessionStorage.getItem('defaultLanguage') == 'en') {
      this.restrictContent = `Restrict  ${this.selectedProfile.name || ''}\'s access to specific content
      by selecting categories to block.`
    } else {
      this.restrictContent = `Restreindre l'accès de ${this.selectedProfile.name || ''} à un contenu spécifique
      en sélectionnant les catégories à bloquer.`
    }
    this.getRestrictionFeatureList();
    this.getYoutubeRestrictionStatus();
    this.getProfileSafeSearchStatus();
    this.getProfileCategoryList();
    this.getProfileAppList();
    this.getProfileWebList();
    this.getDns();
    this.getiCloud();

  }
  isSmbOnboarded: boolean = false;
  softwareVrsion: number;
  getRestriction() {

    this.isSmbOnboarded = this.ssoService.isSmbEnabled();
    this.softwareVrsion = this.ssoService.getSoftwareVersion(true);

    // this.isSmbOnboarded = true;
    // this.softwareVrsion = 23.3;

    // Resendential (this.softwareVrsion >= 23.3 && this.isSmbOnboarded)

    // if (!(this.softwareVrsion >= 23.3 && this.isSmbOnboarded)) {
    //   this.profiledRestriction = false;
    //   this.getYoutubeRestrictionStatusMain();
    //   this.getProfileSafeSearchStatusMain();
    //   this.getProfileCategoryListMain();
    //   this.getProfileAppListMain();
    //   this.getProfileWebListMain();
    //   this.getDnsMain();
    //   this.getiCloudMain();
    // }
    // if (!this.isSmbOnboarded && this.softwareVrsion <= 23.2) {
    //   this.profiledRestriction = false;
    //   this.getYoutubeRestrictionStatusMain();
    //   this.getProfileSafeSearchStatusMain();
    //   this.getProfileCategoryListMain();
    //   this.getProfileAppListMain();
    //   this.getProfileWebListMain();
    //   this.getDnsMain();
    //   this.getiCloudMain();
    // }

  }

  getProfileCategoryListMain() {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    this.experianceIQService.getAllCategory(this.userId).subscribe((res: CategoriesModel) => {
      this.categoriesList = res;
      this.selectedContentFilter = res.selectedGroup;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  // onSelectStartTime(event: Date) {

  // }

  updateYoutubeRestrictionStatus() {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    let body: SafeSearchModel = new SafeSearchModel();
    body.userId = this.userId;
    body.profileId = this.selectedProfile.profileId;
    body.enable = this.youtubeRestrictionStatus;
    this.experianceIQService.updateYotubeRestrictionStatus(body).subscribe(res => {
      this.loading = false;
      this.getYoutubeRestrictionStatus();
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = err.error.errorDesc;
      this.youtubeRestrictionStatus = !this.youtubeRestrictionStatus;
      this.showError = true;
    })
  }

  updateYoutubeRestrictionStatusMain() {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    const body = {
      userId: this.userId,
      enable: this.youtubeRestrictionStatus
    };
    this.experianceIQService.updateYotubeRestrictionStatusMain(body).subscribe(res => {
      this.loading = false;
      this.getYoutubeRestrictionStatusMain();
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = err.error.errorDesc;
      this.youtubeRestrictionStatus = !this.youtubeRestrictionStatus;
      this.showError = true;
    })
  }

  updateSafeSearchStatus() {

    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    let body: SafeSearchModel = new SafeSearchModel();
    body.userId = this.userId;
    body.profileId = this.selectedProfile.profileId;
    body.enable = this.safeSearchStatus;
    this.experianceIQService.updateSafeSearchStatus(body).subscribe(res => {
      this.loading = false;
      this.getProfileSafeSearchStatus();
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.safeSearchStatus = !this.safeSearchStatus
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  updateSafeSearchStatusMain() {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    const body = {
      userId: this.userId,
      enable: this.safeSearchStatus
    };
    this.experianceIQService.updateSafeSearchStatusMain(body).subscribe(res => {
      this.loading = false;
      this.getProfileSafeSearchStatusMain();
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.safeSearchStatus = !this.safeSearchStatus
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  onCatergoryChange(category) {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    let body: EditAppModel = new EditAppModel();
    body.userId = this.userId;
    body.block = category.blocked;
    body.id = category.cid;
    body.profileId = this.selectedProfile.profileId;
    cleanObject(body);
    this.experianceIQService.editCategoyByProfileId(body).subscribe(res => {
      this.loading = false;
      this.getProfileCategoryList();
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  onCatergoryChangeMain(category) {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    let body: EditAppModel = new EditAppModel();
    body.userId = this.userId;
    body.block = category.blocked;
    body.id = category.cid;
    cleanObject(body);
    this.experianceIQService.editCategoyMain(body).subscribe(res => {
      this.loading = false;
      this.getProfileCategoryListMain();
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
      category.blocked = !category.blocked;
    })
  }

  getProfileAppList() {
    this.showSuccess = false;
    this.showError = false;
    this.selectedApps.apps = this.selectedApps.apps.filter(x => x.id);
    this.allowForChecked = [];
    this.customTimeUsage = [];
    this.experianceIQService.getAppListByProfileId(this.selectedProfile.profileId, this.userId).subscribe((res: SearchAppModel) => {
      this.selectedApps = res;
      this.selectedApps.apps.forEach((x, i) => {
        this.bisabledAllowForButton.push(false);
        if (x.blocked == false && x.timeUsage != '00:00') {
          let splitedTime = x.timeUsage.split(":");
          let date = new Date();
          date.setHours(+splitedTime[0]);
          date.setMinutes(+splitedTime[1]);
          this.customTimeUsage[i] = date;
          this.allowForChecked.push("selected");
          x.blocked = null;
        } else {
          let splitedTime = x.timeUsage.split(":");
          let date = new Date();
          if (splitedTime[0] == '00' && splitedTime[1] == '00') {
            date.setHours(1);
            date.setMinutes(+splitedTime[1]);
          }
          this.customTimeUsage[i] = date;
          this.allowForChecked.push("disSelected")
        }
      })
    }, (err: HttpErrorResponse) => {
      if (err.status != 404) {
        this.errorMsg = err.error.errorDesc;
        (this.scopeFlag.configWrite) ? this.showError = true : '';
      }
      if (err.status == 404) {
        this.selectedApps.apps = [];
      }
    })
  }

  getProfileWebList() {
    this.showSuccess = false;
    this.showError = false;
    this.experianceIQService.getProfileWebUrl(this.selectedProfile.profileId, this.userId).subscribe((res: profileWebUrl) => {
      this.webList = res;
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  getProfileAppListMain() {
    this.showSuccess = false;
    this.showError = false;
    this.selectedApps.apps = this.selectedApps.apps.filter(x => x.id);
    this.allowForChecked = [];
    this.customTimeUsage = [];
    this.experianceIQService.getAppListMain(this.userId).subscribe((res: SearchAppModel) => {
      this.selectedApps = res;
      this.selectedApps.apps.forEach((x, i) => {
        this.bisabledAllowForButtonMain.push(false);
        if (x.blocked == false && x.timeUsage != '00:00') {
          let splitedTime = x.timeUsage.split(":");
          let date = new Date();
          date.setHours(+splitedTime[0]);
          date.setMinutes(+splitedTime[1]);
          this.customTimeUsage[i] = date;
          this.allowForChecked.push("selected");
          x.blocked = null;
        } else {
          let splitedTime = x.timeUsage.split(":");
          let date = new Date();
          if (splitedTime[0] == '00' && splitedTime[1] == '00') {
            date.setHours(1);
            date.setMinutes(+splitedTime[1]);
          }
          this.customTimeUsage[i] = date;
          this.allowForChecked.push("disSelected")
        }
      })
    }, (err: HttpErrorResponse) => {
      if (err.status != 404) {
        this.errorMsg = err.error.errorDesc;
        (this.scopeFlag.configWrite) ? this.showError = true : '';
      }
      if (err.status == 404) {
        this.selectedApps.apps = [];
      }
    })
  }

  getProfileWebListMain() {
    this.showSuccess = false;
    this.showError = false;
    this.experianceIQService.getProfileWebUrlMain(this.userId).subscribe((res: profileWebUrl) => {
      this.webList = res;
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  getProfileCategoryList() {
    this.showSuccess = false;
    this.showError = false;
    this.experianceIQService.getAllCategoryByProfileId(this.selectedProfile.profileId, this.userId).subscribe((res: CategoriesModel) => {
      this.categoriesList = res;
      this.selectedContentFilter = res.selectedGroup;
    })
  }

  getProfileSafeSearchStatus() {
    this.showSuccess = false;
    this.showError = false;
    this.experianceIQService.getSafeSearchStatus(this.selectedProfile.profileId, this.userId).subscribe(res => {
      this.safeSearchStatus = res.enable
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  getProfileSafeSearchStatusMain() {
    this.showSuccess = false;
    this.showError = false;
    this.experianceIQService.getSafeSearchStatusMain(this.userId).subscribe(res => {
      this.safeSearchStatus = res.enable
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  getYoutubeRestrictionStatus() {
    this.showSuccess = false;
    this.showError = false;
    this.experianceIQService.getYotubeRestrictionStatus(this.selectedProfile.profileId, this.userId).subscribe(res => {
      this.youtubeRestrictionStatus = res.enable
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  getYoutubeRestrictionStatusMain() {
    this.showSuccess = false;
    this.showError = false;
    this.experianceIQService.getYotubeRestrictionStatusMain(this.userId).subscribe(res => {
      this.youtubeRestrictionStatus = res.enable
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  getRestrictionFeatureList() {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    this.experianceIQService.getFeatureList(this.userId).subscribe((feature: FeatureList) => {
      this.youtubeRestrictionFeature = feature.youtubeRestriction;
      this.safeSearchFeature = feature.safeSearch;
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      (this.scopeFlag.configWrite) ? this.showError = true : '';
      this.loading = false;
    })
  }

  getDns() {
    this.showSuccess = false;
    this.showError = false;
    this.experianceIQService.getDns(this.userId, this.selectedProfile.profileId).subscribe((res: any) => {
      this.dnsStatus = res.enable;
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
      this.dnsStatus = false;
    })
  }

  updateDnsStatus() {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    const body = {
      userId: this.userId,
      enable: this.dnsStatus,
      profileId: this.selectedProfile.profileId
    };
    this.experianceIQService.setDns(body).subscribe((res: any) => {
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
      this.dnsStatus = !this.dnsStatus;
      this.loading = false;
    })
  }

  getDnsMain() {
    this.showSuccess = false;
    this.showError = false;
    this.experianceIQService.getDnsMain(this.userId).subscribe((res: any) => {
      this.dnsStatus = res.enable;
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
      this.dnsStatus = false;
    })
  }

  updateDnsStatusMain() {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    const body = {
      userId: this.userId,
      enable: this.dnsStatus
    };
    this.experianceIQService.setDnsMain(body).subscribe((res: any) => {
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
      this.dnsStatus = !this.dnsStatus;
      this.loading = false;
    })
  }

  getiCloud() {
    this.showSuccess = false;
    this.showError = false;
    this.experianceIQService.getICloud(this.userId, this.selectedProfile.profileId).subscribe((res: any) => {
      this.icloudStatus = res.enable;
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
      this.icloudStatus = false;
    })
  }

  updateiCloudStatus() {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    const body = {
      userId: this.userId,
      enable: this.icloudStatus,
      profileId: this.selectedProfile.profileId
    };
    this.experianceIQService.setICloud(body).subscribe((res: any) => {
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
      this.icloudStatus = !this.icloudStatus;
      this.loading = false;
    })
  }

  getiCloudMain() {
    this.showSuccess = false;
    this.showError = false;
    this.experianceIQService.getICloudMain(this.userId).subscribe((res: any) => {
      this.icloudStatus = res.enable;
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
      this.icloudStatus = false;
    })
  }

  updateiCloudMain() {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    const body = {
      userId: this.userId,
      enable: this.icloudStatus
    };
    this.experianceIQService.setICloudMain(body).subscribe((res: any) => {
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
      this.icloudStatus = !this.icloudStatus;
      this.loading = false;
    })
  }

  addWebsite() {
    this.gloObj.isValidWebsite = this.ssoService.validateUrl(this.websiteModel) || this.ssoService.matchDomainAlone(this.websiteModel);
    this.gloObj.urlExist = (this.webList?.webs || []).filter(obj => obj.webUrl == this.websiteModel)?.length;
    if (!this.gloObj.isValidWebsite || this.gloObj.urlExist) return;
    this.showSuccess = false;
    this.showError = false;
    let body: WebAddressProfile = new WebAddressProfile();
    body.userId = this.userId;
    body.profileId = this.selectedProfile.profileId;
    body.webUrl = this.websiteModel;
    this.experianceIQService.addWebAddressProfile(body).subscribe(res => {
      this.addWebsiteToggle = true;
      this.websiteModel = "";
      this.getProfileWebList();
    }, (err: HttpErrorResponse) => {
      this.addWebsiteToggle = true;
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  addWebsiteMain() {
    this.showSuccess = false;
    this.showError = false;
    this.gloObj.isValidWebsite = this.ssoService.validateUrl(this.websiteModel) || this.ssoService.matchDomainAlone(this.websiteModel);
    this.gloObj.urlExist = (this.webList?.webs || []).filter(obj => obj.webUrl == this.websiteModel)?.length;
    if (!this.gloObj.isValidWebsite || this.gloObj.urlExist) return;
    const body = {
      userId: this.userId,
      webUrl: this.websiteModel
    };
    this.experianceIQService.addWebAddressMain(body).subscribe(res => {
      this.addWebsiteToggle = true;
      this.websiteModel = "";
      this.getProfileWebListMain();
    }, (err: HttpErrorResponse) => {
      this.addWebsiteToggle = true;
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  removeWebsite(id: string) {
    this.showSuccess = false;
    this.showError = false;
    this.experianceIQService.removeWebUrl(this.selectedProfile.profileId, id, this.userId).subscribe(res => {
      this.getProfileWebList();
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  removeWebsiteMain(id: string) {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    this.experianceIQService.removeWebUrlMain(id, this.userId).subscribe(res => {
      this.loading = false;
      this.getProfileWebListMain();
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
      this.pageErrorHandle(err);
    })
  }

  updateWebUrl(web: WebAddressProfile) {
    this.showSuccess = false;
    this.showError = false;
    web.userId = this.userId;
    web.profileId = this.selectedProfile.profileId;
    web.block = web.blocked;
    this.experianceIQService.updateWebAddressProfile(web).subscribe(res => {
      this.getProfileWebList();
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  updateWebUrlMain(web) {
    this.showSuccess = false;
    this.showError = false;
    web.userId = this.userId;
    web.block = web.blocked;
    this.experianceIQService.updateWebAddressMain(web).subscribe(res => {
      this.getProfileWebListMain();
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  updateApp(app: EditAppModel, index: number) {
    this.showSuccess = false;
    this.showError = false;
    this.allowForChecked[index] = "disSelected";
    app.userId = this.userId;
    app.profileId = this.selectedProfile.profileId;
    app.block = app.blocked;
    if (!app.block && app.duration != '00:00') {
      app.duration = '00:00'
    }
    delete app["timeUsage"];
    this.experianceIQService.editAppByProfileId(app).subscribe(res => {
      this.getProfileAppList();
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  updateAppMain(app, index: number) {
    this.showSuccess = false;
    this.showError = false;
    this.allowForChecked[index] = "disSelected";
    app.userId = this.userId;
    app.block = app.blocked;
    if (!app.block && app.duration != '00:00') {
      app.duration = '00:00'
    }
    delete app["timeUsage"];
    this.experianceIQService.editAppMain(app).subscribe(res => {
      this.getProfileAppListMain();
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  updateAllowForApp(app: EditAppModel, index: number) {
    this.showSuccess = false;
    this.showError = false;
    this.allowForChecked[index] = 'selected';
    let timeUsage = this.customTimeUsage[index];
    if (this.customTimeUsage) {
      let hours = timeUsage.getHours().toString()?.length == 1 ? '0' + timeUsage.getHours().toString() : timeUsage.getHours().toString()
      let minutes = timeUsage.getMinutes().toString()?.length == 1 ? '0' + timeUsage.getMinutes().toString() : timeUsage.getMinutes().toString()
      let timeStr = hours + ":" + minutes;
      if (timeStr == "00:00") {
        timeStr = "01:00"
      }
      app.duration = timeStr
      app.block = false;
      app.profileId = this.selectedProfile.profileId;
      app.userId = this.userId;
      delete app["timeUsage"];
      this.experianceIQService.editAppByProfileId(app).subscribe(res => {
        this.getProfileAppList();
      }, (err: HttpErrorResponse) => {
        this.errorMsg = err.error.errorDesc;
        this.showError = true;
      })
    }
  }

  updateAllowForAppMain(app, index: number) {
    this.showSuccess = false;
    this.showError = false;
    this.allowForChecked[index] = 'selected';
    let timeUsage = this.customTimeUsage[index];
    if (this.customTimeUsage) {
      let hours = timeUsage.getHours().toString()?.length == 1 ? '0' + timeUsage.getHours().toString() : timeUsage.getHours().toString()
      let minutes = timeUsage.getMinutes().toString()?.length == 1 ? '0' + timeUsage.getMinutes().toString() : timeUsage.getMinutes().toString()
      let timeStr = hours + ":" + minutes;
      if (timeStr == "00:00") {
        timeStr = "01:00"
      }
      app.duration = timeStr
      app.block = false;
      app.userId = this.userId;
      delete app["timeUsage"];
      this.experianceIQService.editAppMain(app).subscribe(res => {
        this.getProfileAppListMain();
      }, (err: HttpErrorResponse) => {
        this.errorMsg = err.error.errorDesc;
        this.showError = true;
      })
    }
  }

  updateAllowForWebMain(app, index: number) {
    this.showSuccess = false;
    this.showError = false;
    this.allowForChecked[index] = 'selected';
    let timeUsage = this.customTimeUsage[index];
    if (this.customTimeUsage) {
      let hours = timeUsage.getHours().toString()?.length == 1 ? '0' + timeUsage.getHours().toString() : timeUsage.getHours().toString()
      let minutes = timeUsage.getMinutes().toString()?.length == 1 ? '0' + timeUsage.getMinutes().toString() : timeUsage.getMinutes().toString()
      let timeStr = hours + ":" + minutes;
      if (timeStr == "00:00") {
        timeStr = "01:00"
      }
      app.duration = timeStr
      app.block = false;
      app.userId = this.userId;
      this.experianceIQService.setWebAddressMain(app).subscribe(res => {
        this.getProfileWebListMain();
      }, (err: HttpErrorResponse) => {
        this.errorMsg = err.error.errorDesc;
        this.showError = true;
      })
    }
  }

  closeDatePicker(app: EditAppModel, index: number) {
    this.datePicker.overlayVisible = false;
    this.datePicker.datepickerClick = false;
    this.customTimeUsage[index].setHours(this.previousTimeEvent.getHours())
    this.customTimeUsage[index].setMinutes(this.previousTimeEvent.getMinutes())
    let timeUsage = this.customTimeUsage[index];
    if (this.customTimeUsage) {
      let hours = timeUsage.getHours().toString()?.length == 1 ? '0' + timeUsage.getHours().toString() : timeUsage.getHours().toString()
      let minutes = timeUsage.getMinutes().toString()?.length == 1 ? '0' + timeUsage.getMinutes().toString() : timeUsage.getMinutes().toString()
      let timeStr = hours + ":" + minutes;
      if (timeStr == "00:00") {
        timeStr = "01:00"
      }
      app.duration = timeStr
      app.block = false;
      app.profileId = this.selectedProfile.profileId;
      app.userId = this.userId;
      this.experianceIQService.editAppByProfileId(app).subscribe(res => {
        this.bisabledAllowForButton[index] = false;
        this.getProfileAppList();
      }, (err: HttpErrorResponse) => {
        this.errorMsg = err.error.errorDesc;
        this.showError = true;
      })
    }
  }

  closeDatePickerMain(app, index: number) {
    this.datePicker.overlayVisible = false;
    this.datePicker.datepickerClick = false;
    this.customTimeUsage[index].setHours(this.previousTimeEvent.getHours())
    this.customTimeUsage[index].setMinutes(this.previousTimeEvent.getMinutes())

    let timeUsage = this.customTimeUsage[index];
    if (this.customTimeUsage) {
      let hours = timeUsage.getHours().toString()?.length == 1 ? '0' + timeUsage.getHours().toString() : timeUsage.getHours().toString()
      let minutes = timeUsage.getMinutes().toString()?.length == 1 ? '0' + timeUsage.getMinutes().toString() : timeUsage.getMinutes().toString()
      let timeStr = hours + ":" + minutes;
      if (timeStr == "00:00") {
        timeStr = "01:00"
      }
      app.duration = timeStr
      app.block = false;
      app.userId = this.userId;
      this.experianceIQService.editAppMain(app).subscribe(res => {
        this.bisabledAllowForButtonMain[index] = false;
        this.getProfileAppListMain();
      }, (err: HttpErrorResponse) => {
        this.errorMsg = err.error.errorDesc;
        this.showError = true;
      })
    }
  }

  updateAllowForChecked(app, i, event) {
    this.selectedApps.apps[i].blocked = null;
    this.allowForChecked[i] = event.target.value;
    this.updateAllowForApp(app, i);
  }

  updateAllowForCheckedMain(app, i, event) {
    this.selectedApps.apps[i].blocked = null;
    this.allowForChecked[i] = event.target.value;
    this.updateAllowForAppMain(app, i);
  }

  deviceClicked() {
    this.showError = false;
    this.showSuccess = false;
  }
  setDayLimit(status, day) {
    this.showSuccess = false;
    this.showError = false;
    let body: EditBedTimeModel = new EditBedTimeModel();
    body.userId = this.userId;
    body.profileId = this.selectedProfile.profileId;
    body.bedTime = status;
    body.bedTime.day = day;
    this.experianceIQService.editBedTimeProfile(body).subscribe((data: any) => {
      this.fetchTimeLimitsData();
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }
  setWholeDayLimit(dayValue) {
    this.showSuccess = false;
    this.showError = false;
    let body: BedTimeAllDay = new BedTimeAllDay();
    body.day = dayValue.day;
    body.enable = dayValue.allEnabled
    body.profileId = this.selectedProfile.profileId;
    body.userId = this.userId;
    this.experianceIQService.updateBedTimeByDay(body).subscribe(res => {
      this.fetchTimeLimitsData();
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  editSpecificDay(content, status, day) {
    this.showSuccess = false;
    this.showError = false;
    let body: EditBedTimeModel = new EditBedTimeModel();
    body.userId = this.userId;
    body.profileId = this.selectedProfile.profileId;
    body.bedTime = status;
    body.bedTime.day = day;
    this.editTimeLimitData = body;
    this.editStartTimeValue.setHours(+body.bedTime.startTime.slice(0, 2));
    this.editStartTimeValue.setMinutes(+body.bedTime.startTime.slice(2));
    this.editEndTimeValue.setHours(+body.bedTime.endTime.slice(0, 2));
    this.editEndTimeValue.setMinutes(+body.bedTime.endTime.slice(2));
    let ngbOptions =
      { ariaLabelledBy: 'modal-edit-title', centered: true, windowClass: 'custom-sm-modal' }
    this.modalService.open(content, ngbOptions).result.then((result) => {
    }, (reason) => {
    })
  }

  confirmEditModal() {
    this.showSuccess = false;
    this.showError = false;
    this.closeModal()
    let startHours = this.editStartTimeValue.getHours().toString()?.length == 1 ? '0' + this.editStartTimeValue.getHours().toString() : this.editStartTimeValue.getHours().toString()
    let startMinutes = this.editStartTimeValue.getMinutes().toString()?.length == 1 ? '0' + this.editStartTimeValue.getMinutes().toString() : this.editStartTimeValue.getMinutes().toString()
    let startTimeStr = startHours + startMinutes;
    let endHours = this.editEndTimeValue.getHours().toString()?.length == 1 ? '0' + this.editEndTimeValue.getHours().toString() : this.editEndTimeValue.getHours().toString()
    let endMinutes = this.editEndTimeValue.getMinutes().toString()?.length == 1 ? '0' + this.editEndTimeValue.getMinutes().toString() : this.editEndTimeValue.getMinutes().toString()
    let endTimeStr = endHours + endMinutes;
    this.editTimeLimitData.bedTime.startTime = startTimeStr
    this.editTimeLimitData.bedTime.endTime = endTimeStr
    this.editTimeLimitData.bedTime.enable = true;
    this.experianceIQService.editBedTimeProfile(this.editTimeLimitData).subscribe((data: any) => {
      this.fetchTimeLimitsData();
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  fetchUsageData() {
    this.showSuccess = false;
    this.showError = false;
    this.profileUsage = new UsageModel();
    this.getProfileUsage(UsageEnum.DAY)
  }

  getProfileUsage(type: UsageEnum) {
    this.showSuccess = false;
    this.showError = false;
    this.experianceIQService.getUserProfileSummary(this.selectedProfile.profileId, this.userId, type).subscribe(res => {
      this.profileUsage = res;
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }
  checkSameTimeExists(list: BedtimeModel) {
    if (list.days?.length < 7) {
      return false;
    } else if (list.days?.length == 7) {
      for (let i = 0; i < list.days?.length; i++) {
        if (list.days[i] && list.days[i].bedTime?.length > 1) {
          return false;
        } else if (list.days[i + 1] && list.days[i + 1]) {
          if (((list.days[i] && list.days[i].bedTime[0].endTime) !== list.days[i + 1].bedTime[0].endTime) ||
            ((list.days[i] && list.days[i].bedTime[0].startTime) !== list.days[i + 1].bedTime[0].startTime)) {
            return false;
          }
        }
      }
    } else {
      return false;
    }
    return true;
  }

  fetchTimeLimitsData() {
    this.showSuccess = false;
    this.showError = false;
    this.experianceIQService.getBedTimeByProfileId(this.selectedProfile.profileId, this.userId).subscribe((res: BedtimeModel) => {
      this.timelimitsList = res;
      if (res && res.days) {
        let data: Days[] = [];
        res.days.forEach((daydata: Days) => {
          data[daydata.day] = daydata
        });
        this.timelimitsList.days = data;
      }
      if (this.timelimitsList.type) {
        this.everydayStartTime = null;
        this.everydayEndTime = null;
        this.customeTimeLimit = 'none';
        this.everydayEnabled = false;
        this.checkSameTime = false;
      } else {
        this.everydayEnabled = this.timelimitsList.allEnable
        if (this.timelimitsList.days &&
          this.timelimitsList.days[0] &&
          this.timelimitsList.days[0].bedTime[0]) {
          let startDate: Date = new Date();
          let endDate: Date = new Date();
          startDate.setHours(+this.timelimitsList.days[0].bedTime[0].startTime.slice(0, 2));
          startDate.setMinutes(+this.timelimitsList.days[0].bedTime[0].startTime.slice(2));
          endDate.setHours(+this.timelimitsList.days[0].bedTime[0].endTime.slice(0, 2));
          endDate.setMinutes(+this.timelimitsList.days[0].bedTime[0].endTime.slice(2));
          this.everydayStartTime = startDate;
          this.everydayEndTime = endDate;
        }
        this.checkSameTime = this.checkSameTimeExists(this.timelimitsList)
        if (this.timelimitsList.allEnable && this.checkForCustomTimeEnabled(this.timelimitsList)) {
          this.customeTimeLimit = "everyday"
        } else if (this.checkForCustomTimeEnabled(this.timelimitsList)) {
          this.customeTimeLimit = 'custom'
          this.everydayStartTime = null;
          this.everydayEndTime = null;
        } else {
          this.customeTimeLimit = 'none'
          this.everydayStartTime = null;
          this.everydayEndTime = null;
        }
      }
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }
  checkForCustomTimeEnabled(timelimitsList: BedtimeModel) {
    for (let i = 0; i < timelimitsList.days?.length; i++) {
      if (timelimitsList.days[i] && timelimitsList.days[i].allEnabled) {
        return true;
      }
    }
    return false;
  }
  fetchWeekUsageData() {
    this.showSuccess = false;
    this.showError = false;
    this.profileUsage = new UsageModel();
    this.getProfileUsage(UsageEnum.WEEK)
  }
  fetchMonthUsageData() {
    this.showSuccess = false;
    this.showError = false;
    this.profileUsage = new UsageModel();
    this.getProfileUsage(UsageEnum.MONTH)
  }

  setEveryDayLimit() {
    this.showSuccess = false;
    this.showError = false;
    let body: BedTimeAllDay = new BedTimeAllDay();
    body.userId = this.userId;
    body.profileId = this.selectedProfile.profileId
    body.enable = this.everydayEnabled
    this.experianceIQService.setEnableBedtimeAllDay(body).subscribe(res => {
      this.fetchTimeLimitsData();
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }
  editEveryDay(content) {
    this.showSuccess = false;
    this.showError = false;
    this.everyDayEndTmeValue = this.everydayEndTime
    this.everyDayStartTimeValue = this.everydayStartTime;
    let ngbOptions =
      { ariaLabelledBy: 'modal-basic-title', centered: true, windowClass: 'custom-sm-modal' }
    this.modalService.open(content, ngbOptions)
  }
  onblurWebsite() {
    this.websiteModel = "";
    this.addWebsiteToggle = !this.addWebsiteToggle;
  }
  onSubmitTimeLimit() {
    this.showSuccess = false;
    this.showError = false;
    let startHours = this.startTimeValue.getHours().toString()?.length == 1 ? '0' + this.startTimeValue.getHours().toString() : this.startTimeValue.getHours().toString()
    let startMinutes = this.startTimeValue.getMinutes().toString()?.length == 1 ? '0' + this.startTimeValue.getMinutes().toString() : this.startTimeValue.getMinutes().toString()
    let startTimeStr = startHours + startMinutes;
    let endHours = this.endTimeValue.getHours().toString()?.length == 1 ? '0' + this.endTimeValue.getHours().toString() : this.endTimeValue.getHours().toString()
    let endMinutes = this.endTimeValue.getMinutes().toString()?.length == 1 ? '0' + this.endTimeValue.getMinutes().toString() : this.endTimeValue.getMinutes().toString()
    let endTimeStr = endHours + endMinutes;
    let requestDetails: EditBedTimeModel = new EditBedTimeModel();
    requestDetails.profileId = this.selectedProfile.profileId;
    requestDetails.userId = this.userId;
    requestDetails.bedTime.endTime = endTimeStr;
    requestDetails.bedTime.startTime = startTimeStr;
    this.experianceIQService.updateAllProfileBedTime(requestDetails).subscribe((data: any) => {
      this.checkTimeLimit = true;
      this.fetchTimeLimitsData();

    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    });

  }

  onSubmitIndividualTimeLimit() {
    this.showSuccess = false;
    this.showError = false;
    let startHours = this.startTimeValue.getHours().toString()?.length == 1 ? '0' + this.startTimeValue.getHours().toString() : this.startTimeValue.getHours().toString()
    let startMinutes = this.startTimeValue.getMinutes().toString()?.length == 1 ? '0' + this.startTimeValue.getMinutes().toString() : this.startTimeValue.getMinutes().toString()
    let startTimeStr = startHours + startMinutes;
    let endHours = this.endTimeValue.getHours().toString()?.length == 1 ? '0' + this.endTimeValue.getHours().toString() : this.endTimeValue.getHours().toString()
    let endMinutes = this.endTimeValue.getMinutes().toString()?.length == 1 ? '0' + this.endTimeValue.getMinutes().toString() : this.endTimeValue.getMinutes().toString()
    let endTimeStr = endHours + endMinutes;
    let requestDetails: EditBedTimeModel = new EditBedTimeModel();
    requestDetails.profileId = this.selectedProfile.profileId;
    requestDetails.userId = this.userId;
    requestDetails.bedTime.day = this.selectedDay
    requestDetails.bedTime.enable = this.currentSelectedDayEnableStatus
    requestDetails.bedTime.endTime = endTimeStr;
    requestDetails.bedTime.startTime = startTimeStr;
    requestDetails.bedTime.idx = this.currentSelectedDateIndex;
    this.experianceIQService.editBedTimeProfile(requestDetails).subscribe((data: any) => {

      this.fetchTimeLimitsData();
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  submitEveryDay() {
    this.closeModal();
    this.showSuccess = false;
    this.showError = false;
    let startHours = this.everyDayStartTimeValue.getHours().toString()?.length == 1 ? '0' + this.everyDayStartTimeValue.getHours().toString() : this.everyDayStartTimeValue.getHours().toString()
    let startMinutes = this.everyDayStartTimeValue.getMinutes().toString()?.length == 1 ? '0' + this.everyDayStartTimeValue.getMinutes().toString() : this.everyDayStartTimeValue.getMinutes().toString()
    let startTimeStr = startHours + startMinutes;
    let endHours = this.everyDayEndTmeValue.getHours().toString()?.length == 1 ? '0' + this.everyDayEndTmeValue.getHours().toString() : this.everyDayEndTmeValue.getHours().toString()
    let endMinutes = this.everyDayEndTmeValue.getMinutes().toString()?.length == 1 ? '0' + this.everyDayEndTmeValue.getMinutes().toString() : this.everyDayEndTmeValue.getMinutes().toString()
    let endTimeStr = endHours + endMinutes;
    let body: EditBedTimeModel = new EditBedTimeModel();
    body.userId = this.userId;
    body.profileId = this.selectedProfile.profileId;
    body.bedTime.startTime = startTimeStr;
    body.bedTime.endTime = endTimeStr;
    this.experianceIQService.updateAllProfileBedTime(body).subscribe(res => {
      this.fetchTimeLimitsData();
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  removeProfileDayTime(idx, id) {
    this.showSuccess = false;
    this.showError = false;
    this.experianceIQService.deleteBedTImeByProfileId(this.userId, this.selectedProfile.profileId, id, idx).subscribe(res => {
      this.fetchTimeLimitsData();
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }

  removeProfileWholeDayLimit(days) {
    let profileId = this.selectedProfile.profileId
    this.experianceIQService.deleteProfileBedTimeByDayId(profileId, days, this.userId).subscribe(res => {
      this.fetchTimeLimitsData();
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    });
  }

  typeaheadbasickeyup($event) {
    this.gloObj.restAppExist = false

    if (this.model == '') {
      this.isError = false
    }
  }

  channelchangesModalOpen(value) {

    if (value == 'new') {
      this.chanelChangesModelTitle = this.language['Add_Traffic_Priority_Schedule'];
      this.ModelButton = this.language['Save_Schedule'];
      this.TrafficPrioritiesEdit = false;
      this.editStartTimeValue = new Date();
      const startValueCopy = new Date();
      this.editEndTimeValue = new Date(startValueCopy.setMinutes(startValueCopy.getMinutes() + 1));

      if (!this.addSheduleBtnDisabled) {
        if (this.chanelChangesModelTitle.includes('Add')) {
          this.resetPriorityModalValues();
        }
        this.dialogService.open(this.channelchangesModal, { size: 'lg', centered: true, windowClass: 'custom-mid-modal' });
      }
    }
    else {
      this.chanelChangesModelTitle = this.language['Edit Traffic Priority Schedule'];
      this.ModelButton = this.language['Update_Schedule'];
      this.TrafficPrioritiesEdit = true;
      this.dialogService.open(this.channelchangesModal, { size: 'lg', centered: true, windowClass: 'custom-mid-modal' });
    }

    //this.dialogService.open(this.channelchangesModal, { size: 'lg', centered: true, windowClass: 'custom-mid-modal' });


  }


  addDevicePrioritiesModalOpen(flag = false) {
    this.isdevError = false;
    this.warningMessage = '';
    this.selectedDevices = [];
    this.selectedDevice.forEach(obj => {
      this.selectedDevices.push(obj);
    })
    if (!flag) {
      this.dialogService.open(this.addDevicePrioritiesModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
    } else {
      this.AddDevice(true)
    }
  }

  PrioritiesModalOpen() {
    this.profile = [...this.defaultProfile];
    this.dialogService.open(this.PrioritiesModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
  }

  pageErrorHandle(err, disableDefault = false) {
    /* if(err.status == 400){
      this.alertMessage = this.language.Bad_Request;
    }if(err.status == 498){
      this.alertMessage = this.language.token_invalid;
    }if(err.status == 499){
      this.alertMessage = this.language['need a token']
    }if(err.status == 500){
      this.alertMessage = this.language.Microservice_issues;
    } */
    disableDefault ? (this.isError = false) : (this.isError = true);
    if (err.status === 401) {
      this.errorMsg = this.warningMessage = this.language['Access Denied'];
    } else {
      this.errorMsg = this.warningMessage = this.ssoService.pageErrorHandle(err);
    }

  }
  iconimage(type, status) {

    let type1 = parseInt(type);
    let image;
    switch (type1) {
      case 0: return image = status == 'offline' ? './assets/images/deviceicons/question_mark_grey_icon.png' : './assets/images/deviceicons/question_mark_blue_icon.png';
      case 1: {
        return image = status == 'offline' ? './assets/images/deviceicons/phone_grey_icon.png' : './assets/images/deviceicons/phone_blue_icon.png';
      }
      case 2: {
        return image = status == 'offline' ? './assets/images/deviceicons/computer_grey_icon.png' : './assets/images/deviceicons/computer_blue_icon.png';
      }
      case 3: {
        return image = status == 'offline' ? './assets/images/deviceicons/console_grey_icon.png' : './assets/images/deviceicons/console_blue_icon.png';
      }
      case 4: {
        return image = status == 'offline' ? './assets/images/deviceicons/media_player_grey_icon.png' : './assets/images/deviceicons/media_player_blue_icon.png';
      }
      case 5: {
        return image = status == 'offline' ? './assets/images/deviceicons/printer_grey_icon.png' : './assets/images/deviceicons/printer_blue_icon.png';
      }
      case 6: {
        return image = status == 'offline' ? './assets/images/deviceicons/television_grey_icon.png' : './assets/images/deviceicons/television_blue_icon.png';
      }
      case 7: {
        return image = status == 'offline' ? './assets/images/deviceicons/network_icon_grey.png' : './assets/images/deviceicons/network_blue_icon.png';
      }
      case 8: {
        return image = status == 'offline' ? './assets/images/deviceicons/camera_grey_icon.png' : './assets/images/deviceicons/camera_blue_icon.png';
      }
      case 9: {
        return image = status == 'offline' ? './assets/images/deviceicons/tablet_grey_icon.png' : './assets/images/deviceicons/tablet_blue_icon.png';
      }
      case 10: {
        return image = status == 'offline' ? './assets/images/deviceicons/voip_grey.png' : './assets/images/deviceicons/voip_blue.png';
      } case 11: {
        return image = status == 'offline' ? './assets/images/deviceicons/iot_grey.png' : './assets/images/deviceicons/iot_blue.png';
      }
      case 30: {
        return image = status == 'offline' ? './assets/images/deviceicons/ic_modem-24px.svg' : './assets/images/deviceicons/ic_modem_grey.png';
      }
      default:
        {
          return image = status == 'offline' ? './assets/images/deviceicons/question_mark_grey_icon.png' : './assets/images/deviceicons/question_mark_blue_icon.png';

        }

    }

  }
  durationchange(event) {
    //console.log('2375',  this.getTime(new Date(this.deviceDuration)) +'---'+  this.getTime(new Date(event)));
    if (this.getTime(new Date(event)) == 0) {
      let d = new Date();
      d.setHours(1);
      d.setMinutes(0);
      this.durationTimeValue = d;
    }
    this.deviceSave = false;
  }
  setEndTimeEvent(type = 'set') {
    if (this.editStartTimeValue) {
      const startTimeCopy = new Date(this.editStartTimeValue);
      let stopTime = new Date(startTimeCopy.setMinutes(startTimeCopy.getMinutes() + 1));
      if (type == 'get') {
        return stopTime;
      }
      this.editEndTimeValue = stopTime;
    }
  }

  scheduleTimeValidation() {
    if (this.getTime(this.editStartTimeValue) >= this.getTime(this.editEndTimeValue)) {
      this.scheduledTimeError = true;
    } else {
      this.scheduledTimeError = false;
    }
  }
  isWfhAvailable(isRefreshed = false) {
    this.loading = true;
    this.dataService.fetchMetaDatavaluesNew(this.orgId, this.deviceData[0].serialNumber, isRefreshed).subscribe((res: any) => {
      this.loading = false;
      let secondarySsids = res["secondary-ssid"];
      if (secondarySsids?.length > 0) {
        res["secondary-ssid"].forEach((el: any, index) => {
          if (el.type == 2) {
            this.isWFHAvailable = true;

          }
        })
      }


    });
  }

  changeCustomTime() {
    const [startTime, endTime] = [this.startTimeValue.getDate(), this.endTimeValue.getDate()]
    this.startTimeValue.setHours(24);
    this.startTimeValue.setMinutes(0, 0);
    this.startTimeValue.setDate(startTime);

    this.endTimeValue.setHours(12);
    this.endTimeValue.setMinutes(0, 0);
    this.endTimeValue.setDate(endTime);
  }

  setDeleteWebApp(path, id, mainResDel = true) {
    this.gloObj.deleteRestrictionPath = path;
    this.gloObj.delResId = id;
    this.gloObj.mainResDel = mainResDel;
  }

  deleteWebApp() {
    if (this.gloObj.mainResDel)
      this.gloObj.deleteRestrictionPath == "web" ? this.removeWebsiteMain(this.gloObj.delResId) : this.removeProfileAppMain(this.gloObj.delResId);
    else
      this.gloObj.deleteRestrictionPath == "web" ? this.removeWebsite(this.gloObj.delResId) : this.removeProfileApp(this.gloObj.delResId);
  }

  showAddWeb() {
    this.addWebsiteToggle = !this.addWebsiteToggle;
    this.gloObj.isValidWebsite = true;
    this.gloObj.urlExist = false;
    this.websiteModel = "";
  }

  getStaffProfiles() {
    this.loading = true;
    this.experianceIQService.getStaffProfiles(this.userId).subscribe((res: any) => {
      this.loading = false;
      this.staffProfilesCheck = true;
      setTimeout(() => {
        this.staffProfiles = res?.staffProfiles || [];
        this.staffProfilesCheck = false;
        //setTimeout(() => this.dtTriggerStaff.next(), 100);
      }, 200);
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    });
  }

  deleteStaffProfConfirmatn(staffProfile) {
    this.deleteProfileData = staffProfile.id;
    this.modalInfo = staffProfile.firstName + ' ' + staffProfile.lastName;
    setTimeout(() => document.getElementById("edge-Experience-IQ").scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }

  deleteStaffProfile() {
    this.loading = true;
    this.experianceIQService.deleteStaffProfile(this.userId, this.deleteProfileData).subscribe((res: any) => {
      this.loading = false;
      this.getStaffProfiles();
      this.deleteProfileData = null;
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.deleteProfileData = null;
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    });
  }

  showStaffProfileDetail(staffProfile) {
    this.staffProfileDetail = {
      name: staffProfile.firstName + ' ' + staffProfile.lastName,
      stations: staffProfile?.devices || []
    }
  }

  closeStaffProfile() {
    this.staffProfileDetail = null;

  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.tableOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'es') {
      this.tableOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.tableOptions.language = this.translateService.de_DE;
    }
    else if (this.language.fileLanguage == 'en' && this.tableOptions.language) {
      delete this.tableOptions.language;
    }
  }

  rerender(): void {
    //if (!this.dtElement) return;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTriggerStaff.next();
    });
  }
}



