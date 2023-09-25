import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndpointComponent } from './endpoint.component';
import { EndpointRoutingModule } from './endpoint-routing.module';
import { SharedModule } from '../../../cco/traffic/shared/shared.module';

@NgModule({
    declarations: [
        EndpointComponent
    ],
    imports: [
        CommonModule,
        EndpointRoutingModule,
        SharedModule
    ]
})
export class EndpointModule { }
