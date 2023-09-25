import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemOnboardingComponent } from './system-onboarding.component';
import { CallHomeComponent } from 'src/app/sys-admin/cco-admin/call-home/call-home.component';
import { AddComponent } from 'src/app/sys-admin/cco-admin/call-home/add/add.component';
import { CcoNetworkSystemComponent } from '../../system/cco-network-system/cco-network-system.component';
import { SystemTableViewComponent } from '../../system/cco-network-system/system-table-view/system-table-view.component';
import { SelectedSystemDetailsComponent } from '../../system/cco-network-system/selected-system-details/selected-system-details.component';
import { ShowSystemDetailsComponent } from '../../system/cco-network-system/show-system-details/show-system-details.component';
import { CcoAdminConfigurationsComponent } from 'src/app/sys-admin/cco-admin/cco-admin-configurations/cco-admin-configurations.component';

const routes: Routes = [{
  path: '', component: SystemOnboardingComponent,
  children: [
    // {
    //   path: "axos/list", component: CallHomeComponent
    // },
    // {
    //   path: "axos/add",
    //   component: AddComponent,
    //   data: { title: 'Calix Cloud - Call Home' }
    // },
    // {
    //   path: "axos/edit/:id",
    //   component: AddComponent,
    //   data: { title: 'Calix Cloud - Call Home' }
    // },
    { path: 'axos-callhome', loadChildren: () => import('./axos-callhome/axos-callhome.module').then(m => m.AxosCallhomeModule) },
    {
      path: 'cms-exa', component: CcoNetworkSystemComponent,
      children: [
        // { path: 'add', component: AddComponent },
        // { path: 'edit/:id', component: AddComponent },
        { path: 'list', component: SystemTableViewComponent },
        { path: 'system-details/:SN', component: SelectedSystemDetailsComponent },
        { path: 'show-details', component: ShowSystemDetailsComponent },
        { path: 'system-topology-view', loadChildren: () => import('src/app/cco/system/cco-network-system/system-topology-view/system-topology-view.module').then(m => m.SystemTopologyViewModule) },
        { path: '', redirectTo: 'list', pathMatch: 'full' }
      ]

    },
    {
      path: "region-settings",
      component: CcoAdminConfigurationsComponent,
      data: { title: 'Calix Cloud - Configurations' }
    },
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemOnboardingRoutingModule { }
