import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MarketingRoutingsService } from '../../shared/services/marketing-routings.service';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingHeaderApiService } from './marketing-headerApi.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { MarketingInsightspplicationApiService } from 'src/app/shared-utils/marketing-insights/marketing-insights-application-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-marketing-header',
  templateUrl: './marketing-header.component.html',
  styleUrls: ['./marketing-header.component.scss']
})
export class MarketingHeaderComponent implements OnInit {
  searchText: any;
  searchEnable: boolean = false;
  language: any;
  languageSubject: any;
  searchSubject: any
  searchCampaignSubject: any
  marketingSearchTable = []
  marketingCampaignSearchTable = []
  exploreDataAccess: boolean = false;
  campaignAccess: boolean = false;
  subscriberDataAvailable: boolean = false
  campaignDataAvailable: boolean = false
  scopes: any;
  isSearch = false;
  activeTab = 'home';
  searchTimeOut: NodeJS.Timeout;
  searchCampaignTimeOut: NodeJS.Timeout;

  constructor(
    private marketingRoutingsService: MarketingRoutingsService,
    private translateService: TranslateService,
    private marketingInsightApplicationApiService: MarketingInsightspplicationApiService,
    private marketingHeaderApiService: MarketingHeaderApiService,
    private changeDetect: ChangeDetectorRef,
    private marketingCommonService: MarketingCommonService,
    public router: Router
  ) {
    this.scopeAsssiner()
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.router.events.subscribe(route => {
      console.log(this.router.url)
    })
    setTimeout(() => this.isSearch = true, 600);
  }
  scopeAsssiner() {
    this.scopes = this.marketingCommonService.getCMCScopes();
  }

  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.searchSubject) {
      this.searchSubject.unsubscribe();
    }
    if (this.searchCampaignSubject) {
      this.searchCampaignSubject.unsubscribe();
    }
  }


  subscriberInsights(id) {
    if (this.scopes.subscriberRead) {
      this.marketingHeaderApiService.setSearchName(this.searchText)
      this.marketingHeaderApiService.setsubscriberId(id)
      this.marketingCommonService.setSubscriberID(id);
      this.marketingRoutingsService.insightsPage(id, this.searchText);
      this.searchEnable = false
    }
  }
  selectCampaign(data) {
    let datas = data.campaignType == 'Triggered' ? sessionStorage.setItem('triggered','new'): sessionStorage.removeItem('triggered')
    let fromData = data.status == this.language.Active ? sessionStorage.setItem('StatusAct','Active'): sessionStorage.removeItem('StatusAct')
    this.marketingRoutingsService.newCampaignPageEdit(data.campaignId)
  }
  CampaignLoad() {
    this.marketingRoutingsService.campaignsPage()
  }
  search(event) {
    this.searchText = event;
    // this.marketingHeaderApiService.setSearchName(event);
    if (this.searchText && this.searchText.length > 1) {
      this.marketingSearchTable = [];
      this.marketingCampaignSearchTable = [];
      // if (this.searchSubject) this.searchSubject.unsubscribe();
      // if (this.searchCampaignSubject) this.searchCampaignSubject.unsubscribe();
      if (this.scopes.subscriberRead) {
        clearTimeout(this.searchTimeOut);
        this.searchTimeOut = setTimeout(() => {
          if (this.searchText && this.searchText.length > 1) {
            this.searchSubject = this.marketingInsightApplicationApiService.Search(this.searchText).subscribe((res: any) => {
              if (res) {
                if (res.records.length > 0) {
                  this.subscriberDataAvailable = true
                  this.marketingSearchTable = res.records
                } else {
                  this.subscriberDataAvailable = false
                }
                this.changeDetect.detectChanges();
              }
            })
          }
        }, 500)
      };


      if (this.scopes.campaignRead) {
        clearTimeout(this.searchCampaignTimeOut);
        this.searchCampaignTimeOut = setTimeout(() => {
          if (this.searchText && this.searchText.length > 0) {
            let lang = this.language.fileLanguage == 'fr' ? 2 : this.language.fileLanguage == 'es' ? 3 : this.language.fileLanguage == 'de_DE' ? 4 : 1
            this.searchCampaignSubject = this.marketingInsightApplicationApiService.SearchCampaign(this.searchText,lang).subscribe((res: any) => {
              if (Array.isArray(res)) {
                this.campaignDataAvailable = true
                this.marketingCampaignSearchTable = res
              } else {
                this.campaignDataAvailable = false
              }
              this.changeDetect.detectChanges();
            },
              (error: any) => {
                this.campaignDataAvailable = false
              })
          }
        }, 500);

      }

      this.searchEnable = true
      $('.search-dropdown1').show()
    } else {
      this.searchEnable = false
      $('.search-dropdown1').hide()
    }

  }
  hideSearchDropDown() {
    setTimeout(() => {
      $('.search-dropdown1').hide()
    }, 230);
  }
  searchResults() {

    // if (this.searchText) {
    //  this.searchText = this.searchText || ""
    if (this.scopes.subscriberRead) {
      this.marketingInsightApplicationApiService.setResultsActiveTab('subscribers')
      this.marketingHeaderApiService.setSearchName(this.searchText || '');

      this.marketingRoutingsService.searchResultsPage(this.searchText || "");
      // }
    }
  }

  clearRedirectValue(menu:any){
    menu == 'explore' ? sessionStorage.setItem('explore','1') : sessionStorage.setItem('explore','0')
}
setActiveTab(menu: string) {
this.activeTab = menu;
if(menu == 'home'){
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
  this.router.navigate(['/engagement/home']));
  this.clearRedirectValue(menu)
}else if(menu == 'explore'){
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
  this.router.navigate(['/engagement/explore-data']));
  this.clearRedirectValue(menu)
}else if(menu == 'segment'){
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
  this.router.navigate(['/engagement/segments']));
  this.clearRedirectValue(menu)
}else{
  sessionStorage.removeItem('triggered')
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
  this.router.navigate(['/engagement/engagement-channel']));
  this.clearRedirectValue(menu)
}

}

  get getActiveTab(): string {
    if (this.router.url.includes('/engagement/home')) {
      this.activeTab = 'home';
    }
    else if (this.router.url.includes('/engagement/explore-data')) {
      this.activeTab = 'explore';
    }
    else if (this.router.url.includes('/engagement/segments')) {
      this.activeTab = 'segment';
    }
    else if (
      [
        '/engagement/engagement-channel',
        '/engagement/campaign',
        '/engagement/new-campaign',
        '/engagement/channels/command',
        '/engagement/channels/results',
        '/engagement/channels/face',
        '/engagement/channels/hubspot-result',
        '/engagement/channels/constant-result',
        '/engagement/channels/configuration',
        '/engagement/channels/facebook',
        '/engagement/channels/hubspot',
        '/engagement/channels/constant'
      ].some(u => this.router.url.includes(u))) {
      this.activeTab = 'campaign';
    }

    return this.activeTab;
  }

}