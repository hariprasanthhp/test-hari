import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { profileWebUrl } from '../../shared/models/get-profile-web-url.model';
import { Apps, SearchAppModel } from '../../shared/models/search-app.model';
import { ExperianceIQService } from '../../shared/service/experiance-iq.service';
import { SmbExperianceIQService } from '../../shared/service/smb-experiance-iq.service';

@Component({
  selector: 'app-smb-experience-iq',
  templateUrl: './smb-experience-iq.component.html',
  styleUrls: ['./smb-experience-iq.component.scss']
})
export class SmbExperienceIqComponent implements OnInit {
  @ViewChild('myCalendar') datePicker;
  language: any;
  languageSubject;
  @Input() isSmbEnabled: boolean = false;
  resSettings: any = [];
  scopeFlag: any = {};
  gloObj: any = {
    isValidWebsite: true
  };
  restrictContent = "";
  webList: profileWebUrl = new profileWebUrl();
  selectedContentFilter: any;
  websiteModel: any = "";
  availableFor22a2: boolean;
  isqosalert: any;
  model: any;
  isError: boolean = false;
  searching: boolean = false;
  searchFailed: boolean = false;
  showSuccess: boolean = false;
  public errorMsg: string;
  public showError: boolean = false;
  public successMsg: string;
  public successMessage: string;
  selectedApps: SearchAppModel = new SearchAppModel();
  @Input() userId: string = "";
  loading: boolean = false;
  warningMessage: any = '';
  activeRestrictionTab: string = "Primary Network";
  restrictionTabId: number = 0;
  allRestrictionsSettings: any = [];
  profileId: string = '';
  contentFilter = [{ name: "None", value: "N" }, { name: "Custom", disabled: true, value: "CU" }, { name: "Child (0-8 yrs Old)", value: "C" }, { name: "Pre-Teen (9-12 yrs Old)", value: "P" }, { name: "Teen (13-18 yrs Old)", value: "T" }]
  constructor(public ssoService: SsoAuthService,
    private translateService: TranslateService,
    private experianceIQService: ExperianceIQService,
    private smbExperianceIQService: SmbExperianceIQService,
    private modalService: NgbModal,) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      //this.titleService.setTitle(`${this.language['Restrictions']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
      this.contentFilter = [
        { name: this.language['No Restrictions'], value: "N" },
        { name: this.language['Custom'], disabled: true, value: "CU" },
        { name: this.language['Very Restrictive'], value: "C" },
        { name: this.language['Moderately Restrictive'], value: "P" },
        { name: this.language['Mildly Restrictive'], value: "T" }
      ]
    });

  }

  ngOnInit(): void {
    this.getScopes();
    this.contentFilter = [
      { name: this.language['No Restrictions'], value: "N" },
      { name: this.language['Custom'], disabled: true, value: "CU" },
      { name: this.language['Very Restrictive'], value: "C" },
      { name: this.language['Moderately Restrictive'], value: "P" },
      { name: this.language['Mildly Restrictive'], value: "T" }
    ]

    this.checkRoleProfilesCreated();

  }
  checkRoleProfilesCreated() {
    this.smbExperianceIQService.checkRoleProfilesCreated(this.userId).subscribe((res: any) => {
      this.getRoleProfileList(4);
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = error.error.errorDesc;
      this.showError = true;
      this.pageErrorHandle(error);
    });
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

  typeaheadbasickeyup($event) {
    this.gloObj.restAppExist = false

    if (this.model == '') {
      this.isError = false
    }
  }
  appformatter = (result: Apps) => result.name || "";
  searchAppMain = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap((term: string) => term.length < 2 ? of([]) :
        this.smbExperianceIQService.searchAppMain(term, this.userId, this.profileId).pipe(
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
    if (this.gloObj.restAppExist || !this.profileId) return;
    this.loading = true;
    const body = {
      userId: this.userId,
      profileId: this.profileId,
      id: selectedApp.item.id,
      block: selectedApp.item.blocked,
      duration: selectedApp.item.timeUsage || '0',

    }
    this.smbExperianceIQService.editAppMain(body).subscribe(x => {
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

  getProfileAppListMain() {
    this.showSuccess = false;
    this.showError = false;
    this.selectedApps.apps = this.selectedApps.apps.filter(x => x.id);
    this.allowForChecked = [];
    this.customTimeUsage = [];
    this.loading = true;
    this.smbExperianceIQService.getAppListMain(this.userId, this.profileId).subscribe((res: SearchAppModel) => {
      this.selectedApps = res;
      this.selectedApps.apps.forEach((x: any, i) => {
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
  isPrimaryNetworkTab: boolean = false;
  setRestrictionTab(roleId: any) {
    // this.isPrimaryNetworkTab = true;
    this.restrictionTabId = roleId;
    let settings: any = [];
    // this.resSettings = {};
    this.loading = true;
    settings = this.allRestrictionsSettings.filter((r: any) => r.roleId == roleId);
    if (settings?.length > 0) {
      // this.isPrimaryNetworkTab = false;
      let profileID = settings[0]?.profileId;
      this.profileId = profileID;
      this.smbExperianceIQService.getResSettingsById(this.userId, roleId, this.profileId).subscribe((res: any) => {
        this.resSettings = res;
      }, (err: HttpErrorResponse) => {
        this.errorMsg = err.error.errorDesc;
        this.showError = true;
      })
      this.getProfileAppListMain();
      this.getProfileWebListMain(profileID);
    }
    else {
      this.resSettings = {};
      this.selectedApps.apps = [];
      this.webList.webs = [];
      this.profileId = null;
      this.loading = false;
    }
    // if (this.isPrimaryNetworkTab) {
    //   this.activeRestrictionTab = 'Primary Network';
    // }
    // else {
    //   this.activeRestrictionTab = 'Primary And POS';
    // }
    this.websiteModel = '';
    this.model = "";
    this.isError = false;
    this.gloObj.restAppExist = false;
    this.gloObj.isValidWebsite = true;
    this.gloObj.urlExist = false;
    this.searchFailed = false;

  }
  getProfileWebListMain(profileId: string) {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    this.smbExperianceIQService.getWebList(this.userId, profileId).subscribe((res: profileWebUrl) => {
      this.webList = res;
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
      this.loading = false;
    })
  }
  getRoleProfileList(roleId: any) {
    this.loading = true;
    this.smbExperianceIQService.getRoleProfileList(this.userId).subscribe((res: any) => {
      this.allRestrictionsSettings = res?.datas;
      this.setRestrictionTab(roleId);
      this.loading = false;
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = error.error.errorDesc;
      this.showError = true;
      this.pageErrorHandle(error);
    })

  }
  addWebsiteToggle: boolean = true;
  addWebsiteMain() {
    this.showSuccess = false;
    this.showError = false;
    let profileID = this.profileId;
    this.gloObj.isValidWebsite = this.ssoService.validateUrl(this.websiteModel) || this.ssoService.matchDomainAlone(this.websiteModel);
    this.gloObj.urlExist = (this.webList?.webs || []).filter(obj => obj.webUrl == this.websiteModel).length;
    if (!this.gloObj.isValidWebsite || this.gloObj.urlExist || !profileID) return;
    const body = {
      userId: this.userId,
      profileId: profileID,
      webUrl: this.websiteModel,
    };
    this.smbExperianceIQService.addWebAddressMain(body).subscribe(res => {
      this.addWebsiteToggle = true;
      this.websiteModel = "";

      this.getProfileWebListMain(profileID);

    }, (err: HttpErrorResponse) => {
      this.addWebsiteToggle = true;
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }
  // onblurWebsite() {
  //   this.websiteModel = "";
  //   this.addWebsiteToggle = !this.addWebsiteToggle;
  // }

  showAddWeb() {
    this.addWebsiteToggle = !this.addWebsiteToggle;
    this.gloObj.isValidWebsite = true;
    this.gloObj.urlExist = false;
    this.websiteModel = "";
  }

  updateRoleProfile(isGroup: any = false) {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    let resData = this.resSettings;

    if (resData.roleId && resData.profileId) {
      let categories = this.resSettings?.categories;
      let blockedCategories = this.resSettings?.categories?.filter((x: any) => x.blocked == true).map((y: any) => y.cid);

      let blockedApps = this.selectedApps?.apps?.filter((x: any) => x.blocked == true).map((y: any) => y.id);
      let allowedApps = [];
      let allowFor = [];
      let timeLimits = this.resSettings?.timeLimits;
      if (timeLimits?.length > 0) {
        allowFor = this.selectedApps?.apps?.filter((x: any) => x.blocked == null).map((y: any) => {
          const data = {
            aid: y.id, timeUsage: y.timeUsage
          }
          return data;
        });
        // if (allowedApps?.length == 0)
        //   allowedApps = this.selectedApps?.apps?.filter((x: any) => x.blocked == null).map((y: any) => y.id);
        allowedApps = this.selectedApps?.apps?.filter((x: any) => x.blocked == null || x.blocked == false).map((y: any) => y.id);
      }
      else {
        allowedApps = this.selectedApps?.apps?.filter((x: any) => x.blocked == false).map((y: any) => y.id);
      }

      // "timeLimits": [
      //   {
      //     "aid": 3410,
      //     "tu": 120
      //   }
      // ],
      // "allowFor": [
      //   {
      //     "aid": 3410,
      //     "timeUsage": "01:10"
      //   }
      // ],


      let allowedWebs = this.webList?.webs?.filter((x: any) => x.blocked == false).map((y: any) => y.webUrl);
      let blockedWebs = this.webList?.webs?.filter((x: any) => x.blocked == true).map((y: any) => y.webUrl);
      let group = ''
      if (isGroup) {
        group = resData?.group;
      }
      let data: any = {
        "userId": this.userId,
        "roleId": resData?.roleId,
        "profileId": resData?.profileId,
        "hidden": resData?.hidden,
        "data": {
          "name": resData?.name,
          "group": group,
          "blockedCategories": blockedCategories,
          "blockedWebs": blockedWebs,
          "allowedWebs": allowedWebs,
          "blockedApps": blockedApps,
          "allowedApps": allowedApps,
          "safeSearch": resData?.safeSearch,
          "youtubeRestricted": resData?.youtubeRestricted,
          "dohBlock": resData?.dohBlock,
          "icloudRelay": resData?.icloudRelay,
          "managementEnable": resData?.managementEnable,
        }
      }
      if (allowFor?.length > 0) {
        data.data.allowFor = allowFor;
      }
      this.smbExperianceIQService.updateRoleProfile(data).subscribe(res => {
        // this.getRoleProfileList(this.restrictionTabId);
        this.setRestrictionTab(this.restrictionTabId);
        // this.loading = false;
      }, (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMsg = err.error.errorDesc;
        // this.youtubeRestrictionStatus = !this.youtubeRestrictionStatus;
        this.showError = true;
      })
    }
    else {
      this.loading = false;
    }
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
  deleteWebApp() {
    if (this.gloObj.mainResDel)
      this.gloObj.deleteRestrictionPath == "web" ? this.removeWebsiteMain(this.gloObj.delResId) : this.removeProfileAppMain(this.gloObj.delResId);
  }
  removeWebsiteMain(id: string) {
    this.showSuccess = false;
    this.showError = false;
    // this.loading = true;
    let profileId = this.profileId;
    this.smbExperianceIQService.removeWebUrlMain(id, profileId, this.userId).subscribe(res => {
      //  this.loading = false;
      this.getProfileWebListMain(profileId);
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
    // this.loading = true;
    this.smbExperianceIQService.deleteAppByProfileAndAppIdMain(String(app), this.userId, this.profileId).subscribe(res => {
      //this.loading = false;
      this.getProfileAppListMain();
    }, err => {
      this.loading = false;
      this.pageErrorHandle(err);
    })
  }
  modalLoader: boolean = false;
  closeModal(err = '') {
    this.modalLoader = false;
    this.modalService.dismissAll();
    /*if (!err) {
      this.isError = false
    }*/
  }
  setDeleteWebApp(path, id, mainResDel = true) {
    this.gloObj.deleteRestrictionPath = path;
    this.gloObj.delResId = id;
    this.gloObj.mainResDel = mainResDel;
  }

  pageErrorHandle(err, disableDefault = false) {

    disableDefault ? (this.isError = false) : (this.isError = true);
    if (err.status === 401) {
      this.errorMsg = this.warningMessage = this.language['Access Denied'];
    } else {
      this.errorMsg = this.warningMessage = this.ssoService.pageErrorHandle(err);
    }

  }
  bisabledAllowForButtonMain: any = [];
  minDuration: Date = new Date(0, 0, 0, 0, 5, 0, 0);
  bisabledAllowForButton: any = [];
  previousTimeEvent: Date = new Date();
  allowForChecked = [];
  customTimeUsage: Date[] = [];
  updateAllowForCheckedMain(app, i, event) {
    this.selectedApps.apps[i].blocked = null;
    this.allowForChecked[i] = event.target.value;
    this.updateAllowForAppMain(app, i);

  }

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
  onCalenderSelected(event: Date, i) {
    if (event.getHours() == 0 && event.getMinutes() == 0) {
      this.bisabledAllowForButton[i] = true;
    } else {
      this.bisabledAllowForButton[i] = false;
    }
  }
  closeDatePickerMain(app, index: number) {
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
      app.userId = this.userId;
      app.profileId = this.profileId,
        this.smbExperianceIQService.editAppMain(app).subscribe(res => {
          this.bisabledAllowForButtonMain[index] = false;
          this.getProfileAppListMain();
        }, (err: HttpErrorResponse) => {
          this.errorMsg = err.error.errorDesc;
          this.showError = true;
        })
    }
  }
  updateAllowForAppMain(app, index: number) {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    this.allowForChecked[index] = 'selected';
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
      app.userId = this.userId;
      app.profileId = this.profileId,
        delete app["timeUsage"];
      this.smbExperianceIQService.editAppMain(app).subscribe(res => {
        this.setRestrictionTab(this.restrictionTabId);
        this.getProfileAppListMain();
      }, (err: HttpErrorResponse) => {
        this.errorMsg = err.error.errorDesc;
        this.showError = true;
      })
    }
  }

}
