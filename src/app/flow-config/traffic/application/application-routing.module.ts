import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application.component';


const routes: Routes = [{
  path: '',
  component: ApplicationComponent,
  children: [
    { path: 'realtime', loadChildren: () => import('src/app/cco/traffic/applications/realtime/realtime.module').then(m => m.RealtimeModule) },
    { path: 'reports', loadChildren: () => import('src/app/cco/traffic/applications/application-reports/application-reports.module').then(m => m.ApplicationReportsModule) },
    {
      path: '',
      redirectTo: 'realtime',
      pathMatch: 'full',
    }
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ApplicationRoutingModule { }
