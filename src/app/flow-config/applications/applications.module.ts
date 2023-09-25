import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { DefinitionsComponent } from './definitions/definitions.component';
import { AppGroupsComponent } from './app-groups/app-groups.component';
import { ApplicationsComponent } from './applications.component';

import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { TruncatePipe } from 'src/app/support/shared/custom-pipes/truncate.pipe';


@NgModule({
  declarations: [DefinitionsComponent, AppGroupsComponent, ApplicationsComponent, TruncatePipe],
  imports: [
    CommonModule,
    FormsModule,
    ApplicationsRoutingModule,
    DataTablesModule,
    NgSelectModule,
    SharedUtilsModule,

  ]
})
export class ApplicationsModule { }
