import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { SupportWifiService } from 'src/app/support/support-wifi/services/support-wifi.service';

@Component({
  selector: 'network-resilience',
  templateUrl: './network-resilience.component.html',
  styleUrls: ['./network-resilience.component.scss']
})
export class NetworkResilienceComponent implements OnInit {

  language: any;
  languageSubscription: any;
  deviceConfigurationForm: FormGroup;

  loading = true;
  siteScanLoading = false;
  connectionSuccess = false;
  connectionFailed = false;
  showPassPhrase = false;
  invalidPasswordLength = false;
  hotspotButtonVisibility = true;
  disableHotspotName = true;
  disableSelect = false;
  disablePassword = true;
  // disableTestHotspot = true;
  disableOwner = false;
  disablePos = false;
  backupWanExists = false;
  backupWanTestCompleted = false;
  backupWanGetStatusCompleted = false;

  userid = '';
  backUpWifiId = '';
  errorMessage = '';
  selectedSsid = '';
  selectedSecuritytype = 0;
  siteScanResult = [];

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    public translateService: TranslateService,
    private ssoAuthService: SsoAuthService,
    private supportWifiService: SupportWifiService,
  ) { }

  ngOnInit(): void {
    this.userid = localStorage.getItem('ciquserid');
    this.language = this.translateService.defualtLanguage;
    this.titleService.setTitle(`${this.language['Network Resilience']} - ${this.language['SmartBiz']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    this.languageSubscription = this.translateService.selectedLanguage.subscribe(selectedLanguage => {
      this.language = selectedLanguage;
      this.titleService.setTitle(`${this.language['Network Resilience']} - ${this.language['SmartBiz']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Network Resilience']} - ${this.language['Wifi']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    this.initDeviceConfigurationForm();
    this.getBackupWifiInfo(false);
  }

  initDeviceConfigurationForm() {
    this.deviceConfigurationForm = this.formBuilder.group({
      id: [],
      userId: this.userid,
      ssid: [{
        value: '',
        disabled: this.disableHotspotName,
      }],
      password: [{
        value: '',
        disabled: true,
      }, Validators.minLength(8)],
      appliedTraffic: this.formBuilder.group({
        owner: [{
          value: true,
          disabled: this.disableOwner,
        }],
        pos: [{
          value: true,
          disabled: this.disablePos,
        }],
        staff: [{
          value: false,
          disabled: false,
        }],
        customer: [{
          value: false,
          disabled: false,
        }],
      })
    });
  }

  get ssid() {
    return this.deviceConfigurationForm.value.ssid;
  }

  get staff() {
    return this.deviceConfigurationForm.getRawValue().appliedTraffic.staff;
  }

  get customer() {
    return this.deviceConfigurationForm.getRawValue().appliedTraffic.customer;
  }

  submitHotspotDetails(updateOnly) {
    if (updateOnly && !this.deviceConfigurationForm.value.id) return;
    this.loading = true;
    let formValue = this.deviceConfigurationForm.getRawValue();
    let apiCall = this.supportWifiService.backupwanwifiupdate(formValue);
    if (!this.deviceConfigurationForm.value.id) {
      delete formValue.id;
      apiCall = this.supportWifiService.backupwanwifiadd(formValue);
    }

    apiCall.subscribe(() => {
      this.loading = false;
      if (!updateOnly) {
        setTimeout(() => {
          let i = 0;
          this.getBackupWifiInfo(true);
          const statusInterval = setInterval(() => {
            i++;
            if (!this.backupWanExists) {
              clearInterval(statusInterval);
              this.getBackupWifiInfo(true);
            } else if (i == 3) {
              clearInterval(statusInterval);
            } else {
              clearInterval(statusInterval);
            }
          }, 10000);
        }, 10000);
      }
    }, error => {
      this.pageErrorHandle(error);
      this.loading = false;
    });
  }

  getBackupWifiInfo(startConnectionTest) {
    this.loading = true;
    this.supportWifiService.backupwanwifi(this.userid).subscribe((response: any) => {
      if (!response.backupWifis.length) {
        this.onHotspotNameChanged();
        this.loading = false;
        return;
      }
      this.backupWanExists = true;
      let backUpWifi = response.backupWifis[0];
      this.backUpWifiId = backUpWifi.id;
      if (!backUpWifi.password) {  // secured user 
        // this.disablePassword = true;
        this.deviceConfigurationForm.get('password').disable();
      }
      if (backUpWifi.ssid) this.deviceConfigurationForm.get('password').enable(); //this.disablePassword = false;

      this.deviceConfigurationForm.patchValue(backUpWifi);
      this.deviceConfigurationForm.controls['password'].markAsTouched();
      this.onHotspotNameChanged();

      if (startConnectionTest) {
        this.startBackupWanTest();
      } else {
        this.getBackupWanTestStatus();
      }
      // this.loading = false;
    }, error => {
      this.loading = false;
      this.pageErrorHandle(error);
    });
  }

  getBackupWanTestStatus() {
    this.loading = true;
    this.backupWanGetStatusCompleted = false;

    this.supportWifiService.teststatusbw(this.userid, this.backUpWifiId).subscribe((response: any) => {
      this.loading = false;
      if (response.failReason == "" && response.result == "success") {
        this.hotspotButtonVisibility = false;
      } else {
        this.backupWanGetStatusCompleted = true;
        this.hotspotButtonVisibility = true;
      }
    }, error => {
      this.loading = false;
      this.pageErrorHandle(error);
    });
  }

  startBackupWanTest() {
    this.loading = true;
    const request = {
      "userId": this.userid,
      "id": this.backUpWifiId,
    };
    this.supportWifiService.teststartbw(request).subscribe(() => {
      this.loading = false;
      setTimeout(() => {
        let i = 0;
        this.getBackupWanTestStatusPeriodically();
        const statusInterval = setInterval(() => {
          i++;
          if (!this.backupWanTestCompleted && i != 17) {
            this.getBackupWanTestStatusPeriodically();
          } else if (i == 17) {
            this.backupWanTestCompleted = true;
            this.hotspotButtonVisibility = true;
            this.connectionFailed = true;
            this.loading = false;
            clearInterval(statusInterval);
          } else {
            clearInterval(statusInterval);
          }
        }, 10000);
      }, 10000);
    }, error => {
      this.loading = false;
      this.pageErrorHandle(error);
    });
  }

  getBackupWanTestStatusPeriodically() {
    this.backupWanTestCompleted = false;
    this.supportWifiService.teststatusbw(this.userid, this.backUpWifiId).subscribe((response: any) => {
      if (response.result == 'success') {
        this.backupWanTestCompleted = true;
        this.hotspotButtonVisibility = false;
        this.connectionSuccess = true;
        this.loading = false;
        setTimeout(() => {
          let i = 0;
          this.getBackupWanTestStatus();
          const statusInterval = setInterval(() => {
            i++;
            if (!this.backupWanGetStatusCompleted && i != 3) {
              this.getBackupWanTestStatus()
            } else if (i == 3) {
              this.backupWanGetStatusCompleted = false;
              clearInterval(statusInterval);
            } else {
              clearInterval(statusInterval);
            }
          }, 60000);
        }, 60000);
      } else if (response.result == 'failed') {
        this.backupWanTestCompleted = true;
        this.hotspotButtonVisibility = true;
        this.connectionFailed = true;
        this.loading = false;
      } else {
        this.backupWanTestCompleted = false;
      }
    }, error => {
      this.loading = false;
      this.pageErrorHandle(error);
    });
  }

  endHotspot() {
    this.loading = true;
    const request = {
      "userId": this.userid,
      "id": this.backUpWifiId,
    };
    this.supportWifiService.teststopbw(request).subscribe(() => {
      this.loading = false;
      this.hotspotButtonVisibility = true;
    }, error => {
      this.loading = false;
      this.pageErrorHandle(error);
    });
  }

  runSiteScan() {
    this.disableSelect = true;
    this.siteScanLoading = true;

    this.supportWifiService.sitestartbw({ "userId": this.userid }).subscribe(() => {
      setTimeout(() => {
        let i = 0;
        this.sitescanresult();
        const statusInterval = setInterval(() => {
          i++;
          if (!this.siteScanResult.length) {
            this.sitescanresult();
            clearInterval(statusInterval);
          } else if (i == 3) {
            clearInterval(statusInterval);
          } else {
            clearInterval(statusInterval);
          }
        }, 1000);
      }, 1000);
    }, error => {
      this.siteScanLoading = false;
      this.pageErrorHandle(error);
    });
  }

  sitescanresult() {
    this.siteScanResult = [];
    this.supportWifiService.sitescanresultbw(this.userid).subscribe((response: any) => {
      this.siteScanLoading = false;
      this.siteScanResult = response.wifis;
    }, error => {
      this.siteScanLoading = false;
      this.pageErrorHandle(error);
    });
  }

  onHotspotNameChanged() {
    if (this.deviceConfigurationForm.getRawValue().ssid) {
      this.deviceConfigurationForm.get('appliedTraffic.staff').enable();
      this.deviceConfigurationForm.get('appliedTraffic.customer').enable();
    } else {
      this.deviceConfigurationForm.get('appliedTraffic.staff').disable();
      this.deviceConfigurationForm.get('appliedTraffic.customer').disable();
    }
  }

  signalStrength(signalStrength) {
    let type = parseInt(signalStrength);
    if (type == 0) {
      return './assets/images/wifi-icons/WiFi0.png';
    } else {
      return './assets/images/wifi-icons/WiFi' + type + '.svg';
    }
  }

  siteSelected(ssid, securitytype) {
    this.disableSelect = false;
    // this.deviceConfigurationForm.patchValue({
    //   ssid
    // });
    this.selectedSsid = ssid;
    this.selectedSecuritytype = securitytype;
  }

  submitSelectedSSID() {
    if (this.selectedSecuritytype == 0) {
      this.deviceConfigurationForm.get('password').setValidators(Validators.minLength(8));
    } else {
      this.deviceConfigurationForm.get('password').setValidators([
        Validators.required,
        Validators.minLength(8),
      ]);
    }
    this.deviceConfigurationForm.controls['password'].markAsTouched();
    this.deviceConfigurationForm.patchValue({
      ssid: this.selectedSsid,
      password: ""
    });
    this.deviceConfigurationForm.get('password').enable();
    this.onHotspotNameChanged();
  }

  onPasswordChange() {
    this.deviceConfigurationForm.patchValue({
      password: this.deviceConfigurationForm.value.password ? this.deviceConfigurationForm.value.password.trim() : ''
    });
  }

  togglePasswordVisibility() {
    this.showPassPhrase = !this.showPassPhrase;
  }

  pageErrorHandle(err: any) {
    if (err.status === 401) {
      this.errorMessage = this.language['Access Denied'];
    } else {
      this.errorMessage = this.ssoAuthService.pageErrorHandle(err);
    }
  }

}
