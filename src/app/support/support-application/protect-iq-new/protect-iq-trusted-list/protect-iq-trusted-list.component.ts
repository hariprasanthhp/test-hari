import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { ProtectIqService } from '../../shared/service/protect-iq.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NavMenu } from '../../shared/models/nav-menu';

interface AlertType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-protect-iq-trusted-list',
  templateUrl: './protect-iq-trusted-list.component.html',
  styleUrls: ['./protect-iq-trusted-list.component.scss']
})

export class ProtectIqTrustedListComponent implements OnInit {

  language: any;
  languageSubject;
  menus: NavMenu[] = [
    {
      label: 'Primary Network',
      value: 'primary-network',
      state: 'active'
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
  alerts: AlertType[] = [
    { value: 'All', viewValue: 'All' },
    { value: 'IPS', viewValue: 'Intrusion' },
    { value: 'AV', viewValue: 'Virus' },
    { value: 'WG', viewValue: 'Web Threat' }
  ];

  loading = true;
  isLatestVersion = false;
  userId = '';
  roleId = 2;
  warningMessage: any;
  activeTab: string = "primary-network";
  selectedType: string = 'All';
  isExpanded = [];
  isExpandedSkipDevice = [];
  trustListDetails;

  constructor(
    private translateService: TranslateService,
    private protectIqservices: ProtectIqService,
    public ssoService: SsoAuthService
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.userId = history.state?.userId;
    this.isLatestVersion = history.state?.isLatestVersion;
    this.showTrustList();
  }

  showTrustList(isTabPress = false) {
    this.isExpanded = [];
    this.loading = true;
    this.trustListDetails = { whitelist: [] };
    if (isTabPress) this.selectedType = "All";

    this.protectIqservices.getTrustList(this.selectedType, this.userId, this.activeTab, this.roleId).subscribe((data: any) => {
      this.loading = false;
      this.trustListDetails = data?.body;
      this.trustListDetails.whitelist.forEach(() => {
        this.isExpanded.push(false);
      });
    }, error => {
      this.loading = false;
      if (error?.status != 404) this.warningMessage = this.protectIqservices.errorHandler(error);
    })
  }

  deleteWhiteListItem(whiteListItemId) {
    this.loading = true;
    this.protectIqservices.removeItemInTrustList(
      whiteListItemId,
      this.userId,
      this.ssoService.isSmbEnabled() ? this.activeTab : "", this.ssoService.isSmbEnabled() ? this.roleId : ""
    ).subscribe(() => {
      this.showTrustList();
    }, error => {
      this.loading = false;
      this.warningMessage = this.protectIqservices.errorHandler(error);
    })
  }

  selectedTab(activeTab) {
    this.activeTab = activeTab;
    this.selectedType = "All";
    if (this.activeTab == "primary-network") this.roleId = 1;
    if (this.activeTab == "staff-network") this.roleId = 2;
    if (this.activeTab == "customer-portal") this.roleId = 3;
    if (this.activeTab == "point-of-sale") this.roleId = 4;
    this.showTrustList();
  }

}
