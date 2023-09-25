import { Component, OnInit } from '@angular/core';
import { NavMenu } from '../../shared/models/nav-menu';
import { TranslateService } from 'src/app-services/translate.service';
import { ProtectIqService } from '../../shared/service/protect-iq.service';

@Component({
  selector: 'app-protect-iq-skipped-devices',
  templateUrl: './protect-iq-skipped-devices.component.html',
  styleUrls: ['./protect-iq-skipped-devices.component.scss']
})
export class ProtectIqSkippedDevicesComponent implements OnInit {

  language: any;
  languageSubscription: any;
  loading = true;
  isLatestVersion = false;
  menus: NavMenu[] = [
    {
      label: 'Primary Network',
      value: 'primary-network',
      state: 'active',
    }
  ];

  scopeFlag = {
    configWrite: true
  };
  errorMessage = '';
  userId: '';
  skipDevicesDetails = [];
  isExpandedSkipDevice = [];

  constructor(
    public translateService: TranslateService,
    private protectIqService: ProtectIqService,
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubscription = this.translateService.selectedLanguage.subscribe(language => {
      this.language = language;
    });
    this.scopeFlag.configWrite = history.state.configWrite;
    this.userId = history.state.userId;
    this.isLatestVersion = history.state.isLatestVersion;
    this.loadData();
  }

  loadData(resetAccordian = true) {
    this.loading = true;
    if (resetAccordian) this.isExpandedSkipDevice = [];

    this.protectIqService.getSkipList(this.userId).subscribe((data: any) => {
      this.loading = false;
      this.skipDevicesDetails = data;
      Object.keys(this.skipDevicesDetails).forEach(() => {
        this.isExpandedSkipDevice.push(false);
      });
    }, error => {
      this.loading = false;
      this.errorMessage = this.protectIqService.errorHandler(error);
    });
  }

  toggleSkipStatus(deviceId, status) {
    this.loading = true;
    let payload = {
      userId: this.userId,
      deviceId: deviceId,
      skip: !status
    }

    this.protectIqService.updateSkipStatus(payload).subscribe(() => {
      this.loadData(false);
    }, error => {
      this.loading = false;
      this.errorMessage = this.protectIqService.errorHandler(error);
    });
  }

  toggleDevicesSkipStatus(status: boolean) {
    this.loading = true;
    let payload = {
      userId: this.userId,
      skip: status
    }

    this.protectIqService.setAllSkipStatus(payload).subscribe(() => {
      this.loadData(false);
    }, (err) => {
      this.loading = false;
      this.errorMessage = this.protectIqService.errorHandler(err);
    });
  }

  selectedTab(activeTab) {
    // format inputs here
    this.loadData();
  }

}
