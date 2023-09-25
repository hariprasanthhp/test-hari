import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShadComponent } from './shad.component';
import { RouterManagementComponent } from './router-management/router-management.component';
import { SubscriberServicesComponent } from './subscriber-services/subscriber-services.component';
import { OnboardedRoutersComponent } from './onboarded-routers/onboarded-routers.component';
import { BlockPageTemplateListComponent } from './block-page-template-list/block-page-template-list.component';
import { BlockPageTemplateCreateComponent } from './block-page-template-create/block-page-template-create.component';
import { MapComponent } from './map/map.component';
import { BlockPageTemplateUpdateComponent } from "./block-page-template-update/block-page-template-update.component";
import { AuthGuard } from "../shared/services/auth.guard";
import { WhitelabelComponent } from './whitelabel/whitelabel.component';
import { WhitelabelCreateComponent } from './whitelabel-create/whitelabel-create.component';
import { WhitelabelUpdateComponent } from './whitelabel-update/whitelabel-update.component';
import { CommandIQWhiteLabelComponent } from './command-iq-white-label/command-iq-white-label.component';
import { CommandiqCreateComponent } from '../sys-admin/mobile-app/commandiq-create/commandiq-create.component';
import { CommandiqProCreateComponent } from '../sys-admin/mobile-app/commandiq-pro-create/commandiq-pro-create.component';
import { CommandiqProUpdateComponent } from '../sys-admin/mobile-app/commandiq-pro-update/commandiq-pro-update.component';
import { CommandiqProComponent } from '../sys-admin/mobile-app/commandiq-pro/commandiq-pro.component';
import { CommandiqUpdateComponent } from '../sys-admin/mobile-app/commandiq-update/commandiq-update.component';
import { CommandiqComponent } from '../sys-admin/mobile-app/commandiq/commandiq.component';


const routes: Routes = [{
  path: '',
  component: ShadComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'dashboard', component: MapComponent, data: { title: 'Calix Cloud - SHAD' }
    },
    { path: 'router_management/:id', component: RouterManagementComponent, data: { title: 'Calix Cloud - SHAD' } },
    { path: 'router_management', component: RouterManagementComponent, data: { title: 'Calix Cloud - SHAD' } },
    { path: 'subscriber_services', component: SubscriberServicesComponent, data: { title: 'Calix Cloud - SHAD' } },
    { path: 'onboard_routers', component: OnboardedRoutersComponent, data: { title: 'Calix Cloud - SHAD' } },
    { path: 'block_page_template_list', component: BlockPageTemplateListComponent, data: { title: 'Calix Cloud - SHAD' } },
    { path: 'block_page_template/:id', component: BlockPageTemplateCreateComponent, data: { title: 'Calix Cloud - SHAD' } },
    { path: 'block_page_template', component: BlockPageTemplateCreateComponent, data: { title: 'Calix Cloud - SHAD' } },
    { path: 'block_page_template_update/:id', component: BlockPageTemplateUpdateComponent, data: { title: 'Calix Cloud - SHAD' } },
    { path: 'whitelabel', component: WhitelabelComponent, data: { title: 'Calix Cloud - SHAD' } },
    { path: 'whitelabel-create', component: WhitelabelCreateComponent, data: { title: 'Calix Cloud - SHAD' } },
    { path: 'whitelabel-update', component: WhitelabelUpdateComponent, data: { title: 'Calix Cloud - SHAD' } },
    { path: 'commandIQ', component: CommandIQWhiteLabelComponent, data: { title: 'Calix Cloud - SHAD' } },
    { path: "commandiq", component: CommandiqComponent, data: {title: 'Calix Cloud - SHAD'} },
    { path: "commandiq-create", component: CommandiqCreateComponent, data: {title: 'Calix Cloud - SHAD'} },
    { path: "commandiq-update", component: CommandiqUpdateComponent, data: {title: 'Calix Cloud - SHAD'} },
    { path: "commandWorx-create", component: CommandiqProCreateComponent, data: {title: 'Calix Cloud - SHAD'} },
    { path: "commandWorx-update", component: CommandiqProUpdateComponent, data: {title: 'Calix Cloud - SHAD'} },
    { path: "commandWorx", component: CommandiqProComponent, data: {title: 'Calix Cloud - SHAD'} },
    {
      path: '', redirectTo: 'dashboard', pathMatch: 'full', data: {
        title: 'Calix Cloud - SHAD'
      }
    }
    //  {path: 'block_page_template_view',component: BlockPageTemplateViewComponent,},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShadRoutingModule { }
