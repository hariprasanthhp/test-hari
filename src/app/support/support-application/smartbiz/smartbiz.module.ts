import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartbizComponent } from './smartbiz.component';
import { SmartbizRoutingModule } from './smartbiz-routing.module';
import { CustomerPortalComponent } from './customer-portal/customer-portal.component';
import { NetworkResilienceComponent } from './network-resilience/network-resilience.component';
import { CustomerPortalContentComponent } from './customer-portal/customer-portal-content/customer-portal-content.component';
import { CustomerPortalBrandingComponent } from './customer-portal/customer-portal-branding/customer-portal-branding.component';
import { CustomerPortalNetworkAccessComponent } from './customer-portal/customer-portal-network-access/customer-portal-network-access.component';
import { CustomerPortalVisitorsComponent } from './customer-portal/customer-portal-visitors/customer-portal-visitors.component';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ColorPickerModule } from 'ngx-color-picker';
import { CalendarModule } from 'primeng/calendar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SmartbizComponent,
    CustomerPortalComponent,
    NetworkResilienceComponent,
    CustomerPortalContentComponent,
    CustomerPortalBrandingComponent,
    CustomerPortalNetworkAccessComponent,
    CustomerPortalVisitorsComponent
  ],
  imports: [
    CommonModule,
    SmartbizRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ColorPickerModule,
    CalendarModule,
    NgbModule,
    SharedModule
  ],
  providers: [
    FormGroupDirective
  ]
})
export class SmartbizModule { }
