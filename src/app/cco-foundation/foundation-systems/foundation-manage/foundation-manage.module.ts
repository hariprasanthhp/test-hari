import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundationManageComponent } from './foundation-manage.component';
import { FoundationManageRoutingModule } from './foundation-manage-routing.module';
import { FoundationSystemListComponent } from './foundation-system-list/foundation-system-list.component';
import { FoundationAddSystemComponent } from './foundation-add-system/foundation-add-system.component';
import { FoundationSystemDetailsComponent } from './foundation-add-system/foundation-system-details/foundation-system-details.component';
import { ServiceTierComponent } from './foundation-add-system/service-tier/service-tier.component';
import { EdgeSuitsComponent } from './foundation-add-system/edge-suits/edge-suits.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/support/shared/shared.module';
import { StaticGroupsComponent } from './foundation-add-system/static-groups/static-groups.component';
import { SelectedSystemDetailsComponent } from './selected-system-details/selected-system-details.component';
import { SystemAdvancedComponent } from './foundation-add-system/system-advanced/system-advanced.component';
import { AddStaticGroupsComponent } from './foundation-add-system/add-static-groups/add-static-groups.component';
import { AddDataPlanComponent } from './foundation-add-system/add-data-plan/add-data-plan.component';
import { AddVoicePlanComponent } from './foundation-add-system/add-voice-plan/add-voice-plan.component';
import { AddVideoPlanComponent } from './foundation-add-system/add-video-plan/add-video-plan.component';
import { SharedModule as shared } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    FoundationManageComponent,
    FoundationSystemListComponent,
    FoundationAddSystemComponent,
    FoundationSystemDetailsComponent,
    ServiceTierComponent,
    EdgeSuitsComponent,
    StaticGroupsComponent,
    SelectedSystemDetailsComponent,
    SystemAdvancedComponent,
    AddStaticGroupsComponent,
    AddDataPlanComponent,
    AddVoicePlanComponent,
    AddVideoPlanComponent
  ],
  imports: [

    CommonModule,
    NgSelectModule,
    FoundationManageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule,
    shared
  ],
})
export class FoundationManageModule { }
