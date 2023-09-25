import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgAdminRoutingModule } from './org-admin-routing.module';
import { OrgAdminComponent } from './org-admin.component';
import { SysAdminModule } from '../sys-admin/sys-admin.module';
import { OrgAdminSideMenuComponent } from './org-admin-side-menu/org-admin-side-menu.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { Title } from '@angular/platform-browser';


@NgModule({
  declarations: [OrgAdminComponent, OrgAdminSideMenuComponent],
  imports: [
    CommonModule,
    OrgAdminRoutingModule,
    SysAdminModule,
    ColorPickerModule
  ],
  providers: [Title],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrgAdminModule { }
