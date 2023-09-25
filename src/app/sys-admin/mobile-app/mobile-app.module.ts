import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileAppRoutingModule } from './mobile-app-routing.module';
import { MobileAppComponent } from './mobile-app.component';
import { CommandiqComponent } from './commandiq/commandiq.component';
import { CommandiqProComponent } from './commandiq-pro/commandiq-pro.component';
import { SupportInformationComponent } from './support-information/support-information.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { CommandiqCreateComponent } from './commandiq-create/commandiq-create.component';
import { CommandiqUpdateComponent } from './commandiq-update/commandiq-update.component';
import { CommandiqProCreateComponent } from './commandiq-pro-create/commandiq-pro-create.component';
import { CommandiqProUpdateComponent } from './commandiq-pro-update/commandiq-pro-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MobileAppComponent,
    CommandiqComponent,
    CommandiqProComponent,
    SupportInformationComponent,
    CommandiqCreateComponent,
    CommandiqUpdateComponent,
    CommandiqProCreateComponent,
    CommandiqProUpdateComponent
  ],
  imports: [
    CommonModule,
    MobileAppRoutingModule,
    SharedModule,
    ColorPickerModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MobileAppModule { }
