import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CcoNetworkConfigurationFilesComponent } from './cco-network-configuration-files.component';


const routes: Routes = [{ path: '', component: CcoNetworkConfigurationFilesComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class CcoNetworkConfigurationFilesRoutingModule { }
