import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { RevenueEdgeserviceComponent } from './charts/revenue-edge/revenue-edge.component'
import { SystemServiceTrendsRoutingModule } from './system-service-trends-routing.module';
import { SystemServiceTrendsComponent } from './system-service-trends.component';
import { CcoFoundationModule } from 'src/app/cco-foundation/cco-foundation.module';
import { SystemService } from './system.service';
// import { SystemStatusComponent } from './charts/system-status/system-status.component';
// import { SystemsByTypeComponent } from './charts/systems-by-type/systems-by-type.component';
// import { SoftwareVersionsComponent } from './charts/software-versions/software-versions.component';
// import { UnassociatedSystemsComponent } from './charts/unassociated-systems/unassociated-systems.component';
import { FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [SystemServiceTrendsComponent],
  imports: [
    CommonModule,
    SystemServiceTrendsRoutingModule,
    CcoFoundationModule, FormsModule, NgSelectModule
  ],
  providers: [
    SystemService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemServiceTrendsModule { }
