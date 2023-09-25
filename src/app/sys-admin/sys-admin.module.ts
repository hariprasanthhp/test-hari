import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SysAdminRoutingModule } from './sys-admin-routing.module';
import { SysAdminComponent } from './sys-admin.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { AddOrganizationComponent } from './add-organization/add-organization.component';
import { UsersComponent } from './users/users.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { BlackListUsersComponent } from './black-list-users/black-list-users.component';
import { BlackListAddUserComponent } from './black-list-add-user/black-list-add-user.component';
import { RolesComponent } from './roles/roles.component';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { CalixSupportCloudComponent } from './calix-support-cloud/calix-support-cloud.component';
import { OrganizationInfoComponent } from './organization-info/organization-info.component';
import { FlowConfigurationComponent } from './flow-configuration/flow-configuration.component';
import { OrganizationAccessControlComponent } from './organization-access-control/organization-access-control.component';
import { SsoConfigurationComponent } from './sso-configuration/sso-configuration.component';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { UserSecuredAccessComponent } from './user-secured-access/user-secured-access.component';
import { SecuredAccessComponent } from './secured-access/secured-access.component';
import { AddUserComponent } from './add-user/add-user.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { DataTablesModule } from 'angular-datatables';
import { FlowConfigModule } from '../flow-config/flow-config.module';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { SharedUtilsModule } from "../shared-utils/shared-utils.module";
import { FoundationComponent } from './foundation/foundation.component';
import { AdminCallOutcomeComponent } from './admin-call-outcome/admin-call-outcome.component';
import { ExternalTicketingSystemComponent } from './external-ticketing-system/external-ticketing-system.component';
import { Title } from '@angular/platform-browser';
import { MyCommunityIQComponent } from './my-community-iq/my-community-iq.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { USOCUploadComponent } from './usoc-upload/usoc-upload.component';
import { ZipCodeUploadComponent } from './zip-code-upload/zip-code-upload.component';
import { ZipCodeEntrylistComponent } from './zip-code-entrylist/zip-code-entrylist/zip-code-entrylist.component';
import { ApiUsageComponent } from './api-usage/api-usage.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { FederatedUserDetialsComponent } from './federated-user-detials/federated-user-detials.component';
import { SubscriberProspectUploadComponent } from './subscriber-prospect-upload/subscriber-prospect-upload.component';
import { SubscriberProspectListComponent } from './subscriber-prospect-list/subscriber-prospect-list.component';
import { SharedModule as shared } from 'src/app/shared/shared.module';
import { BillingPipelineStatusComponent } from './billing-pipeline-status/billing-pipeline-status.component';
import { MarketingCloudComponent } from './marketing-cloud/marketing-cloud.component';
import { BSPInformationComponent } from './my-community-iq/bsp-information/bsp-information.component';
import { CommunitiesComponent } from './my-community-iq/communities/communities.component';
import { ConfirmUsersComponent } from './my-community-iq/confirm-users/confirm-users.component';
import { CommunityUsersComponent } from './my-community-iq/community-users/community-users.component';
import { ApplicationsAuditComponent } from './applications-audit/applications-audit.component';
import { DevicesNamePlaceholderComponent } from '../sys-admin/devices-name-placeholder/devices-name-placeholder.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ChatbotCreateComponent } from './chatbot-create/chatbot-create.component';
const COMPONENTS = [
  OrganizationsListComponent,
  HeaderComponent,
  FooterComponent,
  UsersComponent,
  UsersDetailComponent,
  BlackListUsersComponent,
  BlackListAddUserComponent,
  RolesComponent,
  RoleDetailsComponent,
  AddRoleComponent,
  CalixSupportCloudComponent,
  OrganizationInfoComponent,
  ExternalTicketingSystemComponent,
  FlowConfigurationComponent,
  OrganizationAccessControlComponent,
  SsoConfigurationComponent,
  AddUserComponent,
  FoundationComponent,
  AccountManagementComponent,
  FederatedUserDetialsComponent,
  ChatbotComponent
];

@NgModule({
  declarations: [SysAdminComponent, OrganizationsListComponent, AddOrganizationComponent, 
    OrganizationDetailComponent, UserSecuredAccessComponent, SecuredAccessComponent, 
    ...COMPONENTS, SideMenuComponent, AdminCallOutcomeComponent, MyCommunityIQComponent,
     USOCUploadComponent, ZipCodeUploadComponent, ZipCodeEntrylistComponent, ApiUsageComponent,
      SubscriberProspectUploadComponent, SubscriberProspectListComponent, BillingPipelineStatusComponent,
      MarketingCloudComponent, BSPInformationComponent, CommunitiesComponent, ConfirmUsersComponent, CommunityUsersComponent,ApplicationsAuditComponent, DevicesNamePlaceholderComponent, ChatbotCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    SysAdminRoutingModule,
    DataTablesModule,
    FlowConfigModule,
    NgbModule,
    NgSelectModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    SharedUtilsModule,
    ColorPickerModule,
    shared,
  ],
  exports: [...COMPONENTS, OrganizationDetailComponent],
  providers: [Title],
  bootstrap: [OrganizationDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SysAdminModule { }
