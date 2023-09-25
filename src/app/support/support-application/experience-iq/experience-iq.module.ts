import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ExperienceIqRoutingModule } from './experience-iq-routing.module';
import { ExperienceIqComponent } from './experience-iq.component';
import { ProfileComponent } from './profile/profile.component';
import { DevicesComponent } from './devices/devices.component';
import { FiltersComponent } from './filters/filters.component';
import { NotificationComponent } from './notification/notification.component';
import { TimeLimitComponent } from './time-limit/time-limit.component';
import { UsageComponent } from './usage/usage.component';
import { ProfileDetailDeviceComponent } from './profile-detail-device/profile-detail-device.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module'
import { CalendarModule } from 'primeng/calendar';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TimeconvertorPipe } from './pipes/timeconvertor.pipe';
import { SmbExperienceIqComponent } from './smb-experience-iq/smb-experience-iq.component';
import { PrimaryNetworkExperienceIqComponent } from './primary-network-experience-iq/primary-network-experience-iq.component';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [ExperienceIqComponent,
    ProfileComponent,
    DevicesComponent,
    FiltersComponent,
    NotificationComponent,
    TimeLimitComponent,
    UsageComponent,
    ProfileDetailDeviceComponent,
    TimeconvertorPipe,
    SmbExperienceIqComponent,
    PrimaryNetworkExperienceIqComponent
  ],

  imports: [
    CommonModule,
    ExperienceIqRoutingModule,
    NgbDropdownModule,
    NgbModule,
    FormsModule,
    SharedModule,
    CalendarModule,
    NgSelectModule,
    DragDropModule,
    DataTablesModule
  ]



})
export class ExperienceIqModule { }
