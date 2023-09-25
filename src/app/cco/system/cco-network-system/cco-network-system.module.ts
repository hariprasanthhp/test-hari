import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CcoNetworkSystemComponent } from './cco-network-system.component';
import { CcoNetworkSystemRoutingModule } from './cco-network-system-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SystemTableViewComponent } from './system-table-view/system-table-view.component';

import { DataTablesModule } from 'angular-datatables';
import { SelectedSystemDetailsComponent } from './selected-system-details/selected-system-details.component';
import { AddComponent } from './add/add.component';
import { CmsComponent } from './add/cms/cms.component';
import { CmsDbComponent } from './add/cms-db/cms-db.component';
import { ShowSystemDetailsComponent } from './show-system-details/show-system-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardDetailsComponent } from './show-system-details/card-details/card-details.component';



@NgModule({
  declarations: [CcoNetworkSystemComponent, SystemTableViewComponent, SelectedSystemDetailsComponent, AddComponent, CmsComponent, CmsDbComponent, ShowSystemDetailsComponent, CardDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    CcoNetworkSystemRoutingModule,
    NgSelectModule,
    DataTablesModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CcoNetworkSystemModule { }
