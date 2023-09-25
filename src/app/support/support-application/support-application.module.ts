import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";
import { DataTablesModule } from 'angular-datatables';
import { SupportApplicationRoutingModule } from './support-application-routing.module';
import { SupportApplicationComponent } from './support-application.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ProtectIQComponent } from './protect-iq/protect-iq.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArloSmartComponent } from './arlo-smart/arlo-smart.component';
import { ServifyCareComponent } from './servify-care/servify-care.component';
import { BarkComponent } from './bark/bark.component';
import { MyCommunityIQComponent } from './my-community-iq/my-community-iq.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CaptivePortalComponent } from './captive-portal/captive-portal.component';
import { CalendarModule } from 'primeng/calendar';
import { ColorPickerModule } from 'ngx-color-picker';
import { ProtectIqNewComponent } from './protect-iq-new/protect-iq-new.component';
import { SharedModule as shared } from 'src/app/shared/shared.module';
import { TopNavBarComponent } from './shared/top-nav-bar/top-nav-bar.component';


@NgModule({
  declarations: [
    SupportApplicationComponent,
    AlertsComponent,
    ProtectIQComponent,
    ArloSmartComponent,
    ServifyCareComponent,
    BarkComponent,
    MyCommunityIQComponent,
    CaptivePortalComponent,
    TopNavBarComponent,
    ProtectIqNewComponent,
  ],
  imports: [
    DataTablesModule,
    CommonModule,
    SupportApplicationRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CalendarModule,
    ColorPickerModule,
    shared,
  ],
  exports: [
    TopNavBarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SupportApplicationModule { }
