import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MigrationsRoutingModule } from './migrations-routing.module';
import { MigrationsComponent } from './migrations.component';
import { MigrationMappingComponent } from './migration-mapping/migration-mapping.component';


@NgModule({
  declarations: [
    MigrationsComponent,
    MigrationMappingComponent
  ],
  imports: [
    CommonModule,
    MigrationsRoutingModule,
    DataTablesModule
  ]
})
export class MigrationsModule { }
