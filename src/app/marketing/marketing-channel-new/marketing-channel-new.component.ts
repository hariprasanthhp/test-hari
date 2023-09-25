import { Component, OnInit } from '@angular/core';
import { MarketingRoutingsService } from '../shared/services/marketing-routings.service';
import { TranslateService } from 'src/app-services/translate.service';
import { ActivatedRoute } from '@angular/router';
import { MarketingCommonService } from '../shared/services/marketing-common.service';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-marketing-channel-new',
  templateUrl: './marketing-channel-new.component.html',
  styleUrls: ['./marketing-channel-new.component.scss']
})
export class MarketingChannelNewComponent implements OnInit {
  language: any;
  languageSubject;
  active_Chart: any = 'campaign';
  campaign: boolean = true
  channel: boolean
  segmentId: any
  scopes: any;
  hasScope: boolean = false
  salesUser: any;
  triggeredCampaigns
  constructor(
    private marketingRoutingsService: MarketingRoutingsService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private titleService: Title,
    private marketingCommonService: MarketingCommonService,
    private modalService:NgbModal
  ) {
    this.scopeAsssiner()
  }
  scopeAsssiner() {
    this.scopes = this.marketingCommonService.getCMCScopes();
  }
  ngOnInit(): void {
    this.titleService.setTitle('Calix Cloud - Marketing - Marketing channel-Campaigns');

    if ((this.scopes.campaignRead && this.scopes.campaignWrite)) {
      this.hasScope = true
    } else if ((!this.scopes.campaignRead && this.scopes.campaignWrite)) {
      this.hasScope = true
    } else {
      this.hasScope = false
    }
    this.salesUser = localStorage.getItem('salesuser')
    this.route.queryParams.subscribe(params => {
      if (history.state?.value != "" && history.state?.value != undefined) {
        this.active_Chart = 'channel'
        this.campaign = false
        this.channel = true
      this.triggeredCampaigns = false;
      } else {
       
        if(sessionStorage.getItem('triggered')){
          this.active_Chart = 'triggeredCampaigns'
          this.campaign = false
          this.channel = false
        this.triggeredCampaigns = true;
        }else{
        this.active_Chart = 'campaign'
        this.campaign = true
        this.channel = false
      this.triggeredCampaigns = false;
        }

      }
      this.tab_Chart_Sec(this.active_Chart)
    });
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  tab_Chart_Sec(tab_value: any) {
    this.active_Chart = tab_value
  
      this.campaign = tab_value == 'campaign' ? true : false
      this.channel =  tab_value == 'channel' ? true : false
      this.triggeredCampaigns =  tab_value == 'triggeredCampaigns' ? true : false
 
  }

  electronicLink(){
    window.open(`https://calix.force.com/idp/login?app=0sp4u0000008OKk`);
  }
  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }
  newCampaign(from) {
    sessionStorage.setItem('camp_filter_change', 'new')
    if(from == 1){
    sessionStorage.removeItem('triggered')
    }else{
     sessionStorage.setItem('triggered','new')
    }
    this.marketingRoutingsService.newCampaignPage();
  }
  triggerCampaignModal(modal){
    this.modalService.open(modal, {windowClass: 'custom-modal default-modal-ui' });
  }
}