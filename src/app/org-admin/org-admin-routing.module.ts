import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockPageTemplateCreateComponent } from '../shad/block-page-template-create/block-page-template-create.component';
import { BlockPageTemplateListComponent } from '../shad/block-page-template-list/block-page-template-list.component';
import { BlockPageTemplateUpdateComponent } from '../shad/block-page-template-update/block-page-template-update.component';
import { CommandIQWhiteLabelComponent } from '../shad/command-iq-white-label/command-iq-white-label.component';
import { WhitelabelCreateComponent } from '../shad/whitelabel-create/whitelabel-create.component';
import { WhitelabelUpdateComponent } from '../shad/whitelabel-update/whitelabel-update.component';
import { WhitelabelComponent } from '../shad/whitelabel/whitelabel.component';
import { AccountManagementComponent } from '../sys-admin/account-management/account-management.component';
import { AddRoleComponent } from '../sys-admin/add-role/add-role.component';
import { AddUserComponent } from '../sys-admin/add-user/add-user.component';
import { AdminCallOutcomeComponent } from '../sys-admin/admin-call-outcome/admin-call-outcome.component';
import { ApiUsageComponent } from '../sys-admin/api-usage/api-usage.component';
import { BillingPipelineStatusComponent } from '../sys-admin/billing-pipeline-status/billing-pipeline-status.component';
import { BlackListAddUserComponent } from '../sys-admin/black-list-add-user/black-list-add-user.component';
import { BlackListUsersComponent } from '../sys-admin/black-list-users/black-list-users.component';
import { CalixSupportCloudComponent } from '../sys-admin/calix-support-cloud/calix-support-cloud.component';
import { AddComponent } from '../sys-admin/cco-admin/call-home/add/add.component';
import { CallHomeComponent } from '../sys-admin/cco-admin/call-home/call-home.component';
import { ExternalTicketingSystemComponent } from '../sys-admin/external-ticketing-system/external-ticketing-system.component';
import { FederatedUserDetialsComponent } from '../sys-admin/federated-user-detials/federated-user-detials.component';
import { MyCommunityIQComponent } from '../sys-admin/my-community-iq/my-community-iq.component';
//import { FlowConfigurationComponent } from '../sys-admin/flow-configuration/flow-configuration.component';
import { OrganizationAccessControlComponent } from '../sys-admin/organization-access-control/organization-access-control.component';
import { OrganizationInfoComponent } from '../sys-admin/organization-info/organization-info.component';
import { RoleDetailsComponent } from '../sys-admin/role-details/role-details.component';
import { RolesComponent } from '../sys-admin/roles/roles.component';
import { SsoConfigurationComponent } from '../sys-admin/sso-configuration/sso-configuration.component';
import { SubscriberProspectListComponent } from '../sys-admin/subscriber-prospect-list/subscriber-prospect-list.component';
import { SubscriberProspectUploadComponent } from '../sys-admin/subscriber-prospect-upload/subscriber-prospect-upload.component';
import { UsersDetailComponent } from '../sys-admin/users-detail/users-detail.component';
import { UsersComponent } from '../sys-admin/users/users.component';
import { USOCUploadComponent } from '../sys-admin/usoc-upload/usoc-upload.component';
import { ZipCodeEntrylistComponent } from '../sys-admin/zip-code-entrylist/zip-code-entrylist/zip-code-entrylist.component';
import { ZipCodeUploadComponent } from '../sys-admin/zip-code-upload/zip-code-upload.component';
import { FlowConfigurationComponent } from './flow-configuration/flow-configuration.component';
import { OrgAdminComponent } from './org-admin.component';
import { MarketingCloudComponent } from '../sys-admin/marketing-cloud/marketing-cloud.component';
import { ConfirmUsersComponent } from '../sys-admin/my-community-iq/confirm-users/confirm-users.component';
import { ApplicationsAuditComponent } from '../sys-admin/applications-audit/applications-audit.component';
import { DevicesNamePlaceholderComponent } from '../sys-admin/devices-name-placeholder/devices-name-placeholder.component';
import { ChatbotCreateComponent } from '../sys-admin/chatbot-create/chatbot-create.component';
import { ChatbotComponent } from '../sys-admin/chatbot/chatbot.component';

