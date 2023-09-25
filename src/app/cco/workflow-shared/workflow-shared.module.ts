import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { RecepientsComponent } from './recepients/recepients.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SummaryRecepientsComponent } from './summary-recepients/summary-recepients.component';
import { SmsConsentComponent } from './sms-consent/sms-consent.component';


const COMPONENTS = [
  DetailsComponent,
  RecepientsComponent,
  SummaryRecepientsComponent,
  SmsConsentComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  exports: [...COMPONENTS],
  schemas: [NO_ERRORS_SCHEMA]
})
export class WorkflowSharedModule { }
