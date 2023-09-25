import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MigrationMappingComponent } from './migration-mapping/migration-mapping.component';
import { MigrationsRgComponent } from './migrations-rg.component';

const routes: Routes = [{
  path: '', component: MigrationsRgComponent,
  children: [
    { path: 'jobs', loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule) },
    { path: 'profiles', loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule) },
    { path: 'migration-mapping',  component: MigrationMappingComponent},
    { path: '', redirectTo: 'jobs', pathMatch: 'full' }
  ]
},
  // { path: 'migration-mapping',  component: MigrationMappingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MigrationsRgRoutingModule { }
