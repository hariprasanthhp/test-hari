import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { forkJoin, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cco-alarm-notifications',
  templateUrl: './cco-alarm-notifications.component.html',
  styleUrls: ['./cco-alarm-notifications.component.scss'],
})
export class CcoAlarmNotificationsComponent implements OnInit, AfterViewInit {
  types: any = ['OPTICAL_OUTLIERS',
    'EARLY_WARN_PON_CAP',
    'EARLY_WARN_ETH_CAP',
    'EARLY_WARN_PON_LOSS',
    'outage',
    'optical',
  ];

  healthTypes: any = ['OPTICAL_OUTLIERS',
    'EARLY_WARN_PON_CAP',
    'EARLY_WARN_ETH_CAP',
    'EARLY_WARN_PON_LOSS',
    'outliers',
    'optical',
  ];

  urls: any = {
    add: {
      outage: '/cco/outage-workflow',
      optical: '/cco/notifications/health/OPTICAL_OUTLIERS/add',
      outliers: '/cco/notifications/health/OPTICAL_OUTLIERS/add',
      OPTICAL_OUTLIERS: '/cco/notifications/health/OPTICAL_OUTLIERS/add',
      EARLY_WARN_PON_CAP: '/cco/notifications/health/EARLY_WARN_PON_CAP/add',
      EARLY_WARN_ETH_CAP: '/cco/notifications/health/EARLY_WARN_ETH_CAP/add',
      EARLY_WARN_PON_LOSS: '/cco/notifications/health/EARLY_WARN_PON_LOSS/add'
    },
    edit: {
      outage: '/cco/outage-workflow',
      optical: '/cco/notifications/health/OPTICAL_OUTLIERS/edit/',
      outliers: '/cco/notifications/health/OPTICAL_OUTLIERS/add',
      OPTICAL_OUTLIERS: '/cco/notifications/health/OPTICAL_OUTLIERS/edit/',
      EARLY_WARN_PON_CAP: '/cco/notifications/health/EARLY_WARN_PON_CAP/edit/',
      EARLY_WARN_ETH_CAP: '/cco/notifications/health/EARLY_WARN_ETH_CAP/edit/',
      EARLY_WARN_PON_LOSS: '/cco/notifications/health/EARLY_WARN_PON_LOSS/edit/'
    }

  };
  notificationTypes: any = [];

  map = {
    outage: 'Service Disruption',
    alarm: 'Alarm',
    outliers: 'Optical Outliers',
    'OPTICAL_OUTLIERS': 'Optical Outliers',
    'EARLY_WARN_PON_CAP': 'Early Warning PON Capacity',
    'EARLY_WARN_ETH_CAP': 'Early Warning Ethernet Capacity',
    'EARLY_WARN_PON_LOSS': 'Early Warning PON Loss'
  }
  @ViewChild('notificationModal', { static: true }) private notificationModal: TemplateRef<any>;
  language;
  languageSubject;
  searchtext: string;
  ccoAlarmNotificationsText: any;
  showcloseicon: boolean = false;
  renderedOnce: boolean = true;
  deletedata: any;
  modalInfo: any;
  btnDisabled: boolean;
  errorMsg: string = undefined;
  dataAvailable: boolean;
  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  filterSelected = 'all';
  filterArray = [
    { id: "all", name: "All Types" },
    { id: "alarm", name: "Alarm" },
    { id: "outage", name: "Service Disruption" },
    { id: "OPTICAL_OUTLIERS", name: "Optical Outliers" },
    { id: "EARLY_WARN_PON_CAP", name: "Early Warning PON Capacity" },
    { id: "EARLY_WARN_ETH_CAP", name: "Early Warning Ethernet Capacity" },
    { id: "EARLY_WARN_PON_LOSS", name: "Early Warning PON Loss" },
  ]
  // @ViewChild(DataTableDirective, { static: false })
  // datatableElement: DataTableDirective;
  // dtInstance: Promise<DataTables.Api>;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  frTable: DataTables.LanguageSettings;
  germanTable: DataTables.LanguageSettings;
  dtTrigger: Subject<any> = new Subject();
  alarmWorkFlowList = [];
  baseUrl = `${environment.API_BASE_URL}analytics-engine/`;
  loading: boolean;
  pageAvailable: boolean;
  cco_entitlement: boolean = false;
  esTable: DataTables.LanguageSettings;
  hasWriteAccess: boolean = false;
  modalRef: any;
  notificatonForm = this.fb.group({
    notificaton: ['alarm', Validators.required],
  });
  disableBtnForstrtNtfcn = true;
  searchInput = '';
  errors: any = [];
  showRecipients = false;
  constructor(
    private http: HttpClient,
    private translateService: TranslateService,
    private router: Router,
    private commonOrgService: CommonService,
    private service: SsoAuthService,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private dateUtils: DateUtilsService
  ) {

    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.germanTable = this.translateService.de_DE;
  }

  ngOnInit(): void {
    this.notificatonForm.valueChanges.subscribe((value: any) => {
      console.log(value);
      this.disableBtnForstrtNtfcn = false;
    });
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data: any) => {
        this.loading = true;
        this.language = data;
        this.tableLanguageOptions();
        this.reloadTable(true);
        this.titleService.setTitle(`${this.language['Notifications']} - ${this.language['Alarm & Health Notifications']} - ${this.language['Alarms']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
      }
    );

    this.notificationTypes = [
      { id: 'alarm', name: 'Alarm', content: 'Get notified when alarms are triggered' },
      { id: 'outage', name: 'Service Disruption', content: 'Receive an immediate service disruption notification for monitored areas' },
      { id: 'optical', name: 'Optical Outliers', content: 'Receive a weekly report on selected OLT systems' },
      { id: "EARLY_WARN_PON_CAP", name: "Early Warning PON Capacity", content: "Receive a weekly report on siginificant PON capacity changes" },
      { id: "EARLY_WARN_ETH_CAP", name: "Early Warning Ethernet Capacity", content: "Receive a weekly report on  siginificant Ethernet capacity changes" },
      { id: "EARLY_WARN_PON_LOSS", name: "Early Warning PON Loss", content: "Receive a weekly report on  siginificant PON Loss" },
    ];

    this.titleService.setTitle(`${this.language['Notifications']} - ${this.language['Alarm & Health Notifications']} - ${this.language['Alarms']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    let enttlmnts = this.service.getEntitlements();
    if (enttlmnts[210] && !enttlmnts[102]) {
      this.cco_entitlement = true;
    }
    this.renderedOnce = true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      paging: true,
      processing: false,
      dom: 'tipr',
      autoWidth: false,
      // stateSave: true,
      // stateDuration: -1,
      columnDefs: [
        { targets: [0], orderable: true, width: '23%' },
        { targets: [1], width: '23%' },
        { targets: [2], width: '23%' },
        { targets: [3], width: '16%' },
        { targets: [6], width: '15%', orderable: false, className: 'dt-right' },

      ],
      order: [0, 'asc'],
      // columnDefs: [{targets : [2], width : '140'},{ targets: [3], orderable: false, className: 'dt-right', width : '140' }],
    };
    if (this.cco_entitlement) {
      this.dtOptions['columnDefs'][4]['visible'] = false;
    }
    this.searchtext = history?.state?.ccoAlarmNotificationsText || '';
    let scopes = this.service.getScopes();

    if (environment.VALIDATE_SCOPE) {
      if (scopes && (scopes['cloud.rbac.coc.operations.alarms.alarmsandhealthnotifications']?.indexOf('write') !== -1)) {
        this.hasWriteAccess = true;
      } else {
        this.dtOptions['columnDefs'][4]['visible'] = false;
      }
    }
    this.tableLanguageOptions();
    this.getAlarmWorkflowList();
  }
  ngAfterViewInit(): void {
    // this.rerender();
    this.dtTrigger.next();
  }
  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    } else if (this.language && this.language.fileLanguage && this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.germanTable;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }
  closeicon(text) {
    this.searchtext = ""
    this.showcloseicon = false
    this.search(this.searchtext);
  }
  search(term: string) {
    if (term.length) this.showcloseicon = true;
    else this.showcloseicon = false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns(0).search(term).draw();
    });
    this.loading = false;
  }
  renderTable(rerender?) {
    this.tableLanguageOptions();
    if (this.renderedOnce) {
      this.rerender();
      setTimeout(() => {
        this.dataAvailable = true;
        this.renderedOnce = false;
        this.loading = false;
      }, 200)
    } else {
      this.rerender();
      this.dataAvailable = false;
      this.loading = true;
      setTimeout(() => {
        this.dataAvailable = true;
        this.loading = false;
      }, 200)
    }
    setTimeout(() => {
      if (this.searchtext) {
        this.search(this.searchtext);
      }
    }, 200)

  }

  rerender(search?): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.clear();
      dtInstance.destroy();
      this.dtTrigger.next();
    });
    setTimeout(() => {
      if (search) {
        this.search(this.searchtext);
      }
    }, 1000)

  }

  reloadTable(search?): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
    setTimeout(() => {
      if (search) {
        this.search(this.searchtext);
      }
    }, 1000)

  }

  closeAlert(index?: any) {
    this.error = false;

    if (typeof index !== 'undefined') {
      this.errors.splice(index, 1);
      this.errors = [...this.errors];
    }

  }
  getAlarmWorkflowList() {
    this.alarmWorkFlowList = [];
    if (this.filterSelected == 'all') {
      this.getData();
      return;
    }

    let urls = {
      alarm: `${this.baseUrl}workflows`,
      outage: `${this.baseUrl}outageworkflows`,
      //outliers: `${environment.API_BASE_URL}health/config/notifications`
    }
    this.loading = true;
    this.error = false;
    this.errorInfo = undefined;

    let url = urls[this.filterSelected];
    url = url ? url : `${environment.API_BASE_URL}health/config/notifications?type=${this.filterSelected}`;
    this.http.get(url).subscribe(
      (res: any) => {

        if (res && res.length > 0) {
          res = res.filter((el) => el);
          res.forEach((element) => {
            if (element) {
              element['mod_status'] = element['status'];
              element['ui_modified_notification_type_display'] = this.map[this.filterSelected];
              element['ui_modified_notification_type'] = element?.type ? element?.type : this.filterSelected;
              if (element['status'] == 'RUN') {
                element['mod_status'] = 'Running';
              } else if (element['status'] == 'PAUSE') {
                element['mod_status'] = 'Paused';
              } else if (element['status'] == 'DRAFT') {
                element['mod_status'] = 'Draft';
              }
              element['trigger'] = '';
              if (element?.schedule?.immediate) {
                if (element.schedule.immediate) {
                  element['trigger'] = `Immediate`;
                }
              } else if (element?.schedule && element.schedule?.immediate == false) {
                element['trigger'] = `Scheduled`;
              }

              if (this.filterSelected === 'outage') {
                element.trigger = 'Immediate';
              }

              if (this.healthTypes?.indexOf(this.filterSelected) !== -1) {
                element.trigger = 'Weekly';
              }

              element.methods = this.prepareMethods(element, this.filterSelected);

            }
          });

          this.alarmWorkFlowList = [...res.filter((el) => el).reverse()];

          this.loading = false;
          this.renderTable(false);

        } else {
          this.alarmWorkFlowList = [];
          this.loading = false;
          this.renderTable(false);
        }
      },
      (error) => {
        this.error = true;
        this.pageErrorHandle(error);
        this.loading = false;
        this.renderTable(false);

      }
    );
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = 'Access Denied';
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;

    return this.errorInfo;
  }
  getAlarmWorkflowId(workflow: any) {
    let workflowId = workflow?.uuid ? workflow.uuid : workflow?.name;
    if (this.healthTypes?.indexOf(workflow?.ui_modified_notification_type) !== -1) {
      this.router.navigateByUrl(`${this.urls['edit'][workflow?.ui_modified_notification_type]}${workflowId}`, { state: { ccoAlarmNotificationsText: this.searchtext || '' } });
    } else if (workflow?.ui_modified_notification_type === 'outage') {
      this.router.navigateByUrl(`/cco/outage-workflow/edit/${workflowId}`, { state: { ccoAlarmNotificationsText: this.searchtext || '' } });
    } else {
      this.router.navigateByUrl(`/cco/alarm-notifications/edit/${workflowId}`, { state: { ccoAlarmNotificationsText: this.searchtext || '' } });
    }
  }
  deleteAlarmWorkflowId() {
    this.error = false;
    this.success = false;
    this.errorInfo = undefined;
    this.successInfo = undefined;
    this.btnDisabled = true;
    let workflowId = this.deletedata['uuid'];
    this.loading = true;

    let url = `${this.baseUrl}workflow/${workflowId}`;

    if (this.deletedata?.ui_modified_notification_type === 'alarm') {
      url = `${this.baseUrl}workflow/${workflowId}`;
    } else if (this.deletedata?.ui_modified_notification_type === 'outage') {
      url = `${this.baseUrl}outageworkflow/${workflowId}`;
    } else {
      url = `${environment.API_BASE_URL}health/config/notifications/${encodeURIComponent(this.deletedata['name'])}`;
    }
    let msgMap = {
      alarm: 'Alarm Notification Schedule successfully deleted',
      outage: 'Service Disruption Notification Schedule successfully deleted',
      outliers: 'Optical Outliers Notification Schedule successfully deleted',
      OPTICAL_OUTLIERS: 'Optical Outliers Notification Schedule successfully deleted',
      'EARLY_WARN_PON_CAP': 'Early Warning PON Capacity Notification Schedule successfully deleted',
      'EARLY_WARN_ETH_CAP': 'Early Warning Ethernet Capacity Notification Schedule successfully deleted',
      'EARLY_WARN_PON_LOSS': 'Early Warning PON Loss Notification Schedule successfully deleted'
    }
    this.http
      .delete(`${url}`, { responseType: 'text' })
      .subscribe(
        (res: any) => {
          this.btnDisabled = false;
          // this.loading = false;
          this.success = true;
          this.successInfo = msgMap[this.deletedata['ui_modified_notification_type']];
          this.closeModal();
          setTimeout(() => {
            this.success = false;
            this.successInfo = undefined;
            this.getAlarmWorkflowList();
          }, 3000);
        },
        (error) => {
          this.btnDisabled = false;
          this.error = true;
          this.loading = false;
          this.pageErrorHandle(error);
        }
      );
  }
  goto() {
    this.close();
    if (this.types?.indexOf(this.notificatonForm.get('notificaton').value) !== -1) {
      this.router.navigate([this.urls['add'][this.notificatonForm.get('notificaton').value]]);
    } else {
      this.router.navigateByUrl(`/cco/alarm-notifications/new`, { state: { ccoAlarmNotificationsText: this.searchtext || '' } });
    }

    // this.router.navigateByUrl('/cco/alarm-notifications/new');
  }

  deleteWarnMsg = '';
  delete(rec: any) {
    let map = {
      alarm: 'Are you sure you want to delete Alarm Notification',
      outage: 'Are you sure you want to delete Service Disruption Notification',
      outliers: 'Are you sure you want to delete Optical Outliers Notification',
      OPTICAL_OUTLIERS: 'Are you sure you want to delete Optical Outliers Notification',
      'EARLY_WARN_PON_CAP': 'Are you sure you want to delete Early Warning PON Capacity Notification',
      'EARLY_WARN_ETH_CAP': 'Are you sure you want to delete Early Warning Ethernet Capacity Notification',
      'EARLY_WARN_PON_LOSS': 'Are you sure you want to delete Early Warning PON Loss Notification'
    }

    this.deleteWarnMsg = map[rec?.ui_modified_notification_type];
    this.deletedata = rec;
    this.modalInfo = this.deletedata['name'];
    // $('html, body').animate({ scrollTop: 0 }, 'slow');
    this.document.body.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  }
  closeModal(): void {
    this.deletedata = '';
  }
  pauseContinueWorkflow(workflow, type, ntfcnType: any) {
    let uuid = workflow?.uuid;
    let map = {
      alarm: `${this.baseUrl}deployWorkflow`,
      outage: `${this.baseUrl}outagedeployWorkflow`,
    }

    let msgMap = {
      alarm: {
        pause: 'Alarm Notification Schedule successfully paused',
        activate: 'Alarm Notification Schedule successfully deployed'
      },
      outage: {
        pause: 'Service Disruption Notification Schedule successfully paused',
        activate: 'Service Disruption Notification Schedule successfully deployed'
      },
      outliers: {
        pause: 'Optical Outliers Notification Schedule successfully paused',
        activate: 'Optical Outliers Notification Schedule successfully deployed'
      },
      OPTICAL_OUTLIERS: {
        pause: 'Optical Outliers Notification Schedule successfully paused',
        activate: 'Optical Outliers Notification Schedule successfully deployed'
      },
      EARLY_WARN_PON_CAP: {
        pause: `${this.map['EARLY_WARN_PON_CAP']} Notification Schedule successfully paused`,
        activate: `${this.map['EARLY_WARN_PON_CAP']} Notification Schedule successfully deployed`
      },
      EARLY_WARN_ETH_CAP: {
        pause: `${this.map['EARLY_WARN_ETH_CAP']} Notification Schedule successfully paused`,
        activate: `${this.map['EARLY_WARN_ETH_CAP']} Notification Schedule successfully deployed`
      },
      EARLY_WARN_PON_LOSS: {
        pause: `${this.map['EARLY_WARN_PON_LOSS']} Notification Schedule successfully paused`,
        activate: `${this.map['EARLY_WARN_PON_LOSS']} Notification Schedule successfully deployed`
      },

    }

    let query = `workflowId=${uuid}`;
    if (type == 'pause') {
      query = query.concat(`&status=PAUSE`);
    } else if (type == 'activate') {
      query = query.concat(`&status=RUN`);
    }

    this.loading = true;
    // this.btnDisabled = true;
    this.errorMsg = undefined;
    this.successInfo = undefined;
    let api: any = this.http
      .put(`${map[ntfcnType]}?${query}`, null, {
        responseType: 'text',
      });
    if (this.healthTypes?.indexOf(ntfcnType) !== -1) {
      let data: any = {
        "name": workflow?.name,
        "description": workflow?.description,
        "status": type == 'activate' ? 'RUN' : 'PAUSE',
        "regions": workflow?.regions,
        "locations": workflow?.locations,
        "systems": workflow?.systems,
        "emailRecipients": workflow?.emailRecipients,
        "emailNotes": workflow?.emailNotes,
        "type": workflow?.type,
        "sms": workflow?.sms,
        "webhooks": workflow?.webhooks,
        "timeZone": this.dateUtils.getTImeZoneWithOffset()
      };

      let url = `${environment.API_BASE_URL}health/config/notifications/${encodeURIComponent(workflow.name)}`;

      api = this.http
        .put(url, data, {
          responseType: 'text',
        });
    }

    api.subscribe(
      (res: any) => {
        this.success = true;
        this.successInfo = msgMap[ntfcnType][type];
        setTimeout(() => {
          this.success = false;
          this.getAlarmWorkflowList();
        }, 3000);
        // if (
        //   res == 'Workflow successfully deployed' ||
        //   res == 'Workflow successfully deployed!'
        // ) {
        //   this.success = true;
        //   this.successInfo =
        //     'Alarm Notification Schedule successfully deployed';
        //   setTimeout(() => {
        //     this.success = false;
        //     this.getAlarmWorkflowList();
        //   }, 3000);
        // } else if (
        //   'Workflow successfully paused' ||
        //   'Workflow successfully paused!'
        // ) {
        //   this.success = true;
        //   this.successInfo =
        //     'Alarm Notification Schedule successfully paused';
        //   setTimeout(() => {
        //     this.success = false;
        //     this.getAlarmWorkflowList();
        //   }, 3000);
        // } else {
        //   this.error = true;
        //   this.errorInfo = 'Something went wrong';
        // }
        this.loading = false;
        // this.btnDisabled = false;
      },
      (err: HttpErrorResponse) => {
        this.error = true;
        this.loading = false;
        this.btnDisabled = false;
        this.pageErrorHandle(err);
      }
    );
  }

  getAlarmNotificationSummary(workflow) {
    if (this.healthTypes?.indexOf(workflow?.ui_modified_notification_type) !== -1) {
      this.router.navigateByUrl(`/cco/operations/alarms/health-alarm-notifications/workflow/view/${encodeURIComponent(workflow.name)}`, { state: { ccoAlarmNotificationsText: this.searchtext || '' } });
    } else if (workflow?.ui_modified_notification_type === 'outage') {
      this.router.navigateByUrl(`/cco/operations/alarms/health-alarm-notifications/outage-workflow/view/${workflow.uuid}`, { state: { ccoAlarmNotificationsText: this.searchtext || '' } });
    } else {
      this.router.navigateByUrl(`/cco/operations/alarms/health-alarm-notifications/alarm-notifications/view/${workflow.uuid}`, { state: { ccoAlarmNotificationsText: this.searchtext || '' } });
    }



    // this.router.navigate([
    // `/cco/operations/cco-network-operations/cco-alarm-notifications/view/${row.uuid}`,
    // ]);
  }
  avoidInitialSpacing(event: any) {
    if (event.target.selectionStart === 0 && event.code === 'Space') {
      event.preventDefault()
    }
  }
  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    this.dtTrigger.unsubscribe();
  }

  showNotification() {
    this.notificatonForm.patchValue({
      notificaton: 'alarm'
    });
    let ngbModalOptions: any = {
      backdrop: 'static',
      keyboard: false,
      windowClass: 'notification-large-modal'
    };
    this.modalRef = this.modalService.open(this.notificationModal, ngbModalOptions);
  }

  close() {
    this.modalRef.close();
  }
  clearInput() {
    this.searchtext = '';
    this.search('');
  }

  getData() {
    if (this.filterSelected !== 'all') {
      return;
    }

    let urls = {
      alarm: `${this.baseUrl}workflows`,
      outage: `${this.baseUrl}outageworkflows`,
      outliers: `${environment.API_BASE_URL}health/config/notifications`
    }

    const requests = {};
    for (let url in urls) {
      const req = this.http.get(`${urls[url]}`).pipe(
        catchError(err => {
          err['api-error'] = true;
          return of(err);
        }
        ),
      );

      requests[url] = req;
    }
    this.loading = true;
    this.error = false;
    this.errorInfo = undefined;

    forkJoin(requests).subscribe(
      (json: any) => {

        let res = [...this.modifyResponse(json['alarm'], 'alarm'), ...this.modifyResponse(json['outage'], 'outage'), ...this.modifyResponse(json['outliers'], 'outliers')]

        if (res && res.length > 0) {

          this.alarmWorkFlowList = [...res.filter((el) => el).reverse()];

          this.loading = false;
          this.renderTable(false);

          //console.log(this.alarmWorkFlowList);

        } else {
          this.alarmWorkFlowList = [];
          this.loading = false;
          this.renderTable(false);
        }
      },
      (error) => {
        this.error = true;
        this.pageErrorHandle(error);
        this.loading = false;
        this.renderTable(false);

      }
    );
  }

  modifyResponse(res: any, type: any) {
    if (res?.['api-error']) {
      let errors = [this.commonOrgService.pageErrorHandle(res)];
      this.errors = [...this.errors, ...errors]
      return [];
    }
    res?.forEach((element) => {
      if (element) {
        element['ui_modified_notification_type'] = element?.type ? element?.type : type;
        element['ui_modified_notification_type_display'] = this.map[element['ui_modified_notification_type']];
        element['mod_status'] = element['status'];
        if (element['status'] == 'RUN') {
          element['mod_status'] = 'Running';
        } else if (element['status'] == 'PAUSE') {
          element['mod_status'] = 'Paused';
        } else if (element['status'] == 'DRAFT') {
          element['mod_status'] = 'Draft';
        }
        element['trigger'] = '';
        if (element?.schedule?.immediate) {
          if (element.schedule.immediate) {
            element['trigger'] = `Immediate`;
          }
        } else if (element?.schedule && element.schedule?.immediate == false) {
          element['trigger'] = `Scheduled`;

        }

        if (type === 'outage') {
          element.trigger = 'Immediate';
        }

        if (this.healthTypes?.indexOf(type) !== -1) {
          element.trigger = 'Weekly';
        }

        element.methods = this.prepareMethods(element, type);
      }
    });

    return res;
  }

  prepareMethods(element: any, type: any) {
    let methods = [];
    if (element?.emails?.length || element?.emailRecipients?.length) {
      methods.push('Email');
    }
    if (element?.sms?.length) {
      methods.push('SMS');
    }
    if (element?.webhooks?.length) {
      methods.push('Webhook');
    }

    return methods.join(', ');
  }
}
