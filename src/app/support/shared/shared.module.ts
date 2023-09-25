import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoComponent } from './component/user-info/user-info.component';

import { SubscriberMenuComponent } from './component/subscriber-menu/subscriber-menu.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortDeviceDataPipe } from './sort-device-data.pipe';
import { EmptyDataComponent } from '../../shared/components/dummy-component/dummy.component';
import { BooleanConverterPipe } from './custom-pipes/boolean-converter.pipe';
import { FrequencyBandPipe } from './custom-pipes/frequency-band.pipe';
import { CustomMaxDirective } from './custom-directives/custom-max.directive';
import { CustomMinDirective } from './custom-directives/custom-min.directive';
import { CustomNumMaxDirective } from './custom-directives/custom-num-max.directive';
import { CustomNumMinDirective } from './custom-directives/custom-num-min.directive';
import { CustomNegDirective } from './custom-directives/custom-negetive-val.directive';
import { HighlightSearch } from './custom-pipes/highlight.pipe';
import { HighLowDirective } from './custom-directives/high-low.directives';
import { CustomIpIsBeforeDirective } from './custom-directives/ip-address-is-before.directive';
import { CustomIpNetworkBroadcastDirective } from './custom-directives/ip-network-broadcast.directive';
import { CustomIpOutsideDirective } from './custom-directives/ip-outside.directive'
import { CustomIpsameNetworkDirective } from './custom-directives/ip-same-Network.directive';
import { CustomMaxNetworkBroadcastDirective } from './custom-directives/max-network-broadcast.directive'
import { CustomMinNetworkBroadcastDirective } from './custom-directives/min-network-broadcast.directive'
import { CustomDnsValidationDirective } from './custom-directives/custom-dns-validation.directive';
import { BeaconTypeConverterPipe } from './custom-pipes/beaconTypeConverter.pipe';
import { CustomUniqueNameDirective } from './custom-directives/custom-unique-name.directive';
import { CustomWhiteSpaceDirective } from './custom-directives/custom-white-space-directive';
import { CustomPatternDirective } from './custom-directives/custom-pattern.directive';
import { WpaEncryptionConverterPipe } from './custom-pipes/wpa-encryption-converter.pipe';
import { CustomDropdownDirective } from './custom-directives/custom-dropdown-directive';
import { DropdownMenuDirective } from './custom-directives/dropdown-menu-directive';
import { DropdownToggleDirective } from './custom-directives/dropdown-toggle-directive';
import { WeekDaysPipe } from './custom-pipes/week-days.pipe';
import { AlertTypePipe } from './custom-pipes/alert-type.pipe'
import { DeviceCatogryPipe } from './custom-pipes/device-catogry.pipe';
import { ExperianceIQStatusPipe } from './custom-pipes/experianceiq-status-pipe'
import { ExperianceIQUsagePipe } from './custom-pipes/experianceIq-usage.pipe'
import { SkipDeviceIconPipe } from './custom-pipes/skip-device-icon-pipe';
import { CustomAlwaysAllowPipe } from './custom-pipes/custom-always-allow.pipe';
import { CustomAppTimePipe } from './custom-pipes/custom-app-time.pipe'
import { MinToHoursPipe } from './custom-pipes/minutes-to-hours.pipe';
import { DeviceStatusPipe } from './custom-pipes/device-status.pipe';
import { AlertTypeConverterPipe } from './custom-pipes/exp-alert-type.pipe';
import { DeviceImagePipe } from './custom-pipes/device-image.pipe';
import { CustomStartsWithDirective } from './custom-directives/custom-starts-with.directive';
import { CustomEndsWithDirective } from './custom-directives/custom-ends-with.directive';
import { CustomDigitCheckDirective } from './custom-directives/custom-digit-check-directive.directive';
import { SortSystemsDataPipe } from './sort-systems-data.pipe';
import { ShortnumberPipe } from './custom-pipes/shortnumber.pipe'
import { OnboardingConverter } from './custom-pipes/onboardingConverter.pipe';
import { CustomLabelControl } from './custom-directives/custom-label-control.directive';
import { CustomReplacePipe } from './custom-pipes/coustom-replace.pipe';
import { CustomdecimalpointDirective } from './custom-directives/customdecimalpoint.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharedModule as shared } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [UserInfoComponent, SubscriberMenuComponent, EmptyDataComponent, SortDeviceDataPipe,
    BooleanConverterPipe, FrequencyBandPipe, CustomMinDirective, CustomMaxDirective, CustomNumMaxDirective,
    CustomNumMinDirective, CustomNegDirective, HighlightSearch, HighLowDirective, CustomIpIsBeforeDirective,
    CustomIpNetworkBroadcastDirective, CustomIpOutsideDirective, CustomIpsameNetworkDirective, WpaEncryptionConverterPipe,
    CustomMaxNetworkBroadcastDirective, CustomMinNetworkBroadcastDirective, CustomDnsValidationDirective,
    BeaconTypeConverterPipe, CustomUniqueNameDirective, CustomWhiteSpaceDirective, CustomPatternDirective,
    CustomDropdownDirective, DropdownMenuDirective, DropdownToggleDirective, WeekDaysPipe, AlertTypePipe, DeviceCatogryPipe,
    CustomDropdownDirective, DropdownMenuDirective, DropdownToggleDirective, WeekDaysPipe, ExperianceIQStatusPipe,
    ExperianceIQUsagePipe, SkipDeviceIconPipe, CustomAlwaysAllowPipe, CustomAppTimePipe, MinToHoursPipe,
    DeviceStatusPipe, AlertTypeConverterPipe, DeviceImagePipe, CustomEndsWithDirective, CustomStartsWithDirective,
    CustomDigitCheckDirective, CustomReplacePipe,
    SortSystemsDataPipe, CustomLabelControl,
    ShortnumberPipe, OnboardingConverter, CustomdecimalpointDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    DataTablesModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    MultiSelectModule,
    shared,
  ],
  exports: [UserInfoComponent, SubscriberMenuComponent, CommonModule, EmptyDataComponent, FormsModule, RouterModule,
    SortDeviceDataPipe, FrequencyBandPipe, BooleanConverterPipe, CustomMinDirective, CustomMaxDirective,
    CustomNumMaxDirective, CustomNumMinDirective, CustomNegDirective, HighlightSearch, HighLowDirective, WpaEncryptionConverterPipe,
    CustomIpIsBeforeDirective, CustomIpNetworkBroadcastDirective, BeaconTypeConverterPipe, CustomPatternDirective,
    CustomIpOutsideDirective, CustomIpsameNetworkDirective, CustomDnsValidationDirective, CustomUniqueNameDirective,
    CustomMaxNetworkBroadcastDirective, CustomMinNetworkBroadcastDirective, CustomWhiteSpaceDirective,
    CustomDropdownDirective, DropdownMenuDirective, DropdownToggleDirective, WeekDaysPipe, AlertTypePipe, DeviceCatogryPipe,
    CustomDropdownDirective, DropdownMenuDirective, DropdownToggleDirective, WeekDaysPipe, ExperianceIQStatusPipe,
    ExperianceIQUsagePipe, SkipDeviceIconPipe, CustomAlwaysAllowPipe, CustomAppTimePipe, MinToHoursPipe,
    DeviceStatusPipe, AlertTypeConverterPipe, DeviceImagePipe, CustomEndsWithDirective, CustomStartsWithDirective,
    CustomDigitCheckDirective, OnboardingConverter, CustomLabelControl,
    SortSystemsDataPipe, ShortnumberPipe, CustomReplacePipe, CustomdecimalpointDirective
  ],
  providers: [ShortnumberPipe]
})
export class SharedModule { }
