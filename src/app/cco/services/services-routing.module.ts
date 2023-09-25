import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services.component';

const routes: Routes = [
  {
    path: '',
    component: ServicesComponent,
    children: [
      { path: 'subscribers', loadChildren: () => import('./subscribers/subscribers.module').then(m => m.SubscribersModule) },
      { path: 'service-profiles', loadChildren: () => import('./service-profiles/service-profiles.module').then(m => m.ServiceProfilesModule) },
      //{ path: 'orchestration', loadChildren: () => import('./orchestration/orchestration.module').then(m => m.OrchestrationModule) },
      { path: 'configuration', loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule) }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