const routes: Routes = [
  {
    path: '',
    component: OrgAdminComponent,
    //canActivate: [AuthGuard],
    data: { title: 'Calix Cloud - Org Admin' },
    children: [
      {
        path: "users",
        component: UsersComponent,
        data: { title: 'Calix Cloud - Org Admin' },

      },
      {
        path: "addUser",
        component: AddUserComponent,
        data: { title: 'Calix Cloud - Calix Admin' },

      },
      {
        path: "usersDetail",
        component: UsersDetailComponent,
        data: { title: 'Calix Cloud - Org Admin' },
      },
      {
        path: "blacklist",
        component: BlackListUsersComponent,
        data: { title: 'Calix Cloud - Org Admin' },

      },
      {
        path: "blacklistAddUser",
        component: BlackListAddUserComponent,
        data: { title: 'Calix Cloud - Org Admin' },

      },
      {
        path: "roles",
        component: RolesComponent,
        data: { title: 'Calix Cloud - Org Admin' },

      },
      {
        path: "roleDetails",
        component: RoleDetailsComponent,
        data: { title: 'Calix Cloud - Org Admin' },

      },
      {
        path: "addRole",
        component: AddRoleComponent,
        data: { title: 'Calix Cloud - Org Admin' },

      },
      // {
      //   path: "csccfg",
      //   component: CalixSupportCloudComponent,
      //   data: { title: 'Calix Cloud - Org Admin' },

      // },
      {
        path: "csccfg",
        loadChildren:
          () => import('../sys-admin/calix-support-cloud/calix-support-cloud.module').then(m => m.CalixSupportCloudModule)
      },
      {
        path: "orginfo",
        component: OrganizationInfoComponent,
        data: { title: 'Calix Cloud - Org Admin' },

      },
      {
        path: "externalticketingsystem",
        component: ExternalTicketingSystemComponent,
        data: { title: 'Calix Cloud - Org Admin' },

      },
      {
        path:'SmartTownWi-Fi/confirm-users',
        component:ConfirmUsersComponent
      },
      {
        path: "SmartTownWi-Fi",
        loadChildren: () => import('../sys-admin/my-community-iq/my-community-iq.module').then(m => m.MyCommunityIqModule),
        component:MyCommunityIQComponent,
        data: { title: 'Calix Cloud - Org Admin' }

      },
      {
        path: 'USOC-Upload',
        component: USOCUploadComponent,
        data: { title: 'Calix Cloud - Org Admin' }
      },
      {
        path: "flowAnalyze",
        loadChildren:
          () => import('./flow-configuration/flow-configuration.module').then(m => m.FlowConfigurationModule)
      },
      {
        path: "orgacl",
        component: OrganizationAccessControlComponent,
        data: { title: 'Calix Cloud - Org Admin' },

      },
      {
        path: "sso",
        component: SsoConfigurationComponent,
        data: { title: 'Calix Cloud - Org Admin' },
      },
      {
        path: "admin-call-outcome",
        component: AdminCallOutcomeComponent,
        data: { title: 'Calix Cloud - Org Admin' },
      },
      // {
      //   path: "call-home",
      //   component: CallHomeComponent,
      //   data: { title: 'Calix Cloud - Call Home' }
      // },
      // {
      //   path: "call-home/add",
      //   component: AddComponent,
      //   data: { title: 'Calix Cloud - Call Home' }
      // },
      // {
      //   path: "call-home/edit/:id",
      //   component: AddComponent,
      //   data: { title: 'Calix Cloud - Call Home' }
      // },
      {
        path: "foundation",
        loadChildren: () => import('../sys-admin/foundation/foundation.module').then(m => m.FoundationModule),
      },
      // {
      //   path: "cco-admin",
      //   loadChildren: () => import('../sys-admin/cco-admin/cco-admin.module').then(m => m.CcoAdminModule),
      // },
      {
        path: "mobile-app",
        loadChildren: () => import('../sys-admin/mobile-app/mobile-app.module').then(m => m.MobileAppModule),
      },
      {
        path: "call-home", component: CallHomeComponent
      },
      {
        path: "call-home/add",
        component: AddComponent,
        data: { title: 'Calix Cloud - Call Home' }
      },
      {
        path: "call-home/edit/:id",
        component: AddComponent,
        data: { title: 'Calix Cloud - Call Home' }
      },
      {
        path: 'zip-code-upload',
        component: ZipCodeUploadComponent
      },
      {
        path: 'zip-code-entrylist',
        component: ZipCodeEntrylistComponent
      },
      { path: 'block_page_template_list', component: BlockPageTemplateListComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'block_page_template/:id', component: BlockPageTemplateCreateComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'block_page_template', component: BlockPageTemplateCreateComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'block_page_template_update/:id', component: BlockPageTemplateUpdateComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'whitelabel', component: WhitelabelComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'commandIQ', component: CommandIQWhiteLabelComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'whitelabel-create', component: WhitelabelCreateComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'whitelabel-update', component: WhitelabelUpdateComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'api-usage', component: ApiUsageComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'account-management', component: AccountManagementComponent, data: { title: 'Calix Cloud - Account Management' } },
      { path: 'federated-user-details', component: FederatedUserDetialsComponent, data: { title: 'Calix Cloud - Account Management - User details' } },
      { path: 'subscriber-prospect-upload', component: SubscriberProspectUploadComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'subscriber-prospect-list', component: SubscriberProspectListComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'billing-pipeline-status', component: BillingPipelineStatusComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'engagement-cloud', component:MarketingCloudComponent},
      { path: 'applications-audit', component: ApplicationsAuditComponent },
      { path: 'devices-name-placeholder', component:DevicesNamePlaceholderComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'chatbot', component:ChatbotComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'chatbot-create', component: ChatbotCreateComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: '', redirectTo: 'users', pathMatch: 'full', }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgAdminRoutingModule { }
