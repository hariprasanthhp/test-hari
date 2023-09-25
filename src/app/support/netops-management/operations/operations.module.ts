import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProfilesComponent } from './profiles/profiles.component';
import { SoftwareImagesListComponent } from './software-images-list/software-images-list.component';
import { WorkflowsComponent } from './workflows/workflows.component';
import { PerformanceTestingComponent } from './performance-testing/performance-testing.component';
import { InstanceWizardComponent } from './performance-testing/performance-wizard/instance-wizard/instance-wizard.component';
import { DevicesWizardComponent } from './performance-testing/performance-wizard/devices-wizard/devices-wizard.component';
import { ServerDetailsWizardComponent } from './performance-testing/performance-wizard/server-details-wizard/server-details-wizard.component';
import { ScheduleWizardComponent } from './performance-testing/performance-wizard/schedule-wizard/schedule-wizard.component';
import { ReviewWizardComponent } from './performance-testing/performance-wizard/review-wizard/review-wizard.component';
import { ProfileWizardComponent } from './profiles/profile-wizard/profile-wizard.component';
import { WorkflowWizardComponent } from './workflows/workflow-wizard/workflow-wizard.component';
import { WrkflowWizardOprParametersComponent } from './workflows/workflow-wizard/wrkflow-wizard-opr-parameters/wrkflow-wizard-opr-parameters.component';
import { WrkflowWizardScheduleParametersComponent } from './workflows/workflow-wizard/wrkflow-wizard-schedule-parameters/wrkflow-wizard-schedule-parameters.component';
import { ProfileBuildWizardComponent } from './profiles/profile-wizard/profile-build-wizard/profile-build-wizard.component';
import { ProfileReviewWizardComponent } from './profiles/profile-wizard/profile-review-wizard/profile-review-wizard.component';
import { ProfileStartWizardComponent } from './profiles/profile-wizard/profile-start-wizard/profile-start-wizard.component';
import { WorkflowWizardReviewComponent } from './workflows/workflow-wizard/workflow-wizard-review/workflow-wizard-review.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectDeviceGroupComponent } from './workflows/workflow-wizard/select-device-group/select-device-group.component';
import { StartWizardComponent } from './workflows/workflow-wizard/start-wizard/start-wizard.component';
import { DevicesGroupsComponent } from './devices-groups/devices-groups.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewCategoriesComponent } from './profiles/profile-wizard/profile-build-wizard/profile-category/add-new-categories/add-new-categories.component';
import { CalendarModule } from 'primeng/calendar';
import { ConfigurationFilesListComponent } from './configuration-files-list/configuration-files-list.component';
import { ConfigurationFilesFormComponent } from './configuration-files-form/configuration-files-form.component';
import { SoftwareImagesFormComponent } from './software-images-form/software-images-form.component';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { NgSelect2Module } from 'ng-select2';
import { CustomMinDirective } from './custom-directives/custom-min.directive'
import { CustomMaxDirective } from './custom-directives/custom-max.directive'
import { CustomNegDirective } from './custom-directives/custom-negetive.directive'
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SharedUtilsModule } from '../../../shared-utils/shared-utils.module';
import { DummyComponent } from './dummy/dummy.component'
import { ConfigurationModule } from '../configuration/configuration.module';
import { SharedModule } from '../../shared/shared.module';
import { DefaultWorkFlowComponent } from './workflows/default-work-flow/default-work-flow.component';
import { WorkflowAlarmWizardComponent } from './workflows/alarm-workflow-wizard/alarm-workflow-wizard.component';
import { SelectAlarmDeviceGroupComponent } from './workflows/alarm-workflow-wizard/select-alarm-device-group/select-alarm-device-group.component';
import { StartAlarmWizardComponent } from './workflows/alarm-workflow-wizard/start-alarm-wizard/start-alarm-wizard.component';
import { WorkflowAlarmWizardReviewComponent } from './workflows/alarm-workflow-wizard/workflow-alarm-wizard-review/workflow-alarm-wizard-review.component';
import { WrkflowAlarmWizardOprParametersComponent } from './workflows/alarm-workflow-wizard/wrkflow-alarm-wizard-opr-parameters/wrkflow-alarm-wizard-opr-parameters.component';
import { WrkflowAlarmWizardScheduleParametersComponent } from './workflows/alarm-workflow-wizard/wrkflow-alarm-wizard-schedule-parameters/wrkflow-alarm-wizard-schedule-parameters.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ExperienceIqRestrictionsFormComponent } from './profiles/profile-wizard/profile-build-wizard/profile-category/experience-iq-restrictions-form/experience-iq-restrictions-form.component';
import { AclForRemoteAccessComponent } from './profiles/profile-wizard/profile-build-wizard/profile-category/acl-for-remote-access/acl-for-remote-access.component';
import { SharedModule as shared } from 'src/app/shared/shared.module';
//import { TagInputModule } from 'ngx-chips';


@NgModule({
  declarations: [
    OperationsComponent,
    DevicesGroupsComponent,
    ProfilesComponent,
    InstanceWizardComponent,
    DevicesWizardComponent,
    ServerDetailsWizardComponent,
    ScheduleWizardComponent,
    ReviewWizardComponent,
    SoftwareImagesListComponent,
    WorkflowsComponent,
    PerformanceTestingComponent,
    ProfileWizardComponent,
    WorkflowWizardComponent,
    WrkflowWizardOprParametersComponent,
    WrkflowWizardScheduleParametersComponent,
    SelectDeviceGroupComponent,
    WrkflowAlarmWizardScheduleParametersComponent,
    SelectAlarmDeviceGroupComponent,
    WrkflowAlarmWizardOprParametersComponent,
    StartWizardComponent,
    StartAlarmWizardComponent,
    ProfileBuildWizardComponent,
    ProfileReviewWizardComponent,
    ProfileStartWizardComponent,
    WorkflowWizardReviewComponent,
    WorkflowAlarmWizardReviewComponent,
    AddNewCategoriesComponent,
    ConfigurationFilesListComponent,
    ConfigurationFilesFormComponent,
    SoftwareImagesFormComponent,
    CustomMinDirective,
    CustomMaxDirective,
    CustomNegDirective,
    DummyComponent,
    DefaultWorkFlowComponent,
    WorkflowAlarmWizardComponent,
    ExperienceIqRestrictionsFormComponent,
    AclForRemoteAccessComponent,
    
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    OperationsRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CalendarModule,
    NgSelect2Module,
    NgxMaterialTimepickerModule,
    SharedUtilsModule,
    ConfigurationModule,
    SharedModule,
    DragDropModule,
    shared,
    //TagInputModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class OperationsModule { }
