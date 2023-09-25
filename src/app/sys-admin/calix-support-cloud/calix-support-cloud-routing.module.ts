import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcsSettingsComponent } from './acs-settings/acs-settings.component';
import { CalixSupportCloudComponent } from './calix-support-cloud.component';
import { SpeedTestComponent } from './speed-test/speed-test.component';

const routes: Routes = [{
  path: '',
  component: CalixSupportCloudComponent,
  children: [
    // { path: 'speed-test', component: SpeedTestComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'acs-settings', component: AcsSettingsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    {
      path: '',
      redirectTo: 'acs-settings',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalixSupportCloudRoutingModule { }
