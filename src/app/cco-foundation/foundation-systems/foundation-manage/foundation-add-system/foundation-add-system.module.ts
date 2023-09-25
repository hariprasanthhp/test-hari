import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundationAddSystemComponent } from './foundation-add-system.component';
import { FoundationSystemDetailsComponent } from './foundation-system-details/foundation-system-details.component';
import { FoundationAddSystemRoutingModule } from './foundation-add-system-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceTierComponent } from './service-tier/service-tier.component';
import { EdgeSuitsComponent } from './edge-suits/edge-suits.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/support/shared/shared.module';
import { StaticGroupsComponent } from './static-groups/static-groups.component';
import { AddStaticGroupsComponent } from './add-static-groups/add-static-groups.component';
import { AddDataPlanComponent } from './add-data-plan/add-data-plan.component';
import { AddVoicePlanComponent } from './add-voice-plan/add-voice-plan.component';
import { AddVideoPlanComponent } from './add-video-plan/add-video-plan.component';
import { SharedModule as shared } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FoundationAddSystemComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FoundationAddSystemRoutingModule,
    DataTablesModule,
    SharedModule,
    shared
  ]
})
export class FoundationAddSystemModule { }
