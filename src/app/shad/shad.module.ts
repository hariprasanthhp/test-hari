import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import { ShadRoutingModule } from './shad-routing.module';
import { ShadComponent } from './shad.component';
import { BlockPageTemplateCreateComponent } from './block-page-template-create/block-page-template-create.component';
import { BlockPageTemplateListComponent } from './block-page-template-list/block-page-template-list.component';
import { BlockPageTemplateUpdateComponent } from './block-page-template-update/block-page-template-update.component';
import { MapComponent } from './map/map.component';
import { OnboardedRoutersComponent } from './onboarded-routers/onboarded-routers.component';
import { RouterManagementComponent } from './router-management/router-management.component';
import { SubscriberServicesComponent } from './subscriber-services/subscriber-services.component';
import { ShadHeaderComponent } from './shad-header/shad-header.component';
import { ShadFooterComponent } from './shad-footer/shad-footer.component';
import { SharedUtilsModule } from "../shared-utils/shared-utils.module";
import { WhitelabelComponent } from './whitelabel/whitelabel.component';
import { WhitelabelCreateComponent } from './whitelabel-create/whitelabel-create.component';
import { WhitelabelUpdateComponent } from './whitelabel-update/whitelabel-update.component';
import { Title } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommandIQWhiteLabelComponent } from './command-iq-white-label/command-iq-white-label.component';


@NgModule({
  declarations: [ShadComponent, BlockPageTemplateCreateComponent, BlockPageTemplateListComponent, BlockPageTemplateUpdateComponent, MapComponent, OnboardedRoutersComponent, RouterManagementComponent, SubscriberServicesComponent, ShadHeaderComponent, ShadFooterComponent, WhitelabelComponent, WhitelabelCreateComponent, WhitelabelUpdateComponent, CommandIQWhiteLabelComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    ColorPickerModule,
    ShadRoutingModule,
    SharedUtilsModule
  ],
  providers: [Title, TitleCasePipe]
})
export class ShadModule { }
