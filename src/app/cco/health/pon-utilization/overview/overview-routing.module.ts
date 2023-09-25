import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvancedComponent } from './advanced/advanced.component';
import { OverviewComponent } from './overview.component';
import { ReportsComponent } from '../reports/reports.component';

const routes: Routes = [
  { path: '', component: OverviewComponent, 
    children: [ 
      { path: 'basic', component: ReportsComponent },
      { path: 'advance', component: AdvancedComponent },
      {
        path: '',
        redirectTo: 'basic',
        pathMatch: 'full',
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
