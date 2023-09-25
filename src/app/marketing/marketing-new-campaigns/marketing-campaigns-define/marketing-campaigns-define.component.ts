import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingCampaignDefineApiService } from '../shared/services/marketing-campaign-define-api.service';
import { MarketingExploreDataBasicApiService } from '../../marketing-explore-data/basic/explore-data-basic-api.service';
import * as constants from "../../shared/constants/marketing.constants";
import { ValidatorService } from './../../../../app-services/validator.services';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { MarketingCampaignsApiService } from '../../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { MarketingExploreDataServiceApiService } from '../../marketing-explore-data/basic/marketing-service-chart/marketing-explore-data-service-api.service';
import { MarketingSegmentsApiService } from '../../marketing-segments/shared/marketing-segments-api.service';
import { MarketingCommonService } from './../../shared/services/marketing-common.service';
import { getRecommendedSegmentAdditionalFilters } from './../../shared/services/qlik-connection.js';
import { MarketingApiService } from '../../shared/services/marketing-api.sevice';
import { downloadCSVSegmentFilters } from '../../shared/services/qlik-connection.js';
import { environment } from 'src/environments/environment';
import { ExportDataChartOptionsService } from '../../marketing-explore-data/basic/shared/services/explore-data-chart-options.service';
var CryptoJS = require('crypto-js');
import * as moment from 'moment';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { MarketingHomeApiService } from '../../marketing-home/marketing-home-Apiservice';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { error } from 'console';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
@Component({
  selector: 'app-marketing-campaigns-define',
  templateUrl: './marketing-campaigns-define.component.html',
  styleUrls: ['./marketing-campaigns-define.component.scss']
})
export class MarketingCampaignsDefineComponent implements OnInit {
  @Output() defineDataValidation = new EventEmitter();
  @Output() selectedSegmentItem = new EventEmitter();
  defineData: any;
  language: any;
  languageSubject: any;
  // EDIT OR RESULT
  editMode: boolean = false;
  resultMode: boolean = false;

  summary: boolean
  map: boolean
  dataSet: boolean
  activeTab;
  recommendedSegmentSelected: boolean = false;
  acquisationSegmentSelected: boolean = false
  acquihidedata: boolean = false
  ticketId
  ticketIdUser
  // PARAMS DATA VARIABLES
  definedCampaignDataObject: any;
  campaignName: any;
  segment: any;
  segmentSelected: any;
  segmentSelectedType:any
  segmentSelectedId: any
  propensitySelected = 'All';
  serviceSelected = 'All'
  locationSelected = 'All';
  zipcodeSelected: any
  zipcodePlusSelected: any
  regionSelected = 'All';
  campaignBudget: any;
  campaignTarget: any;
  startDate: any;
  endDate: any;
  minimumDate = new Date();

  // ERROR
  campaignNameError: boolean = false;
  campaignNameErrorMsg: any;
  eventErrorMsg: any;
  resendErrorMsg: any;
  segmentError: boolean = false;
  segmentNameErrorMsg: any;

  campaignBudgetError: boolean = false;
  campaignBudgetErrorMsg: any;

  campaignTargetError: boolean = false;

  startDateError: boolean = false;
  endDateError: boolean = false;
  resendError: boolean = false;
  eventError: boolean = false;
  validationPassed: boolean = false;
  definePostError: boolean = false;
  definePostErrorMsg: any;
  definePostSuccess: boolean = false;
  definePostSuccessMsg: any;
  //zipcodeError: boolean = false
  debounceTimer: boolean = false;
  eventTrigger:any
  resendDay:any
  // SUBJECTS
  regionSubject: any;
  locationsSubject: any;
  serviceTierTechSubject: any;
  defineCampaignSubject: any
  savedSegmentSubject: any;
  recommendedSegmentSubject: any;
  clearCampaignSubject: any;
  defineNextEmitterSubject: any;
  editCampaignDataSubject: any;

  // DATA
  savedSegmentArray: any;
  recommendedSegmentArray: any;
  segmentType: string;

  zipcodeDataArray: any
  zipcodePlusDataArray: any
  serviceAll = { name: 'All' }
  objectOfAll: object = { value: constants.CLOUD_ALL };
  regionsDataArray = [constants.CLOUD_ALL]
  //propensityDataArray = ['All', 'High'];
  propensityDataArray = [constants.CLOUD_ALL]
  //locationData: Array<any> = [constants.CLOUD_ALL];
  locationData = [constants.CLOUD_ALL]
  allLocationData: Array<any>;

  definePostObject: any;
  serviceDataArray = [constants.CLOUD_ALL]
  searchText: string;
  recommendedSegmentData: any;
  savedSegmentData: any;
  loading: boolean = false;
  app

  dropdownList = [];
  selectedItems = [];
//triggerDefaultValue:any=[]
  zipcodeArray: any = []
  zipcodePlusArray: any = []
  dev: boolean = false;
  uploadData: boolean = false;
  @Input() MarketingCampaignsDeployComponent;
  errorStatus: any;
  triggeredCampaign:boolean = false
  active:boolean= false
  cmcType:boolean= false
  isThoughspotAvailable:boolean= false;
  CompetitorVisitMinutes:boolean = false;
  SpeedTestMinutes:boolean = false;
  ServiceLimit:boolean = false;
  eventType:any
  eventTypeSetValue:any
  eventTypeList :any = []
  eventTypeError: boolean = false;
  triggerArrayItems = [
    'Competitor Visit Minutes (Mobile Notification Only)',
    'Service Limit Hit',
    'Speed Test Minutes (Mobile Notification Only)'
  ]
  estimatedAudi:any = '-' 
  internalProd:boolean = false
  constructor(
    private translateService: TranslateService,
    private marketingCampaignDefineApiService: MarketingCampaignDefineApiService,
    private marketingExploreDataBasicApiService: MarketingExploreDataBasicApiService,
    private marketingExploreDataServiceApiService: MarketingExploreDataServiceApiService,
    private marketingSegmentsApiService: MarketingSegmentsApiService,
    private marketingCampaignsApiService: MarketingCampaignsApiService,
    private validatorService: ValidatorService,
    private ssoAuthService: SsoAuthService,
    private marketingCommonService: MarketingCommonService,
    private marketingApiService: MarketingApiService,
    private sso: SsoAuthService,
    private exportDataChartOptionsService: ExportDataChartOptionsService,
    private cdref: ChangeDetectorRef,
    private CommonFunctionsService:CommonFunctionsService,
    private marketingHomeApiService: MarketingHomeApiService,
    private dialogService: NgbModal

  ) {
    // let base = `${environment.API_BASE}`;
    // if (base.indexOf('/dev.api.calix.ai') > -1) {
    //   this.dev = true
    // } else {
    //   this.dev = false
    // }
    // this.defineData = new defineData();
  }
  removeUnwantedSpace(input,value){
    this[input] = this.CommonFunctionsService.trimSpaceFromNonObjectInputs(value)
  }
  ngOnInit(): void {
    this.internalProd = WindowRefService.prototype.nativeWindow.includes('internal-calixcloud.calix.com') ? true : false
    let entitlement = this.ssoAuthService.getEntitlements();
    this.isThoughspotAvailable = entitlement['209'] ? true : false
    if(this.internalProd){
      //Internal Prod
      if(this.isThoughspotAvailable){
        this.cmcType = true
        this.qlikTicketURL()
      }else{
        this.cmcType = false
      }
    }else{
   // if(this.isThoughspotAvailable){
      this.checkTSStatus()
    // }else{
    //   this.cmcType = false
    // }
  }
    this.summary = true
    this.activeTab = 'summary';
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.triggeredCampaign = sessionStorage.getItem('triggered') ? true : false
    this.getSegmentsTrigger();
    if(this.triggeredCampaign){
      this.eventTrigger = 50
      this.resendDay = 90
     // this.getTriggerDefaultValues()
    }
    this.clearFunction();
    this.defineSubmit();
    this.cdref.detectChanges();
  }
  qlikTicketURL() {
    return new Promise((resolve, reject) => {
      this.marketingHomeApiService.getTsAuthToken().subscribe((res) => {
      }, err => {
        let ticket = err.error.text ? err.error.text : '';
        if(ticket.includes("~~")){
          var stringArray = ticket.split("~~");
          this.ticketId = stringArray[0];
          this.ticketIdUser=stringArray[1];
         }else{
          this.ticketId = ticket;
          this.ticketIdUser = '';
         }
      })
    })
  }
  filteredArray() {
    if (this.searchText !== "" && this.recommendedSegmentArray != null || this.recommendedSegmentArray != undefined) {
      this.recommendedSegmentData = this.recommendedSegmentArray.filter((item) => {
        return item.segmentName.toLowerCase().includes(this.searchText.toLowerCase());

      })
    }

    if (this.searchText !== "" && this.savedSegmentArray != null || this.savedSegmentArray != undefined) {
      this.savedSegmentData = this.savedSegmentArray.filter((item) => {
        return item.segmentName.toLowerCase().includes(this.searchText.toLowerCase());
      })
    }
    if (this.searchText === "") {
      this.recommendedSegmentData = this.recommendedSegmentArray;
      this.savedSegmentData = this.savedSegmentArray;
    }

  }
  onBlur(event) {
    event.preventDefault();
    this.searchText = '';
    this.recommendedSegmentData = this.recommendedSegmentArray;
    this.savedSegmentData = this.savedSegmentArray;
  }

