import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { AddComponent } from './add/add.component';
import { StartComponent } from './add/start/start.component';
import { BuildProfileComponent } from './add/build-profile/build-profile.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProfilesComponent,
    AddComponent,
    StartComponent,
    BuildProfileComponent,
    DetailComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    DataTablesModule,
    FormsModule,
    SharedModule
  ]
})
export class ProfilesModule { }
