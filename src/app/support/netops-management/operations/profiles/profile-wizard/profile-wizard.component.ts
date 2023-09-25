import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ProfileService } from '../../services/profile.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { CategoryConfigurationService } from '../../services/category-config.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-wizard',
  templateUrl: './profile-wizard.component.html',
  styleUrls: ['./profile-wizard.component.scss']
})
export class ProfileWizardComponent implements OnInit, OnDestroy {
  language: any;
  languageSubject;
  selectedTabIndex: number = 0;
  isTabChange: boolean = true;
  categoryListData: any = [];
  categoryConfigurationSubject;
  innerProfileConfigurationSubject;
  categoryConfigData: any;
  groupOfCategory: [];
  selectedCategoryType: any;
  loading: boolean = false;
  showOverViewPage: boolean = false;
  profileTableData: any = [];
  allProfileSubscribe: any;
  addProfileTab: Array<string> = ['Start', 'Build Profile', 'Review'];
  addProfileObj: any = {
    addProfileTab: this.addProfileTab,
    start: {
      name: undefined,
      description: undefined,
      isNameEntered: true
    },
    buildProfile: {
      innerProfileCategory: [],
      exisitingCategory: [],
      categoryList: []
    }
  };
  innerProfileCategory: any = [];
  errorMsg: string = undefined;
  orgId: any;
  isNewRecord: boolean = true;
  AddProfileSubscribe: any;
  activeTab: string = 'Start';
  readonly NEW_CATEGORY_BUTTON_DISABLE = ['Bandwidth', 'DHCP Option82', 'Video - Multicast Range Filters', 'Video - Multicast VLAN Registration (MVR)'];
  hasScopeAccess = false;
  profileWizardState: any;

