import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SupportServiceDataRoutingModule } from './support-service-data-routing.module';
import { SupportServiceDataComponent } from './support-service-data.component';
import { SpeedTestComponent } from './speed-test/speed-test.component';
import { TrafficReportComponent } from './traffic-report/traffic-report.component';


@NgModule({
  declarations: [SupportServiceDataComponent, SpeedTestComponent, TrafficReportComponent],
  imports: [
    CommonModule,
    SupportServiceDataRoutingModule,
    NgbModule
  ]
})
export class SupportServiceDataModule { }
