import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NetworkReportsComponent } from './network-reports.component';


const routes: Routes = [{ path: '', component: NetworkReportsComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class NetworkReportsRoutingModule { }
