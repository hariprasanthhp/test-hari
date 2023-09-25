import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { NetworkSystemsApiService } from '../../services/network-systems-api.service';
import { CardDetailsComponent } from './card-details/card-details.component';
import { DataTableDirective } from 'angular-datatables';
import { Title } from '@angular/platform-browser';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { RouterService } from 'src/app-services/routing.services';

@Component({
  selector: 'app-show-system-details',
  templateUrl: './show-system-details.component.html',
  styleUrls: ['./show-system-details.component.scss'],
})
export class ShowSystemDetailsComponent implements OnInit {
  systemInfo: any;
  languageSubject;
  language: any;
  loading: boolean = false;
  error: boolean;
  errorInfo: string = '';
  openCoverages = false;
  indexSelectedCoverage = 1;
  backToExpand = history?.state?.cardDetails;
  dataRefresh: boolean = false;
  cardsList: any[];
  cardsSummary: any;
  systemControllerData: any;
  systemControllerColumns: any;
  selectedSlot = [];
  showInterfaceDetails: boolean;
  cardInterfaceObj: any;
  interfaceSummaryLoader: boolean = false;
  @ViewChild(CardDetailsComponent)
  cardDetailsComponent: CardDetailsComponent;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  // @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>;
  dtTrigger: Subject<any> = new Subject();
  // dtSub: any;
  redenderOnce: boolean = false;
  dtOptions: DataTables.Settings = {}
  isAxos: boolean = false;
  canShowHeaderButtons: boolean = true;
  canShowHeaderPages: boolean = false;
  hasWriteAccess = false;
  hasScopeAccess = false;
  navigatedCardDetails: any;
  directlyToInterfacePage: any;
  localStorageData: any;
  constructor(
    private router: Router,
    private translateService: TranslateService,
    private http: HttpClient,
    private commonOrgService: CommonService,
    private nwSystemCommon: NetworkSystemsApiService,
    private titleService: Title,
    private sso: SsoAuthService,
    private routerService : RouterService
  ) {
    if(this.routerService.previousUrl.includes('fromNs=true')){
      this.showInterfaceDetails = true;
    }
    window.scrollTo(0, 0);
    Object.defineProperty(String.prototype, 'capitalize', {
      value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
      },
      enumerable: false,
    });

    this.language = this.translateService.defualtLanguage;
    this.dtOptions = {
      paging: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      processing: false,
      dom: 'tipr',
      info: true,
      ordering: false,
    }
    this.tableLanguageOptions();

    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        this.setPageTitle();

