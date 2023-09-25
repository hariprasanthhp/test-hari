import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcoNetworkConfigurationFilesComponent } from './cco-network-configuration-files.component';
import { CcoNetworkConfigurationFilesRoutingModule } from './cco-network-configuration-files-routing.module';



@NgModule({
  declarations: [CcoNetworkConfigurationFilesComponent],
  imports: [
    CommonModule,
    CcoNetworkConfigurationFilesRoutingModule
  ]
})
export class CcoNetworkConfigurationFilesModule { }