  baseApiLoader() {
    if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
    var qlikOpenConnectionAppSubject = this.marketingApiService.qlikOpenConnectionApp.subscribe((app: any) => {
      let app1 = this.marketingApiService.getQlikConnectedApp();
      let filter = {}
      downloadCSVSegmentFilters(this.segmentSelectedId, 'Recommended', filter, app1).then(res => {
        //downloadCSVSegmentFilters(this.segmentSelectedId, 'Recommended', filter, this.app).then(res => {
        this.regionsApiLoader(1);
        this.locationsApiLoader(1);
        this.serviceTierApiLoader(1);
        this.propensityApiLoader(1)
      })
    }, (error: any) => {

    })
    if (this.marketingApiService.getQlikConnectedApp()) {
      let app1 = this.marketingApiService.getQlikConnectedApp();
      let filter = {}
      downloadCSVSegmentFilters(this.segmentSelectedId, 'Recommended', filter, app1).then(res => {
        this.regionsApiLoader(1);
        this.locationsApiLoader(1);
        this.serviceTierApiLoader(1);
        this.propensityApiLoader(1)
      })
    }
  }else{
    this.regionsApiLoader(1);
     this.locationsApiLoader(1);
    this.serviceTierApiLoader(1);
    this.propensityApiLoader(1)
  }
   
  
  }
 getCampaignList(){
  this.eventTypeList =[]
  this.marketingCampaignsApiService.CampaignsListPopup('Triggered',this.eventType).subscribe((res: any) => {
    if (Array.isArray(res)) {
      if (res.length > 0) {
        this.eventTypeList = res
      }else{
        this.eventTypeList =[]
      }
     }else{
      this.eventTypeList =[]
      }
  
  }),(error)=>{
    this.eventTypeList =[]

  }
 }
  getSegmentsTrigger() {
    this.savedSegmentSubject = this.marketingSegmentsApiService.SavedSegmentsListCampGET(this.triggeredCampaign)
      .subscribe((res: any) => {
        if (Array.isArray(res)) {
          this.savedSegmentArray = res;
          this.savedSegmentData = res;

        } else {
          this.savedSegmentArray = undefined;
        }
      }, (error) => {
        this.savedSegmentArray = undefined;
       // this.defineErrorMsgAssigner(error);
      })
    this.recommendedSegmentSubject = this.marketingSegmentsApiService.recommendedSegmentsListCampGET(this.triggeredCampaign).subscribe((res: any) => {
      if (Array.isArray(res)) {
        //    debugger;
        let entitlement = this.sso.getEntitlements();
        if (!entitlement['209']) {
          res = res.filter(segmenttype => segmenttype.segmentType != 'Acquisition');
        }

        this.recommendedSegmentArray = res;
        this.recommendedSegmentData = res;


      } else {
        this.recommendedSegmentArray = undefined;
      }
    }, (error) => {
      this.recommendedSegmentArray = undefined;
     // this.defineErrorMsgAssigner(error);
    })

  }

  regionsApiLoader(from) {
    this.regionsDataArray = []
    let app1 = this.marketingApiService.getQlikConnectedApp();
    if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
    getRecommendedSegmentAdditionalFilters(app1, 'JMaAZ').then(res => {
    this.regionFilteredData(res)
    }, (error: any) => {
    })
    }else{
    let runfilter = []
    this.getThoughSpotDataRegion(this.ticketIdUser, this.ticketId,'region',runfilter)
    }
  }

  regionFilteredData(res){
    let regionData = []
    this.regionsDataArray = [constants.CLOUD_ALL]
    for (var i = 0; i < res.data.length; i++) {
      regionData.push(res.data[i].Region)
    }


    if (this.segment.hasOwnProperty('region')) {
      if (this.segment.region[0] != null && this.segment.region[0] != '') {
        this.regionSelected = this.segment.region[0]
        this.regionsDataArray = [...this.regionsDataArray, ...regionData];
      } else {
        this.regionsDataArray = [...this.regionsDataArray, ...regionData];
        this.regionSelected = constants.CLOUD_ALL;
      }
    } else if (this.regionSelected! = null && this.regionSelected != '') {
      this.regionsDataArray = [...this.regionsDataArray, ...regionData];
    }

    else {
      this.regionsDataArray = [...this.regionsDataArray, ...regionData];
      this.regionSelected = constants.CLOUD_ALL;
    }
  }
  locationFilteredData(res){
    let locData =[]
    this.locationData = [constants.CLOUD_ALL]
    for (var i = 0; i < res.data.length; i++) {
      locData.push(res.data[i].Location)
    }
    
    if (this.segment.hasOwnProperty('location')) {
      if (this.segment.location[0] != null && this.segment.location[0] != '') {
        this.locationSelected = this.segment.location[0]
        this.locationData = [...this.locationData, ...locData];
      } else {
        this.locationData = [...this.locationData, ...locData];
        this.locationSelected = constants.CLOUD_ALL;
      }
    } else {
      this.locationData = [...this.locationData, ...locData];
      this.locationSelected = constants.CLOUD_ALL;
    }
  }
  serviceFilteredData(res){
    let service_data =[]
    this.serviceDataArray = [constants.CLOUD_ALL]
    for (var i = 0; i < res.data.length; i++) {
      service_data.push(res.data[i].Service)
    }

    if (this.segment.hasOwnProperty('serviceTier')) {
      if (this.segment.serviceTier[0] != null && this.segment.serviceTier[0] != '') {
        this.serviceSelected = decodeURIComponent(this.segment.serviceTier[0])
        this.serviceDataArray = [...this.serviceDataArray, ...service_data];
      } else {
        this.serviceDataArray = [...this.serviceDataArray, ...service_data];
        this.serviceSelected = constants.CLOUD_ALL;
      }
    } else {
      this.serviceDataArray = [...this.serviceDataArray, ...service_data];
      this.serviceSelected = constants.CLOUD_ALL;
    }
  }

