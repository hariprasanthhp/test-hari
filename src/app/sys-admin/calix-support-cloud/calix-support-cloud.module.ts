import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalixSupportCloudRoutingModule } from './calix-support-cloud-routing.module';
import { SpeedTestComponent } from './speed-test/speed-test.component';
import { AcsSettingsComponent } from './acs-settings/acs-settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [SpeedTestComponent, AcsSettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    CalixSupportCloudRoutingModule,
    NgbModule,
  ]
})
export class CalixSupportCloudModule { }
