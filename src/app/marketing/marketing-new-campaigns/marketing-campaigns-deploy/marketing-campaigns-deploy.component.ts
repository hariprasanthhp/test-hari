import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { ValidatorService } from 'src/app-services/validator.services';
import { MarketingCampaignsApiService } from '../../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { MarketingCampaignDefineApiService } from '../shared/services/marketing-campaign-define-api.service';
import { downloadQSReports } from '../../shared/services/qlik-connection.js';
import { MarketingApiService } from 'src/app/marketing/shared/services/marketing-api.sevice';
import { SsoAuthService } from './../../../shared/services/sso-auth.service';
import { MarketingCampaignChannelsApiService } from '../shared/services/marketing-campaign-channels-api.service';
import { environment } from 'src/environments/environment';
import * as AWS from 'aws-sdk';
import { Subject, Observable, forkJoin, combineLatest, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { TreeNode } from 'primeng/api';
@Component({
  selector: 'app-marketing-campaigns-deploy',
  templateUrl: './marketing-campaigns-deploy.component.html',
  styleUrls: ['./marketing-campaigns-deploy.component.scss']
})
export class MarketingCampaignsDeployComponent implements OnInit {
  channelStr:string
  @Input() stageOneComplete;
  @Input() csvSelected;
  @Input() mobileNotificationSelected;
  @Input() mailChimpSelected;
  @Input() faceBookSelected;
  @Input() deployCampaignClicked;
  @Input() hubspotSelected;
  @Input() constantSelected;
  deployedToSelectedChannels: any;
  channelNames: string;
  attributesSelect: boolean = false;
  @Input() set selectedSegmentedType(value) {
    if (value === 'Acquisition') {
      this.mobileNotificationSelected = false;
      this.csvSelected = false;
      this.hubSpotMsg = false
      this.mailchimpMsg =false
    }
  }
  @Output() deployValidation = new EventEmitter();
  @Output() attributesSelectOrNot = new EventEmitter();
  @Output() customFieldSuccess = new EventEmitter();
  @Output() deployedToSelectedChannelsModal = new EventEmitter();

  @Input() set deployPreviousClicked(value) {
    if (value) {
      this.errorReset();
      this.hubSpotMsg = false
      this.mailchimpMsg = false
    } else {
      this.campaignImageError = false;
    }
  // console.log(this.mobileNotificationSelected,this.mailChimpSelected,this.stageOneComplete)
  }
  @ViewChild('imageupload') imageupload: ElementRef;
  // isDeployCampaignClicked: boolean = false;
  language: any;
  languageSubject: any;
  editMode: boolean = false;
  minimumDate = new Date();
  minimumTime = '04:20 PM';
  timeValue: string;
  timeZoneDataArray = [
    "UTC",
    "America/New_York (East Coast)",
    "America/Chicago (Central)",
    "America/Denver (Mountain)",
    "America/Los_Angeles (West Coast)"
  ];
  orgId = localStorage.getItem('calix.org_id');
  mobileEventLoad = 10;
  eventTypeDataArray = [
    { id: 'Competitor', name: 'Competitor Visit Minutes' },
    { id: 'serviceLimit', name: 'Service Limit Hits' },
    { id: 'Speed Test', name: 'Speed Test Minutes' }

  ]
  scheduleArray = [
    'Immediate',
    // 'Event-Driven',
    'Scheduled'
  ]
  campaignError: boolean = false
  startDate: any;
  endDate: any;
  // DATA VARIABLES
  notificationName: any;
  notificationNameError: boolean = false;
  notificationNameErrorMsg: any;

  notificationMailName: any;
  notificationNameMailError: boolean = false;
  notificationNameMailErrorMsg: any;

  campaignLink: any;
  campaignLinkError: boolean = false;
  campaignLinkErrorMsg: any;

  campaignImage: any;
  campaignImageFile: any;
  campaignImageError: boolean = false;
  campaignImageErrorMsg: any;

  scheduleSelected: any = 'Immediate';

  eventSelected: any
  evenTypeError: boolean = false;

  notificationTimeError: boolean = false;
  notificationTime: any;
  notificationTimeForSubmit: any;
  notificationTimeForSubmit_date: any;
  thresholdValue: any
  thresHoldError: boolean = false;
  maxlenght: boolean;
  // defualtnotificationTime: any;

  notificationDateTimeError: boolean = false;
  notificationDateTime: any;
  notificationDateTime_date: any;
  timeZoneSelected: any
  timeZoneError: boolean = false;


  validation: boolean = false;

  definePostObject: any;
  channelPostObject: any;
  campaignChannelData: any;
  deployCampaignChannel: any;
  deployCampaignChannelForMailChimp: any;
  deployErrorMsg: any;
  deployError: boolean = false;

  deploySuccess: boolean = false;
  deploySuccessMsg: string
  deployData: any;
  contentUrl: string;
  listObs: any;
  loading: boolean = false;
  // SUBJECTS
  createCampaignSubject: any;
  campaignChannelDeploySubject: any;
  clearCampaignSubject: any;
  editChannelSubject: any;
  fileUploadSubject: any;
  deployNextSubject: any;
  triggeredCampaign: boolean = false;
  campaignname: any
  segment: string;
  selectedSegmentData: any;
  selectedSegmentTypeData: any;
  triggeredEventType: any
  startDatee: any
  indexValue1: number;
  indexValue2: number;
  indexValue3: number;
  indexValue: number;
  indexValue4: number;
  indexValue5: number;
  enteredText: any;
  isEnteredText: boolean = true;
  mailchimpMsg: boolean = false;
  hubSpotMsg: boolean = false;
  cmcType: boolean = false
  uploadData: boolean = false
  salesUser: any
  isProspect: boolean = false;
  tableData: TreeNode[];
  cols: any[];
  selectedNodes!: TreeNode[];
  selectedParameters: { [key: string]: string } = {};
  personalizationPayLoadData: any;
  selectedRows: any[] = [];
  parameters = "30 days, Prior Month, 2 Prior Months";
  personalizationApiData :any = []
  personalizationApiDataRestore :any = []

  constructor(
    private translateService: TranslateService,
    private marketingCampaignDefineApiService: MarketingCampaignDefineApiService,
    private marketingCampaignsApiService: MarketingCampaignsApiService,
    private marketingCampaignChannelsApiService: MarketingCampaignChannelsApiService,
    private marketingCommonService: MarketingCommonService,
    private marketingApiService: MarketingApiService,
    private validatorService: ValidatorService,
    private ssoAuthService: SsoAuthService,
    private http: HttpClient,
    private dateUtils: DateUtilsService,
    private CommonFunctionsService: CommonFunctionsService,
    private elment : ElementRef
  ) {
    this.timeZoneDataArray = [...new Set(this.timeZoneDataArray)]
    this.triggeredCampaign = sessionStorage.getItem('triggered') ? true : false
  }

  ngOnInit(): void {
    this.salesUser = localStorage.getItem('salesuser')
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.selectedChannelTodeploy();
      this.tableHeaderCall();
    });
    //this.minimumDate.setTime(this.minimumDate.getTime() + 15*60*1000);
    this.minimumDate = new Date(this.minimumDate.getTime() + 15 * 60000);
    this.notificationDateTime = this.minimumDate;
    // this.notificationTime = this.minimumDate;
    this.getCustomFieldAPICall()
    this.deploySubmit();
    this.clearFunction();
    this.subscribeToObservables()
    this.getSetMethod()
    this.marketingCampaignDefineApiService.eventTypeSubject.subscribe(eventData => {
      // debugger;
      this.triggeredEventType = eventData;
    });
    this.marketingCampaignDefineApiService.startDateSubject.subscribe(eventData => {
      // debugger;
      this.startDatee = eventData
      // console.log('-----------------enter')
      this.dateAssigner()
    });
    this.tableHeaderCall();
  }
  tableHeaderCall(){
  this.cols = [
    { field: 'attributes', header: this.language['Attributes'] ,sortable:true},
    { field: 'parameters', header: this.language['parameters'] , sortable:false},
    { field: 'dataExample', header: this.language['Data Example'] ,sortable:false}
  ];
}
getCustomFieldAPICall(){
 this.marketingCampaignChannelsApiService.customFieldListGET()
  .subscribe((res: any) => {
    if (Array.isArray(res)) {
      console.log(res,'----get API Data----')
      this.personalizationApiData = res;
      this.personalizationApiDataRestore = res
      this.convertPersonalizationApiData(this.personalizationApiData);
    } else {
      this.personalizationApiData = [];
    }
  }, (error) => {
    this.personalizationApiData = [];
  })
}
  convertPersonalizationApiData(personalizationApiData:any) {
    const groupedData = {};
    personalizationApiData.forEach(obj => {
      const category = obj.category;
      if (!groupedData[category]) {
        groupedData[category] = [];
      }
      groupedData[category].push(obj);
    });
    const convertObjectData = Object.entries(groupedData).map(([category, items]) => ({
      category,
      items
    }));
    const jsonData: any = convertObjectData;
    console.log("🚀 ~ file: marketing-campaigns-deploy.component.ts:402 ~ MarketingCampaignsDeployComponent ~ convertPersonalizationApiData ~ convertObjectData:", convertObjectData)
    this.tableData = jsonData.flatMap((categoryObj, categoryIndex) => {
      const categoryName = categoryObj.category;
      const categoryItems = categoryObj.items.map((item, itemIndex) => {
        const displayName = item.displayName;
        const parameters = item.parameters;
        const exampleValue = item.exampleValue;
        const fieldName = item.fieldName;
        const parametersArray = parameters ? parameters.split(', ') : [];
        const indexOf30Days = parametersArray.indexOf('30 days');
        if (indexOf30Days !== -1) {
          parametersArray.splice(indexOf30Days, 1);
          parametersArray.unshift('30 days');
        }
        return {
          key: `${categoryIndex}-${itemIndex}`,
          data: {
            attributes: displayName,
            parameters: parametersArray,
            dataExample: exampleValue,
            fieldNameVal: fieldName,
          },
        };
      });

      return [
        {
          key: `${categoryIndex}`,
          data: {
            attributes: `${categoryName} (${categoryItems.length})`,
            parameters: [],
            dataExample: '',
          },
          children: categoryItems,
        },
      ];
    });
    console.log("🚀 ~ file: marketing-campaigns-deploy.component.ts:435 ~ MarketingCampaignsDeployComponent ~ this.tableData=jsonData.flatMap ~ this.tableData:", this.tableData)
  }
  selectTimeFrame(rowKey, name) {
    if (name) {
      this.selectedParameters[rowKey] = name;
      this.createPayLoadData();
    }
  }
  checkboxSelect(event?:any,rowData?:any) {
    console.log(event,'-------',rowData,'---rowData---')
    const key = rowData.node.key;
     if (isNaN(key) && this.selectedRows.includes(key) ) {
      const index = this.selectedRows.indexOf(key);
      if (index > -1) {
        this.selectedRows.splice(index, 1);
        this.selectedParameters[key] = undefined;
      }
    } else {
      !this.selectedRows.includes(key) && this.selectedRows.push(key);
      console.log(!this.selectedRows.includes(key))
      if (rowData.node.children) {
        rowData.node.children.forEach((child: any) => {
          const childKey = child.key;
          if (!this.selectedRows.includes(childKey)) {
            this.selectedRows.push(childKey);
          }
        });
      }
      if(!(event?.target.classList.contains('p-highlight') || event?.target.classList.contains('pi-check'))) {
        this.removeUnselectedElements(key,rowData);
      }
      
  }
    this.createPayLoadData();
  }
   createPayLoadData(){
    const filteredArray = this.selectedNodes.filter(item => !item.children);
    this.definePostObject = this.marketingCampaignDefineApiService.getDefineDataEmitter();
      console.log(filteredArray,'filteredArray','1')
    this.personalizationPayLoadData = {
      "campaignId": this.definePostObject['campaignId'],
      "data": filteredArray.map(item => ({
        "fieldName": item.data?.fieldNameVal, 
        "displayName": item.data?.attributes, 
        "paramSelected":  item.data?.parameters.length? (this.selectedParameters[item.key] ? this.selectedParameters[item.key]:item.data?.parameters[0] ) : null
      }))
    };

    this.attributesSelect = this.selectedNodes.length? true : false;
    this.attributesSelectOrNot.emit(this.attributesSelect);
    console.log("🚀 ~ file: marketing-campaigns-deploy.component.ts:472 ~ MarketingCampaignsDeployComponent ~ createPayLoadData ~ this.personalizationPayLoadData:", this.personalizationPayLoadData)
   }
  removeUnselectedElements(key,rowData) {
    if(!isNaN(key)) {
      if (rowData.node.children) {
        rowData.node.children.forEach((child: any) => {
          const childKey = child.key;
          const parentKeyValue = childKey.slice(0,key.length);
          if(parentKeyValue === key) {
            const childIndex = this.selectedRows.indexOf(childKey);
            if (childIndex > -1) {
              this.selectedRows.splice(childIndex, 1);
              this.selectedParameters[childKey] = undefined;
            }
          }
        });
      }
    }
  }

  selectAll() {
    this.selectedNodes = [];
    this.selectedRows = [];
    this.recursiveSelection(this.tableData,true)
   }

   deselectAll() {
    this.selectedNodes = [];
    this.selectedRows = [];
    this.recursiveSelection(this.tableData,false)
   }
   recursiveSelection(nodes,isSelected) {
    nodes.forEach(node => {
      if (isSelected) {
        this.selectedNodes.push(node);
        this.selectedRows.push(node.key);
      }else {
        if(node.data.parameter != '') {
          delete node.data.parameter;
          this.selectedParameters[node.key] = undefined;
        }
      }
      node.partialSelected = false;
      if (node.children) {
        this.recursiveSelection(node.children, isSelected);
      }
    });
    this.createPayLoadData();
   }
  getSetMethod() {
    this.marketingCampaignDefineApiService.campaignSubject.subscribe(campaigndata => {
      // debugger;
      if(this.deployedToSelectedChannels != ''){
        this.selectedChannelTodeploy();
      }
      this.campaignname = campaigndata;
    });
    this.marketingCampaignDefineApiService.segmentSelectSubject.subscribe(segmentData => {
      // debugger;
      this.selectedSegmentData = segmentData != undefined || segmentData != '' ? segmentData : '';
    });
    this.marketingCampaignDefineApiService.segmentTypeSelectSubject.subscribe(segmentData => {
      // debugger;
      this.selectedSegmentTypeData = segmentData != undefined && segmentData != '' ? segmentData : '';
      if (this.selectedSegmentTypeData != '') {
        if (this.selectedSegmentTypeData == 'Upload') {
          let name = this.selectedSegmentData
          let segmentname = name.substring(name.lastIndexOf("_") + 1)
          this.uploadData = segmentname == 'Prospects' ? true : false
        } else {
          this.uploadData = false
        }

        this.cmcType = (this.selectedSegmentTypeData == 'Acquisition' || this.uploadData) ? true : false;
      }
    });
  }
  subscribeToObservables() {
    // console.log('-----------------enter22')
    this.marketingCampaignsApiService.deployCampaignValidation.subscribe((value: boolean) => {
      if (value && this.mobileNotificationSelected) {
        this.validator();
      } else if (this.triggeredCampaign && this.triggeredEventType == 'Service Limit Hit') {
        this.validator();
      }
    });
  }
  removeUnwantedSpace(input, value) {
    this[input] = this.CommonFunctionsService.trimSpaceFromNonObjectInputs(value)
  }
  campaignLinkChange(event) {
    this.campaignLink = event;
    if (this.campaignLink === '') {
      this.campaignLinkError = false;
      this.campaignLinkErrorMsg = '';
    } else if (this.campaignLink !== undefined) {
      let errorObj = this.validatorService.urlValidation(event)
      this.campaignLinkError = errorObj.error;
      this.campaignLinkErrorMsg = errorObj.errorMsg;
    }
  }
  validate(s) {
    if (/^(\w+\s?)*\s*$/.test(s)) {
      return s.replace(/\s+$/, '');
    }
  }

  campaignImageUploader(event) {
    // console.log(event);
    this.campaignImage = event;
    this.campaignImageError = false;
    if (event && event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 1048575) {
        this.imageUploadErrorFunction();
        this.campaignImageError = true;
        this.campaignImageErrorMsg = this.language.fileSize
      } else if (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpeg' ||
        event.target.files[0].type == 'image/jpg') {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.campaignImageFile = reader.result;
        reader.readAsDataURL(file);
        this.campaignImageError = false;
      } else {
        this.imageUploadErrorFunction();
        this.campaignImageErrorMsg = this.language.jpg_jpeg
      }

    } else {
      this.imageUploadErrorFunction();
    }

  }
  imageUploadErrorFunction() {
    if (this.imageupload) {
      this.imageupload.nativeElement.value = "";
    }
    this.campaignImageFile = ''
    this.campaignImage = undefined;
  }
  selectSchedule(event) {
    this.scheduleSelected = event;
    this.evenTypeError = false
    this.thresHoldError = false
    this.timeZoneError = false
    this.notificationTimeError = false

    this.dateAssigner()
  }

  selectEvent(event) {
    this.eventSelected = event;
    this.evenTypeError = !event ? true : false;
  }
  thresholdChange(event) {
    if (/^[0-9]+$/gm.test(event)) {
      this.thresholdValue = event;
      if (this.thresholdValue > 65535 || this.thresholdValue < 1) {
        this.maxlenght = true;
      }
      else {
        this.maxlenght = false
      }

    } else {
      this.thresholdValue = '';
      (<HTMLInputElement>document.getElementById('campaign-threshold')).value = '';
    }

    this.thresHoldError = !/^[0-9]+$/gm.test(event);
  }

  notificationTimeChange(event) {
    this.notificationTime = event;
    this.notificationTimeForSubmit = this.marketingCommonService.timeSplitter(event);
    this.notificationTimeError = !event ? true : false;
  }
  selectTimeZone(event) {
    this.timeZoneSelected = event;
    this.timeZoneError = !event ? true : false;
  }
  notificationDateTimeChange(event) {
    this.notificationDateTime = event;
    this.notificationDateTimeError = !event ? true : false;
  }
  notificationDateTimeFocus(event, calendar) {
    if (event.relatedTarget && ['BUTTON', 'NGB-MODAL-WINDOW'].some(tag => event.relatedTarget.tagName.toUpperCase() === tag)) {
      calendar.hideOverlay();
    }
  }

  timesplitter1(date1) {
    // console.log(date1)
    var t = date1
    var a = t.split(" ");
    var date = a[0];
    var time = a[1];
    return time
  }


  wholeValidator() {
    if (this.mobileNotificationSelected) {
      this.notificationNameChange(this.notificationName);
      this.campaignLinkChange(this.campaignLink);
      this.campaignImageUploader(this.campaignImage);
      if (this.triggeredCampaign) {
        this.notificationTimeChange(this.notificationTime);
        this.selectTimeZone(this.timeZoneSelected);
      } else {
        if (this.scheduleSelected == 'Event-Driven') {
          this.selectEvent(this.eventSelected);
          this.thresholdChange(this.thresholdValue)
          this.notificationTimeChange(this.notificationTime);
          this.selectTimeZone(this.timeZoneSelected);
        }
        if (this.scheduleSelected == 'Scheduled') {
          this.notificationDateTimeChange(this.notificationDateTime);
          //  this.selectTimeZone(this.timeZoneSelected);
        }
      }
    }

    if (this.triggeredCampaign && this.triggeredEventType == 'Service Limit Hit' && this.mailChimpSelected) {
      this.notificationNameMailChange(this.notificationMailName)
    }
  }
  validator() {
    this.wholeValidator();
    if (!this.triggeredCampaign) {
      if (this.mobileNotificationSelected) {
        if (this.scheduleSelected == 'Immediate') {
          if (!this.notificationNameError && !this.campaignLinkError && !this.campaignImageError && this.scheduleSelected) {
            this.validation = true
          } else {
            this.validation = false;
          }
        } else if (this.scheduleSelected == 'Event-Driven') {
          if (!this.notificationNameError && !this.campaignLinkError && !this.campaignImageError && this.scheduleSelected &&
            !this.evenTypeError && !this.thresHoldError && !this.maxlenght && !this.notificationTimeError && !this.timeZoneError) {
            this.validation = true
          } else {
            this.validation = false;
          }
        } else if (this.scheduleSelected == 'Scheduled') {
          if (!this.notificationNameError && !this.campaignLinkError && !this.campaignImageError && this.scheduleSelected &&
            !this.notificationDateTimeError
          ) {
            this.validation = true
          } else {
            this.validation = false;
          }
        }
      }
    }

    if (this.triggeredCampaign && this.triggeredEventType == 'Service Limit Hit') {
      if (this.mobileNotificationSelected && this.mailChimpSelected) {
        if (this.notificationNameMailError && this.notificationNameError) {
          this.validation = false;
        }
        else if (!this.notificationNameMailError && this.notificationNameError) {
          this.validation = false;
        } else if (this.notificationNameMailError && !this.notificationNameError) {
          this.validation = false;
        } else {
          this.validationMob()
        }

      } else if (this.mobileNotificationSelected && !this.mailChimpSelected) {
        this.validationMob()

      } else if (!this.mobileNotificationSelected && this.mailChimpSelected) {
        if (this.notificationNameMailError) {
          this.validation = false;
        } else {
          this.validation = true
        }
      }
    }


    if (this.triggeredCampaign && this.triggeredEventType != 'Service Limit Hit') {
      if (this.mobileNotificationSelected) {
        this.validationMob()
      }
    }



    this.deployValidation.emit(this.validation);
  }
  validationMob() {

    if (!this.notificationNameError && !this.notificationNameMailError && !this.campaignImageError && !this.notificationTimeError && !this.timeZoneError && !this.maxlenght && !this.campaignLinkError) {
      this.validation = true
    } else {
      this.validation = false;
    }

  }
  notificationNameChange(event) {
    if (event != undefined) {
      this.enteredText = event.replace(/  +/g, ' ');
      this.isEnteredText = this.enteredText === "" ? true : false;
      var characterCount = this.enteredText.length,
        current = $('#current'),
        maximum = $('#maximum'),
        theCount = $('#the-count');

      current.text(characterCount);
      //  this.enteredText = this.enteredText.replace(/  +/g, ' ')


      if (characterCount >= 1) {
        maximum.css('color', '#8f0001');
        current.css('color', '#8f0001');
        theCount.css('font-weight', 'bold');
      } else {
        maximum.css('color', '#666');
        theCount.css('font-weight', 'normal');
      }


      this.notificationName = this.enteredText;
      let errorObj = this.marketingCampaignDefineApiService.stringValidatorWithCrossScriptAndErrorMsgDeploy(event)

      this.notificationNameError = errorObj.error;
      this.notificationNameErrorMsg = errorObj.errorMsg;
      this.dateAssigner();
    }
    else {
      this.notificationName = event;
      let errorObj = this.marketingCampaignDefineApiService.stringValidatorWithCrossScriptAndErrorMsgDeploy(event)

      this.notificationNameError = errorObj.error;
      this.notificationNameErrorMsg = errorObj.errorMsg;
    }

  }


  ///
  notificationNameMailChange(event) {
    if (event != undefined) {
      this.notificationMailName = event
      let errorObj = this.marketingCampaignDefineApiService.stringValidatorWithCrossScriptAndErrorMsgDeploy(event)

      this.notificationNameMailError = errorObj.error;
      this.notificationNameMailErrorMsg = errorObj.errorMsg;
    } else {
      this.notificationMailName = event
      let errorObj = this.marketingCampaignDefineApiService.stringValidatorWithCrossScriptAndErrorMsgDeploy(event)

      this.notificationNameMailError = errorObj.error;
      this.notificationNameMailErrorMsg = errorObj.errorMsg;
      //  this.deployValidation.emit(false)
    }


  }
  // Submit within Component
  deploySubmit() {
    this.editDataAssigner();
    if (this.editChannelSubject) {
      this.editChannelSubject.unsubscribe();
    }
    this.editChannelSubject = this.marketingCampaignDefineApiService.editChannelDataSubject.subscribe((res) => {
      // this.channelPostObject = this.marketingCampaignDefineApiService.getMobileChannelDataEmitter();
    })
    if (this.deployNextSubject) {
      this.deployNextSubject.unsubscribe();
    }
    this.deployNextSubject = this.marketingCampaignDefineApiService.deployNextEmitterSubject.subscribe(res => {
      this.definePostObject = this.marketingCampaignDefineApiService.getDefineDataEmitter();
      this.triggeredCampaign = sessionStorage.getItem('triggered') ? true : false

      // this.definePostObject = this.marketingCampaignDefineApiService.getDefineDataEmitter();
      // this.triggeredCampaign = (this.definePostObject && (this.definePostObject.campaignType == 'Triggered')) ? true :false
      this.channelPostObject = this.marketingCampaignDefineApiService.getMobileChannelDataEmitter();
      // console.log(this.channelPostObject, ' this.channelPostObject')
      if (this.mobileNotificationSelected) {
        const channelObject = this.channelPostObject.mobileNotification;
        this.deployCampaignChannel = {
          "campaignId": this.definePostObject['campaignId'],
          "includeInChannel": channelObject['include3'],
          "marketingChannelId": channelObject['marketingChannelId'],
          "marketingChannelName": channelObject['marketingChannel'],
          "orgId": +this.ssoAuthService.getOrgId(),
        }
      } else if (this.mailChimpSelected) {
        const channelObject = this.channelPostObject.mailChimp;
        this.deployCampaignChannel = {
          "campaignId": this.definePostObject['campaignId'],
          "includeInChannel": channelObject['include2'],
          "marketingChannelId": channelObject['marketingChannelId'],
          "marketingChannelName": channelObject['marketingChannel'],
          "orgId": +this.ssoAuthService.getOrgId()

        }
        if (this.cmcType) {
          this.deployCampaignChannel.directMailFlag = this.mailchimpMsg
        }
        if (this.triggeredCampaign && this.triggeredEventType == 'Service Limit Hit') {
          this.deployCampaignChannel.notificationName = this.notificationMailName
        } else {
          this.validation = true;
        }
        //console.log(this.notificationMailName,'this.notificationMailName')
      } else if (this.faceBookSelected) {
        const channelObject = this.channelPostObject.faceBook;
        this.deployCampaignChannel = {
          "campaignId": this.definePostObject['campaignId'],
          "includeInChannel": channelObject['include1'],
          "marketingChannelId": channelObject['marketingChannelId'],
          "marketingChannelName": channelObject['marketingChannel'],
          "orgId": +this.ssoAuthService.getOrgId(),
        }

        this.validation = true;
      } else if (this.hubspotSelected) {
        const channelObject = this.channelPostObject.hubspot;
        this.deployCampaignChannel = {
          "campaignId": this.definePostObject['campaignId'],
          "includeInChannel": channelObject['include1'],
          "marketingChannelId": channelObject['marketingChannelId'],
          "marketingChannelName": channelObject['marketingChannel'],
          "orgId": +this.ssoAuthService.getOrgId()
        }
        if (this.cmcType) {
          this.deployCampaignChannel.directMailFlag = this.hubSpotMsg
        }
        this.validation = true;
      } else if (this.constantSelected) {
        const channelObject = this.channelPostObject.constant;
        this.deployCampaignChannel = {
          "campaignId": this.definePostObject['campaignId'],
          "includeInChannel": channelObject['include4'],
          "marketingChannelId": channelObject['marketingChannelId'],
          "marketingChannelName": channelObject['marketingChannel'],
          "orgId": +this.ssoAuthService.getOrgId(),
        }

        this.validation = true;
      }
      // PUT API DATA ASSIGNING
      if(this.mobileNotificationSelected){
      this.campaignDataAssiner();
      }
      // this.validator();

      if (this.validation && this.deployCampaignClicked) {
        if (this.mobileNotificationSelected) {
          this.campaignChannelService();
        }else {
          this.campaignChannelServiceForMailChimp()
        }
      }
      else if(this.deployCampaignClicked && (!this.cmcType && (!this.mailChimpSelected && !this.hubspotSelected && !this.constantSelected && !this.mobileNotificationSelected && this.csvSelected ))) {
        console.log('csvSelected')
        this.customFieldPostCall()
      }
    })
  }
