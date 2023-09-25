import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationReportsComponent } from './application-reports.component';


const routes: Routes = [{ path: '', component: ApplicationReportsComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ApplicationReportsRoutingModule { }