propensityFilteredData(res){
  let pros_data =[]
  this.propensityDataArray = [constants.CLOUD_ALL]
  for (var i = 0; i < res.data.length; i++) {
    pros_data.push(res.data[i].Propensity)
  }
  // this.propensityDataArray = [...this.propensityDataArray, ...locData];
  // this.propensitySelected = constants.CLOUD_ALL;
  // this.selectPropensity(this.propensitySelected, from)
  if (this.segment.hasOwnProperty('propensity')) {
    if (this.segment.propensity != null && this.segment.propensity != '') {
      this.propensitySelected = this.segment.propensity
      this.propensityDataArray = [...this.propensityDataArray, ...pros_data];
    } else {
      this.propensityDataArray = [...this.propensityDataArray, ...pros_data];
      this.propensitySelected = constants.CLOUD_ALL;
    }
  } else {
    this.propensityDataArray = [...this.propensityDataArray, ...pros_data];
    this.propensitySelected = constants.CLOUD_ALL;
  }
}
  getZipcodeSelect(event) {

    if (this.zipcodeArray == null) {
      this.zipcodeArray = []
    }
    this.zipcodeArray.push(event.item_text)
    this.segment['zipcode'] = this.zipcodeArray

    // if (this.dev) {
     if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)) {
    let app1 = this.segmentType == 'Acquisition' ? this.marketingApiService.getQlikConnectedApp_Aqui() : this.marketingApiService.getQlikConnectedApp();
    console.log(app1, ' let app1')
    let filter = {
      zipcode: this.zipcodeSelected.join(';').toString(),
    }
    if (this.zipcodeSelected != null) {
      console.log(this.zipcodeSelected.join(';').toString(), 'select', filter)
    }
    downloadCSVSegmentFilters(this.segmentSelectedId, 'Recommended', filter, app1).then(res => {
      this.zipcodePlusApiLoader(0)
    })
      }else{
        let filter = [{
          columnName:'Zipcode',values :  this.zipcodeSelected,
        }]
        console.log(filter)
        this.getThoughSpotDataZipFour(this.ticketIdUser, this.ticketId,'Zip Plus Four',filter,0)
      }

    this.segmentDataEmitter();
  }
  getZipcodeDeSelect(event) {

    const index: number = this.zipcodeArray.indexOf(event.value.item_text);
    if (index !== -1) {
      this.zipcodeArray.splice(index, 1);
    }
    this.segment['zipcode'] = this.zipcodeArray

   if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
    let app1 = this.segmentType == 'Acquisition' ? this.marketingApiService.getQlikConnectedApp_Aqui() : this.marketingApiService.getQlikConnectedApp();
    let filter = {}
    if (this.zipcodeSelected != null && this.zipcodeSelected.length > 0) {
      filter = {
        zipcode: this.zipcodeSelected.join(';').toString(),
      }
      console.log(this.zipcodeSelected.join(';').toString(), 'deselect')
    } else {
      console.log('Empty filter', filter)
    }


    downloadCSVSegmentFilters(this.segmentSelectedId, 'Recommended', filter, app1).then(res => {
      // console.log(res, 'res====')
      if (filter && Object.keys(filter).length > 0) {
        this.zipcodePlusApiLoader(2)
      } else {
        this.zipcodePlusDataArray = []
        this.zipcodePlusArray = []
        this.zipcodePlusSelected = []
        delete this.segment['zipPlusFour']
        this.segmentDataEmitter();
        console.log('Empty zipcodePlusDataArray', this.zipcodePlusDataArray)
      }
    })
  }else{
    let filter = []
    if (this.zipcodeSelected != null && this.zipcodeSelected.length > 0) {
      filter.push({
        columnName:'Zipcode',values : this.zipcodeSelected,
      })
    } else {
      console.log('Empty filter', filter)
    }
    if (filter && filter.length > 0) {
    this.getThoughSpotDataZipFour(this.ticketIdUser, this.ticketId,'Zip Plus Four',filter,2)
    }else {
      this.zipcodePlusDataArray = []
      this.zipcodePlusArray = []
      this.zipcodePlusSelected = []
      delete this.segment['zipPlusFour']
      this.segmentDataEmitter();
    }
  }
    // }
    this.segmentDataEmitter();
  }
  getZipcodePlusSelect(event) {
    if (this.zipcodePlusArray == null) {
      this.zipcodePlusArray = []
    }
    this.zipcodePlusArray.push(event.item_text)
    this.segment['zipPlusFour'] = this.zipcodePlusArray
    this.segmentDataEmitter();
  }
  getZipcodePlusDeSelect(event) {
    const index: number = this.zipcodePlusArray.indexOf(event.value.item_text);
    if (index !== -1) {
      this.zipcodePlusArray.splice(index, 1);
    }
    this.segment['zipPlusFour'] = this.zipcodePlusArray
    this.segmentDataEmitter();
  }
  locationsApiLoader(from) {
    this.locationData = []
    if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
    let app1 = this.marketingApiService.getQlikConnectedApp();
    getRecommendedSegmentAdditionalFilters(app1, 'LFeyjKg').then(res => {
      this.locationFilteredData(res)
    }, (error: any) => {
    })
  }else{
    let runfilter = []
    this.getThoughSpotDataLocation(this.ticketIdUser, this.ticketId,'location',runfilter)
  }
  }

  serviceTierApiLoader(from) {
    this.serviceDataArray = []
    if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
    let app1 = this.marketingApiService.getQlikConnectedApp();
    getRecommendedSegmentAdditionalFilters(app1, 'PJsnhVn').then(res => {
      this.serviceFilteredData(res)
    }, (error: any) => {
    })
  }else{
    let runfilter = []
    this.getThoughSpotDataService(this.ticketIdUser, this.ticketId,'service', runfilter)
   
  }
  }
  //// propensityyyy
  propensityApiLoader(from) {
    this.propensityDataArray = []
    if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
    let app1 = this.marketingApiService.getQlikConnectedApp();
    getRecommendedSegmentAdditionalFilters(app1, 'WAxmwY').then(res => {
    this.propensityFilteredData(res)
    }, (error: any) => {
    })
    }else{
      let runfilter = []
      this.getThoughSpotDataProp(this.ticketIdUser, this.ticketId,'propensity',runfilter)
    }
  }

  ////////
  zipcodeApiLoader(from: any) {

    this.zipcodeDataArray = []
  if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
    let app1 = this.segmentType == 'Acquisition' ? this.marketingApiService.getQlikConnectedApp_Aqui() : this.marketingApiService.getQlikConnectedApp();
    let Zipcode_ObjId = this.segmentType == 'Acquisition' ? 'UpJxkXH' : 'pSJYdy'
    getRecommendedSegmentAdditionalFilters(app1, Zipcode_ObjId).then(res => {
      // let res = { data: [{ zipcode: "629251" }] }
      this.getZipcodeFilteredData(res,from)
    }, (error: any) => {
    })
  }else{
    let runfilter = []
    this.getThoughSpotDataZip(this.ticketIdUser, this.ticketId,'zipcode',runfilter,from)
  }
  }

  getZipcodeFilteredData(res,from){
    let zipcode = []
    for (var i = 0; i < res.data.length; i++) {
      zipcode.push({ item_id: i, item_text: res.data[i].zipcode })
    }
    this.zipcodeDataArray = zipcode
    if (from == 1) {
      if (this.definePostObject.hasOwnProperty('zipcode')) {
        this.zipcodeArray = this.definePostObject.zipcode
        this.zipcodeSelected = this.definePostObject.zipcode

     if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
      let filter = {
        zipcode: this.zipcodeSelected.join(';').toString(),
      }
        let app1 = this.marketingApiService.getQlikConnectedApp();
        downloadCSVSegmentFilters(this.segmentSelectedId, 'Recommended', filter, app1).then(res => {
          // console.log(res, 'res====')
          this.zipcodePlusApiLoader(1)
          this.clearZipFilter()
        })
      }else{
       
        let filter = [{
          columnName:'Zipcode',values :  this.zipcodeSelected,
        }]
        this.getThoughSpotDataZipFour(this.ticketIdUser, this.ticketId,'Zip Plus Four',filter,1)
        this.clearZipFilter()
      }
        //    }
        this.segmentDataEmitter();


      }

    } else {
      this.zipcodeArray = []
      this.zipcodeSelected = []
      this.zipcodePlusArray = []
      this.zipcodePlusSelected = []
    }
  }

  clearZipFilter(){
    if (this.definePostObject.zipPlusFour != null) {
      this.zipcodePlusArray = this.definePostObject.zipPlusFour

    } else {
      this.zipcodePlusArray = []
    }
    if (this.zipcodePlusArray != null) {
      if (this.zipcodePlusArray.length != 0) {
        this.segment['zipPlusFour'] = this.zipcodePlusArray;

      }
    } else {
      this.zipcodePlusArray = []
    }
  }
  ////

  zipcodePlusApiLoader(from: any) {

    this.zipcodePlusDataArray = []
   
    
    //let res = { data: [{ zipplusfour: "629251 - 1234" }] }
    if (this.zipcodePlusSelected != null) {
      console.log(this.zipcodePlusSelected, 'this.zipcodePlusSelected((((')
    } else {
      console.log('this.zipcodePlusSelected cleared((((')
    }
    if (this.zipcodePlusArray != null) {
      if (this.zipcodePlusArray.length != 0) {
        console.log(this.zipcodePlusArray, 'this.zipcodePlusArray((((')
      } else {
        console.log('this.zipcodePlusArray cleared((((')
      }
    }
    if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
    let app1 = this.segmentType == 'Acquisition' ? this.marketingApiService.getQlikConnectedApp_Aqui() : this.marketingApiService.getQlikConnectedApp();
    let Zipcodeplus_ObjId = this.segmentType == 'Acquisition' ? 'BpkjVnV' : 'jnQpJTt'
    console.log(Zipcodeplus_ObjId)
    getRecommendedSegmentAdditionalFilters(app1, Zipcodeplus_ObjId).then(res => {
     this.getFiltereddataZipfour(res,from)
    }, (error: any) => {
    })
  }else{
    let runfilter = []
    this.getThoughSpotDataZipFour(this.ticketIdUser, this.ticketId,'Zip Plus Four',runfilter,from)
  }
  }
