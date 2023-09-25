import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportServiceComponent } from './support-service.component';
import { DataComponent } from './data/data.component';
import { VideoComponent } from './video/video.component';
import { VoiceComponent } from './voice/voice.component';
import { XdslComponent } from './xdsl/xdsl.component';
import { GfastComponent } from './gfast/gfast.component';

const routes: Routes = [
  {
    path: '',
    component: SupportServiceComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: 'data-new', loadChildren: () => import('./support-service-data/support-service-data.module').then(m => m.SupportServiceDataModule) },
      {
        path: 'data', component: DataComponent, data: { title: 'Calix Suppport Cloud - data' }
      },
      {
        path: 'video', component: VideoComponent, data: { title: 'Calix Suppport Cloud - video' }
      },
      {
        path: 'voice', component: VoiceComponent, data: { title: 'Calix Suppport Cloud - voice' }
      },
      {
        path: 'xdsl', component: XdslComponent, data: { title: 'Calix Suppport Cloud - xdsl' }
      },
      {
        path: 'gfast', component: GfastComponent, data: { title: 'Calix Suppport Cloud - gfast' }
      },
      {
        path: '',
        redirectTo: 'data',
        pathMatch: 'full',
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportServiceRoutingModule { }
