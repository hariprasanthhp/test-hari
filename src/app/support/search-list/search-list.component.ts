import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { TranslateService } from './../../../app-services/translate.service';
import { DataTableDirective } from 'angular-datatables';
import { DataServiceService } from '../data.service';
import { SsoAuthService } from './../../shared/services/sso-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SubscribeService } from '../shared/service/subscriber.service';
import { SearchListModel } from '../shared/models/search-list.model';
import { getSubscribeList } from '../shared/service/endpoints';
import { environment } from './../../../environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit, AfterViewInit, OnDestroy {

  showResult = false;
  loader = false;
  language: any;
  searchResult: SearchListModel = new SearchListModel();
  dtOptions: DataTables.Settings = {};
  tableCounts;
  result: any = {};
  languageSubject;
  searchSubscriber;
  orgId;
  isError;
  alertMessage;
  errorMsg;
  public showError: boolean = false;
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  frTable: any;
  esTable: any;
  germanTable: any;
  searchCount: any = 0;
  subscribeClicked: boolean = true;
  searchText: string;
  count: number;
  topSearchResultscount: number;
  filterCount: number;
  showFilterCount: boolean = false;
  showCount: boolean = false;
  _array = Array;
  devicesSelected: any;
  first10kvalue: boolean;
  showExcessError: boolean = false
  dtPageNo: any;
  filteredOverallCount: any;
  constructor(
    private translateService: TranslateService,
    private service: DataServiceService,
    private router: Router, private http: HttpClient,
    private ssoService: SsoAuthService,
    private subscribeService: SubscribeService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.orgId = this.ssoService.getOrgId();
    this.subscribeService.showCountStatus$.subscribe((res: boolean) => {
      this.showCount = res;
    })
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.redraw();
      this.titleService.setTitle(`${this.language['Search']} - ${this.language['Support']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Search']} - ${this.language['Support']} - ${this.language['Calix Cloud']}`);
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.germanTable = this.translateService.de_DE;
    this.showResult = true;
    this.showCount = true;
    this.loadSubscriberData()
    this.route.queryParams.subscribe(params => {
      this.showResult = true;
      this.searchText = history?.state?.searchText || history?.state?.subscriberId;
      // hiding for CCL-66739 calling multiple times search API
      // if (this.searchText || this.searchText == "") {
      //   setTimeout(() => {
      //     this.redraw();
      //   }, 1000)
      // }
      // In a real app: dispatch action to load the details here.
    });
    // setTimeout(() => {
    //   this.showExcessError = this.dtPageNo >= 999 ? true : false
    //   console.log("show error", this.showExcessError);
    // }, 5000)
    this.getCount();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      history.state?.isHome ? $('#searchedValue').text(history.state?.filterValue) : '';
    }, 0)
  }
  getCount() {


    this.showResult = false;
    this.service.performSearch(this.orgId, '', 0, 0).subscribe((res: SearchListModel) => {
      this.filteredOverallCount = res.metadata.totalHits;
      //   if (this.count > 10000) {
      //     this.first10kvalue = true;
      //     this.count = 10000;
      //     res.metadata.totalHits = 10000;
      // } else {
      //   this.count = res.metadata.totalHits;
      // }
      this.showResult = true;
      //this.getCount();
    }, error => {
      this.loader = false;
    })
  }
  loadSubscriberData() {
    this.showResult = true;
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      ordering: false,
      dom: "tip",
      responsive: true,
      ajax: (dataTablesParameters: any, callback) => {
        // console.log('seyyy',dataTablesParameters)

        let pageNo = null;
        if (dataTablesParameters.start == 0) {
          pageNo = 0;
        } else {
          pageNo = dataTablesParameters.start / dataTablesParameters.length;
        }
        const params = new HttpParams()
          // .set("orgId", this.orgId)
          .set("filter", this.searchText || "")
          .set("pageNumber", pageNo + 1)
          .set("pageSize", dataTablesParameters.length)
        if (this.ssoService.getOrg(this.orgId)) {
          params.set("orgId", this.orgId)
        }
        that.http.get(`${environment.SUPPORT_URL}${getSubscribeList}`, { params }).subscribe((resp: SearchListModel) => {
          this.loader = false;
          this.topSearchResultscount = resp.metadata.totalHits;
          this.count = resp.metadata.totalHits;
          // this.dtPageNo = pageNo;
          this.showExcessError = pageNo >= 999 ? true : false
          if (this.count > 10000) {
            this.first10kvalue = true;
            this.count = 10000;
            resp.metadata.totalHits = 10000;
          } else {
            this.first10kvalue = false;
            this.count = resp.metadata.totalHits;
          }
          this.showCount = true;
          if (resp?.records) {
            resp?.records.forEach(obj => {
              const RGDevices = obj?.devices.filter(device => device.opMode == "RG");
              if (RGDevices.length > 1) {
                let deviceSet: any = [];
                RGDevices.forEach(rg => {
                  let deviceCollector = [rg, ...obj?.devices.filter(device => device.wapGatewaySn == rg.serialNumber)];
                  deviceSet.push(deviceCollector);
                });
                const ds = deviceSet.flat(2).map(devs => devs.deviceId);
                const notMatched = obj?.devices.filter(dev => ds.indexOf(dev.deviceId) == -1);
                if (notMatched.length > 0) deviceSet.push()
                obj.devices = deviceSet;
              }
            });

            //to fix CCL-35753
            const order = {
              'ONT': 1,
              'RG': 2,
              'WAP': 3
            }
            if (resp?.records.length) {
              for (let i = 0; i < resp.records.length; i++) {
                if (resp?.records[i]?.devices) {
                  resp.records[i].devices = resp.records[i].devices.sort((a, b) => {
                    let opmodeA = a['ont'] ? 'ONT' : a?.opMode ? a?.opMode : '';
                    let opmodeB = b['ont'] ? 'ONT' : b?.opMode ? b?.opMode : '';
                    return (order[opmodeA] ? order[opmodeA] : 0) - (order[opmodeB] ? order[opmodeB] : 0);
                  });
                }
              }
            }
            // fix-end CCL-35753

          }

          that.searchResult = resp;
          callback({
            recordsTotal: this.count,
            recordsFiltered: (this.filterCount != undefined) ? this.filterCount : that.count,
            data: []
          });
        }, error => {
          this.loader = false;
          this.showError = true;
          this.errorMsg = this.pageErrorHandle(error);
        })
      },
      drawCallback: (settings) => {
        this.changeTableStatusLanguage(settings);
        let total = settings._iRecordsDisplay; // for server side rendering
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
        } else {
          //$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
        }
      },
    };
  }

  // changeTableStatusLanguage(dtObj) {
  //   const nf = new Intl.NumberFormat();
  //   this.tableCounts = {
  //     searchText: dtObj.oPreviousSearch.sSearch.trim(),
  //     total: dtObj._iRecordsTotal,
  //     displayCount: dtObj._iDisplayLength,
  //     displayed: dtObj._iRecordsDisplay,
  //     start: dtObj._iDisplayStart
  //   };
  //   const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr'),
  //     filtered = `${dtObj.oPreviousSearch.sSearch.trim() ?
  //       (isFrench ?
  //         `(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` :
  //         `(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
  //       ''}`;
  //   const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
  //   const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
  //   $('div [role="status"]').text(isFrench ?
  //     `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` :
  //     `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
  //   )
  //   $(".first").text(isFrench ? 'Le début' : 'First');
  //   $(".previous").text(isFrench ? 'Précédent' : 'Previous');
  //   $(".next").text(isFrench ? 'Suivant' : 'Next');
  //   $(".last").text(isFrench ? 'Dernière' : 'Last');
  // }

  changeTableStatusLanguage(dtObj) {
    const nf = new Intl.NumberFormat();
    let searchValue = this.searchText ? this.searchText : '';
    this.tableCounts = {
      searchText: searchValue.replace(/\s+/g, ""),
      total: dtObj._iRecordsTotal,
      displayCount: dtObj._iDisplayLength,
      displayed: dtObj._iRecordsDisplay,
      start: dtObj._iDisplayStart
    };
    const searchError = '<p class="f-s-14px b-600 mb-0">' + this.language.searchError + '</p>';
    const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr');
    const isSpanish = (sessionStorage.getItem('defaultLanguage') == 'es');
    const isGermen = (sessionStorage.getItem('defaultLanguage') == 'de_DE');
    // console.clear();
    // console.log(this.first10kvalue);
    // const filtered = `${this.first10kvalue ? searchValue.replace(/\s+/g, "") ?
    //   (isFrench ?
    //     `(filtrées à partir des ${nf.format(this.topSearchResultscount)} entrées totales)` : isSpanish ? `(filtrado de un total de ${nf.format(this.topSearchResultscount)} entradas)` :
    //       isGermen ? `(gefiltert aus ${nf.format(this.topSearchResultscount)} Einträgen)` :
    //         `(filtered from ${nf.format(this.topSearchResultscount)} total entries)`) :
    //   '' : ''}`;
    const filtered = `${this.filteredOverallCount > 10000 && this.filteredOverallCount > 0 ?
      (isFrench ?
        `(filtrées à partir des ${nf.format(this.filteredOverallCount)} entrées totales)` : isSpanish ? `(filtrado de un total de ${nf.format(this.filteredOverallCount)} entradas)` :
          isGermen ? `(gefiltert aus ${nf.format(this.filteredOverallCount)} Einträgen)` :
            `(filtered from ${nf.format(this.filteredOverallCount)} total entries)`) :
      ''}`;
    const excessError = `${this.showExcessError ? searchError : ''}`;
    const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
    const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
    $('div [role="status"]').html(isFrench ?
      `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${this.first10kvalue ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered} ${excessError}` : isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${this.first10kvalue ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered} ${excessError}` : isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von ${this.first10kvalue ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered} ${excessError}` :
        `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${this.first10kvalue ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered} ${excessError}`
    );
    // console.log("showexcesserror", this.showExcessError);

    // this.showExcessError ? '<div class="mt-2"><p class="req-text text-small">'+this.language.searchError+'</p></div>' : '';
    //$(".dataTables_filter label")[0].childNodes[0].nodeValue = isFrench ? 'Chercher:' : 'Search:';
    //$(".dataTables_length label")[0].childNodes[0].nodeValue = isFrench ? 'Afficher les ' : 'Show ';
    //$(".dataTables_length label")[0].childNodes[2].nodeValue = isFrench ? ' entrées' : ' entries';
    $(".first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Erste Seite' : 'First');
    $(".previous").text(isFrench ? 'Précédent' : isSpanish ? 'Anterior' : isGermen ? 'Zurück' : 'Previous');
    $(".next").text(isFrench ? 'Suivant' : isSpanish ? 'Siguiente' : isGermen ? 'Weiter' : 'Next');
    $(".last").text(isFrench ? 'Dernière' : isSpanish ? 'Último' : isGermen ? 'Letzte' : 'Last');
  }

  openNote(subscriberId, deviceData, event) {
    localStorage.setItem('searchSubscriberId', subscriberId);
    if (deviceData.length && Array.isArray(deviceData[0])) deviceData = deviceData[0];
    localStorage.setItem('searchDevices', JSON.stringify(deviceData));
    setTimeout(() => {
      this.showSubscriber(subscriberId, deviceData, event);
    }, 2000);
  }

  stringify(devices) {
    return JSON.stringify(devices);
  }

  showSubscriber(subscriberId, deviceData, event, mulRG = false) {
    /* event.stopPropagation();
    event.preventDefault(); */
    if (this.devicesSelected) return;
    if (deviceData.length && Array.isArray(deviceData[0])) deviceData = deviceData[0];
    this.devicesSelected = deviceData;
    $("#paramsPassed").text(subscriberId).attr("searchString", $("#supportSearchId").val().toString());
    this.getSubscriberInfo(subscriberId, deviceData);
  }

  getSubscriberInfo(subscriberId, deviceData) {
    sessionStorage.setItem(`${this.ssoService.getTabId()}calix.deviceData`, JSON.stringify(deviceData));
    sessionStorage.setItem(`${this.ssoService.getTabId()}calix.subscriberId`, subscriberId);
    this.ssoService.setSubscriberEndpointId('');
    this.ssoService.setTrafficReportChartSubscriberInfo('');
    this.service.setSubscriberInfo(undefined);
    this.service.setSubscriberTabInfoData(undefined);
    this.service.removeDataSaver();
    this.service.multipleRegInstance = undefined;
    //this.router.navigate(['/support/overview'], { state: { searchText: this.searchText || "" } });
  }

  tableLanguageOptions() {
    if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'es') {
      this.dtOptions.language = this.esTable;
    }
    else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'de_DE') {
      this.dtOptions.language = this.germanTable;
    }
    else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }

  hideError() {
    this.showError = false;
    this.errorMsg = '';
  }
  redraw() {
    this.loader = true;
    this.showResult = true;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  ngOnDestroy() {
    $("#supportSearchId").val('');
    this.languageSubject.unsubscribe();
    if (this.searchSubscriber) this.searchSubscriber.unsubscribe();
  }

  pageErrorHandle(err: any) {
    $("body").scrollTop(0);
    return (err.status == 401) ? this.language['Access Denied'] : this.ssoService.pageErrorHandle(err);

  }
}
