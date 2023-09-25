import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { StartComponent } from './add/start/start.component';
import { BuildProfileComponent } from './add/build-profile/build-profile.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProfilesComponent,
    ListComponent,
    AddComponent,
    StartComponent,
    BuildProfileComponent,
    DetailComponent,
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
