import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CcoAeComponent } from './cco-ae/cco-ae.component';
import { CcoEthernetComponent } from './cco-ethernet/cco-ethernet.component';
import { CcoOntComponent } from './cco-ont/cco-ont.component';
import { HealthComponent } from './health.component';
import { CcoDslComponent } from './cco-dsl/cco-dsl.component';


const routes: Routes = [{
  path: '', component: HealthComponent,
  children: [
    { path: "ae", component: CcoAeComponent },
    { path: 'uplink', component: CcoEthernetComponent },
    { path: 'ont', component: CcoOntComponent },
    { path: 'dsl', component:CcoDslComponent},
    { path: 'pon-utilization', loadChildren: () => import('./pon-utilization/pon-utilization.module').then(m => m.PonUtilizationModule) },
    { path: '', redirectTo: 'pon-utilization', pathMatch: 'full' },

    // { path: "cco-ae", component: CcoAeComponent },
    // { path: "cco-uplink", component: CcoEthernetComponent },
    // { path: "cco-ont", component: CcoOntComponent },
    // { path: 'cco-pon-utilization', loadChildren: () => import('./cco-pon/cco-pon.module').then(m => m.CcoPonModule) },
    // { path: '', redirectTo: 'cco-pon-utilization', pathMatch: 'full' }
  ]

}];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthRoutingModule { }
