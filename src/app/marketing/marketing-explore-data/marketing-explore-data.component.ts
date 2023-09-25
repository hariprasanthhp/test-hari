import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MarketingRoutingsService } from '../shared/services/marketing-routings.service';
import { TranslateService } from 'src/app-services/translate.service';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { MarketingCommonService } from '../shared/services/marketing-common.service';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { MarketingHomeApiService } from '../marketing-home/marketing-home-Apiservice';

@Component({
  selector: 'app-marketing-explore-data',
  templateUrl: './marketing-explore-data.component.html',
  styleUrls: ['./marketing-explore-data.component.scss']
})
export class MarketingExploreDataComponent implements OnInit {
  language: any;
  languageSubject;
  active_Chart: any;
  subscribe: boolean = true
  service: boolean
  application: boolean
  Retention: boolean
  Basic: boolean
  Advanced: boolean
  Prospect: boolean
  SmartTable: boolean
  explore_chart: boolean = true
  segmentId: any
  scopes: any;
  cmcType: any
  isDev: boolean;
  isDevfunc: boolean;
  ProspectExp: boolean;
  advanceQlik: boolean;
  prosQlik: boolean;
  customTab: boolean;
  isThoughspotAvailable: boolean = false
  constructor(
    private marketingRoutingsService: MarketingRoutingsService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private titleService: Title,
    private marketingCommonService: MarketingCommonService,
    private router: Router,
    private ssoAuthService: SsoAuthService,
    private marketingHomeApiService: MarketingHomeApiService,
  ) {
    this.scopeAsssiner()
    // let base = `${environment.API_BASE}`;
    // if (base.indexOf('/dev.api.calix.ai') > -1) {
    //   this.isDev = true
    // } else {
    //   this.isDev = false
    // }

  }

  dev_func: boolean
  showThoughtspot: boolean;
  internalProd:boolean
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    if(sessionStorage.getItem('explore')== '1'){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/engagement/home']));
    }
  }
  ngOnInit(): void {
    this.isDev = `${WindowRefService.prototype.nativeWindow}`.includes('cloud-dev.calix.com') ? true : false
   this.isDevfunc = `${WindowRefService.prototype.nativeWindow}`.includes('cloud-devfunc.calix.com') ? true : false
   this.internalProd = WindowRefService.prototype.nativeWindow.includes('internal-calixcloud.calix.com') ? true : false
    let entitlement = this.ssoAuthService.getEntitlements();
    this.cmcType = entitlement['209'] ? true : false
    if(this.internalProd){
      //CHeck pro user isThoughspotAvailable true else false
      this.isThoughspotAvailable = this.cmcType == true ? true : false
      this.routeIndicator()
    }else{
     // if(this.cmcType){
        this.checkTSStatus()
      // }else{
      //   this.routeIndicator()
      // }
    }

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language["Calix Cloud"]} - ${this.language["Marketing_Cloud"]} - ${this.language["Explore_Data"]}`);
      
    });
    this.titleService.setTitle(`${this.language["Calix Cloud"]} - ${this.language["Marketing_Cloud"]} - ${this.language["Explore_Data"]}`);
  }
  routeIndicator(){
    this.route.queryParams.subscribe(params => {
      if (history.state?.value != "" && history.state?.value != undefined && (history.state?.Type == "" || history.state?.Type == undefined) && (!history.state?.Name)) {
        this.active_Chart = ((this.isThoughspotAvailable && this.cmcType) || (this.isThoughspotAvailable && !this.cmcType)) ? 'AdvanceQlik' : 'Advanced'
        this.trueFalseAssigner(this.active_Chart)
        this.segmentId = history.state.value
      } else if (history.state?.value != "" && history.state?.value != undefined && (history.state?.Type == "" || history.state?.Type == undefined ) && (history.state?.Name)) {
        this.active_Chart = this.isThoughspotAvailable ? 'ProspectQlik' : 'Prospects'
        this.trueFalseAssigner(this.active_Chart)
        this.segmentId = history.state.value
      } else {
        this.active_Chart = 'Basic'
        this.trueFalseAssigner(this.active_Chart)
        this.segmentId = ''
      }
    });
  }
  scopeAsssiner() {
    this.scopes = this.marketingCommonService.getCMCScopes();
  }
  AdvancedExp: Boolean = false;
  tab_Chart_Sec(tab_value: any) {
    this.active_Chart = tab_value
    this.trueFalseAssigner(this.active_Chart)
  }
  trueFalseAssigner(tab_value) {
    this.Basic = tab_value == 'Basic' ? true : false;
    this.Advanced = tab_value == 'Advanced' ? true : false;
    this.Prospect = tab_value == 'Prospects' ? true : false;
    this.advanceQlik = tab_value == 'AdvanceQlik' ? true : false;
    this.prosQlik = tab_value == 'ProspectQlik' ? true : false;
    this.customTab= tab_value == 'customTab' ? true : false;
    this.segmentId = ''
  }
  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }
  checkTSStatus(){
    this.marketingHomeApiService.thoughtSpotStatusCheckGET().subscribe((res: any) => {
     if(res){
     this.isThoughspotAvailable = res.thoughtspotSupported == true ? true : false
      this.routeIndicator()
     }
    },(error: any) => {
     this.isThoughspotAvailable = false
   })
   }
 
  newCampaign() {
    this.marketingRoutingsService.newCampaignPage();
  }

}
