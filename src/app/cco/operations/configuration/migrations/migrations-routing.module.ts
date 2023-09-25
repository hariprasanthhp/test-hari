import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MigrationsComponent } from './migrations.component';
import { MigrationMappingComponent } from './migration-mapping/migration-mapping.component';

const routes: Routes = [{
  path: '', component: MigrationsComponent,
  children: [
    { path: 'jobs', loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule) },
    { path: 'profiles', loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule) },
    { path: 'migration-mapping',  component: MigrationMappingComponent},
    { path: '', redirectTo: 'jobs', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MigrationsRoutingModule { }
