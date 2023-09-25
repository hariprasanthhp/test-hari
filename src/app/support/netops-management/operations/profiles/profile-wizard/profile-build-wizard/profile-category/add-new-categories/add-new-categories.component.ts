import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { IPv6AddressService } from 'src/app/shared/services/ipv6-address.service';
import { TranslateService } from 'src/app-services/translate.service';
import { Router } from '@angular/router';
import { Console } from 'console';
import { element } from 'protractor';
import { environment } from 'src/environments/environment';
import { ExperianceIQService } from 'src/app/support/support-application/shared/service/experiance-iq.service';
import { ProfileService } from 'src/app/support/netops-management/operations/services/profile.service';

@Component({
  selector: 'app-add-new-categories',
  templateUrl: './add-new-categories.component.html',
  styleUrls: ['./add-new-categories.component.scss']
})
export class AddNewCategoriesComponent implements OnInit, OnDestroy {

  @Output() errorOutput = new EventEmitter<any>();

  language: any;
  languageSubject;
  disableots: boolean = false;
  dnsAlreadyExist: boolean = false;
  defaultProductFamily: string = 'GigaCenter';
  selectedCategoryName: string = '';
  preSelectedCategoryName: string = '';
  formFieldObjects: any = [];
  validatedArray: any = [];
  hostnameValidateString: any;
  dependencyFieldData: any = [];
  newCategory: string = '';
  subscribe: any = [];
  selectedPort: any = []
  memberETHPorts: any = []
  memberETHVPorts: any = []
  dataExosBridgedSelectedPorts: any = []
  videoExosBridgedSelectedPorts: any = []
  isCategoryDoneBtnDisable: boolean = false;
  serviceConnectionType: string = '';
  isSetParamValueProfileValueInvalidInt: boolean = true;
  defaultRadioBtnVal = [{
    "value": true,
    "displayName": "Enabled"
  }, {
    "value": false,
    "displayName": "Disabled"
  }];
  categoryAllObjectArray: any = [];
  isValidHostNameIPAddress: boolean = true;
  versionImpliesObj: any = {};
  modeImpliesObj: any = {};
  combainedImplieObj: any = {};
  setParameterError: string = '';
  isValidMacAddress: boolean = true;
  isAlreadyExisit: boolean = false;
  allProfileData: any = [];
  passwordIconShow: boolean = false;
  _buildProfileObj: any = {};
  isNotes: boolean = false;
  readonly MAXVALUEVALIDATION = ['DHCPLeaseTime', 'DestPortRangeMax', 'DestPort', 'DestMask', 'SourcePortRangeMax', 'SourcePort', 'DHCPv6LeaseTime']
  readonly NEW_CATEGORY_BUTTON_DISABLE = ['Bandwidth', 'DHCP Option82', 'Video - Multicast Range Filters', 'Video - Multicast VLAN Registration (MVR)']
  readonly IP_ADDRESS_PATERN = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  readonly IPV6_ADDRESS_PATERN = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;
  readonly IP_ADDRESS_VALIDATION = ['IPv4MulticastAddress', 'IPAddress', 'IPv6Address'];
  readonly IP_ADDRESS_HOSTNAME_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/;
  readonly CATEGORY_DONE_BTN_RULE = ['DNS Host Mapping', 'Support User Credentials', 'Bandwidth', 'DHCP Option82', 'PPPoE', '2.4GHz WIFI Radio', '5GHz WIFI Radio', 'WiFi Country'];
  readonly errorMsgForInterFacID = `Please satisfy the String Pattern "^([0-9a-fA-F]{1,4}:){3}([0-9a-fA-F]{1,4})$"`;
  readonly HOSTNAME_VALIDATION = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
  passpoint: any = [];
  errorInfo: string;
  error: boolean;
  dev: boolean;
  @Input()
  set categoryType(data: any) {
    this._categoryType = [];
    this.selectedCategoryName = data.name;
    this.newCategory = data.displayName;
    this.categoryAllObjectArray = data.parameters;
    let searchableFields = ["X_000631_McastFilter", "X_000631_MvrProfile", "Tz", "Option82Profile", "X_CALIX_SXACC_BW_PROFILE"];
    this.validHostName = false;
    data?.parameters?.forEach((formField) => {
      let searchable = false;
      if (searchableFields.indexOf(formField.name) !== -1) {
        searchable = true;
      }

      if (formField.name == 'productFamily' && this.router.url.includes('cco-foundation') && (this.selectedCategoryName === 'Data Service' || this.selectedCategoryName === 'Video Service' ||
        this.selectedCategoryName === 'DHCPv6 Server')) {
        formField.valueEnums = [{
          "value": "EXOS",
          "displayName": "EXOS-Powered GigaSpire"
        }]
      }
      if (formField.name == 'Model' && this.router.url.includes('cco-foundation') && (this.selectedCategoryName === 'Voice Service')) {

        formField.valueEnums = [{
          "value": "GigaCenter",
          "displayName": "GigaSpire(GS4227E,GS4220E,GS4227,GS4227W,GS4237)"
        }]
      }
      if (formField.name == 'Type' && this.router.url.includes('cco-foundation') && (this.selectedCategoryName === 'Voice Service')) {

        formField.valueEnums = [{
          "value": "SIP",
          "displayName": "SIP"
        }, {
          "value": "H.248",
          "displayName": "H.248",
          "requires": {
            "Model": "GigaCenter"
          }
        }, {
          "value": "MGCP",
          "displayName": "MGCP",
          "requires": {
            "Model": "GigaCenter"
          }
        }]
      }
      if (data.name == "WiFi SSID for EXOS") {
        let dataParam = [];
        data.parameters.forEach(element => {
          if (element.name == "WlanIndex") {
            element.valueEnums.forEach(enums => {
              if (!enums.displayName.includes("Guest")) {
                dataParam.push(enums);
              }
            });
            element.valueEnums = dataParam;
          }
        });

      }

      if (this.router.url.split('/')[1] !== 'support' && this.router.url.split('/')[1] !== 'cco') {
        if (formField.displayName == 'VLAN Tag Action') {
          formField.displayName = 'VLAN EXA Tag Action'
        }
      }

      // if (this.buildProfileObj.isFromDataModel) {
      //   if (formField.displayName == "InternetGatewayDevice.X_000631_Device.SysLog.PrimaryServer") {

      //     formField.type = "IPAddress";
      //   }
      //   // if (formField.displayName == "InternetGatewayDevice.X_000631_Device.SysLog.PrimaryServer") {
      //   //   formField.type = "IPAddress";
      //   // }
      // }
      const fieldObj = {
        categoryName: data.name,
        displayName: formField.displayName,
        type: this.findFieldType(formField),
        objectDefaultType: formField.type,
        name: formField.name,
        hidden: formField.hidden,
        stringPattern: (this.buildProfileObj.isFromDataModel && (formField.type === 'unsignedInt' || formField.type === 'int')) ? (/^[-+]?[0-9]+$/) : formField.stringPattern,
        mandatory: formField.mandatory,
        defaultValue: (formField.defaultValue !== undefined || formField.displayName === 'SPID') ? (formField.displayName === 'SPID') ? this.getSPID() : (formField.name == 'productFamily' && this.router.url.includes('cco-foundation') && (this.selectedCategoryName === 'Data Service' || this.selectedCategoryName === 'Video Service' ||
          this.selectedCategoryName === 'DHCPv6 Server')) ? 'EXOS' : formField.defaultValue : '',
        description: formField.description,
        display: this.displayFormField(formField, this._categoryType),
        requires: formField.requires,
        valueEnums: this.formValuemEnumData(formField, data.parameters),
        watermark: formField.watermark ? formField.watermark : '',
        isIPAddress: (this.IP_ADDRESS_VALIDATION.indexOf(formField.type) !== -1),
        unChangedRadioBtnDisplay: (formField.valueEnums) ? false : true,
        //disableFormField: (formField?.defaultValue === 'Bridge' && !this.dev) ? true : this.isDisableFormField(formField),
        disableFormField: this.isDisableFormField(formField),
        tooltip: formField.tooltip,
        implies: formField.implies,
        minValue: formField.minValue,
        maxValue: formField.maxValue,
        maxStringLength: (formField.maxStringLength < 0 || !formField.maxStringLength) ? undefined : formField.maxStringLength,
        minStringLength: (formField.minStringLength < 0 || !formField.minStringLength) ? undefined : formField.minStringLength,
        isHostNameIPAddresValid: true,
        searchable: searchable,
        passwordIcon: (formField.passwordIcon) ? formField.passwordIcon : false,
        notes: ""
      }
      if (formField.requires) {
        this.dependencyFieldData.push(formField.requires);
      }
      if (this.selectedCategoryName == "Voice Service" && formField.name == "OptionsTimerSwitch") {

        fieldObj.defaultValue = formField.defaultValue[0].value
      }
      if (this.selectedCategoryName == "Data Service" && formField.name == "productFamily") {

        this.dtsDefaultValue = formField.defaultValue
      }


      this._categoryType.push(fieldObj);
    });

    this.buildFormGroup(this._categoryType);
    this.isCategoryDoneBtnDisable = !(this.CATEGORY_DONE_BTN_RULE.indexOf(this.selectedCategoryName) !== -1);
  }
  @Input()
  set buildProfileObj(value: any) {
    this.allProfileData = value.allProfileData;
    this._buildProfileObj = value;
  };
  get buildProfileObj() {
    return this._buildProfileObj;
  }
  get categoryType() {
    return this._categoryType;
  }

