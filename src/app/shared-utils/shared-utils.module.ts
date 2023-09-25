import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GridComponent } from './grid/grid.component';
import { DdMenuComponent } from './dd-menu/dd-menu.component';
import { RouterModule } from '@angular/router';
import { CommonLoaderComponent } from './common-loader/common-loader.component';
import { MarketingInsightsComponent } from './marketing-insights/marketing-insights.component';
//import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [GridComponent, DdMenuComponent, CommonLoaderComponent, MarketingInsightsComponent],
  imports: [
    CommonModule,
    NgbModule,
//    ToastModule,
    RouterModule.forChild([])
  ],
  exports: [GridComponent, DdMenuComponent, CommonLoaderComponent, CommonModule, NgbModule, RouterModule, MarketingInsightsComponent]
})
export class SharedUtilsModule { }
