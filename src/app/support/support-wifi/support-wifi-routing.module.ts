import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportWifiComponent } from './support-wifi.component';
import { RgComponent } from './rg/rg.component';
import { ExtenderComponent } from './extender/extender.component';
import { SSIDComponent } from './ssid/ssid.component';
import { SsidPoolingComponent } from './ssid-pooling/ssid-pooling.component';
import { WifiSixSupportService } from './services/wifi-six-support.service';
import { WanFailoverComponent } from './wan-failover/wan-failover.component';


const routes: Routes = [
  {
    path: '',
    component: SupportWifiComponent,
    //canActivate: [AuthGuard],
    // resolve: {
    //   availability: WifiSixSupportService
    // },
    children: [
      {
        path: 'rg/:fsan', component: RgComponent, data: { title: 'Calix Suppport Cloud - rg' }
      },
      {
        path: 'extender/:fsan', component: ExtenderComponent, data: { title: 'Calix Suppport Cloud - extender' }
      },
      {
        path: 'ssidold', component: SSIDComponent, data: { title: 'Calix Suppport Cloud - ssid' }
      },
      {
        path: 'ssid', component: SsidPoolingComponent, data: { title: 'Calix Suppport Cloud - ssid' }
      },
      {
        path: 'network-resilience', component: WanFailoverComponent, data: { title: 'Calix Suppport Cloud - ssid' }
      },

      // {
      //   path: '**', component: RgComponent
      // }
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SupportWifiRoutingModule { }