  myFormGroup: FormGroup;
  _categoryType: any = [];

  constructor(
    private iPv6AddressService: IPv6AddressService,
    public router: Router,
    private translateService: TranslateService,
    public experianceIQService: ExperianceIQService,
    private profileService: ProfileService
  ) {
    let base = `${environment.API_BASE}`;
    if ((base.indexOf('/dev.api.calix.ai') > -1) || (base.indexOf('/stage.api.calix.ai') > -1)) {
      this.dev = true;
    } else {
      this.dev = false;
    }
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    if (this._buildProfileObj.categoryList?.length > 0) {
      this.passpoint = this._buildProfileObj.categoryList.filter(el => { return (el?.category === 'myCommunityIQ Traffic') })
    }

  }

  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }
  setOptionsTimerSwitchDefaultValue(fieldName) {
    const filterData = this.categoryType.filter(item => {
      return (item.name === fieldName);
    })[0];
    const defaultVal = filterData.defaultValue.filter(value => {
      return (value.condition.Revertive === this.myFormGroup.value.Revertive);
    })[0];
    return defaultVal.value;
  }

  getSPID(): any {
    return window.localStorage.getItem('calix.spid');
  }

  closeAlert() {
    this.error = false;
    this.sameNetworkError = false;
  }

  onSubmit(formValue) {
    if ((this.isFormInvalid(formValue) || !this.checkFormValidBeforSubmit())) {
      return;
    }
    let reviewCategoryObj: any;
    let categoryObj: any;

    if (this.passpoint.length > 0) {
      this.error = true;
      this.sameNetworkError = false;
      this.errorInfo = "SmartTown Wi-Fi Traffic config cannot be coupled with other configs in the same profile.";
      return
    }

    if (this._buildProfileObj?.categoryList?.length > 0) {
      if (formValue.value.type === 'Bridge') {
        this.error = true;
        this.sameNetworkError = false;
        this.errorInfo = "SmartTown Wi-Fi Traffic config cannot be coupled with other configs in the same profile.";
        return
      }
    }

    if (this.selectedCategoryName == "DHCP Server" && this.isSameNetworkIpAdrs) {
      this.sameNetworkError = true;
      this.error = false;
      this.errorInfo = "The device IP address, the beginning IP address and the ending IP address are not in the same network.";
      return
    }

    if (this.selectedCategoryName === 'ExperienceIQ Restrictions' ||
      this.selectedCategoryName === 'ACL Entry for Remote Access' ||
      this.selectedCategoryName === 'ACL Entry for VoIP'
    ) {
      let parameterValues: any = {};
      if (this.selectedCategoryName === 'ExperienceIQ Restrictions') {
        delete this.myFormGroup.value.experienceIqForm.app;
        delete this.myFormGroup.value.experienceIqForm.website;
        parameterValues = this.myFormGroup.value.experienceIqForm
      } else if (this.selectedCategoryName === 'ACL Entry for Remote Access') {
        parameterValues = this.myFormGroup.value.aclForRemoteAccessForm;
        parameterValues.RemoteAcl = String(parameterValues.RemoteAcl);
      } else if (this.selectedCategoryName === 'ACL Entry for VoIP') {
        parameterValues = this.myFormGroup.value.aclForVoipForm;
        parameterValues.SipAcl = String(parameterValues.SipAcl);
      }

      categoryObj = {
        category: this.selectedCategoryName,
        parameterValues: parameterValues,
        selectedCategory: this.categoryType,
      }
      reviewCategoryObj = {
        category: this.selectedCategoryName,
        parameterValues: parameterValues,
        selectedCategory: this.categoryType,
      }
    } else {
      const validField: any = this.categoryType.filter(field => {
        return ((field.display && !field.hidden));
      });
      let formObj: any = {};
      this.modeImpliesObj = {};
      validField.forEach((item) => {
        if ((item.objectDefaultType === 'int' || item.objectDefaultType === 'unsignedInt') && formValue.value[item.name] !== '') {
          formObj[item.name] = Number(formValue.value[item.name]);
        } else {
          formObj[item.name] = formValue.value[item.name];
        }
        if (item.implies) {
          this.modeImpliesObj = Object.assign(this.modeImpliesObj, item.implies[this.myFormGroup.value[item.name]]);
        }
      });
      if (this.selectedCategoryName === 'QOS Rule') {
        this.modeImpliesObj = Object.assign(this.modeImpliesObj, { 'ClassificationEnable': true });
      }
      categoryObj = {
        category: this.selectedCategoryName,
        parameterValues: Object.assign(_.pickBy(formObj, function (value, key) {
          return !(value === undefined || value === "" || value === " ");
        }), _.pickBy(this.modeImpliesObj, function (value, key) {
          return !(value === undefined || value === "" || value === " ");
        })),
        selectedCategory: this.categoryType,
      }
      reviewCategoryObj = {
        category: this.selectedCategoryName,
        parameterValues: _.pickBy(formObj, function (value, key) {
          return !(value === undefined || value === "" || value === " ");
        }),
        selectedCategory: this.categoryType,
      }
    }

    this.buildProfileObj.reviewPageCategoryList.push(reviewCategoryObj);
    this.buildProfileObj.categoryList.push(categoryObj);
    this.buildProfileObj.addNewCategory = false;
    this.buildProfileObj.disableAddCategoryBtn = this.NEW_CATEGORY_BUTTON_DISABLE.indexOf(this.selectedCategoryName) === -1;
    this.buildProfileObj.exisitingCategory.push(this.newCategory);
    if (this.buildProfileObj.exisitingCategory.length === 1) {
      this.buildProfileObj.exisitingCategory = this.buildProfileObj.exisitingCategory.concat(this.NEW_CATEGORY_BUTTON_DISABLE);
    }
  }

  isFormInvalid(formValue) {
    let isInvalidForm: boolean = false;
    this.categoryType.forEach(formField => {
      if (formField.display && !isInvalidForm) {
        isInvalidForm = (this.myFormGroup.controls[formField.name] && this.myFormGroup.controls[formField.name].invalid);
        return;
      }
    });
    return isInvalidForm;
  }
  findFieldType(formField) {
    if ((formField.valueEnums || formField.implies || formField.innerProfileCategory) && (formField.type === 'stringArray' ||
      formField.type === 'unsignedInt' || formField.type === 'string' || formField.type === 'int' ||
      formField.type === 'innerProfile') && formField.displayName) {
      return 'dropDown';
    } else if ((!formField.valueEnums || !formField.implies || !formField.innerProfileCategory) && formField.type !== 'boolean' && formField.displayName) {
      return 'textBox';
    } else if (formField.type === 'boolean' && formField.displayName) {
      return 'radio';
    }
  }

  displayFormField(formField, formFieldArray) {
    let displayField: boolean = true;
    if (formField.requires) {
      for (let key of Object.keys(formField.requires)) {
        formFieldArray.forEach(element => {
          if (element.name === key && displayField && typeof formField.requires[key] !== 'object' && formField.requires[key] !== null) {
            displayField = (formField.requires[key] === element.defaultValue && !element.hidden);
          } else if (element.name === key && typeof formField.requires[key] === 'object' && formField.requires[key] !== null && displayField) {
            displayField = (formField.requires[key]["$in"].indexOf(element.defaultValue) !== -1 && element.display)
          }
        });
      }
    } else {
      displayField = true;
    }
    if (this.selectedCategoryName === 'Video Service') {
      displayField = true;
      if (this.selectedCategoryName == "Video Service" && this.router.url.includes('cco-foundation')
        && formField.name === "X_000631_OUI_FilterList"
        && formField.requires["productFamily"] == "EXOS") {
        displayField = false;
      }
      else {
        displayField = this.videoServiceFieldDisplay(formField, formFieldArray, displayField);
      }

    }
    return displayField;
  }
  videoServiceFieldDisplay(formField, formFieldArray, displayField) {
    const requiredArray: any = formFieldArray.filter(item => {
      return (item.name === 'Mode')
    });
    if (formField.requires) {
      for (let key of Object.keys(formField.requires)) {
        formFieldArray.forEach(item => {
          if (displayField) {
            if (item.implies && key === 'ServiceConnectionType' && item.name === 'Mode') {
              const reqFieldDefaultVal: any = item.implies[item.defaultValue][key];
              displayField = (formField.requires[key]['$in']) ? formField.requires[key]['$in'].indexOf(reqFieldDefaultVal) !== -1 :
                formField.requires[key] === reqFieldDefaultVal;
              this.serviceConnectionType = reqFieldDefaultVal;
            } else if (key === item.name && !item.hidden) {
              displayField = formField.requires[key] === item.defaultValue;
            }
          }
        });
      }
    };
    return displayField;
  }
  isDisableFormField(formField) {
    return this.categoryType.filter(item => {
      return (item.name === formField.name + 'Control' && item.hidden && (item.objectDefaultType === 'boolean' || item.objectDefaultType === 'unsignedInt'));
    }).length > 0;

  }

  formValuemEnumData(formField, categoryType) {
    let innerProfile = [];

    if (formField.name == 'productFamily' && this.router.url.includes('cco-foundation') && (this.selectedCategoryName === 'Data Service' || this.selectedCategoryName === 'Video Service')) {
      // const catType = categoryType.filter(field => field.name =="productFamily");
      var type = categoryType[0];
      if (type) {
        type.defaultValue = "EXOS";

        categoryType[0] = type;
      }

    }

    let valueEnumData: any = [{ value: '', displayName: '' }];
    if (formField.type === 'innerProfile') {
      if (formField.innerProfileCategory === 'DHCP Option82') {
        innerProfile = this.allProfileData.filter(profile => {
          return (profile.innerProfileCategory === formField.innerProfileCategory)
        });
      }
      if (formField.innerProfileCategory === 'Video - Multicast Range Filters') {
        innerProfile = this.allProfileData.filter(profile => {
          return (profile.innerProfileCategory === formField.innerProfileCategory)
        });
      }
      if (formField.innerProfileCategory === 'Bandwidth') {
        innerProfile = this.allProfileData.filter(profile => {
          return (profile.innerProfileCategory === formField.innerProfileCategory)
        });
      }
      if (formField.innerProfileCategory === 'Video - Multicast VLAN Registration (MVR)') {
        innerProfile = this.allProfileData.filter(profile => {
          return (profile.innerProfileCategory === formField.innerProfileCategory)
        });
      }
      innerProfile.forEach((category) => {
        const valueObj: any = {
          value: category._id,
          displayName: category.name
        };
        valueEnumData.push(valueObj);
      });
      return valueEnumData;
    } else {
      const tempValueEnum: any = [];
      if (formField.valueEnums && formField.valueEnums.length > 0) {
        formField.valueEnums.forEach(item => {
          let isValueNeeded: boolean = true;
          if (item.requires) {
            for (let key of Object.keys(item.requires)) {
              const reqArray = categoryType.filter(field => {
                return (key === field.name);
              });
              // if (reqArray.length > 0) {
              //   isValueNeeded = item.requires[key] === reqArray[0].defaultValue;
              // }
              if (reqArray.length > 0) {
                // isValueNeeded = item.requires[key] === reqArray[0].defaultValue;
                if (typeof item.requires[key] === 'object' && item.requires[key] !== null && item.requires[key]["$in"] != null) {
                  isValueNeeded = (item.requires[key]["$in"].indexOf(reqArray[0].defaultValue) !== -1)
                } else {
                  isValueNeeded = item.requires[key] === reqArray[0].defaultValue;
                }
              }
            }
          };
          if (isValueNeeded)
            tempValueEnum.push(item);
        })
      }
      return valueEnumData = tempValueEnum.length > 0 ? tempValueEnum : formField.type === 'boolean' ? this.defaultRadioBtnVal : '';
    }
  }
  dtsDefaultValue: string = "";
  passwordCheck: boolean = false;
  buildFormGroup(formGroup) {

    // if (this.selectedCategoryName !== 'Data Service') {
    //   this.dataExosBridgedSelectedPorts = [];
    // }
    // if (this.selectedCategoryName !== 'Video Service') {
    //   this.videoExosBridgedSelectedPorts = [];
    // }

    this.dataExosBridgedSelectedPorts = [];
    this.videoExosBridgedSelectedPorts = [];
    this.selectedPort = [];
    this.memberETHPorts = [];
    this.memberETHVPorts = [];


    let group = {}
    // this.isNotes = false;
    formGroup.forEach(inputField => {
      if (inputField.type === 'textBox' || inputField.type === 'radio' || inputField.type === 'dropDown') {
        if (inputField.type === 'radio') {
          group[inputField.name] = new FormControl(inputField.defaultValue);
        } else if (inputField.type !== 'textBox') {
          if (inputField.mandatory) {
            group[inputField.name] = new FormControl(inputField.defaultValue, Validators.required);
          } else {
            group[inputField.name] = new FormControl(inputField.defaultValue);
          }
        } else {
          group[inputField.name] = this.addValidationForFormField(inputField);
        }
      }
    });
    group['experienceIqForm'] = this.experianceIQService.getExperienceIqFormGroup();
    group['aclForRemoteAccessForm'] = this.profileService.getAclForRemoteAccessForm();
    group['aclForVoipForm'] = this.profileService.getAclForVoipForm();
    let uniqueKeys = Object.keys(this.dependencyFieldData.reduce(function (result, obj) {
      return Object.assign(result, obj);
    }, {}));
    this.myFormGroup = new FormGroup(group);
    const radionBtnOnly: any = this._categoryType.filter(item => {
      return (item.type !== 'radio');
    })
    if (radionBtnOnly.length === 0 && this.selectedCategoryName === 'Set Parameter Value') {
      this.buildProfileObj.isFormValid = this.myFormGroup.valid;
      this.buildProfileObj.categoryList = [];
      this.buildProfileObj.reviewPageCategoryList = [];
      this.onSubmit(this.myFormGroup);
    }
    this.myFormGroup.valueChanges.subscribe((formValue) => {
      this.modeImpliesObj = {};
      // this.isValidMacAddress = true;
      if (this.CATEGORY_DONE_BTN_RULE.indexOf(this.selectedCategoryName) !== -1) {
        this.isCategoryDoneBtnDisable = this.validateDoneBtnEnable(formValue);
      }
      this.setParameterValidation();
      this.SSIDValidation();
      this.DNSValidation();
      // if (this.selectedCategoryName == "Data Service" || this.selectedCategoryName == "Video Service") {
      //   this.onCommaSeparateValidation('OUI_FilterList');
      // }



      if ((this.selectedCategoryName == "Data Service" || this.selectedCategoryName == "Video Service") && this.myFormGroup.value["productFamily"] == "EXOS") {
        this.onCommaSeparateValidation('X_000631_OUI_FilterList');
      }
      else if (this.selectedCategoryName == "Video Service" && this.myFormGroup.value["productFamily"] == "GigaCenter") {

        this.onCommaSeparateValidation('OUI_FilterList');

      }

      this.categoryType.forEach(element => {
        // Start
        //  if (element.name === 'DownstreamCIR') {
        if (element.objectDefaultType === 'HostNameOrIPAddress' && element.display && element.name) {
          //element.isHostNameIPAddresValid = this.validateHostNAmeAndIPAddress(element.name);
          if (this.selectedCategoryName == 'Voice Service' && (element.name == "ProxyServer" || element.name == "ProxyServerSecondary") &&
            this.myFormGroup.controls["Type"].value == "SIP" && this.myFormGroup.controls["Model"].value != "T-Series") {
            element.isHostNameIPAddresValid = this.validateHostNAmeAndIPAddressForSIP(element.name);
          }
          else {
            element.isHostNameIPAddresValid = this.validateHostNAmeAndIPAddress(element.name);
          }
        }

        element.valueEnums = this.validateValueEnumValues(element);
        //this.onChangeServiceDropDown(element);
        element.display = true;
        if (element.requires && element.name) {
          for (let key of Object.keys(element.requires)) {
            const isDisplaying: any = this.categoryType.filter(item => {
              return (item.name === key)
            });
            if (element.display) {
              element.display = element.requires[key] === (this.myFormGroup.controls[key] && this.myFormGroup.controls[key].value);
              if (key === 'ServiceConnectionType') {
                const requiredArray: any = this.categoryType.filter(item => {
                  return (item.name === 'Mode')
                });
                const reqFieldDefaultVal: any = requiredArray[0].implies[this.myFormGroup.controls['Mode'].value][key];

                element.display = (element.requires[key]["$in"]) ? element.requires[key]["$in"].indexOf(reqFieldDefaultVal) !== -1 :
                  element.requires[key] === reqFieldDefaultVal;
                this.serviceConnectionType = reqFieldDefaultVal;
              } else if (typeof element.requires[key] !== 'object' && element.requires[key] !== null && !this.myFormGroup.controls[key]) {
                element.display = (element.requires[key] === this.validateIAPDCtrl(isDisplaying));
              } else if (typeof element.requires[key] !== 'object' && element.requires[key] !== null && this.myFormGroup.controls[key]) {
                element.display = (element.requires[key] === this.myFormGroup.controls[key].value && (isDisplaying[0].display || isDisplaying[0].hidden));
              } else if (typeof element.requires[key] === 'object' && element.requires[key] !== null && this.myFormGroup.controls[key]) {
                element.display = (element.requires[key]["$in"].indexOf(this.myFormGroup.controls[key].value) !== -1 && (isDisplaying[0].display || isDisplaying[0].hidden))
              }


              if (this.selectedCategoryName == 'Data Service' && element.name === 'X_CALIX_SXACC_AE_L2_BRIDGE_MBR_PORTS' && this.memberETHPorts.length === 0) {
                this.memberETHPorts = element.defaultValue;
              }
              else {
                if (this.selectedCategoryName == 'Data Service' && element.name === 'X_CALIX_SXACC_AE_L2_BRIDGE_MBR_PORTS') {
                  this.memberETHVPorts = []
                }

              }
              if (this.selectedCategoryName == 'Video Service' && element.name === 'X_CALIX_SXACC_AE_L2_BRIDGE_MBR_PORTS' && this.memberETHVPorts.length === 0) {
                this.memberETHVPorts = element.defaultValue;
              } else {
                if (this.selectedCategoryName == 'Video Service' && element.name === 'X_CALIX_SXACC_AE_L2_BRIDGE_MBR_PORTS') {
                  this.memberETHPorts = [];
                }

              }


              if (this.selectedCategoryName === 'Data Service' && element.name === "X_CALIX_SXACC_BW_PROFILE" && key === "$or") {
                element.display = false;

                let arr: any = element.requires[key]
                //if(arr.len)
                if ((element.requires[key][0]["productFamily"] === this.myFormGroup.controls["productFamily"].value)) {
                  element.display = true;
                  element.notes = ""
                  //element.tooltip = undefined;

                }


                if ((element.requires[key][1]["productFamily"] === this.myFormGroup.controls["productFamily"].value)) {
                  element.display = true;
                  //element.tooltip = "For_ActiveEthernet_mode_only";
                  this.isNotes = true;
                  element.notes = "Only_applicable_for_EXOS_4227_AE_mode"
                }
              }

              if (key === 'ProxyServer' && this.myFormGroup.value[key] !== '' && this.myFormGroup.controls['Model'].value === 'GigaCenter' && this.myFormGroup.controls['Type'].value === 'SIP') {
                element.display = true;
              }
              if (key === 'ProxyServer' && this.myFormGroup.value[key] !== '' && this.myFormGroup.controls['Model'].value === 'T-Series') {
                element.display = true;
              }
              if (key === 'TLANEnable' && element.name === 'USMaxMcastBcastRate') {
                element.display = (this.myFormGroup.controls['AdvancedSettings'].value && !this.myFormGroup.controls['TLANEnable'].value);
                if (element.display && this.selectedPort.length === 0) {
                  this.selectedPort = element.defaultValue;
                }
              }
              if (key === 'AnyPortAnyServiceEnabled' && element.name === 'BridgedInterface') {
                element.display = (!this.myFormGroup.controls['AnyPortAnyServiceEnabled'].value && this.myFormGroup.controls['Mode'].value === 'RG L2 Bridged' &&
                  this.myFormGroup.controls['productFamily'].value === 'GigaCenter');
                if (element.display && this.selectedPort.length === 0) {
                  this.selectedPort = element.defaultValue;
                }
              }
              // else{
              //   this.selectedPort =[];
              // }

              if (key === 'AnyPortAnyServiceEnabled' && element.name === 'ExosBridgedInterface') {
                element.display = (!this.myFormGroup.controls['AnyPortAnyServiceEnabled'].value && this.myFormGroup.controls['Mode'].value === 'RG L2 Bridged' &&
                  this.myFormGroup.controls['productFamily'].value === 'EXOS');
                if (element.display && this.videoExosBridgedSelectedPorts.length === 0) {
                  this.videoExosBridgedSelectedPorts = element.defaultValue;
                }

              }
              if (this.selectedCategoryName == 'Data Service' && key === 'ServiceConnectionType' && element.name === 'ExosBridgedInterface') {
                element.display = (this.myFormGroup.controls['Mode'].value === 'RG L2 Bridged' &&
                  this.myFormGroup.controls['productFamily'].value === 'EXOS');
                if (element.display && this.dataExosBridgedSelectedPorts.length === 0) {
                  this.dataExosBridgedSelectedPorts = element.defaultValue;
                }

              }
              if ((this.selectedCategoryName == "Data Service" || this.selectedCategoryName == "Video Service")
                && this.myFormGroup.value["Mode"] == "RG L2 Bridged" && element.name === "X_000631_OUI_FilterList"
                && this.myFormGroup.value["productFamily"] == "EXOS") {
                if (this.myFormGroup.value["AnyPortAnyServiceEnabled"] == true) {
                  element.display = true;
                }
                else if (this.myFormGroup.value["AnyPortAnyServiceEnabled"] == false) {
                  element.display = false;
                }
              }
              else if ((this.selectedCategoryName == "Data Service" || this.selectedCategoryName == "Video Service")
                && element.name === "X_000631_OUI_FilterList"
                && this.myFormGroup.value["productFamily"] == "EXOS") {
                element.display = false;
              }
              // else if (this.selectedCategoryName == "Video Service" && 
              // this.myFormGroup.value["Mode"] == "RG L2 Bridged" && 
              // this.myFormGroup.value["productFamily"] == "GigaCenter" && element.name === "OUI_FilterList") {
              //   if (this.myFormGroup.value["AnyPortAnyServiceEnabled"] == true) {
              //     element.display = true;
              //   }
              //   else if (this.myFormGroup.value["AnyPortAnyServiceEnabled"] == false) {
              //     element.display = false;
              //   }

              // }



              if (element.display) {
                if (element.mandatory && element.stringPattern) {
                  this.myFormGroup.controls[element.name].setValidators([Validators.required, Validators.pattern(element.stringPattern)]);
                } else if (element.mandatory && element.maxValue && (element.minValue || element.minValue === 0)) {
                  this.myFormGroup.controls[element.name].setValidators([Validators.required, Validators.pattern(/^[-+]?[0-9]+$/), Validators.max(element.maxValue), Validators.min(element.minValue)]);
                } else if (element.mandatory && !element.maxValue && (element.minValue || element.minValue === 0)) {
                  this.myFormGroup.controls[element.name].setValidators([Validators.required, Validators.pattern(/^[-+]?[0-9]+$/), Validators.max(element.maxValue), Validators.min(element.minValue)]);
                } else if (element.mandatory && element.maxValue && (!element.minValue && element.minValue !== 0)) {
                  this.myFormGroup.controls[element.name].setValidators([Validators.required, Validators.pattern(/^[-+]?[0-9]+$/), Validators.max(element.maxValue), Validators.min(element.minValue)]);
                } else if (element.isIPAddress) {
                  if (element.mandatory && element.objectDefaultType !== 'IPv6Address') {
                    this.myFormGroup.controls[element.name].setValidators([Validators.required,
                    Validators.pattern(this.IP_ADDRESS_PATERN)]);
                  } else if (!element.mandatory && element.objectDefaultType !== 'IPv6Address') {
                    this.myFormGroup.controls[element.name].setValidators([
                      Validators.pattern(this.IP_ADDRESS_PATERN)]);
                  }
                  if (element.mandatory && element.objectDefaultType === 'IPv6Address') {
                    this.myFormGroup.controls[element.name].setValidators([Validators.required,
                    Validators.pattern(this.IPV6_ADDRESS_PATERN)]);


                  } else if (!element.mandatory && element.objectDefaultType === 'IPv6Address') {
                    this.myFormGroup.controls[element.name].setValidators([
                      Validators.pattern(this.IPV6_ADDRESS_PATERN)]);
                  }
                }
                else if (element.mandatory) {
                  this.myFormGroup.controls[element.name].setValidators([Validators.required]);
                  if (element.name === 'HostName') {
                    this.myFormGroup.controls[element.name].setValidators([Validators.required, Validators.pattern(this.HOSTNAME_VALIDATION)]);
                  }
                } else if (element.stringPattern) {
                  this.myFormGroup.controls[element.name].setValidators([Validators.pattern(element.stringPattern)]);
                } else if ((element.maxValue || element.minValue) && this.myFormGroup.controls[element.name]) {
                  if (this.MAXVALUEVALIDATION.indexOf(element.name) !== -1) {
                    this.myFormGroup.controls[element.name].setValidators([Validators.pattern(/^[-+]?[0-9]+$/), Validators.min(element.minValue), Validators.max(2147483647)]);
                  } else {
                    this.myFormGroup.controls[element.name].setValidators([Validators.pattern(/^[-+]?[0-9]+$/), Validators.min(element.minValue), Validators.max(element.maxValue)]);
                  }
                }
                if (element.maxStringLength) {
                  if (element.mandatory) {
                    this.myFormGroup.controls[element.name].setValidators([Validators.required, Validators.maxLength(element.maxStringLength), Validators.minLength(element.minStringLength)]);
                  } else {
                    this.myFormGroup.controls[element.name].setValidators([Validators.maxLength(element.maxStringLength), Validators.minLength(element.minStringLength)]);
                  }
                }
              }
            }
          }
          if (!element.display) {
            if (this.myFormGroup.controls[element.name]) {
              this.myFormGroup.controls[element.name].clearValidators();
            }
          }
        }

        if (this.selectedCategoryName == "Support User Credentials") {
          if (element?.mandatory) {
            if (element.name == "Username") {
              formValue.Username = formValue.Username.trim()
              if (formValue?.Username?.length == 0) {
                this.myFormGroup.controls[element.name].setValidators([Validators.required]);
                this.myFormGroup.controls[element.name].setErrors({ 'required': true });
              }
              else {
                this.myFormGroup.controls[element.name].setErrors(null);
              }
            }
            if (element.name == "Password") {
              formValue.Password = formValue.Password.trim();
              this.passwordCheck = true;
              if (formValue?.Password?.length == 0) {
                this.myFormGroup.controls[element.name].setValidators([Validators.required, Validators.minLength(16), Validators.maxLength(24)]);
                this.myFormGroup.controls[element.name].setErrors({ 'required': true });
                this.passwordCheck = false;
              }
              else if (formValue?.Password?.length > 0) {
                this.myFormGroup.controls[element.name].setValidators([Validators.minLength(16), Validators.maxLength(24)]);
                //  this.myFormGroup.controls[element.name].setErrors({ 'required': true });

                if (!this.myFormGroup.controls[element.name].errors) {
                  if (formValue?.Password?.length > 0) {
                    var isLowerCase = (/[a-z]/.test(formValue.Password));
                    var isUppperCase = (/[A-Z]/.test(formValue.Password));
                    var isNumberCase = /\d/.test(formValue.Password);
                    var isSpeacialChar = (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(formValue.Password)
                    if (isLowerCase && isUppperCase && isNumberCase && isSpeacialChar) {
                      this.passwordCheck = false;
                    }
                  }
                }

              }
              else {
                this.myFormGroup.controls[element.name].setErrors(null);
              }

            }
            this.isCategoryDoneBtnDisable = this.myFormGroup.valid && !this.passwordCheck;

          }

        }
        else if (this.selectedCategoryName == "Syslog") {
          if (element?.mandatory) {
            if (element.name == "PrimaryServer") {
              formValue.PrimaryServer = formValue.PrimaryServer.trim()
              if (formValue?.PrimaryServer?.length == 0) {
                this.myFormGroup.controls[element.name].setValidators([Validators.required]);
                this.myFormGroup.controls[element.name].setErrors({ 'required': true });
              }
              else {
                // this.myFormGroup.controls[element.name].setValue(formValue.PrimaryServer)
                this.myFormGroup.controls[element.name].setErrors(null);
              }
            }
            if (element.name == "SecondaryServer") {
              formValue.SecondaryServer = formValue.SecondaryServer.trim()
              if (formValue?.SecondaryServer?.length == 0) {
                this.myFormGroup.controls[element.name].setValidators([Validators.required]);
                this.myFormGroup.controls[element.name].setErrors({ 'required': true });
              }
              else {
                // this.myFormGroup.controls[element.name].setValue(formValue.SecondaryServer)
                this.myFormGroup.controls[element.name].setErrors(null);
              }
            }
            // this.isCategoryDoneBtnDisable = this.myFormGroup.valid;

          }

        }
        else if (this.selectedCategoryName == "WiFi SSID") {
          if (element?.mandatory) {
            if (element.name == "SSID") {
              formValue.SSID = formValue.SSID.trim()
              if (formValue?.SSID?.length == 0) {
                this.myFormGroup.controls[element.name].setValidators([Validators.required]);
                this.myFormGroup.controls[element.name].setErrors({ 'required': true });
              }
              else {
                // this.myFormGroup.controls[element.name].setValue(formValue.PrimaryServer)
                this.myFormGroup.controls[element.name].setErrors(null);
              }
            }

            // this.isCategoryDoneBtnDisable = this.myFormGroup.valid;

          }

          // *** Enable this to make passphare mandatory for security types *** //
          // if (element.displayName == "Passphrase") {
          //   var becaconType = this.myFormGroup.controls[element.name].value;
          //   if (becaconType != "Basic") {
          //     element.mandatory = true;
          //   }
          //   else {
          //     element.mandatory = false;
          //   }
          // }
          // ********************************************* //

        }
        else if (this.selectedCategoryName == "WiFi Unified Primary SSID for EXOS") {
          // || this.selectedCategoryName == "WiFi SSID for EXOS"
          if (element.name == "SSID") {
            formValue.SSID = formValue.SSID.trim();
            // this.myFormGroup.controls[element.name].setValue(formValue.SSID.trim());
          }
          // if (this.selectedCategoryName == "WiFi Unified Primary SSID for EXOS") {
          if (element.displayName == "Passphrase") {

            var becaconType = this.myFormGroup.controls[element.name].value;
            if (becaconType != "Basic") {
              formValue["PreSharedKey.1.KeyPassphrase"] = formValue["PreSharedKey.1.KeyPassphrase"].trim();
            }
            // else {
            //   element.mandatory = false;
            // }
          }

          // }
        }
        else if (this.selectedCategoryName == "WiFi SSID for EXOS") {
          // || this.selectedCategoryName == "WiFi SSID for EXOS"
          // if (element.name == "SSID") {
          //   formValue.SSID = formValue.SSID.trim();
          //   // this.myFormGroup.controls[element.name].setValue(formValue.SSID.trim());
          // }
          // if (this.selectedCategoryName == "WiFi Unified Primary SSID for EXOS") {
          if (element.displayName == "Passphrase") {

            var becaconType = this.myFormGroup.controls["BeaconType"].value;
            if (becaconType != "Basic") {
              formValue["PreSharedKey.1.KeyPassphrase"] = formValue["PreSharedKey.1.KeyPassphrase"].trim();
            }
            // else {
            //   formValue.SSID = formValue.SSID.trim();
            // }
          }

          // }
        }
        else if (this.selectedCategoryName == "DHCP Server") {

          // var deviceIpAddr = this.myFormGroup.controls["DeviceIpAddress"]?.value;
          // var subNetMask = this.myFormGroup.controls["SubnetMask"]?.value;
          // if (deviceIpAddr && subNetMask) {
          //   var values = this.iprangecalc(deviceIpAddr, subNetMask);
          // }



          var deviceIPAddress = this.myFormGroup.controls["DeviceIpAddress"]?.value?.split(".");
          var beginingIPAddress = this.myFormGroup.controls["MinAddress"]?.value?.split(".");
          var endingIPAddress = this.myFormGroup.controls["MaxAddress"]?.value?.split(".");
          var subnetMask = this.myFormGroup.controls["SubnetMask"]?.value?.split(".");
          if (subnetMask?.length > 3) {
            if (deviceIPAddress?.length > 3 && beginingIPAddress?.length > 3 && endingIPAddress?.length > 3) {

              var nOctA1 = deviceIPAddress[0] & subnetMask[0];
              var nOctA2 = deviceIPAddress[1] & subnetMask[1];
              var nOctA3 = deviceIPAddress[2] & subnetMask[2];
              var nOctA4 = deviceIPAddress[3] & subnetMask[3];

              var nOctB1 = beginingIPAddress[0] & subnetMask[0];
              var nOctB2 = beginingIPAddress[1] & subnetMask[1];
              var nOctB3 = beginingIPAddress[2] & subnetMask[2];
              var nOctB4 = beginingIPAddress[3] & subnetMask[3];

              var nOctC1 = endingIPAddress[0] & subnetMask[0];
              var nOctC2 = endingIPAddress[1] & subnetMask[1];
              var nOctC3 = endingIPAddress[2] & subnetMask[2];
              var nOctC4 = endingIPAddress[3] & subnetMask[3];

              if (((nOctA1 == nOctB1) && (nOctB1 == nOctC1)) && ((nOctA2 == nOctB2) && (nOctB2 == nOctC2)) &&
                ((nOctA3 == nOctB3) && (nOctB3 == nOctC3)) && ((nOctA4 == nOctB4) && (nOctB4 == nOctC4))) {
                //  f.Answer.value = "These two IP's are on the same network."
                this.isSameNetworkIpAdrs = false;
              }
              else {
                this.isSameNetworkIpAdrs = true;
              }
            }
          }

        }
        else if (this.selectedCategoryName == 'ACL Entry for Remote Access' || this.selectedCategoryName == 'ACL Entry for VoIP') {
          let formType = this.selectedCategoryName == 'ACL Entry for Remote Access' ? 'aclForRemoteAccessForm' : 'aclForVoipForm';
          let rules = [...this.myFormGroup.get(formType).value.list4, ...this.myFormGroup.get(formType).value.list6];
          // this.isCategoryDoneBtnDisable = !!rules.length; // *** commented to fix CCL-72021 *** //
        }
        else if (this.selectedCategoryName == "Bandwidth") {
          if (element.name == "DownstreamCIR" || element.name == "UpstreamCIR") {
            let value = formValue;
            if (formValue.DownstreamCIR == "" && formValue.UpstreamCIR == "") {
              this.isCategoryDoneBtnDisable = false
            }
            else {
              this.isCategoryDoneBtnDisable = true
            }

          }
        }
        //  }
        // End
      });


      if (this.buildProfileObj.isFromDataModel) {
        this.patchupdatedValueForDataModeProfile();
        this.buildProfileObj.isFormValid = this.myFormGroup.valid;
        this.buildProfileObj.categoryList = [];
        this.buildProfileObj.reviewPageCategoryList = [];
        this.onSubmit(this.myFormGroup);
      }
    });
  }
  isSameNetworkIpAdrs: boolean = false;
  sameNetworkError: boolean = false;
  patchupdatedValueForDataModeProfile() {
    this.buildProfileObj.dataModelCategoryObj.parameters.forEach(item => {
      item['defaultValue'] = this.myFormGroup.value[item.name];
    });
  }

  validateIAPDCtrl(isDisplaying) {
    let isValid: boolean = true;
    if (isDisplaying[0].requires) {
      for (let key of Object.keys(isDisplaying[0].requires)) {
        if (isValid) {
          isValid = (isDisplaying[0].requires[key]['$in']) ? isDisplaying[0].requires[key]['$in'].indexOf(this.myFormGroup.controls[key].value) !== -1
            : isDisplaying[0].requires[key] === this.myFormGroup.controls[key].value;
        }
      }
    }
    return isValid;
  }
  validateDoneBtnEnable(formvalue) {
    let formHasValue: boolean = false;
    for (let key of Object.keys(formvalue)) {
      if (!formHasValue) {
        formHasValue = formvalue[key] !== '';
      }
    }
    return formHasValue;
  }
  validateValueEnumValues(formField) {
    let tempValueEnum: any = [];
    const reqArray: any = this.categoryAllObjectArray.filter(field => {
      return (formField.name === field.name);
    })[0];
    if (reqArray && reqArray.valueEnums && reqArray.valueEnums.length > 0) {
      reqArray.valueEnums.forEach(item => {
        let isValueNeeded: boolean = true;
        if (item.requires) {
          for (let key of Object.keys(item.requires)) {
            if (this.myFormGroup.controls[key]) {
              if (typeof item.requires[key] === 'object' && item.requires[key] !== null && this.myFormGroup.controls[key]) {
                isValueNeeded = (item.requires[key]["$in"].indexOf(this.myFormGroup.controls[key].value) !== -1)
              } else {
                isValueNeeded = item.requires[key] === this.myFormGroup.controls[key].value;
              }
            }
          }
        };
        if (isValueNeeded)
          tempValueEnum.push(item);
      })
    }
    return tempValueEnum = tempValueEnum.length > 0 ? tempValueEnum : formField.type === 'boolean' ? this.defaultRadioBtnVal : formField.valueEnums;
  }
  validateHostNAmeAndIPAddressForSIP(fieldName) {
    const zeroIP = "0.0.0.0";
    const domainNameFormat = /^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$/;
    let isValidHostName = (this.myFormGroup.value[fieldName] !== '');
    if (this.myFormGroup.value[fieldName].length > 253) { //  Hostname has a maximum of 253 ASCII characters
      isValidHostName = false;
    }
    let domains = this.myFormGroup.value[fieldName].split(".");
    for (let i = 0; i < domains.length; i++) {
      if (!domainNameFormat.test(domains[i])) {
        isValidHostName = false;
      }
    }
    return ((this.IP_ADDRESS_PATERN.test(this.myFormGroup.value[fieldName]) && this.myFormGroup.value[fieldName] !== zeroIP) || isValidHostName);
  }

  validateHostNAmeAndIPAddress(fieldName) {
    const zeroIP = "0.0.0.0";
    const domainNameFormat = /^(?![0-9]+$)(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$/;
    let isValidHostName = (this.myFormGroup.value[fieldName] !== '');
    if (this.myFormGroup.value[fieldName].length > 253) { //  Hostname has a maximum of 253 ASCII characters
      isValidHostName = false;
    }
    let domains = this.myFormGroup.value[fieldName].split(".");
    for (let i = 0; i < domains.length; i++) {
      if (!domainNameFormat.test(domains[i])) {
        isValidHostName = false;
      }
    }
    return ((this.IP_ADDRESS_PATERN.test(this.myFormGroup.value[fieldName]) && this.myFormGroup.value[fieldName] !== zeroIP) || isValidHostName);
  }


  addValidationForFormField(formField) {
    let formControl;

    if (formField.display) {
      if (formField.mandatory && formField.stringPattern) {
        formControl = new FormControl(formField.defaultValue, [Validators.required, Validators.pattern(formField.stringPattern)]);
      } else if (formField.mandatory && formField.isIPAddress) {
        if (formField.objectDefaultType === 'IPv6Address') {
          formControl = new FormControl(formField.defaultValue, Validators.pattern(this.IPV6_ADDRESS_PATERN));
        } else {

          if (this.selectedCategoryName == "Syslog") {
            formControl = new FormControl(formField.defaultValue,
              [Validators.required]);
          }
          else {
            formControl = new FormControl(formField.defaultValue,
              [Validators.required, Validators.pattern(this.IP_ADDRESS_PATERN)]);
          }


        }
      } else if (formField.isIPAddress) {
        if (formField.objectDefaultType === 'IPv6Address' && !formField.mandatory) {
          formControl = new FormControl(formField.defaultValue, Validators.pattern(this.IPV6_ADDRESS_PATERN));
        } else {
          formControl = new FormControl(formField.defaultValue, Validators.pattern(this.IP_ADDRESS_PATERN));
        }
      } else if (formField.mandatory && formField.maxValue && (formField.minValue || formField.minValue === 0)) {
        formControl = new FormControl(formField.defaultValue, [Validators.required, Validators.pattern(/^[-+]?[0-9]+$/), Validators.max(formField.maxValue), Validators.min(formField.minValue)]);
      } else if (formField.maxValue && (formField.minValue || formField.minValue === 0)) {
        if (formField.name === 'ControlDscpValue') {
          const reqArray: any = this.categoryAllObjectArray.filter(field => {
            return (field.name === 'Type');
          })[0];
          formControl = new FormControl(reqArray.implies[reqArray.defaultValue][formField.name], [Validators.pattern(/^[-+]?[0-9]+$/), Validators.min(formField.minValue), Validators.max(formField.maxValue)]);
        } else {
          formControl = new FormControl(formField.defaultValue, [Validators.pattern(/^[-+]?[0-9]+$/), Validators.min(formField.minValue), Validators.max(formField.maxValue)]);
        }
      } else if (formField.maxValue && (!formField.minValue && formField.minValue !== 0)) {
        formControl = new FormControl(formField.defaultValue, [Validators.pattern(/^[-+]?[0-9]+$/), Validators.min(formField.minValue), Validators.max(formField.maxValue)]);
      } else if (!formField.maxValue && (formField.minValue || formField.minValue === 0)) {
        if (this.MAXVALUEVALIDATION.indexOf(formField.name) !== -1) {
          formControl = new FormControl(formField.defaultValue, [Validators.pattern(/^[-+]?[0-9]+$/), Validators.min(formField.minValue), Validators.max(2147483647)]);
        } else {
          formControl = new FormControl(formField.defaultValue, [Validators.pattern(/^[-+]?[0-9]+$/), Validators.min(formField.minValue), Validators.max(formField.maxValue)]);
        }
      } else if (formField.mandatory || this.buildProfileObj.isFromDataModel) {
        if (formField.name === 'HostName') {
          formControl = new FormControl(formField.defaultValue, [Validators.required, Validators.pattern(this.HOSTNAME_VALIDATION)]);
        } else {
          formControl = new FormControl(formField.defaultValue, Validators.required);
        }

      } else if (formField.stringPattern) {
        formControl = new FormControl(formField.defaultValue, Validators.pattern(formField.stringPattern));
      } else {
        formControl = new FormControl(formField.defaultValue);
      }
    } else {
      formControl = new FormControl(formField.defaultValue);
    }
    // if (this.buildProfileObj.isFromDataModel) {
    //   if (formField.displayName == "InternetGatewayDevice.X_000631_Device.SysLog.PrimaryServer") {

    //     formField.type = "IPAddress";
    //   }
    //   // if (formField.displayName == "InternetGatewayDevice.X_000631_Device.SysLog.PrimaryServer") {
    //   //   formField.type = "IPAddress";
    //   // }
    // }
    if (formField.display && formField.maxStringLength) {
      if (formField.mandatory) {
        if (this.buildProfileObj.isFromDataModel && (formField.displayName == "InternetGatewayDevice.X_000631_Device.SysLog.PrimaryServer" || formField.displayName == "InternetGatewayDevice.X_000631_Device.SysLog.SecondaryServer")) {
          formControl = new FormControl(formField.defaultValue, Validators.pattern(this.IP_ADDRESS_PATERN));
        }
        else {
          formControl = new FormControl(formField.defaultValue, [Validators.required, Validators.maxLength(formField.maxStringLength), Validators.minLength(formField.minStringLength)]);
        }

      } else {
        formControl = new FormControl(formField.defaultValue, [Validators.maxLength(formField.maxStringLength), Validators.minLength(formField.minStringLength)]);
      }
    }
    return formControl;
  }

  OnDiscardCategory() {
    this.buildProfileObj.addNewCategory = false;
  }

  iprangecalc(Ipaddress, SubnetMask) {
    var startipsplit = Ipaddress.split('.');
    var subnetsplit = SubnetMask.split('.');
    //console.log("startipsplit",startipsplit,"subnetsplit",subnetsplit)
    let beginningaddress = startipsplit.map((a, i) => {
      let ipforbegin = parseInt(a); let subnetforbegin = parseInt(subnetsplit[i])
      return ipforbegin & subnetforbegin
    })
    ////////////////////////////////////////////////////////////////
    let endip = startipsplit.map((a, i) => {
      let ipintoparse = parseInt(a); let subnetintoparse = parseInt(subnetsplit[i])
      let subnetintobinary = subnetintoparse.toString(2);  //subnetip into binary
      let subnetintoinverted = this.invert(subnetintobinary) //inverting the subnet binary value
      //let subnetwoleadingzero = subnetintoinverted.replace(/^0+/, "") //eleminate leading zero
      let invertedsubnetintodecimal = parseInt(subnetintoinverted, 2).toString(10)  //inverted binary into decimal
      // console.log("subnetintoinverted", subnetintoinverted, "invertedsubnetintodecimal", invertedsubnetintodecimal, "orvalue", ipintoparse | parseInt(invertedsubnetintodecimal));

      return ipintoparse | parseInt(invertedsubnetintodecimal)
    })

    endip[3] = endip[3] - 1; beginningaddress[3] = beginningaddress[3] + 1;
    let enipjoin = endip.join('.')
    let beginip = beginningaddress.join('.')
    return [beginip, enipjoin];
  }
  invert(subnetbinary) {
    let invertedvalue;
    let subnetbinaryvalue = subnetbinary === '0' ? '00000000' : subnetbinary;
    // let decimalvalueint=parseInt(decimalvaluefrom)
    var binarysplit = subnetbinaryvalue.split('');
    //  console.log("eforminvert", binarysplit)
    let invert = binarysplit.map((a, i) => {

      invertedvalue = a === '0' ? '1' : '0';

      return invertedvalue
    })
    // console.log("inverted ip ", invert)
    return invert.join('')
  }


  onChangeDropDown(formFields) {

    if (formFields.implies && formFields.name === 'QosType' && this.selectedCategoryName === 'QOS Rule' && this.myFormGroup.value[formFields.name] !== 'Custom') {
      this.myFormGroup.patchValue(formFields.implies[this.myFormGroup.value[formFields.name]]);
    } else {
      this.myFormGroup.patchValue({
        DestIP: undefined,
        DSCPMark: -1,
        DestMask: '',
        DestPort: -1,
        SourceIP: undefined,
        DSCPCheck: -1,
        Ethertype: undefined,
        ClassQueue: 5,
        SourceMask: '',
        SourcePort: -1,
        ClassInterface: undefined,
        DestPortRangeMax: -1,
        SourcePortRangeMax: -1,
        X_000631_ClassName: undefined
      });
    }
  }

  onChangeServiceDropDown(formFields) {

    if (formFields && formFields.implies && (this.selectedCategoryName === 'Data Service' || this.selectedCategoryName === 'Video Service' ||
      this.selectedCategoryName === 'Voice Service')) {
      if (formFields.name === 'Mode') {
        this.modeImpliesObj = Object.assign({}, formFields.implies[this.myFormGroup.value[formFields.name]]);
      } else if (formFields.name === 'version') {
        this.versionImpliesObj = Object.assign({}, formFields.implies[this.myFormGroup.value[formFields.name]]);
      } else if (formFields.name === 'Model' && this.myFormGroup.value[formFields.name] === "T-Series" && this.selectedCategoryName === 'Voice Service') {
        this.myFormGroup.patchValue({ Type: "SIP" });
      }

    } else if (formFields.name === 'productFamily' && this.selectedCategoryName === 'Data Service') {
      //else if (formFields.name === 'productFamily' && this.myFormGroup.value[formFields.name] === "EXOS" && this.selectedCategoryName === 'Data Service') {

      this.myFormGroup.patchValue({ version: "v4" });
      this.myFormGroup.patchValue({ Mode: "RG Routed" });
    } else if (formFields.name === 'MatchRule' && (this.selectedCategoryName === 'Data Service' || this.selectedCategoryName === 'Video Service')) {
      this.myFormGroup.patchValue({ TagAction: undefined });
    } else if ((this.selectedCategoryName === 'WiFi SSID' || this.selectedCategoryName === 'WiFi SSID for EXOS') && (this.myFormGroup.value['WlanIndex'] === '10' || this.myFormGroup.value['WlanIndex'] === '2')) {
      this.myFormGroup.patchValue({
        X_CALIX_Isolate_Gateway: this.getWIFISSIDDefaultValue('X_CALIX_Isolate_Gateway'),
        X_CALIX_Isolate_Start_IP: this.getWIFISSIDDefaultValue('X_CALIX_Isolate_Start_IP'),
        X_CALIX_Isolate_End_IP: this.getWIFISSIDDefaultValue('X_CALIX_Isolate_End_IP'),
        X_CALIX_Isolate_Mask: this.getWIFISSIDDefaultValue('X_CALIX_Isolate_Mask')
      });
    }
    else if ((this.selectedCategoryName === '2.4GHz WIFI Radio' || this.selectedCategoryName === '5GHz WIFI Radio') && formFields.name === 'productFamily') {
      this.myFormGroup.patchValue({
        TransmitPower: ""
      });

    }
    if (this.selectedCategoryName === 'WiFi SSID for EXOS' && formFields.name == "WlanIndex" && (this.myFormGroup.value['WlanIndex'] >= 1 && this.myFormGroup.value['WlanIndex'] <= 24)) {
      this.myFormGroup.patchValue({
        BeaconType: this.tempGetWIFISSIDDefaultValue('BeaconType')

      });
    }
    this.setParameterValidation();
  }
  onchangeRadio(formFields) {

    if (this.myFormGroup.value[formFields.name] == true && formFields.displayName == "Revertive") {

      this.disableots = true;
      /*this.myFormGroup.value['OptionsTimerSwitch']= true;
      $('#OptionsTimerSwitchEnabled_radioBtn').prop("checked", true);
      $('#OptionsTimerSwitchDisabled_radioBtn').prop("checked",false);*/
      this.myFormGroup.patchValue({ OptionsTimerSwitch: true });
    } else if (this.myFormGroup.value[formFields.name] == false && formFields.displayName == "Revertive") {
      this.disableots = false;
    }
    if ((this.selectedCategoryName == "Data Service" || this.selectedCategoryName == "Video Service") &&
      this.myFormGroup.value["productFamily"] == "EXOS" &&
      formFields.name == "AnyPortAnyServiceEnabled") {
      if (this.myFormGroup.value[formFields.name] == true) {
        this.myFormGroup.controls["X_000631_OUI_Enable"].setValue(true);
      }
      else {
        if (this.myFormGroup.value[formFields.name] == false) {
          this.myFormGroup.controls["X_000631_OUI_Enable"].setValue(false);
        }
      }

    }
    else {
      if ((this.selectedCategoryName == "Video Service") &&
        this.myFormGroup.value["productFamily"] == "GigaCenter" &&
        formFields.name == "AnyPortAnyServiceEnabled") {

        if (this.myFormGroup.value[formFields.name] == true) {
          this.myFormGroup.controls["OUI_Enable"].setValue(true);
        }
        else if (this.myFormGroup.value[formFields.name] == false) {
          this.myFormGroup.controls["OUI_Enable"].setValue(false);
        }

      }

    }

    // if ((this.selectedCategoryName == "Data Service" || this.selectedCategoryName == "Video Service") && this.myFormGroup.value[formFields.name] == true && formFields.name == "AnyPortAnyServiceEnabled") {
    //   this.myFormGroup.controls["OUI_Enable"].setValue(true);
    // }
    // else {
    //   if ((this.selectedCategoryName == "Data Service" || this.selectedCategoryName == "Video Service") && this.myFormGroup.value[formFields.name] == false && formFields.name == "AnyPortAnyServiceEnabled") {
    //     this.myFormGroup.controls["OUI_Enable"].setValue(false);
    //   }
    // }

  }

  getWIFISSIDDefaultValue(fieldName) {
    const filterData = this.categoryType.filter(item => {
      return (item.name === fieldName);
    })[0];
    const defaultVal = filterData.defaultValue.filter(value => {
      return (value.condition.WlanIndex === this.myFormGroup.value.WlanIndex);
    })[0];
    return defaultVal.value;
  }
  tempGetWIFISSIDDefaultValue(fieldName) {
    const filterData = this.categoryType.filter(item => {
      return (item.name === fieldName);
    })[0];
    const defaultVal = filterData.defaultValue.filter(value => {
      return (value.condition.WlanIndex["$in"].includes(this.myFormGroup.value.WlanIndex));
    })[0];
    return defaultVal.value;
  }

  setParameterValidation() {
    if (this.selectedCategoryName === 'Set Parameter Value') {
      switch (this.myFormGroup.value.SetParamValueProfileType) {
        case 'int':
        case 'unsignedInt':
        case 'long':
          this.isSetParamValueProfileValueInvalidInt = (/^[-+]?[0-9]+$/).test(this.myFormGroup.value.SetParamValueProfileValue);
          this.setParameterError = 'Please enter an Integer';
          break;
        case 'dateTime':
          this.isSetParamValueProfileValueInvalidInt = (/^-?(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(.\d*[1-9]+)?(([+|-](\d{2}):(\d{2}))|Z)?$/).test(this.myFormGroup.value.SetParamValueProfileValue);
          this.setParameterError = 'Please enter a dateTime';
          break;
        case 'boolean':
          this.isSetParamValueProfileValueInvalidInt = ["true", "false", "1", "0"].indexOf(this.myFormGroup.value.SetParamValueProfileValue) !== -1;
          this.setParameterError = 'Please enter a boolean';
          break;
        case 'base64Binary':
          if (this.myFormGroup.value.SetParamValueProfileValue) {
            try {
              this.isSetParamValueProfileValueInvalidInt = btoa(atob(this.myFormGroup.value.SetParamValueProfileValue)) === this.myFormGroup.value.SetParamValueProfileValue;
            } catch (e) {
              this.isSetParamValueProfileValueInvalidInt = false;
            } this.setParameterError = 'Please enter a base64Binary';
          }
          break;
        default:
          this.isSetParamValueProfileValueInvalidInt = true;
          this.setParameterError = '';
          break;
      }
    }
  }

  onQosRuleNameValidation(fieldName) {
    this.isAlreadyExisit = false;
    if (fieldName === 'X_000631_ClassName') {
      this.buildProfileObj.categoryList.forEach(category => {
        if (category.category === 'QOS Rule') {
          if (!this.isAlreadyExisit) {
            this.isAlreadyExisit = (category.parameterValues[fieldName] === this.myFormGroup.value[fieldName]);
          }
        }
      });
    }
  }

  SSIDValidation() {
    this.isAlreadyExisit = false;
    this.isCategoryDoneBtnDisable = true;
    if (this.selectedCategoryName === 'WiFi SSID' || this.selectedCategoryName === 'WiFi SSID for EXOS') {
      this.buildProfileObj.categoryList.forEach(category => {
        if (category.category === 'WiFi SSID' || category.category === 'WiFi SSID for EXOS') {

          if (category.parameterValues['WlanIndex'] === this.myFormGroup.value['WlanIndex']) {
            this.isAlreadyExisit = true;
          }
          this.isCategoryDoneBtnDisable = !this.isAlreadyExisit;
        }
      });
    }
  }
  DNSValidation() {
    this.dnsAlreadyExist = false;
    this.isCategoryDoneBtnDisable = true;
    if (this.selectedCategoryName === 'DNS Host Mapping') {
      this.buildProfileObj.categoryList.forEach(category => {
        if (category.category === 'DNS Host Mapping') {

          if (category.parameterValues['HostName'] == this.myFormGroup.value['HostName']) {
            this.dnsAlreadyExist = true;
          }

          this.isCategoryDoneBtnDisable = !this.dnsAlreadyExist;
        }
      });
    }
  }

  onCommaSeparateValidation(fieldName) {
    let isValid = true;

    if (fieldName) {
      //let isValid = false;
      // const maskCharRegExp = /^[x|X]$/;
      // const maskPairRegExp = /^[x|X]{2}$/;
      // if (this.myFormGroup.value[fieldName]) {
      //   let macEntry = this.myFormGroup.value[fieldName].split(",");
      //   isValid = true;

      //   for (let i = 0; i < macEntry.length; i++) {
      //     let mac = macEntry[i].trim();
      //     if (mac.length !== 17) {
      //       isValid = false;
      //       break;
      //     }
      //     let macPairs = mac.split(":");
      //     if (macPairs.length !== 6) {
      //       isValid = false;
      //       break;
      //     }

      //     let startMask = false;
      //     for (let j = 0; j < 6; j++) {
      //       let curPair = macPairs[j];
      //       if (curPair.length !== 2) {
      //         isValid = false;
      //         break;
      //       }
      //       if (startMask) {
      //         if (!maskCharRegExp.test(curPair[1])) {
      //           isValid = false;
      //           break;
      //         }
      //       } else {
      //         let temp = parseInt(curPair, 16);
      //         if (isNaN(temp)) {
      //           if (maskPairRegExp.test(curPair)) {
      //             startMask = true;
      //           } else {
      //             isValid = false;
      //             break;
      //           }
      //         } else {
      //           if (maskCharRegExp.test(curPair[1])) {
      //             isValid = false;
      //             break;
      //           }
      //         }
      //       }
      //     } // end for j

      //     if (!isValid) {
      //       break;
      //     }
      //   } // end for i
      // }
      if (this.myFormGroup.value[fieldName]) {
        if (this.myFormGroup.value["AnyPortAnyServiceEnabled"]) {
          var macAddress = this.myFormGroup.value[fieldName];
          // isValid = /^[a-fA-F0-9]{2}(?:[:-]?[a-fA-F0-9]{2}){5}(?:,[a-fA-F0-9]{2}(?:[:-]?[a-fA-F0-9]{2}){5})*$/.test(macAddress)
          isValid = /^[a-fA-F0-9x-xX-X]{2}(?:[:-]?[a-fA-F0-9x-xX-X]{2}){5}(?:,[a-fA-F0-9x-xX-X]{2}(?:[:-]?[a-fA-F0-9x-xX-X]{2}){5})*$/.test(macAddress)

        }

      }

      this.isValidMacAddress = isValid;
    }
  }

  checkFormValidBeforSubmit() {
    const isValid = (this.valid6rdPrefix && this.validRange1Start && this.validRange1End && this.validIpV6AddressDNSSrvrs && this.validMultiCastIpEnd
      && this.validMultiCastIpStart && this.validX_000631_IPv6DNSServers && this.validX_000631_IPv6PrimaryDNSServer && this.validDNSServers && !this.validHostName && this.isValidMacAddress);
    return isValid;
  }

  validRange1Start = true;
  validRange1End = true;
  validMultiCastIpStart = true;
  validMultiCastIpEnd = true;
  validIpV6AddressDNSSrvrs = true;
  validDNSServers = true;
  validX_000631_IPv6DNSServers = true;
  validHostName = false;
  valid6rdPrefix = true;
  validIPAddress = false;
  validX_000631_IPv6PrimaryDNSServer = true;
  ipZeroValidation(parameters) {
    //this.myFormGroup.controls[parameters.name].setErrors(null)
    this.validIPAddress = false;
    if (parameters.isIPAddress && this.myFormGroup.value[parameters.name] == '0.0.0.0') {

      if (this.selectedCategoryName == "Syslog") {

        this.validIPAddress = false;
      } else {

        this.validIPAddress = true;
      }

      this.myFormGroup.controls[parameters.name].setErrors({ 'incorrect': true });
      return;
    }
  }
  doCustomValidation(fieldName) {

    let ipFormat =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (fieldName === '6rdPrefix') {
      this.valid6rdPrefix = false;
      let value = this.myFormGroup.value[fieldName];

      if (value && value.indexOf("/") > 0) {
        var elements = value.split("/");
        var addrLength = elements[1];
        if (parseInt(addrLength) <= 64) {
          var ipv6Addr = elements[0];
          if (this.iPv6AddressService.isIpv6Address(ipv6Addr)) {
            this.valid6rdPrefix = true;
            return;
          }
        }
      }

    } else if (fieldName === 'Range1Start') {

      let value = this.myFormGroup.value[fieldName];
      if (!ipFormat.test(value)) {
        this.validRange1Start = true;
        return;
      }

      let highestByte = parseInt(value.split(".")[0]);


      this.validRange1Start = (highestByte & 240) === 224;



    } else if (fieldName === 'Range1End') {

      let value = this.myFormGroup.value[fieldName];
      if (!ipFormat.test(value)) {
        this.validRange1End = true;
        return;
      }

      let highestByte = parseInt(value.split(".")[0]);


      this.validRange1End = (highestByte & 240) === 224;



    } else if (fieldName === 'Vlan1Range1Start') {

      let value = this.myFormGroup.value[fieldName];
      if (!ipFormat.test(value)) {
        this.validMultiCastIpStart = true;
        return;
      }

      let highestByte = parseInt(value.split(".")[0]);


      this.validMultiCastIpStart = (highestByte & 240) === 224;


    } else if (fieldName === 'Vlan1Range1End') {

      let value = this.myFormGroup.value[fieldName];
      if (!ipFormat.test(value)) {
        this.validMultiCastIpEnd = true;
        return;
      }

      let highestByte = parseInt(value.split(".")[0]);


      this.validMultiCastIpEnd = (highestByte & 240) === 224;



    } else if (fieldName === 'HostName') {
      this.validatedArray = [];
      let value = this.myFormGroup.value[fieldName];
      for (let i = 0; i < value.length; i++) {

        if (this.HOSTNAME_VALIDATION.test(value[i]) == false) {
          this.validatedArray.push(value[i]);
        }
      }
      this.hostnameValidateString = this.validatedArray.join();

      this.validHostName = !this.HOSTNAME_VALIDATION.test(value);
      return;

    } else if (fieldName === 'DNSServers') {
      let value = this.myFormGroup.value[fieldName];
      if (value) {

        if (value.indexOf(" ") !== -1) {
          this.validDNSServers = false;
          return;
        }

        let arr = value.split(",");

        for (let i = 0; i < arr.length; i++) {
          let ele = arr[i] ? arr[i].trim() : "";

          if (ele) {
            this.validDNSServers = ipFormat.test(ele);

            if (!this.validDNSServers) {
              return;
            }
          } else {
            continue;
          }
        }
      }
      else {
        this.validDNSServers = true;
      }

    } else if (fieldName === 'X_000631_IPv6DNSServers' || fieldName === 'IPv6DNSServers') {
      this.validX_000631_IPv6DNSServers = true;
      this.validX_000631_IPv6PrimaryDNSServer = true;
      let value = this.myFormGroup.value[fieldName];
      var startWithComma = value?.startsWith(",");
      if (startWithComma) {
        this.validX_000631_IPv6PrimaryDNSServer = false;
        return;
      }
      else {
        this.validX_000631_IPv6PrimaryDNSServer = true;
      }

      if (value) {
        let arr = value.split(",");

        for (let i = 0; i < arr.length; i++) {
          let ele = arr[i] ? arr[i].trim() : "";

          if (ele) {

            if (!this.iPv6AddressService.isIpv6Address(ele)) {
              this.validX_000631_IPv6DNSServers = false;
              return;
            }
          }
        }
      }

    }
  }

  passwordedit() {
    this.passwordIconShow = !this.passwordIconShow
  }

  emitError(error) {
    this.isCategoryDoneBtnDisable = false;
    this.errorOutput.emit(error);
  }

}
