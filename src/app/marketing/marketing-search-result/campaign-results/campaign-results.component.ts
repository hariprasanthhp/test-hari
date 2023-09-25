import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingInsightspplicationApiService } from 'src/app/shared-utils/marketing-insights/marketing-insights-application-api.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { MarketingRoutingsService } from '../../shared/services/marketing-routings.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-campaign-results',
  templateUrl: './campaign-results.component.html',
  styleUrls: ['./campaign-results.component.scss']
})
export class CampaignResultsComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  language: any;
  languageSubject: any;
  searchCampaignSubject: any
  marketingCampaignSearchTable: any;
  scopes: any
  isRerender: boolean = false;
  gridLoaded = false;
  frenchLanguage: boolean=false;
  spanishLanguage: boolean=false;
  germanLanguage: boolean=false;
  totalCountHits: any;
  searchName: any;
  totValData = 'withData';
  _totalCounts : any;
  @Input()
  set totalCounts(value: any) {
    this._totalCounts = value;
  }
  constructor(
    private marketingRoutingsService: MarketingRoutingsService,
    private translateService: TranslateService,
    private marketingInsightApplicationApiService: MarketingInsightspplicationApiService,
    private marketingCommonService: MarketingCommonService,
    private titleService: Title
  ) {
    this.scopeAsssiner();
    this.searchName=history?.state?.value;
    if(this.searchName){
      this.getTotalFilteredEntries()
    }
  }

  ngOnInit(): void {
    // this.titleService.setTitle('Search result - Campaigns - Marketing - Calix Cloud');

    this.getCampaignListApiLoader()
    this.language = this.translateService.defualtLanguage;
    this.tableLanguageOptions()
   
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language["subscribers"]}-${this.language["Campaigns"]}-${this.language["Search Results"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
      this.tableLanguageOptions()
      // if(this.searchName){
      //   this.getTotalFilteredEntries()
      // }
    });
    this.titleService.setTitle(`${this.language["subscribers"]}-${this.language["Campaigns"]}-${this.language["Search Results"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
  }
  scopeAsssiner() {
    this.scopes = this.marketingCommonService.getCMCScopes();
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
      this.tableDestroyOnly()
    }
  }
  getCampaignListApiLoader() {
    const that=this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: false,
      processing: false,
      pageLength: 10,
      lengthChange: false,
      ordering: false,
      searching: false,
      initComplete:()=>{
        this.gridLoaded = true;
      },
      infoCallback: function (settings, start, end, max, total, pre) {
        that.totalCountHits = that._totalCounts.totalCounts;
        // sessionStorage.removeItem('totalhit');
        if (that.frenchLanguage) {
          return `Affichage de ${max==0?0:start} à ${end} des ${max>10000? that.language.first : ''} ${total} entrées ${(that.searchName)?`(filtrées à partir des ${that.totalCountHits} entrées totales)`:""}`
        }
        else if (that.spanishLanguage) {
          return `Se muestran del ${max==0?0:start} al ${end} de ${max>10000 ? that.language.first : ''} ${total} resultados ${(that.searchName)?`(filtrado de un total de ${that.totalCountHits} entradas)`:""}`
        }
        else if (that.germanLanguage) {
          return `Angezeigt ${max==0?0:start} bis ${end} von ${max>10000 ? that.language.first : ''} ${total} ergebnissen ${(that.searchName)?`(gefiltert aus ${that.totalCountHits} Einträgen)`:""}`
        } else {
          return `Showing ${max==0?0:start} to ${end} of ${max>10000 ? that.language.first : ''} ${total} entries ${(that.searchName)?`(filtered from ${that.totalCountHits} total entries)`:""}`
        }
      },
      
    };
    this.searchCampaignSubject = this.marketingInsightApplicationApiService.campaignSearchResults.subscribe((res: any) => {
      this.gridLoaded = false;
      this.marketingCampaignSearchTable = res;
      this.dtTrigger.next();
      this.isRerender = true
      if(res && res.length>0){
        this.marketingCampaignSearchTable = res;
      }
      else{
        this.marketingCampaignSearchTable = [];
      }

    },(error)=>{
      this.marketingCampaignSearchTable = [];
    })
  }
  tableDestroyOnly() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    })
  }
  selectCampaign(data) {
    if (this.scopes.campaignRead) {
      let datas = data.campaignType == 'Triggered' ? sessionStorage.setItem('triggered','new'): sessionStorage.removeItem('triggered')
      let fromData = data.status == this.language.Active ? sessionStorage.setItem('StatusAct','Active'): sessionStorage.removeItem('StatusAct')
      this.marketingInsightApplicationApiService.setResultsActiveTab('campaigns')
      this.marketingRoutingsService.newCampaignPageEdit(data.campaignId)
    }
  }
  ngOnDestroy() {
    //sessionStorage.removeItem("totalhit")
    if (this.languageSubject) {
      this.languageSubject.unsubscribe()
    }
    if (this.searchCampaignSubject) {
      this.searchCampaignSubject.unsubscribe()
    }
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe()
    }
  }

  //57323 filter from total entries
  getTotalFilteredEntries(){
    this.language = this.translateService.defualtLanguage;
    let lang = this.language.fileLanguage == 'fr' ? 2 : this.language.fileLanguage == 'es' ? 3 : this.language.fileLanguage == 'de_DE' ? 4 : 1;
    // this.totValData = '';
    // sessionStorage.setItem('totalhitStr',this.totValData)
    this.searchCampaignSubject = this.marketingInsightApplicationApiService.SearchCampaign("",lang).subscribe((res: any) => {
      this._totalCounts.totalCounts = res.length;
      this._totalCounts.totalCountsChecked = true;
      // sessionStorage.setItem('totalhit',res.length)
      // this.totValData = 'withData';
      // sessionStorage.setItem('totalhitStr',this.totValData)
    },(error)=>{

    })
   
   }
}
