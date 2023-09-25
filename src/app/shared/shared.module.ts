import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimSpaceDirective } from './directives/trim-space.directive';
import { AutofocusDirective } from './directives/autofocus.directive';
import { AddServicesComponent } from '../cco/system/cco-subscriber-system/add-service-system/add-services/add-services.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MultiSelectComponent } from './components/multi-select/multi-select.component'
import { AlertModalComponent } from './alert-modal/alert-modal.component';

@NgModule({
  declarations: [
    TrimSpaceDirective,
    AutofocusDirective,
    AddServicesComponent,
    MultiSelectComponent,
    AlertModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports: [TrimSpaceDirective, AutofocusDirective, AddServicesComponent, MultiSelectComponent, AlertModalComponent]
})
export class SharedModule { }
