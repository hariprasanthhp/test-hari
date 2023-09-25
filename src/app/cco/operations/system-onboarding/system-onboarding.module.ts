import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemOnboardingRoutingModule } from './system-onboarding-routing.module';
import { SystemOnboardingComponent } from './system-onboarding.component';


@NgModule({
  declarations: [
    SystemOnboardingComponent
  ],
  imports: [
    CommonModule,
    SystemOnboardingRoutingModule
  ]
})
export class SystemOnboardingModule { }