        this.tableLanguageOptions();
        if (this.systemInfo && this.systemInfo['type'] !== 'MGMT_SYSTEM') {
          this.setApiToCall();
        }
      }
    );

    this.systemInfo = JSON.parse(
      localStorage.getItem('calix.network.system.details')
    );
    this.localStorageData = {...this.systemInfo};
    this.directlyToInterfacePage = this.localStorageData?.fromCSC;
    if(!this.systemInfo?.isGeomap && !this.localStorageData?.fromCSC){
      this.modifyInfo(this.systemInfo);
    }else{
      this.systemInfo['ui_modified_name'] = this.systemInfo['deviceName'];
      this.canShowHeaderButtons = false;
    }
    
    this.setSystemcontrollerColumns();
    // if (history?.state?.cardDetails != undefined) {
    //   this.clickExpand(this.backToExpand);
    // }
    console.log(this.routerService)
  }

  ngOnInit(): void {
    //from ns list page
    if(this.systemInfo?.name){
      if (this.systemInfo?.type === 'MGMT_SYSTEM' || this.systemInfo?.parentuuid && this.systemInfo?.deviceModel !== 'CMS') {
        this.isAxos = false;
      }else if(!this.systemInfo['parentuuid'] && this.systemInfo['deviceModel'] !== 'CMS'){
        this.isAxos = true;
      }
      this.validateScopes();
      this.setPageTitle();
    }else{
      this.titleService.setTitle(`${this.language['System Onboarding']} - ${this.language['Operations']}  - ${this.language['Operations']}- ${this.language['Calix Cloud']}`);
    }
    // if (history?.state?.cardDetails != undefined) {
    //   this.clickExpand(this.backToExpand);
    // }
    if (this.systemInfo && (this.systemInfo['type'] !== 'MGMT_SYSTEM' || this.systemInfo?.isGeomap || this.localStorageData?.fromCSC)) {
      this.setApiToCall();
    }else{
      this.canShowHeaderPages = true;
    }
    console.log(this.routerService)
  }
  unsorted() {
    return 0;
  }
  setSystemcontrollerColumns() {
    this.systemControllerColumns = {
      'Card Location': [],
      'Up Time': [],
      'CPU Usage': [],
      'RAM Usage': [],
      'Intake Temperature': [],
      'Fan Speed': [],
    };
  }
  setPageTitle(){
    if(!this.isAxos){
      this.titleService.setTitle(`${this.language['CMS/EXA Systems']} - ${this.language['System Onboarding']} - ${this.language['Operations']}  - ${this.language['Operations']}- ${this.language['Calix Cloud']}`);
    }else{
      this.titleService.setTitle(`Systems - AXOS Systems - ${this.language['System Onboarding']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    }
    
  }
  setApiToCall(type?) {
    let apis = {
      systemController: this.nwSystemCommon
        .getSystemController(this.systemInfo?.uuid)
        .pipe(catchError((error) => of(error))),
      cardsData: this.nwSystemCommon
        .getCardDetails(this.systemInfo?.uuid)
        .pipe(catchError((error) => of(error))),
    }
    if (type == 'refresh' || (!this.systemInfo['parentuuid'] && this.systemInfo['deviceModel'] !== 'CMS') || this.systemInfo?.isGeomap || this.localStorageData?.fromCSC) {
      if (!this.showInterfaceDetails) {
        apis['deviceDetails'] = this.http.get(`${environment.API_BASE_URL}nfa/systems/details/${this.systemInfo?.uuid}?tenant=0`).pipe(catchError((error) => of(error)));
        if (this.systemInfo && this.systemInfo['type'] == 'MGMT_SYSTEM') {
          delete apis['systemController'];
          delete apis['cardsData'];
        }
      } else if (this.systemInfo && this.systemInfo['type'] !== 'MGMT_SYSTEM' && this.showInterfaceDetails) {
        this.cardDetailsComponent.callInterfaceAPIS();
        return;
      }
    }
    this.callSystemAPIS(apis);
  }
  callSystemAPIS(apis) {
    this.systemControllerData = {};
    this.cardsList = [];
    this.loading = true;
    forkJoin(apis).subscribe((json: any) => {
      if (json?.systemController) {
        this.getSystemController(json?.systemController);
      }
      
      if (json?.deviceDetails) {
        this.validateScopes();
        this.refreshDeviceDetails(json?.deviceDetails);
      }else{
        this.validateScopes();
      }

      setTimeout(() => {
        if (json?.cardsData) {
          this.getCardDetails(json?.cardsData);
        }
      }, 100);
      this.canShowHeaderButtons = true;
      const systemInfo = JSON.parse(localStorage.getItem('calix.network.system.details'));
      const discoveredPonPort = systemInfo?.discoveredPonPort;
      
      if(this.routerService.previousUrl.includes('fromNs=true')){
        this.navigatedCardDetails = JSON.parse(localStorage.getItem('NetworkSystemsCardDetails'));
        localStorage.removeItem("NetworkSystemsCardDetails");
        console.log(this.navigatedCardDetails, 'this.navigatedCardDetails');
        this.selectedSlot = Array.from(new Set(this.navigatedCardDetails?.cardDetails?.selectedSlot || []));
        this.goToInterfacePage(this.navigatedCardDetails?.cardDetails?.pon, this.navigatedCardDetails?.cardDetails?.card)
      }
      else if(discoveredPonPort) {
        //after the card List API called we have to call this
        setTimeout(() => {
          this.onAddPortCardSummary(discoveredPonPort);
        },400);
      } else if(this.directlyToInterfacePage){
        if(json.cardsData && json.cardsData?.length > 0){
          let cardInfoIndex = json.cardsData.findIndex(el => el.card == this.localStorageData?.deviceName.slice(0,3));
          this.getCardInterfaceSummary(cardInfoIndex,json.cardsData[cardInfoIndex]);
          // this.goToInterfacePage(matchedPortList[0],card);
        }
      }
      else {
        this.onShowHeaderPages();
      }
    });
  }

  onAddPortCardSummary(discoveredPonPort:string) {
    if(!this.cardsList.length) {
      this.onShowHeaderPages();
      return;
    }
    this.cardsList.forEach((cardInfo:any,index) => {
      this.getCardInterfaceSummary(index,cardInfo,discoveredPonPort);
      if(index === this.cardsList.length - 1) {
        this.onShowHeaderPages();
      }
    });
  }

  getMatchedPortList(discoveredPonPort,cardsSummary) {
    if(!cardsSummary?.length) return [];
    const matchedPortList = cardsSummary.filter((card:any) => {
      return card.name === discoveredPonPort;
    });
    return matchedPortList;
  }

  onShowHeaderPages() {
    this.canShowHeaderPages = true;
    this.loading = false;
  }

  refreshDeviceDetails(deviceDetails) {
    if (deviceDetails?.ok == false) {
      this.pageErrorHandle(deviceDetails);
      return;
    }
    if (deviceDetails) {
      this.modifyInfo(deviceDetails);
    }
  }
  getSystemController(systemController) {
    if (systemController?.ok == false) {
      this.pageErrorHandle(systemController);
      return;
    }
    // this.loading = true;
    // this.nwSystemCommon.getSystemController(this.systemInfo.uuid).subscribe(
    //   (json: any) => {
    let data = systemController;
    this.setSystemcontrollerColumns();
    let output = { ...this.systemControllerColumns },
      item;
    if (data && data.length > 0) {
      data = this.nwSystemCommon.sortStringHavingSplChar(data, 'cardLocation');
      data.forEach((element) => {
        // if(element && element['upTime']){
        //   let uptime = element['upTime']?.split(" ");
        //   if(uptime?.length > 0){
        //     let splituptime = uptime[0].split(":");
        //     if(splituptime.length == 3){
        //       element['upTime'] = splituptime[0] + "d," + splituptime[1] + "h," + (splituptime[2] > 9 ? splituptime[2] : ("0" + splituptime[2]))  + "m"
        //     }else if(splituptime.length == 2){
        //       element['upTime'] = splituptime[0] + "h," + (splituptime[1] > 9 ? splituptime[1] : ("0" + splituptime[1]))  + "m"
        //     }
        //   }
        // }
        if (element && element['upTime']) {
          if (this.systemInfo.parentuuid && this.systemInfo?.deviceModel !== 'CMS') {
            element['upTime'] = this.nwSystemCommon.secondsToDhms(Number(element['upTime']));
          }
        } else {
          element['upTime'] = '';
        }
        element['cpuUsage'] =
          element && element['cpuUsage'] ? element['cpuUsage'] + '%' : '';
        element['ramUsage'] =
          element && element['ramUsage'] ? element['ramUsage'] + '%' : '';
        element['intakeTemp'] =
          element && element['intakeTemp'] ? element['intakeTemp'] : '';
        element['fanSpeed'] =
          element && element['fanSpeed'] ? element['fanSpeed'] + '%' : '';
        element['cardLocation'] =
          element && element['cardLocation'] ? element['cardLocation'] : '';
      });
      // data.forEach((el) => {
      //   if(el['cardLocation']){
      //     el['sorting'] = Number(el['cardLocation'].split('/').join(''));
      //   }
      // })
      // data.sort((a, b) => {
      //   return a.sorting - b.sorting;
      // });
      data.forEach((item) => {
        // iterate each key on the object
        for (var prop in item) {
          // if (item.hasOwnProperty(prop)) {

          if (prop == 'upTime') {
            output['Up Time'].push(item[prop]);
          } else if (prop == 'cpuUsage') {
            output['CPU Usage'].push(item[prop]);
          } else if (prop == 'ramUsage') {
            output['RAM Usage'].push(item[prop]);
          } else if (prop == 'intakeTemp') {
            output['Intake Temperature'].push(item[prop]);
          } else if (prop == 'fanSpeed') {
            output['Fan Speed'].push(item[prop]);
          } else if (prop == 'cardLocation') {
            output['Card Location'].push(item[prop]);
          }

          // }
        }
      });

      this.systemControllerData = output;
      // this.loading = false;
    }
    //   },
    //   (err: any) => {
    //     this.systemControllerData = {};
    //     this.loading = false;
    //     this.pageErrorHandle(err);
    //   }
    // );
  }
  getCardDetails(cardsData) {
    if (cardsData?.ok == false) {
      if (!this.redenderOnce) {
        this.dtTrigger.next();
        this.redenderOnce = true;
      } else {
        this.rerender();
      }
      this.pageErrorHandle(cardsData);
      return;
    }
    // this.loading = true;
    // this.nwSystemCommon.getCardDetails(this.systemInfo?.uuid).subscribe(
    //   (json: any) => {
    this.cardsList = cardsData;
    if (this.cardsList && this.cardsList.length > 0) {
      this.cardsList = this.nwSystemCommon.sortStringHavingSplChar(this.cardsList, 'card');

      this.cardsList.forEach((data) => {
        data['portCount'] = data['portCount'] && Number(data['portCount']) > 0 ? Number(data['portCount']) : 0
        data['isExpanded'] = false;
      });
      if (!this.redenderOnce) {
        this.dtTrigger.next();
        this.redenderOnce = true;
      } else {
        this.rerender();
      }
      // this.cardsList.forEach((el) => {
      //   if(el['card']){
      //     el['sorting'] = Number(el['card'].split('/').join(''));
      //   }
      // })
      // this.cardsList.sort((a, b) => {
      //   return a.sorting - b.sorting;
      // });
    }
    // this.loading = false;
    this.getCardInterfaceSummary(
      this.backToExpand,
      this.cardsList[this.backToExpand]
    );
    console.log(cardsData);
    //   },
    //   (err: any) => {
    //     this.cardsList = [];
    //     this.loading = false;
    //     this.pageErrorHandle(err);
    //   }
    // );
  }
  getCardInterfaceSummary(i, card, discoveredPonPort?) {
    this.interfaceSummaryLoader = true;
    if (card && !card['isExpanded']) {
      this.selectedSlot.push(i);
      this.nwSystemCommon
        .getCardInterfaceSummary(card, this.systemInfo?.uuid)
        .subscribe(
          (json: any) => {
            card['cardsSummary'] = [];
            if (json && json.length > 0) {
              json = this.nwSystemCommon.sortStringHavingSplChar(json, 'name');
              card['cardsSummary'] = json;
              card['cardsSummary'].forEach((el) => {
                el['adminStatus'] = el['adminStatus']?.capitalize();
                el['operStatus'] = el['operStatus']?.capitalize();
                el['ontCount'] = el['ontCount'] && Number(el['ontCount']) > 0 ? Number(el['ontCount']) : 0
              });
            }

            if(!discoveredPonPort) {
              this.clickExpand(i);
            }

            //CCL-70788
            if(discoveredPonPort) {
              const matchedPortList = this.getMatchedPortList(discoveredPonPort,json);
              if(matchedPortList.length) {
                if(matchedPortList[0] && card) {
                  this.clickExpand(i);
                  this.onShowHeaderPages();
                  this.goToInterfacePage(matchedPortList[0],card);
                }
              }
            }
            if(this.directlyToInterfacePage){
              const portList = this.getMatchedPortList(this.localStorageData?.deviceName,json);
              if(portList.length) {
                if(portList[0] && card) {
                  this.clickExpand(i);
                  this.onShowHeaderPages();
                  this.goToInterfacePage(portList[0],card);
                }
              }
            }
          },
          (err: any) => {
            card['cardsSummary'] = [];
            this.interfaceSummaryLoader = false;
            this.pageErrorHandle(err);
          }
        );
    } else {
      this.selectedSlot = this.selectedSlot?.filter(el => el != i);
      this.clickExpand(i);
    }
  }
  selectItemCoverages(index: number) { }
  clickExpand(val) {
    // this.cardData[val].isExpanded = !this.cardData[val].isExpanded;

    this.cardsList.forEach((_cardData, i) => {
      if (val == i) {
        this.cardsList[val].isExpanded = !this.cardsList[val].isExpanded;
      }
      // else {
      //   _cardData.isExpanded = false;
      // }
    });
    this.interfaceSummaryLoader = false;
  }

  goToInterfacePage(pon, card) {
    let stateObj = {
      selectedSlot: this.selectedSlot,
      pon: pon,
      card: card,
      uuid: this.systemInfo?.uuid,
      systemInfo: this.systemInfo,
      reportTypeSelected : this.navigatedCardDetails?.reportTypeSelected,
      searchInput : this.navigatedCardDetails?.searchInput,
      ontSelectedSlot : this.navigatedCardDetails?.ontSelectedSlot,
    };
    this.cardInterfaceObj = stateObj;
    this.showInterfaceDetails = true;
    this.loading = false;
    this.canShowHeaderPages = true;
  }

  goToCardPage() {
    if(this.navigatedCardDetails && this.navigatedCardDetails.cardDetails && this.navigatedCardDetails.cardDetails.selectedSlot && this.navigatedCardDetails.cardDetails.selectedSlot.length > 0){
      this.navigatedCardDetails.cardDetails.selectedSlot.forEach((i) => {
        this.getCardInterfaceSummary(
          i,
          this.cardsList[i]
        );
      })
    }
    this.navigatedCardDetails = {};
    this.cardInterfaceObj = {};
    this.showInterfaceDetails = false;
  }

  gotoEdit() {
    let id = this.systemInfo?.uuid;
    if (
      window.location.href.indexOf('/systemAdministration/cco-admin/') !== -1
    ) {
      this.router.navigate([
        `systemAdministration/cco-admin/network-systems/edit/${id}`,
      ]);
    } else if (
      window.location.href.indexOf('/organization-admin/cco-admin/') !== -1
    ) {
      this.router.navigate([
        `organization-admin/cco-admin/network-systems/edit/${id}`,
      ]);
    } else {
      this.router.navigate([`cco/system/cco-network-system/edit/${id}`]);
    }
  }

  gotoList() {
    let networkSystemsListFilters = history?.state?.networkSystemsListFilters;
    networkSystemsListFilters = networkSystemsListFilters ? JSON.parse(networkSystemsListFilters) : {};

    if (
      window.location.href.indexOf('/systemAdministration/cco-admin/') !== -1
    ) {
      this.router.navigate([
        '/systemAdministration/cco-admin/network-systems/list',
      ]);
    } else if (
      window.location.href.indexOf('/organization-admin/cco-admin/') !== -1
    ) {
      this.router.navigate([
        '/organization-admin/cco-admin/network-systems/list',
      ]);
    } else {
      let url = '';
      if(networkSystemsListFilters && networkSystemsListFilters?.isGeomap){
        url = '/cco/home/active-systems-geomap';
      } else if(networkSystemsListFilters && (networkSystemsListFilters['isAxos'] || this.isAxos)){
        url = '/cco/operations/system-onboarding/axos-callhome/axos/list';
      } else if(networkSystemsListFilters && (!networkSystemsListFilters['isAxos'] || this.isAxos == false)){
        url = '/cco/operations/system-onboarding/cms-exa/list';
      }
      this.router.navigate(
        [url],
        { state: { networkSystemsListFilters: JSON.stringify(networkSystemsListFilters) } }
      );
    }
  }



  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
    this.loading = false;
  }

  closeAlert() {
    this.error = false;
  }

  modifyInfo(data: any) {
    let communicationState = '';
    this.isAxos = false;
    if(!data?.parentuuid && data?.deviceModel !=='CMS'){
      this.isAxos = true;
    }
    this.setPageTitle();
    this.validateScopes();
    if (data && data['name']) {
      data['ui_modified_name'] = data['name'].replace('device=', '');
      data['ui_modified_name'] = data['ui_modified_name'].replace(
        'DEVICE=',
        ''
      );
    }
    if (data && data.protocolInfos && data.protocolInfos.length) {
      for (let i = 0; i < data.protocolInfos.length; i++) {
        if (
          data.protocolInfos[i].communicationState?.toUpperCase() ===
          'DISCONNECTED'
        ) {
          communicationState = data.protocolInfos[i].communicationState;
          break;
        } else {
          communicationState = data.protocolInfos[i].communicationState;
        }
      }
    }
    if(data){
      data['ui_modified_communication_state'] = communicationState;
    }
    
    if (data?.place?.point?.latitude && data?.place?.ufLocation) {
      data[
        'ui_modified_service_address'
      ] = `${data?.place?.ufLocation}<br>(${data?.place?.point?.latitude}, ${data?.place?.point?.longitude})`;
      data[
        'ui_modified_service_address_latlong'
      ] = `<b>${data?.place?.ufLocation}</b> <br> (${data?.place?.point?.latitude}, ${data?.place?.point?.longitude})`;
    } else if (data?.place?.point?.latitude && !data?.place?.ufLocation) {
      data['ui_lat_long_only'] = true;
      data[
        'ui_modified_service_address'
      ] = `${data?.place?.point?.latitude}, ${data?.place?.point?.longitude}`;
      data[
        'ui_modified_service_address_latlong'
      ] = `${data?.place?.point?.latitude}, ${data?.place?.point?.longitude}`;
    } else if(data){
      data['ui_modified_service_address'] = data?.place?.ufLocation;
      data['ui_modified_service_address_latlong'] = data?.place?.ufLocation
        ? `<b>${data?.place?.ufLocation}</b>`
        : '';
    }

    this.systemInfo = data;
  }
  goToActiveAlarms() {
    let queryParams = {
      fromNs: 'true',
      region_uuid: this.systemInfo?.regionuuid,
      location_uuid: this.systemInfo?.locationuuid,
      system_uuid: this.systemInfo?.uuid,
    };
    const link = this.router.serializeUrl(
      this.router.createUrlTree([`/cco/alerts/system/active-reports`], {
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
    } else if (
      this.language.fileLanguage == 'en' &&
      this.dtOptions.language
    ) {
      delete this.dtOptions.language;
    }
  }
  validateScopes(){
    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE && window.location.href.indexOf('/cco/system/cco-network-system/show-details') !== -1) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        if (window.location.href?.indexOf('/cco/system/cco-network-system/show-details') !== -1 && scopes?.['cloud.rbac.coc.operations.systemonboarding.cmsexacallhome']?.length && !this.isAxos) {
          this.hasScopeAccess = true;
        } else if (window.location.href?.indexOf('/cco/system/cco-network-system/show-details') !== -1 && scopes?.['cloud.rbac.coc.operations.systemonboarding.axoscallhome.systems']?.length && this.isAxos) {
          this.hasScopeAccess = true;
        }

        if (window.location.href?.indexOf('/cco/system/cco-network-system/show-details') !== -1 && scopes?.['cloud.rbac.coc.operations.systemonboarding.cmsexacallhome']?.indexOf('write') !== -1 && !this.isAxos) {
          this.hasWriteAccess = true;
        } else if (window.location.href?.indexOf('/cco/system/cco-network-system/show-details') !== -1 && scopes?.['cloud.rbac.coc.operations.systemonboarding.axoscallhome.systems']?.indexOf('write') !== -1 && this.isAxos) {
          this.hasWriteAccess = true;
        }
      }

    } else {
      this.hasScopeAccess = true;
      this.hasWriteAccess = true;
    }
  }
  rerender(search?): void {
    this.dtElement.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.clear();
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  ngOnDestroy() {
    // if(localStorage.getItem('calix.network.system.details')){
    //   localStorage.removeItem('calix.network.system.details')
    // }
    // if (this.dtSub){ this.dtSub.unsubscribe()};
  }
}
