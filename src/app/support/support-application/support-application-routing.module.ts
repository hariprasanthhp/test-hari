import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportApplicationComponent } from './support-application.component';
import { ProtectIQComponent } from './protect-iq/protect-iq.component';
import { ServifyCareComponent } from './servify-care/servify-care.component';
import { ArloSmartComponent } from './arlo-smart/arlo-smart.component';
import { BarkComponent } from './bark/bark.component';
import { MyCommunityIQComponent } from './my-community-iq/my-community-iq.component';
import { CaptivePortalComponent } from './captive-portal/captive-portal.component';

const routes: Routes = [
  {
    path: '',
    component: SupportApplicationComponent,
    children: [
      {
        path: 'protectIQ', component: ProtectIQComponent, data: { title: 'Calix Suppport Cloud - rg' }
      },
      {
        path: 'protect-iq', loadChildren: () => import('./protect-iq-new/protect-iq-new.module').then(m => m.ProtectIqNewModule)
      },
      {
        path: 'experienceIQ', loadChildren: () => import('./experience-iq/experience-iq.module').then(m => m.ExperienceIqModule)
      },
      {
        path: 'arlo-smart', component: ArloSmartComponent, data: { title: 'Calix Suppport Cloud' }
      },
      {
        path: 'servify-care', component: ServifyCareComponent, data: { title: 'Calix Suppport Cloud' }
      },
      {
        path: 'bark', component: BarkComponent, data: { title: 'Calix Suppport Cloud' }
      },
      {
        path: 'SmartTownWiFi', component: MyCommunityIQComponent, data: { title: 'calix support cloud' }
      },
      {
        path: 'customer-portal', component: CaptivePortalComponent, data: { title: 'calix support cloud' }
      },
      {
        path: 'smartbiz',
        loadChildren: () => import('./smartbiz/smartbiz.module').then(m => m.SmartbizModule)
      },
      {
        path: '',
        redirectTo: 'protect-iq',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportApplicationRoutingModule { }

