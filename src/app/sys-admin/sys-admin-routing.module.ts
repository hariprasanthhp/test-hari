import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockPageTemplateCreateComponent } from '../shad/block-page-template-create/block-page-template-create.component';
import { BlockPageTemplateListComponent } from '../shad/block-page-template-list/block-page-template-list.component';
import { BlockPageTemplateUpdateComponent } from '../shad/block-page-template-update/block-page-template-update.component';
import { CommandIQWhiteLabelComponent } from '../shad/command-iq-white-label/command-iq-white-label.component';
import { WhitelabelCreateComponent } from '../shad/whitelabel-create/whitelabel-create.component';
import { WhitelabelUpdateComponent } from '../shad/whitelabel-update/whitelabel-update.component';
import { WhitelabelComponent } from '../shad/whitelabel/whitelabel.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { AddOrganizationComponent } from './add-organization/add-organization.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminCallOutcomeComponent } from './admin-call-outcome/admin-call-outcome.component';
import { ApiUsageComponent } from './api-usage/api-usage.component';
import { BlackListAddUserComponent } from './black-list-add-user/black-list-add-user.component';
import { BlackListUsersComponent } from './black-list-users/black-list-users.component';
import { CalixSupportCloudComponent } from './calix-support-cloud/calix-support-cloud.component';
import { ExternalTicketingSystemComponent } from './external-ticketing-system/external-ticketing-system.component';
import { FederatedUserDetialsComponent } from './federated-user-detials/federated-user-detials.component';
import { FlowConfigurationComponent } from './flow-configuration/flow-configuration.component';
import { MarketingCloudComponent } from './marketing-cloud/marketing-cloud.component';
import { MyCommunityIQComponent } from './my-community-iq/my-community-iq.component';
import { OrganizationAccessControlComponent } from './organization-access-control/organization-access-control.component';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { OrganizationInfoComponent } from './organization-info/organization-info.component';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { RolesComponent } from './roles/roles.component';
import { SecuredAccessComponent } from './secured-access/secured-access.component';
import { SsoConfigurationComponent } from './sso-configuration/sso-configuration.component';
import { SubscriberProspectListComponent } from './subscriber-prospect-list/subscriber-prospect-list.component';
import { SubscriberProspectUploadComponent } from './subscriber-prospect-upload/subscriber-prospect-upload.component';
import { SysAdminComponent } from './sys-admin.component';
import { UserSecuredAccessComponent } from './user-secured-access/user-secured-access.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { UsersComponent } from './users/users.component';
import { USOCUploadComponent } from './usoc-upload/usoc-upload.component';
import { ZipCodeEntrylistComponent } from './zip-code-entrylist/zip-code-entrylist/zip-code-entrylist.component';
import { ZipCodeUploadComponent } from './zip-code-upload/zip-code-upload.component';
import { ConfirmUsersComponent } from './my-community-iq/confirm-users/confirm-users.component';
import { ApplicationsAuditComponent } from './applications-audit/applications-audit.component';
import { OrganizationIdGuard } from '../shared/guards/organization-id.guard';
import { DevicesNamePlaceholderComponent } from '../sys-admin/devices-name-placeholder/devices-name-placeholder.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ChatbotCreateComponent } from './chatbot-create/chatbot-create.component';


const routes: Routes = [
  {
    path: '',
    component: SysAdminComponent,
    //canActivate: [AuthGuard],
    data: { title: 'Calix Cloud - Org Admin' },
    children: [
      {
        path: "organizations",
        component: OrganizationsListComponent,
        data: { title: 'Calix Cloud - Calix Admin' },

      },

      {
        path: "addOrg",
        component: AddOrganizationComponent,
        data: { title: 'Calix Cloud - Calix Admin' },

      },
      {
        path: "orgSecuredAccess",
        component: SecuredAccessComponent,
        data: { title: 'Calix Cloud - Calix Admin' },
        canActivate: [OrganizationIdGuard]

      },
      {
        path: "UserSecuredAccess",
        component: UserSecuredAccessComponent,
        data: { title: 'Calix Cloud - Calix Admin' },
        canActivate: [OrganizationIdGuard]

      },
      {
        path: "orgDetail",
        component: OrganizationDetailComponent,
        data: { title: 'Calix Cloud - Calix Admin' },
        canActivate: [OrganizationIdGuard]
      },
      {
        path: "users",
        component: UsersComponent,
        data: { title: 'Calix Cloud - Org Admin' },
        canActivate: [OrganizationIdGuard]
      },
      {
        path: "addUser",
        component: AddUserComponent,
        data: { title: 'Calix Cloud - Calix Admin' },
        canActivate: [OrganizationIdGuard]
      },
      {
        path: "usersDetail",
        component: UsersDetailComponent,
        data: { title: 'Calix Cloud - Org Admin' },
        canActivate: [OrganizationIdGuard]
      },
      {
        path: "blacklist",
        component: BlackListUsersComponent,
        data: { title: 'Calix Cloud - Org Admin' },
        canActivate: [OrganizationIdGuard]
      },
      {
        path: "blacklistAddUser",
        component: BlackListAddUserComponent,
        data: { title: 'Calix Cloud - Org Admin' },
        canActivate: [OrganizationIdGuard]
      },
      {
        path: "roles",
        component: RolesComponent,
        data: { title: 'Calix Cloud - Org Admin' },
        canActivate: [OrganizationIdGuard]
      },
      {
        path: "roleDetails",
        component: RoleDetailsComponent,
        data: { title: 'Calix Cloud - Org Admin' },
        canActivate: [OrganizationIdGuard]
      },
      {
        path: "addRole",
        component: AddRoleComponent,
        data: { title: 'Calix Cloud - Org Admin' },
        canActivate: [OrganizationIdGuard]
      },
      {
        path: "csccfg",
        loadChildren:
          () => import('./calix-support-cloud/calix-support-cloud.module').then(m => m.CalixSupportCloudModule),
        canActivate: [OrganizationIdGuard]
      },
      {
        path: "orginfo",
        component: OrganizationInfoComponent,
        data: { title: 'Calix Cloud - Org Admin' },
        canActivate: [OrganizationIdGuard]
      },
      {
        path: "externalticketingsystem",
        component: ExternalTicketingSystemComponent,
        data: { title: 'Calix Cloud - Org Admin' },

      },
      // {
      //   path: "flowAnalyze",
      //   component: FlowConfigurationComponent,
      // },
      {
        path: "flowAnalyze",
        loadChildren:
          () => import('./flow-configuration/flow-configuration.module').then(m => m.FlowConfigurationModule),
        canActivate: [OrganizationIdGuard]
      },
      {
        path: "orgacl",
        component: OrganizationAccessControlComponent,
        data: { title: 'Calix Cloud - Org Admin' },
        canActivate: [OrganizationIdGuard]
      },
      {
        path: "sso",
        component: SsoConfigurationComponent,
        data: { title: 'Calix Cloud - Org Admin' },
        canActivate: [OrganizationIdGuard]
      },
      {
        path: "admin-call-outcome",
        component: AdminCallOutcomeComponent,
        data: { title: 'Calix Cloud - Org Admin' },
        canActivate: [OrganizationIdGuard]
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
        loadChildren:
          () => import('./foundation/foundation.module').then(m => m.FoundationModule)
      },
      {
        path: "cco-admin",
        loadChildren: () => import('../sys-admin/cco-admin/cco-admin.module').then(m => m.CcoAdminModule),
        canActivate: [OrganizationIdGuard]
      },
      {
        path: "mobile-app",
        loadChildren: () => import('../sys-admin/mobile-app/mobile-app.module').then(m => m.MobileAppModule),
        canActivate: [OrganizationIdGuard]
      },
      { path: 'block_page_template_list', component: BlockPageTemplateListComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'block_page_template/:id', component: BlockPageTemplateCreateComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'block_page_template', component: BlockPageTemplateCreateComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'block_page_template_update/:id', component: BlockPageTemplateUpdateComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'whitelabel', component: WhitelabelComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'commandIQ', component: CommandIQWhiteLabelComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'whitelabel-create', component: WhitelabelCreateComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'whitelabel-update', component: WhitelabelUpdateComponent, data: { title: 'Calix Cloud - Org Admin' } },
      {
        path:'SmartTownWi-Fi/confirm-users',
        component:ConfirmUsersComponent
      },
      { path: 'SmartTownWi-Fi', component: MyCommunityIQComponent,  loadChildren: () => import('../sys-admin/my-community-iq/my-community-iq.module').then(m => m.MyCommunityIqModule),
      data: { title: 'Calix Cloud - Org Admin' }},
      { path: 'SmartTownWi-Fi', component: MyCommunityIQComponent, data: { title: 'Calix Cloud - Org Admin' }, canActivate: [OrganizationIdGuard] },

      { path: 'USOC-Upload', component: USOCUploadComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'applications-audit', component: ApplicationsAuditComponent, canActivate: [OrganizationIdGuard] },
      { path: '', redirectTo: 'organizations', pathMatch: 'full' },

      { path: 'zip-code-upload', component: ZipCodeUploadComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'zip-code-entrylist', component: ZipCodeEntrylistComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'account-management', component: AccountManagementComponent, data: { title: 'Calix Cloud - Account Management' } },
      { path: 'federated-user-details', component: FederatedUserDetialsComponent, data: { title: 'Calix Cloud - Account Management - User details' } },
      { path: 'subscriber-prospect-upload', component: SubscriberProspectUploadComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'subscriber-prospect-list', component: SubscriberProspectListComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'api-usage', component: ApiUsageComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'engagement-cloud', component:MarketingCloudComponent},
      { path: 'devices-name-placeholder', component:DevicesNamePlaceholderComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'chatbot', component:ChatbotComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: 'chatbot-create', component: ChatbotCreateComponent, data: { title: 'Calix Cloud - Org Admin' } },
      { path: '', redirectTo: 'organizations', pathMatch: 'full', },
    ]
  },
  { path: 'cco-admin', loadChildren: () => import('./cco-admin/cco-admin.module').then(m => m.CcoAdminModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysAdminRoutingModule { }
