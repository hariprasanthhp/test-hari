import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SystemTopologyViewComponent } from './system-topology-view.component';




const routes: Routes = [{ path: '', component: SystemTopologyViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemTopologyViewRoutingModule { }
