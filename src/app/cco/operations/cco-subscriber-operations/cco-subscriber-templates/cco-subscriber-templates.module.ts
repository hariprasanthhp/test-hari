import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcoSubscriberTemplatesComponent } from './cco-subscriber-templates.component';
import { CcoSubscriberTemplatesRoutingModule } from './cco-subscriber-templates-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SubscriberTemplateComponent } from './subscriber-template/subscriber-template.component';
import { BandwidthTierComponent } from './bandwidth-tier/bandwidth-tier.component';


@NgModule({
  declarations: [CcoSubscriberTemplatesComponent, SubscriberTemplateComponent, BandwidthTierComponent],
  imports: [
    CommonModule,
    CcoSubscriberTemplatesRoutingModule,
    NgSelectModule,
  ]
})

export class CcoSubscriberTemplatesModule { }
