import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { CcochartService } from '../service/ccochart.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ShortnumberPipe } from 'src/app/support/shared/custom-pipes/shortnumber.pipe'
import { Router } from '@angular/router';

@Component({
  selector: 'app-pon-kpi',
  templateUrl: './pon-kpi.component.html',
  styleUrls: ['./pon-kpi.component.scss']
})
export class PonKpiComponent implements OnInit {
  @ViewChild('showPonModel', { static: true })
  private showPonModel: TemplateRef<any>;
  private _iDisplayStart: number;
  language;
  languageSubject;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtTrigger1: Subject<any> = new Subject();
  loading: boolean;
  count: any = 0;
  totalcount: any;
  FromDate: any;
  topONTs:boolean = false;
  ponCapacitytd:boolean;
  modalRef: any;
  dtOptionsONT:DataTables.Settings = {
      info:false,
      pageLength: 10,
      lengthChange: false,
      processing: false,
      dom: 'tipr',
      destroy: true,  
      columnDefs: [{ targets: [0,1,2], orderable: false }],
      order:[],
  }
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    lengthChange: false,
    processing: false,
    dom: 'tipr',
    columnDefs: [{ targets: [1], orderable: false }],
    order: [0, 'asc'],
  };
 
  startTime: Date;
  endTime: Date;
  affectedPorts: any;
  errormsg: any;
  TopONt: any;
  interface: any;
  system: any;
  dtsub: any;
  isTableLoaded: boolean;
  tableFasn:boolean;
  constructor(
    private translateService: TranslateService,
    private ccochatservice: CcochartService,
    private dateUtils: DateUtilsService,
    private modalService: NgbModal,
    private commonOrgService: CommonService,
    private ShortnumberPipe: ShortnumberPipe,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    }) 
    this.FromDate = Math.ceil(((this.dateUtils.getStartUtcTimeByDaysseconds(0) - 86400000)) / 1000);
    //let pFromDate = Math.ceil(this.dateUtils.getStartUtcTimeByDaysseconds(0) / 1000);
    //let query = `tenant=0&granularity=15min&startTime=${this.FromDate}&endTime=${pFromDate}`;
    this.showPonModelOpen(this.showPonModel)
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if(this.dtsub) this.dtsub.unsubscribe();
    if (this.totalcount) this.totalcount.unsubscribe();
    this.dtTrigger.unsubscribe();
    this.dtTrigger1.unsubscribe();
  }

  rerender(): void {
    this.datatableElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance?.destroy();
      this.dtTrigger?.next();
      this.dtTrigger1?.next();
    });
  }

  close() {
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.router.navigate([ '/cco/health/pon-utilization/realtime']);
  }
 
  showPonModelOpen(modal){
    this.ponCapacitytd=true
    this.loading = true
    if ( this.affectedPorts?.length !==0 && this.isTableLoaded) {
      this.rerender();
    } 
    let endDate=new Date
    this.dateUtils.getUtCSecondsByDateObj(endDate, true)
    this.dtsub=this.ccochatservice.GetAffectedPorts(this.FromDate,this.dateUtils.getUtCSecondsByDateObj(endDate, true), 'pon').subscribe(res => {
      this.affectedPorts=res?res:[];
      if (this.isTableLoaded) {
        this.rerender();
      } else {
        this.isTableLoaded = true;
        this.dtTrigger.next();
      }
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.errorHandler(err)
    });
    this.modalRef = this.modalService.open(modal, { centered: true,backdrop: 'static', windowClass: 'vid-med-modal' });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  GoBack(){
    this.topONTs=false
    this.ponCapacitytd=true
  }

  countconvert(number) {
    return this.ShortnumberPipe.transform(number, true, 5)
  }
  showTopONTs(system,value,name){
    if (this.modalRef) {
      this.modalRef.close();
    }
    let query={
      system:system,
      interface:value,
      name:name,
    }
    this.router.navigate([ '/cco/health/pon-utilization/TopOnt'], { queryParams: query});
  }
 

  errorHandler(err){
    if (err.status == 401) {
      this.errormsg = this.language['Access Denied'];
    }
    else {
      this.errormsg = this.commonOrgService.pageErrorHandle(err);
    }
  }

 
}
