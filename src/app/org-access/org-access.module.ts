import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgAccessRoutingModule } from './org-access-routing.module';
import { OrgAccessComponent } from './org-access/org-access.component';
import { OrgAccessLayoutComponent } from './org-access-layout/org-access-layout.component';
import { OrgAccessSideMenuComponent } from './org-access-side-menu/org-access-side-menu.component';
import { OrgAccessHeaderComponent } from './org-access-header/org-access-header.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedUtilsModule } from '../shared-utils/shared-utils.module';
import { SysAdminModule } from '../sys-admin/sys-admin.module';

@NgModule({
  declarations: [OrgAccessComponent, OrgAccessLayoutComponent, OrgAccessSideMenuComponent, OrgAccessHeaderComponent, OrgAccessLayoutComponent],
  imports: [
    CommonModule,
    OrgAccessRoutingModule,
    DataTablesModule,
    SharedUtilsModule,
    SysAdminModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrgAccessModule { }
