import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoundationOperationsComponent } from './foundation-operations.component';

const routes: Routes =
  [
    {
      path: '', component: FoundationOperationsComponent,
      children: [
        {
          path: '',
          redirectTo: 'foundation-system-operation',
          pathMatch: 'full',
        },
        { path: 'foundation-system-operation', loadChildren: () => import('./system-operations/system-operations.module').then(m => m.CcoSystemOperationsModule) },
        { path: 'foundation-reports', loadChildren: () => import('./reports/reports.module').then(m => m.FoundationReportsModule) }
      ]
    }
  ]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoundationOperationsRoutingModule { }
