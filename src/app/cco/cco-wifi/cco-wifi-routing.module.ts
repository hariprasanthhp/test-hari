import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtenderComponent } from 'src/app/support/support-wifi/extender/extender.component';
import { RgComponent } from 'src/app/support/support-wifi/rg/rg.component';
import { SSIDComponent } from 'src/app/support/support-wifi/ssid/ssid.component';
import { SupportWifiComponent } from 'src/app/support/support-wifi/support-wifi.component';

const routes: Routes = [
  {
    path: '',
    component: SupportWifiComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'rg/:fsan', component: RgComponent, data: { title: 'Calix Suppport Cloud - rg' }
      },
      {
        path: 'extender/:fsan', component: ExtenderComponent, data: { title: 'Calix Suppport Cloud - extender' }
      },
      {
        path: 'ssid', component: SSIDComponent, data: { title: 'Calix Suppport Cloud - ssid' }
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
export class CcoWifiRoutingModule { }
