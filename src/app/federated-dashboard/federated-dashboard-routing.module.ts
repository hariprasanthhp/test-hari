import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FederatedDashboardLayoutComponent } from './federated-dashboard-layout/federated-dashboard-layout.component';
import { FederatedDashboardComponent } from './federated-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: FederatedDashboardLayoutComponent,
    children: [
      {
        path: '',
        component: FederatedDashboardComponent,
        pathMatch: 'full',
        data: { title: 'Calix Cloud - Federated Dashboard' }

      }

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FederatedDashboardRoutingModule { }
