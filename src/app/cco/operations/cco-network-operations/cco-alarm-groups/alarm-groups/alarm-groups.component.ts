import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alarm-groups',
  templateUrl: './alarm-groups.component.html',
  styleUrls: ['./alarm-groups.component.scss'],
})
export class AlarmGroupsComponent implements OnInit {
  baseUrl = `${environment.API_BASE_URL}analytics-engine/`;
  @ViewChild('group_name', { static: true }) group_name: ElementRef;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  isDev: boolean = false;
  canShowTableBodySubject : Subject<boolean> = new Subject();
  modalRef: any;
  modalLoader: boolean;
  removeName: any;
  alarmRemoveError: string;
  language: any;
  languageSubject: any;
  groupAlarmData: any = {
    group_name: '',
    groupAlarmId: '',
    wfLinkedFlag: 'false',
    description : '',
    totMonitoredAlarms : 0,
    category : ''
  };
  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  loading: boolean = false;
  btnDisabled: boolean = false;
  group_error: boolean = false;
  diffCategoryModal: boolean = false;
  constructor(
    private commonOrgService: CommonService,
    private http: HttpClient,
    private translateService: TranslateService,
    private route : ActivatedRoute,
    private router : Router,
    private modalService: NgbModal,
    private dialogService: NgbModal,
    private titleService: Title
  ) {
    let base = `${environment.API_BASE}`;
    let host = window.location.host;

    if (base.indexOf('/dev.api.calix.ai') > -1) {
      // || host.indexOf('localhost') > -1
      this.isDev = true;
    } else this.isDev = false;

    this.titleService.setTitle('Alarm Category Subgroups - Network Operations - Operations - Operations - Calix Cloud');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.groupAlarmData.groupAlarmId = params['alarmGroupId'] ? params.alarmGroupId : '';
      this.groupAlarmData.wfLinkedFlag = params['wfLinkedFlag'] ? params.wfLinkedFlag : 'false';
    })
    if(this.groupAlarmData.groupAlarmId == ''){
      this.group_name.nativeElement.focus();
    }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
      }
    );
    this.groupAlarmData['nonMonitoredGroupAlarm'] = {
      data: [],
      // cols: ['Alarm Name'],
      table: 'group',
      tableType: 'non-monitored',
      allSelected: false,
      renderOnce: true,
      rerenderSubject: new Subject(),
      searchSeverityPlaceHolder: 'Search Severity',
      searchCategoryPlaceHolder: 'Search Category',
      searchCategory : undefined,
      prevSearchCategory : undefined,
      searchPlaceHolder: 'Search Alarms',
      categoryList : [],

      severityList: [{id : 'critical', name : 'Critical'}, {id : 'major', name : 'Major' },  { id : 'minor', name : 'Minor' } , { id : 'warning', name : 'Warning' }, { id : 'info', name : 'Info' }],
      columnDefs: [
        { targets: 0, orderable: false },
        { visible: false, targets: [4] },
        {
          "type": "severity-order",
          "targets": -1
        }
      ],
    };
    this.groupAlarmData['monitoredGroupAlarm'] = {
      data: [],
      // cols: ['Alarm Name'],
      table: 'monitoredGroup',
      tableType: 'monitored',
      allSelected: false,
      renderOnce: true,
      rerenderSubject: new Subject(),
      searchCategory : undefined,
      searchSeverityPlaceHolder: 'Search Severity',
      searchCategoryPlaceHolder: 'Search Category',
      searchPlaceHolder: 'Search Alarms',
      categoryList : [],
      severityList: [{id : 'critical', name : 'Critical'}, {id : 'major', name : 'Major' },  { id : 'minor', name : 'Minor' }, { id : 'warning', name : 'Warning' }, { id : 'info', name : 'Info' }],
      columnDefs: [
        { targets: 0, orderable: false },
        { visible: false, targets: [4] },
        {
          "type": "severity-order",
          "targets": -1
        }
      ],
    };
    this.callMultipleAPI();
  }
  async callMultipleAPI() {
    await Promise.all([
      this.getCategories(),
      this.getIndividualAlarmData()
    ]);
    if(this.groupAlarmData.groupAlarmId != ''){
      this.getGroupAlarmData();
    }
  }
  getCategories(): Promise<void> {
    return new Promise((resolve, reject) => {

      this.http
        .get(`${this.baseUrl}alarmMasterCategory`)
        .subscribe((json: any) => {

          let categories = [{ id: 'All', name: 'All' }];

          if (json && json.length > 0) {
            categories = [];
            json.forEach((element) => {
              if (!element) {
                return;
              }

              categories.push({
                id: element,
                name: element,
              });
            });
          }
          categories.sort((a, b) =>
            (a.name || '')
              .toString()
              .localeCompare((b.name || '').toString(), 'en', {
                numeric: false,
              })
          );

          this.groupAlarmData.nonMonitoredGroupAlarm.categoryList = [...categories];
          this.groupAlarmData.monitoredGroupAlarm.categoryList = [...categories];
          resolve();
        },(err: any) => {
          // this.loading = false;
          resolve();
        });
    });
  }
  callAddRemove(data) {
    if (data.table == 'group' && data.mode == 'add') {
      // this.addSelectedGroupAlarmList();
      this.checkCategorySeverity();
    } else if (data.table == 'monitoredGroup' && data.mode == 'remove') {
      this.removeSelectedGroupAlarmList();
    }
  }
  checkCategorySeverity(){
    let noOjcAdd = false;
    this.diffCategoryModal = false;
    let warningContent = undefined;
    let name = '';
    let selectedAlarmsCategoryType = false;
    let selectedAlarms = this.groupAlarmData.nonMonitoredGroupAlarm.data.filter((el) => el.isChecked && !el['selectedAlready']);

    
    
    if(selectedAlarms.length > 0){
      let initialAlarmCategory = selectedAlarms[0].category;
      selectedAlarmsCategoryType = selectedAlarms.every((el) => el['category'] == initialAlarmCategory)
    }

    let selectedAlreadyAlarms = [...this.groupAlarmData.monitoredGroupAlarm.data];
    if(selectedAlreadyAlarms.length > 0){
      let initialselectedAlreadyAlarmCategory = selectedAlreadyAlarms[0].category;
      if(selectedAlarms.every((el) => el['category'] == initialselectedAlreadyAlarmCategory)){
        selectedAlarmsCategoryType = false;
      }
    }
    
    
    if (
      (!this.groupAlarmData.nonMonitoredGroupAlarm.prevSearchCategory &&
        this.groupAlarmData.nonMonitoredGroupAlarm.searchCategory &&
        this.groupAlarmData.nonMonitoredGroupAlarm.searchCategory != '') ||
      (this.groupAlarmData.nonMonitoredGroupAlarm.searchCategory &&
        this.groupAlarmData.nonMonitoredGroupAlarm.searchCategory != '' &&
        this.groupAlarmData.nonMonitoredGroupAlarm.prevSearchCategory ==
          this.groupAlarmData.nonMonitoredGroupAlarm.searchCategory)
    ) {
      noOjcAdd = true;
    } else if (
      // this.groupAlarmData.nonMonitoredGroupAlarm.searchCategory &&
      // this.groupAlarmData.nonMonitoredGroupAlarm.searchCategory != '' &&
      // this.groupAlarmData.nonMonitoredGroupAlarm.prevSearchCategory !=
      //   this.groupAlarmData.nonMonitoredGroupAlarm.searchCategory && 
        selectedAlarmsCategoryType && this.groupAlarmData.monitoredGroupAlarm.data.length > 0
    ) {
      warningContent =
        `${this.language['Are you sure you want to remove the Selected Alarms in Category']} <b> (${this.groupAlarmData.nonMonitoredGroupAlarm.prevSearchCategory}-${this.groupAlarmData.monitoredGroupAlarm.data.length}) </b> ?`;
    } else{
      let selectedAlarms = this.groupAlarmData.nonMonitoredGroupAlarm.data.filter((el) => el.isChecked);
      if(selectedAlarms.length > 0){
        let initialAlarmCategory = selectedAlarms[0].category;
        if(selectedAlarms.every((el) => el['category'] == initialAlarmCategory)){
          noOjcAdd = true;
        }else{
          warningContent =
        `${this.language['Please do not select more than one category.']}`;
        this.diffCategoryModal = true;
        this.canShowTableBodySubject.next(true);
        }
      }
    }

    if(noOjcAdd){
      if (this.groupAlarmData.nonMonitoredGroupAlarm.searchCategory) {
        this.groupAlarmData.nonMonitoredGroupAlarm.prevSearchCategory =
          this.groupAlarmData.nonMonitoredGroupAlarm.searchCategory;
        this.groupAlarmData.nonMonitoredGroupAlarm.categoryOrSeverity =
          'CATEGORY';
      }
      this.addSelectedGroupAlarmList();
    }else{
      // show popup
      this.removeAlarms(warningContent);
      // confirmed then execute following
      // else no change in content
      
    }
    
  }
  doRemoveAlarms(){
    if (this.groupAlarmData.nonMonitoredGroupAlarm.searchCategory) {
      this.groupAlarmData.nonMonitoredGroupAlarm.prevSearchCategory =
        this.groupAlarmData.nonMonitoredGroupAlarm.searchCategory;
      this.groupAlarmData.nonMonitoredGroupAlarm.categoryOrSeverity =
        'CATEGORY';
    }
    this.groupAlarmData.nonMonitoredGroupAlarm.data.forEach((el) => {
      if (el['selectedAlready'] == true) {
        el['disabled'] = false;
        el['selectedAlready'] = false;
        el['isChecked'] = false
      }
    });
    this.groupAlarmData.monitoredGroupAlarm.data = [];
    this.addSelectedGroupAlarmList();
    this.close();
  }
  removeDuplicate(list, key) {
    let elements = list.reduce(function (previous, current) {

      var object = previous.filter(object => object[key] === current[key]);
      if (object.length == 0) {
        previous.push(current);
      }
      return previous;
    }, []);

    return elements;
  }

  addSelectedGroupAlarmList() {

    let groupAlarms = JSON.parse(
      JSON.stringify(
        this.groupAlarmData.nonMonitoredGroupAlarm.data.filter(
          (el) => el['isChecked'] == true
        )
      )
    );
    this.groupAlarmData.nonMonitoredGroupAlarm.prevSearchCategory = groupAlarms[0]['category'];
    // this.groupAlarmData.monitoredGroupAlarm.data = [];
    this.groupAlarmData.monitoredGroupAlarm.data = [...this.groupAlarmData.monitoredGroupAlarm.data, ...groupAlarms.map((el) => {
      delete el['isChecked'];
      delete el['disabled'];
      delete el['selectedAlready'];
      return el;
    })];

    // remove duplicates
    this.groupAlarmData.monitoredGroupAlarm.data = this.removeDuplicate(this.groupAlarmData.monitoredGroupAlarm.data, 'alarm_id');

    this.groupAlarmData.nonMonitoredGroupAlarm.data.forEach((el) => {
      if (el['isChecked'] == true) {
        el['disabled'] = true;
        el['selectedAlready'] = true;
      }
    });
    if (
      this.groupAlarmData.nonMonitoredGroupAlarm.data.length > 0 &&
      this.groupAlarmData.nonMonitoredGroupAlarm.data.every(
        (el) => el['isChecked'] == true
      )
    ) {
      this.groupAlarmData.nonMonitoredGroupAlarm.allSelected = true;
    }
    this.groupAlarmData.monitoredGroupAlarm = {
      ...this.groupAlarmData.monitoredGroupAlarm,
    };
    this.groupAlarmData.monitoredGroupAlarm.data = [
      ...this.groupAlarmData.monitoredGroupAlarm.data,
    ];
    this.groupAlarmData.nonMonitoredGroupAlarm = {
      ...this.groupAlarmData.nonMonitoredGroupAlarm,
    };
    this.calculateTotalMonitoredAlarms();
    // this.groupAlarmData.monitoredGroupAlarm = {...this.groupAlarmData.monitoredGroupAlarm};
    this.groupAlarmData.monitoredGroupAlarm.rerenderSubject.next(true);
    this.groupAlarmData.nonMonitoredGroupAlarm.rerenderSubject.next(true);
  }

  removeSelectedGroupAlarmList() {
    this.groupAlarmData.nonMonitoredGroupAlarm.data.forEach((element) => {
      if(!element['selectedAlready'] && element['isChecked']){
        element['isChecked'] = false;
        element['checkedTemporarily'] = true;
      }
    });
    this.groupAlarmData.monitoredGroupAlarm.data.forEach((el, index) => {
      if (el['isChecked']) {
        let obj = this.groupAlarmData.nonMonitoredGroupAlarm.data.find(
          (ele) => ele.alarm_id == el['alarm_id']
        );
        if (obj) {
          obj['disabled'] = false;
          obj['isChecked'] = false;
          obj['selectedAlready'] = false;
        }
      }
    });
    this.groupAlarmData.monitoredGroupAlarm.data =
    this.groupAlarmData.nonMonitoredGroupAlarm.data.filter(
      (el) => el['isChecked'] == true
    );

    this.groupAlarmData.monitoredGroupAlarm.data = JSON.parse(JSON.stringify(this.groupAlarmData.monitoredGroupAlarm.data));

    this.groupAlarmData.monitoredGroupAlarm.data.forEach((el) => {
      el['disabled'] = false;
      el['isChecked'] = false;
      el['selectedAlready'] = false;
    });

    if(this.groupAlarmData.monitoredGroupAlarm.data.length == 0){
      this.groupAlarmData.nonMonitoredGroupAlarm.prevSearchCategory = undefined;
    }
    this.groupAlarmData.nonMonitoredGroupAlarm.data.forEach((element) => {
      if(element['checkedTemporarily']){
        element['isChecked'] = true;
        element['checkedTemporarily'] = false;
      }
    });
    if (
      this.groupAlarmData.nonMonitoredGroupAlarm.data.length == 0 ||
      !this.groupAlarmData.nonMonitoredGroupAlarm.data.every(
        (el) => el['isChecked'] == true
      )
    ) {
      this.groupAlarmData.nonMonitoredGroupAlarm.allSelected = false;
    }
    if (
      this.groupAlarmData.monitoredGroupAlarm.data.length == 0 ||
      !this.groupAlarmData.monitoredGroupAlarm.data.every(
        (el) => el['isChecked'] == true
      )
    ) {
      this.groupAlarmData.monitoredGroupAlarm.allSelected = false;
    }
    // this.groupAlarmData.nonMonitoredGroupAlarm = {...this.groupAlarmData.nonMonitoredGroupAlarm};
    // this.groupAlarmData.monitoredGroupAlarm = {...this.groupAlarmData.monitoredGroupAlarm};
    this.calculateTotalMonitoredAlarms();
    this.groupAlarmData.nonMonitoredGroupAlarm = {
      ...this.groupAlarmData.nonMonitoredGroupAlarm,
    };
    this.groupAlarmData.nonMonitoredGroupAlarm.data = [
      ...this.groupAlarmData.nonMonitoredGroupAlarm.data,
    ];
    this.groupAlarmData.monitoredGroupAlarm = {
      ...this.groupAlarmData.monitoredGroupAlarm,
    };
    this.groupAlarmData.monitoredGroupAlarm.data = [
      ...this.groupAlarmData.monitoredGroupAlarm.data,
    ];
    // this.groupAlarmData.nonMonitoredGroupAlarm = {...this.groupAlarmData.nonMonitoredGroupAlarm};
    // this.groupAlarmData.monitoredGroupAlarm = {...this.groupAlarmData.monitoredGroupAlarm};
    this.groupAlarmData.nonMonitoredGroupAlarm.rerenderSubject.next(true);
    this.groupAlarmData.monitoredGroupAlarm.rerenderSubject.next(true);
  }

  getIndividualAlarmData() : Promise<void> {
    return new Promise((resolve, request) => {
      this.loading = true;
      this.http
        .get(`${this.baseUrl}alarmMasterDetails`)
        .subscribe((json: any) => {
          this.loading = false;
          let alarmsData = [];
              if (json && json.length > 0) {
                // if(this.isDev){
                  json = [...json.filter((el) => el['name'] != 'ont-dying-gasp' && el['name'] != 'multiple-onts-down-network' && el['name'] != 'multiple-onts-down-olt' && el['name'] != 'multiple-onts-down-pon')]
                // }else{
                  // json = [...json.filter((el) => el['name'] != 'ont-dying-gasp')]
                // }
                json.forEach((element) => {
                    element['alarm_name'] = element['name']?element['name'] : '';
                    element['alarm_category'] = element['category']?element['category'] : '';
                    element['severity'] = element['perceivedSeverity']?element['perceivedSeverity'] : '';
                    element['alarm_id'] = element['id']?element['id'] : '';
                  alarmsData.push(element);
                });
              }
              this.groupAlarmData.nonMonitoredGroupAlarm.data = [...alarmsData];
              this.groupAlarmData.nonMonitoredGroupAlarm = {...this.groupAlarmData.nonMonitoredGroupAlarm};
              this.groupAlarmData.nonMonitoredGroupAlarm.rerenderSubject.next(
                true
              );
              resolve();
        },(err: any) => {
          resolve();
          this.loading = false;
        });
    })
    
  }

  saveAlarmGroup() {
    if (
      this.groupAlarmData?.group_name &&
      this.groupAlarmData.group_name != '' &&
      this.groupAlarmData?.monitoredGroupAlarm.data &&
      this.groupAlarmData.monitoredGroupAlarm.data.length > 0
    ) {
      this.loading = true;
      this.btnDisabled = true;
      this.errorInfo = undefined;
      this.successInfo = undefined;
      this.error = false;
      this.group_error = false;
      let alarmEventNameArray = this.groupAlarmData.monitoredGroupAlarm.data.map((el) => el['alarm_name'] || el['name']),
        categoryArray = this.groupAlarmData.monitoredGroupAlarm.data.map((el) => el['category']) ;
      let request_body = {
        alarmEventName: alarmEventNameArray,
        category: categoryArray,
        name: this.groupAlarmData.group_name,
        description: this.groupAlarmData.description,
      };
      let searchText = history?.state?.ccoAlarmCategorySubgroupText;
      if (this.groupAlarmData.groupAlarmId != '') {
        this.http
          .put(
            `${this.baseUrl}alarmgroup/${this.groupAlarmData.groupAlarmId}`,
            request_body, {
              responseType: 'text',
            }
          )
          .subscribe(
            (res: any) => {
              if (res && res != '') {
                this.loading = false;
                this.btnDisabled = false;
                this.success = true;
                this.successInfo = 'Alarm Category Subgroup updated successfully';
                setTimeout(() => {
                  this.success = false;
                  this.router.navigateByUrl(`/cco/operations/cco-network-operations/cco-alarm-groups`, { state: { ccoAlarmCategorySubgroupText: searchText || '' } });
                }, 3000);
                
                
              } else {
                this.loading = false;
                this.btnDisabled = false;
                this.errorInfo = 'Error';
              }
            },
            (err: HttpErrorResponse) => {
              this.error = true;
              this.loading = false;
              this.btnDisabled = false;
              this.pageErrorHandle(err);
            }
          );
      } else {
        this.http
          .post(`${this.baseUrl}alarmgroup`, request_body, {
            responseType: 'text',
          })
          .subscribe(
            (res: any) => {
              if (res && res != '') {
                this.loading = false;
                this.btnDisabled = false;
                this.success = true;
                this.successInfo = 'Alarm Category Subgroup saved successfully';
                setTimeout(() => {
                  this.success = false;
                  this.router.navigateByUrl(`/cco/operations/cco-network-operations/cco-alarm-groups`, { state: { ccoAlarmCategorySubgroupText: searchText || '' } });
                }, 3000);
                // this.groupAlarmData.groupAlarmId = res;
              } else {
                this.loading = false;
                this.btnDisabled = false;
                this.errorInfo = 'Error';
              }
            },
            (err: HttpErrorResponse) => {
              this.error = true;
              this.loading = false;
              this.btnDisabled = false;
              this.pageErrorHandle(err);
            }
          );
      }
    }else if(this.groupAlarmData.group_name == '' || !this.groupAlarmData.group_name){
      this.group_error = true;
      this.errorInfo = 'Please fill Group Name';
    }else if(!this.groupAlarmData?.monitoredGroupAlarm.data || this.groupAlarmData?.monitoredGroupAlarm.data.length == 0){
      this.error = true;
      this.errorInfo = 'Please add at least one alarm.';
    }else{
      this.error = true;
      this.errorInfo = 'Something went wrong';
    }
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = 'Access Denied';
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }
  closeAlert() {
    this.error = false;
    this.success = false;
    this.canShowTableBodySubject.next(true);
    this.alarmRemoveError = '';
  }
  getGroupAlarmData(event?) {
    this.loading = true;
    this.http
      .get(
        `${this.baseUrl}alarmgroup?alarmgroupId=${this.groupAlarmData.groupAlarmId}`
      )
      .subscribe(
        (data: any) => {
          this.loading = false;
          if (data && Object.entries(data).length > 0) {
            data.alarmEventName.forEach((el) => {
              let alarmObj =
                this.groupAlarmData.nonMonitoredGroupAlarm.data.find(
                  (alarm) => alarm.alarm_name == el
                );
              if (alarmObj) {
                delete alarmObj['isChecked'];
                delete alarmObj['disabled'];
                delete alarmObj['selectedAlready'];
                this.groupAlarmData.monitoredGroupAlarm.data.push({
                  ...alarmObj,
                });
                alarmObj['isChecked'] = true;
                alarmObj['disabled'] = true;
                alarmObj['selectedAlready'] = true;
              }
            });
            this.groupAlarmData.nonMonitoredGroupAlarm.rerenderSubject.next(true);
            this.groupAlarmData.monitoredGroupAlarm.rerenderSubject.next(true);
            this.groupAlarmData.group_name = data['name'];
            this.groupAlarmData.description = data['description'];
            this.groupAlarmData.category = data['category'] && data['category'].length > 0 ? data['category'][0] : '';
            this.groupAlarmData.nonMonitoredGroupAlarm.prevSearchCategory = this.groupAlarmData.category;
            this.calculateTotalMonitoredAlarms();
          }
        },
        (error) => {
          this.loading = false;
        }
      );
  }
  avoidInitialSpacing(event : any){
    
    if(event.target.selectionStart === 0 && event.code === 'Space'){
      event.preventDefault()
    }
  }
  updateGroupError(){
    if(this.groupAlarmData.group_name != ''){
      this.group_error = false;
    }
    else{
      this.group_error = true;
    }
  }
  calculateTotalMonitoredAlarms() {
    this.groupAlarmData.totMonitoredAlarms =
      this.groupAlarmData.monitoredGroupAlarm.data.length;
  }
  removeAlarms(name) {
    this.alarmRemoveError = '';
    this.removeName = name;

    if (this.modalRef) {
      this.close();
    }

    this.modalRef = this.dialogService.open(this.deleteModal, {
      backdrop  : 'static',
      keyboard  : false
   });

  }
  goToListView(){
    let searchText = history?.state?.ccoAlarmCategorySubgroupText;
    this.router.navigateByUrl(`/cco/operations/cco-network-operations/cco-alarm-groups`, { state: { ccoAlarmCategorySubgroupText: searchText || '' } });
  }
  close(type?): void {
    this.modalLoader = false;
    this.modalService.dismissAll();
    this.modalRef.close();
    if(type == 'No'){
      this.canShowTableBodySubject.next(true);
    }
  }
}
