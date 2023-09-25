import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-workflow-alarms',
  templateUrl: './workflow-alarms.component.html',
  styleUrls: ['./workflow-alarms.component.scss'],
})
export class WorkflowAlarmsComponent implements OnInit {
  modalRef: any;
  modalLoader: boolean;
  removeName: any;
  alarmRemoveError: string;
  language: any;
  languageSubject;
  _workFlowAlarmsData: any = {};
  loading: boolean;
  alarmsActiveTab = 'individual_alarm';
  selectedAlarmsActiveTab = 'selected_individual_alarms';
  @Input()
  set workFlowAlarmsData(value: any) {
    this._workFlowAlarmsData = value;
  }
  get workFlowAlarmsData() {
    return this._workFlowAlarmsData;
  }
  baseUrl = `${environment.API_BASE_URL}analytics-engine/`;
  categoryList: any[];
  actIndividualAlarmList: any[];
  loadAlarmList: any[];
  @Output() getWorkFlowAPIEmitter = new EventEmitter();
  @Output() errorMsg = new EventEmitter();
  @ViewChild('nonMonitoredView', { static: true }) nonMonitoredView: ElementRef;
  @ViewChild('monitoredView', { static: true }) monitoredView: ElementRef;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  canShowTableBodySubject : Subject<boolean> = new Subject();
  constructor(private translateService: TranslateService,private modalService: NgbModal,
    private dialogService: NgbModal) {}

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
      }
    );
    if (!this.workFlowAlarmsData['alarmsFormEntered']) {
      // this.workFlowAlarmsData.totMonitoredAlarms = 0;

      this.workFlowAlarmsData['individualAlarmData'] = {
        data: this.workFlowAlarmsData && this.workFlowAlarmsData.individualAlarmData && this.workFlowAlarmsData.individualAlarmData.data ? this.workFlowAlarmsData.individualAlarmData.data : [],
        cols: ['Alarm Name', 'Category'],
        // dtOptions : this.dtOptions,
        table: 'individual',
        tableType: 'non-monitored',
        allSelected: false,
        renderOnce: true,
        rerenderSubject: new Subject(),
        searchCategory:
        this.workFlowAlarmsData && this.workFlowAlarmsData['individualAlarmData'] && this.workFlowAlarmsData['individualAlarmData']['searchCategory'] ? this.workFlowAlarmsData['individualAlarmData']['searchCategory'] : undefined,
        searchSeverity:
        this.workFlowAlarmsData && this.workFlowAlarmsData['individualAlarmData'] && this.workFlowAlarmsData['individualAlarmData']['searchSeverity'] ? this.workFlowAlarmsData['individualAlarmData']['searchSeverity'] : undefined,
        prevSearchCategory:
        this.workFlowAlarmsData && this.workFlowAlarmsData['individualAlarmData'] && this.workFlowAlarmsData['individualAlarmData']['prevSearchCategory'] ? this.workFlowAlarmsData['individualAlarmData']['prevSearchCategory'] : undefined,
        prevSearchSeverity:
        this.workFlowAlarmsData && this.workFlowAlarmsData['individualAlarmData'] && this.workFlowAlarmsData['individualAlarmData']['prevSearchSeverity'] ? this.workFlowAlarmsData['individualAlarmData']['prevSearchSeverity'] : undefined,
        categoryOrSeverity:
        this.workFlowAlarmsData && this.workFlowAlarmsData['individualAlarmData'] && this.workFlowAlarmsData['individualAlarmData']['categoryOrSeverity'] ? this.workFlowAlarmsData['individualAlarmData']['categoryOrSeverity'] : undefined,
        searchPlaceHolder: 'Search Alarms',
        searchCategoryPlaceHolder: 'Search Category',
        searchSeverityPlaceHolder: 'Search Severity',
        severityList: [
          { id: 'critical', name: 'Critical' },
          { id: 'major', name: 'Major' },
          { id: 'minor', name: 'Minor' },
          { id: 'warning', name: 'Warning' },
          { id: 'info', name: 'Info' },
        ],
        categoryList: this.workFlowAlarmsData && this.workFlowAlarmsData['individualAlarmData'] && this.workFlowAlarmsData['individualAlarmData']['categoryList']? this.workFlowAlarmsData['individualAlarmData']['categoryList'] : [],
        columnDefs: [
          { targets: 0, orderable: false },
          { visible: false, targets: [3, 4, 6, 7, 8] },
          {
            "type": "severity-order",
            "targets": -1
          }
        ],
        order : [5, 'asc']
      };
      this.workFlowAlarmsData['groupAlarmData'] = {
        data: this.workFlowAlarmsData && this.workFlowAlarmsData['groupAlarmData'] && this.workFlowAlarmsData['groupAlarmData']['data'] ? this.workFlowAlarmsData['groupAlarmData']['data'] : [],
        cols: ['Alarm Name'],
        table: 'group',
        tableType: 'non-monitored',
        allSelected: false,
        renderOnce: true,
        rerenderSubject: new Subject(),
        searchPlaceHolder: 'Search Alarm Category Subgroups',
        columnDefs: [
          { targets: 0, orderable: false },
          { visible: false, targets: [1, 2, 5, 6, 7, 8] },
        ],
        order : [3, 'asc']
      };
      this.workFlowAlarmsData['transformAlarmData'] = {
        data: this.workFlowAlarmsData && this.workFlowAlarmsData['transformAlarmData'] && this.workFlowAlarmsData['transformAlarmData']['data'] ? this.workFlowAlarmsData['transformAlarmData']['data'] : '',
        cols: ['Alarm Name'],
        table: 'transform',
        tableType: 'non-monitored',
        allSelected: false,
        renderOnce: true,
        rerenderSubject: new Subject(),
        searchPlaceHolder: 'Search Transformed Alarms',
        columnDefs: [
          { targets: 0, orderable: false },
          { visible: false, targets: [3, 2, 4, 5, 6, 7, 8] },
        ],
        order : [1, 'asc']
      };
      this.workFlowAlarmsData['monitoredIndividualAlarm'] = {
        data: this.workFlowAlarmsData && this.workFlowAlarmsData['monitoredIndividualAlarm'] && this.workFlowAlarmsData['monitoredIndividualAlarm']['data'] ? this.workFlowAlarmsData['monitoredIndividualAlarm']['data'] : [],
        cols: ['Alarm Name', 'Category'],
        table: 'monitoredIndividual',
        tableType: 'monitored',
        allSelected: false,
        renderOnce: true,
        rerenderSubject: new Subject(),
        searchCategory: undefined,
        searchSeverity: undefined,
        searchPlaceHolder: 'Search Alarms',
        searchCategoryPlaceHolder: 'Search Category',
        searchSeverityPlaceHolder: 'Search Severity',
        severityList: [
          { id: 'critical', name: 'Critical' },
          { id: 'major', name: 'Major' },
          { id: 'minor', name: 'Minor' },
          { id: 'warning', name: 'Warning' },
          { id: 'info', name: 'Info' },
        ],
        categoryList:
        this.workFlowAlarmsData && this.workFlowAlarmsData['monitoredIndividualAlarm'] && this.workFlowAlarmsData['monitoredIndividualAlarm']['categoryList'] ? this.workFlowAlarmsData['monitoredIndividualAlarm']['categoryList'] : [],
        columnDefs: [
          { targets: 0, orderable: false },
          { visible: false, targets: [3, 4, 6, 7, 8] },
          {
            "type": "severity-order",
            "targets": -1
          }
        ],
        order : [5, 'asc']
      };
      this.workFlowAlarmsData['monitoredGroupAlarm'] = {
        data: this.workFlowAlarmsData && this.workFlowAlarmsData['monitoredGroupAlarm'] && this.workFlowAlarmsData['monitoredGroupAlarm']['data'] ? this.workFlowAlarmsData['monitoredGroupAlarm']['data'] : [],
        cols: ['Alarm Name'],
        table: 'monitoredGroup',
        tableType: 'monitored',
        allSelected: false,
        renderOnce: true,
        rerenderSubject: new Subject(),
        searchPlaceHolder: 'Search Alarm Category Subgroups',
        columnDefs: [
          { targets: 0, orderable: false },
          { visible: false, targets: [1, 2, 5, 6, 7, 8] },
        ],
        order : [3, 'asc']
      };
      this.workFlowAlarmsData['monitoredTransformAlarm'] = {
        data: this.workFlowAlarmsData && this.workFlowAlarmsData['monitoredTransformAlarm'] && this.workFlowAlarmsData['monitoredTransformAlarm']['data'] ? this.workFlowAlarmsData['monitoredTransformAlarm']['data'] : [],
        cols: ['Alarm Name'],
        table: 'monitoredTransform',
        tableType: 'monitored',
        allSelected: false,
        renderOnce: true,
        rerenderSubject: new Subject(),
        searchPlaceHolder: 'Search Transformed Alarms',
        columnDefs: [
          { targets: 0, orderable: false },
          { visible: false, targets: [3, 2, 4, 5, 6, 7, 8] },
        ],
        order : [1, 'asc']
      };
      this.workFlowAlarmsData['alarmsFormEntered'] = true;
    }
    this.callMultipleAPI();
  }

  async callMultipleAPI() {
    // await Promise.all([

    //   // get categories
    //   this.getCategories(),
    //   //group alarm data
    //   this.getIndividualAlarmData(),
    //   this.getGroupAlarmData(),
    //   //individual alarm data
    //   // this.getIndividualAlarmsData()
    //   // this.getCustomCategories()
    // ]);

    //Call Get workflow API in alarm Notification page
    this.getWorkFlowAPIEmitter.emit(true);
  }
  removeDuplicate(list, key) {
    let elements = list.reduce(function (previous, current) {
      var object = previous.filter((object) => object[key] === current[key]);
      if (object.length == 0) {
        previous.push(current);
      }
      return previous;
    }, []);

    return elements;
  }
  addSelectedIndividualAlarmList() {

    // if(this.workFlowAlarmsData.individualAlarmData.searchCategory && this.workFlowAlarmsData.individualAlarmData.searchCategory != ''){
    //   this.workFlowAlarmsData.individualAlarmData.prevSearchSeverity = undefined;
    // }else if(this.workFlowAlarmsData.individualAlarmData.searchSeverity && this.workFlowAlarmsData.individualAlarmData.searchSeverity != ''){
    //   this.workFlowAlarmsData.individualAlarmData.prevSearchCategory = undefined;
    // }

    let indAlarms = JSON.parse(
      JSON.stringify(
        this.workFlowAlarmsData.individualAlarmData.data.filter(
          (el) => el['isChecked'] == true
        )
      )
    );
    // this.workFlowAlarmsData.monitoredIndividualAlarm.data = [];
    this.workFlowAlarmsData.monitoredIndividualAlarm.data = [
      ...this.workFlowAlarmsData.monitoredIndividualAlarm.data,
      ...indAlarms.map((el) => {
        delete el['isChecked'];
        delete el['disabled'];
        delete el['selectedAlready'];
        return el;
      }),
    ];

    this.workFlowAlarmsData.monitoredIndividualAlarm.data =
      this.removeDuplicate(
        this.workFlowAlarmsData.monitoredIndividualAlarm.data,
        'alarm_id'
      );

    this.workFlowAlarmsData.individualAlarmData.data.forEach((el) => {
      if (el['isChecked'] == true) {
        el['disabled'] = true;
        el['selectedAlready'] = true;
      }
    });
    this.workFlowAlarmsData.monitoredIndividualAlarm = {
      ...this.workFlowAlarmsData.monitoredIndividualAlarm,
    };
    this.workFlowAlarmsData.monitoredIndividualAlarm.data = [
      ...this.workFlowAlarmsData.monitoredIndividualAlarm.data,
    ];
    this.workFlowAlarmsData.individualAlarmData = {
      ...this.workFlowAlarmsData.individualAlarmData,
    };
    this.calculateTotalMonitoredAlarms();
    // this.workFlowAlarmsData.monitoredIndividualAlarm = {...this.workFlowAlarmsData.monitoredIndividualAlarm};
    this.workFlowAlarmsData.monitoredIndividualAlarm.rerenderSubject.next(true);
    this.workFlowAlarmsData.individualAlarmData.rerenderSubject.next(true);
  }
  addSelectedGroupAlarmList() {
    let groupAlarms = JSON.parse(
      JSON.stringify(
        this.workFlowAlarmsData.groupAlarmData.data.filter(
          (el) => el['isChecked'] == true
        )
      )
    );
    // this.workFlowAlarmsData.monitoredGroupAlarm.data = [];
    this.workFlowAlarmsData.monitoredGroupAlarm.data = [
      ...this.workFlowAlarmsData.monitoredGroupAlarm.data,
      ...groupAlarms.map((el) => {
        delete el['isChecked'];
        delete el['disabled'];
        delete el['selectedAlready'];
        return el;
      }),
    ];

    this.workFlowAlarmsData.monitoredGroupAlarm.data = this.removeDuplicate(
      this.workFlowAlarmsData.monitoredGroupAlarm.data,
      'group_id'
    );

    this.workFlowAlarmsData.groupAlarmData.data.forEach((el) => {
      if (el['isChecked'] == true) {
        el['disabled'] = true;
        el['selectedAlready'] = true;
      }
    });
    this.workFlowAlarmsData.monitoredGroupAlarm = {
      ...this.workFlowAlarmsData.monitoredGroupAlarm,
    };
    this.workFlowAlarmsData.monitoredGroupAlarm.data = [
      ...this.workFlowAlarmsData.monitoredGroupAlarm.data,
    ];
    this.workFlowAlarmsData.groupAlarmData = {
      ...this.workFlowAlarmsData.groupAlarmData,
    };
    this.calculateTotalMonitoredAlarms();
    // this.workFlowAlarmsData.monitoredGroupAlarm = {...this.workFlowAlarmsData.monitoredGroupAlarm};
    this.workFlowAlarmsData.monitoredGroupAlarm.rerenderSubject.next(true);
    this.workFlowAlarmsData.groupAlarmData.rerenderSubject.next(true);
  }
  addSelectedTransformAlarmList() {
    let transformAlarms = JSON.parse(
      JSON.stringify(
        this.workFlowAlarmsData.transformAlarmData.data.filter(
          (el) => el['isChecked'] == true
        )
      )
    );
    // this.workFlowAlarmsData.monitoredTransformAlarm.data = [];
    this.workFlowAlarmsData.monitoredTransformAlarm.data = [
      ...this.workFlowAlarmsData.monitoredTransformAlarm.data,
      ...transformAlarms.map((el) => {
        delete el['isChecked'];
        delete el['disabled'];
        delete el['selectedAlready'];
        return el;
      }),
    ];

    this.workFlowAlarmsData.monitoredTransformAlarm.data = this.removeDuplicate(
      this.workFlowAlarmsData.monitoredTransformAlarm.data,
      'alarmRuleId'
    );

    this.workFlowAlarmsData.transformAlarmData.data.forEach((el) => {
      if (el['isChecked'] == true) {
        el['disabled'] = true;
        el['selectedAlready'] = true;
      }
    });
    this.workFlowAlarmsData.monitoredTransformAlarm = {
      ...this.workFlowAlarmsData.monitoredTransformAlarm,
    };
    this.workFlowAlarmsData.monitoredTransformAlarm.data = [
      ...this.workFlowAlarmsData.monitoredTransformAlarm.data,
    ];
    this.workFlowAlarmsData.transformAlarmData = {
      ...this.workFlowAlarmsData.transformAlarmData,
    };
    this.calculateTotalMonitoredAlarms();
    // this.workFlowAlarmsData.monitoredTransformAlarm = {...this.workFlowAlarmsData.monitoredTransformAlarm};
    this.workFlowAlarmsData.monitoredTransformAlarm.rerenderSubject.next(true);
    this.workFlowAlarmsData.transformAlarmData.rerenderSubject.next(true);
  }
  removeSelectedIndividualAlarmList() {
    this.workFlowAlarmsData.individualAlarmData.data.forEach((element) => {
      if(!element['selectedAlready'] && element['isChecked']){
        element['isChecked'] = false;
        element['checkedTemporarily'] = true;
      }
    });
    this.workFlowAlarmsData.monitoredIndividualAlarm.data.forEach((el) => {
      if (el['isChecked']) {
        let obj = this.workFlowAlarmsData.individualAlarmData.data.filter(
          (ele) => ele.alarm_id == el['alarm_id']
        );
        if (obj && obj.length > 0) {
          obj.forEach((element) => {
            element['disabled'] = false;
            element['isChecked'] = false;
            element['selectedAlready'] = false;
          });
          // obj['disabled'] = false;
          // obj['isChecked'] = false;
        }
      }
    });
    this.workFlowAlarmsData.monitoredIndividualAlarm.data =
      this.workFlowAlarmsData.individualAlarmData.data.filter(
        (el) => el['isChecked'] == true
      );

    this.workFlowAlarmsData.monitoredIndividualAlarm.data = JSON.parse(
      JSON.stringify(this.workFlowAlarmsData.monitoredIndividualAlarm.data)
    );

    this.workFlowAlarmsData.monitoredIndividualAlarm.data.forEach((el) => {
      el['disabled'] = false;
      el['isChecked'] = false;
      el['selectedAlready'] = false;
    });

    // if(this.workFlowAlarmsData.monitoredIndividualAlarm.data.length == 0){
    //   this.workFlowAlarmsData.individualAlarmData.prevSearchCategory = undefined;
    //   this.workFlowAlarmsData.individualAlarmData.prevSearchSeverity = undefined;
    // }

    this.workFlowAlarmsData.individualAlarmData.data.forEach((element) => {
      if(element['checkedTemporarily']){
        element['isChecked'] = true;
        element['checkedTemporarily'] = false;
      }
    });
    
    this.calculateTotalMonitoredAlarms();
    this.workFlowAlarmsData.individualAlarmData = {
      ...this.workFlowAlarmsData.individualAlarmData,
    };
    this.workFlowAlarmsData.individualAlarmData.data = [
      ...this.workFlowAlarmsData.individualAlarmData.data,
    ];
    this.workFlowAlarmsData.monitoredIndividualAlarm = {
      ...this.workFlowAlarmsData.monitoredIndividualAlarm,
    };
    this.workFlowAlarmsData.monitoredIndividualAlarm.data = [
      ...this.workFlowAlarmsData.monitoredIndividualAlarm.data,
    ];

    this.workFlowAlarmsData.individualAlarmData.rerenderSubject.next(true);
    this.workFlowAlarmsData.monitoredIndividualAlarm.rerenderSubject.next(true);
  }
  removeSelectedGroupAlarmList() {
    this.workFlowAlarmsData.groupAlarmData.data.forEach((element) => {
      if(!element['selectedAlready'] && element['isChecked']){
        element['isChecked'] = false;
        element['checkedTemporarily'] = true;
      }
    });
    this.workFlowAlarmsData.monitoredGroupAlarm.data.forEach((el) => {
      if (el['isChecked']) {
        let obj = this.workFlowAlarmsData.groupAlarmData.data.find(
          (ele) => ele.group_id == el['group_id']
        );
        if (obj) {
          obj['disabled'] = false;
          obj['selectedAlready'] = false;
          obj['isChecked'] = false;
        }
      }
    });
    this.workFlowAlarmsData.monitoredGroupAlarm.data =
      this.workFlowAlarmsData.groupAlarmData.data.filter(
        (el) => el['isChecked'] == true
      );

    this.workFlowAlarmsData.monitoredGroupAlarm.data = JSON.parse(
      JSON.stringify(this.workFlowAlarmsData.monitoredGroupAlarm.data)
    );

    this.workFlowAlarmsData.monitoredGroupAlarm.data.forEach((el) => {
      el['disabled'] = false;
      el['selectedAlready'] = false;
      el['isChecked'] = false;
    });

    this.workFlowAlarmsData.groupAlarmData.data.forEach((element) => {
      if(element['checkedTemporarily']){
        element['isChecked'] = true;
        element['checkedTemporarily'] = false;
      }
    });

    this.calculateTotalMonitoredAlarms();
    this.workFlowAlarmsData.groupAlarmData = {
      ...this.workFlowAlarmsData.groupAlarmData,
    };
    this.workFlowAlarmsData.groupAlarmData.data = [
      ...this.workFlowAlarmsData.groupAlarmData.data,
    ];
    this.workFlowAlarmsData.monitoredGroupAlarm = {
      ...this.workFlowAlarmsData.monitoredGroupAlarm,
    };
    this.workFlowAlarmsData.monitoredGroupAlarm.data = [
      ...this.workFlowAlarmsData.monitoredGroupAlarm.data,
    ];
    // this.workFlowAlarmsData.groupAlarmData = {...this.workFlowAlarmsData.groupAlarmData};
    // this.workFlowAlarmsData.monitoredGroupAlarm = {...this.workFlowAlarmsData.monitoredGroupAlarm};
    this.workFlowAlarmsData.groupAlarmData.rerenderSubject.next(true);
    this.workFlowAlarmsData.monitoredGroupAlarm.rerenderSubject.next(true);
  }
  removeSelectedTransformAlarmList() {
    this.workFlowAlarmsData.transformAlarmData.data.forEach((element) => {
      if(!element['selectedAlready'] && element['isChecked']){
        element['isChecked'] = false;
        element['checkedTemporarily'] = true;
      }
    });
    this.workFlowAlarmsData.monitoredTransformAlarm.data.forEach((el) => {
      if (el['isChecked']) {
        let obj = this.workFlowAlarmsData.transformAlarmData.data.find(
          (ele) => ele.alarmRuleId == el['alarmRuleId']
        );
        if (obj) {
          obj['disabled'] = false;
          obj['isChecked'] = false;
          obj['selectedAlready'] = false;
        }
      }
    });

    this.workFlowAlarmsData.monitoredTransformAlarm.data =
      this.workFlowAlarmsData.transformAlarmData.data.filter(
        (el) => el['isChecked'] == true
      );

    this.workFlowAlarmsData.monitoredTransformAlarm.data = JSON.parse(
      JSON.stringify(this.workFlowAlarmsData.monitoredTransformAlarm.data)
    );

    this.workFlowAlarmsData.monitoredTransformAlarm.data.forEach((el) => {
      el['disabled'] = false;
      el['isChecked'] = false;
      el['selectedAlready'] = false;
    });

    this.workFlowAlarmsData.transformAlarmData.data.forEach((element) => {
      if(element['checkedTemporarily']){
        element['isChecked'] = true;
        element['checkedTemporarily'] = false;
      }
    });
   
    this.calculateTotalMonitoredAlarms();
    this.workFlowAlarmsData.transformAlarmData = {
      ...this.workFlowAlarmsData.transformAlarmData,
    };
    this.workFlowAlarmsData.transformAlarmData.data = [
      ...this.workFlowAlarmsData.transformAlarmData.data,
    ];
    this.workFlowAlarmsData.monitoredTransformAlarm = {
      ...this.workFlowAlarmsData.monitoredTransformAlarm,
    };
    this.workFlowAlarmsData.monitoredTransformAlarm.data = [
      ...this.workFlowAlarmsData.monitoredTransformAlarm.data,
    ];
    // this.workFlowAlarmsData.transformAlarmData = {...this.workFlowAlarmsData.transformAlarmData};
    // this.workFlowAlarmsData.monitoredTransformAlarm = {...this.workFlowAlarmsData.monitoredTransformAlarm};
    this.workFlowAlarmsData.transformAlarmData.rerenderSubject.next(true);
    this.workFlowAlarmsData.monitoredTransformAlarm.rerenderSubject.next(true);
  }

  calculateTotalMonitoredAlarms() {
    let groupAlarms = this.workFlowAlarmsData.monitoredGroupAlarm.data.reduce((acc, curr) => { return acc + Number(curr['no_of_alarms'])}, 0);
    this.workFlowAlarmsData.totMonitoredAlarms =
      this.workFlowAlarmsData.monitoredIndividualAlarm.data.length +
      groupAlarms +
      this.workFlowAlarmsData.monitoredTransformAlarm.data.length;
  }

  callAddRemove(data) {
    if (data.table == 'group' && data.mode == 'add') {
      this.selectedAlarmsActiveTab = 'selected_alarm_groups';
      this.addSelectedGroupAlarmList();
    } else if (data.table == 'transform' && data.mode == 'add') {
      this.selectedAlarmsActiveTab = 'selected_transform_alarms';
      this.addSelectedTransformAlarmList();
    } else if (data.table == 'individual' && data.mode == 'add') {
      this.selectedAlarmsActiveTab = 'selected_individual_alarms';
      // this.checkCategorySeverity();
      this.checkrulesExist();
      // this.addSelectedIndividualAlarmList();
    } else if (data.table == 'monitoredGroup' && data.mode == 'remove') {
      this.alarmsActiveTab = 'alarm_group';
      this.removeSelectedGroupAlarmList();
    } else if (data.table == 'monitoredTransform' && data.mode == 'remove') {
      this.alarmsActiveTab = 'transform_alarm';
      this.removeSelectedTransformAlarmList();
    } else if (data.table == 'monitoredIndividual' && data.mode == 'remove') {
      this.alarmsActiveTab = 'individual_alarm';
      this.removeSelectedIndividualAlarmList();
    }
  }
  checkrulesExist(){
    let alarmRulesObj = this.workFlowAlarmsData.individualAlarmData.data.filter((el) => el['alarm_name'].includes('multiple-onts-down') && el['alarm_category'] == 'PON transformed' && el['isChecked'] == true);

    if(alarmRulesObj.length == 0){
      this.errorMsg.emit(false);
      this.addSelectedIndividualAlarmList();
    }else{
      let rulesnotExist = false;
      let errorMessage = '';

      // if(alarmRulesObj.every((el) => el['rulesnotexist'])){
      //   errorMessage = this.language['No Transform Alarm Rules exist'];
      //   rulesnotExist = true;
      // }else{
        alarmRulesObj.forEach((el) => {
          if(el['rulesnotexist']){
            errorMessage += this.language.rulesNotExist(el['alarm_name']);
            rulesnotExist = true;
          }
        });
      // }
      

      if(rulesnotExist){
        this.errorMsg.emit(errorMessage);
        this.canShowTableBodySubject.next(true);
        return false;
      }else{
        this.errorMsg.emit(false);
        this.addSelectedIndividualAlarmList();
      }
    }
  }
  checkCategorySeverity(){
    let noOjcAdd = false;
    let warningContent = undefined;
    let name = '';
    if (
      (!this.workFlowAlarmsData.individualAlarmData.prevSearchCategory &&
        !this.workFlowAlarmsData.individualAlarmData.prevSearchSeverity &&
        this.workFlowAlarmsData.individualAlarmData.searchCategory &&
        this.workFlowAlarmsData.individualAlarmData.searchCategory != '') ||
      (!this.workFlowAlarmsData.individualAlarmData.prevSearchSeverity &&
        !this.workFlowAlarmsData.individualAlarmData.prevSearchCategory &&
        this.workFlowAlarmsData.individualAlarmData.searchSeverity &&
        this.workFlowAlarmsData.individualAlarmData.searchSeverity != '') ||
      (this.workFlowAlarmsData.individualAlarmData.searchCategory &&
        this.workFlowAlarmsData.individualAlarmData.searchCategory != '' &&
        this.workFlowAlarmsData.individualAlarmData.prevSearchCategory ==
          this.workFlowAlarmsData.individualAlarmData.searchCategory) ||
      (this.workFlowAlarmsData.individualAlarmData.searchSeverity &&
        this.workFlowAlarmsData.individualAlarmData.searchSeverity != '' &&
        this.workFlowAlarmsData.individualAlarmData.prevSearchSeverity ==
          this.workFlowAlarmsData.individualAlarmData.searchSeverity)
    ) {
      noOjcAdd = true;
    } else if (
      this.workFlowAlarmsData.individualAlarmData.categoryOrSeverity ==
        'CATEGORY' &&
      this.workFlowAlarmsData.individualAlarmData.searchSeverity &&
      this.workFlowAlarmsData.individualAlarmData.searchSeverity != ''
    ) {
      warningContent =
        `Are you sure you want to remove the Monitored Alarms in Category <b> (${this.workFlowAlarmsData.individualAlarmData.prevSearchCategory}-${this.workFlowAlarmsData.monitoredIndividualAlarm.data.length}) </b>?`;
      name = '';
    } else if (
      this.workFlowAlarmsData.individualAlarmData.categoryOrSeverity ==
        'SEVERITY' &&
      this.workFlowAlarmsData.individualAlarmData.searchCategory &&
      this.workFlowAlarmsData.individualAlarmData.searchCategory != ''
    ) {
      let severity = this.workFlowAlarmsData.individualAlarmData.prevSearchSeverity.charAt(0).toUpperCase() + this.workFlowAlarmsData.individualAlarmData.prevSearchSeverity.slice(1);
      warningContent =
        `Are you sure you want to remove the Monitored Alarms in Severity <b> (${severity}-${this.workFlowAlarmsData.monitoredIndividualAlarm.data.length}) </b> ?`;
    } else if (
      this.workFlowAlarmsData.individualAlarmData.searchCategory &&
      this.workFlowAlarmsData.individualAlarmData.searchCategory != '' &&
      this.workFlowAlarmsData.individualAlarmData.prevSearchCategory !=
        this.workFlowAlarmsData.individualAlarmData.searchCategory
    ) {
      warningContent =
        `Are you sure you want to remove the Monitored Alarms in Category <b> (${this.workFlowAlarmsData.individualAlarmData.prevSearchCategory}-${this.workFlowAlarmsData.monitoredIndividualAlarm.data.length}) </b> ?`;
    } else if (
      this.workFlowAlarmsData.individualAlarmData.searchSeverity &&
      this.workFlowAlarmsData.individualAlarmData.searchSeverity != '' &&
      this.workFlowAlarmsData.individualAlarmData.prevSearchSeverity !=
        this.workFlowAlarmsData.individualAlarmData.searchSeverity
    ) {
      let severity = this.workFlowAlarmsData.individualAlarmData.prevSearchSeverity.charAt(0).toUpperCase() + this.workFlowAlarmsData.individualAlarmData.prevSearchSeverity.slice(1);
      warningContent =
        `Are you sure you want to remove the Monitored Alarms in Severity <b> (${severity}-${this.workFlowAlarmsData.monitoredIndividualAlarm.data.length}) </b> ?`;
    }

    if(noOjcAdd){
      if (this.workFlowAlarmsData.individualAlarmData.searchCategory) {
        this.workFlowAlarmsData.individualAlarmData.prevSearchSeverity = undefined;
        this.workFlowAlarmsData.individualAlarmData.prevSearchCategory =
          this.workFlowAlarmsData.individualAlarmData.searchCategory;
        this.workFlowAlarmsData.individualAlarmData.categoryOrSeverity =
          'CATEGORY';
      }
      if (this.workFlowAlarmsData.individualAlarmData.searchSeverity) {
        this.workFlowAlarmsData.individualAlarmData.prevSearchCategory = undefined;
        this.workFlowAlarmsData.individualAlarmData.prevSearchSeverity =
          this.workFlowAlarmsData.individualAlarmData.searchSeverity;
        this.workFlowAlarmsData.individualAlarmData.categoryOrSeverity =
          'SEVERITY';
      }
      this.addSelectedIndividualAlarmList();
    }else{
      // show popup
      this.removeAlarms(warningContent);
      // confirmed then execute following
      // else no change in content
      
    }
    
  }
  changeNavPills(pill, table, $event: MouseEvent) {
    $event.preventDefault();
    if (table == 'non-monitored') {
      this.alarmsActiveTab = pill;
    } else {
      this.selectedAlarmsActiveTab = pill;
    }
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
  close(type?): void {
    this.modalLoader = false;
    this.modalService.dismissAll();
    this.modalRef.close();
    if(type == 'No'){
      this.canShowTableBodySubject.next(true);
    }
  }
  closeAlert() {
    this.canShowTableBodySubject.next(true);
    this.alarmRemoveError = '';
  }
  doRemoveAlarms(){
    if (this.workFlowAlarmsData.individualAlarmData.searchCategory) {
      this.workFlowAlarmsData.individualAlarmData.prevSearchCategory =
        this.workFlowAlarmsData.individualAlarmData.searchCategory;
      this.workFlowAlarmsData.individualAlarmData.categoryOrSeverity =
        'CATEGORY';
    }
    if (this.workFlowAlarmsData.individualAlarmData.searchSeverity) {
      this.workFlowAlarmsData.individualAlarmData.prevSearchSeverity =
        this.workFlowAlarmsData.individualAlarmData.searchSeverity;
      this.workFlowAlarmsData.individualAlarmData.categoryOrSeverity =
        'SEVERITY';
    }
    this.workFlowAlarmsData.individualAlarmData.data.forEach((el) => {
      if (el['selectedAlready'] == true) {
        el['disabled'] = false;
        el['selectedAlready'] = false;
        el['isChecked'] = false
      }
    });
    this.workFlowAlarmsData.monitoredIndividualAlarm.data = [];
    this.addSelectedIndividualAlarmList();
    this.close();
  }
  ngOnDestroy(): void {
    if (this.languageSubject) this.languageSubject.unsubscribe();
    // this.workFlowAlarmsData.individualAlarmData.rerenderSubject.unsubscribe();
    // this.workFlowAlarmsData.groupAlarmData.rerenderSubject.unsubscribe();
    // this.workFlowAlarmsData.transformAlarmData.rerenderSubject.unsubscribe();
    // this.workFlowAlarmsData.monitoredTransformAlarm.rerenderSubject.unsubscribe();
    // this.workFlowAlarmsData.monitoredIndividualAlarm.rerenderSubject.unsubscribe();
    // this.workFlowAlarmsData.monitoredGroupAlarm.rerenderSubject.unsubscribe();
  }
}
