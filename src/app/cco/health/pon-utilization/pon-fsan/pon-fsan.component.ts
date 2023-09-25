import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { CcochartService } from '../service/ccochart.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShortnumberPipe } from 'src/app/support/shared/custom-pipes/shortnumber.pipe'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pon-fsan',
  templateUrl: './pon-fsan.component.html',
  styleUrls: ['./pon-fsan.component.scss']
})
export class PonFsanComponent implements OnInit {

  @ViewChild('showTopONTs', { static: true })
  private showTopONTs: TemplateRef<any>;
  private _iDisplayStart: number;
  language;
  languageSubject;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
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
  name:any;
  isTableLoaded: boolean;
  tableFasn:boolean;
  totalRate: number;
  error: boolean;
  errorInfo: any;
  constructor(
    private translateService: TranslateService,
    private ccochatservice: CcochartService,
    private dateUtils: DateUtilsService,
    private modalService: NgbModal,
    private commonOrgService: CommonService,
    private ShortnumberPipe: ShortnumberPipe,
    private router: Router,
    private route: ActivatedRoute,  
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    }) 
    this.route.queryParams.subscribe(params => {
      if (params['system']) {
        this.system = params['system'];
      }
      if (params['interface']) {
        this.interface = params['interface'];
      }
      if(params['name']){
        this.name = params ['name']
      }
    })
    this.FromDate = Math.ceil(((this.dateUtils.getStartUtcTimeByDaysseconds(0) - 86400000)) / 1000);
    this.showTopONTsModel(this.showTopONTs)
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if(this.dtsub) this.dtsub.unsubscribe();
    if (this.totalcount) this.totalcount.unsubscribe();
    this.dtTrigger1.unsubscribe();
  }

  rerender(): void {
    this.datatableElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance?.destroy();
      this.dtTrigger1?.next();
    });
  }

  close() {
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.router.navigate([ '/cco/health/pon-utilization/realtime']);
  }

  ngAfterViewInit(): void {
    this.dtTrigger1.next();
  }

  GoBack(){
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.topONTs=false
    this.router.navigate(['/cco/health/pon-utilization/ONT']);
  }

  countconvert(number) {
    return this.ShortnumberPipe.transform(number, true, 5)
  }

  AddTotalRate(val1,val2){
    let val =val1.slice(-1)
    let rate1=parseFloat(val1);
    let rate2=parseFloat(val2);
    let result= (rate1+rate2).toFixed(3)
    return `${result}${val}`
  }

  showTopONTsModel(modal){
    this.loading = true
    this.topONTs = true
    this.ponCapacitytd = false
    this.ccochatservice.GetTop5ONTs(this.interface,this.system).subscribe((res: any) => {
          this.TopONt = res ? res : [];
          //this.totalRate=parseInt(res?.ontUpstreamUsage?.rate) + parseInt(res?.ontDownstreamUsage?.rate) 
          if (this.tableFasn) {
            this.rerender();
          } else {
            this.tableFasn = true;
            this.dtTrigger1.next();
          }
          this.loading = false
        }, (err: HttpErrorResponse) => {
          this.loading = false
          this.pageErrorHandle(err);
        })
        this.modalRef = this.modalService.open(modal, { centered: true,backdrop: 'static', windowClass: 'vid-med-modal' });
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
}