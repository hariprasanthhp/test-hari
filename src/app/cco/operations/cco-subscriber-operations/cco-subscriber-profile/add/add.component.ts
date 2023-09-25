import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CategoryConfigurationService } from 'src/app/support/netops-management/operations/services/category-config.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { SubscriberService } from '../../cco-subscriber-templates/subscriber-templates/subscribers/service/subscriber.service';
import { ProfileService } from '../profile.service';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
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
  innerProfileCategory: any = [];
  allProfileSubscribe: any;
  addProfileTab: Array<string> = ['Start', 'Build Profile'];
  submitted = false;
  addProfileObj: any = {
    addProfileTab: this.addProfileTab,
    start: {
      name: undefined,
      description: undefined,
      isNameEntered: false,
      count: 0
    },
    buildProfile: {
      typeofprofile: undefined,
      property: {
        Vlans: [],
        bandwidth: {},
        servicetemplate: {}
      },
      isvalid: false,
      all_service_field_valid: true,
      allfieldvalid: false,
      allProfileData: this.profileTableData, //todo merge and add the bandwidth, multi cast vlan
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
      reviewPageCategoryList: [],
    }
  };



  errorMsg: string = undefined;
  orgId: any;
  isNewRecord: boolean = true;
  AddProfileSubscribe: any;
  activeTab: string = 'Start';
  edit: any;
  name: string;
  successInfo: any;
  success: boolean = false;
  errorInfo: any;
  error: boolean;
  type: string;
  readonly NEW_CATEGORY_BUTTON_DISABLE = ['Bandwidth', 'DHCP Option82', 'Video - Multicast Range Filters', 'Video - Multicast VLAN Registration (MVR)'];
  hasScopeAccess = false;
  key: any;
  loadingRecords = true;
  saveDisabled: any;
  vlanValue: boolean = false;
  disableSave: boolean = false;
  isCOC: boolean = false;
  valid: any;
  constructor(private translateService: TranslateService,
    public ssoService: SsoAuthService,
    private categoryConfigService: CategoryConfigurationService,
    private service: ProfileService, private router: Router,
    private route: ActivatedRoute,
    private commonOrgService: CommonService,
    private titleService: Title,
    private subscriberService: SubscriberService,
  ) {
    this.isCOC = this.router.url.includes('cco/services')
    this.route.queryParams.subscribe((params: any) => {
      if (params['name']) {
        this.name = params['name'];
      } else {
        this.name = params['name'];
      }
      if (params['type']) {
        this.type = params['type'];
      } else {
        this.type = params['type'];
      }
      if (params['key']) {
        this.key = params['key']
      }
      if (this.name) {
        this.edit = true;
        this.addProfileObj.buildProfile.allfieldvalid = true;
        this.getsubscriber();
      }

    })
  }
  setTitle() {
    this.titleService.setTitle(this.isCOC ? `${this.language['ONT Services Profiles']} - ${this.language['Services Profiles']} - ${this.language['Services']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}` : `${this.language['ONT Services Profiles']}  - ${this.language['Workflow Prerequisites']} - ${this.language['configuration']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
  }
  ngOnInit(): void {

    // this.addProfileObj = {
    //   addProfileTab: this.addProfileTab,
    //   start: {
    //     name: undefined,
    //     description: undefined,
    //     isNameEntered: true
    //   },
    //   buildProfile: {
    //     allProfileData: this.profileTableData,
    //     isStepperClicked: false,
    //     innerProfileCategory: this.innerProfileCategory,
    //     disableAddCategoryBtn: true,
    //     isFromDataModel: history.state.isDataModel,
    //     dataModelCategoryObj: {
    //       isFormValid: false,
    //       name: 'Set Parameter Value',
    //       displayName: 'Set Parameter Value',
    //       parameters: history.state.dataModel,
    //     },
    //     exisitingCategory: [],
    //     categoryList: [],
    //     reviewPageCategoryList: [],
    //     property: {

    //     },
    //     voiceDataVideoServiceData: {}
    //   }
    // }
    this.orgId = this.ssoService.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.setTitle()
    });
    this.setTitle()
    let scopes = this.ssoService.getScopes();
    if (scopes && ((scopes['cloud.rbac.coc.services.serviceprofiles.serviceprofiles']) || (this.router.url.includes('cco-foundation') && scopes['cloud.rbac.foundation.configurations']))) {
      this.hasScopeAccess = true;
    }

    if (!this.hasScopeAccess) {
      this.ssoService.setPageAccess(false);
      return;
    }


    //this.getProfileData();

    // this.name = this.route.snapshot.paramMap.get("id");
    // this.type = this.route.snapshot.paramMap.get("type");
    // if (this.name) {
    //   this.edit = true;
    //   this.addProfileObj.buildProfile.allfieldvalid = true;
    //   this.getsubscriber();
    // }
    this.onTabChange(0);

    this.getallprofile();
    if (history.state?.isOverview) {
      // this.patchValue();
    }
  }

  getsubscriber() {
    this.loading = true;
    this.service.getsubscriberDetail(this.name, this.type).subscribe((data: any) => {
      this.setoption(data);
      this.loading = false;
    },
      (err) => {
        // this.error = true;
        // this.errorInfo = err.error.message;
        this.loading = false;
        this.setoption({});
      });
  }
  setoption(data) {
    this.addProfileObj = {
      addProfileTab: this.addProfileTab,
      start: {
        name: data.name ? data.name : "",
        description: data.description ? data.description : "",
        isNameEntered: true,
        count: 0
      },
      buildProfile: {
        typeofprofile: this.type == "Service Defintion" ? "service_Definition_Profile" : this.type == "Subscriber" ? "subscriber_profile" : this.type == "Bandwidth tier" ? "bandWidth_profile" : this.type == "ouiMatchList" ? "oui_profile" : this.type == 'Multicast Range' ? 'Multicast_Range_Profile' : this.type == 'Multicast VLAN' ? 'Multicast_Vlan_Profile' : "",
        property: [],
        isvalid: false,
        all_service_field_valid: true,
        allfieldvalid: true,
        // subscribertemplate: data.serviceTemplateName ? data.serviceTemplateName : "",
        // bandWidth: data.tierName ? data.tierName : "",
        // isvalid: false
        allProfileData: this.profileTableData, //todo merge and add the bandwidth, multi cast vlan
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
        reviewPageCategoryList: [],
        voiceDataVideoServiceData: {
          parameterValues: data?.acsJsonb
        }
      }
    }
    if (this.type == 'Service Defintion') {
      this.addProfileObj.buildProfile.property.servicedefinition = data;
    }
    else if (this.type == 'Subscriber') {
      this.addProfileObj.buildProfile.property.servicetemplate = data;
      this.addProfileObj.buildProfile.property.Vlans = data.vlans ? data.vlans : [];
      this.addProfileObj.buildProfile.property.servicetemplate.VlanTagAction = data?.acsJsonb?.VlanTagAction;
      // this.addProfileObj.buildProfile.property.Servicetype = data.serviceType ? data.serviceType : "",
      //   this.addProfileObj.buildProfile.property.CeVlan = data.ceVlan ? data.ceVlan : "",
      //   this.addProfileObj.buildProfile.property.VlanMode = data.vlanMode ? data.vlanMode : "",
      //   this.addProfileObj.buildProfile.property.Vlans = data.vlans ? data.vlans : [],
      //   this.addProfileObj.buildProfile.property.SubscribersPerVlan = data.subscribersPerVlan ? data.subscribersPerVlan : ""
      // if (data.serviceType == "VOICE") {
      //   this.addProfileObj.buildProfile.property.priH248GwController = data.h248Profile ? data.h248Profile : "",
      //     this.addProfileObj.buildProfile.property.secH248GwController = data.dialPlan ? data.dialPlan : "",
      //     this.addProfileObj.buildProfile.property.sipProxyServerAddress = data.sipProfile ? data.sipProfile : ""
      // }
      // if (data.serviceType == "VIDEO") {
      //   this.addProfileObj.buildProfile.property.multicastProfile = data.multicastProfile
      // }
    }
    else if (this.type == "Bandwidth tier") {
      this.addProfileObj.buildProfile.property.bandwidth = data;
    }
    else if (this.type == "ouiMatchList") {
      this.addProfileObj.buildProfile.property.oui = data.ouiListValues
    }
    else if (this.type == "Multicast Range") {
      this.addProfileObj.buildProfile.property.multirange = data.filters
    }
    else if (this.type == "Multicast VLAN") {
      this.addProfileObj.buildProfile.property.multicastvlans = data.vlans
    }
  }
  saveEnableDisable(isDisabled) {
    this.saveDisabled = isDisabled;
  }
  CopyName(val) {
    this.disableSave = val
  }
  vlanValidation(event) {
    this.vlanValue = event;
  }
  onTabChange(index: number) {

    if (this.addProfileObj.start.name) {
      //  if (this.addProfileObj.start.name.indexOf(' ') != 0)
      // if (!(this.addProfileObj.start.name.includes(" ")))
      //{
      this.activeTab = this.addProfileTab[index];
      this.addProfileObj.start.isNameEntered = true;
      this.selectedTabIndex = index;
    }
    else {
      this.addProfileObj.start.isNameEntered = (index !== 0) ? false : true;
      this.addProfileObj.buildProfile.isvalid = (index !== 1) ? false : true;
    }
    // } else {
    //   this.addProfileObj.start.isNameEntered = (index !== 0) ? false : true;
    //   this.addProfileObj.buildProfile.isvalid = (index !== 1) ? false : true;
    // }
  }
  gotolist() {
    this.router.navigate([this.isCOC ? '/cco/services/service-profiles/ONT-profile' : 'cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/ONT-profile']);
  }

  onSave() {
    //debugger;
    // this.submitted = true;
    // if (this.SubscriberForm.invalid) {
    //   return;
    // } typeofprofile: undefined,
    // property: [],
    // isvalid: false
    // console.log(this.addProfileObj)
    if (this.addProfileObj.buildProfile.typeofprofile === 'oui_profile') {
      this.valid = this.findDuplicates(this.addProfileObj.buildProfile.property.oui)
    }
    if (!this.addProfileObj.buildProfile.typeofprofile || !this.addProfileObj.buildProfile.allfieldvalid || (this.addProfileObj.buildProfile.typeofprofile === 'oui_profile' && this.valid.length !== 0)) {
      this.addProfileObj.buildProfile.isvalid = false;
      return;
    }
    else this.addProfileObj.buildProfile.isvalid = true;
    if (!this.addProfileObj.buildProfile?.isvalid) {
      return;
    }


    let data = {
      name: this.addProfileObj.start.name,
      description: this.addProfileObj.start.description ? this.addProfileObj.start.description : "",
    }
    if (this.addProfileObj.buildProfile.typeofprofile == "subscriber_profile") {
      if (this.addProfileObj.buildProfile.property.servicetemplate.vlanType == 'Global') {
        if (this.addProfileObj.buildProfile.property.servicetemplate.globalVlan && this.vlanValue) {
          return
        }
        if (!this.addProfileObj.buildProfile.property.servicetemplate.globalVlan) {
          return
        }
        if (this.addProfileObj.buildProfile.property.servicetemplate.globalVlan) {
          delete this.addProfileObj.buildProfile.property.Vlans
        }
      }

      if (this.addProfileObj.buildProfile.property.servicetemplate.vlanType == 'Static') {
        delete this.addProfileObj.buildProfile.property.servicetemplate.globalVlan
      }
      if (this.addProfileObj.buildProfile.property.servicetemplate.serviceType == "DATA") {
        if(this.addProfileObj.buildProfile.voiceDataVideoServiceData.parameterValues?.X_000631_VlanMux8021p ===undefined || !this.addProfileObj.buildProfile.voiceDataVideoServiceData.parameterValues?.productFamily||!this.addProfileObj.buildProfile.voiceDataVideoServiceData.parameterValues?.Mode){
          return
        }
        if (this.addProfileObj.buildProfile.voiceDataVideoServiceData.parameterValues?.ExosBridgedInterface?.length == 0) {
          return;
        }
        if (this.addProfileObj.buildProfile.property.servicetemplate.secondaryDnsServer && !this.addProfileObj.buildProfile.property.servicetemplate.primaryDnsServer) {
          return
        }
        delete this.addProfileObj.buildProfile.property.servicetemplate.Type
        data = Object.assign(data, {
          primaryDnsServer: this.addProfileObj.buildProfile.property.servicetemplate.primaryDnsServer,
          secondaryDnsServer: this.addProfileObj.buildProfile.property.servicetemplate.secondaryDnsServer
        });
      }
      data = Object.assign(data, {
        "serviceType": this.addProfileObj.buildProfile.property.servicetemplate.serviceType,
        "ceVlan": this.addProfileObj.buildProfile.property.servicetemplate.ceVlan,
        "Type": this.addProfileObj.buildProfile.property.servicetemplate.Type,
        "vlanMode": this.addProfileObj.buildProfile.property.servicetemplate.vlanMode,
        "ipAddressingType": "v4",  //["1", "2", "3", "4"].map(i=>Number(i));
        "globalVlan": this.addProfileObj.buildProfile.property.servicetemplate.globalVlan,
        "vlanType": this.addProfileObj.buildProfile.property.servicetemplate.vlanType,
        "vlans": this.addProfileObj.buildProfile.property?.Vlans ? this.addProfileObj.buildProfile.property.Vlans.map(String) : '',
        "subscribersPerVlan": this.addProfileObj.buildProfile.property.servicetemplate.subscribersPerVlan,
      });

      if (this.addProfileObj.buildProfile.property.servicetemplate.serviceType == "VOICE") {
        if (this.addProfileObj.buildProfile.property.servicetemplate.secondaryDnsServer && !this.addProfileObj.buildProfile.property.servicetemplate.primaryDnsServer) {
          return
        }
        if(!this.addProfileObj.buildProfile.voiceDataVideoServiceData.parameterValues?.X_000631_VlanMux8021p || !this.addProfileObj.buildProfile.voiceDataVideoServiceData.parameterValues?.Model){
          return
        }
        data = Object.assign(data, {
          primaryDnsServer: this.addProfileObj.buildProfile.property.servicetemplate.primaryDnsServer,
          secondaryDnsServer: this.addProfileObj.buildProfile.property.servicetemplate.secondaryDnsServer
        });
      }
      if (this.addProfileObj.buildProfile.property.servicetemplate.serviceType == "VOICE") {
        if (this.addProfileObj.buildProfile.property.servicetemplate.Type == 'SIP') {
          delete this.addProfileObj?.buildProfile?.property?.servicetemplate?.h248Profile
          // if (!this.addProfileObj?.buildProfile?.voiceDataVideoServiceData?.parameterValues?.ProxyServer ||!this.addProfileObj?.buildProfile?.voiceDataVideoServiceData?.parameterValues?.RTPCodec1st) {
          //   return
          // }
          if(this.addProfileObj.buildProfile.voiceDataVideoServiceData.parameterValues?.Model ==="T-Series"){
            if(!this.addProfileObj?.buildProfile?.voiceDataVideoServiceData?.parameterValues?.RegistrarServer ||!this.addProfileObj?.buildProfile?.voiceDataVideoServiceData?.parameterValues?.RegistrarServerPort||!this.addProfileObj?.buildProfile?.voiceDataVideoServiceData?.parameterValues?.UserAgentPort){
              return
            }
          }
        }
        if (this.addProfileObj?.buildProfile?.property.servicetemplate.Type == 'H.248') {
          delete this.addProfileObj?.buildProfile?.property?.servicetemplate?.sipProfile
          // if (!this.addProfileObj?.buildProfile?.voiceDataVideoServiceData?.parameterValues?.PrimaryGWController) {
          //   return
          // }
          
        }
        if (this.addProfileObj?.buildProfile?.property.servicetemplate.Type == 'MGCP') {
          // if (!this.addProfileObj?.buildProfile?.voiceDataVideoServiceData?.parameterValues?.PrimaryCallMainAgent) {
          //   return
          // }
        }
        data = Object.assign(data, {
          h248Profile: this.addProfileObj.buildProfile.property.servicetemplate.h248Profile,
          dialPlan: this.addProfileObj.buildProfile.property.servicetemplate.dialPlan,
          sipProfile: this.addProfileObj.buildProfile.property.servicetemplate.sipProfile,

        });
        if (this.addProfileObj.buildProfile.property.servicetemplate.sipProfile) {
          data = Object.assign(data, {
            DNSservers: this.addProfileObj.buildProfile.property.servicetemplate.DNSservers,
            domainname: this.addProfileObj.buildProfile.property.servicetemplate.domainname,
            dnsprimary: this.addProfileObj.buildProfile.property.servicetemplate.dnsprimary,
            dnssecondary: this.addProfileObj.buildProfile.property.servicetemplate.dnssecondary
          });
        }
      }
      if (this.addProfileObj.buildProfile.property.servicetemplate.serviceType == "VIDEO") {
        if (this.addProfileObj.buildProfile.property.servicetemplate.secondaryDnsServer && !this.addProfileObj.buildProfile.property.servicetemplate.primaryDnsServer) {
          return
        }
        if(!this.addProfileObj.buildProfile.voiceDataVideoServiceData.parameterValues?.X_000631_VlanMux8021p || !this.addProfileObj.buildProfile.voiceDataVideoServiceData.parameterValues?.productFamily||!this.addProfileObj.buildProfile.voiceDataVideoServiceData.parameterValues?.Mode){
          return
        }
        data = Object.assign(data, {
          primaryDnsServer: this.addProfileObj.buildProfile.property.servicetemplate.primaryDnsServer,
          secondaryDnsServer: this.addProfileObj.buildProfile.property.servicetemplate.secondaryDnsServer,
          QueryInterval: this.addProfileObj.buildProfile.voiceDataVideoServiceData.parameterValues.QueryInterval,
          X_000631_Dscp2PbitMapEnabled: this.addProfileObj.buildProfile.voiceDataVideoServiceData.parameterValues.X_000631_Dscp2PbitMapEnabled,
        });

        if (this.addProfileObj.buildProfile.voiceDataVideoServiceData.parameterValues.ExosBridgedInterface) {
          this.addProfileObj.buildProfile.voiceDataVideoServiceData.parameterValues.BridgedInterface = this.addProfileObj.buildProfile.voiceDataVideoServiceData.parameterValues.ExosBridgedInterface
          delete this.addProfileObj.buildProfile.voiceDataVideoServiceData.parameterValues.ExosBridgedInterface
        }
        if (this.addProfileObj.buildProfile.voiceDataVideoServiceData.parameterValues?.BridgedInterface?.length == 0) {
          return;
        }
        if (!this.addProfileObj.buildProfile.all_service_field_valid)
          return;
        data = Object.assign(data, {
          multicastProfile: this.addProfileObj.buildProfile.property.servicetemplate.multicastProfile,
          igmpProfile: this.addProfileObj.buildProfile.property.servicetemplate.igmpProfile,
          'X_000631_MaxStreams': this.addProfileObj.buildProfile.property.servicetemplate.X_000631_MaxStreams,
          BridgedInterface: this.addProfileObj.buildProfile.voiceDataVideoServiceData.parameterValues.BridgedInterface
        });
      }

    }
    else if (this.addProfileObj.buildProfile.typeofprofile == "service_Definition_Profile") {
      data = Object.assign(data, {
        serviceType: this.addProfileObj.buildProfile.property.servicedefinition.serviceType,
        serviceTemplateName: this.addProfileObj.buildProfile.property.servicedefinition.serviceTemplateName,
        //tagAction: this.addProfileObj.buildProfile.property.servicedefinition.tagAction ? this.addProfileObj.buildProfile.property.servicedefinition.tagAction : "",
        tierName: this.addProfileObj.buildProfile.property.servicedefinition.tierName,
        ouiMatchListName: this.addProfileObj.buildProfile.property.servicedefinition.ouiMatchListName,
        multicastRangeName: this.addProfileObj.buildProfile.property.servicedefinition.multicastRangeName,
        multicastVlanName: this.addProfileObj.buildProfile.property.servicedefinition.multicastVlanName
      });
    }
    else if (this.addProfileObj.buildProfile.typeofprofile == "bandWidth_profile") {
      data = Object.assign(data, {
        "upstreamPir": this.addProfileObj.buildProfile.property.bandwidth.upstreamPir ? this.service.convert_to_kpbs(this.addProfileObj.buildProfile.property.bandwidth.upstreamPir) : 0,
        "upstreamCir": this.addProfileObj.buildProfile.property.bandwidth.upstreamCir ? this.service.convert_to_kpbs(this.addProfileObj.buildProfile.property.bandwidth.upstreamCir) : 0,
        "downstreamPir": this.addProfileObj.buildProfile.property.bandwidth.downstreamPir ? this.service.convert_to_kpbs(this.addProfileObj.buildProfile.property.bandwidth.downstreamPir) : 0,
        "downstreamCir": this.addProfileObj.buildProfile.property.bandwidth.downstreamCir ? this.service.convert_to_kpbs(this.addProfileObj.buildProfile.property.bandwidth.downstreamCir) : 0
      });
    }
    else if (this.addProfileObj.buildProfile.typeofprofile == "oui_profile") {
      data = Object.assign(data, {
        'ouiListValues': this.addProfileObj.buildProfile.property.oui
      });
    }
    else if (this.addProfileObj.buildProfile.typeofprofile == "Multicast_Range_Profile") {
      data = Object.assign(data, {
        'filters': this.addProfileObj.buildProfile.property.multirange
      });
    }
    else if (this.addProfileObj.buildProfile.typeofprofile == "Multicast_Vlan_Profile") {
      let sampledata1 = this.addProfileObj.buildProfile.property.multicastvlans;
      sampledata1.forEach(element => {
        delete element.totalrange;
      })
      data = Object.assign(data, {
        'vlans': sampledata1
      });
    }
    let query: any = {};
    for (var key in data) {

      if ((data[key] == undefined || data[key] == "undefined" || data[key] == "") && typeof data[key] != 'number') {
        continue;
      }
      query[key] = data[key];

      // if (query != "") {
      //   query += "&";
      // }

      // query += key + "=" + encodeURIComponent(data[key]);

    }

    if (this.addProfileObj.buildProfile.typeofprofile == "subscriber_profile" && this.addProfileObj?.buildProfile?.voiceDataVideoServiceData?.parameterValues) {
      if (this.addProfileObj?.buildProfile?.voiceDataVideoServiceData?.parameterValues?.name) delete this.addProfileObj?.buildProfile?.voiceDataVideoServiceData?.parameterValues?.name
      query = Object.assign(query, this.addProfileObj?.buildProfile?.voiceDataVideoServiceData?.parameterValues);

      if (query['ipAddressingType']) {
        delete query['ipAddressingType'];
      }
      if (query['VlanTagAction'] == false)
        delete query['ceVlan'];
    }

    if (query.serviceType === "DATA" && query.productFamily === 'EXOS') {
      if (query.hasOwnProperty('AddressingType')) delete query.AddressingType;
      if (query.hasOwnProperty('ConnectionType')) delete query.ConnectionType;
      if (query.Mode === "RG L2 Bridged") {
        query.ServiceConnectionType = "Bridged"
      }
    }

    if (query['Type'] == "X_000631_TDMGW" && query['serviceType'] == "VOICE" && (query['ServerIP'] && !/^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/.test(query['ServerIP']))) return;

    if (this.edit && this.key !== 'copy') {
      this.loading = true;
      this.service.putdata(query, this.addProfileObj.buildProfile.typeofprofile).subscribe((data: any) => {
        this.loading = false;
        this.success = true;
        if (this.addProfileObj.buildProfile.typeofprofile == "service_Definition_Profile") {
          this.successInfo = "Service Definition Template data updated successfully"
        } else if (this.addProfileObj.buildProfile.typeofprofile == "subscriber_profile") {
          this.successInfo = "Service Profile data updated successfully"
        } else if (this.addProfileObj.buildProfile.typeofprofile == "oui_profile") {
          this.successInfo = "OUI match list data updated successfully"
        } else if (this.addProfileObj.buildProfile.typeofprofile == "Multicast_Range_Profile") {
          this.successInfo = 'RG Multicast Range Profile data updated successfully'
        } else if (this.addProfileObj.buildProfile.typeofprofile == "Multicast_Vlan_Profile") {
          this.successInfo = 'RG Multicast VLAN Profile data updated successfully'
        } else if (this.addProfileObj.buildProfile.typeofprofile == "bandWidth_profile") {
          this.successInfo = "Bandwidth Tier data updated successfully"
        }
        else {
          this.successInfo = data?.message ? data.message : data;
        }
        $("html, body").animate({ scrollTop: 0 }, "slow");
        setTimeout(() => {
          this.router.navigate([this.isCOC ? "/cco/services/service-profiles/ONT-profile" : 'cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/ONT-profile'])
        }, 1000)
        //this.router.navigate(["/cco/operations/cco-subscriber-operations/profiles/list"])
      }, (err) => {
        this.loading = false;
        this.error = true;
        if (typeof err.error.message === "object") {
          this.errorInfo = this.processErrorMsg(err.error.message);
        } else if (typeof err.error === "string") {
          this.errorInfo = err.error;
        } else if (typeof err.error === 'object' && !err.error.message) {
          if (err.error.errorMessage)
            this.errorInfo = err.error.errorMessage
          else
            this.errorInfo = this.commonOrgService.pageErrorHandle(err);
        } else {
          this.errorInfo = this.commonOrgService.pageErrorHandle(err);
        }
        $("html, body").animate({ scrollTop: 0 }, "slow");
      })
    }
    else {
      this.loading = true;
      this.service.postdata(query, this.addProfileObj.buildProfile.typeofprofile).subscribe((data: any) => {
        if (data?.message) {
          this.loading = false;
          this.success = true
          this.successInfo = data?.message ? data.message : data;
          $("html, body").animate({ scrollTop: 0 }, "slow");
          setTimeout(() => {
            this.router.navigate([this.isCOC ? "/cco/services/service-profiles/ONT-profile" : 'cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/ONT-profile'])

          }, 3000)
        }
        else {
          this.loading = false;
          this.success = true;
          if (this.addProfileObj.buildProfile.typeofprofile == "service_Definition_Profile") {
            this.successInfo = "Service Definition Template data created successfully"
          } else if (this.addProfileObj.buildProfile.typeofprofile == "subscriber_profile") {
            this.successInfo = "Service Profile data created successfully"
          } else if (this.addProfileObj.buildProfile.typeofprofile == "oui_profile") {
            this.successInfo = "OUI match list data created successfully"
          } else if (this.addProfileObj.buildProfile.typeofprofile == "Multicast_Range_Profile") {
            this.successInfo = 'RG Multicast Range Profile data created successfully'
          } else if (this.addProfileObj.buildProfile.typeofprofile == "Multicast_Vlan_Profile") {
            this.successInfo = 'RG Multicast VLAN Profile data created successfully'
          } else if (this.addProfileObj.buildProfile.typeofprofile == "bandWidth_profile") {
            this.successInfo = "Bandwidth Tier data created successfully"
          }
          else {
            this.successInfo = data;
          }
          $("html, body").animate({ scrollTop: 0 }, "slow");
          setTimeout(() => {
            this.router.navigate([this.isCOC ? "//cco/services/service-profiles/ONT-profile" : 'cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/ONT-profile'])
          }, 1000)
        }

      }, (err) => {
        this.loading = false;
        this.error = true;
        if (typeof err.error.message === "object") {
          this.errorInfo = this.processErrorMsg(err.error.message);
        } else if (typeof err.error === 'object' && !err.error.message) {
          if (err.error.errorMessage)
            this.errorInfo = err.error.errorMessage
          else
            this.errorInfo = this.commonOrgService.pageErrorHandle(err);
        } else if (typeof err.error === "string") {
          this.errorInfo = err.error;
        } else {
          this.errorInfo = this.commonOrgService.pageErrorHandle(err);
        }
        $("html, body").animate({ scrollTop: 0 }, "slow");
      })
    }

  }

  onCloseError() {
    this.errorMsg = undefined;
  }

  ngOnDestroy() {
    this.addProfileObj = undefined;
    this.languageSubject.unsubscribe();
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
  }
  findDuplicates = (arr) => {
    let sorted_arr = arr
    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] == sorted_arr[i]) {
        results.push(sorted_arr[i]);
      }
    }
    return results;
  }
  patchValue() {
    const profileData: any = history.state?.editProfile;
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
          categoryList: [...this.getCategoryObj(profileData.configurations)],
          reviewPageCategoryList: [...this.getCategoryObj(profileData.configurations)],
          categoryConfigData: [],
          property: {}
        }
      }
      this.getCategoryObj(profileData.configurations);
      this.showOverViewPage = history.state?.isOverview;
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
          reviewPageCategoryList: [],
          property: {}
        }
      }
    }
  }

  getCategoryObj(selectedCategory) {
    selectedCategory.forEach(item => {
      for (let key of Object.keys(this.categoryConfigData)) {
        this.categoryConfigData[key].forEach(category => {
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

  getProfileData(isRerender?: boolean) {
    if (this.allProfileSubscribe) this.allProfileSubscribe.unsubscribe();
    this.allProfileSubscribe = this.service.getProfileList(this.orgId).subscribe((res: any) => {
      if (res) {
        this.profileTableData = res;
        // if(!history.state.isOverview) {
        //   this.patchValue();
        // }

        // this.patchValue();
      }
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.profileTableData = [];
      if (!history.state?.isOverview) {
        //  this.patchValue();
      }
      this.errorMsg = err.error.error;
    }, () => {
      this.loading = false;
    });
  }

  getallprofile() {
    this.loading = true;
    let observables = [
      this.allProfileSubscribe = this.service.getsubscriber(),
      this.subscriberService.getsubscriber(),

      this.service.getOuiList(),
      this.service.getMultipleRange(),
      // this.service.getMultiplecastVlan()
    ]
    forkJoin(this.isCOC ? [...observables, this.subscriberService.getbandwidth()] : observables
      // this.allProfileSubscribe = this.service.getsubscriber(),
      // this.subscriberService.getsubscriber(),
      // this.subscriberService.getbandwidth(),
      // this.service.getOuiList(),
      // this.service.getMultipleRange(),
      //this.service.getMultiplecastVlan()
    ).subscribe((alldatas: any) => {
      if (alldatas?.length) {
        if (typeof alldatas[0] === 'object' && alldatas[0]) {
          alldatas[0].forEach(ele => {
            ele = Object.assign(ele, { type: "Service Definition" });
          });
        } else {
          alldatas[0] = [];
        }

        if (typeof alldatas[1] === 'object' && alldatas[1]) {
          alldatas[1].forEach(ele => {
            if (ele.serviceType == "VOICE")
              ele = Object.assign(ele, { type: "Subscriber Template(Voice)" });
            else if (ele.serviceType == "DATA")
              ele = Object.assign(ele, { type: "Subscriber Template(Data)" });
            else if (ele.serviceType == "VIDEO")
              ele = Object.assign(ele, { type: "Subscriber Template(Video)" });
            // ele = Object.assign(ele, { type: "Subscriber Template" });
          });
        } else {
          alldatas[1] = [];
        }

        if (typeof alldatas[4] === 'object' && alldatas[4]) {
          alldatas[4].forEach(ele => {
            ele = Object.assign(ele, { type: "Bandwidth Tier", innerProfileCategory: "Bandwidth" });
          });
        } else {
          alldatas[4] = [];
        }

        if (typeof alldatas[2] === 'object' && alldatas[2]) {
          alldatas[2].forEach(ele => {
            ele = Object.assign(ele, { type: "Oui Match List" });
          });
        } else {
          alldatas[2] = [];
        }

        if (typeof alldatas[3] === 'object' && alldatas[3]) {
          alldatas[3].forEach(ele => {
            ele = Object.assign(ele, { type: "Multicast Range", innerProfileCategory: "Video - Multicast Range Filters" });
          });
        } else {
          alldatas[3] = [];
        }

        // if (typeof alldatas[4] === 'object' && alldatas[4]) {
        //   alldatas[4].forEach(ele => {
        //     ele = Object.assign(ele, { type: "Multicast VLAN", innerProfileCategory: 'Video - Multicast VLAN Registration (MVR)' });
        //   });
        // } else {
        //   alldatas[4] = [];
        // }

        this.loading = false;
        this.profileTableData = [...alldatas[0], ...alldatas[1], ...alldatas[2], ...alldatas[3], ...alldatas[4]];
        this.addProfileObj.buildProfile.allProfileData = this.profileTableData;
        this.loadingRecords = false;
      }
      else this.profileTableData = [];
    }, err => {
      this.pageErrorHandle(err);
      this.loading = false;
      this.loadingRecords = false;
    })
  }

  processErrorMsg(msg = {}) {
    let msgs = [];
    if (typeof msg === 'object') {
      let keys = Object.keys(msg);
      keys.forEach(key => {
        if (typeof msg[key] === 'object') {
          msgs.push(`${key}: ${msg[key].join(',')}`);
        } else {
          msgs.push(`${key}: ${msg[key]}`);
        }
      })
    }

    return msgs.join(', ');

  }
}
