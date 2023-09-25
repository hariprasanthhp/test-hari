import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketingHomeComponent } from './marketing-home/marketing-home.component';
// import { MarketingInsightsComponent } from './marketing-insights/marketing-insights.component';
import { MarketingSegmentsComponent } from './marketing-segments/marketing-segments.component';
import { MarketingNewCampaignsComponent } from './marketing-new-campaigns/marketing-new-campaigns.component';
import { MarketingExploreDataComponent } from './marketing-explore-data/marketing-explore-data.component';
import { MarketingComponent } from './marketing.component';
import { MarketingChannelsComponent } from './marketing-channels/marketing-channels.component';
import { MarketingSearchResultComponent } from './marketing-search-result/marketing-search-result.component';
import { AuthGuard } from '../shared/services/auth.guard';
import { InsightsLatestComponent } from './insights-latest/insights-latest.component';
import { ChannelResultsComponent } from './marketing-channels/channel-results/channel-results.component';
import { ChannelConfigurationComponent } from './marketing-channels/channel-configuration/channel-configuration.component';

import { MarketingChannelNewComponent } from './marketing-channel-new/marketing-channel-new.component';
import { MarketingChannelConfigComponent } from './marketing-channel-config/marketing-channel-config.component';
import { ChannelMobileComponent } from './marketing-channels/channel-mobile/channel-mobile.component';
import { FacebookConfigurationComponent } from './marketing-channels/facebook-configuration/facebook-configuration.component';
import { ChannelFaceComponent } from './marketing-channels/channel-face/channel-face.component';
import { HubspotConfigurationComponent } from './marketing-channels/hubspot-configuration/hubspot-configuration.component';
import { ChannelHubspotComponent } from './marketing-channels/channel-hubspot/channel-hubspot.component';
import { MarketingChannelHubspotComponent } from './marketing-channel-hubspot/marketing-channel-hubspot.component';
import { MarketingChannelConstantComponent } from './marketing-channel-constant/marketing-channel-constant.component';
import { ChannelConstantComponent } from './marketing-channels/channel-constant/channel-constant.component';
import { ConstantConfigurationComponent } from './marketing-channels/constant-configuration/constant-configuration.component';
import { NewProspectsComponent } from './marketing-explore-data/new-prospects/new-prospects.component';


const routes: Routes = [{
  path: '',
  component: MarketingComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'home', component: MarketingHomeComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    // {
    //   path: 'insights', component: MarketingInsightsComponent, data: { title: 'Calix Cloud - Engagement' }
    // },
    {
      path: 'insights', component: InsightsLatestComponent, data: { title: 'Calix Cloud - Engagement' }
    },

    {
      path: 'segments', component: MarketingSegmentsComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    
    {
      path: 'new-campaign', component: MarketingNewCampaignsComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    {
      path: 'campaign', component: MarketingNewCampaignsComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    {
      path: 'explore-data', component: MarketingExploreDataComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    {
      path: 'explore-data-advanced', component: MarketingExploreDataComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    {
      path: 'explore-data-prospects', component: NewProspectsComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    {
      path: 'channels', component: MarketingChannelsComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    {
      path: 'search-result', component: MarketingSearchResultComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    {
      path: 'channels/results', component: ChannelResultsComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    {
      path: 'channels/command', component: ChannelMobileComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    {
      path: 'channels/configuration', component: ChannelConfigurationComponent, data: { title: 'Calix Cloud - Engagement' }
    },

    {
      path: 'engagement-channel', component: MarketingChannelNewComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    {
      path: 'channels/config', component: MarketingChannelConfigComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    {
      path: 'channels/facebook', component: FacebookConfigurationComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    {
      path: 'channels/face', component: ChannelFaceComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    {
      path: 'channels/hubspot', component: HubspotConfigurationComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    {
      path: 'channels/hubspot-result', component: ChannelHubspotComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    {
      path: 'channels/hubspotconfig', component: MarketingChannelHubspotComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    {
      path: 'channels/constant', component: ConstantConfigurationComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    {
      path: 'channels/constant-result', component: ChannelConstantComponent, data: { title: 'Calix Cloud - Engagement' }
    },
    {
      path: 'channels/constantcontactconfig', component: MarketingChannelConstantComponent, data: { title: 'Calix Cloud - Engagement' }
    },

    {
      path: '', redirectTo: 'home', pathMatch: 'full', data: {
        title: 'Calix Cloud - Engagement'
      }
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule { }
