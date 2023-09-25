import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppGroupsComponent } from './app-groups/app-groups.component';
import { ApplicationsComponent } from './applications.component';
import { DefinitionsComponent } from './definitions/definitions.component';

const routes: Routes = [{
  path: '',
  component: ApplicationsComponent,
  //canActivate: [AuthGuard],
  children: [
    {
      path: 'definitions', component: DefinitionsComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    },
    {
      path: 'app_groups', component: AppGroupsComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    },
    { path: '', redirectTo: 'definitions', pathMatch: 'full', }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
