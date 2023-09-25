import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild, TemplateRef, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingCampaignsApiService } from '../../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { MarketingCampaignChannelsApiService } from '../shared/services/marketing-campaign-channels-api.service';
import { MarketingCampaignDefineApiService } from '../shared/services/marketing-campaign-define-api.service';
import { downloadQSReports } from '../../shared/services/qlik-connection.js';
import { MarketingApiService } from '../../shared/services/marketing-api.sevice';
import * as Highcharts from 'highcharts';
require('highcharts/highcharts-more')(Highcharts);
import { MarketingCampaignsChartServiceService } from './marketing-campaigns-chart-service.service';
import { DownloadFileNameService } from '../../marketing-explore-data/basic/shared/services/download-file-name.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidatorService } from 'src/app-services/validator.services';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import * as moment from 'moment';
@Component({
  selector: 'app-marketing-campaigns-result',
  templateUrl: './marketing-campaigns-result.component.html',
  styleUrls: ['./marketing-campaigns-result.component.scss']
})
export class MarketingCampaignsResultComponent implements OnInit {
  @Output() csvDownloadValue = new EventEmitter();
  @Output() campaignStatus = new EventEmitter;
  @ViewChild('redeployMailchimpModal', { static: false }) private redeployMailchimpModal: TemplateRef<any>;
  @ViewChild('redeployFbModal', { static: false }) private redeployFbModal: TemplateRef<any>;
  @ViewChild('redeployHubSpotModal', { static: false }) private redeployHubSpotModal: TemplateRef<any>;
  @ViewChild('redeployConstantContactModal', { static: false }) private redeployConstantContactModal: TemplateRef<any>;
  @ViewChild('reviewCiqModal', { static: false }) private reviewCiqModal: TemplateRef<any>;
  @ViewChild('redeployCiqModal', { static: false }) private redeployCiqModal: TemplateRef<any>;
  @ViewChild('imageupload') imageupload: ElementRef;

  scopes: any;
  deduplicatedDataAvailable: boolean = false
  Highcharts = Highcharts;
  language: any;
  //Hubspot: any;
  languageSubject: any;
  categories: any = []
  xAxisSeries: any = []
  definePostObject: any
  resultDataObject: any;
  ServiceType: any
  resultCampaignDataObject: any;
  mailchimpResultCampaignDataObject: any;
  facebookResultCampaignDataObject: any;
  hubspotResultCampaignDataObject: any;
  constantResultCampaignDataObject: any;
  resultCampaignDataObject_mail: any;
  allSelected: boolean = false;
  resultDataAvailable: boolean = false;
  divopen: any = false
  // SUBJECT
  resultCampaignSubject: any;
  nextSubject: any;
  resultCampaignChannelSubject: any;
  activeChart: any
  revenue: boolean = true
  subscriber: boolean
  hasScope: boolean = false
  //ERROR
  resultErrorMsg: any
  resultError: boolean = false;
  fullScreen: boolean = false;
  hideMobileNotification: boolean = false;
  revenueScreen: boolean = false
  id: any;
  onlymailchimp: boolean = false;
  Hubspot: boolean = false;
  ConstantContact: boolean = false;
  Mailchimp: boolean = false;
  MobileNotification: boolean = false;
  Facebook: boolean = false;
  campaignId: any;
  csvDownloadOnly: boolean;
  // mobileSelected: any = 'col-lg-6 col-md-6 col-sm-12';
  // mobileWithAnyOne: any = 'col-md-12 p-0';


  deployCampaignChannel: any = {};
  timeZoneSelected: any;
  thresholdValue: any;
  eventSelected: any;
  scheduleSelected: any;
  campaignLink: any;
  notificationName: any;
  notificationTime: any;
  notificationDateTime: any;
  notifff: any;
  enteredText: any;
  isEnteredText: boolean = true;
  notificationNameError: boolean = false;
  notificationNameErrorMsg: any;
  endDate: Date;
  startDate: string;
  campaignError: boolean = false
  campaignLinkError: boolean = false;
  campaignLinkErrorMsg: any;
  campaignImage: any;
  campaignImageFile: any;
  campaignImageError: boolean = false;
  campaignImageErrorMsg: any;
  thresHoldError: boolean = false;
  scheduleArray = [
    'Immediate',
  //  'Event-Driven',
    'Scheduled'
  ];
  eventTypeDataArray = [
    { id: 'Competitor', name: 'Competitor Visit Minutes' },
    { id: 'serviceLimit', name: 'Service Limit Hits' },
    { id: 'Speed Test', name: 'Speed Test Minutes' }

  ];
  evenTypeError: boolean = false;
  timeZoneDataArray = [
    "UTC",
    "America/New_York (East Coast)",
    "America/Chicago (Central)",
    "America/Denver (Mountain)",
    "America/Los_Angeles (West Coast)"
  ];
  timeZoneError: boolean = false;
  notificationTimeForSubmit: string;
  notificationTimeError: boolean = false;
  notificationDateTimeError: boolean = false;
  minimumDate = new Date();
  notificationDate_Time
  minimumDatenew 
  notificationTimeForSubmit_date: any;
  validation: boolean = false;
  campaignImageFileResult: any;
  fileUploadSubject: any;
  contentUrl: string;
  maxlenght: boolean;