  constructor(
    private translateService: TranslateService,
    public ssoService: SsoAuthService,
    private categoryConfigService: CategoryConfigurationService,
    private service: ProfileService,
    private router: Router,
    private titleService: Title
  ) { }
  setTitle(url) {
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('/cco/services/service-profiles/profiles')) {
      this.titleService.setTitle(`${this.language['Profiles']} - ${this.language['Operations']} - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    } else if (this.router.url.includes('/cco/services/service-profiles/profiles')) {
      this.titleService.setTitle(`${this.language['RG Profiles']} - ${this.language['Services Profiles']} - ${this.language['Services']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else {
      this.titleService.setTitle(`${this.language['RG Profiles']} - ${this.language['Profiles']} - ${this.language['Workflow Prerequisites']} - ${this.language['configuration']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {
    this.orgId = this.ssoService.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.setTitle(this.router.url)
    });
    this.setTitle(this.router.url)
    let scopes = this.ssoService.getScopes();

    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco/services/service-profiles/profiles')) {
      if (environment.VALIDATE_SCOPE) {
        scopes['cloud.rbac.csc.netops.operations.profiles'] = scopes['cloud.rbac.csc.netops.operations.profiles'] ? scopes['cloud.rbac.csc.netops.operations.profiles'] : [];
        if (scopes['cloud.rbac.csc.netops.operations.profiles'].length) {
          this.hasScopeAccess = true;
        }

      } else {
        this.hasScopeAccess = true;
      }
    } else if (this.router.url.includes('cco/services/service-profiles/profiles')) {
      if (environment.VALIDATE_SCOPE) {
        if (scopes['cloud.rbac.coc.services.serviceprofiles.rgprofiles'].length) {
          this.hasScopeAccess = true;
        }

      } else {
        this.hasScopeAccess = true;
      }
    } else {
      if (environment.VALIDATE_SCOPE) {
        scopes['cloud.rbac.foundation.configurations'] = scopes['cloud.rbac.foundation.configurations'] ? scopes['cloud.rbac.foundation.configurations'] : [];
        if (scopes['cloud.rbac.foundation.configurations'].length) {
          this.hasScopeAccess = true;
        }

      } else {
        this.hasScopeAccess = true;
      }
    }

    if (!this.hasScopeAccess) {
      this.ssoService.setPageAccess(false);
      return;
    }

    this.categoryConfigurationSubject = this.categoryConfigService.categoryConfigData().subscribe(data => {
      this.categoryListData = data;
      this.groupOfCategory = _.uniq(_.map(data, 'group')).sort();
      this.categoryConfigData = _.mapValues(_.groupBy(data, 'group'),
        groupList => groupList.map(group => _.omit(group, 'group')));
    });
    delete this.categoryConfigData["undefined"]
    this.innerProfileConfigurationSubject = this.categoryConfigService.innerProfileCategory().subscribe(data => {
      this.innerProfileCategory = data['result'];

    });
    this.onTabChange(0);
    this.getProfileData();
    this.profileWizardState = localStorage.getItem('profileWizardState') ? JSON.parse(localStorage.getItem('profileWizardState')) : history.state?.isOverview;

    if (this.profileWizardState?.isOverview) {
      this.patchValue();
    }
  }

  getProfileData(isRerender?: boolean) {
    this.loading = true;
    if (this.allProfileSubscribe) this.allProfileSubscribe.unsubscribe();
    this.allProfileSubscribe = this.service.getProfileList(this.orgId).subscribe((res: any) => {
      if (res) {
        this.profileTableData = res;
        // if(!history.state.isOverview) {
        //   this.patchValue();
        // }
        this.loading = false;
        this.patchValue();

      }
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.profileTableData = [];
      if (!this.profileWizardState?.isOverview) {
        this.patchValue();
      }
      this.errorMsg = err.error.error;
    }, () => {
      this.loading = false;
    });
  }

  patchValue() {
    const profileData: any = this.profileWizardState?.editProfile;
    const isFromDataModel: any = history.state?.dataModel;
    if (profileData) {
      this.isNewRecord = false;
      this.addProfileObj = {
        addProfileTab: this.addProfileTab,
        start: {
          name: profileData.name,
          description: profileData.description,
          isNameEntered: false
        },
        buildProfile: {
          allProfileData: this.profileTableData,
          isStepperClicked: true,
          innerProfileCategory: this.innerProfileCategory,
          disableAddCategoryBtn: true,
          isFromDataModel: history.state?.isDataModel,
          dataModelCategoryObj: {
            isFormValid: false,
            name: 'Set Parameter Value',
            displayName: 'Set Parameter Value',
            parameters: history.state?.dataModel,
          },
          exisitingCategory: [],
          categoryList: Array.isArray(this.getCategoryObj(profileData.configurations)) ? [...this.getCategoryObj(profileData.configurations)] : [],
          reviewPageCategoryList: Array.isArray(this.getCategoryObj(profileData.configurations)) ? [...this.getCategoryObj(profileData.configurations)] : [],
          categoryConfigData: []
        }
      }
      this.getCategoryObj(profileData.configurations);
      this.showOverViewPage = this.profileWizardState?.isOverview;
    } else {
      this.isNewRecord = true;
      this.addProfileObj = {
        addProfileTab: this.addProfileTab,
        start: {
          name: undefined,
          description: undefined,
          isNameEntered: true
        },
        buildProfile: {
          allProfileData: this.profileTableData,
          isStepperClicked: false,
          innerProfileCategory: this.innerProfileCategory,
          disableAddCategoryBtn: true,
          isFromDataModel: history.state?.isDataModel,
          dataModelCategoryObj: {
            isFormValid: false,
            name: 'Set Parameter Value',
            displayName: 'Set Parameter Value',
            parameters: history.state?.dataModel,
          },
          exisitingCategory: [],
          categoryList: [],
          reviewPageCategoryList: []
        }
      }
    }
  }

  onTabChange(index: number) {

    this.errorMsg = undefined;
    if (this.addProfileObj.start.name?.trim() && index < 2 ||
      (this.addProfileObj.buildProfile.categoryList.length > 0 && index === 2
        || (history.state?.isDataModel && this.addProfileObj.buildProfile && this.addProfileObj.buildProfile.dataModelCategoryObj && this.addProfileObj.buildProfile.dataModelCategoryObj.isFormValid))) {
      this.activeTab = this.addProfileTab[index];
      this.selectedTabIndex = index;
      this.isTabChange = !this.isTabChange;
      this.addProfileObj.start.isNameEntered = true;
    } else if (this.addProfileObj.start.name && index == 2 && this.addProfileObj.buildProfile.categoryList.length == 0) {
      this.errorMsg = "Please add at least one category."
    } else {
      this.addProfileObj.start.isNameEntered = (index !== 0) ? false : true;
    }
  }

  buildConfigurationObj(categoryList) {
    let categoryArray: any = [];
    categoryList?.forEach(item => {
      if (item.category == "Voice Service" && typeof item.parameterValues === 'object' && item.parameterValues["Model"] == "GigaCenter" &&
        item.parameterValues["Type"] == "X_000631_TDMGW") {

        item.parameterValues["RTPCodec1st_TDMGW"] = "G.711MuLaw";
      }
      if (typeof item.parameterValues === 'object' && item.parameterValues['VlanTagAction'] === false && item.category == "Voice Service") {

        // delete item.parameterValues['X_000631_VlanMuxID'];
        item.parameterValues['X_000631_VlanMuxID'] = -1;

        //delete item.parameterValues['X_000631_VlanMux8021p'];
      }
      //RG L2 Bridged
      if (typeof item.parameterValues === 'object' && (item.category == "Data Service" || item.category == "Video Service")
        && item.parameterValues["Mode"] == "RG L2 Bridged"
        && item.parameterValues["productFamily"] == "EXOS") {
        if (item.parameterValues["AnyPortAnyServiceEnabled"] == true) {
          item.parameterValues["X_000631_OUI_Enable"] = true;
          // item.parameterValues.X_000631_OUI_Enable == true;
        }
        // else {
        //   if (item.parameterValues["AnyPortAnyServiceEnabled"] == false) {
        //     item.parameterValues["X_000631_OUI_Enable"] = false;
        //   }
        // }
      }
      // if ((item.category == "Video Service")
      //   && item.parameterValues["productFamily"] == "GigaCenter"
      //   && item.parameterValues["Mode"] == "RG L2 Bridged") {
      //   if (item.parameterValues["AnyPortAnyServiceEnabled"] == true) {
      //     item.parameterValues["X_000631_OUI_Enable"] == true;
      //   }
      //   else {
      //     if (item.parameterValues["AnyPortAnyServiceEnabled"] == false) {
      //       item.parameterValues["OUI_Enable"].setValue(false);
      //     }
      //   }

      // }
      const filteredObj = _.pick(item, ['category', 'parameterValues']);
      categoryArray.push(filteredObj);
    });
    return categoryArray;
  }
  profileID: any = {};
  onSave() {
    // const formReqObj: any = {
    //   name: this.addProfileObj.start.name ? this.addProfileObj.start.name.trim() : '',
    //   description: this.addProfileObj.start.description,
    //   configurations: (this.addProfileObj.buildProfile.isFromDataModel) ? this.buildDataModelReqObj() :
    //     this.buildConfigurationObj(this.addProfileObj.buildProfile.categoryList)
    // }
    const formReqObj: any = {
      name: this.addProfileObj.start.name ? this.addProfileObj.start.name.trim() : '',
      description: this.addProfileObj.start.description,
      configurations: (this.addProfileObj.buildProfile.isFromDataModel) ? this.buildDataModelReqObj() :
        this.buildConfigurationObj(this.addProfileObj.buildProfile.categoryList)
    }
    this.loading = true;
    if (this.isNewRecord) {
      this.AddProfileSubscribe = this.service.addProfile(this.orgId, formReqObj).subscribe((res: any) => {
        if (res) {
          this.profileID = res;
          this.loading = false;
          this.router.url.includes('foundation-operations') ?
            this.ssoService.redirectByUrl([
              '/support/netops-management/operations/profiles',
              './cco/services/service-profiles/profiles',
              './cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/profiles',
              '/cco/operations/cco-subscriber-operations/operations/profiles',
            ]) :
            this.ssoService.redirectByUrl([
              '/support/netops-management/operations/profiles',
              './cco/services/service-profiles/profiles',
              './cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/profiles',
              '/cco/operations/cco-subscriber-operations/operations/profiles',
            ])

        }
      }, (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMsg = err.error.error;
      }, () => {
      });
    } else {
      this.AddProfileSubscribe = this.service.updateProfile(this.profileWizardState?.editProfile._id, this.orgId, formReqObj).subscribe((res: any) => {
        this.loading = false;
        this.router.url.includes('foundation-operations') ?
          this.ssoService.redirectByUrl([
            '/support/netops-management/operations/profiles',
            './cco/services/service-profiles/profiles',
            './cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/profiles',
            '/cco/operations/cco-subscriber-operations/operations/profiles'
          ]) :
          this.ssoService.redirectByUrl([
            '/support/netops-management/operations/profiles',
            './cco/services/service-profiles/profiles',
            './cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/profiles',
            '/cco/operations/cco-subscriber-operations/operations/profiles'
          ])

      }, (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMsg = err.error.error;
      }, () => {
      });
    }
  }

  buildDataModelReqObj() {
    const configuration: any = [];
    this.addProfileObj.buildProfile.categoryList?.forEach((item) => {
      for (let key of Object.keys(item.parameterValues)) {
        const formObj: any = {};
        const type = item.selectedCategory.filter(catgry => catgry.displayName == key).map(obj => obj.objectDefaultType);

        formObj['SetParamValueProfileName'] = key;
        formObj['SetParamValueProfileType'] = typeof item.parameterValues[key] === 'number' ? (type && type.length ? type[0] : 'int') : typeof item.parameterValues[key];
        formObj['SetParamValueProfileValue'] = item.parameterValues[key].toString();
        configuration.push({
          category: item.category,
          parameterValues: formObj
        });
      }
    })
    return configuration;
  }

  onCloseError() {
    this.errorMsg = undefined;
  }

  getCategoryObj(selectedCategory) {
    (selectedCategory || []).forEach(item => {
      for (let key of Object.keys(this.categoryConfigData)) {
        this.categoryConfigData[key]?.forEach(category => {
          if (category.displayName === item.category || category.name === item.category) {
            this.selectedCategoryType = category;
            this.addProfileObj.buildProfile.exisitingCategory.push(category.displayName);
            this.addProfileObj.buildProfile.exisitingCategory = this.addProfileObj.buildProfile.exisitingCategory.concat(this.NEW_CATEGORY_BUTTON_DISABLE);
          }
        });
      }
      item.selectedCategory = this.selectedCategoryType.parameters;
    });
    return selectedCategory;
  }

  ngOnDestroy() {
    this.addProfileObj = undefined;
    this.languageSubject.unsubscribe();
  }
  close() {
    this.router.url.includes('foundation-operations') ?
      this.ssoService.redirectByUrl([
        '/support/netops-management/operations/profiles',
        './cco/services/service-profiles/profiles',
        './cco-foundation/foundation-operations/foundation-system-operation/profiles',
        '/cco/operations/cco-subscriber-operations/operations/profiles',
      ]) :
      this.ssoService.redirectByUrl([
        '/support/netops-management/operations/profiles',
        './cco/services/service-profiles/profiles',
        './cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/profiles',
        '/cco/operations/cco-subscriber-operations/operations/profiles',
      ])

  }
  profilesBack() {
    this.router.url.includes('foundation-operations') ?
      this.ssoService.redirectByUrl([
        '/support/netops-management/operations/profiles',
        './cco/services/service-profiles/profiles',
        './cco-foundation/foundation-operations/foundation-system-operation/profiles',
        '/cco/operations/cco-subscriber-operations/operations/profiles',
      ]) :
      this.ssoService.redirectByUrl([
        '/support/netops-management/operations/profiles',
        './cco/services/service-profiles/profiles',
        './cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/profiles',
        '/cco/operations/cco-subscriber-operations/operations/profiles',
      ])
  }

}
