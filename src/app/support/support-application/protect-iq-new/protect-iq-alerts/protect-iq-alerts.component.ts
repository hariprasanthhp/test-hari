import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { ProtectIqService } from '../../shared/service/protect-iq.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NotifListModel } from '../../shared/models/protectIqAlertModel';

interface AlertType {
  label: string;
  value: string;
}

@Component({
  selector: 'app-protect-iq-alerts',
  templateUrl: './protect-iq-alerts.component.html',
  styleUrls: ['./protect-iq-alerts.component.scss']
})
export class ProtectIqAlertsComponent implements OnInit {

  language: any;
  languageSubscription: any;
  alertTypes: AlertType[] = [
    {
      label: 'All',
      value: 'All',
    },
    {
      label: 'Intrusion',
      value: 'IPS',
    },
    {
      label: 'Virus',
      value: 'AV',
    },
    {
      label: 'Web Threat',
      value: 'WG',
    },
  ];

  loading = true;
  isError = true;
  userId = '';
  errorMessage = '';
  selectedType;
  alerts = [];
  isExpanded = [];

  constructor(
    public translateService: TranslateService,
    private ssoAuthService: SsoAuthService,
    private protectIqService: ProtectIqService,
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubscription = this.translateService.selectedLanguage.subscribe(language => {
      this.language = language;
    });
    this.selectedType = 'All';
    this.userId = history.state.userId;
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.isError = false;
    this.alerts = [];
    this.isExpanded = [];

    this.protectIqService.getAlerts(this.userId, this.selectedType).subscribe((data: any) => {
      this.loading = false;
      this.alerts = data?.body?.datas || [];
      this.alerts.forEach(() => {
        this.isExpanded.push(false);
      });
    }, error => {
      if (error?.status != 404) this.ssoAuthService.pageErrorHandle(error);
      this.loading = false;
    })
  }

  addToTrustList(alertDetail) {
    this.loading = true;
    let whiteListDetail: NotifListModel = {
      userId: this.userId,
      type: alertDetail?.securityAlarm?.type,
      signatureId: alertDetail?.securityAlarm?.signatureId,
      url: alertDetail?.securityAlarm?.url,
      message: alertDetail?.securityAlarm?.message,
      notifId: alertDetail?.notifId,
    }

    this.protectIqService.addWhitelistDetails(whiteListDetail).subscribe(() => {
      this.loadData();
    }, (error) => {
      this.ssoAuthService.pageErrorHandle(error);
      this.loading = false;
    })
  }

  getAlertLabel(value) {
    return this.alertTypes.find(alert => alert.value == value)?.label ?? '-';
  }

}