  ciqModal: boolean = false;
  facebookModal: boolean = false;
  hubspotModal: boolean = false;
  constantContactModal: boolean = false;
  mailchimpModal: boolean = false;
  formModal: boolean = false;
  Dismiss: any;
  triggeredCampaign: boolean = false;
  scheduledCampaign: boolean = false;
  nullCampaign: boolean = false;
  isSnapShot: boolean = false;
  audienceHistory:boolean = false;
  campaignMetrics:boolean = false;
  triggedMailchimp:boolean = false;
  triggedMobile:boolean = false;
  triggeredData:any =[]
 
  constructor(
    private translateService: TranslateService,
    private marketingCampaignDefineApiService: MarketingCampaignDefineApiService,
    private marketingCampaignsApiService: MarketingCampaignsApiService,
    private marketingCampaignChannelsApiService: MarketingCampaignChannelsApiService,
    private marketingCampaignsChartServiceService: MarketingCampaignsChartServiceService,
    private downloadFileNameService: DownloadFileNameService,
    private route: ActivatedRoute,
    private marketingApiService: MarketingApiService,
    private marketingCommonService: MarketingCommonService,
    private exportExcelService: ExportExcelService,
    private dialogService: NgbModal,
    private validatorService: ValidatorService,
    private dateUtils: DateUtilsService,
  ) {
    this.scopeAsssiner();
    this.id = this.route.snapshot.params;
    if (this.id && this.id.id) {
      this.editOrResultCheck(this.id.id)
    }
    this.deploySubmit();

  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      if (this.campaignId) {
        this.resultOfCampaignApiLoader(this.campaignId);
      }
      
    });
   // this.minimumDate = new Date(this.minimumDate.getTime() + 15 * 60000);
    // this.notificationDateTime = this.minimumDate;
 
  }
  onChangeActiveMethod(){
    if(!this.triggeredCampaign){
      if ((this.scopes.revenueRead || this.scopes.revenueWrite) && (this.scopes.subscriberRead || this.scopes.subscriberWrite)) {
        this.hasScope = false
        this.activeChart = 'revenue'
        this.revenueScreen = true
      } else if (this.scopes.revenueRead || this.scopes.revenueWrite) {
        this.hasScope = false
        this.activeChart = 'revenue'
        this.revenueScreen = true
      } else if ((!this.scopes.revenueRead || !this.scopes.revenueWrite) && (this.scopes.subscriberRead || this.scopes.subscriberWrite)) {
        this.hasScope = false
        this.revenueScreen = false
        this.activeChart = 'subscriber'
      } else if ((!this.scopes.revenueRead || !this.scopes.revenueWrite) && (!this.scopes.subscriberRead || !this.scopes.subscriberWrite)) {
        this.hasScope = true
      } else {
        this.hasScope = true
      }
    }else{
      this.activeChart = 'audienceHistory'
      this.chartChange(this.activeChart)
      console.log(this.activeChart )
    }
  }
  download() {
    let data = this.usageByAppDataForming(this.resultDataObject.channels)
    this.exportExcelService.downLoadCSV(this.language['Audience Distribution'], data);
  }
  scopeAsssiner() {
    this.scopes = this.marketingCommonService.getCMCScopes();
  }
  usageByAppDataForming(array, page?: any) {
    let returnArray = [];
    let obj = {}

    let totals = this.getArraySum(array.map(el => el.originalValue));
    array.forEach(el => {
      returnArray.push({ [this.language['CHANNEL NAME']]: el.channelName, [this.language['CHANNEL SIZE']]: el.channelSize })
    });

    return returnArray;
  }
  getArraySum(value) {
    let arrayData = value;
    if (typeof arrayData == 'object') {
      arrayData = Object.values(value);
    }
    let sum = value.reduce(function (a, b) {
      return a + b;
    }, 0);
    return sum;
  }
  expandFull(channel) {
    this.fullScreen = true
    this.deduplicatedDataAvailable = true
    if (this.resultDataObject.channels != null) {
      this.onlymailchimp = false
      this.marketingCampaignsChartServiceService.serviceTierTechnologyOptions(this.resultDataObject.channels).subscribe((data: any) => {
        setTimeout(() => {
          let chart = Highcharts.chart('subscriber-home-chart', data)
        }, 500);
      })
      this.Dismiss = this.language.subs_fullscreen_close_tip;
    } else {
      this.onlymailchimp = true
      this.deduplicatedDataAvailable = false
      this.fullScreen = false;
    }
  }
  fullScreenExpandFunction(chartname) {
    this.fullScreen = false
    this.deduplicatedDataAvailable = false
    if (this.id && this.id.id) {
      this.editOrResultCheck(this.id.id)
    }
  }
  editOrResultCheck(id) {
    let idArray = id.split('_');
    if (idArray && idArray[1] == 'result') {
      this.resultOfCampaignApiLoader(idArray[0]);
    }
  }
  // Submit within Component
  deploySubmit() {
    if (this.nextSubject) {
      this.nextSubject.unsubscribe();
    }
    this.nextSubject = this.marketingCampaignDefineApiService.deploy2ndNextEmitterSubject.subscribe(res => {
      // if (res) {
      this.definePostObject = this.marketingCampaignDefineApiService.getDefineDataEmitter();
      this.triggeredCampaign = (this.definePostObject && (this.definePostObject.campaignType == 'Triggered')) ? true :false
      this.scheduledCampaign =(this.definePostObject && (this.definePostObject.campaignType == 'Scheduled')) ? true :false
      this.nullCampaign =(this.definePostObject && (this.definePostObject.campaignType == null)) ? true :false
      this.campaignId = this.definePostObject.campaignId;
      if (this.fullScreen) {
        this.expandFull(undefined)
      }
      this.resultOfCampaignApiLoader(this.campaignId);
      // }
    })
  }
  chartChange(chartValue: any) {
    this.activeChart = chartValue
    this.trueFalseAssigner(this.activeChart);
  }
  trueFalseAssigner(exception) {
    this.revenue = exception == 'revenue' ? true : false;
    this.subscriber = exception == 'subscriber' ? true : false;
    this.audienceHistory = exception == 'audienceHistory' ? true : false;
    this.campaignMetrics = exception == 'campaignMetrics' ? true : false;

  }
  resultOfCampaignApiLoader(id: any) {
    sessionStorage.setItem('id_camp', id)
    this.resultDataAvailable = false;
    this.resultCampaignSubject = this.marketingCampaignsApiService.CampaignDetailGET(id).subscribe((res: any) => {
      this.marketingCampaignDefineApiService.setDefineDataEmitter(res);
      this.resultDataObject = res;
      this.isSnapShot = res.snapshotCreated == true ? true : false 
      this.definePostObject = this.marketingCampaignDefineApiService.getDefineDataEmitter();
      this.triggeredCampaign = (this.resultDataObject.campaignType == 'Triggered') ? true :false
      this.scheduledCampaign = (this.resultDataObject.campaignType == 'Scheduled') ? true :false
      this.nullCampaign =(this.definePostObject && (this.definePostObject.campaignType == null)) ? true :false
      this.onChangeActiveMethod()
      this.csvDownloadOnly = res.csvDownloadOnly;
      this.csvDownloadValue.emit(this.csvDownloadOnly);
      this.campaignStatus.emit(res.status);
      sessionStorage.setItem('status', this.resultDataObject.status);
      sessionStorage.setItem('start_date', this.resultDataObject.startDate);
      sessionStorage.setItem('end_date', this.resultDataObject.endDate);
      if (this.resultDataObject.service != "" && this.resultDataObject.service != undefined && this.resultDataObject.service != "") {

        this.ServiceType = this.resultDataObject.service
      } else {
        this.ServiceType = ' -- '
      }
      this.resultDataAvailable = true;

      if (this.resultDataObject.channels != null) {
        this.onlymailchimp = false
        this.marketingCampaignsChartServiceService.serviceTierTechnologyOptions(this.resultDataObject.channels).subscribe((data: any) => {
    
          setTimeout(() => {
            let chart = Highcharts.chart('subscriber-tier-home-chart', data)
            if (this.fullScreen) {
              let chart2 = Highcharts.chart('subscriber-home-chart', data)
            }
          }, 500);
        })
        // this.marketingCampaignsChartServiceService.areaChartOptions().subscribe((data: any) => {
        //   setTimeout(() => {
        //     let chart = Highcharts.chart('container', data)
        //   }, 500);

        // })
      } else {
        this.onlymailchimp = true
        this.deduplicatedDataAvailable = false
        this.fullScreen = false
      }
      this.resultCampaignChannelSubject = this.marketingCampaignChannelsApiService.CampaignChannelByOrgGET(id).subscribe((res: any) => {
      if(!this.triggeredCampaign){
        if (Array.isArray(res)) {
          this.onlymailchimp = false
          if (res.length == 4 || res.length > 4) {
            //this.mobileSelected = this.MobileNotification === true ? 'col-lg-8 col-md-6 col-sm-12' : 'col-lg-12 col-md-12 col-sm-12';
            //this.mobileWithAnyOne = this.MobileNotification === true ? 'col-lg-8 col-md-6 col-sm-12' : 'col-lg-4 col-md-4 col-sm-12';
            this.allSelected = true;
            this.hideMobileNotification = false;
            res.map(data => {
              if (data.marketingChannelName === 'Mobile Notification') {
                this.MobileNotification = true
                this.resultCampaignDataObject = data;
              } else if (data.marketingChannelName === 'Mailchimp') {
                this.Mailchimp = true
                this.mailchimpResultCampaignDataObject = data;
              } else if (data.marketingChannelName === 'Facebook') {
                this.Facebook = true;
                this.facebookResultCampaignDataObject = data;
              }
              else if (data.marketingChannelName === 'Hubspot') {
                this.Hubspot = true;
                this.hubspotResultCampaignDataObject = data;
              } else if (data.marketingChannelName === 'ConstantContact') {
                this.ConstantContact = true
                this.constantResultCampaignDataObject = data;
              }
            });
          }
          else if (res.length == 3 || res.length > 3) {
            this.allSelected = false;

            res.map(data => {
              if (data.marketingChannelName === 'Mobile Notification') {
                this.resultCampaignDataObject = data;
                this.hideMobileNotification = false;
                this.MobileNotification = true
              } else {

                if (!this.MobileNotification) {
                  this.hideMobileNotification = false;
                  this.MobileNotification = false
                }
              } if (data.marketingChannelName === 'Mailchimp') {
                this.mailchimpResultCampaignDataObject = data;
                this.Mailchimp = true
              } else {
                if (!this.Mailchimp) {
                  this.Mailchimp = false
                }
              }
              if (data.marketingChannelName === 'Facebook') {
                this.facebookResultCampaignDataObject = data;
                this.Facebook = true;
              } else {
                if (!this.Facebook) {
                  this.Facebook = false
                }
              }
              if (data.marketingChannelName === 'Hubspot') {
                this.hubspotResultCampaignDataObject = data;
                this.Hubspot = true;

              } else {
                if (!this.Hubspot) {
                  this.Hubspot = false
                }
              }
              if (data.marketingChannelName === 'ConstantContact') {
                this.constantResultCampaignDataObject = data;
                this.ConstantContact = true;

              } else {
                if (!this.ConstantContact) {
                  this.ConstantContact = false
                }
              }

            });
          }
          else if (res.length == 2) {
            this.allSelected = false;
            res.map(data => {
              if (data.marketingChannelName === 'Mobile Notification') {
                this.MobileNotification = true
                this.resultCampaignDataObject = data;
              } else if (data.marketingChannelName === 'Mailchimp') {
                this.Mailchimp = true
                this.mailchimpResultCampaignDataObject = data;
              } else if (data.marketingChannelName === 'Facebook') {
                this.Facebook = true;
                this.facebookResultCampaignDataObject = data;
              } else if (data.marketingChannelName === 'Hubspot') {
                this.Hubspot = true;
                this.hubspotResultCampaignDataObject = data;
              } else if (data.marketingChannelName === 'ConstantContact') {
                this.ConstantContact = true;
                this.constantResultCampaignDataObject = data;
              }
            });
            //this.mobileSelected = this.MobileNotification === true ? 'col-lg-6 col-md-6 col-sm-12' : 'col-lg-12 col-md-12 col-sm-12';
            this.hideMobileNotification = this.MobileNotification === true ? false : true;
            // this.mobileWithAnyOne = this.MobileNotification === true ? 'col-lg-8 col-md-6 col-sm-12' : 'col-lg-4 col-md-4 col-sm-12';
          } else if (res.length == 1) {
            this.allSelected = false;
            if (res[0].marketingChannelName.includes('Mailchimp')) {
              this.mailchimpResultCampaignDataObject = res[0];
              this.Mailchimp = true;
              this.hideMobileNotification = true;
              this.MobileNotification = false;
              this.Facebook = false;
              this.Hubspot = false;
              this.ConstantContact = false;
              // this.mobileWithAnyOne = 'col-lg-8 col-md-6 col-sm-12'
              // this.mobileSelected = 'col-lg-6 col-md-6 col-sm-12';
            } else if (res[0].marketingChannelName.includes('Mobile Notification')) {
              this.resultCampaignDataObject = res[0];
              this.Mailchimp = false;
              this.MobileNotification = true;
              this.Facebook = false;
              this.Hubspot = false;
              this.ConstantContact = false;
            } else if (res[0].marketingChannelName.includes('Facebook')) {
              this.Mailchimp = false;
              this.hideMobileNotification = true;
              this.facebookResultCampaignDataObject = res[0];
              this.MobileNotification = false;
              this.Facebook = true;
              this.Hubspot = false;
              this.ConstantContact = false;
              // this.mobileWithAnyOne = 'col-lg-8 col-md-6 col-sm-12'
              // this.mobileSelected = 'col-lg-6 col-md-6 col-sm-12';
            } else if (res[0].marketingChannelName.includes('Hubspot')) {
              this.Mailchimp = false;
              this.Hubspot = true;
              this.hideMobileNotification = true;
              this.hubspotResultCampaignDataObject = res[0];
              this.MobileNotification = false;
              this.Facebook = false;
              this.ConstantContact = false;
              // this.mobileWithAnyOne = 'col-lg-8 col-md-6 col-sm-12'
              // this.mobileSelected = 'col-lg-6 col-md-6 col-sm-12';
            } else if (res[0].marketingChannelName.includes('ConstantContact')) {
              this.Mailchimp = false;
              this.Hubspot = false;
              this.hideMobileNotification = true;
              this.constantResultCampaignDataObject = res[0];
              this.MobileNotification = false;
              this.Facebook = false;
              this.ConstantContact = true;
              // this.mobileWithAnyOne = 'col-lg-8 col-md-6 col-sm-12'
              // this.mobileSelected = 'col-lg-6 col-md-6 col-sm-12';
            }
          }

        } else {
          this.onlymailchimp = true
        }
      }else{
        if (Array.isArray(res)) {
          if(res.length > 0){
            res.map(data => {
              if (data.marketingChannelName === 'Mobile Notification') {
                this.resultCampaignDataObject = data;
              }
            })
          this.triggeredData = res
        }
      }
      }
      }, (error) => {
        this.resultErrorMsgAssigner(error)
      })
    }, (error) => {
      this.resultErrorMsgAssigner(error)
    })


  }
  resultErrorMsgAssigner(error) {
    let errorMsg = error.error.errorDesc;
    this.resultErrorMsg = errorMsg ? errorMsg : error.error;
    this.resultError = true;
  }
