import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportOverviewComponent } from './support-overview.component';
import { IssuesComponent } from './issues/issues.component';
import { TopologyComponent } from './topology/topology.component';
import { DemoTopologyComponent } from './demo-topology/demo-topology.component';
import { SupportTopologyComponent } from './support-topology/support-topology.component';
import { QualityOfExperienceComponent } from './quality-of-experience/quality-of-experience.component';

const routes: Routes = [
  {
    path: '',
    component: SupportOverviewComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'issues', component: IssuesComponent, data: { title: 'Calix Suppport Cloud - issues' }
      },
      {
        path: 'topology', component: SupportTopologyComponent, data: { title: 'Calix Suppport Cloud - topology' }
      },
      {
        path: 'quality-of-experience', component: QualityOfExperienceComponent, data: { title: 'Calix Suppport Cloud - quality-of-experience' }
      },
      {
        path: 'demo-topology', component: DemoTopologyComponent, data: { title: 'Calix Suppport Cloud - demo-topology' }
      },
      { path: 'topology3', component: TopologyComponent, data: { title: 'Calix Suppport Cloud - topology' } },
      {
        path: '',
        redirectTo: 'issues',
        pathMatch: 'full',
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportOverviewRoutingModule { }
