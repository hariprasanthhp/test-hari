import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrgAdminsRoutingModule } from './org-admins-routing.module';
import { OrgAdminsComponent } from './org-admins.component';
import { SysAdminModule } from '../sys-admin/sys-admin.module';
import { OrgAdminsSideMenuComponent } from './org-admins-side-menu/org-admins-side-menu.component';
import { AdminsListComponent } from './admins-list/admins-list.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [OrgAdminsComponent, OrgAdminsSideMenuComponent, AdminsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    OrgAdminsRoutingModule,
    SysAdminModule,
    DataTablesModule,
  ]
})
export class OrgAdminsModule { }
