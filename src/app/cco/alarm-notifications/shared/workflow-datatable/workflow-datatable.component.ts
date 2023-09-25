import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { fromEvent, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
} from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app//shared/services/custom-translate.service';
// import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
// import { pipe } from 'rxjs';

@Component({
  selector: 'app-workflow-datatable',
  templateUrl: './workflow-datatable.component.html',
  styleUrls: ['./workflow-datatable.component.scss'],
})
export class WorkflowDatatableComponent
  implements OnInit, OnChanges, AfterViewInit
{
  // @ViewChild('searchAlarmInput') searchAlarmInput;
  searchCategory: undefined;
  searchSeverity: undefined;
  searchAlarm: string = undefined;
  canAdd: boolean = false;
  canRemove: boolean = false;
  loading: boolean;
  language: any = {};
  languageSubject;
  renderedOnce: boolean;
  dataAvailable: boolean;
  dtOptions: DataTables.Settings = {};
  datatableElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  frTable: DataTables.LanguageSettings;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  private _alarmData: any;
  // _actAlarmData: any;
  canShowTableBody: boolean = false;
  @Input() canShowTableBodyInputSubject: Subject<boolean>;
  tempSeverity: any;
  tempCategory: any;
  @Input()
  set alarmData(value: any) {
    this._alarmData = value;
  }
  get alarmData() {
    return this._alarmData;
  }
  @ViewChild('searchAlarmsInput', { static: true })
  searchAlarmsInput: ElementRef;
  @ViewChild('checkAllViewChild', { static: true })
  checkAllViewChild: ElementRef;
  @Output() addRemoveAlarmList = new EventEmitter<any>();
  esTable: DataTables.LanguageSettings;
  germanTable: DataTables.LanguageSettings;
  constructor(
    private translateService: TranslateService,
    private customTranslateService: CustomTranslateService
  ) {
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.germanTable = this.translateService.de_DE
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        setTimeout(() => {
          this._alarmData = { ...this._alarmData };
          this.alarmData = { ...this.alarmData };
        }, 1000);
        this.tableLanguageOptions();
        this.rerender(true, true);
        
      }
    );
  }
  ngOnInit(): void {
    if(this.alarmData && this.alarmData.table && (this.alarmData.table == 'individual' || this.alarmData.table == 'monitoredIndividual')){
      jQuery.fn['dataTable'].ext.type.detect.unshift(
        function ( d ) {
            return d === 'CRITICAL' || d === 'MAJOR' || d === 'MINOR' || d === 'WARNING' || d === 'INFO' ?
                'severity-order' :
                null;
        }
    );
      jQuery.fn['dataTable'].ext.type.order['severity-order-pre'] = function ( d ) {
        switch ( d ) {
            case 'CRITICAL':    return 1;
            case 'MAJOR': return 2;
            case 'MINOR':   return 3;
            case 'WARNING':   return 4;
            case 'INFO':   return 5;
        }
        return 0;
    };
    }
    
    if (this.alarmData && this.alarmData['rerenderSubject']) {
      this.alarmData.rerenderSubject.subscribe((v) => {
        this.rerender(true);
        this.onCheckRow(this.alarmData?.tableType, undefined, -1);
      });
    }
    this.renderTable(true);
    if (this.canShowTableBodyInputSubject) {
      this.canShowTableBodyInputSubject.subscribe((v) => {
        this.canShowTableBody = true;
      });
    }
    this.tableLanguageOptions();
  }

  ngAfterViewInit() {
    fromEvent(this.searchAlarmsInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(1500),
        distinctUntilChanged(),
        tap((event: KeyboardEvent) => {
          this.searchAlarms(
            this.searchAlarmsInput.nativeElement.value,
            this.alarmData?.table
          );
        })
      )
      .subscribe();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.doSearch(changes, 'ngOnChange');
  }

  doSearch(changes, type?){
    // if (!this.alarmData.searchCategory && !this.alarmData.searchSeverity && !this.searchAlarm) {
    //   if (changes.alarmData && changes.alarmData.currentValue) {
    //     this.alarmData = changes.alarmData.currentValue;
    //     // this._actAlarmData = [...changes.alarmData.currentValue.data];
    //   }
    // } else {
      if(type == 'ngOnChange'){
        this.alarmData = changes.alarmData?.currentValue;
      }else{
        this.alarmData = changes
      }
      
      // }
      if(this.alarmData.searchCategory && this.alarmData.searchCategory != ''){
        // this.searchCustomData('category');
        this.searchAlarms(this.alarmData.searchCategory, 'category');
      } 
      if(this.alarmData.searchSeverity && this.alarmData.searchSeverity != ''){
        // this.searchCustomData('severity');
        this.searchAlarms(this.alarmData.searchSeverity, 'severity');
      }
      if(this.searchAlarm && this.searchAlarm != ''){
        this.searchAlarms(this.searchAlarm, this.alarmData?.table);
      }
      // this.searchCategorySeverity();
      // if (this.searchAlarm && this.searchAlarm != '') {
      //   this.searchAlarms(this.searchAlarm, this.alarmData?.table);
      // }
  
      // if(!this.alarmData.searchCategory &&
      //   !this.alarmData.searchSeverity && !this.searchAlarm){
      //     this.searchAlarms(undefined, this.alarmData?.table);
      // }
  }

  searchCategorySeverity() {
    if (this.alarmData.searchCategory && this.alarmData.searchCategory != '') {
      this.searchCategory = this.alarmData.searchCategory;
      this.searchAlarms(this.alarmData.searchCategory, 'category');
    } else if (
      this.alarmData.searchSeverity &&
      this.alarmData.searchSeverity != ''
    ) {
      // this.searchCustomData('severity');
      this.searchSeverity = this.alarmData.searchSeverity;
      this.searchAlarms(this.alarmData.searchSeverity, 'severity');
    }else if (
      !this.alarmData.searchCategory &&
      !this.alarmData.searchSeverity &&
      this.alarmData.table == 'individual'
    ) {
      this.rerender(true);
      // this.disableIndividualAlarmsCheckBoxes();
    }
  }
  renderTable(rerender?) {
    this.canShowTableBody = false;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: true,
      processing: false,
      dom: 'tipr',
      columnDefs: this.alarmData && this.alarmData.columnDefs?this.alarmData.columnDefs : [],
      order: this.alarmData && this.alarmData.order?this.alarmData.order : [],
      // columns : this.alarmData.columns
    };
    setTimeout(() => {
      this.dtTrigger.next();
      // this.rerender();
    }, 200);
    // if (this.canShowTableBody) {
      setTimeout(() => {
        this.handleCheckAll();
      }, 1500);
    // }
    setTimeout(() => {
      this.canShowTableBody = true;
    }, 2500);
    
    // setTimeout(() => {
    // this.searchCategorySeverity();
    //Disable individuals alarms check boxes if category / severity are undefined
    // if (
    //   !this.alarmData.searchCategory &&
    //   !this.alarmData.searchSeverity &&
    //   this.alarmData.table == 'individual'
    // ) {
      // this.disableIndividualAlarmsCheckBoxes();
    // }
    // }, 1500);
  }

  rerender(canShowTableBody?, search?) {
    if (canShowTableBody) {
      this.canShowTableBody = false;
    }

    if (this.dtElement && this.dtElement?.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }
    if (canShowTableBody) {
      setTimeout(() => {
        this.canShowTableBody = true;
      }, 2000);
    }

    if (canShowTableBody) {
      setTimeout(() => {
        this.handleCheckAll();
      }, 1500);
    }

    if(search){
      this.doSearch(this.alarmData);
    }
  }
  handleCheckAll() {
    let that = this;
    let allSelected;
    let tableColumn = '',
      tableColumnIndex;
    if (
      this.alarmData.table == 'group' ||
      this.alarmData.table == 'monitoredGroup'
    ) {
      tableColumn = 'group_id';
      tableColumnIndex = 8;
    } else if (
      this.alarmData.table == 'transform' ||
      this.alarmData.table == 'monitoredTransform'
    ) {
      tableColumn = 'alarmRuleId';
      tableColumnIndex = 7;
    } else if (
      this.alarmData.table == 'individual' ||
      this.alarmData.table == 'monitoredIndividual'
    ) {
      tableColumn = 'alarm_id';
      tableColumnIndex = 6;
    }
    if (that.alarmData && that.alarmData['data'] && that.alarmData['data'].length > 0) {
      that.checkAllViewChild.nativeElement.checked = true;
      allSelected = true;
    } else {
      that.checkAllViewChild.nativeElement.checked = false;
      allSelected = false;
    }
    let selectedAlr;
    if (this.dtElement && this.dtElement?.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        if (
          dtInstance.rows({ search: 'applied' })?.data() &&
          dtInstance.rows({ search: 'applied' })?.data()?.length > 0
        ) {
          dtInstance.rows({ search: 'applied' }).every(function () {
            var data = this.data();
            let obj = that._alarmData?.data?.find(
              (el) => el[tableColumn].trim() == data[tableColumnIndex].trim()
            );
            if (obj && !obj['isChecked']) {
              that.checkAllViewChild.nativeElement.checked = false;
            }
            if (!obj['selectedAlready']) {
              allSelected = false;
              selectedAlr = true;
            }
          });
        } else {
          that.checkAllViewChild.nativeElement.checked = false;
          allSelected = false;
        }

        that.alarmData['allSelected'] = allSelected;
        // if (
        //   !that.alarmData.searchCategory &&
        //   !that.alarmData.searchSeverity &&
        //   that.alarmData.table == 'individual'
        // ) {
        //   that.alarmData.allSelected = true;
        // } else if (
        //   ((that.alarmData.searchCategory &&
        //     that.alarmData.searchCategory != '') ||
        //     (that.alarmData.searchSeverity &&
        //       that.alarmData.searchSeverity != '')) &&
        //   that.alarmData.table == 'individual' &&
        //   selectedAlr
        // ) {
        //   that.alarmData.allSelected = false;
        // }
      });
    }
  }
  // tableLanguageOptions() {
  //   if (this.language.fileLanguage == 'fr') {
  //     this.dtOptions.language = this.frTable;
  //   } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
  //     delete this.dtOptions.language;
  //   }
  // }
  tableLanguageOptions() {
    if (this.language && this.language.fileLanguage && this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language && this.language.fileLanguage && this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    } else if (this.language && this.language.fileLanguage && this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.germanTable;
    } else if (this.language && this.language.fileLanguage && this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }
  checkUncheckAll(table, event) {
    let that = this;
    let checked = event.target.checked;
    let canAddRemoveCheck = checked
    let tableColumn = '',
      tableColumnIndex;
    if (
      this.alarmData.table == 'group' ||
      this.alarmData.table == 'monitoredGroup'
    ) {
      tableColumn = 'group_id';
      tableColumnIndex = 8;
    } else if (
      this.alarmData.table == 'transform' ||
      this.alarmData.table == 'monitoredTransform'
    ) {
      tableColumn = 'alarmRuleId';
      tableColumnIndex = 7;
    } else if (
      this.alarmData.table == 'individual' ||
      this.alarmData.table == 'monitoredIndividual'
    ) {
      tableColumn = 'alarm_id';
      tableColumnIndex = 6;
    }
    // page:'current',
    if (this.dtElement && this.dtElement?.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.rows({ search: 'applied' }).every(function () {
          var data = this.data();
          let obj = that._alarmData?.data?.find(
            (el) => el[tableColumn].trim() == data[tableColumnIndex]?.trim()
          );
          if (obj) {
            if (checked || (!checked && !obj['disabled'])) {
              obj['isChecked'] = checked;
            }
          }
        });
        dtInstance.rows().every(function () {
          var data = this.data();
          let obj = that._alarmData?.data?.find(
            (el) => el[tableColumn].trim() == data[tableColumnIndex]?.trim()
          );
          if (obj && !obj['selectedAlready'] && obj['isChecked']) {
            canAddRemoveCheck = true;
          }
        });
      });
    }

    // this._alarmData.data.forEach((element) => {
    //   if (checked || (!checked && !element['disabled'])) {
    //     element['isChecked'] = checked;
    //   }
    // });
    setTimeout(() => {
      if (table == 'monitored') {
        this.canRemove = canAddRemoveCheck;
      } else {
        this.canAdd = canAddRemoveCheck;
      }
    }, 500)
    
    this.alarmData['data'] = [...this._alarmData['data']];
  }
  onCheckRow(table, event, index) {
    if (event) {
      this.alarmData.data[index]['isChecked'] = event?.target?.checked
        ? event.target.checked
        : false;
    }

    if (table == 'monitored') {
      this.canRemove = false;
      if (this.alarmData?.data?.some((el) => el['isChecked'])) {
        this.canRemove = true;
      }
    } else if (table == 'non-monitored') {
      this.canAdd = false;
      this.alarmData?.data?.forEach((element) => {
        if (!element['selectedAlready'] && element['isChecked']) {
          this.canAdd = true;
        }
      });
    }
  }
  searchAlarms(term: string, type?) {
    this.canShowTableBody = false;
    let columnIndex = 0;
    if (type == 'category' || type == 'severity') {
      if (term && term != '') {
        if (typeof term == 'string') {
          term = term;
        } else {
          term = term['id'];
        }
      } else {
        term = '';
      }

      if (type == 'category') {
        this.tempCategory = this.alarmData.searchCategory;
        columnIndex = 2;
        // this.alarmData.categoryOrSeverity = 'CATEGORY';
        this.alarmData.searchCategory = term != '' ? term : undefined;
        // this.alarmData.searchSeverity = undefined;
      } else {
        this.tempSeverity = this.alarmData.searchSeverity;
        columnIndex = 5;
        // this.alarmData.categoryOrSeverity = 'SEVERITY';
        this.alarmData.searchSeverity = term != '' ? term : undefined;
        // this.alarmData.searchCategory = undefined;
        if (term && term != '') {
          if (typeof term == 'string') {
            term = term;
          } else {
            term = term['id'];
          }
          term = term.toUpperCase();
        } else {
          term = '';
        }
      }
    } else {
      if (type != 'individual' && type != 'monitoredIndividual') {
        columnIndex = 3;
      } else {
        columnIndex = 1;
      }

      if (type == 'group' && type == 'monitoredGroup') {
        columnIndex = 3;
      } else if (type == 'individual' || type == 'monitoredIndividual' || type == 'monitoredTransform' || type == 'transform') {
        columnIndex = 1;
      }

      this.searchAlarm = term;
    }

    //Disable individuals alarms check boxes if category / severity are undefined
    // if (
    //   !this.alarmData.searchCategory &&
    //   !this.alarmData.searchSeverity &&
    //   this.alarmData.table == 'individual'
    // ) {
    //   this.disableIndividualAlarmsCheckBoxes();
    // } else if (
    //   ((this.alarmData.searchCategory && this.alarmData.searchCategory != '') ||
    //     (this.alarmData.searchSeverity &&
    //       this.alarmData.searchSeverity != '')) &&
    //   this.alarmData.table == 'individual'
    // ) {
    //   this.disableIndividualAlarmsCheckBoxes(true);
    // }

    // if (
    //   ((!this.alarmData.searchCategory && this.alarmData.searchSeverity) ||
    //     (!this.alarmData.searchSeverity && this.alarmData.searchCategory)) &&
    //   (this.searchAlarm == '' || !this.searchAlarm)
    // ) {
    //   if(this.alarmData.searchCategory && this.alarmData.searchCategory!= ''){
    //     this.tempCategory = this.alarmData.searchCategory;
    //     columnIndex = 2;
    //     term = this.alarmData.searchCategory;
    //     this.alarmData.searchSeverity = undefined;
    //   }else if(this.alarmData.searchSeverity && this.alarmData.searchSeverity!= ''){
    //     this.tempSeverity = this.alarmData.searchSeverity;
    //     columnIndex = 5;
    //     term = this.alarmData.searchSeverity;
    //     this.alarmData.searchCategory = undefined;
    //     if (term && term != '') {
    //       if (typeof term == 'string') {
    //         term = term;
    //       } else {
    //         term = term['id'];
    //       }
    //       term = term.toUpperCase();
    //     } else {
    //       term = '';
    //     }
    //   }
    //   this.rerender(true);
    // } else if (
    //   this.searchAlarm &&
    //   this.searchAlarm != '' &&
    //   type != 'category' &&
    //   type != 'severity'
    // ) {
    //   if (
    //     this.alarmData.table != 'individual' &&
    //     this.alarmData.table != 'monitoredIndividual'
    //   ) {
    //     columnIndex = 3;
    //   } else {
    //     columnIndex = 1;
    //   }
    // }

    setTimeout(() => {
      if (this.dtElement && this.dtElement?.dtInstance) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.columns(columnIndex).search(term).draw();
        });
      }
    }, 200);

    setTimeout(() => {
      this.handleCheckAll();
      this.canShowTableBody = true;
    }, 1500);
  }
  // disableIndividualAlarmsCheckBoxes(hasSearch?) {
  //   let that = this;
  //   let canSaveRemove = false;
  //   that._alarmData.data.forEach((element) => {
  //     if (hasSearch && !element['selectedAlready']) {
  //       element['disabled'] = false;
  //       if (
  //         // ((that.alarmData.searchSeverity &&
  //         //   (that.alarmData.searchSeverity ==
  //         //     that.alarmData.prevSearchSeverity ||
  //         //     !that.alarmData.prevSearchSeverity)) ||
  //         //   (that.alarmData.searchCategory &&
  //         //     (that.alarmData.searchCategory ==
  //         //       that.alarmData.prevSearchCategory ||
  //         //       !that.alarmData.prevSearchCategory))) &&
  //         element['isChecked']
  //       ) {
  //         if (that.alarmData.searchSeverity) {
  //           // if (
  //           //   element['severity'] != that.alarmData.searchSeverity.toUpperCase()
  //           // ) {
  //             element['isChecked'] = false;
  //           // }
  //         } else if (that.alarmData.searchCategory) {
  //           // if (element['category'] != that.alarmData.searchCategory) {
  //             element['isChecked'] = false;
  //           // }
  //         }
  //       }
  //     } else {
  //       element['disabled'] = true;
  //     }
  //   });
  //   if (hasSearch) {
  //     // if (that.alarmData.table == 'monitored') {
  //     //   that.canRemove = checked;
  //     // } else {
  //     let searchItem = '',
  //       searchId = '';
  //     that.canAdd = false;
  //     if (that.alarmData.searchSeverity) {
  //       searchItem = that.alarmData.searchSeverity.toUpperCase();
  //       searchId = 'severity';
  //     } else if (that.alarmData.searchCategory) {
  //       searchItem = that.alarmData.searchCategory;
  //       searchId = 'category';
  //     }
  //     if (
  //       (that.alarmData.searchSeverity &&
  //         that.alarmData.searchSeverity != '') ||
  //       (that.alarmData.searchCategory && that.alarmData.searchCategory != '')
  //     ) {
  //       if (
  //         !that._alarmData.data
  //           .filter((el) => el.isChecked && searchItem == el[searchId])
  //           .every((el) => el.selectedAlready)
  //       ) {
  //         that.canAdd = true;
  //       } else {
  //         that.canAdd = false;
  //       }
  //     }

  //     // }
  //     that.alarmData.allSelected = false;
  //   } else {
  //     that.alarmData.allSelected = true;
  //   }

  //   that.alarmData.data = [...that._alarmData.data];
  // }
  clearSearch() {
    this.searchAlarms('', this.alarmData.table);
  }
  addRemoveSelectedAlarmList(mode, table) {
    this.canShowTableBody = false;
    this.addRemoveAlarmList.emit({ mode: mode, table: table });
  }
  ngOnDestroy(): void {
    if (this.languageSubject) this.languageSubject.unsubscribe();
    this.dtTrigger.unsubscribe();
  }
}