customFieldPostCall(){
  if(this.personalizationPayLoadData == null || this.personalizationPayLoadData == undefined) {
    this.personalizationPayLoadData = {
      "campaignId": this.definePostObject['campaignId'],
      data:[]
      }
  }
 
  this.marketingCampaignChannelsApiService.CampaignCustomFIeldPOST(this.personalizationPayLoadData)
              .subscribe((res: any) => {
               this.customFieldSuccess.emit(true);
              }, (error) => {
                this.customFieldSuccess.emit(true);
                
              })
}

  campaignChannelService() { // in Channel user selected both or only mobileNotication selected

    const formData = new FormData();
    if (this.campaignImage !== undefined) {
      formData.append('file', this.campaignImage.target.files[0]);
      this.fileUploadSubject = this.marketingCampaignsApiService.fileUpload(formData).subscribe(res => {
        this.contentUrl = res.url;
        this.deployCampaignChannel['content'] = res.url;
        this.errorReset();
        this.campaignChannelServiceRequest(res);
      }, (error) => {
        this.loading = false;
        this.deployErrorMsgAssigner(error);
      });
    } else {
      this.deployCampaignChannel['content'] = undefined;
      this.campaignChannelServiceRequest(undefined);
    }
  }
  campaignChannelServiceRequest(res) {

    this.loading = true;
    if (!this.editMode) {
      const requests: any = {};
      const req = this.marketingCampaignChannelsApiService.CampaignChannelPOST(this.deployCampaignChannel).pipe(
        // catchError(err => (error) => {
        //   this.deployErrorMsgAssigner(error)
        // }),
        catchError(err => of({
          error: true,
          status: err.status,
          errorMessage: err.error ? err.error : err.statusText
        })),

      );
      requests['mobile_notification'] = req;
      if (this.mailChimpSelected) {
        const channelObject = this.channelPostObject.mailChimp;
        let params = {
          "campaignId": this.definePostObject['campaignId'],
          "includeInChannel": channelObject['include2'],
          "marketingChannelId": channelObject['marketingChannelId'],
          "marketingChannelName": 'Mailchimp',
          "orgId": this.ssoAuthService.getOrgId(),

          "scheduleType": ""
        }
        if (this.cmcType) {
          params['directMailFlag'] = this.mailchimpMsg
        }
        //console.log(this.notificationMailName,'this.notificationMailName2',this.triggeredCampaign && this.triggeredEventType == 'Service Limit Hit')
        if (this.triggeredCampaign && this.triggeredEventType == 'Service Limit Hit') {
          params['notificationName'] = this.notificationMailName
        } else {
          params['notificationName'] = ''
        }
        const req1 = this.marketingCampaignChannelsApiService.CampaignChannelPOST(params).pipe(
          catchError(err => of({
            error: true,
            status: err.status,
            errorMessage: err.error ? err.error : err.statusText
          })),

        );
        requests['mail_chimp'] = req1;
      }
      if (this.faceBookSelected) {
        const channelObject = this.channelPostObject.faceBook;
        //console.log(channelObject)
        let params = {
          "campaignId": this.definePostObject['campaignId'],
          "includeInChannel": channelObject['include1'],
          "marketingChannelId": channelObject['marketingChannelId'],
          "marketingChannelName": 'Facebook',
          "orgId": this.ssoAuthService.getOrgId(),
          "notificationName": "",
          "scheduleType": ""
        }
        const req2 = this.marketingCampaignChannelsApiService.CampaignChannelPOST(params).pipe(
          catchError(err => of({
            error: true,
            status: err.status,
            errorMessage: err.error ? err.error : err.statusText
          })),

        );
        requests['facebook'] = req2;
      }
      if (this.hubspotSelected) {
        const channelObject = this.channelPostObject.hubspot;
        //  console.log(channelObject)
        let params = {
          "campaignId": this.definePostObject['campaignId'],
          "includeInChannel": channelObject['include1'],
          "marketingChannelId": channelObject['marketingChannelId'],
          "marketingChannelName": 'Hubspot',
          "orgId": this.ssoAuthService.getOrgId(),
          "notificationName": "",
          "scheduleType": ""
        }
        if (this.cmcType) {
          params['directMailFlag'] = this.hubSpotMsg
        }
        const req3 = this.marketingCampaignChannelsApiService.CampaignChannelPOST(params).pipe(
          catchError(err => of({
            error: true,
            status: err.status,
            errorMessage: err.error ? err.error : err.statusText
          })),

        );
        requests['hubspot'] = req3;
      }
      if (this.constantSelected) {
        const channelObject = this.channelPostObject.constant;

        // console.log(channelObject)
        let params = {
          "campaignId": this.definePostObject['campaignId'],
          "includeInChannel": channelObject['include4'],
          "marketingChannelId": channelObject['marketingChannelId'],
          "marketingChannelName": 'ConstantContact',
          "orgId": this.ssoAuthService.getOrgId(),
          "notificationName": "",
          "scheduleType": ""
        }
        const req4 = this.marketingCampaignChannelsApiService.CampaignChannelPOST(params).pipe(
          catchError(err => of({
            error: true,
            status: err.status,
            errorMessage: err.error ? err.error : err.statusText
          })),

        );
        requests['constant'] = req4;
      }
      this.listObs = forkJoin(requests).subscribe((json: any) => {
        //console.log(json);
        this.loading = false;
        // if(json) {
        //   if(this.triggeredCampaign && this.triggeredEventType == 'Service Limit Hit'){
        //     this.CommonFunctionsService.trackPendoEvents('Engagement_Cloud','Trigger Campaign Created');
        //   }else{
        //     this.CommonFunctionsService.trackPendoEvents('Engagement_Cloud','Scheduled Campaign Created');
        //   }
        // }
        if (json.mobile_notification) {
          if (json['mobile_notification'].error) {

            if (json['mobile_notification'].status === 500) {
              if (json['mobile_notification'].errorMessage == "OK") {
                this.deployErrorMsg = this.language.internalServerError;

                this.deployError = true;
              } else if (json['mobile_notification'].message == "") {
                this.deployErrorMsg = this.language.internalServerError;
                this.deployError = true;
              }
              else {
                this.deployErrorMsg = json['mobile_notification'].errorMessage;

                this.deployError = true;
              }

              // return;
            }
            // else if (json['mobile_notification'].status == 404) {
            //   this.deployErrorMsg = this.language.URLnotFoungError;
            //   return;

            // } 
            else if (json['mobile_notification'].status == 504 || json['mobile_notification'].status == 502) {
              this.deployError = true;
              this.deployErrorMsg = this.language.timeoutErrorError;
              // return;
            }
            else if (json['mobile_notification'].status == 400) {
              if (json['mobile_notification'].errorMessage == "OK") {
                this.deployErrorMsg = this.language.Bad_Request;
                this.deployError = true;

              }
              else {
                this.deployErrorMsg = json['mobile_notification'].errorMessage;
                this.deployError = true;
              }

              // return;
            }
          }
        }
        if (json.mail_chimp) {
          if (json['mail_chimp'].error) {


            if (json['mail_chimp'].status === 500) {
              if (json['mail_chimp'].errorMessage == "OK") {
                this.deployErrorMsg = this.language.internalServerError;

                this.deployError = true;
              } else if (json['mail_chimp'].message == "") {
                this.deployErrorMsg = this.language.internalServerError;
                this.deployError = true;
              }
              else {
                this.deployErrorMsg = json['mail_chimp'].errorMessage;

                this.deployError = true;
              }
              //return;
            }
            // else if (json['mail_chimp'].status == 404) {
            //   this.deployError = true;
            //   this.deployErrorMsg = this.language.URLnotFoungError;
            //   return;

            // } 
            else if (json['mail_chimp'].status == 504 || json['mail_chimp'].status == 502) {
              this.deployError = true;
              this.deployErrorMsg = this.language.timeoutErrorError;
              //return;
            }
            else if (json['mail_chimp'].status == 400) {
              if (json['mail_chimp'].errorMessage == "OK") {
                this.deployErrorMsg = this.language.Bad_Request;
                this.deployError = true;

              }
              else {
                this.deployErrorMsg = json['mail_chimp'].errorMessage;
                this.deployError = true;
              }

              // return;
            }
          }
        }
        ////
        if (json.constant) {
          if (json['constant'].error) {


            if (json['constant'].status === 500) {
              if (json['constant'].errorMessage == "OK") {
                this.deployErrorMsg = this.language.internalServerError;

                this.deployError = true;
              } else if (json['constant'].message == "") {
                this.deployErrorMsg = this.language.internalServerError;
                this.deployError = true;
              }
              else {
                this.deployErrorMsg = json['constant'].errorMessage;

                this.deployError = true;
              }
              //return;
            }
            // else if (json['mail_chimp'].status == 404) {
            //   this.deployError = true;
            //   this.deployErrorMsg = this.language.URLnotFoungError;
            //   return;

            // } 
            else if (json['constant'].status == 504 || json['constant'].status == 502) {
              this.deployError = true;
              this.deployErrorMsg = this.language.timeoutErrorError;
              //return;
            }
            else if (json['constant'].status == 400) {
              if (json['constant'].errorMessage == "OK") {
                this.deployErrorMsg = this.language.Bad_Request;
                this.deployError = true;

              }
              else {
                this.deployErrorMsg = json['constant'].errorMessage;
                this.deployError = true;
              }

              //return;
            }
          }
        }


        ///
        if (json.facebook) {
          if (json['facebook'].error) {

            if (json['facebook'].status === 500) {
              if (json['facebook'].errorMessage == "OK") {
                this.deployErrorMsg = this.language.internalServerError;

                this.deployError = true;
              } else if (json['facebook'].message == "") {
                this.deployErrorMsg = this.language.internalServerError;
                this.deployError = true;
              }
              else {
                this.deployErrorMsg = json['facebook'].errorMessage;

                this.deployError = true;
              }
              // return;
            }
            // else if (json['facebook'].status == 404) {
            //   this.deployError = true;
            //   this.deployErrorMsg = this.language.URLnotFoungError;
            //   return;

            // }
            else if (json['facebook'].status == 504 || json['facebook'].status == 502) {
              this.deployError = true;
              this.deployErrorMsg = this.language.timeoutErrorError;
              //return;
            }
            else if (json['facebook'].status == 400) {
              if (json['facebook'].errorMessage == "OK") {
                this.deployErrorMsg = this.language.Bad_Request;
                this.deployError = true;

              }
              else {
                this.deployErrorMsg = json['facebook'].errorMessage;
                this.deployError = true;
              }

              //  return;

            }
          }
        }
        if (json.hubspot) {
          if (json['hubspot'].error) {

            if (json['hubspot'].status === 500) {

              if (json['hubspot'].errorMessage == "OK") {
                this.deployErrorMsg = this.language.internalServerError;

                this.deployError = true;
              } else if (json['hubspot'].message == "") {
                this.deployErrorMsg = this.language.internalServerError;
                this.deployError = true;
              }
              else {
                this.deployErrorMsg = json['hubspot'].errorMessage;

                this.deployError = true;
              }


              // return;
            }
            // else if (json['hubspot'].status == 404) {
            //   this.deployErrorMsg = this.language.URLnotFoungError;
            //   return;

            // } 
            else if (json['hubspot'].status == 504 || json['hubspot'].status == 502) {
              this.deployError = true;
              this.deployErrorMsg = this.language.timeoutErrorError;
              // return;
            }
            else if (json['hubspot'].status == 400) {
              if (json['hubspot'].errorMessage == "OK") {
                this.deployErrorMsg = this.language.Bad_Request;
                this.deployError = true;

              }
              else {
                this.deployErrorMsg = json['hubspot'].errorMessage;
                this.deployError = true;
              }

              //  return;

            }
          }
        }
        this.marketingCampaignDefineApiService.defineSuccesEventTrigger(this.definePostObject);
        this.campaignChannelData = res;
        this.editMode = true;
        this.deploySuccess = true;
        this.campaignApiUpdater();
        this.deploySuccessMsg = this.language.DataSavedSuccessfully;
      }, (error) => {
        // console.log(error);
        this.loading = false;
        this.deployErrorMsgAssigner(error)
      });


    } else {
      this.deployCampaignChannel['campaignChannelId'] = this.campaignChannelData.campaignChannelId;
      this.campaignChannelDeploySubject = this.marketingCampaignChannelsApiService.CampaignChannelPUT(this.deployCampaignChannel).subscribe((res: any) => {
        this.loading = false;
        this.marketingCampaignDefineApiService.defineSuccesEventTrigger(this.definePostObject);
        this.deploySuccess = true;
        this.deploySuccessMsg = this.language.DataUpdatedSuccessfully;
        // if (res == true) {
        this.campaignApiUpdater()
        // }
      }, (error) => {
        this.loading = false;
        this.deployErrorMsgAssigner(error)
      });
    }
    this.putChannelsApiCall()
    console.log(!this.cmcType && (this.mailChimpSelected || this.hubspotSelected || this.constantSelected  || this.csvSelected ),'yguyguyuyf')
    if(!this.cmcType && (this.mailChimpSelected || this.hubspotSelected || this.constantSelected  || this.csvSelected )){
      this.customFieldPostCall()
      }
  }

  campaignChannelServiceForMailChimp() { // when user selected only mailchimps or mailchip and facebook
    //console.log(this.channelPostObject, ' this.channelPostObject1')
    this.loading = true;
    this.errorReset();
    if (!this.editMode) {
      const requests: any = {};
      if (this.mailChimpSelected) {
        const channelObject = this.channelPostObject.mailChimp;
        let params = {
          "campaignId": this.definePostObject['campaignId'],
          "includeInChannel": channelObject['include2'],
          "marketingChannelId": channelObject['marketingChannelId'],
          "marketingChannelName": 'Mailchimp',
          "orgId": this.ssoAuthService.getOrgId(),
          "scheduleType": ""
        }
        if (this.cmcType) {
          params['directMailFlag'] = this.mailchimpMsg
        }
        if (this.triggeredCampaign && this.triggeredEventType == 'Service Limit Hit') {
          params['notificationName'] = this.notificationMailName
        } else {
          params['notificationName'] = ''
        }
        // console.log(this.notificationMailName,'this.notificationMailName3',this.triggeredCampaign && this.triggeredEventType == 'Service Limit Hit')
        const req = this.marketingCampaignChannelsApiService.CampaignChannelPOST(params).pipe(
          catchError(err => of({
            error: true,
            status: err.status,
            errorMessage: err.error ? err.error : err.statusText
          })),

        );
        requests['mail_chimp'] = req;
      }
      if (this.faceBookSelected) {
        const channelObject = this.channelPostObject.faceBook;
        let params = {
          "campaignId": this.definePostObject['campaignId'],
          "includeInChannel": channelObject['include1'],
          "marketingChannelId": channelObject['marketingChannelId'],
          "marketingChannelName": 'Facebook',
          "orgId": this.ssoAuthService.getOrgId(),
          "notificationName": "",
          "scheduleType": ""
        }
        const req1 = this.marketingCampaignChannelsApiService.CampaignChannelPOST(params).pipe(
          catchError(err => of({
            error: true,
            status: err.status,
            errorMessage: err.error ? err.error : err.statusText
          })),

        );
        requests['facebook'] = req1;
      }
      if (this.hubspotSelected) {
        const channelObject = this.channelPostObject.hubspot;
        let params = {
          "campaignId": this.definePostObject['campaignId'],
          "includeInChannel": channelObject['include1'],
          "marketingChannelId": channelObject['marketingChannelId'],
          "marketingChannelName": 'Hubspot',
          "orgId": this.ssoAuthService.getOrgId(),
          "notificationName": "",
          "scheduleType": ""
        }
        if (this.cmcType) {
          params['directMailFlag'] = this.hubSpotMsg
        }
        const req2 = this.marketingCampaignChannelsApiService.CampaignChannelPOST(params).pipe(
          catchError(err => of({
            error: true,
            status: err.status,
            errorMessage: err.error ? err.error : err.statusText
          })),

        );
        requests['hubspot'] = req2;
      }
      if (this.constantSelected) {
        const channelObject = this.channelPostObject.constant;
        let params = {
          "campaignId": this.definePostObject['campaignId'],
          "includeInChannel": channelObject['include4'],
          "marketingChannelId": channelObject['marketingChannelId'],
          "marketingChannelName": 'ConstantContact',
          "orgId": this.ssoAuthService.getOrgId(),
          "notificationName": "",
          "scheduleType": ""
        }
        const req4 = this.marketingCampaignChannelsApiService.CampaignChannelPOST(params).pipe(
          catchError(err => of({
            error: true,
            status: err.status,
            errorMessage: err.error ? err.error : err.statusText
          })),

        );
        requests['constant'] = req4;
      }
      this.listObs = forkJoin(requests).subscribe((json: any) => {
        //  console.log(json);
        this.loading = false;
        if (json.mail_chimp) {
          if (json['mail_chimp'].error) {
            if (json['mail_chimp'].status === 500) {
              if (json['mail_chimp'].errorMessage == "OK") {
                this.deployErrorMsg = this.language.internalServerError;

                this.deployError = true;
              }
              else {
                this.deployErrorMsg = json['mail_chimp'].errorMessage;

                this.deployError = true;
              }


              // return;
            }
            // else if (json['mail_chimp'].status == 404) {
            //   this.deployErrorMsg = this.language.URLnotFoungError;
            //   return;

            // }
            else if (json['mail_chimp'].status == 504 || json['mail_chimp'].status == 502) {
              this.deployError = true;
              this.deployErrorMsg = this.language.timeoutErrorError;
              //  return;
            }
            else if (json['mail_chimp'].status == 400) {
              if (json['mail_chimp'].errorMessage == "OK") {
                this.deployErrorMsg = this.language.Bad_Request;
                this.deployError = true;

              }
              else {
                this.deployErrorMsg = json['mail_chimp'].errorMessage;
                this.deployError = true;
              }

              // return;
            }
          }
        }
        if (json.facebook) {

          if (json['facebook'].error) {
            if (json['facebook'].error) {

              if (json['facebook'].status === 500) {
                if (json['facebook'].errorMessage == "OK") {
                  this.deployErrorMsg = this.language.internalServerError;
                  this.deployError = true;
                }
                else {

                  this.deployErrorMsg = json['facebook'].errorMessage;
                  this.deployError = true;
                }

                // return;
              }
              // else if (json['facebook'].status == 404) {
              //   this.deployErrorMsg = this.language.URLnotFoungError;
              //   return;

              // } 
              else if (json['facebook'].status == 504 || json['facebook'].status == 502) {
                this.deployError = true;

                this.deployErrorMsg = this.language.timeoutErrorError;
                // return;
              }
              else if (json['facebook'].status == 400) {
                if (json['facebook'].errorMessage == "OK") {
                  this.deployErrorMsg = this.language.Bad_Request;
                  this.deployError = true;
                }
                else {
                  this.deployErrorMsg = json['facebook'].errorMessage;
                  this.deployError = true;
                }
                // return;
              }
            }

          }
        }
        if (json.constant) {

          if (json['constant'].error) {
            if (json['constant'].error) {

              if (json['constant'].status === 500) {
                if (json['constant'].errorMessage == "OK") {
                  this.deployErrorMsg = this.language.internalServerError;
                  this.deployError = true;
                }
                else {

                  this.deployErrorMsg = json['constant'].errorMessage;
                  this.deployError = true;
                }

                //  return;
              }
              // else if (json['facebook'].status == 404) {
              //   this.deployErrorMsg = this.language.URLnotFoungError;
              //   return;

              // } 
              else if (json['constant'].status == 504 || json['constant'].status == 502) {
                this.deployError = true;

                this.deployErrorMsg = this.language.timeoutErrorError;
                // return;
              }
              else if (json['constant'].status == 400) {
                if (json['constant'].errorMessage == "OK") {
                  this.deployErrorMsg = this.language.Bad_Request;
                  this.deployError = true;
                }
                else {
                  this.deployErrorMsg = json['constant'].errorMessage;
                  this.deployError = true;
                }
                // return;
              }
            }

          }
        }
        if (json.hubspot) {

          if (json['hubspot'].error) {

            if (json['hubspot'].status === 500) {
              if (json['hubspot'].errorMessage == "OK") {
                this.deployErrorMsg = this.language.internalServerError;

                this.deployError = true;
              }
              else {
                this.deployErrorMsg = json['hubspot'].errorMessage;

                this.deployError = true;
              }

              // return;
            }
            // else if (json['hubspot'].status == 404) {
            //   this.deployErrorMsg = this.language.URLnotFoungError;
            //   return;

            // } 
            else if (json['hubspot'].status == 504 || json['hubspot'].status == 502) {
              this.deployError = true;
              this.deployErrorMsg = this.language.timeoutErrorError;
              // return;
            }
            else if (json['hubspot'].status == 400) {
              if (json['hubspot'].errorMessage == "OK") {
                this.deployErrorMsg = this.language.Bad_Request;
                this.deployError = true;

              }
              else {
                this.deployErrorMsg = json['hubspot'].errorMessage;
                this.deployError = true;
              }

              // return;

            }
          }
        }
        this.marketingCampaignDefineApiService.defineSuccesEventTrigger(this.definePostObject);
        this.campaignChannelData = this.listObs;
        this.editMode = true;
        this.deploySuccess = true;
        this.campaignApiUpdater();
        this.deploySuccessMsg = this.language.DataSavedSuccessfully;
      }, (error) => {
        // console.log(error);
        this.loading = false;
        this.deployErrorMsgAssigner(error)
      });
      // this.campaignChannelDeploySubject = this.marketingCampaignChannelsApiService.CampaignChannelPOST(params).subscribe((res: any) => {
      //   this.loading = false;
      //   this.marketingCampaignDefineApiService.defineSuccesEventTrigger(this.definePostObject);
      //   this.campaignChannelData = res;
      //   this.editMode = true;
      //   this.deploySuccess = true;
      //   this.deploySuccessMsg = this.language.DataSavedSuccessfully;
      //   // if (res == true) {
      //   this.campaignApiUpdater()
      //   // }
      // }, (error) => {
      //   this.loading = false;
      //   this.deployErrorMsgAssigner(error)
      // });
    } else {
      this.deployCampaignChannel['campaignChannelId'] = this.campaignChannelData.campaignChannelId;
      this.campaignChannelDeploySubject = this.marketingCampaignChannelsApiService.CampaignChannelPUT(this.deployCampaignChannel).subscribe((res: any) => {
        this.loading = false;
        this.marketingCampaignDefineApiService.defineSuccesEventTrigger(this.definePostObject);
        this.deploySuccess = true;
        this.deploySuccessMsg = this.language.DataUpdatedSuccessfully;
        // if (res == true) {
        this.campaignApiUpdater()
        // }
      }, (error) => {
        this.loading = false;
        this.deployErrorMsgAssigner(error)
      });
    }
    this.putChannelsApiCall()
    if(!this.cmcType && (this.mailChimpSelected || this.hubspotSelected || this.constantSelected || this.csvSelected )){
    this.customFieldPostCall()
    }
  }
  putChannelsApiCall() {

    let params = {}
    if (this.triggeredCampaign) {
      if (this.mobileNotificationSelected && this.mailChimpSelected) {
        params['channels'] = 'Mobile Notification,Mailchimp'
      } else if (this.mobileNotificationSelected && !this.mailChimpSelected) {
        params['channels'] = 'Mobile Notification'
      } else if (!this.mobileNotificationSelected && this.mailChimpSelected) {
        params['channels'] = 'Mailchimp'
      }
    } else {
      let arr = []
      if (this.mobileNotificationSelected) {
        arr.push('Mobile Notification')
      } if (this.mailChimpSelected) {
        arr.push('Mailchimp')
      } if (this.hubspotSelected) {
        arr.push('Hubspot')
      } if (this.constantSelected) {
        arr.push('Constant Contact')
      } if (this.faceBookSelected) {
        arr.push('Facebook')
      }
      params['channels'] = arr.toString()
    }
    this.marketingCampaignChannelsApiService.CampaignChannelListPUT(this.definePostObject['campaignId'], params).subscribe((res: any) => {
    }, (error) => {
    });
  }
  search_Text_Valuefun() {
    this.notificationMailName = ''
  }
  campaignChannelServiceForFacebook() { // when user selected only Facebook or Facebook and hubspot
    this.loading = true;
    this.errorReset();
    if (!this.editMode) {
      const channelObject = this.channelPostObject.faceBook;
      // console.log(channelObject)
      let params = {
        "campaignId": this.definePostObject['campaignId'],
        "includeInChannel": channelObject['include1'],
        "marketingChannelId": channelObject['marketingChannelId'],
        "marketingChannelName": 'Facebook',
        "orgId": this.ssoAuthService.getOrgId(),
        "notificationName": "",
        "scheduleType": ""
      }
      this.campaignChannelDeploySubject = this.marketingCampaignChannelsApiService.CampaignChannelPOST(params).subscribe((res: any) => {
        this.loading = false;
        this.marketingCampaignDefineApiService.defineSuccesEventTrigger(this.definePostObject);
        this.campaignChannelData = res;
        this.editMode = true;
        this.deploySuccess = true;
        this.deploySuccessMsg = this.language.DataSavedSuccessfully;
        // if (res == true) {
        this.campaignApiUpdater()
        // }
      }, (error) => {
        this.loading = false;
        this.deployErrorMsgAssigner(error)
      });
    } else {
      this.deployCampaignChannel['campaignChannelId'] = this.campaignChannelData.campaignChannelId;
      this.campaignChannelDeploySubject = this.marketingCampaignChannelsApiService.CampaignChannelPUT(this.deployCampaignChannel).subscribe((res: any) => {
        this.loading = false;
        this.marketingCampaignDefineApiService.defineSuccesEventTrigger(this.definePostObject);
        this.deploySuccess = true;
        this.deploySuccessMsg = this.language.DataUpdatedSuccessfully;
        // if (res == true) {
        this.campaignApiUpdater()
        // }
      }, (error) => {
        this.loading = false;
        this.deployErrorMsgAssigner(error)
      });
    }
  }


  campaignChannelServiceForOnlyHubspot() { // when user selected only Hubspot
    this.loading = true;
    this.errorReset();
    if (!this.editMode) {
      const channelObject = this.channelPostObject.hubspot;
      // console.log(channelObject)
      let params = {
        "campaignId": this.definePostObject['campaignId'],
        "includeInChannel": channelObject['include1'],
        "marketingChannelId": channelObject['marketingChannelId'],
        "marketingChannelName": 'Hubspot',
        "orgId": this.ssoAuthService.getOrgId(),
        "notificationName": "",
        "scheduleType": ""
      }
      if (this.cmcType) {
        params['directMailFlag'] = this.hubSpotMsg
      }
      this.campaignChannelDeploySubject = this.marketingCampaignChannelsApiService.CampaignChannelPOST(params).subscribe((res: any) => {
        this.loading = false;
        this.marketingCampaignDefineApiService.defineSuccesEventTrigger(this.definePostObject);
        this.campaignChannelData = res;
        this.editMode = true;
        this.deploySuccess = true;
        this.deploySuccessMsg = this.language.DataSavedSuccessfully;
        // if (res == true) {
        this.campaignApiUpdater()
        // }
      }, (error) => {
        this.loading = false;
        this.deployErrorMsgAssigner(error)
      });
    } else {
      this.deployCampaignChannel['campaignChannelId'] = this.campaignChannelData.campaignChannelId;
      this.campaignChannelDeploySubject = this.marketingCampaignChannelsApiService.CampaignChannelPUT(this.deployCampaignChannel).subscribe((res: any) => {
        this.loading = false;
        this.marketingCampaignDefineApiService.defineSuccesEventTrigger(this.definePostObject);
        this.deploySuccess = true;
        this.deploySuccessMsg = this.language.DataUpdatedSuccessfully;
        // if (res == true) {
        this.campaignApiUpdater()
        // }
      }, (error) => {
        this.loading = false;
        this.deployErrorMsgAssigner(error)
      });
    }
  }
  campaignApiUpdater() {
    this.definePostObject['status'] = this.triggeredCampaign ? 'Active' : "In-Progress";
    if (this.definePostObject.hasOwnProperty('segmentExecutableSize')) {
      delete this.definePostObject["segmentExecutableSize"];
    }
    this.createCampaignSubject = this.marketingCampaignsApiService.CampaignPUT(this.definePostObject).subscribe((res: any) => {
      this.marketingCampaignDefineApiService.setDefineDataEmitter(res);
      this.definePostObject = res;
      this.marketingCampaignDefineApiService.defineSuccesEventTrigger(this.definePostObject);
      this.errorReset();
    }, (error) => {
      this.deployErrorMsgAssigner(error)
    });
  }
  // PUT API DATA ASSIGNINER
  campaignDataAssiner() {
    this.deployCampaignChannel['link'] = this.campaignLink === undefined ? '' : this.campaignLink;
    this.deployCampaignChannel['scheduleType'] = this.triggeredCampaign ? '' : this.scheduleSelected;
    this.deployCampaignChannel['notificationName'] = this.notificationName;
    if (this.triggeredCampaign) {
      this.deployCampaignChannel['notificationTime'] = this.notificationTimeForSubmit
      if (this.timeZoneSelected == 'America/New_York (East Coast)') {
        this.deployCampaignChannel['notificationTimeZone'] = 'America/New_York';
      } else if (this.timeZoneSelected == "America/Chicago (Central)") {
        this.deployCampaignChannel['notificationTimeZone'] = 'America/Chicago';
      } else if (this.timeZoneSelected == 'America/Denver (Mountain)') {
        this.deployCampaignChannel['notificationTimeZone'] = 'America/Denver';
      } else if (this.timeZoneSelected == 'America/Los_Angeles (West Coast)') {
        this.deployCampaignChannel['notificationTimeZone'] = 'America/Los_Angeles';
      } else if (this.timeZoneSelected == 'UTC') {
        this.deployCampaignChannel['notificationTimeZone'] = 'UTC';
      } else {
        this.deployCampaignChannel['notificationTimeZone'] = this.timeZoneSelected;

      }
    }

    if (this.scheduleSelected == 'Event-Driven') {
      this.deployCampaignChannel['eventDriven'] = this.eventSelected;
      this.deployCampaignChannel['eventThreshold'] = this.thresholdValue;
      this.deployCampaignChannel['notificationTime'] = this.notificationTimeForSubmit
      if (this.timeZoneSelected == 'America/New_York (East Coast)') {
        this.deployCampaignChannel['notificationTimeZone'] = 'America/New_York';
        // this.notificationTimeForSubmit_date = this.dateUtils.getUserDateTime(this.notificationTimeForSubmit, "America/New_York")
        // this.deployCampaignChannel['notificationTime'] = this.timesplitter1(this.notificationTimeForSubmit_date)
      } else if (this.timeZoneSelected == "America/Chicago (Central)") {
        this.deployCampaignChannel['notificationTimeZone'] = 'America/Chicago';
        // this.notificationTimeForSubmit_date = this.dateUtils.getUserDateTime(this.notificationTimeForSubmit, "America/Chicago")
        // this.deployCampaignChannel['notificationTime'] = this.timesplitter1(this.notificationTimeForSubmit_date)
      } else if (this.timeZoneSelected == 'America/Denver (Mountain)') {
        this.deployCampaignChannel['notificationTimeZone'] = 'America/Denver';
        // this.notificationTimeForSubmit_date = this.dateUtils.getUserDateTime(this.notificationTimeForSubmit, "America/Denver")
        // this.deployCampaignChannel['notificationTime'] = this.timesplitter1(this.notificationTimeForSubmit_date)
      } else if (this.timeZoneSelected == 'America/Los_Angeles (West Coast)') {
        this.deployCampaignChannel['notificationTimeZone'] = 'America/Los_Angeles';
        // this.notificationTimeForSubmit_date = this.dateUtils.getUserDateTime(this.notificationTimeForSubmit, "America/Los_Angeles")
        // this.deployCampaignChannel['notificationTime'] = this.timesplitter1(this.notificationTimeForSubmit_date)

      } else if (this.timeZoneSelected == 'UTC') {
        this.deployCampaignChannel['notificationTimeZone'] = 'UTC';

        // this.notificationTimeForSubmit_date = this.dateUtils.getUserDateTime(this.notificationTimeForSubmit, "UTC")
        // this.deployCampaignChannel['notificationTime'] = this.timesplitter1(this.notificationTimeForSubmit_date)
      } else {
        this.deployCampaignChannel['notificationTimeZone'] = this.timeZoneSelected;

      }

    }
    if (this.scheduleSelected == 'Scheduled') {
      this.deployCampaignChannel['scheduledDateTime'] = this.notificationDateTime;
      // if (this.timeZoneSelected == 'America/New_York (East Coast)') {
      //   this.deployCampaignChannel['notificationTimeZone'] = 'America/New_York';
      // } else if (this.timeZoneSelected == "America/Chicago (Central)") {
      //   this.deployCampaignChannel['notificationTimeZone'] = 'America/Chicago';
      // } else if (this.timeZoneSelected == 'America/Denver (Mountain)') {
      //   this.deployCampaignChannel['notificationTimeZone'] = 'America/Denver';
      // } else if (this.timeZoneSelected == 'America/Los_Angeles (West Coast)') {
      //   this.deployCampaignChannel['notificationTimeZone'] = 'America/Los_Angeles';
      // } else {
      //   this.deployCampaignChannel['notificationTimeZone'] = this.timeZoneSelected;
      // }
    }
  }
  deployErrorMsgAssigner(error) {
    this.deployErrorMsg = this.marketingCommonService.errorHandling(error);
    // if (error.status == 404) {
    //   this.deployError = true;
    //   this.deployErrorMsg = this.language.URLnotFoungError;
    //   return;

    // } else
    if (error.status == 504 || error.status == 502) {
      this.deployError = true;

      this.deployErrorMsg = this.language.timeoutErrorError;
      // return;
    } else if (error.status == 400) {
      if (error.errorMessage == "OK") {
        this.deployErrorMsg = this.language.Bad_Request;
        this.deployError = true;

      }
      else {
        this.deployErrorMsg = error.error;
        this.deployError = true;
      }
      // return;
      // if (error.error) {
      //   return error.error
      // } else {
      //   this.deployErrorMsg = this.language.errorOccured;
      //   return;
      // }
    }
    else if (error.status == 500) {

      if (error.errorMessage == "OK") {
        this.deployErrorMsg = this.language.internalServerError;

        this.deployError = true;
      }
      else {
        this.deployErrorMsg = error.error;

        this.deployError = true;
      }

      //  return;
    }
    // else if (error.error) {
    //   let errorMsg = error.error.errorDesc;
    //   this.deployErrorMsg = errorMsg ? errorMsg : error.error;
    // }
  }
  errorReset() {
    this.deployError = false;
    this.deploySuccess = false;
    this.scheduleSelected = 'Immediate';
    this.notificationName = ''
    this.campaignLink = ''
    this.notificationNameError = false
    //  this.notificationNameMailError = false
    //  this.notificationMailName=''
    this.evenTypeError = false
    this.thresHoldError = false
    this.timeZoneError = false
    this.notificationTimeError = false
    this.campaignLinkError = false;
    this.campaignLinkErrorMsg = '';
    this.campaignImageError = false;
    this.campaignImageErrorMsg = undefined;
    this.campaignImage = ''
    var characterCount = 0,

      current = $('#current')
    current.text(characterCount);
    if(!this.validation){
    this.personalizationApiData = [];
    this.selectedNodes = [];
    this.selectedParameters ={};
    this.selectedRows = [];
    this.attributesSelect = false;
    this.attributesSelectOrNot.emit(this.attributesSelect);
    this.convertPersonalizationApiData(this.personalizationApiDataRestore);
    }
  }
  editDataAssigner() {
    if (this.editChannelSubject) {
      this.editChannelSubject.unsubscribe()
    }
    this.editChannelSubject = this.marketingCampaignDefineApiService.editCampaignChannelDataSubject.subscribe((res: any) => {
      //  console.log('11111111')
      this.dataAssigner(res);
    })


  }
  dataAssigner(res?: any) {
    this.definePostObject = this.marketingCampaignDefineApiService.getDefineDataEmitter();

    // this.triggeredCampaign = (this.definePostObject && (this.definePostObject.campaignType == 'Triggered')) ? true :false
    let data = res ? res[0] : this.marketingCampaignDefineApiService.getCampaignChannelDataEmitter[0];
    if (data) {
      const { params, s3 } = this.setAWSObject(data.content);
      let file = s3.getSignedUrl('getObject', params, function (error, url) {
        this.campaignImageFile = error ? '' : url;

      });

      this.campaignImageFile = data.content
      this.scheduleSelected = data.scheduleType ? data.scheduleType : 'Immediate';
      this.campaignLink = data.link;
      var Start_date = new Date(this.definePostObject.startDate)
      this.endDate = new Date(this.definePostObject.endDate)
      var current_date = this.marketingCommonService.formatDateForCampaign(new Date());
      this.startDate = this.marketingCommonService.formatDateForCampaign(Start_date);
      if (this.scheduleSelected == 'Immediate') {
        if (current_date < this.startDate) {
          this.campaignError = true
        } else {
          this.campaignError = false
        }
      } else {
        this.campaignError = false
      }
      if (this.triggeredCampaign && this.triggeredEventType == 'Service Limit Hit') {
        this.notificationMailName = data.notificationName
      }
      if (this.scheduleSelected == 'Event-Driven') {
        this.eventSelected = data.eventDriven;
        this.thresholdValue = data.eventThreshold
        this.notificationTime = data.notificationTime
        if (this.timeZoneSelected == 'America/New_York (East Coast)') {
          this.timeZoneSelected = 'America/New_York';
        } else if (this.timeZoneSelected == "America/Chicago (Central)") {
          this.timeZoneSelected = 'America/Chicago';
        } else if (this.timeZoneSelected == 'America/Denver (Mountain)') {
          this.timeZoneSelected = 'America/Denver';
        } else if (this.timeZoneSelected == 'America/Los_Angeles (West Coast)') {
          this.timeZoneSelected = 'America/Los_Angeles';
        } else {
          this.timeZoneSelected = data.notificationTimeZone
        }

      }
      if (this.scheduleSelected == 'Scheduled') {
        this.notificationDateTime = data.scheduledDateTime;
        // if (this.timeZoneSelected == 'America/New_York (East Coast)') {
        //   this.timeZoneSelected = 'America/New_York';
        // } else if (this.timeZoneSelected == "America/Chicago (Central)") {
        //   this.timeZoneSelected = 'America/Chicago';
        // } else if (this.timeZoneSelected == 'America/Denver (Mountain)') {
        //   this.timeZoneSelected = 'America/Denver';
        // } else if (this.timeZoneSelected == 'America/Los_Angeles (West Coast)') {
        //   this.timeZoneSelected = 'America/Los_Angeles';
        // } else {
        //   this.timeZoneSelected = data.notificationTimeZone
        // }
      }
    } else {
      this.resetData();
    }
  }
  dateAssigner() {
    let definedData = this.marketingCampaignDefineApiService.getDefineDataEmitter();

    let _enddate = definedData && definedData.startDate ? definedData.startDate : this.startDatee
    var Start_date = new Date(_enddate)
    var current_date = this.marketingCommonService.formatDateForCampaign(new Date());
    this.startDate = this.marketingCommonService.formatDateForCampaign(Start_date);
    if (this.scheduleSelected == 'Immediate') {
      if (current_date < this.startDate) {
        this.campaignError = true
      } else {
        this.campaignError = false
      }
    } else {
      this.campaignError = false
    }
  }
  resetData() {
    this.campaignImageFile = ''
    this.campaignImage = null;
    if (this.imageupload) {
      this.imageupload.nativeElement.value = "";
    }
    this.scheduleSelected = 'Immediate';
    this.dateAssigner()
    this.campaignLink = undefined;
    this.eventSelected = undefined;
    this.thresholdValue = undefined
    this.notificationTime = undefined
    this.timeZoneSelected = undefined
    this.notificationDateTime = undefined;
    this.timeZoneSelected = undefined
    this.notificationMailName = undefined
  }
  clearFunction() {
    if (this.clearCampaignSubject) {
      this.clearCampaignSubject.unsubscribe();
    }
    this.clearCampaignSubject = this.marketingCampaignDefineApiService.clearCampaignDataSubject.subscribe((res: any) => {
      if (res == 'deploy') {
        this.dataAssigner();
      }

    })
  }
  csvDownload() {
    let app = this.marketingApiService.getQlikConnectedApp();
    downloadQSReports(app, 'CSV Download')
  }
  
  // DOWNLOAD SECTION 
  // csvDownload() {
  //   console.log('csv dowload');

  //   let app = this.marketingApiService.getQlikConnectedApp();
  //   downloadQSReports(app, 'CSV Download')
  // }
  // facebookDownload() {
  //   console.log('csv dowload');

  //   let app = this.marketingApiService.getQlikConnectedApp();
  //   downloadQSReports(app, 'Facebook')
  // }
  ngOnChanges(changes: SimpleChanges) {
    // debugger;
    this.numberOrder();
    this.getSetMethod()
  }
  numberOrder() {
    let index = 0;
    if (this.mobileNotificationSelected) {
      index = index + 1;
      this.indexValue = index;
    }
    if (this.mailChimpSelected && this.cmcType) {
      index = index + 1;
      this.indexValue1 = index;
    }
    if ((this.mailChimpSelected || this.csvSelected || this.hubspotSelected || this.constantSelected) && !this.cmcType) {
      index = index + 1;
      this.indexValue1 = index;
    }
    if (this.faceBookSelected) {
      index = index + 1;
      this.indexValue2 = index;
    }
    if (this.hubspotSelected) {
      index = index + 1;
      this.indexValue3 = index;
    }
    if (this.csvSelected) {
      index = index + 1;
      this.indexValue4 = index;
    }
    if (this.constantSelected) {
      index = index + 1;
      this.indexValue5 = index;
    }

    //console.log(this.mobileNotificationSelected, this.mailChimpSelected, this.faceBookSelected, this.csvSelected, this.hubspotSelected, this.constantSelected)


  }
  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.createCampaignSubject) {
      this.createCampaignSubject.unsubscribe();
    }
    if (this.campaignChannelDeploySubject) {
      this.campaignChannelDeploySubject.unsubscribe();
    }
    if (this.clearCampaignSubject) {
      this.clearCampaignSubject.unsubscribe();
    }
    if (this.editChannelSubject) {
      this.editChannelSubject.unsubscribe();
    }
    if (this.deployNextSubject) {
      this.deployNextSubject.unsubscribe();
    }
    // if (this.fileUploadSubject) {
    //   this.fileUploadSubject.unsubscribe();
    // }

  }
  electronicLink() {
    window.open(`https://calix.force.com/idp/login?app=0sp4u0000008OKk`);
  }
  onKeypressEvent(event) {
    // Get the key 
    // console.log(event)
    var regex = new RegExp("^[a-zA-Z0-9_-]+$");
    var str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (regex.test(str)) {
      return true;
    }

    event.preventDefault();
    return false;

  }
  setAWSObject(image) {
    let params = {
      Bucket: environment.IMAGE_UPLOAD_BUCKET,
      Key: image.split('/').pop(),//'top-applications-amazon-subscribers-7583-ALL-2020-09-01-2020-10-31-1437994302.csv',
      Expires: 60 * 5
    }

    let s3 = new AWS.S3({
      accessKeyId: environment.IMAGE_UPLOAD_AWS_ACCESS_KEY,
      secretAccessKey: environment.IMAGE_UPLOAD_AWS_ACCESS_SECRET
    });

    return { params: params, s3: s3 };
  }
  showMailChimpMsg() {
    this.mailchimpMsg = !this.mailchimpMsg;
  }

  showHubspotMsg() {
    this.hubSpotMsg = !this.hubSpotMsg;
  }

  selectedChannelTodeploy() {
    this.channelNames = '';
    let modelChennalName = '';
    if(this.mailChimpSelected) {
      this.channelNames = this.language.Mailchimp;
      modelChennalName = this.language.Mailchimp;
    } 
    if(this.hubspotSelected) {
      if(this.mailChimpSelected) {
        this.channelNames += `, ${this.language.HubSpot}`
        modelChennalName += `, ${this.language.HubSpot}`
      } else {
        this.channelNames += this.language.HubSpot
        modelChennalName += this.language.HubSpot
      }
    } 
    if(this.constantSelected) {
      if(this.mailChimpSelected || this.hubspotSelected) {
        this.channelNames += `, ${this.language.constantcontact}`
        modelChennalName += `, ${this.language.constantcontact}`
      } else {
        this.channelNames += this.language.constantcontact
        modelChennalName += this.language.constantcontact
      }
    } 
    if(this.csvSelected) {
      if(this.mailChimpSelected || this.hubspotSelected || this.constantSelected) {
        this.channelNames += `, ${this.language.CSVDownload}`
      } else {
        this.channelNames += this.language.CSVDownload
      }
    }
  if(this.channelNames != '') {
    // this.deployedToSelectedChannels = this.language.deployToChannels(channelNames);
    this.deployedToSelectedChannelsModal.emit(modelChennalName);

  }
} 

}
