import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MigrationsRgRoutingModule } from './migrations-rg-routing.module';
import { MigrationsRgComponent } from './migrations-rg.component';
import { MigrationMappingComponent } from './migration-mapping/migration-mapping.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    MigrationsRgComponent,
    MigrationMappingComponent
  ],
  imports: [
    CommonModule,
    MigrationsRgRoutingModule,
    DataTablesModule
  ]
})
export class MigrationsRgModule { }
