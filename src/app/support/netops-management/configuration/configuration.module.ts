import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { SecureOnboardingComponent } from './secure-onboarding/secure-onboarding.component';
import { SelfHealComponent } from './self-heal/self-heal.component';
import { StaleDevicePurgeComponent } from './stale-device-purge/stale-device-purge.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DialPlanComponent } from './dial-plan/dial-plan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialPlanNewComponent } from './dial-plan/dial-plan-new/dial-plan-new.component';
import { ExternalFileServerListComponent } from './external-file-server-list/external-file-server-list.component';
import { ExternalFileServerFormComponent } from './external-file-server-form/external-file-server-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubnetConfigComponent } from './subnet-config/subnet-config.component';
import { IsEllipsisDirective } from '../../../shared/directives/is-ellipsis.directive';
import { CalendarModule } from 'primeng/calendar';
import { SharedUtilsModule } from '../../../shared-utils/shared-utils.module';
import { SharedModule } from './../../shared/shared.module';
import { SpeedTestComponent } from './speed-test/speed-test.component';
import { BackgroundSiteScanComponent } from './background-site-scan/background-site-scan.component';
import { EdgeSuiteComponent } from './edge-suite/edge-suite.component';
import { QualityExperienceComponent } from './quality-experience/quality-experience.component';
import { SharedModule as shared } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    ConfigurationComponent, SecureOnboardingComponent,
    SelfHealComponent, StaleDevicePurgeComponent, DialPlanComponent,
    SubnetConfigComponent, IsEllipsisDirective,
    ExternalFileServerListComponent, DialPlanNewComponent, ExternalFileServerFormComponent,
    SubnetConfigComponent,
    SpeedTestComponent,
    BackgroundSiteScanComponent,
    EdgeSuiteComponent,
    QualityExperienceComponent,
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    ConfigurationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    CalendarModule,
    SharedUtilsModule,
    SharedModule,
    shared,
  ],
  exports: [SubnetConfigComponent]
})

export class ConfigurationModule { }
