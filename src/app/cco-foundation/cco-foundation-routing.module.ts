import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CcoFoundationComponent } from './cco-foundation.component';
import { FoundationHomeComponent } from './foundation-home/foundation-home.component';
import { SoftwareImagesListComponent } from "../../../src/app/support/netops-management/operations/software-images-list/software-images-list.component"
import { SubscribersSystemsListComponent } from './subscribers-systems-list/subscribers-systems-list.component';
import { SoftwareImagesFormComponent } from '../support/netops-management/operations/software-images-form/software-images-form.component';
import { DevicesGroupsComponent } from '../support/netops-management/operations/devices-groups/devices-groups.component';
import { MigrationMappingComponent } from './foundation-configuration/configuration-settings/migrations-rg/migration-mapping/migration-mapping.component';

const routes: Routes = [

  {
    path: '', component: CcoFoundationComponent,
    children: [
      { path: 'foundation-home', component: FoundationHomeComponent },
      { path: 'foundation-operations', loadChildren: () => import('./foundation-operations/foundation-operations.module').then(m => m.FoundationOperationsModule) },
      { path: 'foundation-systems', loadChildren: () => import('./foundation-systems/foundation-systems.module').then(m => m.FoundationSystemsModule) },
      {path: 'foundation-configuration/configuration-settings/migrations-rg/migration-mapping',  component: MigrationMappingComponent},
      { path: 'foundation-configuration', loadChildren: () => import('./foundation-configuration/foundation-configuration.module').then(m => m.FoundationConfigurationModule) },
      { path: 'foundation-reports', loadChildren: () => import('./foundation-reports-final/foundation-reports-final.module').then(m => m.FoundationReportsFinalModule) },
      { path: 'subscribers-systems/search', component: SubscribersSystemsListComponent },
      { path: '', redirectTo: 'foundation-home', pathMatch: 'full' }
    ]
  },
  { path: 'software-image/software-images-form', component: SoftwareImagesFormComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
  { path: 'device-groups-add', component: DevicesGroupsComponent },
  { path: 'device-groups/:id', component: DevicesGroupsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
  { path: 'device-groups-workflow', component: DevicesGroupsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CcoFoundationRoutingModule { }
