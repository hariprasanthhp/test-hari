import { Component, OnInit } from '@angular/core';
import { NavMenu } from '../../shared/models/nav-menu';
import { TranslateService } from 'src/app-services/translate.service';
import { ProtectIqService } from '../../shared/service/protect-iq.service';

@Component({
  selector: 'app-protect-iq-security-settings',
  templateUrl: './protect-iq-security-settings.component.html',
  styleUrls: ['./protect-iq-security-settings.component.scss']
})
export class ProtectIqSecuritySettingsComponent implements OnInit {

  language: any;
  languageSubscription: any;
  menus: NavMenu[] = [
    {
      label: 'Primary Network',
      value: 'primary-network',
      state: 'active',
    },
    {
      label: 'Staff Network',
      value: 'staff-network',
    },
    {
      label: 'Point of Sale',
      value: 'point-of-sale',
    },
    {
      label: 'Customer Portal',
      value: 'customer-portal',
    },
  ];

  loading = true;
  isLatestVersion = false;
  errorMessage = '';
  userId = '';
  roleId = 0;
  securitySettings = {
    protocolAnomaly: false,
    portScanDefence: false,
  }

  constructor(
    public translateService: TranslateService,
    private protectIqService: ProtectIqService
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubscription = this.translateService.selectedLanguage.subscribe(language => {
      this.language = language;
    });
    this.userId = history.state.userId;
    this.isLatestVersion = history.state.isLatestVersion;
    this.loadData();
  }

  loadData() {
    this.loading = true;
    let apiCall = this.protectIqService.getSecurityList(this.userId);
    if (this.roleId) {
      apiCall = this.protectIqService.getSecurityListByRole(this.userId, this.roleId);
    }

    apiCall.subscribe((response: any) => {
      let securitySettings = response.securitySettings;
      if (securitySettings.count) {
        this.securitySettings = {
          protocolAnomaly: securitySettings.data.find(element => element.name == 'PA')?.enabled ?? false,
          portScanDefence: securitySettings.data.find(element => element.name == 'PSD')?.enabled ?? false,
        }
      }
      this.loading = false;
    }, error => {
      this.loading = false;
      this.errorMessage = this.protectIqService.errorHandler(error);
    });
  }

  onSettingChange(type) {
    this.loading = true;
    let payload = {
      userId: this.userId,
      roleId: this.roleId,
      securitySettings: [
        {
          type: type == 'PA' ? 1 : 2,
          enabled: type == 'PA' ? this.securitySettings.protocolAnomaly : this.securitySettings.portScanDefence,
        }
      ]
    };

    let apiCall = this.protectIqService.setSecuritySettings(payload);
    if (this.roleId) {
      payload['roleId'] = this.roleId;
      apiCall = this.protectIqService.setSecuritySettingsByRole(payload);
    }
    apiCall.subscribe(() => {
      this.loadData();
    }, error => {
      this.loading = false;
      this.errorMessage = this.protectIqService.errorHandler(error);
    });
  }

  selectedTab(activeTab) {
    this.roleId = 0;
    if (activeTab == 'staff-network') this.roleId = 2;
    if (activeTab == 'customer-portal') this.roleId = 3;
    if (activeTab == 'point-of-sale') this.roleId = 4;
    this.loadData();
  }

}
