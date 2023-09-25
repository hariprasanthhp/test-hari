import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { MarketingRoutingsService } from '../shared/services/marketing-routings.service';
import { TranslateService } from 'src/app-services/translate.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, RoutesRecognized, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { environment } from 'src/environments/environment';
import { MarketingCommonService } from '../shared/services/marketing-common.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { pairwise, filter } from 'rxjs/operators';
import { MarketingInsightspplicationApiService } from 'src/app/shared-utils/marketing-insights/marketing-insights-application-api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-marketing-search-result',
  templateUrl: './marketing-search-result.component.html',
  styleUrls: ['./marketing-search-result.component.scss']
})
export class MarketingSearchResultComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  showDataTable = false;
  searchResult: any
  activeTabObject: any;
  subscribers: boolean = true
  segment: boolean = false
  campaigns: boolean = false
  language: any;
  languageSubject;
  subscriberSubject: any
  searchCampaignSubject: any
  marketingSubscriberSearchTable: any;
  marketingCampaignSearchTable: any;
  marketingSubscriberSearchTableShow: boolean = false;
  searchName: any
  is_subscriber: boolean = false;
  is_segment: boolean = false;
  count: any;
  subscriberCount: any
  showExcessError: boolean = false
  campaignCount: any;
  public baseURL = environment.cmcBaseURL;
  marketingCampaignSearchTableError: boolean = false
  marketingSubscriberSearchTableError: boolean = false
  scopes: any
  search: any
  filterCount: number
  showFilterCount: boolean = false;
  activeTab: any = 'subscribers';
  isRerender = false;
  loader: boolean = false;
  loaderCampaign: boolean = true;
  dtPageNo: any;
  alertMessage:any
  alertError: boolean = true;
  frenchLanguage: boolean=false;
  spanishLanguage: boolean=false;
  germanLanguage: boolean=false;
  totalCountHits: any;
  campaignListError: boolean=false;
  campaignListErrorMsg: any;
  campaignRes = {
    totalCounts: 0,
    totalCountsChecked : false
  };
  constructor(
    private marketingRoutingsService: MarketingRoutingsService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private marketingInsightApplicationApiService: MarketingInsightspplicationApiService,
    private marketingCommonService: MarketingCommonService,
    private http: HttpClient,
    private titleService: Title,
    private ssoAuthService: SsoAuthService,
    private router: Router
  ) {
    this.search = `${environment.SUPPORT_URL}/subscriber-search?`;
    this.scopeAsssiner();
    this.activeTabObject = this.marketingInsightApplicationApiService.getResultsActiveTab();
    if (this.activeTabObject.subscribers) {
      this.activeTab = 'subscribers'
      this.marketingSubscriberSearchTableShow = true;
      this.showExcessError = this.dtPageNo >= 999 ? true : false
    } else {
      this.activeTab = 'campaigns'
      this.marketingSubscriberSearchTableShow = true;
      this.showExcessError = false
    }
    this.route.queryParams.subscribe(params => {
      if (history.state?.value) {
        this.searchResult = history.state?.value.trim();
      } else {
        this.searchResult = history.state?.value;
      }
      this.searchName = history.state?.value || ""
    });

    if(this.searchName){
    this.getTotalCountHits()
    }
  }

  ngOnInit(): void {

    
    this.marketingSubscriberSearchTableShow = true;
    //this.activeTab = sessionStorage.getItem('activeTab') ? sessionStorage.getItem('activeTab') : this.activeTab;     
   
    this.language = this.translateService.defualtLanguage;
    this.getSubscriberListApiLoader()
    this.tableLanguageOptions()
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      
      this.titleService.setTitle(`${this.language["subscribers"]}-${this.language["Campaigns"]}-${this.language["Search Results"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
      this.tableLanguageOptions()
      this.updateTableView();
    });
    this.titleService.setTitle(`${this.language["subscribers"]}-${this.language["Campaigns"]}-${this.language["Search Results"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
    this.getCampaignListApiLoader()
  }
  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.translateService.fr;
      this.frenchLanguage=true;
    } else if (this.language.fileLanguage == 'en') {
      delete this.dtOptions.language;
    }
    else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
      this.germanLanguage=true;
    }
    else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.translateService.es;
      this.spanishLanguage=true;
    }
    if (this.isRerender) {
      this.redraw();
    }
  }
  redraw() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  scopeAsssiner() {
    this.scopes = this.marketingCommonService.getCMCScopes();
  }

  setSession() {
    if (this.activeTab !== 'subscribers') {
      let activeTab = sessionStorage.getItem('activeTab');
      if (!activeTab) sessionStorage.setItem('activeTab', this.activeTab);
    } else {
      sessionStorage.clear();
    }
  }

  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.searchCampaignSubject) {
      this.searchCampaignSubject.unsubscribe();
    }

  }

  updateTableView() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
  getSubscriberListApiLoader() {
    this.loader = true;
    if (this.scopes.subscriberRead) {
      this.marketingSubscriberSearchTableShow = true;
      const that = this;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing: false,
        ordering: false,
        dom: "tip",
        responsive: true,
        paging: true,
        ajax: (dataTablesParameters: any, callback) => {
          this.showExcessError = false
          let pageNo = null;
          if (dataTablesParameters.start == 0) {
            pageNo = 0;
          } else {
            if ((dataTablesParameters.start / dataTablesParameters.length) >= 999) {
              pageNo = 999;
              this.showExcessError = true
            } else {
              pageNo = dataTablesParameters.start / dataTablesParameters.length;
              this.showExcessError = false
            }

          }

          const params = new HttpParams()
            .set("pageNumber", pageNo + 1)
            .set("pageSize", dataTablesParameters.length)
            .set("filter", this.searchResult || "")
          that.http.get(this.search, { params }).subscribe((resp: any) => {
            this.count = resp.metadata.totalHits;
            that.marketingSubscriberSearchTable = [];
            this.loader = false;
            this.campaignListError = false
            this.dtPageNo = pageNo;
            // this.tableLanguageOptions();
            if (this.count > 0) {
              this.marketingSubscriberSearchTableShow = true
              this.marketingSubscriberSearchTableError = false
              that.marketingSubscriberSearchTable = resp.records
              this.subscriberCount = that.marketingSubscriberSearchTable.length;
              this.isRerender = true
            } else {
              this.marketingSubscriberSearchTableShow = false
              this.marketingSubscriberSearchTableError = true
              that.marketingSubscriberSearchTable = []
            }
            callback({
              recordsTotal: this.count,
              recordsFiltered: (this.filterCount != undefined) ? this.filterCount : that.count > 10000 ? 10000 : that.count,
              data: [],
            });
          }, (error: any) => {
            this.loader = false;
            this.campaignListError = true
            this.campaignListErrorMsg = this.marketingCommonService.errorHandling(error);
            this.marketingSubscriberSearchTableShow = false
              this.marketingSubscriberSearchTableError = true
              that.marketingSubscriberSearchTable = []
           
          })
        },
        drawCallback: function (settings) {
          $('.dataTables_empty').css('display', 'none');
        },
        //CCL-57323 
        infoCallback: function (settings, start, end, max, total, pre) {
          console.log(max, total,that.searchName?max!=0:max>10000,that.searchName?max==0:max>10000)
          if (that.frenchLanguage) {
            return `Affichage de ${max==0?0:start} à ${end} des ${max>10000? that.language.first : ''} ${total} entrées ${(that.searchName?max!=0:max>10000)?`(filtrées à partir des ${that.searchName?that.totalCountHits:max} entrées totales)`:(that.searchName?max==0:max>10000)?`(filtrées à partir des ${that.searchName?that.totalCountHits:max} entrées totales)`:""}`
          }
          else if (that.spanishLanguage) {
            return `Se muestran del ${max==0?0:start} al ${end} de ${max>10000 ? that.language.first : ''} ${total} resultados ${(that.searchName?max!=0:max>10000)?`(filtrado de un total de ${that.searchName?that.totalCountHits:max} entradas)`:(that.searchName?max==0:max>10000)?`(filtrado de un total de ${that.searchName?that.totalCountHits:max} entradas)`:""}`
          }
          else if (that.germanLanguage) {
            return `Angezeigt ${max==0?0:start} bis ${end} von ${max>10000 ? that.language.first : ''} ${total} ergebnissen ${(that.searchName?max!=0:max>10000)?`(gefiltert aus ${that.searchName?that.totalCountHits:max} Einträgen)`:(that.searchName?max==0:max>10000)?`(gefiltert aus ${that.searchName?that.totalCountHits:max} Einträgen)`:""}`
          } else {
          
            return `Showing ${max==0?0:start} to ${end} of ${max>10000 ? that.language.first : ''} ${total} entries ${(that.searchName?max!=0:max>10000)?`(filtered from ${that.searchName?that.totalCountHits:max} total entries)`:(that.searchName?max==0:max>10000)?`(filtered from ${that.searchName?that.totalCountHits:max} total entries)`:""}`
          }
        },

      };
      // this.tableLanguageOptions();
    }

  }

  getCampaignListApiLoader() {
    this.loaderCampaign = true;
    if (this.scopes.campaignRead) {
      let lang = this.language.fileLanguage == 'fr' ? 2 : this.language.fileLanguage == 'es' ? 3 : this.language.fileLanguage == 'de_DE' ? 4 : 1
      this.searchCampaignSubject = this.marketingInsightApplicationApiService.SearchCampaign(this.searchResult || "",lang).subscribe((res: any) => {
        this.marketingCampaignSearchTable = []
        this.loaderCampaign = false;
        this.alertError = false
        if (res) {
          this.marketingCampaignSearchTable = res
          this.campaignCount = this.marketingCampaignSearchTable.length
          if(!this.campaignRes.totalCountsChecked) {
            this.campaignRes.totalCounts = res.length;
          }
          // var totalValue = sessionStorage.getItem('totalhitStr');
          // if(totalValue == '') {
          //   sessionStorage.setItem('totalhit', res.length)
          // }
          // sessionStorage.setItem('totalhitStr', '');
        }
        else {
          this.campaignCount = 0;
        }
        this.marketingInsightApplicationApiService.setCampaignSearchResults(this.marketingCampaignSearchTable)
      },
        (error: any) => {
          this.campaignCount = 0;
          this.loaderCampaign = false;
          this.alertMessage = this.marketingCommonService.errorHandling(error);
          console.log(this.alertMessage)
          this.alertError = true
        });

    }
  }
  errorReset(){
    this.alertError = false
    this.campaignListError= false
  }
  tab_Recom_Seg_Camp(tabName) {
    this.activeTab = tabName
    this.subscribers = tabName == 'subscribers' ? true : false;
    this.campaigns = tabName == 'campaigns' ? true : false;
    if (this.campaigns) {
      this.campaignListError= false
      this.showExcessError = false
      if (this.campaignCount == 0) {
        this.marketingCampaignSearchTableError = true
        this.marketingSubscriberSearchTableError = false
      } else {
        this.marketingCampaignSearchTableError = false
        this.marketingSubscriberSearchTableError = false
      }
    }
    if (this.subscribers) { 
      this.showExcessError = this.dtPageNo >= 999 ? true : false
      if (this.count > 0) {
        this.campaignListError= false
        this.marketingSubscriberSearchTableShow = true
        this.marketingCampaignSearchTableError = false
      } else {
        // this.campaignListError= true
        this.marketingSubscriberSearchTableShow = false
        this.marketingSubscriberSearchTableError = true
        this.marketingCampaignSearchTableError = false
      }
    }
    this.setSession();
  }
  subscriberInsights(id) {
    if (this.scopes.subscriberRead) {
      this.marketingInsightApplicationApiService.setResultsActiveTab('subscribers')
      if (this.searchName != "" && this.searchName != undefined) {
        this.marketingRoutingsService.insightsPage(id, this.searchName);
      } else {
        this.marketingRoutingsService.insightsPage(id, " ");
      }
    }
  }
  //57323 filter from total entries
  getTotalCountHits(){
    const params = new HttpParams()
             .set("pageNumber",  1)
             .set("pageSize", 10)
             .set("filter", "")
           this.http.get(this.search, { params }).subscribe((resp: any) => {
             this.totalCountHits=resp.metadata.totalHits?resp.metadata.totalHits:0;
           },(error)=>{
           })
   }

}