redeploy(data,index){
if(data == 'Mailchimp'){
this.openRedeployMailchimpModal()
}else{
  this.openRedeployCiqModal()
}
}
  csvDownload() {
    let app = this.marketingApiService.getQlikConnectedApp();
    downloadQSReports(app, 'CSV Download')
  }
  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.resultCampaignSubject) {
      this.resultCampaignSubject.unsubscribe();
    }
    if (this.nextSubject) {
      this.nextSubject.unsubscribe();
    }
    if (this.resultCampaignChannelSubject) {
      this.resultCampaignChannelSubject.unsubscribe();
    }

  }


  // ----------------------Re-Depoly-----------------------------
  notificationNameChange(event) {
    if (event != undefined) {
      this.enteredText = event.replace(/  +/g, ' ');
      this.isEnteredText = this.enteredText === "" ? true : false;
      var characterCount = this.enteredText.length,
        current = $('#current'),
        maximum = $('#maximum'),
        theCount = $('#the-count');

      current.text(characterCount);

      if (characterCount >= 1) {
        maximum.css('color', '#8f0001');
        current.css('color', '#8f0001');
        theCount.css('font-weight', 'bold');
      } else {
        maximum.css('color', '#666');
        theCount.css('font-weight', 'normal');
      }
      this.notificationName = this.enteredText;
      let errorObj = this.marketingCampaignDefineApiService.stringValidatorWithCrossScriptAndErrorMsgDeploy(event);
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
  dateAssigner() {
    let definedData = this.marketingCampaignDefineApiService.getDefineDataEmitter();
    var Start_date = new Date(definedData.startDate)
    this.endDate = new Date(definedData.endDate)
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

  campaignImageUploader(event) {
    this.campaignImage = event;
    if (this.campaignImage !== undefined) {
      this.campaignImageError = true;
      this.campaignImageErrorMsg = undefined;
    } else {
      this.campaignImageError = false;
    }
    if (event && event.target.files && event.target.files[0]) {
      console.log(event.target.files[0].size)
      if (event.target.files[0].size > 1048575) {
        this.imageUploadErrorFunction();
        this.campaignImageErrorMsg = this.language.fileSize
      } else if (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpeg' ||
        event.target.files[0].type == 'image/jpg') {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {
          this.campaignImageFile = reader.result;
          //console.log(reader.result);
        };
        reader.readAsDataURL(file);
        this.campaignImageError = false;

      } else {
        this.imageUploadErrorFunction();
        this.campaignImageErrorMsg = this.language.jpg_jpeg
      }

    } else {
      this.imageUploadErrorFunction();
    }
    this.campaignChannelService();
  }
  imageUploadErrorFunction() {
    // console.log("erro")
    // if (this.campaignImage) {
    //   this.imageupload.nativeElement = "";
    // }
    this.campaignImageFile = ''
    this.campaignImage = undefined;
  }
  selectSchedule(event) {
    this.scheduleSelected = event;
    this.dateAssigner();


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

  selectTimeZone(event) {
    this.timeZoneSelected = event;
    this.timeZoneError = !event ? true : false;
  }
  notificationTimeChange(event) {
    this.notificationTime = event;
    this.notificationTimeForSubmit = this.marketingCommonService.timeSplitter(event);
    this.notificationTimeError = !event ? true : false;
  }
  dateValidation: boolean = false;
  notificationDateTimeChange(event) {
    let fromDt = new Date(event);
    fromDt.setSeconds(0);
    let date = new Date()
    date.setSeconds(0);
    if (fromDt < date) {
      this.dateValidation = true
    }
    else {
      this.dateValidation = false;
    }
    this.notificationDateTime=event
    this.notificationDateTimeError = !event  ? true : false;
  }
  wholeValidator() {
    this.notificationNameChange(this.notificationName);
    this.campaignLinkChange(this.campaignLink);
    this.campaignImageUploader(this.campaignImage);
    if(this.triggeredCampaign){
      this.notificationTimeChange(this.notificationTime);
      this.selectTimeZone(this.timeZoneSelected);
    }else{
    if (this.scheduleSelected == 'Event-Driven') {
      this.selectEvent(this.eventSelected);
      this.thresholdChange(this.thresholdValue)
      this.notificationTimeChange(this.notificationTime);
      this.selectTimeZone(this.timeZoneSelected);
    }
    if (this.scheduleSelected == 'Scheduled') {
      // this.notificationDateTimeChange(this.notificationDateTime);

    }
  }
  }
  validator() {
    this.wholeValidator();
    if(this.triggeredCampaign){
      if (!this.notificationNameError && !this.campaignLinkError && !this.campaignImageError && !this.notificationTimeError && !this.timeZoneError) {
        this.validation = true
      } else {
        this.validation = false;
      }
    }else{
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
        !this.notificationDateTimeError && !this.dateValidation
      ) {
        this.validation = true
      } else {
        this.validation = false;
      }
    }
  }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.ciqModal) {
      this.openReviewCiqModal();

    }
    else if (event.key === 'Enter' && this.formModal) {
      this.campaignDataAssiner();
    }
    else if (event.key === 'Enter' && this.facebookModal) {
      this.ReDeployFacebook();
    }
    else if (event.key === 'Enter' && this.hubspotModal) {
      this.ReDeployHubSpot();
    }
    else if (event.key === 'Enter' && this.constantContactModal) {
      this.ReDeployConstantContact();
    }
    else if (event.key === 'Enter' && this.mailchimpModal) {
      this.ReDeployMailchimp();
    }

    this.ciqModal = false;
    this.facebookModal = false;
    this.hubspotModal = false;
    this.constantContactModal = false;
    this.mailchimpModal = false;
  }

  openReviewCiqModal() {
    this.formModal = true;
    //this.notificationDateTime = this.minimumDate;
    this.eventSelected = undefined;
    this.thresholdValue = undefined;
    this.timeZoneSelected = undefined;
    this.notificationTime = this.minimumDate;
    this.closeModel();;
    this.dialogService.open(this.reviewCiqModal, { backdrop: 'static', keyboard: false, centered: true, windowClass: 'review-ciq-modal' });
    this.scheduleSelected = this.triggeredCampaign ? '' : this.resultCampaignDataObject.scheduleType;
    this.notificationName = this.resultCampaignDataObject.notificationName;
    this.campaignLink = this.resultCampaignDataObject.link;
    this.campaignImageFileResult = this.resultCampaignDataObject.content;
    if(this.triggeredCampaign){
      if (this.resultCampaignDataObject.notificationTimeZone == 'America/New_York') {
        this.timeZoneSelected = 'America/New_York (East Coast)';
      } else if (this.resultCampaignDataObject.notificationTimeZone == "America/Chicago") {
        this.timeZoneSelected = "America/Chicago (Central)"

      } else if (this.resultCampaignDataObject.notificationTimeZone == 'America/Denver') {
        this.timeZoneSelected = "America/Denver (Mountain)";

      } else if (this.resultCampaignDataObject.notificationTimeZone == 'America/Los_Angeles') {
        this.timeZoneSelected = "America/Los_Angeles (West Coast)"

      } else if (this.resultCampaignDataObject.notificationTimeZone == 'UTC') {
        this.timeZoneSelected = "UTC";
      } else {
        this.timeZoneSelected = "";
      }
      this.notificationTime = this.resultCampaignDataObject.notificationTime ? new Date(this.dateUtils.getLocalTime(this.resultCampaignDataObject.notificationTime, this.resultCampaignDataObject.notificationTimeZone)) : new Date();
    }else{
    if (this.resultCampaignDataObject.scheduleType == 'Event-Driven') {
      this.eventSelected = this.resultCampaignDataObject.eventDriven;
      this.thresholdValue = this.resultCampaignDataObject.eventThreshold;
      if (this.resultCampaignDataObject.notificationTimeZone == 'America/New_York') {
        this.timeZoneSelected = 'America/New_York (East Coast)';
      } else if (this.resultCampaignDataObject.notificationTimeZone == "America/Chicago") {
        this.timeZoneSelected = "America/Chicago (Central)"

      } else if (this.resultCampaignDataObject.notificationTimeZone == 'America/Denver') {
        this.timeZoneSelected = "America/Denver (Mountain)";

      } else if (this.resultCampaignDataObject.notificationTimeZone == 'America/Los_Angeles') {
        this.timeZoneSelected = "America/Los_Angeles (West Coast)"

      } else if (this.resultCampaignDataObject.notificationTimeZone == 'UTC') {
        this.timeZoneSelected = "UTC";
      } else {
        this.timeZoneSelected = "";
      }
      this.notificationTime = this.resultCampaignDataObject.notificationTime ? new Date(this.dateUtils.getLocalTime(this.resultCampaignDataObject.notificationTime, this.resultCampaignDataObject.notificationTimeZone)) : new Date();
    }

    if (this.resultCampaignDataObject.scheduleType == 'Scheduled') {

    //  let start_date = moment(this.resultCampaignDataObject.scheduledDateTime).format("MM/DD/YYYY hh:mm:ss a")
     
      this.minimumDatenew = new Date();
      this.notificationDate_Time = this.resultCampaignDataObject.scheduledDateTime ? new Date(this.resultCampaignDataObject.scheduledDateTime) : new Date();
     this.notificationDateTime=this.notificationDate_Time
     this.notificationDateTimeChange(this.notificationDateTime)
      // this.notifff = this.resultCampaignDataObject.scheduledDateTime ? new Date(this.resultCampaignDataObject.scheduledDateTime) : new Date();
    }
  }
  }
  notificationTimeSplit() {
    let notificationTimeval = this.resultCampaignDataObject.notificationTime ? this.resultCampaignDataObject.notificationTime : new Date();
    let notificationTimeplit = notificationTimeval.split(":");
    let todayDate = new Date();
    todayDate.setHours(notificationTimeplit[0]);
    todayDate.setMinutes(notificationTimeplit[1]);
    let result = new Date(todayDate);
    return result;
  }
  openRedeployCiqModal() {
    this.dialogService.open(this.redeployCiqModal, { backdrop: 'static', keyboard: false, centered: true, windowClass: 're-deply-modal' });
    this.ciqModal = true;
  }
  openRedeployFbModal() {
    this.dialogService.open(this.redeployFbModal, { backdrop: 'static', keyboard: false, centered: true, windowClass: 're-deply-modal' });
    this.facebookModal = true;
  }
  openRedeployMailchimpModal() {
    this.dialogService.open(this.redeployMailchimpModal, { backdrop: 'static', keyboard: false, centered: true, windowClass: 're-deply-modal' });
    this.mailchimpModal = true;
  }
  openRedeployHubSpotModal() {
    this.dialogService.open(this.redeployHubSpotModal, { backdrop: 'static', keyboard: false, centered: true, windowClass: 're-deply-modal' });
    this.hubspotModal = true;
  }
  openRedeployConstantContactModal() {
    this.dialogService.open(this.redeployConstantContactModal, { backdrop: 'static', keyboard: false, centered: true, windowClass: 're-deply-modal' });
    this.constantContactModal = true;
  }
  ReDeployMailchimp() {
    this.resultDataAvailable = false;
    let params = {
      "campaignId": this.mailchimpResultCampaignDataObject.campaignId,
      "includeInChannel": this.mailchimpResultCampaignDataObject.includeInChannel,
      "marketingChannelId": this.mailchimpResultCampaignDataObject.marketingChannelId,
      "marketingChannelName": this.mailchimpResultCampaignDataObject.marketingChannelName,
      "orgId": this.mailchimpResultCampaignDataObject.orgId,
      "notificationName": "",
      "scheduleType": "",
      directMailFlag:this.mailchimpResultCampaignDataObject.directMailFlag,
    }
    this.marketingCampaignChannelsApiService.CampaignChannelPUT(params).subscribe((res: any) => {
      this.resultOfCampaignApiLoader(this.campaignId);
    }, (error) => {
      console.log(error);
    });
    this.closeModel();;
  }

  ReDeployHubSpot() {
    this.resultDataAvailable = false;
    let params = {
      "campaignId": this.hubspotResultCampaignDataObject.campaignId,
      "includeInChannel": this.hubspotResultCampaignDataObject.includeInChannel,
      "marketingChannelId": this.hubspotResultCampaignDataObject.marketingChannelId,
      "marketingChannelName": this.hubspotResultCampaignDataObject.marketingChannelName,
      "orgId": this.hubspotResultCampaignDataObject.orgId,
      "notificationName": "",
      "scheduleType": "",
      directMailFlag:this.hubspotResultCampaignDataObject.directMailFlag,
    }
    this.marketingCampaignChannelsApiService.CampaignChannelPUT(params).subscribe((res: any) => {
      this.resultOfCampaignApiLoader(this.campaignId);
    }, (error) => {
    });
    this.closeModel();;
  }

  ReDeployConstantContact() {
    this.resultDataAvailable = false;
    let params = {
      "campaignId": this.constantResultCampaignDataObject.campaignId,
      "includeInChannel": this.constantResultCampaignDataObject.includeInChannel,
      "marketingChannelId": this.constantResultCampaignDataObject.marketingChannelId,
      "marketingChannelName": this.constantResultCampaignDataObject.marketingChannelName,
      "orgId": this.constantResultCampaignDataObject.orgId,
      "notificationName": "",
      "scheduleType": ""
    }
    this.marketingCampaignChannelsApiService.CampaignChannelPUT(params).subscribe((res: any) => {
      this.resultOfCampaignApiLoader(this.campaignId);
    }, (error) => {
      console.log(error);
    });
    this.closeModel();;
  }

  ReDeployFacebook() {
    this.resultDataAvailable = false;
    let params = {
      "campaignId": this.facebookResultCampaignDataObject.campaignId,
      "includeInChannel": this.facebookResultCampaignDataObject.includeInChannel,
      "marketingChannelId": this.facebookResultCampaignDataObject.marketingChannelId,
      "marketingChannelName": this.facebookResultCampaignDataObject.marketingChannelName,
      "orgId": this.facebookResultCampaignDataObject.orgId,
      "notificationName": "",
      "scheduleType": ""
    }
    this.marketingCampaignChannelsApiService.CampaignChannelPUT(params).subscribe((res: any) => {
      this.resultOfCampaignApiLoader(this.campaignId);
    }, (error) => {
    });
    this.closeModel();;

  }

  timesplitter1(date1) {
    var t = date1
    var a = t.split(" ");
    var date = a[0];
    var time = a[1];
    return time
  }

  campaignChannelService() {
    const formData = new FormData();
    if (this.campaignImage !== undefined) {
      formData.append('file', this.campaignImage.target.files[0]);
      this.fileUploadSubject = this.marketingCampaignsApiService.fileUpload(formData).subscribe(res => {
        this.contentUrl = res.url;
      }, (error) => {
        console.log(error)
      });
    } else {
      this.contentUrl = this.resultCampaignDataObject.content;

    }
  }

  campaignDataAssiner() {
    this.resultDataAvailable = false;
    this.formModal = true;
    this.deployCampaignChannel = {};
    this.notificationTimeChange(this.notificationTime);
    this.validator();
    this.deployCampaignChannel['campaignId'] = this.resultCampaignDataObject.campaignId;
    this.deployCampaignChannel['orgId'] = this.resultCampaignDataObject.orgId;
    this.deployCampaignChannel['marketingChannelId'] = this.resultCampaignDataObject.marketingChannelId;
    this.deployCampaignChannel['marketingChannelName'] = this.resultCampaignDataObject.marketingChannelName;
    this.deployCampaignChannel['includeInChannel'] = this.resultCampaignDataObject.includeInChannel;

    if (this.contentUrl != null) {
      this.deployCampaignChannel['content'] = this.contentUrl;
    }
if(this.triggeredCampaign){
  this.deployCampaignChannel['notificationTime'] = this.notificationTimeForSubmit;
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
        this.deployCampaignChannel['notificationTime'] = new Date(this.notificationTime).toISOString
      }
}
    this.deployCampaignChannel['link'] = this.campaignLink === undefined ? '' : this.campaignLink;
    this.deployCampaignChannel['scheduleType'] =this.triggeredCampaign ?'': this.scheduleSelected;
    this.deployCampaignChannel['notificationName'] = this.notificationName;
    if (this.scheduleSelected == 'Event-Driven') {
      this.deployCampaignChannel['eventDriven'] = this.eventSelected;
      this.deployCampaignChannel['eventThreshold'] = this.thresholdValue;
      this.deployCampaignChannel['notificationTime'] = this.notificationTimeForSubmit;
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
        this.deployCampaignChannel['notificationTime'] = new Date(this.notificationTime).toISOString
      }

    }
    if (this.scheduleSelected == 'Scheduled') {
      this.deployCampaignChannel['scheduledDateTime'] = this.notificationDateTime;
    }
    if (this.deployCampaignChannel.hasOwnProperty('segmentExecutableSize')) {
      delete this.deployCampaignChannel["segmentExecutableSize"];
    }
    if (this.validation) {
      console.log(this.validation, 'oo')
      this.marketingCampaignChannelsApiService.CampaignChannelPUT(this.deployCampaignChannel).subscribe((res: any) => {

      }, (error) => {
        console.log(error);
      });
      this.closeModel();
      // this.resultOfCampaignApiLoader(this.campaignId);
    }

  }


  closeModel() {

    this.dialogService.dismissAll();
    this.ciqModal = false;
    this.facebookModal = false;
    this.hubspotModal = false;
    this.constantContactModal = false;
    this.mailchimpModal = false;
    this.formModal = false;
    this.notificationNameError = false;
    this.campaignLinkError = false;
    this.campaignImageError = false;
    this.scheduleSelected = false;
    this.notificationDateTimeError = false;
    this.notificationNameError = false;
    this.timeZoneError = false;
    this.thresHoldError = false;
    this.evenTypeError = false;
    this.dateValidation = false;
    this.resultOfCampaignApiLoader(this.campaignId);
  }


}
