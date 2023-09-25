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
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app//shared/services/custom-translate.service';

@Component({
  selector: 'app-alarm-groups-datatable',
  templateUrl: './alarm-groups-datatable.component.html',
  styleUrls: ['./alarm-groups-datatable.component.scss'],
})
export class AlarmGroupsDatatableComponent implements OnInit, OnChanges, AfterViewInit {
  canShowTableBody: boolean = false;
  searchAlarm: string = undefined;
  searchCategory: string = undefined;
  searchSeverity: string = undefined;
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
  @ViewChild('searchAlarmsInput', { static: true })
  searchAlarmsInput: ElementRef;
  dtInstance: Promise<DataTables.Api>;
  canAdd : boolean = false;
  canRemove : boolean = false;
  @Input() canShowTableBodyInputSubject: Subject<boolean>;
  private _alarmData: any;
  _actAlarmData: any;
  @Input()
  set alarmData(value: any) {
    this._alarmData = value;
  }
  get alarmData() {
    return this._alarmData;
  }
  @ViewChild('checkAllViewChild', { static: true })
  checkAllViewChild: ElementRef;
  @Output() addRemoveAlarmList = new EventEmitter<any>();
  esTable: DataTables.LanguageSettings;
  germanTable : DataTables.LanguageSettings;
  constructor(
    private translateService: TranslateService,
    private customTranslateService: CustomTranslateService
  ) {
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.germanTable = this.translateService.de_DE;
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        setTimeout(() => {
          this._alarmData = { ...this._alarmData };
          this.alarmData = { ...this.alarmData };
        }, 1000);
        this.tableLanguageOptions();
        this.rerender();
      }
    );
  }
  ngOnInit(): void {
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
    if (this.alarmData.rerenderSubject) {
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
    if(!this.alarmData.searchCategory && !this.searchSeverity){
        
        if (changes.alarmData && changes.alarmData.currentValue) {
          this.alarmData = changes.alarmData.currentValue;
          this._actAlarmData = [...changes.alarmData.currentValue.data];
        }
    else{
      this.alarmData = changes.alarmData.currentValue;
    }
  }
    
    if(this.alarmData.searchCategory && this.alarmData.searchCategory != ''){
      // this.searchCustomData('category');
      this.searchAlarms(this.alarmData.searchCategory, 'category');
    } 
    if(this.searchSeverity && this.searchSeverity != ''){
      // this.searchCustomData('severity');
      this.searchAlarms(this.searchSeverity, 'severity');
    }
    if(this.searchAlarm && this.searchAlarm != ''){
      this.searchAlarms(this.searchAlarm);
    }
  }
  renderTable(rerender?) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: true,
      processing: false,
      dom: 'tipr',
      order: [3, 'asc'],
      columnDefs: this.alarmData.columnDefs,
      // columnDefs: [{ targets: [0], orderable: false }],
      // columns : this.alarmData.columns
    };
    this.tableLanguageOptions();
    setTimeout(() => {
      this.dtTrigger.next();
      this.rerender();
    }, 200);

    setTimeout(() => {
      this.canShowTableBody = true;
    }, 2500);
  }

  rerender(canShowTableBody?) {
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
      }, 2000);
    }
  }
  handleCheckAll() {
    let that = this;
    let allSelected;
    let tableColumn = 'alarm_id', tableColumnIndex = 4;
    
    if(that.alarmData.data.length > 0){
      that.checkAllViewChild.nativeElement.checked = true;
      allSelected = true;
    }else{
      that.checkAllViewChild.nativeElement.checked = false;
      allSelected = false;
    }
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      if(dtInstance.rows({ search: 'applied' })?.data() && dtInstance.rows({ search: 'applied' }).data().length > 0){
        dtInstance.rows({ search: 'applied' }).every(function () {
          var data = this.data();
          let obj = that._alarmData.data.find(
            (el) => el[tableColumn].trim() == data[tableColumnIndex].trim()
          );
          if (!obj['isChecked']) {
            that.checkAllViewChild.nativeElement.checked = false;
          }
          if(!obj['selectedAlready']){
            allSelected = false;
          }
        });
      }else{
        that.checkAllViewChild.nativeElement.checked = false;
        allSelected = false
      }
     
      that.alarmData.allSelected = allSelected;
    });
    
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
  checkUncheckAll(table, event) {
    let that = this;
    let checked = event.target.checked;
    let tableColumn = 'alarm_id', tableColumnIndex = 4;
    // page:'current',
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.rows({"search":"applied" }).every( function () {
        var data = this.data();
        let obj = that._alarmData.data.find(el => el[tableColumn].trim() == data[tableColumnIndex].trim());
        if(obj){
          if (checked || (!checked && !obj['disabled'])) {
            obj['isChecked'] = checked;
          }
        }
      });
    });
    // this._alarmData.data.forEach((element) => {
    //   if (checked || (!checked && !element['disabled'])) {
    //     element['isChecked'] = checked;
    //   }
    // });
    if(table == 'monitored'){
      this.canRemove = checked;
    }else{
      this.canAdd = checked;
    }
    this.alarmData.data = [...this._alarmData.data];
  }

  onCheckRow(table, event, index){
    if(event){
      this.alarmData.data[index]['isChecked'] = event?.target?.checked?event.target.checked : false;
    }
    
    if(table == 'monitored'){
      this.canRemove = false;
      if(this.alarmData.data.some((el) => el['isChecked'])){
        this.canRemove = true;
      }
    }else if(table == 'non-monitored'){
      this.canAdd = false;
      this.alarmData.data.forEach((element) => {
        if(!element['selectedAlready'] && element['isChecked']){
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
        if(typeof term == 'string'){
          term = term;
        }else{
          term = term['id'];
        }
        
      } else {
        term = '';
      }

      if (type == 'category') {
        columnIndex = 2;
        this.alarmData.searchCategory = term != '' ? term : undefined;
        // this.searchSeverity = undefined;
      } else {
        columnIndex = 3;
        // this.alarmData.searchCategory = undefined;
        this.searchSeverity = term != '' ? term : undefined;
        if (term && term != '') {
          if(typeof term == 'string'){
            term = term
          }else{
            term = term['id'];
          }
          term = term.toUpperCase();
        } else {
          term = '';
        }
      }
    } else {
      columnIndex = 1;
      this.searchAlarm = term;
    }

     //Disable individuals alarms check boxes if category / severity are undefined
  if (this.alarmData.table == 'group') {
      this.disableIndividualAlarmsCheckBoxes(true);
    }

    // if((!this.alarmData.searchCategory && this.searchSeverity) || (!this.searchSeverity && this.alarmData.searchCategory)){
    //   this.rerender(true);
    // }
    setTimeout(() => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.columns(columnIndex).search(term).draw();
      });
    });
    setTimeout(() => {
      this.handleCheckAll();
      this.canShowTableBody = true;
    }, 1500);
  }
   disableIndividualAlarmsCheckBoxes(hasSearch?) {
    let that = this;
    let canSaveRemove = false;
    that._alarmData.data.forEach((element) => {
      if (hasSearch && !element['selectedAlready']) {
        element['disabled'] = false;
        if (
          // ((that.alarmData.searchSeverity &&
          //   (that.alarmData.searchSeverity ==
          //     that.alarmData.prevSearchSeverity ||
          //     !that.alarmData.prevSearchSeverity)) ||
          //   (that.alarmData.searchCategory &&
          //     (that.alarmData.searchCategory ==
          //       that.alarmData.prevSearchCategory ||
          //       !that.alarmData.prevSearchCategory))) &&
          element['isChecked']
        ) {
          // if (that.alarmData.searchSeverity) {
            // if (
            //   element['severity'] != that.alarmData.searchSeverity.toUpperCase()
            // ) {
              // element['isChecked'] = false;
            // }
          // } else if (that.alarmData.searchCategory) {
            // if (element['category'] != that.alarmData.searchCategory) {
              element['isChecked'] = false;
            // }
          // }
        }
      } 
      // else {
      //   element['disabled'] = true;
      // }
    });

      if (hasSearch) {
      // if (that.alarmData.table == 'monitored') {
      //   that.canRemove = checked;
      // } else {
      let searchItem = '',
        searchId = '';
      that.canAdd = false;
      if (that.alarmData.searchCategory) {
        searchItem = that.alarmData.searchCategory;
        searchId = 'category';
      }
      if ((that.alarmData.searchCategory && that.alarmData.searchCategory != '')
      ) {
        if (
          !that._alarmData.data
            .filter((el) => el.isChecked && searchItem == el[searchId])
            .every((el) => el.selectedAlready)
        ) {
          that.canAdd = true;
        } else {
          that.canAdd = false;
        }
      }

      // }
      that.alarmData.allSelected = false;
    } else {
      that.alarmData.allSelected = true;
    }

    that.alarmData.data = [...that._alarmData.data];
  }
  addRemoveSelectedAlarmList(mode, table) {
    this.canShowTableBody = false;
    this.addRemoveAlarmList.emit({ mode: mode, table: table });
  }
  clearSearch() {
    this.searchAlarms('', this.alarmData.table);
  }
  ngOnDestroy(): void {
    if (this.languageSubject) this.languageSubject.unsubscribe();
    this.dtTrigger.unsubscribe();
  }
}