getFiltereddataZipfour(res,from){
  let zipcode = []
  for (var i = 0; i < res.data.length; i++) {
    if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
    zipcode.push({ item_id: i, item_text: res.data[i].zipplusfour })
    }else{
    zipcode.push({ item_id: i, item_text: res.data[i]['Zip Plus Four'] })  
    }
  }
  this.zipcodePlusDataArray = zipcode
  // console.log(this.zipcodePlusDataArray)
  if (from == 1) {
    if (this.definePostObject.hasOwnProperty('zipPlusFour')) {
      this.zipcodePlusArray = this.definePostObject.zipPlusFour
      this.zipcodePlusSelected = this.definePostObject.zipPlusFour
      this.segmentDataEmitter();
    }
    else {
      this.zipcodePlusArray = []
      this.zipcodePlusSelected = []
      delete this.segment['zipPlusFour']
      this.segmentDataEmitter();
    }
  } else if (from == 2) {
    this.zipcodePlusArray = []
    this.zipcodePlusSelected = []
    delete this.segment['zipPlusFour']
    this.segmentDataEmitter();
  }
}

  clearMobileNotificationData() {
    this.MarketingCampaignsDeployComponent.notificationName = undefined;
    this.MarketingCampaignsDeployComponent.campaignLink = undefined;
    this.MarketingCampaignsDeployComponent.campaignImageFile = undefined;
    this.MarketingCampaignsDeployComponent.scheduleSelected = 'Immediate';
    this.MarketingCampaignsDeployComponent.eventSelected = undefined;
    this.MarketingCampaignsDeployComponent.thresholdValue = undefined;
    this.MarketingCampaignsDeployComponent.timeZoneSelected = undefined;
    this.MarketingCampaignsDeployComponent.notificationTime = undefined;
    this.MarketingCampaignsDeployComponent.notificationDateTime = this.MarketingCampaignsDeployComponent.minimumDate;
    this.MarketingCampaignsDeployComponent.campaignLinkError = false;
    this.MarketingCampaignsDeployComponent.thresHoldError = false;
    this.MarketingCampaignsDeployComponent.notificationNameError = false;
    this.MarketingCampaignsDeployComponent.campaignImageError = false;
    this.MarketingCampaignsDeployComponent.campaignError = false;
    this.MarketingCampaignsDeployComponent.evenTypeError = false;
    this.MarketingCampaignsDeployComponent.timeZoneError = false;
    this.MarketingCampaignsDeployComponent.notificationTimeError = false;
    this.MarketingCampaignsDeployComponent.notificationDateTimeError = false;
    this.MarketingCampaignsDeployComponent.enteredText = undefined;
  }

  // For Parent element data
  selectRecommendedSegment(selectedItem) {
    this.clearMobileNotificationData();
    this.segment = selectedItem;
    this.segmentType = selectedItem.segmentType;
    // this.zipcodeApiLoader(0)
    // this.zipcodePlusApiLoader(0)
    // if (!this.recommendedSegmentSelected) {

    // }
    this.recommendedSegmentSelected = true;
    this.searchText = '';
    this.filteredArray();
    this.segmentSelected = selectedItem.segmentName;
    this.segmentSelectedType = selectedItem.segmentType
    this.selectedSegmentItem.emit(selectedItem);
    this.segmentSelectedId = selectedItem.segmentId
    this.segment['segmentType'] = selectedItem.segmentType
    if (selectedItem.segmentType == 'Acquisition') {
      this.acquisationSegmentSelected = true
      this.acquihidedata = true
      this.activeTab = 'summary';
      this.trueFalseAssigner(this.activeTab);
      if (this.segment != null) {
        delete this.segment['zipcode']
        delete this.segment['zipPlusFour']
      }
      if (this.zipcodeArray != null && this.zipcodeArray.length > 0) {
        this.zipcodeArray = []
        delete this.segment['zipcode']
      }
      if (this.zipcodePlusDataArray != null && this.zipcodePlusDataArray.length > 0) {
        this.zipcodePlusDataArray = []
      }
      if (this.zipcodePlusArray != null && this.zipcodePlusArray.length > 0) {
        this.zipcodePlusArray = []
        this.zipcodePlusDataArray = []
        delete this.segment['zipPlusFour']
        // console.log(this.zipcodePlusArray, 'this.zipcodePlusArray===', this.zipcodePlusDataArray)
      }
      if (this.definePostObject != null) {
        if (this.definePostObject.zipcode != null && this.definePostObject.zipcode.length > 0) {
          this.definePostObject.zipcode = []
          delete this.segment['zipcode']
        }
        if (this.definePostObject.zipPlusFour != null && this.definePostObject.zipPlusFour.length > 0) {
          this.definePostObject.zipPlusFour = []
          delete this.segment['zipPlusFour']
        }
      }


    //  let app1 = this.marketingApiService.getQlikConnectedApp();
    if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
      let app1 = this.segmentType == 'Acquisition' ? this.marketingApiService.getQlikConnectedApp_Aqui() : this.marketingApiService.getQlikConnectedApp();
      let filter = {}
      downloadCSVSegmentFilters(this.segmentSelectedId, 'Recommended', filter, app1).then(res => {
        this.zipcodeApiLoader(0)
      })
    }else{
      this.zipcodeApiLoader(0)
    }

    } else {

      if (this.regionsDataArray != null && this.regionsDataArray.length > 0) {
       // console.log(this.regionsDataArray, 'check')
        this.regionsDataArray = []
        delete this.segment['region']
        this.regionSelected = 'All';
      }
      if (this.locationData != null && this.locationData.length > 0) {
        this.locationData = []
        delete this.segment['location']
        this.locationSelected = 'All';
      }
      if (this.serviceDataArray != null && this.serviceDataArray.length > 0) {
        this.serviceDataArray = []
        delete this.segment['serviceTier']
        this.serviceSelected = 'All';
      }
      if (this.propensityDataArray != null && this.propensityDataArray.length > 0) {
        this.propensityDataArray = []
        delete this.segment['propensity']
        this.propensitySelected = 'All';
      }
      this.baseApiLoader();
      this.acquisationSegmentSelected = false
      this.acquihidedata = false
      this.activeTab = 'summary';
      this.trueFalseAssigner(this.activeTab);
      this.zipcodeArray = []
      this.zipcodePlusArray = []

    }

    this.segmentCommonSelector(selectedItem);
    if(this.triggeredCampaign){
      this.estimateValidation()
    }
  }
  selectSavedSegment(selectedItem) {
    this.clearMobileNotificationData();
    this.recommendedSegmentSelected = false;
    this.acquisationSegmentSelected = false
    // this.segment['segmentName'] = selectedItem.segmentName
    // this.segment['segmentType'] = selectedItem.segmentType
    this.segmentSelectedId = selectedItem.segmentId
    this.segmentSelectedType = selectedItem.segmentType
    if(selectedItem.segmentType == 'Upload'){
      let name = selectedItem.segmentName
      let segmentname = name.substring(name.lastIndexOf("_")+1)
      this.uploadData = segmentname == 'Prospects' ? true : false
    }else{
      this.uploadData = false
    }
    if (selectedItem.segmentType == 'Acquisition' || this.uploadData) {
      this.acquihidedata = true
      this.activeTab = 'summary';
      this.trueFalseAssigner(this.activeTab);
    } else {
      this.acquihidedata = false
      this.activeTab = 'summary';
      this.trueFalseAssigner(this.activeTab);
    }
    this.zipcodeArray = []
    this.zipcodePlusArray = []
    if (this.segment != null) {
      delete this.segment['zipcode']
      delete this.segment['zipPlusFour']
    }
    this.searchText = '';
    this.filteredArray();
    this.selectedSegmentItem.emit(selectedItem);
    this.segmentCommonSelector(selectedItem);
    if(this.triggeredCampaign){
      this.estimateValidation()
    }
  }
  segmentSelectedclear(){
    if(this.segmentSelected!=null){
      this.segmentSelected = ''
      this.segmentSelectedType = ''
      this.segmentSelectedId = ''
    }
    this.marketingCampaignDefineApiService.segmentSelectSubject.next(this.segmentSelected);
    this.marketingCampaignDefineApiService.segmentTypeSelectSubject.next(this.segmentSelectedType);
    this.estimatNextAudience(this.resendDay,this.eventType,this.eventTrigger,'',(this.definePostObject && this.definePostObject.campaignId))
  }
  segmentCommonSelector(selectedItem) {
    this.segment = selectedItem;
    this.segmentSelected = selectedItem.segmentName;
    this.segmentSelectedType = selectedItem.segmentType
    this.segment['segmentType'] = selectedItem.segmentType
    this.segment['segmentName'] = selectedItem.segmentName
    // debugger;
    this.marketingCampaignDefineApiService.segmentSelectSubject.next(this.segmentSelected);
    this.marketingCampaignDefineApiService.segmentTypeSelectSubject.next(this.segmentSelectedType);
    // sessionStorage.setItem('SelectedSegmentitem',this.segmentSelected);
    if(!this.triggeredCampaign){
    this.segmentValidator(selectedItem);
    }
    this.segment['recommended'] = this.recommendedSegmentSelected ? true : false;
    this.segmentDataEmitter();
  }
  segmentDataEmitter() {
    this.marketingCampaignDefineApiService.savedSegmentEmitter(this.segment);
  }
  selectRegion(event, from) {
    this.regionSelected = event;
    this.segment['region'] = [this.regionSelected]
    this.segmentDataEmitter();
    if (from == 0) {                       //<<<---using ()=> syntax
      this.regionSelectFunction(2)
    }
    if (this.regionSelected == 'All') {
    if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
      let filter = {
        region: this.regionSelected,
      }
      let app1 = this.marketingApiService.getQlikConnectedApp();
      downloadCSVSegmentFilters(this.segmentSelectedId, 'Recommended', filter, app1).then(res => {
        this.regionsApiLoader(1)
      })
    }
    }


  }
  selectLocation(event, from) {
    this.segment['location'] = [event]
    this.locationSelected = event;
    if (from == 0) {
      this.locationSelectFunction(2)
    }
    if (this.locationSelected == 'All') {
      if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
      let app1 = this.marketingApiService.getQlikConnectedApp();
      let filter = {
        region: this.regionSelected != '' ? this.regionSelected : 'All',
      }
      downloadCSVSegmentFilters(this.segmentSelectedId, 'Recommended', filter, app1).then(res => {
        this.locationsApiLoader(1)
      })
    }
    }

    this.segmentDataEmitter();
  }

  campaignNameChange(event) {
    this.campaignName = event;
    let errorObj = this.validatorService.stringValidatorWithCrossScriptAndErrorMsg(event);
    this.campaignNameError = errorObj.error;
    this.campaignNameErrorMsg = errorObj.errorMsg;
  }
  eventChange(event) {
    
    if (/^[0-9]+$/gm.test(event)) {
      this.eventTrigger = event;
    } else {
      this.eventTrigger = '';
   //   (<HTMLInputElement>document.getElementById('campaign-event')).value = '';
    }
   
  
    this.eventError = this.validatorService.thresholdValidator(event);
    this.estimateValidation()
    //this.campaignBudgetError = !/^[0-9]+$/gm.test(event);
  }
  estimateValidation(){
    if((!this.eventTypeError &&  this.eventType != '' && this.eventType != undefined && this.eventType != null) && (!this.eventError && this.eventTrigger != 0 && this.eventTrigger != undefined && this.eventTrigger != null )){
  
      let segmentId = this.segmentSelectedId == undefined ? (this.definePostObject && this.definePostObject.segmentId):this.segmentSelectedId

      this.estimatNextAudience(this.resendDay,this.eventType,this.eventTrigger,segmentId,(this.definePostObject && this.definePostObject.campaignId))
    }
  }
  resendChange(event) {
    if (/^[0-9]+$/gm.test(event)) {
      this.resendDay = event;
    } else {
      this.resendDay = '';
     // (<HTMLInputElement>document.getElementById('campaign-trigger')).value = '';
    }
   
    this.resendError = this.validatorService.resendValidator(event)
   // this.estimateValidation()
    //this.campaignBudgetError = !/^[0-9]+$/gm.test(event);
  }

  campaignBudgetChange(event) {
    if (/^[0-9]+$/gm.test(event)) {
      this.campaignBudget = event;
    } else {
      this.campaignBudget = '';
      (<HTMLInputElement>document.getElementById('campaign-budget')).value = '';
    }
    //this.campaignBudgetError = !/^[0-9]+$/gm.test(event);
  }
  campaignTargetChange(event) {
    if (event) {
      this.campaignTarget = event;
    } else {
      this.campaignTarget = '';
      (<HTMLInputElement>document.getElementById('campaign-target')).value = '';
    }
    this.campaignTargetError = this.validatorService.percentageValidator(event);

  }
  startDateChange(event) {
    this.startDate = event;
    if(this.endDate !=null && this.endDate != undefined && this.endDate !=''){
    if (this.endDate < this.startDate) {
      this.endDate = event;
    }
  }
    this.startDateError = this.validatorService.stringValidator(event)
    this.marketingCampaignDefineApiService.startDateSubject.next(this.startDate);
  }
  endDateChange(event) {
    this.endDate = event;
    if(!this.triggeredCampaign){
    this.endDateError = this.validatorService.stringValidator(event)
    }
  }
  qlick_Tabs(select_Tab_Data) {
    this.activeTab = select_Tab_Data
    this.segmentDataEmitter();
    this.trueFalseAssigner(this.activeTab);
  }
  trueFalseAssigner(exception) {
    this.summary = exception == 'summary' ? true : false;
    this.map = exception == 'map' ? true : false;
    this.dataSet = exception == 'dataSet' ? true : false;
  }
  selectService(event, from) {
    this.serviceSelected = event;
    this.segment['serviceTier'] = [encodeURIComponent(this.serviceSelected)];
    if (from == 0) {
      this.serviceSelectFunction(2)
    }
    if (this.serviceSelected == 'All') {
      let filter = {}
      if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
      let app1 = this.marketingApiService.getQlikConnectedApp();
      downloadCSVSegmentFilters(this.segmentSelectedId, 'Recommended', filter, app1).then(res => {
        this.serviceTierApiLoader(1)
      })
    }
    // else{
    //   this.getThoughSpotDataService(this.ticketIdUser, this.ticketId,'service',filter)

    // }
    }

    this.segmentDataEmitter();

  }
  selectPropensity(event, from) {
    this.propensitySelected = event;
    this.segment['propensity'] = this.propensitySelected;
    if (from == 0) {
      this.propensitySelectFunction(2)
    }
    if (this.propensitySelected == 'All') {
      if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
      let app1 = this.marketingApiService.getQlikConnectedApp();
      let filter = {
        region: this.regionSelected != '' ? this.regionSelected : 'All',
        location: this.locationSelected != '' ? this.locationSelected : 'All',
      }
      downloadCSVSegmentFilters(this.segmentSelectedId, 'Recommended', filter, app1).then(res => {
        this.propensityApiLoader(1)
      })
    }
    // else{
    //   let filter = {
    //     region: this.regionSelected != '' ? [this.regionSelected]: ['All'],
    //     location: this.locationSelected != '' ? [this.locationSelected] : ['All']
    //   }
    //   this.getThoughSpotDataProp(this.ticketIdUser, this.ticketId,'propensity',filter)
    // }
  }

    this.segmentDataEmitter();
  }
  segmentValidator(segment) {
    if (segment) {
      if (segment.segmentName != null) {
        this.segmentError = false;
      }
      else {
        this.segmentError = true
      }
    } else {
      this.segmentError = true
    }
  }
    eventTypeValidator(eventType) {
     console.log(eventType != null && eventType != undefined)
        if (eventType != null || eventType != undefined) {
          this.eventTypeError = false;
        }
        else {
      
          this.eventTypeError = true
          console.log(this.eventTypeError)
        }
    }
  wholeValidator() {
    console.log(this.triggeredCampaign)
    if(!this.triggeredCampaign){
    this.campaignNameChange(this.campaignName);
    // this.campaignTargetChange(this.campaignTarget);
    this.segmentValidator(this.segment);
    this.startDateChange(this.startDate);
    this.endDateChange(this.endDate);
    }else{
      this.eventChange(this.eventTrigger)
      this.resendChange(this.resendDay)
      this.startDateChange(this.startDate);
      this.campaignNameChange(this.campaignName);
     // this.segmentValidator(this.segment);
      this.eventTypeValidator(this.eventType)
      console.log(this.eventType)
    }
   
    //  console.log(this.zipcodeArray.length, 'zipcodeArray===length')

  }
  validator() {
    this.wholeValidator();
    if(!this.triggeredCampaign){
    if (!this.campaignNameError && !this.segmentError &&
      !this.startDateError && !this.endDateError && !this.campaignTargetError) {
      this.validationPassed = true;

    } else {
      this.validationPassed = false;
    }
  }else{
   
    if((this.eventType !='' && this.eventType != undefined) && (this.eventTrigger == 0 || this.eventTrigger == undefined || this.eventTrigger == null )){
      this.eventError = true
    }
    else if(this.eventTrigger >= 30 && this.eventTrigger <= 999){
      this.eventError = false
    }
    else{
      this.eventError = true
    }
    if((this.eventType !='' && this.eventType != undefined) && (this.resendDay == 0 || this.resendDay == undefined || this.resendDay == null)){
      this.resendError = true
    }
    else if(this.resendDay >= 45 && this.resendDay <= 365){
      this.resendError = false
    }
    else{
      this.resendError = true
    }
    if (!this.campaignNameError && 
      !this.startDateError && !this.eventError && !this.resendError  && !this.campaignTargetError && !this.eventTypeError) {
      this.validationPassed = true;
    } else {
      this.validationPassed = false;
    }
  }

    // if (this.acquisationSegmentSelected) {
    //   if (this.zipcodeArray.length == 0) {
    //     this.zipcodeError = true
    //     this.validationPassed = false;
    //   } else {
    //     this.validationPassed = true;
    //     this.zipcodeError = false
    //   }
    // }

    //console.log(this.validationPassed, 'this.validationPassed')
    this.defineDataValidation.emit(this.validationPassed);
  }
  // Submit within Component
  defineSubmit() {
    this.editDataAssigner();
    if (this.defineNextEmitterSubject) {
      this.defineNextEmitterSubject.unsubscribe();
    }
    this.defineNextEmitterSubject = this.marketingCampaignDefineApiService.defineNextEmitterSubject.subscribe(res => {
      this.errorReset();

      const campaignBudget = (this.campaignBudget && parseFloat(this.campaignBudget) > 0) ? this.campaignBudget : 0;
      const campaignTarget = (this.campaignTarget && parseFloat(this.campaignTarget) > 0) ? this.campaignTarget : 0;
      this.definePostObject = {
        "name": this.campaignName,
        "segmentId": this.segment && (this.segmentSelected!='' && this.segmentSelected!=undefined) ? this.segment.segmentId : '',
        "segmentName": this.segmentSelected,
        "segmentSize": this.segment ? this.segment.subscriberCount : 0,
        "budget": campaignBudget,
        "conversionTarget": campaignTarget,
        "startDate": this.marketingCommonService.formatDateForCampaign(this.startDate),
        "endDate": (this.endDate != null && this.endDate != undefined ) ? this.marketingCommonService.formatDateForCampaign(this.endDate) : null,
        "orgId": +this.ssoAuthService.getOrgId(),
        "segmentCategory": (this.segmentSelected!='' && this.segmentSelected!=undefined) &&  this.recommendedSegmentSelected ? 'Recommended' : (this.segmentSelected!='' && this.segmentSelected!=undefined) &&  !this.recommendedSegmentSelected ? 'Saved' : '',
        "subscriberCount": this.segment ? this.segment.subscriberCount : 0,
        "segmentType": this.segment && (this.segmentSelected!='' && this.segmentSelected!=undefined) ? this.segment.segmentType : '',
        campaignType : this.triggeredCampaign ? 'Triggered' : 'Scheduled'
      }
      if(this.triggeredCampaign){
        this.definePostObject.threshold = this.eventTrigger,
        this.definePostObject.repeatPeriod = this.resendDay,
        this.definePostObject.eventType = this.eventType
      }
      this.marketingCampaignDefineApiService.campaignSubject.next(this.campaignName);
      this.validator();
      if (this.validationPassed) {
        if (!this.editMode) {
          if (!this.debounceTimer) {
            if (this.recommendedSegmentSelected) {
              this.recommendedSegemntPayLoadAssigner();
            }
            this.loading = true;
            this.debounceTimer = true;
            this.defineCampaignSubject = this.marketingCampaignsApiService.CampaignPOST(this.definePostObject)
              .subscribe((res: any) => {
                this.definePostObject = res;
                this.definedCampaignDataObject = res;
                this.marketingCampaignDefineApiService.defineSuccesEventTrigger(res);
                this.editMode = true;
                this.debounceTimer = false;
                this.definePostSuccessMsg = this.language.Campaign_Defined;
                this.definePostSuccess = true;
                this.loading = false;
                if(this.triggeredCampaign){
                  this.estimateValidation()
                }
              }, (error) => {
                this.defineErrorMsgAssigner(error)
                this.editMode = false;
                this.debounceTimer = false;
                this.loading = false;
              })
          }
        } else {
          if (!this.debounceTimer) {
            if (this.recommendedSegmentSelected) {
              this.recommendedSegemntPayLoadAssignerWithChangeDetection();
            } else {
              delete this.definePostObject['service'];
              delete this.definePostObject['region'];
              delete this.definePostObject['location'];
              delete this.definePostObject['propensity'];
            }
            this.loading = true;
            // sessionStorage.removeItem('camp_flow_id')
            this.definePostObject["campaignId"] = this.definedCampaignDataObject.campaignId
            if(this.triggeredCampaign){
              this.definePostObject.threshold = this.eventTrigger,
              this.definePostObject.repeatPeriod = this.resendDay,
              this.definePostObject.eventType = this.eventType,
              this.definePostObject.endDate = (this.endDate != null && this.endDate != undefined && this.endDate != '') ? this.marketingCommonService.formatDateForCampaign(this.endDate) : null
            }
            this.marketingCampaignDefineApiService.campaignSubject.next(this.definePostObject.name);
            this.defineCampaignSubject = this.marketingCampaignsApiService.CampaignPUT(this.definePostObject)
              .subscribe((res: any) => {
                this.definedCampaignDataObject = res;
                //sessionStorage.setItem('camp_flow_id', this.definedCampaignDataObject.campaignId)
                this.marketingCampaignDefineApiService.defineSuccesEventTrigger(res);
                this.editMode = true;
                this.debounceTimer = false;
                this.definePostSuccessMsg = this.language.Campaign_update;
                this.definePostSuccess = true;
                this.loading = false;
                if(this.triggeredCampaign){
                  this.estimateValidation()
                }
              }, (error) => {
                this.defineErrorMsgAssigner(error)
                this.loading = false;
                this.debounceTimer = false;
              })
          }

        }
      }
    })
  }
  defineErrorMsgAssigner(error) {
    this.errorStatus = error;
    if (error.status == 504 || error.status == 502) {
      this.definePostErrorMsg = this.language.timeoutErrorError;
      this.definePostError = true;
      return;
    }
    else if (error.status == 409) {
      this.definePostErrorMsg = this.language.same_campaign;
      this.definePostError = true;
      return;
    }
    else if (error.status == 500) {

      if (error.statusText == "OK") {
        this.definePostErrorMsg = this.language.internalServerError;
        this.definePostError = true;
      }
      else {
        this.definePostErrorMsg = error.error;
        this.definePostError = true;
      }
      return;
    }
    else if (error.status == 400) {

      if (error.errorMessage == "OK") {
        this.definePostErrorMsg = this.language.Bad_Request;
        this.definePostError = true;
      }
      else {
        this.definePostErrorMsg = this.language.timeoutErrorError;
        this.definePostError = true;
      }
      return;

    }
    // else if (error.error) {
    //   let errorMsg = error.error.errorDesc;
    //   this.definePostErrorMsg = errorMsg ? errorMsg : error.error;
    //   this.definePostError = true;
    //   this.defineDataValidation.emit(true);
    // }
  }
  showErrorMsg(error) {
    if (error.status == 504 || error.status == 502) {
      this.definePostError = true;
      return this.definePostErrorMsg = this.language.timeoutErrorError;
    }
    else if (error.status == 409) {
      this.definePostError = true;
      return this.definePostErrorMsg = this.language.same_campaign;;
    }
    else if (error.status == 500) {
      if (error.statusText == "OK") {
        this.definePostErrorMsg = this.language.internalServerError;
        this.definePostError = true;
      }
      else {
        this.definePostErrorMsg = error.error;
        this.definePostError = true;
      }
      return this.definePostErrorMsg;
    }
    else if (error.status == 400) {
      if (error.errorMessage == "OK") {
        this.definePostErrorMsg = this.language.Bad_Request;
        this.definePostError = true;
      }else if(error.statusText  == "OK"){
        this.definePostErrorMsg = error && error.error ? error.error.message :this.language.Bad_Request;
        this.definePostError = true;
      }
      else {
        this.definePostErrorMsg = error.error;
        this.definePostError = true;
      }
      return this.definePostErrorMsg;
    }
  }
  errorReset() {
    this.definePostError = false;
    this.definePostSuccess = false;
  }

  editDataAssigner() {
    if (this.editCampaignDataSubject) {
      this.editCampaignDataSubject.unsubscribe();
    }
    this.editCampaignDataSubject = this.marketingCampaignDefineApiService.editCampaignDataSubject.subscribe((res: any) => {
      setTimeout(() => {
        this.dataAssigner();
        this.editMode = true;
      }, 1000);
    });

  }
  recommendedSegemntPayLoadAssigner() {
    // let formatedSerivceValue = this.encodeFormat();
    this.definePostObject['service'] = this.serviceSelected == 'All' ? '' : this.serviceSelected
    this.definePostObject['region'] = this.regionSelected == 'All' ? '' : this.regionSelected
    this.definePostObject['location'] = this.locationSelected == 'All' ? '' : this.locationSelected
    this.definePostObject['propensity'] = this.propensitySelected == 'All' ? '' : this.propensitySelected

    if (this.acquisationSegmentSelected) {
      if (this.zipcodeArray != null && this.zipcodeArray.length > 0) {
        this.definePostObject['zipcode'] = this.zipcodeArray
      } else {
        this.definePostObject['zipcode'] = ['none']
      }
      //  if (this.dev) {
      if (this.zipcodePlusArray != null && this.zipcodePlusArray.length > 0) {
        this.definePostObject['zipPlusFour'] = this.zipcodePlusArray
      } else {
        this.definePostObject['zipPlusFour'] = ['none']
      }
    }
    //}
  }
  // encodeFormat() {
  //   let selectedServiceValue = this.serviceSelected;
  //   if (this.serviceSelected.includes('+')) {
  //     let re = RegExp('+', 'g');
  //     selectedServiceValue = this.serviceSelected.replace(re, "%2B");
  //   } else if (this.serviceSelected.includes('<')) {
  //     let re = RegExp('<', 'g');
  //     selectedServiceValue = this.serviceSelected.replace(re, "%3C");
  //   } else if (this.serviceSelected.includes('>')) {
  //     let re = RegExp('>', 'g');
  //     selectedServiceValue = this.serviceSelected.replace(re, "%3E");
  //   }
  //   return selectedServiceValue;
  // }


  recommendedSegemntPayLoadAssignerWithChangeDetection() {
    // console.log(this.definePostObject)
    if (this.definePostObject) {
      // console.log(this.serviceSelected, this.definedCampaignDataObject.service)
      if (this.serviceSelected != null) {
        this.definePostObject['service'] = this.serviceSelected == 'All' ? '' : this.serviceSelected
      } else {
        delete this.definePostObject['service'];
      }
      // if (this.serviceSelected != this.definedCampaignDataObject.service) {
      //   // let formatedSerivceValue = this.encodeFormat();
      //   this.definePostObject['service'] = this.serviceSelected == 'All' ? '' : this.serviceSelected
      // } else {
      //   delete this.definePostObject['service'];
      // }
      if (this.regionSelected != null) {
        this.definePostObject['region'] = this.regionSelected == 'All' ? '' : this.regionSelected
      } else {
        delete this.definePostObject['region'];
      }
      if (this.locationSelected != null) {
        this.definePostObject['location'] = this.locationSelected == 'All' ? '' : this.locationSelected
      } else {
        delete this.definePostObject['location'];
      }
      if (this.propensitySelected != null) {
        this.definePostObject['propensity'] = this.propensitySelected == 'All' ? '' : this.propensitySelected
      } else {
        delete this.definePostObject['propensity'];
      }
      // console.log(this.acquisationSegmentSelected, this.zipcodeArray, 'this.definedCampaignDataObject.zipcode')
      if (this.acquisationSegmentSelected) {
        // // if (this.definedCampaignDataObject.zipcode) {
        // this.definePostObject['zipcode'] = this.zipcodeArray;
        // //  if (this.dev) {
        // this.definePostObject['zipPlusFour'] = this.zipcodePlusArray;
        // //  }
        // // } else {
        // //   delete this.definePostObject['zipcode'];
        // // };l

        if (this.zipcodeArray != null && this.zipcodeArray.length > 0) {
          this.definePostObject['zipcode'] = this.zipcodeArray
        } else {
          this.definePostObject['zipcode'] = ['none']
          // console.log(this.definePostObject['zipcode'], '112')
        }
        //  if (this.dev) {
        if (this.zipcodePlusArray != null && this.zipcodePlusArray.length > 0) {
          this.definePostObject['zipPlusFour'] = this.zipcodePlusArray
        } else {
          this.definePostObject['zipPlusFour'] = ['none']
        }
      }

    }
  }
  resetData() {
    this.campaignName = undefined;
    this.segment = {
      segmentId: undefined,
      segmentName: undefined,
      subscriberCount: undefined,
    }
    if(this.triggeredCampaign){
      this.eventTrigger = 50
      this.resendDay = 90
    }
    this.segmentSelected = undefined;
    this.recommendedSegmentSelected = false;
    this.campaignBudget = undefined;
    this.campaignTarget = undefined;
    this.startDate = new Date();
    if(!this.triggeredCampaign){
    this.endDate = new Date()
    }
    this.minimumDate = new Date();
  }

  dataAssigner() {
    this.definePostObject = this.marketingCampaignDefineApiService.getDefineDataEmitter();
    this.marketingCampaignDefineApiService.campaignSubject.next(this.definePostObject.name);
    this.marketingCampaignDefineApiService.segmentTypeSelectSubject.next(this.definePostObject.segmentType);
    this.marketingCampaignDefineApiService.segmentSelectSubject.next(this.definePostObject.segmentName);
    this.triggeredCampaign = sessionStorage.getItem('triggered') ? true : false
    this.active = ( this.definePostObject && (this.definePostObject.status == 'Active' || this.definePostObject.status == 'Paused')) ? true :false
    this.definedCampaignDataObject = this.marketingCampaignDefineApiService.getDefineDataEmitter();
    this.recommendedSegmentSelected = this.definePostObject.segmentCategory == "Recommended" ? true : false;
    if (this.definePostObject) {
      this.campaignName = this.definePostObject.name;
      this.segment = {
        segmentId: this.definePostObject.segmentId,
        segmentName: this.definePostObject.segmentName,
        subscriberCount: this.definePostObject.segmentSize,
        segmentType: this.definePostObject.segmentType,
        recommended: this.recommendedSegmentSelected

      }



      this.acquisationSegmentSelected = (this.definePostObject.segmentType == 'Acquisition' && this.definePostObject.segmentCategory == 'Recommended') ? true : false;
      if(this.definePostObject.segmentType == 'Upload'){
      let name = this.definePostObject.segmentName
      let segmentname = name.substring(name.lastIndexOf("_")+1)
        this.uploadData = segmentname == 'Prospects' ? true : false
      }else{
        this.uploadData = false
      }
      this.acquihidedata = (this.definePostObject.segmentType == 'Acquisition' || this.uploadData) ? true : false;
      //   console.log(this.recommendedSegmentSelected, this.acquisationSegmentSelected, "999999")
      if (this.recommendedSegmentSelected && !this.acquisationSegmentSelected) {

        if (sessionStorage.getItem('camp_filter_change') == 'edit') {
          if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
          var qlikOpenConnectionAppSubject = this.marketingApiService.qlikOpenConnectionApp.subscribe((app: any) => {

            let app1 = this.marketingApiService.getQlikConnectedApp();
            let filter = {
              region: (this.definePostObject.region != '' && this.definePostObject.region != null) ? this.definePostObject.region : '',
              location: (this.definePostObject.location != '' && this.definePostObject.location != null) ? this.definePostObject.location : '',
              servicegrp: (this.definePostObject.service != '' && this.definePostObject.service != null) ? this.definePostObject.service : '',
              propensity: (this.definePostObject.propensity != '' && this.definePostObject.propensity != null) ? this.definePostObject.propensity : ''
            }
            downloadCSVSegmentFilters(this.segmentSelectedId, 'Recommended', filter, app1).then(res => {
              this.regionsApiLoader(1);
              this.locationsApiLoader(1);
              this.serviceTierApiLoader(1);
              this.propensityApiLoader(1)
            })
          }, (error: any) => {

          })
          if (this.marketingApiService.getQlikConnectedApp()) {
            let app1 = this.marketingApiService.getQlikConnectedApp();
            let filter = {
              region: (this.definePostObject.region != '' && this.definePostObject.region != null) ? this.definePostObject.region : '',
              location: (this.definePostObject.location != '' && this.definePostObject.location != null) ? this.definePostObject.location : '',
              servicegrp: (this.definePostObject.service != '' && this.definePostObject.service != null) ? this.definePostObject.service : '',
              propensity: (this.definePostObject.propensity != '' && this.definePostObject.propensity != null) ? this.definePostObject.propensity : ''
            }
            downloadCSVSegmentFilters(this.segmentSelectedId, 'Recommended', filter, app1).then(res => {
              this.regionsApiLoader(1);
              this.locationsApiLoader(1);
              this.serviceTierApiLoader(1);
              this.propensityApiLoader(1)
            })
          }

        }else{
          let filter = [{ columnName: 'region', values: (this.definePostObject.region != '' && this.definePostObject.region != null) ? [this.definePostObject.region] : ['All']},
          {columnName: 'location', values: (this.definePostObject.location != '' && this.definePostObject.location != null) ? [this.definePostObject.location] : ['All']},
          {columnName: 'servicegrp', values: (this.definePostObject.service != '' && this.definePostObject.service != null) ? [this.definePostObject.service] : ['All']},
          {columnName: 'propensity', values: (this.definePostObject.propensity != '' && this.definePostObject.propensity != null) ? [this.definePostObject.propensity] : ['All']}
        ]
    
      this.getThoughSpotDataRegion(this.ticketIdUser, this.ticketId,'region',filter)
      this.getThoughSpotDataLocation(this.ticketIdUser, this.ticketId,'location',filter)
      this.getThoughSpotDataService(this.ticketIdUser, this.ticketId,'service',filter)
      this.getThoughSpotDataProp(this.ticketIdUser, this.ticketId,'propensity',filter) 
        }
      }
        this.zipcodeArray = []
        this.zipcodePlusArray = []
        this.regionSelected = this.definePostObject.region != '' ? this.definePostObject.region : 'All'
        this.locationSelected = this.definePostObject.location != '' ? this.definePostObject.location : 'All'
        this.serviceSelected = this.definePostObject.service != '' ? this.definePostObject.service : 'All'
        this.propensitySelected = this.definePostObject.propensity != '' ? this.definePostObject.propensity : 'All'

        if (this.regionSelected != 'All') {
          this.segment['region'] = [this.regionSelected]
        }
        if (this.locationSelected != 'All') {
          this.segment['location'] = [this.locationSelected]
        }
        if (this.serviceSelected != 'All') {
          this.segment['serviceTier'] = [encodeURIComponent(this.serviceSelected)];
        }
        if (this.propensitySelected != 'All') {
          this.segment['propensity'] = this.propensitySelected;
        }

      } else if (this.recommendedSegmentSelected && this.acquisationSegmentSelected) {

        // if (sessionStorage.getItem('camp_filter_change') == 'edit') {
          if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
        var qlikOpenConnectionAppSubject = this.marketingApiService.qlikOpenConnectionApp.subscribe((app: any) => {
          this.zipcodeApiLoader(1);
          this.getZipClear()

        }, (error: any) => {

        })
        if (this.marketingApiService.getQlikConnectedApp()) {
          let app1 = this.marketingApiService.getQlikConnectedApp();
          let filter = {}
          downloadCSVSegmentFilters(this.segmentSelectedId, 'Recommended', filter, app1).then(res => {
            this.zipcodeApiLoader(1)
          })
          this.getZipClear()

        }
      }else{
        this.zipcodeApiLoader(1)
        this.getZipClear()
      }

      }
      this.segmentSelected = this.definePostObject.segmentName;
     
      if(this.definePostObject.eventType != ''){
        this.eventType = this.definePostObject.eventType 
        this.eventTypeSetValue =      this.definePostObject.eventType   ==  'Competitor Visit Minutes' ? 'Competitor Visit Minutes (Mobile Notification Only)'  : this.definePostObject.eventType  ==  'Speed Test Minutes' ? 'Speed Test Minutes (Mobile Notification Only)'  : 'Service Limit Hit'
        this.checkEvent(this.eventType)
        this.eventTrigger = this.definePostObject.threshold != 0 ? this.definePostObject.threshold : ''
        this.resendDay = this.definePostObject.repeatPeriod != 0 ? this.definePostObject.repeatPeriod : ''
        if(this.triggeredCampaign){
          this.estimateValidation()
        }
      }
      this.campaignBudget = this.definePostObject.budget > 0 ? this.definePostObject.budget : '';
      this.campaignTarget = this.definePostObject.conversionTarget > 0 ? this.definePostObject.conversionTarget : '';
      if(this.definePostObject.startDate !=''){
            let start_date = moment(this.definePostObject.startDate).format("MM/DD/YYYY")
            this.startDate = new Date(start_date);
      }else{
        this.startDate = new Date();
      }
      if(this.definePostObject.endDate !=''){
        let end_date = moment(this.definePostObject.endDate).format("MM/DD/YYYY")
        this.endDate = new Date(end_date)
      }else{
      this.endDate = '';
      }
     
      this.minimumDate = new Date();
      this.definePostObject['status'] = this.definePostObject.status;
      this.segmentDataEmitter();
    } else {
      this.resetData();
    }
  }
  estimatNextAudience(resend,eventtype,threshold,segmentId,campId){
    let segemntcategory = (segmentId != undefined && segmentId != '') && this.recommendedSegmentSelected  ? 'Recommended' :(segmentId != undefined && segmentId != '') && !this.recommendedSegmentSelected  ? 'Saved' : ''
       this.marketingCampaignsApiService.CampaignEventTrigger(resend,eventtype,threshold,segmentId,campId,segemntcategory)
      .subscribe((res: any) =>  {
      this.estimatedAudi = res 
    },(error)=>{
      this.estimatedAudi = '-' 
    })
  }
  // getTriggerDefaultValues(){
  //   this.marketingCampaignsApiService.getEventTrigger()
  //   .subscribe((res: any) =>  {
  //     if(res.length > 0){
  //     this.triggerDefaultValue = res
  //     }else{
  //       this.eventTrigger = 50
  //       this.resendDay = 90  
  //     }
     
  // },(error)=>{
  //  this.eventTrigger = 50
  //     this.resendDay = 90
  // })
  // }

  clearFunction() {
    if (this.clearCampaignSubject) {
      this.clearCampaignSubject.unsubscribe();
    }
    this.clearCampaignSubject = this.marketingCampaignDefineApiService.clearCampaignDataSubject.subscribe((res: any) => {
      this.errorReset();
      if (res == 'define') {
        this.dataAssigner();
      }
    })
  }

  regionSelectFunction(from) {
    let filter = {
      region: this.regionSelected != '' ? this.regionSelected : 'All',
    }
   if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
    let app1 = this.marketingApiService.getQlikConnectedApp();
    downloadCSVSegmentFilters(this.segmentSelectedId, 'Recommended', filter, app1).then(res => {
      // console.log(res, 'res====')
      this.locationsApiLoader(from)
      this.serviceTierApiLoader(from)
      this.propensityApiLoader(from)
    })
  }
  else{
   
      let filter = [{ columnName: 'region', values: this.regionSelected != '' ? [this.regionSelected]: ['All']}]
    
     
      this.getThoughSpotDataLocation(this.ticketIdUser, this.ticketId,'location',filter)
      this.getThoughSpotDataService(this.ticketIdUser, this.ticketId,'service',filter)
      this.getThoughSpotDataProp(this.ticketIdUser, this.ticketId,'propensity',filter)
    
  }

  }

  locationSelectFunction(from) {
    if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
    let app1 = this.marketingApiService.getQlikConnectedApp();
    let filter = {
      region: this.regionSelected != '' ? this.regionSelected : 'All',
      location: this.locationSelected != '' ? this.locationSelected : 'All',
    }
    downloadCSVSegmentFilters(this.segmentSelectedId, 'Recommended', filter, app1).then(res => {
      this.regionsApiLoader(from)
      this.serviceTierApiLoader(from)
      this.propensityApiLoader(from)
    })
  }else{
    
    let filter = [{ columnName: 'region', values: this.regionSelected != '' ? [this.regionSelected]: ['All']},
    {columnName: 'location', values: this.locationSelected != '' ? [this.locationSelected] : ['All']}
  ]
    this.getThoughSpotDataRegion(this.ticketIdUser, this.ticketId,'region',filter)
    this.getThoughSpotDataService(this.ticketIdUser, this.ticketId,'service',filter)
    this.getThoughSpotDataProp(this.ticketIdUser, this.ticketId,'propensity',filter)

  }

  }
  serviceSelectFunction(from) {
    if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
    let app1 = this.marketingApiService.getQlikConnectedApp();
    let filter = {
      region: this.regionSelected != '' ? this.regionSelected : 'All',
      location: this.locationSelected != '' ? this.locationSelected : 'All',
      servicegrp: this.serviceSelected != '' ? this.serviceSelected : 'All',
    }
    downloadCSVSegmentFilters(this.segmentSelectedId, 'Recommended', filter, app1).then(res => {
      this.regionsApiLoader(from)
      this.locationsApiLoader(from)
      this.propensityApiLoader(from)
    })
  }else{
    
    let filter = [{ columnName: 'region', values: this.regionSelected != '' ? [this.regionSelected]: ['All']},
    {columnName: 'location', values: this.locationSelected != '' ? [this.locationSelected] : ['All']},
    {columnName: 'servicegrp', values: this.serviceSelected != '' ? [this.serviceSelected] : ['All']}
  ]
    this.getThoughSpotDataRegion(this.ticketIdUser, this.ticketId,'region',filter)
    this.getThoughSpotDataLocation(this.ticketIdUser, this.ticketId,'location',filter)
    this.getThoughSpotDataProp(this.ticketIdUser, this.ticketId,'propensity',filter)

  }
   
  }
  propensitySelectFunction(from) {
    if((!this.cmcType && !this.isThoughspotAvailable) || (!this.cmcType && this.isThoughspotAvailable)){
    let app1 = this.marketingApiService.getQlikConnectedApp();
    let filter = {
      region: this.regionSelected != '' ? this.regionSelected : 'All',
      location: this.locationSelected != '' ? this.locationSelected : 'All',
      servicegrp: this.serviceSelected != '' ? this.serviceSelected : 'All',
      propensity: this.propensitySelected != '' ? this.propensitySelected : 'All'
    }

    downloadCSVSegmentFilters(this.segmentSelectedId, 'Recommended', filter, app1).then(res => {
      this.regionsApiLoader(from)
      this.locationsApiLoader(from)
      this.serviceTierApiLoader(from)
    })
  }else{
    
    let filter = [{ columnName: 'region', values: this.regionSelected != '' ? [this.regionSelected]: ['All']},
    {columnName: 'location', values: this.locationSelected != '' ? [this.locationSelected] : ['All']},
    {columnName: 'servicegrp', values: this.serviceSelected != '' ? [this.serviceSelected] : ['All']},
    {columnName: 'propensity', values: this.propensitySelected != '' ? [this.propensitySelected] : ['All']}
  ]

    this.getThoughSpotDataRegion(this.ticketIdUser, this.ticketId,'region',filter)
    this.getThoughSpotDataLocation(this.ticketIdUser, this.ticketId,'location',filter)
    this.getThoughSpotDataService(this.ticketIdUser, this.ticketId,'service',filter)
  }
  }
  getZipClear(){
    if (this.definePostObject.zipcode != null) {
      this.zipcodeArray = this.definePostObject.zipcode

    } else {
      this.zipcodeArray = []
    }
    if (this.zipcodeArray != null) {
      if (this.zipcodeArray.length != 0) {
        this.segment['zipcode'] = this.zipcodeArray;
      }

    } else {
      this.zipcodeArray = []
    }
  }
  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.defineCampaignSubject) {
      this.defineCampaignSubject.unsubscribe();
    }
    if (this.clearCampaignSubject) {
      this.clearCampaignSubject.unsubscribe();
    }

    if (this.regionSubject) {
      this.regionSubject.unsubscribe();
    }
    if (this.locationsSubject) {
      this.locationsSubject.unsubscribe();
    }
    if (this.serviceTierTechSubject) {
      this.serviceTierTechSubject.unsubscribe();
    }
    if (this.defineCampaignSubject) {
      this.defineCampaignSubject.unsubscribe();
    }

    if (this.savedSegmentSubject) {
      this.savedSegmentSubject.unsubscribe();
    }
    if (this.recommendedSegmentSubject) {
      this.recommendedSegmentSubject.unsubscribe();
    }
    if (this.defineNextEmitterSubject) {
      this.defineNextEmitterSubject.unsubscribe();
    }

    if (this.editCampaignDataSubject) {
      this.editCampaignDataSubject.unsubscribe();
    }

  }
  clearInput(val){
    if(val=='Budget'){
      this.campaignBudget = '';
    }
    if(val == 'Conversion Target'){this.campaignTarget = ''}
  }

  //Ts
  async getThoughSpotDataRegion(ticketIdUser, ticketId,region,runfilter): Promise<void> {
    this.marketingApiService.getCampaignFilters(ticketIdUser, ticketId, region,runfilter,'advance')
      .then((res) => {
        this.regionFilteredData(res)
    })
  }

  async getThoughSpotDataLocation(ticketIdUser, ticketId,region,runfilter): Promise<void> {
    this.marketingApiService.getCampaignFilters(ticketIdUser, ticketId, region,runfilter,'advance')
      .then((res) => {
        this.locationFilteredData(res)
    })
  }

  async getThoughSpotDataService(ticketIdUser, ticketId,region,runfilter): Promise<void> {
    this.marketingApiService.getCampaignFilters(ticketIdUser, ticketId, region,runfilter,'advance')
      .then((res) => {
        this.serviceFilteredData(res)
    })
  }
  async getThoughSpotDataProp(ticketIdUser, ticketId,region,runfilter): Promise<void> {
    this.marketingApiService.getCampaignFilters(ticketIdUser, ticketId, region,runfilter,'advance')
      .then((res) => {
        this.propensityFilteredData(res)
    })
  }

  async getThoughSpotDataZip(ticketIdUser, ticketId,region,runfilter,from): Promise<void> {
    this.marketingApiService.getCampaignFilters(ticketIdUser, ticketId, region,runfilter,'prospects')
      .then((res) => {
        this.getZipcodeFilteredData(res,from)
    })
  }

  async getThoughSpotDataZipFour(ticketIdUser, ticketId,region,runfilter,from): Promise<void> {
    this.marketingApiService.getCampaignFilters(ticketIdUser, ticketId, region,runfilter,'prospects')
      .then((res) => {
        this.getFiltereddataZipfour(res,from)
    })
  }

  checkTSStatus(){
    this.marketingHomeApiService.thoughtSpotStatusCheckGET().subscribe((res: any) => {
     if(res){
     this.cmcType = res.thoughtspotSupported  == true ? true : false
     if((this.isThoughspotAvailable && this.cmcType) || (!this.isThoughspotAvailable && this.cmcType)){
      this.qlikTicketURL()
      }else{
        this.cmcType = false
      }
     }
    },(error: any) => {
     this.cmcType = false
   })
   }
   triggerModelChange(e){
    this.eventTypeSetValue = e
    this.eventType = e == 'Competitor Visit Minutes (Mobile Notification Only)' ? 'Competitor Visit Minutes' : e == 'Speed Test Minutes (Mobile Notification Only)' ?  'Speed Test Minutes' : 'Service Limit Hit' 
    this.checkEvent(this.eventType)
    // if(this.triggerDefaultValue.length > 0){
    // this.setDefaultValue(this.triggerDefaultValue,this.eventType)
    // }
    this.marketingCampaignDefineApiService.eventTypeSubject.next(this.eventType);
    this.eventTypeValidator(this.eventType)
    this.estimateValidation()
   }
  //  setDefaultValue(triggerModelChange,eventType){
  //   let filterValue = eventType;
  //   this.eventTrigger =''
  //   this.resendDay =''
  //   let filteredData = triggerModelChange.filter(val => val.eventType.includes(filterValue));
  //     this.eventTrigger = filteredData[0].thresholdVal
  //     this.resendDay= filteredData[0].repeatPeriod
  //     this.resendChange(filteredData[0].repeatPeriod)
  //     this.eventChange(filteredData[0].thresholdVal)
  //  }
   checkEvent(eventType){
    this.CompetitorVisitMinutes = eventType == 'Competitor Visit Minutes' ? true : false;
    this.SpeedTestMinutes = eventType == 'Speed Test Minutes' ? true : false;
    this.ServiceLimit = eventType == 'Service Limit Hit' ? true : false;
   }
   modifyCriteriaTrigger(model){
    this.dialogService.open(model,{windowClass:'custom-default-modal'})
   }
   impactedCampaigns(model){
    this.getCampaignList()
    this.dialogService.open(model,{ size: 'sm', centered: true, windowClass: 'custom-modal' })
   }
}
