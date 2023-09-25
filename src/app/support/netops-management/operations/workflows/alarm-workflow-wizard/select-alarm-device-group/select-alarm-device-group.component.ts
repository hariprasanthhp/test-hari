import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { element } from 'protractor';
import { Subject } from 'rxjs';
import { combineAll } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alarm-select-device-wizard',
  templateUrl: './select-alarm-device-group.component.html',
  styleUrls: ['./select-alarm-device-group.component.scss']
})
export class SelectAlarmDeviceGroupComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  @Input() workflowInputData
  @Output() workflowDeviceData: EventEmitter<any> = new EventEmitter();
  @Output() activeTab: EventEmitter<any> = new EventEmitter();

  orgId: number;
  language: any;
  pageAvailable: boolean = false;
  isRerender = false;
  loading: boolean = true;
  dataAvailable: boolean;
  showdeviceform: boolean = false;
  selectDeviceGrp: boolean = true
  selectedItem = [];
  deviceData
  deviceGrpData;
  languageSubject;

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';

  tableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    dom: 't',
    ordering: false,
    columnDefs: [
      { targets: [1, 2, 3, 4], orderable: false },
      { targets: [0], orderable: true }
    ],
    order: [0, 'asc'],
    drawCallback: (settings) => {
      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find('#devicegroup-table_last').addClass('disabled');
      }
    }
  };
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  frTable: any;

  translateSubscribe: any;
  getDeviceGrpSubscribe
  sysAdminRoute: string = 'systemAdministration';
  inputAlarms = [{ label: 'device_sync_failure' }, { label: 'post_i2c' }, { label: 'dhcp-server-detected' },]
  alarmValueSelected: any;

  constructor(
    private api: NetopsServiceService, private http: HttpClient,
    private customTranslateService: CustomTranslateService,
    private commonOrgService: CommonService,
    private changeDetect: ChangeDetectorRef,
    private sso: SsoAuthService, private fb: FormBuilder,
    private translateService: TranslateService

  ) {
    this.orgId = this.sso.getOrgId();
    // this.language = this.customTranslateService.defualtLanguage;
    // if (this.language) {
    //   this.pageAvailable = true
    // }
    // this.translateSubscribe = this.customTranslateService.selectedLanguage.subscribe(data => {
    //   this.language = data;
    //   this.dataAvailable = false;
    //   this.loading = true;
    //   this.isRerender = true;
    //   this.setTableOptions('language');

    // });

    // this.commonOrgService.currentPageAdder('workflow');
    // this.frTable = this.customTranslateService.fr;

  }
  categories = [{ id: "All", name: "All" }];
  filtersForm = this.fb.group({
    category: [],
  });
  baseUrl = `${environment.API_BASE_URL}analytics-engine/`;
  ngOnInit(): void {
    this.getDeviceGroup()
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    })
    if (this.workflowInputData.selectedDeviceGroup == "No") {
      this.hideform()
    }
    if (this.workflowInputData.categories.length != 0) {
      this.filtersForm.get('category').setValue(this.workflowInputData.categories)
    }
    this.getCategories();
  }
  getCategories() {

    let params = {
      //date: `${this.dateUtilsService.getUtCMilliSecByDateObj(fields['startDate'])},${this.dateUtilsService.getUtCMilliSecByDateObj(fields['endDate'], true)}`,
      historyReport: false,
    }
    let query = "";
    for (var key in params) {

      if (params[key] == undefined || params[key] == "" || params[key] === []) {
        continue;
      }

      if (query != "") {
        query += "&";
      }

      query += key + "=" + encodeURIComponent(params[key]);

    }

    query += '&historyReport=false';

    this.http.get(`${this.baseUrl}category?${query}`).subscribe((json: any) => {
      let categories = [
        { id: "All", name: "All" }
      ];

      if (json) {
        json.forEach(element => {

          if (!element) {
            return;
          }

          categories.push({
            id: element,
            name: element
          })
        });
      }

      this.categories = categories;
      this.filtersForm.controls['category'].setValue(['All']);
    })
  }

  validateCategory(event: any) {
    let categories = this.filtersForm.get('category').value;
    if (event.id === 'All') {
      categories = ['All'];
    } else {
      let index = categories.indexOf('All');
      if (index > -1) {
        categories.splice(index, 1);
      }

    }

    this.filtersForm.get('category').setValue(categories);

  }
  setTableOptions(type?: string) {
    this.tableOptions = {
      pagingType: 'full_numbers',
      rowId: 'id',
      searching: false,
      lengthChange: false,
      paging: true,
      pageLength: 10,
      ordering: false,
      dom: 't',
      columnDefs: [
        { targets: [1, 2, 3, 4], orderable: false },
        { targets: [0], orderable: true }
      ],
      order: [0, 'asc'],
      drawCallback: (settings) => {
        let total = settings.aoData.length;
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#devicegroup-table_last').addClass('disabled');
        }
      }
    };
    // this.tableLanguageOptions();
    if (type && type == 'language') {
      setTimeout(() => {
        this.rerender();
        setTimeout(() => {
          this.dataAvailable = true;
          this.loading = false;
        }, 100);
      }, 100);
    } else {
      setTimeout(() => {
        this.dataAvailable = true;
        // this.hideSearch();
        this.loading = false;
      }, 500);
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  // tableLanguageOptions() {
  //   if (localStorage.getItem('defaultLanguage') && localStorage.getItem('defaultLanguage') == 'fr') {
  //     this.tableOptions.language = this.frTable;
  //   } else if (localStorage.getItem('defaultLanguage') && localStorage.getItem('defaultLanguage') == 'en' && this.tableOptions.language) {
  //     delete this.tableOptions.language;
  //   }
  // }

  showform() {
    this.showdeviceform = true;
    this.selectDeviceGrp = true
  }

  hideform() {
    this.showdeviceform = false;
    this.selectDeviceGrp = false
    this.workflowInputData.groups = []
    if (this.deviceGrpData) {
      this.deviceGrpData.forEach(element => {
        element.checked = false
      });
    }
  }

  ngOnDestroy(): void {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }
    if (this.getDeviceGrpSubscribe) {
      this.getDeviceGrpSubscribe.unsubscribe();
    }
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }

  getDeviceGroup() {
    let limit = 0;
    let skip = 0;
    this.getDeviceGrpSubscribe = this.api.GetDeviceGroup(this.orgId, skip, limit).subscribe((res: any) => {
      if (res) {
        let selectedGroup = this.workflowInputData.groups
        // if(this.workflowInputData.groups){
        //   this.workflowInputData.groups.forEach(element => {
        //     selectedGroup.push(element)
        //   });
        // }
        res.forEach(element => {
          if (selectedGroup.indexOf(element._id) != -1) {
            element['checked'] = true
          } else {
            element['checked'] = false
          }
        });
        if (this.workflowInputData.state === 'In Progress') {
          this.deviceGrpData = res.filter(data => data.checked)
        } else {
          this.deviceGrpData = res;
        }
        this.setTableOptions();
        if (this.isRerender) {
          this.rerender();
          this.isRerender = false;
        } else {
          this.dtTrigger.next();
        }
      }
    }, (err: HttpErrorResponse) => {
      this.setTableOptions();
      if (this.isRerender) {
        this.rerender();
        this.isRerender = false;
      } else {
        this.dtTrigger.next();
      }
      this.loading = false;
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    }, () => {
      //this.loading = false;
    });
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.sso.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  go_next() {
    if (this.selectDeviceGrp && this.workflowInputData.groups.length) {
      if (this.workflowInputData.levelPassed <= 2) {
        this.workflowInputData.levelPassed = 2;
      }

      this.workflowDeviceData.emit(this.workflowInputData);
      this.activeTab.emit('Select Operation Parameters');
      return true;
    } else if (this.workflowInputData.selectedAlarm == 'Yes') {
      if (this.workflowInputData.levelPassed <= 2) {
        this.workflowInputData.levelPassed = 2;
      }
      if (this.workflowInputData.selectedCategories == undefined && this.workflowInputData.selectedDeviceGroup == undefined) {
        this.error = true
        this.errorInfo = 'Please select at least one option.';
        return
      }
      if (this.workflowInputData.selectedCategories == "Yes") {
        this.workflowInputData.categories = this.filtersForm.get('category').value;
        if (this.workflowInputData.categories.length == 0) {
          this.error = true
          this.errorInfo = 'Please select at least one category.';
          return
        }
      } else {
        this.workflowInputData.categories = []
      }
      this.workflowDeviceData.emit(this.workflowInputData);
      this.activeTab.emit('Select Operation Parameters')
      return true;
    }
    else if (!this.selectDeviceGrp && this.workflowInputData.selectedAlarm != undefined) {
      if (this.workflowInputData.levelPassed <= 2) {
        this.workflowInputData.levelPassed = 2;
      }
      this.workflowDeviceData.emit(this.workflowInputData);
      this.activeTab.emit('Select Operation Parameters')
      return true;
    } else {
      this.error = true
      if (this.workflowInputData.selectedAlarm == undefined) {
        this.errorInfo = 'Please select at least one option.';
      } else {
        this.errorInfo = this.language['Please select at least one device group.'];
      }
    }

    return false;
  }

  go_previous() {
    this.workflowDeviceData.emit(this.workflowInputData);
    this.activeTab.emit('Start');
  }

  findObjByKeyName(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i]._id === nameKey) {
        return myArray[i];
      }
    }
    return false;
  }

  findObjIndex(nameKey, myArray) {
    // for (var i=0; i < myArray.length; i++) {
    //     if (myArray[i][] === nameKey) {
    //         return i
    //     }
    // }

    return myArray.indexOf(nameKey)
  }


  bindDeviceData(event, value) {
    if (event.target.checked) {
      this.error = false
      if (!this.findObjByKeyName(value, this.workflowInputData.groups)) {
        this.workflowInputData.groups.push(value)
      }
    } else {
      let indexVal = this.findObjIndex(value, this.workflowInputData.groups)
      if (indexVal != -1) {
        this.workflowInputData.groups.splice(indexVal, 1)
      }
    }
  }
  deviceaction() {
    if (this.workflowInputData.actions.length != 0) {
      this.workflowInputData.actions.length = 0;
    }
  }
}
