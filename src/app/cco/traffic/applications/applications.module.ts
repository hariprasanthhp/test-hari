import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';


@NgModule({
  declarations: [ApplicationsComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    ApplicationsRoutingModule
  ]
})
export class ApplicationsModule { }
