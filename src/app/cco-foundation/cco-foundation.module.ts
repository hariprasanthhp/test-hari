import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcoFoundationComponent } from './cco-foundation.component';
import { CcoFoundationRoutingModule } from './cco-foundation-routing.module';
import { FoundationFooterComponent } from './foundation-footer/foundation-footer.component';
import { FoundationHeaderComponent } from './foundation-header/foundation-header.component';
import { SharedUtilsModule } from '../shared-utils/shared-utils.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FoundationHomeComponent } from './foundation-home/foundation-home.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SystemServiceTrendsModule } from '../cco/cco-home/system-service-trends/system-service-trends.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../support/shared/shared.module';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SystemStatusComponent } from './foundation-home/system-status/system-status.component';
import { SystemsByTypeComponent } from './foundation-home/systems-by-type/systems-by-type.component';
import { SubscribersSystemModelComponent } from './foundation-home/subscribers-system-model/subscribers-system-model.component';
import { RevenueEdgeSuitsComponent } from './foundation-home/revenue-edge-suits/revenue-edge-suits.component';
import { CommandIqStatusComponent } from './foundation-home/command-iq-status/command-iq-status.component';
import { SubscribersSystemsListComponent } from './subscribers-systems-list/subscribers-systems-list.component';
import { MycommunityIQComponent } from './foundation-home/mycommunity-iq/mycommunity-iq.component';
import { RevenueEdgeIQsuitesComponent } from './foundation-home/revenue-edge-iqsuites/revenue-edge-iqsuites.component';
import { RevenueEDGEEcosystemComponent } from './foundation-home/revenue-edge-ecosystem/revenue-edge-ecosystem.component';
import { SharedModule as Shared } from 'src/app/shared/shared.module';
// import { SoftwareImagesListComponent } from "../../../src/app/support/netops-management/operations/software-images-list/software-images-list.component"

const HOME = [SystemStatusComponent, SystemsByTypeComponent, SubscribersSystemModelComponent, RevenueEdgeSuitsComponent, CommandIqStatusComponent,RevenueEDGEEcosystemComponent,RevenueEdgeIQsuitesComponent,MycommunityIQComponent];

@NgModule({
  declarations: [FoundationHomeComponent, CcoFoundationComponent, FoundationFooterComponent, FoundationHeaderComponent, ...HOME, SubscribersSystemsListComponent, MycommunityIQComponent],
  imports: [
    CommonModule,
    CcoFoundationRoutingModule,
    SharedUtilsModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    //SystemServiceTrendsModule,
    ReactiveFormsModule,
    //SubscriberTrendsModule,
    NgbModule,
    DataTablesModule,
    SharedModule,
    Shared
  ],
  exports: [...HOME]

})
export class CcoFoundationModule {
  constructor(
    private router: Router
  ) {

    // let isDev = false;
    // let base = `${environment.API_BASE}`;
    // if (base.indexOf('/dev.api.calix.ai') > -1) {
    //   isDev = true;
    // } else isDev = false;

    // if (!isDev) {
    //   this.router.navigate(['./support']);
    // }
  }
}
