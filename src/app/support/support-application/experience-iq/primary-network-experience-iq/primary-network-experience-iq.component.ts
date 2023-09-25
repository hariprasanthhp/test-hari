import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { userProfileSummaryModel } from '../../shared/models/user-profile-summary.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileNewDeviceModel } from '../../shared/models/profile-new-device.model';
import { StationListAllModel } from '../../shared/models/ststion-list-all.model';
import { ProfileModel } from '../../shared/models/profile.model';
import { FeatureList } from '../../shared/models/feature-list.model';
import { CategoriesModel } from '../../shared/models/categories.model';
import { EditAppModel } from '../../shared/models/edit-app.model';
import { cleanObject } from '../../../shared/service/utility.class';
import { Apps, SearchAppModel } from '../../shared/models/search-app.model';
import { profileWebUrl } from '../../shared/models/get-profile-web-url.model';
import { catchError, tap, switchMap, distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { DataSerialNumberModel } from '../../../shared/models/data.serial-number.model';
import { UsageEnum, UsageModel } from '../../shared/models/usage-model';
import { BedTime, BedtimeModel, Days } from '../../shared/models/bed-time.model';
import { ExperianceIQDropDownValues, NotificationModel } from '../../shared/models/notifications.model';
import { DataServiceService } from '../../../data.service';
import { Title } from '@angular/platform-browser';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { ExperianceIQService } from '../../shared/service/experiance-iq.service';
@Component({
  selector: 'app-primary-network-experience-iq',
  templateUrl: './primary-network-experience-iq.component.html',
  styleUrls: ['./primary-network-experience-iq.component.scss']
})
export class PrimaryNetworkExperienceIqComponent implements OnInit {
  @ViewChild('myCalendar') datePicker;
  language: any;
  languageSubject;
  showSuccess: boolean = false;

  serialnumber;

  safeSearchStatus = false;
  scopeFlag: any = {};
  loading: boolean = false;

  public errorMsg: string;
  public showError: boolean = false;
  public successMsg: string;
  public successMessage: string;

  modalLoader: boolean = false;
  selectedProfile: ProfileModel = new ProfileModel();
  categoriesList: CategoriesModel = new CategoriesModel();
  selectedApps: SearchAppModel = new SearchAppModel()
  webList: profileWebUrl = new profileWebUrl();
  addWebsiteToggle: boolean = true;
  customTimeUsage: Date[] = [];
  allowForChecked = [];
  @Input() userId: string = "";
  model: any;
  websiteModel: any = "";
  searching: boolean = false;
  searchFailed: boolean = false;
  isError: boolean = false;
  warningMessage: any = '';
  selectedContentFilter: any;
  contentFilter = [{ name: "None", value: "N" }, { name: "Custom", disabled: true, value: "CU" }, { name: "Child (0-8 yrs Old)", value: "C" }, { name: "Pre-Teen (9-12 yrs Old)", value: "P" }, { name: "Teen (13-18 yrs Old)", value: "T" }]
  isqosalert: any;

  orgId: any;
  profiledRestriction = false;
  bisabledAllowForButtonMain: any = [];
  gloObj: any = {
    isValidWebsite: true
  };

  showmsg: boolean = false;
  dnsStatus: any;
  icloudStatus: any;
  availableFor22a2: boolean;
  smbEnabled: boolean;
  //activeRestrictionTab = 'Primary Network';
  isAllowForOption: boolean = false;
  constructor(private translateService: TranslateService,
    private experianceIQService: ExperianceIQService,
    public ssoService: SsoAuthService,
    private modalService: NgbModal,
    private titleService: Title
  ) {

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      // this.titleService.setTitle(`${this.language['Restrictions']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
      this.setContentFilter();
    })
  }



  ngOnInit(): void {
    this.titleService.setTitle(`${this.language['Restrictions']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);

    this.isSmbOnboarded = this.ssoService.isSmbEnabled();
    this.softwareVrsion = this.ssoService.getSoftwareVersion(true);
    this.setContentFilter();
    this.showSuccess = false;
    this.showError = false;
    this.getScopes();
    this.orgId = this.ssoService.getOrgId();
    if (!(this.softwareVrsion >= 23.3 && this.isSmbOnboarded)) {
      this.availableFor22a2 = this.ssoService.exosVersionCheck('22.2', true);
      this.isAllowForOption = false;
    }
    else if (this.isSmbOnboarded && this.softwareVrsion >= 23.3) {
      this.availableFor22a2 = true;
      this.smbEnabled = false;
      this.isAllowForOption = true;
    }
    this.getRestriction();
  }
  setContentFilter() {
    if (!(this.softwareVrsion >= 23.3 && this.isSmbOnboarded)) {
      this.contentFilter = [
        { name: this.language['None'], value: "N" },
        { name: this.language['Custom'], disabled: true, value: "CU" },
        { name: this.language['Child (0-8 yrs Old)'], value: "C" },
        { name: this.language['Pre-Teen (9-12 yrs Old)'], value: "P" },
        { name: this.language['Teen (13-18 yrs Old)'], value: "T" }
      ]
    }
    else if (this.isSmbOnboarded && this.softwareVrsion >= 23.3) {
      this.contentFilter = [
        { name: this.language['No Restrictions'], value: "N" },
        { name: this.language['Custom'], disabled: true, value: "CU" },
        { name: this.language['Very Restrictive'], value: "C" },
        { name: this.language['Moderately Restrictive'], value: "P" },
        { name: this.language['Mildly Restrictive'], value: "T" }
      ]
    }
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

  appformatter = (result: Apps) => result.name || "";
  searchApp = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap((term: string) => term.length < 2 ? of([]) :
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
      switchMap((term: string) => term.length < 2 ? of([]) :
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
  selectedItemMain(selectedApp) {
    // this.clickedItem=item.item;
    this.showSuccess = false;
    this.showError = false;
    this.gloObj.restAppExist = (this.selectedApps?.apps || []).filter(obj => obj.id == selectedApp.item.id).length;
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


  openModal(content: any, state: string) {
    this.showSuccess = false;
    this.showError = false;
    let ngbOptions =
      { ariaLabelledBy: 'modal-basic-title', centered: true, windowClass: 'custom-sm-modal' }

    this.modalService.open(content, ngbOptions).result.then((result) => {
      //console.log(result);

    },
      (reason) => {
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

  youtubeRestrictionFeature = false;
  safeSearchFeature = false;
  youtubeRestrictionStatus = false;

  isSmbOnboarded: boolean = false;
  softwareVrsion: number;
  getRestriction() {


    // this.isSmbOnboarded = true;
    // this.softwareVrsion = 23.3;
    this.profiledRestriction = false;
    this.getYoutubeRestrictionStatusMain();
    this.getProfileSafeSearchStatusMain();
    this.getProfileCategoryListMain();
    this.getProfileAppListMain();
    this.getProfileWebListMain();
    this.getDnsMain();
    this.getiCloudMain();

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


  getProfileAppListMain() {
    this.showSuccess = false;
    this.showError = false;
    this.selectedApps.apps = this.selectedApps.apps.filter(x => x.id);
    this.allowForChecked = [];
    this.customTimeUsage = [];
    // this.loading = true;
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
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.loading = false;
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
    // this.loading = true;
    this.experianceIQService.getProfileWebUrlMain(this.userId).subscribe((res: profileWebUrl) => {
      this.webList = res;
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
      this.loading = false;
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

  // getRestrictionFeatureList() {
  //   this.showSuccess = false;
  //   this.showError = false;
  //   this.loading = true;
  //   this.experianceIQService.getFeatureList(this.userId).subscribe((feature: FeatureList) => {
  //     this.youtubeRestrictionFeature = feature.youtubeRestriction;
  //     this.safeSearchFeature = feature.safeSearch;
  //     this.loading = false;
  //   }, (err: HttpErrorResponse) => {
  //     this.errorMsg = err.error.errorDesc;
  //     (this.scopeFlag.configWrite) ? this.showError = true : '';
  //     this.loading = false;
  //   })
  // }
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

  addWebsiteMain() {
    this.showSuccess = false;
    this.showError = false;

    this.gloObj.isValidWebsite = this.ssoService.validateUrl(this.websiteModel) || this.ssoService.matchDomainAlone(this.websiteModel);
    this.gloObj.urlExist = (this.webList?.webs || []).filter(obj => obj.webUrl == this.websiteModel).length;
    if (!this.gloObj.isValidWebsite || this.gloObj.urlExist) return;
    this.loading = true;
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
      this.loading = false;
    })
  }



  removeWebsiteMain(id: string) {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    this.experianceIQService.removeWebUrlMain(id, this.userId).subscribe(res => {
      //this.loading = false;
      this.getProfileWebListMain();
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
      this.pageErrorHandle(err);
    })
  }
  removeProfileAppMain(app: any) {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    this.experianceIQService.deleteAppByProfileAndAppIdMain(String(app), this.userId).subscribe(res => {
      // this.loading = false;
      this.getProfileAppListMain();
    }, err => {
      this.loading = false;
      this.pageErrorHandle(err);
    })
  }

  updateWebUrlMain(web) {
    this.showSuccess = false;
    this.showError = false;
    web.userId = this.userId;
    web.block = web.blocked;
    this.loading = true;
    this.experianceIQService.updateWebAddressMain(web).subscribe(res => {
      this.getProfileWebListMain();
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
      this.loading = false;
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
    this.loading = true;
    this.experianceIQService.editAppMain(app).subscribe(res => {
      this.getProfileAppListMain();

    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
      this.loading = false;
    })
  }

  minDuration: Date = new Date(0, 0, 0, 0, 5, 0, 0);
  bisabledAllowForButton: any = [];
  previousTimeEvent: Date = new Date();
  // onCalenderSelected(event: Date, i) {
  //   if (event.getHours() == 0 && event.getMinutes() == 0) {
  //     this.bisabledAllowForButton[i] = true;
  //   } else {
  //     this.bisabledAllowForButton[i] = false;
  //   }
  // }
  // onAllowForTimeSelected(selectedevent, event: Date, index: number) {
  //   if (event.getHours() == +"00" && event.getMinutes() == +"00") {
  //     this.customTimeUsage[index].setHours(1);
  //   } else if (selectedevent.relatedTarget &&
  //     selectedevent.relatedTarget.id && selectedevent.relatedTarget.id == "submitButton") {
  //   } else {
  //     this.customTimeUsage[index].setHours(this.previousTimeEvent.getHours(), this.previousTimeEvent.getMinutes());
  //   }
  // }
  closeDatePicker(app: EditAppModel, index: number) {
    this.datePicker.overlayVisible = false;
    this.datePicker.datepickerClick = false;
    this.customTimeUsage[index].setHours(this.previousTimeEvent.getHours())
    this.customTimeUsage[index].setMinutes(this.previousTimeEvent.getMinutes())
    let timeUsage = this.customTimeUsage[index];
    if (this.customTimeUsage) {
      let hours = timeUsage.getHours().toString().length == 1 ? '0' + timeUsage.getHours().toString() : timeUsage.getHours().toString()
      let minutes = timeUsage.getMinutes().toString().length == 1 ? '0' + timeUsage.getMinutes().toString() : timeUsage.getMinutes().toString()
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
        this.getProfileAppListMain();
      }, (err: HttpErrorResponse) => {
        this.errorMsg = err.error.errorDesc;
        this.showError = true;
      })
    }
  }
  // updateAllowForAppMain(app, index: number) {
  //   this.showSuccess = false;
  //   this.showError = false;
  //   this.allowForChecked[index] = 'selected';
  //   let timeUsage = this.customTimeUsage[index];
  //   this.loading = true;
  //   if (this.customTimeUsage) {
  //     let hours = timeUsage.getHours().toString().length == 1 ? '0' + timeUsage.getHours().toString() : timeUsage.getHours().toString()
  //     let minutes = timeUsage.getMinutes().toString().length == 1 ? '0' + timeUsage.getMinutes().toString() : timeUsage.getMinutes().toString()
  //     let timeStr = hours + ":" + minutes;
  //     if (timeStr == "00:00") {
  //       timeStr = "01:00"
  //     }
  //     app.duration = timeStr
  //     app.block = false;
  //     app.userId = this.userId;
  //     delete app["timeUsage"];
  //     this.experianceIQService.editAppMain(app).subscribe(res => {
  //       this.getProfileAppListMain();
  //       this.loading = false;
  //     }, (err: HttpErrorResponse) => {
  //       this.errorMsg = err.error.errorDesc;
  //       this.showError = true;
  //       this.loading = false;
  //     })
  //   }
  // }

  // updateAllowForWebMain(app, index: number) {
  //   this.loading = true;
  //   this.showSuccess = false;
  //   this.showError = false;
  //   this.allowForChecked[index] = 'selected';
  //   let timeUsage = this.customTimeUsage[index];
  //   if (this.customTimeUsage) {
  //     let hours = timeUsage.getHours().toString().length == 1 ? '0' + timeUsage.getHours().toString() : timeUsage.getHours().toString()
  //     let minutes = timeUsage.getMinutes().toString().length == 1 ? '0' + timeUsage.getMinutes().toString() : timeUsage.getMinutes().toString()
  //     let timeStr = hours + ":" + minutes;
  //     if (timeStr == "00:00") {
  //       timeStr = "01:00"
  //     }
  //     app.duration = timeStr
  //     app.block = false;
  //     app.userId = this.userId;
  //     this.experianceIQService.setWebAddressMain(app).subscribe(res => {
  //       this.getProfileWebListMain();
  //     }, (err: HttpErrorResponse) => {
  //       this.errorMsg = err.error.errorDesc;
  //       this.showError = true;
  //       this.loading = false;
  //     })
  //   }
  // }
  // allowForCalenderClicked(i) {
  //   this.previousTimeEvent.setHours(this.customTimeUsage[i].getHours())
  //   this.previousTimeEvent.setMinutes(this.customTimeUsage[i].getMinutes())
  // }

  // closeDatePickerMain(app, index: number) {
  //   this.loading = true;
  //   this.datePicker.overlayVisible = false;
  //   this.datePicker.datepickerClick = false;
  //   this.customTimeUsage[index].setHours(this.previousTimeEvent.getHours())
  //   this.customTimeUsage[index].setMinutes(this.previousTimeEvent.getMinutes())

  //   let timeUsage = this.customTimeUsage[index];
  //   if (this.customTimeUsage) {
  //     let hours = timeUsage.getHours().toString().length == 1 ? '0' + timeUsage.getHours().toString() : timeUsage.getHours().toString()
  //     let minutes = timeUsage.getMinutes().toString().length == 1 ? '0' + timeUsage.getMinutes().toString() : timeUsage.getMinutes().toString()
  //     let timeStr = hours + ":" + minutes;
  //     if (timeStr == "00:00") {
  //       timeStr = "01:00"
  //     }
  //     app.duration = timeStr
  //     app.block = false;
  //     app.userId = this.userId;
  //     this.experianceIQService.editAppMain(app).subscribe(res => {
  //       this.bisabledAllowForButtonMain[index] = false;
  //       this.getProfileAppListMain();
  //     }, (err: HttpErrorResponse) => {
  //       this.errorMsg = err.error.errorDesc;
  //       this.showError = true;
  //       this.loading = false;
  //     })
  //   }
  // }

  // updateAllowForCheckedMain(app, i, event) {
  //   this.selectedApps.apps[i].blocked = null;
  //   this.allowForChecked[i] = event.target.value;
  //   this.updateAllowForAppMain(app, i);
  // }

  // deviceClicked() {
  //   this.showError = false;
  //   this.showSuccess = false;
  // }

  // onblurWebsite() {
  //   this.websiteModel = "";
  //   this.addWebsiteToggle = !this.addWebsiteToggle;
  // }

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
  typeaheadbasickeyup($event) {
    this.gloObj.restAppExist = false

    if (this.model == '') {
      this.isError = false
    }
  }

  setDeleteWebApp(path, id, mainResDel = true) {
    this.gloObj.deleteRestrictionPath = path;
    this.gloObj.delResId = id;
    this.gloObj.mainResDel = mainResDel;
  }

  deleteWebApp() {
    if (this.gloObj.mainResDel)
      this.gloObj.deleteRestrictionPath == "web" ? this.removeWebsiteMain(this.gloObj.delResId) : this.removeProfileAppMain(this.gloObj.delResId);

  }

  showAddWeb() {
    this.addWebsiteToggle = !this.addWebsiteToggle;
    this.gloObj.isValidWebsite = true;
    this.gloObj.urlExist = false;
    this.websiteModel = "";
  }

}
function arraystring(days: any[]) {
  throw new Error('Function not implemented.');
}



