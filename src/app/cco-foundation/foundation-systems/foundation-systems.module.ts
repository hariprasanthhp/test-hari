import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundationSystemsComponent } from './foundation-systems.component';
import { FoundationSystemsRoutingModule } from './foundation-systems-routing.module';
import { FoundationDataService } from './foundation-data.service';

@NgModule({
  declarations: [FoundationSystemsComponent],
  imports: [CommonModule, FoundationSystemsRoutingModule],
  providers: [FoundationDataService],
})
export class FoundationSystemsModule {}
