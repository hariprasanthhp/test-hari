import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthRoutingModule } from './health-routing.module';
import { HealthComponent } from './health.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from '../shared/services/websocket.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedHealthModule } from './shared/shared-health.module';
import { DataTablesModule } from 'angular-datatables';
import { CcoAeComponent } from './cco-ae/cco-ae.component';
import { CcoEthernetComponent } from './cco-ethernet/cco-ethernet.component';
import { CcoOntComponent } from './cco-ont/cco-ont.component';
import { CcoDslComponent } from './cco-dsl/cco-dsl.component';
@NgModule({
  declarations: [HealthComponent, CcoAeComponent, CcoEthernetComponent, CcoOntComponent, CcoDslComponent],
  imports: [
    CommonModule,
    HealthRoutingModule, DataTablesModule,
    NgxSliderModule, CalendarModule, FormsModule, NgSelectModule, SharedHealthModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class HealthModule {
  constructor(private wsService: WebsocketService) {
    this.wsService.getRealtimeDelay();
    this.wsService.getUnSignedUrl().subscribe((res: any) => {
      this.wsService.Checkconnectornot(res.signedurl);
    });
  }
}
