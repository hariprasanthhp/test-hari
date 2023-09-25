import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { FoundationDataService } from 'src/app/cco-foundation/foundation-systems/foundation-data.service';
import { SubscribersImpactComponent } from './subscribers-impact/subscribers-impact.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/support/shared/shared.module';


@NgModule({
  declarations: [SystemComponent, SubscribersImpactComponent],
  imports: [
    CommonModule,
    SystemRoutingModule,
    DataTablesModule,
    FormsModule,
    SharedModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  providers: [FoundationDataService]
})
export class SystemModule { }
