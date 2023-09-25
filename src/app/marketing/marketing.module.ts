import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgScrollbarModule } from "ngx-scrollbar";
import { HighchartsChartModule } from 'highcharts-angular';
import { ToastModule } from 'primeng/toast';

import { MarketingRoutingModule } from './marketing-routing.module';
import { MarketingComponent } from './marketing.component';
import { MarketingHeaderComponent } from './component/marketing-header/marketing-header.component';
import { MarketingFooterComponent } from './component/marketing-footer/marketing-footer.component';
// import { MarketingInsightsComponent } from './marketing-insights/marketing-insights.component';
import { MarketingHomeComponent } from './marketing-home/marketing-home.component';
import { MarketingSegmentsComponent } from './marketing-segments/marketing-segments.component';
import { MarketingNewCampaignsComponent } from './marketing-new-campaigns/marketing-new-campaigns.component';
import { MarketingExploreDataComponent } from './marketing-explore-data/marketing-explore-data.component';
import { MarketingChannelsComponent } from './marketing-channels/marketing-channels.component';
// import { MarketingCampaignsDefineComponent, SortByPipe } from './marketing-new-campaigns/marketing-campaigns-define/marketing-campaigns-define.component';
// import { FilterPipe, MarketingCampaignsDefineComponent } from './marketing-new-campaigns/marketing-campaigns-define/marketing-campaigns-define.component';
import { MarketingCampaignsDefineComponent } from './marketing-new-campaigns/marketing-campaigns-define/marketing-campaigns-define.component';

// import {MarketingCampaignsDefineComponent } from './marketing-new-campaigns/marketing-campaigns-define/marketing-campaigns-define.component';
import { MarketingCampaignsChannelComponent } from './marketing-new-campaigns/marketing-campaigns-channel/marketing-campaigns-channel.component';
import { MarketingCampaignsDeployComponent } from './marketing-new-campaigns/marketing-campaigns-deploy/marketing-campaigns-deploy.component';
import { MarketingCampaignsResultComponent } from './marketing-new-campaigns/marketing-campaigns-result/marketing-campaigns-result.component';
import { SharedUtilsModule } from "../shared-utils/shared-utils.module";
import { MarketingSearchResultComponent } from './marketing-search-result/marketing-search-result.component';
import { MarketingSubscribChartComponent } from './marketing-explore-data/basic/marketing-subscrib-chart/marketing-subscrib-chart.component';
import { MarketingServiceChartComponent } from './marketing-explore-data/basic/marketing-service-chart/marketing-service-chart.component';
import { MarketingApplicationChartComponent } from './marketing-explore-data/basic/marketing-application-chart/marketing-application-chart.component';
import { MarketingRetentionChartComponent } from './marketing-explore-data/basic/marketing-retention-chart/marketing-retention-chart.component';
import { MarketingAdvancedComponent } from './marketing-explore-data/advanced/marketing-advanced/marketing-advanced.component';
import { MarketingBasicComponent } from './marketing-explore-data/basic/marketing-basic.component';
import { MarketingAcquisitionChartComponent } from './marketing-explore-data/basic/marketing-acquisition-chart/marketing-acquisition-chart.component';
import { MarketingCampaignsSummaryComponent } from './marketing-new-campaigns/marketing-campaigns-summary/marketing-campaigns-summary.component';
import { MarketingCampaignsMapComponent } from './marketing-new-campaigns/marketing-campaigns-map/marketing-campaigns-map.component';
import { MarketingCampaignsDatasetComponent } from './marketing-new-campaigns/marketing-campaigns-dataset/marketing-campaigns-dataset.component';
import { CalendarModule } from 'primeng/calendar';
import { Title } from '@angular/platform-browser';
import { HighlightMarketingSearch } from './shared/constants/highlight.pipemarket';
import { InsightsLatestComponent } from './insights-latest/insights-latest.component';
import { RecommededSegmentsComponent } from './marketing-segments/recommeded-segments/recommeded-segments.component';
import { CampaignResultsComponent } from './marketing-search-result/campaign-results/campaign-results.component';

import { ChannelResultsComponent } from './marketing-channels/channel-results/channel-results.component';
import { ChannelConfigurationComponent } from './marketing-channels/channel-configuration/channel-configuration.component';

import { MarketingChannelNewComponent } from './marketing-channel-new/marketing-channel-new.component';
import { CampaignchannelComponent } from './marketing-channel-new/campaignchannel/campaignchannel.component';
import { MarketingchannelComponent } from './marketing-channel-new/marketingchannel/marketingchannel.component';
import { MarketingChannelConfigComponent } from './marketing-channel-config/marketing-channel-config.component';
import { ChannelMobileComponent } from './marketing-channels/channel-mobile/channel-mobile.component';
import { MarketingRevenueComponent } from './marketing-new-campaigns/marketing-revenue/marketing-revenue.component';
import { MarketingTotalsubscriberComponent } from './marketing-new-campaigns/marketing-totalsubscriber/marketing-totalsubscriber.component';
import { FacebookConfigurationComponent } from './marketing-channels/facebook-configuration/facebook-configuration.component';
import { ChannelFaceComponent } from './marketing-channels/channel-face/channel-face.component';
import { MarketingDeviceChartComponent } from './marketing-explore-data/basic/marketing-device-chart/marketing-device-chart.component';
import { HubspotConfigurationComponent } from './marketing-channels/hubspot-configuration/hubspot-configuration.component';
import { ChannelHubspotComponent } from './marketing-channels/channel-hubspot/channel-hubspot.component';
import { ChannelConstantComponent } from './marketing-channels/channel-constant/channel-constant.component';
import { ConstantConfigurationComponent } from './marketing-channels/constant-configuration/constant-configuration.component';
import { MarketingChannelConstantComponent } from './marketing-channel-constant/marketing-channel-constant.component';
import { AdvanceExplorerProComponent } from './marketing-explore-data/advance-explorer-pro/advance-explorer-pro.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NewProspectsComponent } from './marketing-explore-data/new-prospects/new-prospects.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { AdvanceExplorerQlikComponent } from './marketing-explore-data/advance-explorer-qlik/advance-explorer-qlik.component';
import { MarketingTriggeredComponent } from './marketing-new-campaigns/marketing-triggered/marketing-triggered.component';
import { MarketingSnapshotComponent } from './marketing-new-campaigns/marketing-snapshot/marketing-snapshot.component';
import { MarketingCampaignTSComponent } from './marketing-new-campaigns/marketing-campaign-ts/marketing-campaign-ts.component';
import { ScheduledCampaignsComponent } from './marketing-channel-new/scheduled-campaigns/scheduled-campaigns.component';
import { TriggeredCampaignsComponent } from './marketing-channel-new/triggered-campaigns/triggered-campaigns.component';
import { MarketingAudienceHistoryComponent } from './marketing-new-campaigns/marketing-audience-history/marketing-audience-history.component';
import { MarketingCampaignMetricsComponent } from './marketing-new-campaigns/marketing-campaign-metrics/marketing-campaign-metrics.component';
import { MarketingCustomtabComponent } from './marketing-explore-data/marketing-custom-tab/marketing-customtab/marketing-customtab.component';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';

@NgModule({
  declarations: [
    // MarketingInsightsComponent
    MarketingComponent, MarketingHeaderComponent,
    MarketingFooterComponent,
    MarketingHomeComponent, MarketingSegmentsComponent, MarketingNewCampaignsComponent,
    MarketingExploreDataComponent, MarketingChannelsComponent,
    MarketingCampaignsDefineComponent, MarketingCampaignsChannelComponent,
    MarketingCampaignsDeployComponent, MarketingCampaignsResultComponent,
    MarketingSearchResultComponent,
    MarketingSubscribChartComponent, MarketingServiceChartComponent, HighlightMarketingSearch,
    MarketingApplicationChartComponent, MarketingRetentionChartComponent, MarketingBasicComponent, MarketingAdvancedComponent, MarketingAcquisitionChartComponent,
    MarketingCampaignsSummaryComponent, MarketingCampaignsMapComponent, MarketingCampaignsDatasetComponent, InsightsLatestComponent, RecommededSegmentsComponent, CampaignResultsComponent, ChannelResultsComponent, ChannelConfigurationComponent, MarketingChannelNewComponent, CampaignchannelComponent, MarketingchannelComponent,
    MarketingChannelConfigComponent,
    ChannelMobileComponent,
    MarketingRevenueComponent,
    MarketingTotalsubscriberComponent,
    // SortByPipe
    // FilterPipe
    FacebookConfigurationComponent,
    ChannelFaceComponent,
    FacebookConfigurationComponent,
    MarketingDeviceChartComponent,
    HubspotConfigurationComponent,
    ChannelHubspotComponent,
    ChannelConstantComponent,
    ConstantConfigurationComponent,
    MarketingChannelConstantComponent,
    AdvanceExplorerProComponent,
    NewProspectsComponent,
    AdvanceExplorerQlikComponent,
    MarketingTriggeredComponent,
    MarketingSnapshotComponent,
    MarketingCampaignTSComponent,
    ScheduledCampaignsComponent,
    TriggeredCampaignsComponent,
    MarketingAudienceHistoryComponent,
    MarketingCampaignMetricsComponent,
    MarketingCustomtabComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    DataTablesModule,
    MarketingRoutingModule,
    NgSelectModule,
    NgScrollbarModule,
    SharedUtilsModule,
    NgbDropdownModule,
    HighchartsChartModule,
    CalendarModule,
    ToastModule,
    SharedModule,
    MultiSelectModule,
    TreeModule,TreeTableModule,

  ],
  exports: [HighlightMarketingSearch],
  providers: [Title],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MarketingModule { }
