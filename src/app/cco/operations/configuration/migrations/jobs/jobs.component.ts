import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../../../cco-subscriber-operations/cco-subscriber-profile/profile.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { Router } from '@angular/router';
import { Subject, forkJoin} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DownloadService } from 'src/app/shared/services/download.service';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  language: any;
  languageSubject: any;
  getAllProfileData: any;
  profileList: any;
  jobList=[];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  editJobMig: boolean;
  editJobData: any;
  file: any;
  error: boolean;
  errorInfo: any;
  uploadfile: any;
  dtTrigger: Subject<any> = new Subject();
  isTableLoaded: any;
  loader:boolean=false
  migrationId: string;
  searchtext: string;
  showcloseicon: boolean;
  success: boolean;
  successInfo: any;
  migrationName: any;
  GetExportData: any;
  disableAdd: boolean=false;
  minimumErr: boolean;
  frTable:any;
  esTable: any;
  de_DETable: any;
  count: any;
  searchsub: any;
  modelloader: boolean;
  formData: FormData;
  sortedColumnDetails: any;
  deviceListSubs: any;
  deviceDataList: any;
  deviceCount: any;
  constructor(private titleService: Title,private translateService: TranslateService,private modalService: NgbModal,
    private dialogService: NgbModal,    private service:ProfileService,private sso: SsoAuthService,  private commonOrgService: CommonService,private router: Router,private downloadService: DownloadService, private http: HttpClient,  private Foundationservice: FoundationManageService,) {
      this.language = this.translateService.defualtLanguage;
      this.frTable = this.translateService.fr;
      this.esTable = this.translateService.es;
      this.de_DETable = this.translateService.de_DE;
   }
   scope=[]
   JobMigForm: FormGroup;
   tableCounts: any;
  ngOnInit(): void {
    let scopes = this.sso.getScopes();
    if (scopes['cloud.rbac.coc.operations.configuration.axosmigration']) {
      if (scopes['cloud.rbac.coc.operations.configuration.axosmigration']?.indexOf('read') !== -1) this.scope['read'] = true;
      if (scopes['cloud.rbac.coc.operations.configuration.axosmigration']?.indexOf('write') !== -1) this.scope['write'] = true;
    }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.titleService.setTitle(`Jobs - Migrations - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    })
    this.titleService.setTitle(`Jobs - Migrations - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: true,
      processing: false,
      dom: 'tipr',
      columnDefs: [
        { targets: [0,4], orderable: true },
        { targets: [1,2,3,5], orderable: false },
      ],
        order: [],
    }
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        const tempObj = {
          _iDisplayStart: this.tableCounts.start,
          _iDisplayLength: this.tableCounts.displayCount,
          _iRecordsDisplay: this.tableCounts.displayed,
          _iRecordsTotal: this.tableCounts.total,
          oPreviousSearch: {
            sSearch: this.tableCounts.searchText
          }
        };
        this.changeTableStatusLanguage(tempObj);
        this.tableLanguageOptions();
      });
      $("body").off('click', '.languageContent ul li a');
      $("body").on('click', '.languageContent ul li a', () => {
        const tempObj = {
          _iDisplayStart: this.tableCounts.start,
          _iDisplayLength: this.tableCounts.displayCount,
          _iRecordsDisplay: this.tableCounts.displayed,
          _iRecordsTotal: this.tableCounts.total,
          oPreviousSearch: {
            sSearch: this.tableCounts.searchText
          }
        };
        this.changeTableStatusLanguage(tempObj);
      });
      this.JobMigForm = new FormGroup({
        "name": new FormControl(''),
        "file": new FormControl(""),
        group:new FormControl(""),
        deviceType:new FormControl("ONT"),
        "description": new FormControl(''),
    });
    // this.getDeviceGoupList()
    this.getProfileList()
    this.getJobList()
    this.getDeviceCount()
}
getDeviceCount(){
  this.loader=true
  this.deviceCount = this.Foundationservice.getDeviceGroupCount(this.sso.getOrgId()).subscribe((data: any) =>{
     this.count = data? data.count :[]
     this.getDeviceGoupList()
     console.log("count",this.count)
  },(err: HttpErrorResponse) => {
    this.loader=false
    this.pageErrorHandle(err);
  })
}
getDeviceGoupList() {
  this.loader=true
  this.deviceListSubs = this.Foundationservice.getDeviceGoupList(this.sso.getOrgId(), this.count).subscribe((data: any) => {
    this.loader=false
    this.deviceDataList = data ? data : [];
  }, (err: HttpErrorResponse) => {
    this.loader=false
    this.pageErrorHandle(err);
  })
}

firstValues: boolean;
  Settings: any;
  show: boolean;
getProfileList(){
  this.loader=true
  this.getAllProfileData = this.service.GetAllProfile(this.sso.getOrgId(),0,1).subscribe((res: any) => {
   
      this.profileList = res? res?.result:[];
      this.loader=false
    }, (err: HttpErrorResponse) => {
      this.loader=false
      //this.pageErrorHandle(err);
    })
}
search(term: string) {
  if (term.length) this.showcloseicon = true;
   else this.showcloseicon = false;
  //  this.datatableElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
  //    dtInstance.search(term).draw();

  //  });
   this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
     dtInstance.columns(0).search(term).draw();
   });
 }
 closeicon(text) {
  this.searchtext = ""
  this.showcloseicon = false
  this.search(this.searchtext);
}
GotoProfile(){
  this.router.navigate(["/cco/operations/configuration/migrations/profiles"])
}
Gotomigration(id,name, type){
  this.router.navigate(["/cco/operations/configuration/migrations/migration-mapping"],{ queryParams:{migrationId:id,migrationName:name,type:type}})
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
  const filtered = `${dtObj._iRecordsTotal > 10000 && (dtObj.oPreviousSearch.sSearch == '' || dtObj.oPreviousSearch.sSearch != '') ?
    (isFrench ?
      `(filtrées à partir des  ${nf.format(dtObj._iRecordsTotal)} entrées totales)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '') : isSpanish ? `(filtrado de un total de  ${nf.format(dtObj._iRecordsTotal)} entradas)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '') : isGermen ? `(gefiltert aus  ${nf.format(dtObj._iRecordsTotal)} Einträgen)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '') :
        `(filtered from  ${nf.format(dtObj._iRecordsTotal)} total entries)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '')) :
    ''}`;
  const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
  const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
  $('div [role="status"]').html(isFrench ?
    `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${this.firstValues ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` : isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${this.firstValues ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` : isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von ${this.firstValues ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered}` :
      `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${this.firstValues ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
  );
  $(".first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Erste Seite' : 'First');
  $(".previous").text(isFrench ? 'Précédent' : isSpanish ? 'Anterior' : isGermen ? 'Zurück' : 'Previous');
  $(".next").text(isFrench ? 'Suivant' : isSpanish ? 'Siguiente' : isGermen ? 'Weiter' : 'Next');
  $(".last").text(isFrench ? 'Dernière' : isSpanish ? 'Último' : isGermen ? 'Letzte' : 'Last');
}
tableLanguageOptions(value?) {
  if (this.language.fileLanguage == 'fr') {
    this.dtOptions.language = this.frTable;
  } else if (this.language.fileLanguage == 'es') {
    this.dtOptions.language = this.esTable;
  } else if (this.language.fileLanguage == 'de_DE') {
    this.dtOptions.language = this.de_DETable;
  } else if (
    this.language.fileLanguage == 'en' &&
    this.dtOptions.language
  ) {
    delete this.dtOptions.language;
  }
}
private DisplayStart: number;
tableCount: any = 0;
getJobList(val?) {
  if(val){
    this.dtTrigger.next();
  }
  this.loader=true
  const that = this;
  let pageNumber: number;
  let url = `${environment.COC_SERVICE_MIGRATION_URL}/migration/all`
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    serverSide: true,
    processing: false,
    search: false,
    destroy: true,
    //paging: true,
    dom: "tipr",
    columnDefs: [
      { targets: [0,4], orderable: true },
      { targets: [1,2,3,5], orderable: false },
    ],
        order: [],
    //responsive: true,
    drawCallback: (settings) => {
      this.Settings = settings;
      this.changeTableStatusLanguage(settings)
      this.DisplayStart = settings._iDisplayStart
      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      // if (total <= length) {
      //   $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
      // }
    },
    ajax: (dataTablesParameters: any, callback) => {
      if (this.Settings && dataTablesParameters.start == 9990) {
        this.show = true
        this.changeTableStatusLanguage(this.Settings);
      } else {
        this.show = false;
      }
      let limit, value, pageSize = 10;
      pageNumber = Math.round(dataTablesParameters.start / pageSize);
      this.sortedColumnDetails = dataTablesParameters?.order[0]?.dir;
      // if (dataTablesParameters.start == 0) {
      //   pageNumber = 0;
      // } else {
      //   pageNumber = dataTablesParameters.start / dataTablesParameters.length;
      // }
      // const params = new HttpParams()
      //   .set("page", `${pageNumber }`)
      //   .set("size", pageSize)
      // if(!this.sortedColumnDetails) this.sortedColumnDetails = 'asc'
      var params:any;
      if(dataTablesParameters?.order[0]?.column == 4) {
        params  = {"filter":`${this.searchtext || ''}`,"page": `${pageNumber }`,"size": pageSize,sort:`dateCompleted,${this.sortedColumnDetails}`}
      }
      else if(this.sortedColumnDetails && dataTablesParameters?.order[0]?.column == 0) params = {"filter":`${this.searchtext || ''}`,"page": `${pageNumber }`,"size": pageSize,sort:`migrationName,${this.sortedColumnDetails}`}
      else  params = {"filter":`${this.searchtext || ''}`,page: `${pageNumber }`,"size": pageSize}
        this.searchsub = that.http
        .get<DataTablesResponse>(
          url, { params:params }
        ).subscribe((resp: any) => 
        {
          
          this.tableCount = resp?.totalNumberRecords  ?resp?.totalNumberRecords:0 ;
          //this.rerender()
          this.jobList=resp?.result ? resp?.result:[]
          if(this.jobList?.length){
                    let obj=this.jobList.find(data => data?.migrationStatus == "Migrating" );
                    if(obj){
                      this.disableAdd=true
                    }else{
                      this.disableAdd=false
                    }
                  }
            callback({
              recordsTotal: that.tableCount,
              recordsFiltered: that.tableCount,
              data: []
            });
            
            that.loader = false;
          // let element = (document.getElementsByClassName('dataTables_empty')[0] as HTMLElement)
          // if(element) element.style.display = resp.length ? 'none' : 'table-cell';

        },
        (err: HttpErrorResponse) => {
          that.loader = false;
          if (err.status == 404) {
       
            callback({
              recordsTotal: 0,
              recordsFiltered: 0,
              data: []
            });
          } else {
            this.pageErrorHandle(err);
          }
        });

    },
  };
}
// getJobList(val?){
//   this.loader=true
//   this.getAllProfileData = this.service.GetAllJob(this.sso.getOrgId(),0,1).subscribe((res: any) => {
   
//       this.jobList = res? res?.result:[];
//       if(this.jobList?.length){
//         this.disableAdd=this.jobList.filter(data => data?.migrationStatus == "Mapping" ||data?.migrationStatus == "Migrating" );
//       }
      
//       if (this.isTableLoaded) {
//         this.rerender();
//       } else {
//         this.isTableLoaded = true;
//         this.dtTrigger.next();
//       }
//       this.loader=false
//     }, (err: HttpErrorResponse) => {
//       this.loader=false
//       if (this.isTableLoaded) {
//         this.rerender();
//       } else {
//         this.isTableLoaded = true;
//         this.dtTrigger.next();
//       }
      
//       //this.pageErrorHandle(err);
//     })
// }
ngAfterViewInit(): void {
  this.dtTrigger.next();
}
rerender(): void {
  this.datatableElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
    dtInstance?.destroy();
    this.dtTrigger?.next();
  });
}
ngOnDestroy(): void {
  //this.dtTrigger.unsubscribe();
  if (this.languageSubject) {
    this.languageSubject.unsubscribe();
  }
}
openNewMigrationPopup(modal,data?) {
  if(data){
    console.log("data",data)
   this.editJobMig=true
   this.migrationId=data?.migrationId
   this.JobMigForm.patchValue({name:data?.migrationName, file:data?.migrationFileName,description:data?.description,deviceType:data?.type, group:data?.rgSystemGroupName})
   this.editJobData=data
   this.dialogService.open(modal, { size: 'xl', centered: true, backdrop: 'static', windowClass: 'add-user-modal' });
  }else{
    this.editJobMig=false
    this.JobMigForm.patchValue({name:'',file:'',description:'',group:'',deviceType:'ONT'})
    this.dialogService.open(modal, { size: 'xl', centered: true,backdrop: 'static', windowClass: 'add-user-modal' });
  }
 
};
onSubmit(){
  if(this.JobMigForm.value.deviceType ==='ONT'){
    this.formData = new FormData();
    if(!this.editJobMig){
      this.formData.append("file",new Blob([this.uploadfile], { type: 'text/csv' }) , this.uploadfile?.name);
    }
    if(!this.JobMigForm.value.name ){
      return
    }
  }
  
  this.modelloader=true
  if(this.editJobMig){
    this.service.updateJobMig(this.migrationId,this.JobMigForm.value.name,this.JobMigForm.value.description, this.JobMigForm.value.deviceType).subscribe((res: any) => {
      this.modelloader=false
      this.dialogService.dismissAll();
      this.success = true
      this.successInfo = res?.message ? res.message : 'Service Migration updated successfully';
      this.getJobList(true)

     
    }, (err: HttpErrorResponse) => {
      this.modelloader=false
      this.pageErrorHandle(err);
      this.JobMigForm.patchValue({name:'',file:'',description:'',group:'',deviceType:'ONT'})
      this.dialogService.dismissAll();
    })
  }else{
    if(this.JobMigForm.value.deviceType ==='ONT'){
      this.service.saveJobMig(this.sso.getOrgId(),this.formData,this.JobMigForm.value.name,this.JobMigForm.value.description).subscribe((res: any) => {
        this.modelloader=false
        this.dialogService.dismissAll();
        this.success = true
        this.successInfo = res?.message ? res.message : res;
        this.getJobList(true)
  
       
      }, (err: HttpErrorResponse) => {
        this.modelloader=false
        this.pageErrorHandle(err);
        this.JobMigForm.patchValue({name:'',file:'',description:'',group:'',deviceType:'ONT'})
        this.dialogService.dismissAll();
      })
    }else{
      let staticGrp = this.deviceDataList.filter(data =>{
        return (data.name === this.JobMigForm.value.group);
      })
      const params={
        "orgId": this.sso.getOrgId(),
          "tenantId": 0,
          "name": this.JobMigForm.value.name,
          "description": this.JobMigForm.value.description,
          "group": this.JobMigForm.value.group,
          "groupId": staticGrp[0]?._id,
          "groupType": staticGrp[0]?.type
      }
      this.service.saveJobMigRG(params).subscribe((res: any) => {
        this.modelloader=false
        this.dialogService.dismissAll();
        this.success = true
        this.successInfo = res?.message ? res.message : res;
        this.getJobList(true)
  
       
      }, (err: HttpErrorResponse) => {
        this.modelloader=false
        this.pageErrorHandle(err);
        this.JobMigForm.patchValue({name:'',file:'',description:'',devicType:'ONT',group:''})
        this.dialogService.dismissAll();
      })
    }
    
  }
}
ExportMigration(data?,id?,date?){
  this.loader=true
  let url = `${environment.COC_SERVICE_MIGRATION_URL}/export/${id}`
  this.http.get(url, { responseType: 'text', observe: 'response' as 'body' }).subscribe((data: any) => {
    let file=data.headers.get('Content-Disposition').split('=')[1]
    let fileName = `${file.split('.')[0]}_${date}.csv`;
    this.loader=false;
    const blob = new Blob([data.body], { type: 'text/csv' })
    saveAs(blob, fileName);
  },(err: HttpErrorResponse) => {
    this.loader=false
    this.pageErrorHandle(err);
  })
}
startMigration(data?,id?){
  this.loader=true
  this.service.startMigration(id,this.sso.getOrgId(),'').subscribe((res: any) => {
    this.loader=false
    this.success = true
    this.dialogService.dismissAll();
    this.successInfo = res?.message ? res.message : res;
    this.getJobList(true)
  }, (err: HttpErrorResponse) => {
    this.loader=false
    this.pageErrorHandle(err);
  })
}
pageErrorHandle(err: HttpErrorResponse) {

    this.error = true;
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
  
  //this.closeAlert();
  
}
readURL(e){
  this.uploadfile = e.target.files[0];
  this.file = this.uploadfile?.name;
  this.JobMigForm.patchValue({file:this.file})
 e.target.value = "";
}
openUndoMigrationPopup(modal,id?,name?) {
  this.migrationId=id
  this.migrationName=name
  this.dialogService.open(modal, { size: 'xl', centered: true, windowClass: 'undo-migration-modal' });
};

openDeleteJobReportPopup(modal,id?,name?) {
  this.migrationId=id
  this.migrationName=name
  this.dialogService.open(modal, { size: 'xl', centered: true, windowClass: 'delete-job-modal' });
};
 getLocalTimeZone(time) {
  // var dd = time;
  // var ddStr = dd.toString();
  // var ddArr = ddStr.split(' ');
  // var tmznSTr = ddArr[5];
  // tmznSTr = tmznSTr.substring(0, tmznSTr.length);
  return time.toString()?.split(" ")[5]?.replace(/(.{2})$/, ':$1');;
}
convertDate(date,val?){
  let date1= date;
  var a = new Date(date1 + '+00:00');
  var tz=this.getLocalTimeZone(a)
 // console.log(tz)
  var year = a.getFullYear();
  var month = a.getMonth() +1
  var dat = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12;
  let Hours = +hour < 10 ? '0' + hour : hour;
  let Minutes = +min < 10 ? '0' + min : min;
  var cDate = `${month}/${dat}/${year} ${Hours}:${Minutes} ${ampm} UTC/${tz}`;
  var cDate1= `${year}-${month}-${dat}T${Hours}-${Minutes}-${sec}`;
  return val ? cDate1:cDate
}
checkMaxMin(e){
    if(e.length > 0){
      if(e.length <= 200){
        this.minimumErr=false
      }else{
        this.minimumErr=true
      }
    }
}
openAbortMigrationPopup(modal,id?,name?) {
  this.migrationId=id
  this.migrationName=name
  this.dialogService.open(modal, { size: 'xl', centered: true, windowClass: 'abort-migration-modal' });
};
DeleteMigration(){
  this.loader=true
  this.service.DeleteMigration(this.migrationId,this.sso.getOrgId(),'').subscribe((res: any) => {
    this.dialogService.dismissAll();
    this.success = true
    this.successInfo = res?.message ? res.message : res;
    this.getJobList(true)
  }, (err: HttpErrorResponse) => {
    this.loader=false
    this.pageErrorHandle(err);
    this.dialogService.dismissAll();
  })
}
undoMigration(){
  this.loader=true
  this.service.undoMigration(this.migrationId,this.sso.getOrgId(),'').subscribe((res: any) => {
    this.loader=false
    this.dialogService.dismissAll();
    this.success = true
    this.successInfo = res?.message ? res.message : res;
    this.getJobList(true)
  }, (err: HttpErrorResponse) => {
    this.loader=false
    this.pageErrorHandle(err);
    this.dialogService.dismissAll();
  })
}
AbortMigration(){
  this.loader=true
  this.service.AbortMigration(this.migrationId,this.sso.getOrgId(),'').subscribe((res: any) => {
    this.loader=false
    this.dialogService.dismissAll();
    this.success = true
    this.successInfo = res?.message ? res.message : res;
    this.getJobList(true)
  }, (err: HttpErrorResponse) => {
    this.loader=false
    this.pageErrorHandle(err);
    this.dialogService.dismissAll();
  })
}
close(): void {
  this.JobMigForm.patchValue({name:'',file:'',description:'',group:'',deviceType:'ONT'})
  this.dialogService.dismissAll();
}
closeAlert() {
  this.error = false;
  this.errorInfo = '';
}

setSuccessInfo(msg: any) {
  this.success = true;
  this.successInfo = msg;
  setTimeout(() => {
    this.success = false;
  }, 2000);
}
setStatusClass(value){
  let currentClass = '';
  if(value){
    if(value == 'Ready To Migrate'){currentClass = 'scheduled-but'}
    if(value == 'Aborted' || value?.toLowerCase() == 'deleted'){currentClass = 'complete-but'}
    if(value == 'Complete'){currentClass = 'running-but'}
    if(value?.toLowerCase() == 'failed'){currentClass = 'error-but'}
    if(value == 'Mapping' ||value == 'Migrating' || value.toLowerCase() == 'deleting'){currentClass = 'draft-but'}
  }
 
  return currentClass
}
}
