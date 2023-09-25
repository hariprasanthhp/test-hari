import { ExcLogListStaleDeviceModel } from './../../shared/model/exc-log-list-stale-device.model';
import { StaleDevicePurgeModel } from './../../shared/model/stale-device-purge.model';
import { StaleDevicePurgeService } from './../../shared/service/stale-device-purge.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { AcessModifiers, SsoAuthService } from 'src/app/shared/services/sso-auth.service'
import { HttpClient, HttpParams } from '@angular/common/http';
import { listLogStaleDevicePurgePolicy } from '../../shared/service/endpoint';
import { DateUtilsService } from '../../../../shared-utils/date-utils.service'
import { environment } from 'src/environments/environment';
import { ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-stale-device-purge',
  templateUrl: './stale-device-purge.component.html',
  styleUrls: ['./stale-device-purge.component.scss'],
  //providers: [SsoAuthService, StaleDevicePurgeService]
})
export class StaleDevicePurgeComponent implements OnInit {
  showStaleDevicePurgeForm = true;
  language: any;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  languageSubject;
  associateDeviceValue: string = "No";
  policyStatus: boolean;
  staleDeviceFrequency: any;
  daysOfWeek: any;
  viewExecutionLog: boolean = false
  startTime: Date = new Date();
  timeZone = [];
  daysOfMonth = [];
  tableOptions: DataTables.Settings = {};
  orgId: string;
  tableCount: number;
  staleDevicePurgeObj: StaleDevicePurgeModel = new StaleDevicePurgeModel();
  public errorMsg: string;
  public showError: boolean = false;
  public showSuccess: boolean = false;
  public successMsg: string;
  loading: boolean = false;
  scopes: string;
  tableCounts;

  hasWriteAccess: boolean = false;
  excLogPolicObj: ExcLogListStaleDeviceModel[];
  hasScopeAccess = false;

  constructor(
    private translateService: TranslateService,
    private ssoAuthService: SsoAuthService,
    private staleDevicePurgeService: StaleDevicePurgeService,
    private http: HttpClient,
    private titleService: Title,
    private dateUtils: DateUtilsService,
    private router: Router,
  ) {
    this.timeZone = staleDevicePurgeService.getAllTimeZone();
    this.daysOfWeek = staleDevicePurgeService.getDaysOfWeek();
    this.daysOfMonth = staleDevicePurgeService.getDaysOfMonth();
    this.staleDeviceFrequency = staleDevicePurgeService.getFrequencyList();
    this.staleDevicePurgeObj.maxInactiveDays = 30;
    this.staleDevicePurgeObj.schedule.frequency = "Weekly"
    this.staleDevicePurgeObj.schedule.days = "Mon"
    this.staleDevicePurgeObj.schedule.timezone = "Etc/GMT+12"
    this.scopes = this.ssoAuthService.getScopes();
    this.orgId = this.ssoAuthService.getOrgId();


  }
  setTitle(url) {
    if (this.router.url.includes('cco-foundation')) {
      this.titleService.setTitle(`${this.language['Stale System Purge']} - ${this.language['settings']} - ${this.language['configuration']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);

    } else if (this.router.url.includes('cco/services/configuration/stale-system-purge')) {
      this.titleService.setTitle(`${this.language['Stale System Purge']} - ${this.language['configuration']} - ${this.language['Services']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);

    } else if (this.router.url.includes('/support/netops-management')) {
      this.titleService.setTitle(`${this.language['Stale System Purge']} - ${this.language['Configurations']} - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.redraw();
      this.setTitle(this.router.url);
    });
    this.setTitle(this.router.url);

    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco/services/configuration/stale-system-purge')) {
      if (environment.VALIDATE_SCOPE) {
        this.scopes['cloud.rbac.csc.netops.config.stale_purge'] = this.scopes['cloud.rbac.csc.netops.config.stale_purge'] ? this.scopes['cloud.rbac.csc.netops.config.stale_purge'] : [];
        if (this.scopes['cloud.rbac.csc.netops.config.stale_purge'].length) {
          this.hasScopeAccess = true;
        }
        if (this.scopes && (this.scopes['cloud.rbac.csc.netops.config.stale_purge'] && this.scopes['cloud.rbac.csc.netops.config.stale_purge'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;

        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    } else if (this.router.url.includes('cco/services/configuration/stale-system-purge')) {
      let enttlmnts = this.ssoAuthService.getEntitlements();
      if (this.router.url.includes('cco/services') && enttlmnts[210] && !enttlmnts[102]) {
        this.showStaleDevicePurgeForm = false;
      }

      let scopes = this.scopes;
      if (environment.VALIDATE_SCOPE) {
        if (scopes['cloud.rbac.coc.services.configuration.stalesystempurge']?.length) {
          this.hasScopeAccess = true;
        }
        if (scopes && (scopes['cloud.rbac.coc.services.configuration.stalesystempurge']?.includes('write'))) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    } else {
      if (environment.VALIDATE_SCOPE) {
        let scopes = this.scopes;
        scopes['cloud.rbac.foundation.configurations'] = scopes['cloud.rbac.foundation.configurations'] ? scopes['cloud.rbac.foundation.configurations'] : [];
        if (scopes['cloud.rbac.foundation.configurations'].length) {
          this.hasScopeAccess = true;
        }
        if (scopes && (scopes['cloud.rbac.foundation.configurations'].includes('write'))) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    }


    if (!this.hasScopeAccess) {
      this.ssoAuthService.setPageAccess(false);
      return;
    }

    this.fetchPolicy();
  }

  getExcLogPolicy(count: number) {
    // this.loading = true;
    const that = this;
    this.tableOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      ordering: false,
      dom: "tip",
      responsive: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.loading = true;
        that.http.get(
          listLogStaleDevicePurgePolicy + "?" + "policyId=" + this.staleDevicePurgeObj._id + "&skip=" + dataTablesParameters.start + "&limit=" + dataTablesParameters.length).subscribe((resp: ExcLogListStaleDeviceModel[]) => {
            resp.forEach((x, i) => {
              if (x.devices) {
                resp[i].successPurgeCount = x.devices.length;
              } if (x.failures) {
                resp[i].failurgePurgeCount = x.failures.length;
              }
              resp[i].timeZone = this.getTimezoneName(x.endTime);

              resp[i].startTime = this.dateUtils.getUserDateTime(resp[i].startTime, this.staleDevicePurgeObj.schedule.timezone);
            })
            this.loading = false;
            that.excLogPolicObj = resp;
            callback({
              recordsTotal: count,
              recordsFiltered: count,
              data: []
            });
            $("html, body").animate({ scrollTop: 0 }, "slow");
          }), error => {
            this.loading = false;
            this.errorMsg = error.error.error;
            this.showError = true;
            $("html, body").animate({ scrollTop: 0 }, "slow");
          }
      }, drawCallback: (settings) => {
        this.changeTableStatusLanguage(settings);
        let total = settings._iRecordsDisplay; // for server side rendering
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
        } else {
          //$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
        }
      }
    };
  }


  changeTableStatusLanguage(dtObj) {
    const nf = new Intl.NumberFormat();
    this.tableCounts = {
      searchText: dtObj.oPreviousSearch.sSearch.replace(/\s+/g, ""),
      total: dtObj._iRecordsTotal,
      displayCount: dtObj._iDisplayLength,
      displayed: dtObj._iRecordsDisplay,
      start: dtObj._iDisplayStart
    };
    const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr');
    const isSpanish = (sessionStorage.getItem('defaultLanguage') == 'es');
    const isGermen = (sessionStorage.getItem('defaultLanguage') == 'de_DE');
    const filtered = `${dtObj.oPreviousSearch.sSearch.replace(/\s+/g, "") ?
      (isFrench ?
        `(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` : isSpanish ? `(filtrado de un total de ${nf.format(dtObj._iRecordsTotal)} entradas)` :
          isGermen ? `(gefiltert aus ${nf.format(dtObj._iRecordsTotal)} Einträgen)` :
            `(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
      ''}`;
    const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
    const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
    $('div [role="status"]').text(isFrench ?
      `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` : isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` : isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered}` :
        `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
    );
    //$(".dataTables_filter label")[0].childNodes[0].nodeValue = isFrench ? 'Chercher:' : 'Search:';
    //$(".dataTables_length label")[0].childNodes[0].nodeValue = isFrench ? 'Afficher les ' : 'Show ';
    //$(".dataTables_length label")[0].childNodes[2].nodeValue = isFrench ? ' entrées' : ' entries';
    $(".first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Erste Seite' : 'First');
    $(".previous").text(isFrench ? 'Précédent' : isSpanish ? 'Anterior' : isGermen ? 'Zurück' : 'Previous');
    $(".next").text(isFrench ? 'Suivant' : isSpanish ? 'Siguiente' : isGermen ? 'Weiter' : 'Next');
    $(".last").text(isFrench ? 'Dernière' : isSpanish ? 'Último' : isGermen ? 'Letzte' : 'Last');
  }

  // changeTableStatusLanguage(dtObj) {
  //   const nf = new Intl.NumberFormat();
  //   this.tableCounts = {
  //     // searchText: dtObj.oPreviousSearch.sSearch.trim(),
  //     searchText: dtObj.oPreviousSearch.sSearch.replace(/\s+/g, ""),
  //     total: dtObj._iRecordsTotal,
  //     displayCount: dtObj._iDisplayLength,
  //     displayed: dtObj._iRecordsDisplay,
  //     start: dtObj._iDisplayStart
  //   };
  //   const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr');
  //   const isSpanish = (sessionStorage.getItem('defaultLanguage') == 'es');
  //   const filtered = `${dtObj.oPreviousSearch.sSearch.replace(/\s+/g, "") ?
  //     (isFrench ?
  //       `(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` : isSpanish ? `(zzzzz ${nf.format(dtObj._iRecordsTotal)} zzzzz)` :
  //         `(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
  //     ''}`;
  //   const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
  //   const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
  //   $('div [role="status"]').text(isFrench ?
  //     `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` : isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` :
  //       `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
  //   )
  //   // $(".first").text(isFrench ? 'Le début' : 'First');
  //   // $(".previous").text(isFrench ? 'Précédent' : 'Previous');
  //   // $(".next").text(isFrench ? 'Suivant' : 'Next');
  //   // $(".last").text(isFrench ? 'Dernière' : 'Last');
  //   $(".first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : 'First');
  //   $(".previous").text(isFrench ? 'Précédent' : isSpanish ? 'Anterior' : 'Previous');
  //   $(".next").text(isFrench ? 'Suivant' : isSpanish ? 'Siguiente' : 'Next');
  //   $(".last").text(isFrench ? 'Dernière' : isSpanish ? 'Último' : 'Last');
  // }

  redraw() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  getTimezoneName(dateValue: string) {
    const today = new Date(dateValue);
    const short = today.toLocaleDateString(undefined);
    const full = today.toLocaleDateString(undefined, { timeZoneName: 'long' });

    // Trying to remove date from the string in a locale-agnostic way
    const shortIndex = full.indexOf(short);
    if (shortIndex >= 0) {
      const trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);

      // by this time `trimmed` should be the timezone's name with some punctuation -
      // trim it from both sides
      return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '');

    } else {
      // in some magic case when short representation of date is not present in the long one,
      //just return the long one as a fallback, since it should contain the timezone's name
      return full;
    }
  }

  fetchPolicy() {
    this.loading = true;
    this.staleDevicePurgeService.getStaleDevicePurgePolicy(this.orgId).subscribe((policy: StaleDevicePurgeModel[]) => {
      this.loading = false;
      if (policy.length != 0) {
        this.staleDevicePurgeObj = policy[0];
        //sets the time
        this.setTIme(this.staleDevicePurgeObj.schedule.startTimeOfDay);
        //updates the radiobutton
        this.updateRadioButton();
        //updates the status field
        this.updatePolicyStatus();
        this.toggleExecutionLog()
      }
    }, error => {
      this.loading = false;
      this.showError = true;
      this.errorMsg = error.statusText;
    }
    )
  }

  setTIme(Time: string) {
    this.startTime = new Date();
    let splitedTime = Time.split(":");
    this.startTime.setHours(+splitedTime[0]);
    this.startTime.setMinutes(+splitedTime[1]);
    this.startTime.setMilliseconds(+splitedTime[2]);
  }

  updateRadioButton() {
    if (this.staleDevicePurgeObj.forceDeleteAssociatedDevices) {
      this.associateDeviceValue = 'Yes'
    } else {
      this.associateDeviceValue = 'No'
    }
  }

  updatePolicyStatus() {
    if (this.staleDevicePurgeObj.suspended) {
      this.policyStatus = false
    } else {
      this.policyStatus = true;
    }
  }

  OnToggleChange() {
    if (!this.showStaleDevicePurgeForm) {
      return;
    }
    if (this.policyStatus) {
      this.resumePolicy();
    } else {
      this.suspendPolicy();
    }
  }

  changeRadio(event) {
    if (event.srcElement.id == "radio02-01") {
      this.staleDevicePurgeObj.forceDeleteAssociatedDevices = true;
    } else {
      this.staleDevicePurgeObj.forceDeleteAssociatedDevices = false;
    }
  }

  onCancel() {
    this.fetchPolicy();
  }

  onSubmit() {
    //enter if policy already exist
    this.loading = true;
    if (this.staleDevicePurgeObj._id) {
      delete this.staleDevicePurgeObj?.orgId;
      this.staleDevicePurgeService.updateStaleDevicePurgePolicy(this.staleDevicePurgeObj, this.staleDevicePurgeObj._id)
        .subscribe(value => {
          this.showSuccess = true;
          this.successMsg = this.language['Updated_Successfully']
          setTimeout(() => {
            this.showSuccess = false;
            this.successMsg = "";
          }, 1000);
          this.fetchPolicy();
        }, error => {
          this.showError = true;
          this.errorMsg = error.error.error;
          this.loading = false;
        }
        )
    }//else create new policy
    else {
      this.staleDevicePurgeService.createStaleDevicePurgePolicy(this.staleDevicePurgeObj).subscribe(res => {
        this.showSuccess = true;
        this.successMsg = this.language['Successfully Created!']
        this.fetchPolicy();
      }, error => {
        this.showError = true;
        this.errorMsg = error.error.error;
        this.loading = false;
      }
      )
    }
  }

  resumePolicy() {
    this.staleDevicePurgeService.resumeStaleDevicePurgePolicyById(this.staleDevicePurgeObj._id, this.orgId).subscribe(res => {
      this.showSuccess = true;
      this.successMsg = this.language["Successfully_Resumed"]
      setTimeout(() => {
        this.fetchPolicy();
      }, 5000);

    }, error => {
      this.showError = true;
      this.errorMsg = error.error.error;
    }
    )
  }
  suspendPolicy() {
    this.staleDevicePurgeService.suspendStaleDevicePurgePolicyById(this.staleDevicePurgeObj._id, this.orgId).subscribe(res => {
      this.showSuccess = true;
      this.successMsg = this.language["Successfully_Suspended"]
      setTimeout(() => {
        this.fetchPolicy();
      }, 5000);
    }, error => {
      this.showError = true;
      this.errorMsg = error.error.error;
    }
    )
  }

  getExcLogPageCount() {
    if (this.staleDevicePurgeObj._id) {
      this.staleDevicePurgeService.getLogCountStaleDevicePurgePolicy(this.staleDevicePurgeObj._id).subscribe(res => {
        this.tableCount = res.count;
        if (this.viewExecutionLog) {
          this.redraw();
        } else {
          this.getExcLogPolicy(res.count);
          this.viewExecutionLog = true;
        }
      })
    } else {
      this.viewExecutionLog = true;
      this.tableOptions = {
        processing: false,
        ordering: false,
        dom: "t",
      }
    }
  }

  hideError() {
    this.showError = false;
    this.errorMsg = '';
  }
  hideSuccess() {
    this.showSuccess = false;
    this.successMsg = '';
  }

  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }

  onSelectStartTime(event) {
    let hour = ('0' + new Date(event).getHours()).substr(-2);
    let min = ('0' + new Date(event).getMinutes()).substr(-2);
    let sec = ('0' + new Date(event).getSeconds()).substr(-2);
    let selectedTime = hour + ":" + min + ":" + sec
    this.staleDevicePurgeObj.schedule.startTimeOfDay = selectedTime.toString();
  }


  onFrequencyChange() {
    if (this.staleDevicePurgeObj.schedule.frequency == "Weekly") {
      this.staleDevicePurgeObj.schedule.days = "Mon"
    } else {
      this.staleDevicePurgeObj.schedule.days = "1"
    }

  }

  toggleExecutionLog() {
    this.getExcLogPageCount();
  }
}
