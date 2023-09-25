import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockPageTemplateCreateComponent } from 'src/app/shad/block-page-template-create/block-page-template-create.component';
import { BlockPageTemplateListComponent } from 'src/app/shad/block-page-template-list/block-page-template-list.component';
import { BlockPageTemplateUpdateComponent } from 'src/app/shad/block-page-template-update/block-page-template-update.component';
import { WhitelabelCreateComponent } from 'src/app/shad/whitelabel-create/whitelabel-create.component';
import { WhitelabelUpdateComponent } from 'src/app/shad/whitelabel-update/whitelabel-update.component';
import { WhitelabelComponent } from 'src/app/shad/whitelabel/whitelabel.component';
import { FoundationComponent } from './foundation.component';
import { SystemDeleteSettingsComponent } from './system-delete-settings/system-delete-settings.component';

const routes: Routes = [
  {
    path: '',
    component: FoundationComponent,
    children: [
      { path: 'block_page_template_list', component: BlockPageTemplateListComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'block_page_template/:id', component: BlockPageTemplateCreateComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'block_page_template', component: BlockPageTemplateCreateComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'block_page_template_update/:id', component: BlockPageTemplateUpdateComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'whitelabel', component: WhitelabelComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'whitelabel-create', component: WhitelabelCreateComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'whitelabel-update', component: WhitelabelUpdateComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'system_settings', component: SystemDeleteSettingsComponent, data: { title: 'Calix Cloud - Org Admin' } },
      {
        path: '',
        redirectTo: 'system_settings',
        pathMatch: 'full',
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoundationRoutingModule { }
