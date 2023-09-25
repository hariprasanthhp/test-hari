import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { ShortnumberPipe } from 'src/app/support/shared/custom-pipes/shortnumber.pipe';
import { DataTableDirective } from 'angular-datatables';
import { Subject, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { NetworkSystemsApiService } from '../../../services/network-systems-api.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  @Output() goToCardPage = new EventEmitter();
  @Input() cardDetails: any;
  notSupportedValue = {
    'na' : 'Not Supported',
    'not supported' : 'Not Supported',
    'not-supported' : 'Not Supported',
  };
  languageSubject;
  language: any;
  interfaceDetails: any;
  interfaceCounters: any;
  dslPortDetails:any;
  dtOptions: DataTables.Settings = {
    paging: true,
    pagingType: 'full_numbers',
    pageLength: 10,
    lengthChange: false,
    processing: false,
    dom: 'tipr',
    info: true,
    ordering: false,
    columnDefs: [
      { targets: [0,1],visible:false},
      { "searchable": false, targets: [2] }
    ]
  };
  searchInput = '';
  dtTrigger: Subject<any> = new Subject();
  ontList: any[];
  ontDetails: any;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  redenderOnce: boolean = false;
  loading: boolean = false;
  error: boolean;
  errorInfo: string = '';
  ontSelectedSlot = [];
  cardSelectedSlot = [];
  ontDetailsLoader: boolean = false;
  reportTypes = [
    {name:'Checked In and Not Checked In',value:'DEVICE_CHECKED_IN_AND_NOT_CHECKED_IN'},
    {name:'Systems Checked In',value:'DEVICE_CHECKED_IN'},
    {name:'Systems Not Checked In',value:'DEVICE_NOT_CHECKED_IN'}
  ];
  reportTypeSelected = 'DEVICE_CHECKED_IN_AND_NOT_CHECKED_IN';
  isICLPort: boolean = false;
  sortBy: string;
  sortOrder: string;
  ontDetailsExpandLoader: boolean;

  healthPortMsg = 'Ethernet or c/q-ports acting as uplink/ethernet ports are reported.';
  constructor(
    private router: Router,
    private translateService: TranslateService,
    public nwSystemCommon: NetworkSystemsApiService,
    private commonOrgService: CommonService,
    private ShortnumberPipe: ShortnumberPipe,
    private http : HttpClient
    
  ) {
    Object.defineProperty(String.prototype, 'capitalize', {
      value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
      },
      enumerable: false,
    });
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.tableLanguageOptions();
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        this.tableLanguageOptions();
        this.callInterfaceAPIS();
      }
    );
    
    if (this.ontList) {
      this.ontList.forEach((data) => {
        data.isExpanded = false;
      });
    }
    this.callInterfaceAPIS();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.cardDetails?.currentValue && Object.entries(changes?.cardDetails?.currentValue)?.length) {
      this.reportTypeSelected = changes?.cardDetails?.currentValue?.reportTypeSelected || 'DEVICE_CHECKED_IN_AND_NOT_CHECKED_IN';
      this.searchInput = changes?.cardDetails?.currentValue?.searchInput || '';
      this.ontSelectedSlot = changes?.cardDetails?.currentValue?.ontSelectedSlot || [];
      this.cardSelectedSlot = changes?.cardDetails?.currentValue?.cardSelectedSlot || [];
      this.ontSelectedSlot = Array.from(new Set(this.ontSelectedSlot));
      this.cardSelectedSlot = Array.from(new Set(this.cardSelectedSlot));
    }
  }
  callInterfaceAPIS() {
    let apis = {
      interfaceDetails: this.nwSystemCommon.getInterfaceDetails(this.cardDetails).pipe(catchError(error => of(error))),
      // ontList: this.nwSystemCommon.getNfaOntList(this.cardDetails, this.reportTypeSelected).pipe(catchError(error => of(error))),
    }
    this.interfaceDetails = {};
    this.interfaceCounters = {}
    this.dslPortDetails={};
    this.ontList = [];
    this.loading = true;
    this.ontDetailsLoader = true;
    forkJoin(apis).subscribe(
      (json: any) => {
        this.getInterfaceDetails(json?.interfaceDetails);
        // if(json?.ontList){
        //   this.getOntList(json?.ontList);
        // }
        
        this.loading = false;
      });
  }
  getNfaOntList(){
    this.ontList = [];
    this.ontSelectedSlot = [];
    this.loading = true;
    let sorting = {
      sortBy : this.sortBy,
      sortOrder : this.sortOrder
    };
    this.nwSystemCommon.getNfaOntCount(this.cardDetails, this.reportTypeSelected, sorting).subscribe((count: any) => {
      if (count && typeof count.count !== undefined) {
        sorting['limit'] = count.count;
        this.nwSystemCommon.getNfaOntList(this.cardDetails, this.reportTypeSelected, sorting).subscribe(
          (json: any) => {
            this.getOntList(json);
            this.ontDetailsLoader = false;
            this.loading = false;
          },
          (err: any) => {
            this.ontDetailsLoader = false;
            this.loading = false;
            this.pageErrorHandle(err);
          })
      }else{
        this.ontDetailsLoader = false;
        this.loading = false;
      }
    },(err: any) => {
      this.ontDetailsLoader = false;
      this.loading = false;
      this.pageErrorHandle(err);
    })
    
  }


 
  getInterfaceDetails(interfaceDetails) {
    if (interfaceDetails?.ok == false) {
      this.ontDetailsLoader = false;
      this.pageErrorHandle(interfaceDetails);
      return;
    }
    // this.loading = true;
    // this.nwSystemCommon.getInterfaceDetails(this.cardDetails).subscribe(
    //   (json: any) => {
        this.interfaceDetails = interfaceDetails;
        if (this.interfaceDetails && this.interfaceDetails['operState']) {
          this.interfaceDetails['operState'] =
            this.interfaceDetails['operState']?.capitalize();
        }
        if (this.interfaceDetails && this.interfaceDetails['operState']) {
          this.interfaceDetails['adminState'] =
            this.interfaceDetails['adminState']?.capitalize();
        }
        if (this.cardDetails?.pon['ifType'] == 'ethernetCsmacd') {
          this.interfaceCounters = this.interfaceDetails && this.interfaceDetails['etyStats'] ? this.interfaceDetails['etyStats'] : {};
        }
       
         else if (this.cardDetails?.pon['ifType'] == 'vdsl') {
          this.interfaceCounters = this.interfaceDetails && this.interfaceDetails['dslStats'] ? this.interfaceDetails['dslStats'] : {};
          this.dslPortDetails = this.interfaceDetails && this.interfaceDetails['dslPortRuntimeDetails'] ? this.interfaceDetails['dslPortRuntimeDetails'] : {};
          this.dslPortDetails.powerSaveTimeRemaining = this.dslPortDetails.powerSaveTimeRemaining ? (this.dslPortDetails.powerSaveTimeRemaining == "0" ? this.dslPortDetails.powerSaveTimeRemaining:this.dslPortDetails.powerSaveTimeRemaining +'s' ) : '-';
          this.dslPortDetails.timeInCurrentState = this.dslPortDetails.timeInCurrentState >= 0 ? ( this.dslPortDetails.timeInCurrentState >0 ? this.dslPortDetails.timeInCurrentState +'s' : this.dslPortDetails.timeInCurrentState  ) : '-';
        }
         else {
          this.interfaceCounters = this.interfaceDetails && this.interfaceDetails['ponStats'] ? this.interfaceDetails['ponStats'] : {};
        }
        this.isICLPort = this.interfaceDetails && this.interfaceDetails['phyEthPort'] && this.interfaceDetails['phyEthPort']['icl'] ? true : false;

        if(!this.isICLPort && this.cardDetails?.pon['ifType'] != 'vdsl'){
          this.getNfaOntList();
        }
        // this.loading = false;
    //   },
    //   (err: any) => {
    //     this.interfaceDetails = {};
    //     this.loading = false;
    //     this.pageErrorHandle(err);
    //   }
    // );
  }
  getOntList(ontList) {
    if (ontList?.ok == false) {
      if (!this.redenderOnce) {
        this.dtTrigger.next();
        this.redenderOnce = true;
      } else {
        setTimeout(() => {
          this.rerender();
        }, 1000);
        
      }
      this.pageErrorHandle(ontList);
      return;
    }
    // this.loading = true;
    // this.nwSystemCommon.getOntList(this.cardDetails).subscribe(
    //   (json: any) => {
        this.ontList = ontList?.ontDevices;
        if (this.ontList && this.ontList.length > 0) {
          this.ontList.forEach((data) => {
            data['isExpanded'] = false;
          });
        }
        if (!this.redenderOnce) {
          this.dtTrigger.next();
          this.redenderOnce = true;
        } else {
          // setTimeout(() => {
          this.rerender();
          // }, 1000);
        }

        setTimeout(() => {
          this.search(this.searchInput);
          // this.dtElement.dtInstance?.then((dtInstance: DataTables.Api) => {
          //   dtInstance.columns(0).search(this.searchInput).draw();
          // });
        }, 200);
        this.ontSelectedSlot = Array.from(new Set(this.ontSelectedSlot));
        if(this.ontSelectedSlot && this.ontSelectedSlot.length > 0){
          this.ontSelectedSlot.forEach((i) => {
            this.getOntDetails(
              i,
              this.ontList[i]
            );
          });
        }
    //     this.loading = false;
    //     console.log(json.data);
    //   },
    //   (err: any) => {
    //     this.ontList = [];
    //     this.loading = false;
    //     this.pageErrorHandle(err);
    //   }
    // );
  }

  getOntDetails(i, ont) {
    // ont = {...ont};
    //collapse expanded details table
    // this.ontList.forEach((data, i) => {
    //   data.isExpanded = false;
    // });
    // this.expandDetails(i);

    this.ontDetails = {};
    
    if (ont && !ont['isExpanded']) {
      this.ontSelectedSlot.push(i);
      this.ontDetailsExpandLoader = true;
      this.nwSystemCommon.getOntDetails(this.cardDetails, ont).subscribe(
        (json: any) => {
          ont['ontDetails'] = json;
          if (ont['ontDetails'] && ont['ontDetails'].temperature) {
            ont['ontDetails'].temperature = isNaN(parseFloat(ont['ontDetails'].temperature)) ? 0 : parseFloat(ont['ontDetails'].temperature)?.toString();
          }
          if (ont['ontDetails'] && ont['ontDetails'].upTime) {
            ont['ontDetails']['parsedUptime'] = false;
            if(typeof ont['ontDetails'].upTime == 'string'){
              ont['ontDetails']['parsedUptime'] = true;
            }else{
              if(parseInt(ont['ontDetails'].upTime) > 0){
                ont['ontDetails']['parsedUptime'] = true;
              }
            }
            ont['ontDetails'].upTime = this.nwSystemCommon.secondsToDhms(ont['ontDetails'].upTime);
          }
          this.expandDetails(i);
        },
        (err: any) => {
          ont['ontDetails'] = {};
          // this.ontDetailsLoader = false;
          this.ontDetailsExpandLoader = false;
          this.pageErrorHandle(err);
        }
      );
    } 
    else {
      this.ontSelectedSlot = Array.from(new Set(this.ontSelectedSlot));
      this.ontSelectedSlot = this.ontSelectedSlot?.filter(el => el != i);
      this.expandDetails(i);
    }
  }
  getSubscriberDetails(i, ont){
    localStorage.setItem('NetworkSystemsCardDetails', JSON.stringify({cardDetails : this.cardDetails, searchInput : this.searchInput, reportTypeSelected : this.reportTypeSelected, ontSelectedSlot : this.ontSelectedSlot, selectedSlot : this.cardSelectedSlot}));
    this.router.navigate(
      [`/cco/services/subscribers/system/list`],
      {
        queryParams: { fromNs : true },
        state: {
          ccoSystemSearchText:
          ont?.fsan
        },
      }
    );
  }
  expandDetails(val) {
    this.ontList.forEach((data, i) => {
      if (val == i) {
        this.ontList[val].isExpanded = !this.ontList[val].isExpanded;
      } 
      // else {
      //   data.isExpanded = false;
      // }
    });
    this.ontDetailsExpandLoader = false;
    // this.ontDetailsLoader = false;
  }
  
  goBack() {
    this.goToCardPage.emit();
  }

  goToHealth() {
    let queryParams = {
      fromNs: 'true',
      region_uuid: this.cardDetails?.systemInfo?.regionuuid,
      location_uuid: this.cardDetails?.systemInfo?.locationuuid,
      system_uuid: this.cardDetails?.systemInfo?.uuid,
      interface:
        this.cardDetails &&
        this.cardDetails?.pon &&
        this.cardDetails?.pon['name']
          ? this.cardDetails?.pon['name']
          : '',
    };
    let url = ``;
    if(this.cardDetails?.pon['ifType'] == 'ethernetCsmacd' && this.cardDetails?.pon['aemgmt'] && this.cardDetails?.pon['aemgmt'] == 'ENABLED'){
      url = `cco/health/ae`;
    } else if(this.cardDetails?.pon['ifType'] == 'ethernetCsmacd'){
      url = `cco/health/uplink`;
    } else if(this.cardDetails?.pon['ifType'] == 'vdsl'){
      url = `cco/health/dsl`;
    } else {
      url = `cco/health/pon-utilization/overview/basic`;
    }
    // this.router.navigate([`/cco/health/ont`], { queryParams: queryParams })
    const link = this.router.serializeUrl(
      this.router.createUrlTree([url], {
        queryParams: queryParams,
      })
    );
    window.open(link, '_blank');
  }
  tableLanguageOptions() {
    if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }
  rerender(search?): void {
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.clear();
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  search(term: string) {
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.search(term).draw();
    });
  }

  clearSearch(value) {
    this.searchInput = '';
    this.search(this.searchInput);
    // this.rerender();
  }

  unitConversion(legendName, value) {
    if (legendName == this.language["ONT Tx Optical Power"] || legendName == "rxOptPwr" || legendName == "neOptSignalLvl" || legendName == this.language["OLT Rx Power Level"] || legendName == this.language["ONT Rx Power Level"])
      return value.toFixed(2) + " dBm"
    else if (legendName == this.language["upTime"] )
      return value.toFixed(2) + " s"
    else if (legendName == this.language["usRate"] || legendName == this.language["dsRate"])
      return this.nwSystemCommon.bitsToSize(value, false, 2);
    else if (legendName == this.language["rxErrToPktRatio"] || legendName == this.language["txErrToPktRatio"] || legendName == this.language["rxDisToPktRatio"] || legendName == this.language["txDisToPktRatio"]) {
      return value
    }
    else return this.ShortnumberPipe.transform(value, false);
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }

  closeAlert() {
    this.error = false;
  }
  convertToDateTime(dateTime: any) {
    if (!dateTime) {
      return
    }

    dateTime = Number(dateTime);

    let pipe = new DatePipe('en-US');
    return pipe.transform(new Date(dateTime), 'short');
  }
  customSorting(event, sortBy){
    let sortableEle = document.getElementById('sortables');
    if(sortableEle && sortableEle?.children?.length > 0){
      let sortArray = Array.from(sortableEle.children);
      sortArray.forEach((element) => {
        if(element?.classList?.contains('clx-sorting_asc')){
          element?.classList?.add('clx-sorting_asc_temp');
          element?.classList?.remove('clx-sorting_asc');
        }
        if(element?.classList?.contains('clx-sorting_desc')){
          element?.classList?.add('clx-sorting_desc_temp');
          element?.classList?.remove('clx-sorting_desc');
        } 
      });
    }
    this.sortBy = sortBy;
    if(event.target.classList.contains('clx-sorting') || event.target.classList.contains('clx-sorting_desc_temp')){
      event.target.classList.add('clx-sorting_asc');
      event.target.classList.remove('clx-sorting');
      event.target.classList.remove('clx-sorting_desc_temp');

      this.sortOrder = 'asc';
    } else if(event.target.classList.contains('clx-sorting_asc_temp')){
      event.target.classList.add('clx-sorting_desc');
      event.target.classList.remove('clx-sorting');
      event.target.classList.remove('clx-sorting_asc_temp');

      this.sortOrder = 'desc';
    }

    if(sortableEle && sortableEle?.children?.length > 0){
      let sortArray = Array.from(sortableEle.children);
      sortArray.forEach((element) => {
        if(!element?.classList?.contains('clx-sorting_asc') && !element?.classList?.contains('clx-sorting_desc')){
          element?.classList?.add('clx-sorting');
        }
        
      });
    }

    this.getNfaOntList();
  }

  checkPowerValues(power, ont){
    let data = '-';
    if(power && ont['ontDetails'].status?.toLowerCase() == 'up' || ont['ontDetails'].status?.toLowerCase()?.includes('enable')){
      if(isNaN(parseFloat(power))){
        data = this.notSupportedValue[power];
      }else{
        if(power?.toLowerCase()?.includes('dbm')){
          data = power;
        }else{
         data = power + " dBm";
        }
      }
    }
    return data;
  }
  checkIfNumber(item){
    return !isNaN(Number(item));
  }
  ngOnDestroy(): void {
    // if (this.dtSub) this.dtSub.unsubscribe();
  }
}
