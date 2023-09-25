import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CcoSubscriberTemplatesComponent } from './cco-subscriber-templates.component';
import { BandwidthTierComponent } from './bandwidth-tier/bandwidth-tier.component';
import { SubscriberTemplateComponent } from './subscriber-template/subscriber-template.component';

const routes: Routes = [
  {
    path: '', component: CcoSubscriberTemplatesComponent,
    children: [
      { path: 'bandwidth-tiers', loadChildren: () => import('./bandwidth-tier-templates/bandwidth-tier-templates.module').then(m => m.BandwidthTierTemplatesModule) },
      { path: 'subscriber-templates', loadChildren: () => import('./subscriber-templates/subscriber-templates.module').then(m => m.SubscriberTemplatesModule) },
      { path: 'subscriber-template', component: SubscriberTemplateComponent },
      { path: 'bandwidth-tier', component: BandwidthTierComponent },
      {
        path: '',
        redirectTo: 'subscriber-templates',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class CcoSubscriberTemplatesRoutingModule { }
