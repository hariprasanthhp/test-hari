import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';

import { SupportRoutingModule } from './support-routing.module';
import { SupportComponent } from './support.component';
import { SupportHeaderComponent } from './support-header/support-header.component';
import { SupportFooterComponent } from './support-footer/support-footer.component';
import { HomeComponent } from './home/home.component';
import { SubscriberListComponent } from './subscriber-list/subscriber-list.component';
import { SearchListComponent } from './search-list/search-list.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgScrollbarModule } from "ngx-scrollbar";
import { SharedUtilsModule } from "../shared-utils/shared-utils.module";
import { SharedModule } from './shared/shared.module';
import { FrameComponent } from './frame/frame.component';
import { SubscribeService } from './shared/service/subscriber.service';
import { Title } from '@angular/platform-browser';
import { InsightsComponent } from './insights/insights.component';
import { EncryptionComponent } from './encryption/encryption.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [SupportComponent, SupportHeaderComponent, SupportFooterComponent, HomeComponent, SubscriberListComponent, SearchListComponent, FrameComponent, InsightsComponent, EncryptionComponent, SearchComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    NgbModule,
    SupportRoutingModule,
    HighchartsChartModule,
    NgScrollbarModule,
    SharedUtilsModule,
    SharedModule,
    ToastModule
  ],
  //singleton service
  providers: [SubscribeService, Title]
})
export class SupportModule { }
