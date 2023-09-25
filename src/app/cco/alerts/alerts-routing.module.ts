import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './alerts.component';
import { ActiveissueComponent } from '../issues/active-reports/activeissue/activeissue.component';
import { HistoryissueComponent } from '../issues/historyreport/historyissue/historyissue.component';
import { ServiceDisruptionsComponent } from './service-disruptions/service-disruptions.component';

const routes: Routes = [
  {
    path: '', component: AlertsComponent,
    children: [
      { path: 'realtime', loadChildren: () => import('../issues/realtime/realtime.module').then(m => m.RealtimeModule) },
      { path: 'active-reports', component: ActiveissueComponent, data: { title: 'Calix Cloud - ' }, },
      { path: 'history-reports', component: HistoryissueComponent, data: { title: 'Calix Cloud - ' } },
      { path: 'view', component: HistoryissueComponent, data: { title: 'Calix Cloud - ' } },
      { path: 'list', component: ServiceDisruptionsComponent, data: { title: 'Calix Cloud - ' } },
      { path: '', redirectTo: 'realtime', pathMatch: 'full' }
    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertsRoutingModule { }
