import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MarketingRoutingsService } from 'src/app/marketing/shared/services/marketing-routings.service';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingExploreDataBasicApiService } from './explore-data-basic-api.service';
import * as constants from "../../shared/constants/marketing.constants";
import { MarketingApiService } from './../../shared/services/marketing-api.sevice';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-marketing-basic',
  templateUrl: './marketing-basic.component.html',
  styleUrls: ['./marketing-basic.component.scss'],
  providers: [DatePipe]
})
export class MarketingBasicComponent implements OnInit {
  last30dFrom: any;
  last30dTo: any;

  lastMonthFrom: any;
  lastMonthTo: any;

  last2MonthsFrom: any;
  last2MonthsTo: any;

  language: any;
  languageSubject;
  activeChart: any = 'subscribe'
  subscribe: boolean = true
  service: boolean
  application: boolean
  Retention: boolean
  Acquisition: boolean
  Device: boolean
  Basic: boolean = true
  Advanced: boolean
  SmartTable: boolean
  exploreChart: boolean = true
  valueEmittedFromChildComponent: string = '';

  subscriber: boolean = false


  applyDisabled: boolean = true;
  activePeriod: any;

  objectOfAll: object = { value: constants.CLOUD_ALL };
  regionSelected = 'All';
  regionsDataArray = [constants.CLOUD_ALL]

  locationSelected: any;
  locationData: Array<any> = [constants.CLOUD_ALL];
  allLocationData: Array<any>;

  timeframes = [
    { value: 'last-30d', name: '30 Days' },
    { value: 'last-1m', name: 'Prior Month' },
    { value: 'last-2m', name: '2 Prior Months' },
  ];
  // API
  userPrefrenceSubject: any
  regionsSubject: any
  locationsSubject: any
  pageavailble: boolean = false;
  //for ngtest reference variable
  regionData: any = [];
  locationDataResponse: any;
  regionIndex: number;
  allLocationSelected: boolean = true;
  lastRegionSelected: any;
  lastLocationSelected: any;
  lastActivePeriod: any;
  constructor(
    private marketingRoutingsService: MarketingRoutingsService,
    private translateService: TranslateService,
    private marketingExploreDataBasicApiService: MarketingExploreDataBasicApiService,
    private marketingApiService: MarketingApiService,
    private datePipe: DatePipe,
    private titleService: Title


  ) { }

  ngOnInit(): void {

    this.language = this.translateService.defualtLanguage;
    this.activePeriod = this.language.basic_timeframes.Days_30;
    this.setLanguageTimeFrame();
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      // let activePeriodIndex = 0;
      this.language = data;
      this.regionIndex = this.regionsDataArray.indexOf(this.regionSelected);
      this.regionsDataArray = this.regionsDataArray.map(x => x.replace(this.regionsDataArray[0], this.language.All));
      this.selectRegion(this.regionSelected);
      this.selectLocation(this.locationSelected);
      // this.timeframes.forEach((data, index) => {
      //   if (data.name == this.activePeriod) {
      //     activePeriodIndex = index
      //   }
      // });
      this.setLanguageTimeFrame();
      this.titleService.setTitle(`${this.language["Explore_Data"]} -${this.language["Basic"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
      // this.activePeriod = this.timeframes[activePeriodIndex].value;
    });
    this.titleService.setTitle(`${this.language["Explore_Data"]}- ${this.language["Basic"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);

    this.periodDateAssigner()
    this.baseApiLoader();
    this.marketingExploreDataBasicApiService.filerValuesSubject.next(false)
    this.openNav()
  }
  baseApiLoader() {
    this.regionsApiLoader();
    this.locationsApiLoader();
    this.setTimeFrame();
  }
  setLanguageTimeFrame() {
    this.timeframes = [
      { value: 'last-30d', name: this.language.basic_timeframes.Days_30 },
      { value: 'last-1m', name: this.language.basic_timeframes.Prior_Month },
      { value: 'last-2m', name: this.language.basic_timeframes.Prior_Months_2 },

    ];
  }
  setTimeFrame() {
    this.activePeriod = this.marketingApiService.getPeriod();
  }
  regionsApiLoader() {
    this.regionsSubject = this.marketingExploreDataBasicApiService.CloudRegions()
      .subscribe((res: any) => {
        let response = res
        response.sort();
        this.regionData = res;
        response = response.filter((item) => item);
        this.regionsDataArray = [...this.regionsDataArray, ...response];
        this.regionsDataArray[0] = this.language.All;
        this.regionSelected = this.marketingApiService.getRegion();
        this.regionSelected = this.regionSelected == 'All' ? this.language.All : this.regionSelected;
        this.selectRegion(this.regionSelected)
        this.locationSelected = this.marketingApiService.getLocation()
        this.locationSelected = this.locationSelected == 'All' ? this.language.All : this.locationSelected;
        this.applyDisabled = true;
      }, (error) => {

      })
  }

  locationsApiLoader() {
    this.locationsSubject = this.marketingExploreDataBasicApiService.LocationHierarchy()
      .subscribe((res: any) => {
        this.locationDataResponse = res
        let regionsLocations = this.marketingExploreDataBasicApiService.prepareLocationRegionHierachy(res);
        this.allLocationData = regionsLocations;
        this.selectRegion(this.regionSelected);
        this.pageavailble = true;
        this.locationSelected = this.marketingApiService.getLocation()
        this.locationSelected = this.locationSelected == 'All' ? this.language.All : this.locationSelected;
      }, (error) => {

      })
  }
  selectRegion(data) {
    this.regionSelected = data;
    if (this.regionSelected == 'All') {
      this.locationSelected = 'All'
    }
    if (this.regionIndex == 0) {
      this.regionSelected = this.language.All;
    }
    this.regionIndex = this.regionsDataArray.length;
    if (data !== constants.CLOUD_ALL) {
      // if(this.allLocationSelected) {
      // }
      if (this.allLocationData) {
        this.locationData = this.allLocationData.filter(el => el.parent == data);
      }
      this.locationData.unshift({ ...this.objectOfAll })
      var arrIndex = this.locationData.findIndex((obj => obj.value == this.locationSelected));
      if (arrIndex == 0 || arrIndex == -1) {
        this.locationSelected = this.language.All;
      }
      var objIndex = this.locationData.findIndex((obj => obj.value == 'All'));
      this.locationData[objIndex].value = this.language.All;
    } else {
      if (this.allLocationSelected) {
        this.locationSelected = this.language.All;
      }
      this.locationData = [{ ...this.objectOfAll }]
      var objIndex = this.locationData.findIndex((obj => obj.value == 'All'));
      this.locationData[objIndex].value = this.language.All;
    }
    this.buttonDisableEnable()
  }
  selectLocation(data) {
    if (data.value) {
      this.locationSelected = data.value;
      this.allLocationSelected = false;
    } else {
      this.allLocationSelected = true;
    }
    this.buttonDisableEnable()
  }
  selectTimeFrame(data) {
    this.activePeriod = data;
    this.buttonDisableEnable()
  }
  applyFiler() {
    if (this.regionsDataArray[0] == this.regionSelected) {
      this.regionSelected = 'All';
    }
    if (this.regionsDataArray[0] == this.locationSelected) {
      this.locationSelected = 'All';
    }
    sessionStorage.setItem('lastRegionSelected', this.regionSelected);
    sessionStorage.setItem('lastLocationSelected', this.locationSelected);
    sessionStorage.setItem('lastActivePeriod', this.activePeriod);
    this.lastLocationSelected = this.locationSelected;
    this.marketingApiService.setLocation(this.locationSelected)
    this.marketingApiService.setRegion(this.regionSelected)
    this.marketingApiService.setPeriod(this.activePeriod)
    this.applyDisabled = true;
    this.marketingExploreDataBasicApiService.filerValuesSubject.next(true)
    this.setCurrentPeriod();
    this.marketingApiService.getUserPreference(this.regionSelected, this.activePeriod, this.locationSelected);
    if (this.regionSelected == 'All') {
      this.regionSelected = this.language.All;
    }
    if (this.locationSelected == 'All') {
      this.locationSelected = this.language.All;
    }
  }
  applyClearFiler() {
    this.regionSelected = this.language.All;
    this.locationSelected = this.language.All;
    this.activePeriod = 'last-30d'
    this.locationData = [{ ...this.objectOfAll }]
    var objIndex = this.locationData.findIndex((obj => obj.value == 'All'));
    this.locationData[objIndex].value = this.language.All;
    this.applyFiler();
  }

  buttonDisableEnable() {
    let languageAllArr = ['All', 'Tous', 'Todas', 'Alle'];
    if (this.regionsDataArray[0] != this.regionSelected ||
      this.regionsDataArray[0] != this.locationSelected ||
      this.marketingApiService.getPeriod() != this.activePeriod) {
      this.applyDisabled = false;
    } else if (languageAllArr.includes(this.regionSelected)) {
      this.applyDisabled = false;
    } else {
      this.applyDisabled = true;
    }
    this.lastRegionSelected = sessionStorage.getItem('lastRegionSelected');
    this.lastLocationSelected = sessionStorage.getItem('lastLocationSelected');
    this.lastActivePeriod = sessionStorage.getItem('lastActivePeriod');
    if (this.lastRegionSelected == this.regionSelected && this.lastLocationSelected == this.locationSelected && this.lastActivePeriod == this.activePeriod) {
      this.applyDisabled = true;
    } 
  }


  trueFalseAssigner(exception) {
    this.subscribe = exception == 'subscribe' ? true : false;
    this.service = exception == 'service' ? true : false;
    this.application = exception == 'application' ? true : false;
    this.Retention = exception == 'retention' ? true : false;
    this.Acquisition = exception == 'acquisition' ? true : false;
    this.Device = exception == 'device' ? true : false;
  }
  chartChange(chartValue: any) {
    this.activeChart = chartValue
    this.trueFalseAssigner(this.activeChart);
  }

  periodDateAssigner() {
    var date = new Date();
    this.last30dFrom = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 30)
    this.last30dTo = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
    this.lastMonthFrom = new Date(date.getFullYear(), date.getMonth(), 0);
    this.lastMonthFrom.setDate(1);
    this.lastMonthTo = new Date(date.getFullYear(), date.getMonth(), 0);
    this.last2MonthsFrom = new Date(date.getFullYear(), date.getMonth() - 1, 0);
    this.last2MonthsFrom.setDate(1);
    this.last2MonthsTo = new Date(date.getFullYear(), date.getMonth(), 0);
    this.setCurrentPeriod()
  }
  setCurrentPeriod() {
    let period = this.marketingApiService.getPeriod()
    if (period == 'last-2m') {
      localStorage.setItem('currentPeriod', `${this.datePipe.transform(this.last2MonthsFrom, "yyyy-MM-dd")}/${this.datePipe.transform(this.last2MonthsTo, "yyyy-MM-dd")}`)
    } else if (period == 'last-30d') {
      localStorage.setItem('currentPeriod', `${this.datePipe.transform(this.last30dFrom, "yyyy-MM-dd")}/${this.datePipe.transform(this.last30dTo, "yyyy-MM-dd")}`)
    } else if (period == 'last-1m') {
      localStorage.setItem('currentPeriod', `${this.datePipe.transform(this.lastMonthFrom, "yyyy-MM-dd")}/${this.datePipe.transform(this.lastMonthTo, "yyyy-MM-dd")}`)
    }
  }

  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }
  divopen: any = false
  openNav() {
    const mq = window.matchMedia("(max-width: 780px)");
    // if(mq){
    //   document.getElementById("mySidebar").style.width = "100px";
    //   this.divopen = false

    // }
    // else{
    //   document.getElementById("mySidebar").style.width = "150px";
    //   this.divopen = false

    // }
    let styleEle = document.getElementById("mySidebar")
    if (styleEle) {
      document.getElementById("mySidebar").style.width = "auto";
    }
    this.divopen = false
  }

  CloseNav() {
    document.getElementById("mySidebar").style.width = "0";
    this.divopen = true
  }

}
