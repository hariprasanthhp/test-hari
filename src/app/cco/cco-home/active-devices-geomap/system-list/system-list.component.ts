import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { HomeGeomapService } from '../../services/home-geomap.service';

@Component({
  selector: 'app-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.scss'],
})
export class SystemListComponent implements OnInit {
  // @ViewChild(DataTableDirective, { static: false })
  // dtElement: DataTableDirective;
  @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>;
  dtInstance: Promise<DataTables.Api>;

  frTable: DataTables.LanguageSettings;
  germanTable: DataTables.LanguageSettings;
  esTable: DataTables.LanguageSettings;
  searchtext: string;
  showcloseicon: boolean = false;
  renderedOnce: boolean = true;
  dataAvailable: boolean;
  loading: boolean = true;
  dtTrigger: Subject<any> = new Subject();
  dtTrigger1: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  alertTypedtOptions: DataTables.Settings = {};
  language: any;
  languageSubject;
  @Input('systemInfoData') systemInfoData: any;
  @Input() showAlertTypeTable: Subject<any>;
  @Output() hideInfoBox = new EventEmitter();

  // @Input() canShowAlertType: Subject<any>;

  modalRef: any;
  @ViewChild('showInfoModal', { static: true }) private showInfoModal: TemplateRef<any>;
  // showlistView : boolean = true;
  dtSub: any;
  dtSub1: any;
  alertTypes = [{count : 'cloudConnectivityCount', col : 'Cloud Connectivity', id : 'CONNECTIVITY',element: "clickNoOfCloudConnectivityAlarms"}, {count : 'cloudHealthCount', col : 'Health Alerts', id : 'HEALTH',element: "clickNoOfcloudHealthAlarms",}, {count : 'systemAlarmCount', col : 'System Alarms', id : 'SYSTEM',element: "clickNoOfSystemAlarms"}, {count : 'transformedAlarmCount', col : 'Transform Alarms', id : 'TRANSFORMED', element: "clickNoOfTransformedAlarms",}, {count : 'True',
      alertTypeName : 'Service Disruptions',
      id : 'disruption', element: "clickServiceDisruptions"}];
  alarmTypesData = [];
  selectedSystem: any;
  showAlertTypeTableSubject: any;
  constructor(
    private translateService: TranslateService,
    private homeGeomapService: HomeGeomapService
  ) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        setTimeout(() => {
          this.tableLanguageOptions();
          this.rerender();
        },200)
      }
    );
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.germanTable = this.translateService.de_DE;
  }

  ngOnInit(): void {
    // this.showAlertTypeTableSubject = this.canShowAlertType?.subscribe((v) => {
    //   // this.showlistView = false;
    //   this.redirectToPage(v?.type, v?.data);
    // });
    this.renderedOnce = true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      paging: true,
      processing: false,
      dom: 'tipr',
      autoWidth: false,
    };
    this.alertTypedtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      paging: true,
      order : [],
      processing: false,
      dom: 'tipr',
      autoWidth: false,
    };
    this.tableLanguageOptions();
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
    this.dtTrigger1.next();
  }

  closeicon(text) {
    this.searchtext = '';
    this.showcloseicon = false;
    this.search(this.searchtext);
  }
  search(term: string) {
    this.loading = true;
    if (term.length) this.showcloseicon = true;
    else this.showcloseicon = false;
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      if (dtElement.dtInstance)
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.columns(0).search(term).draw();
        });
    });
    this.loading = false;
  }
  renderTable(rerender?) {
    this.tableLanguageOptions();
    if (this.renderedOnce) {
      this.rerender();
      setTimeout(() => {
        this.renderedOnce = false;
        this.loading = false;
      }, 200);
    } else {
      this.rerender();
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 200);
    }
    setTimeout(() => {
      if (this.searchtext) {
        this.search(this.searchtext);
      }
    }, 200);
  }
  rerender(search?): void {
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      if (dtElement.dtInstance)
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
    });
    setTimeout(() => {
      this.dtSub1=this.dtTrigger1.next();
      this.dtSub=this.dtTrigger.next();
    });
    setTimeout(() => {
      if (search) {
        this.search(this.searchtext);
      }
    }, 1000);
  }
  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    } else if (
      this.language &&
      this.language.fileLanguage &&
      this.language.fileLanguage == 'de_DE'
    ) {
      this.dtOptions.language = this.germanTable;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }

  hideToolBox(type) {
    this.hideInfoBox.emit(type);
  }
  redirectToAlerts(system){
    system = {...system, ...system?.system};
    this.homeGeomapService.redirectToPage('noOfAlarms', system, this.systemInfoData);
  }
  redirectToPage(type, system, clickedAlertType?) {
    if(type == 'noOfAlarms'){
      let systemData = {...system};
      systemData['fsan'] = system['fsan_serialnumber'] || ''
      let alertTypeSelected = this.alertTypes.find(el => el ['element'] == clickedAlertType);
      systemData = {...systemData, ...alertTypeSelected};
      this.homeGeomapService.redirectToPage(
        'noOfAlarms',
        systemData,
        this.systemInfoData
      );
      // this.alarmTypesData = [];
      // //Service Disruptions
      // // if(this.systemInfoData['selectedAlertTypes'] == 'Service Disruptions'){
      //   if(system['outage'] == 'True'){
      //   let alertObj = {
      //     count : 'True',
      //     alertTypeName : 'Service Disruptions',
      //     id : 'disruption',
      //     fsan : system['fsan_serialnumber'] || '',
      //     system : system
      //   };
      //   this.alarmTypesData.push(alertObj);
      // }
      // // else {
      //   //Not Service Disruptions
      // this.alertTypes.forEach((el) => {
      //   let alertObj = {}
      //   if(system[el['count']] > 0){
      //     alertObj['count'] = system[el['count']];
      //     alertObj['alertTypeName'] = el['col'];
      //     alertObj['id'] = el['id'];
      //     alertObj['system'] = system;
      //     this.alarmTypesData.push(alertObj);
      //   }
      // });
      // // }
      // this.selectedSystem = system;
      // // this.showlistView = false;

      // // setTimeout(() => {
      //   this.rerender();
      // },2000)
      return;
    }
    
    this.homeGeomapService.redirectToPage(type, system, this.systemInfoData);
  }
  // goBackToListView(){
  //   this.showlistView = true;
  // }

  ngOnDestroy(): void {
    if (this.dtSub) this.dtSub.unsubscribe();
    if (this.dtSub1) this.dtSub1.unsubscribe();
    if (this.showAlertTypeTableSubject) this.showAlertTypeTableSubject.unsubscribe();
  }
  
}
