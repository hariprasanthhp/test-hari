import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationPrerequisitesComponent } from './configuration-prerequisites.component';
import { ConfigurationPrerequisitesRoutingModule } from './configuration-prerequisites-routing.module';



@NgModule({
  declarations: [ConfigurationPrerequisitesComponent],
  imports: [
    CommonModule,
    ConfigurationPrerequisitesRoutingModule
  ]
})
export class ConfigurationPrerequisitesModule { }
