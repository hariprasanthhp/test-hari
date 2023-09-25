import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AxosCallhomeRoutingModule } from './axos-callhome-routing.module';
import { AxosCallhomeComponent } from './axos-callhome.component';


@NgModule({
  declarations: [
    AxosCallhomeComponent
  ],
  imports: [
    CommonModule,
    AxosCallhomeRoutingModule
  ]
})
export class AxosCallhomeModule { }
