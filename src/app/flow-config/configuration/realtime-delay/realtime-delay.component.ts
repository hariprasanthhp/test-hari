import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EndpointManagementService } from '../../services/endpoint-management.service';

@Component({
  selector: 'app-realtime-delay',
  templateUrl: './realtime-delay.component.html',
  styleUrls: ['./realtime-delay.component.scss']
})
export class RealtimeDelayComponent implements OnInit {

  @ViewChild('infoModal', { static: true }) private infoModal: TemplateRef<any>;
  @ViewChild('confirmModal', { static: true }) private confirmModal: TemplateRef<any>;
  language: any;
  delay: any;
  orgData: any;
  ORG_ID: string;
  loading: boolean;
  infoTitle: string;
  infoBody: string;
  showButton: boolean;
  loaded: boolean;
  modalRef: any;
  translateSubscribe: any;
  listSubs: any;
  updateSubs: any;
  Delaydata: any;
  datatableElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  frTable: DataTables.LanguageSettings;
  esTable: DataTables.LanguageSettings;
  dtTrigger: Subject<any> = new Subject();
  renderedOnce: boolean;
  delaydata: any;
  languageChange: boolean=false;
  interval: any[];
  intvalue: string;
  warningmsg: boolean=false;

  constructor(
    private router: Router,
    private sso: SsoAuthService,
    private dialogService: NgbModal,
    private commonOrgService: CommonService,
    private translateService: TranslateService,
    private service: EndpointManagementService,
    private titleService: Title
  ) {
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.language = this.translateService.defualtLanguage;
    this.translateSubscribe=this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Realtime Delay']} - ${this.language['Configurations']} - ${this.language['flowconfiguration']} - ${MODULE === 'systemAdministration' ? 
      this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
      this.tableLanguageOptions();
      this.rerender();
      this.getDelayData(true,false);
    });
    this.commonOrgService.closeAlert();
    let MODULE = this.sso.getRedirectModule(url);
    this.titleService.setTitle(`${this.language['Realtime Delay']} - ${this.language['Configurations']} - ${this.language['flowconfiguration']} - ${MODULE === 'systemAdministration' ? 
    this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
  }

  ngOnInit() {
    this.renderedOnce = true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: -1,
      paging: false,
      lengthChange: true,
      info: false,
      processing: false,
      dom: 'tipr',
      ordering: false,
      destroy: true,
    }
    this.tableLanguageOptions();
   this.getData(false);
 
    this.getDelayData(true,false);
    
  }

  ngAfterViewInit(): void {
    this.loaded = true;
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }
    if (this.Delaydata) {
      this.Delaydata.unsubscribe();
    }
    if (this.updateSubs) {
      this.updateSubs.unsubscribe();
    }
  }

  getData(value?) {
    this.loading = true;
    this.listSubs = this.service.getOrg(this.ORG_ID).subscribe((res: any) => {
      this.orgData = res;
      if (res) {
        if (this.orgData && this.orgData.realtimeLateflowDelay != undefined) {
         this.delay = Math.ceil(this.orgData.realtimeLateflowDelay/60);
        }
      }
      this.loading = false;
      if(value){
      this.warningmsg = true;
      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    })
  }
 
  changeDelay(event) {
    if(event.key==='.'){event.preventDefault();}
    if (this.delay) {
      if (this.orgData?.realtimeLateflowDelay && this.orgData?.realtimeLateflowDelay/60 !== this.delay) {
        this.showButton = true;
      }else if(this.orgData?.realtimeLateflowDelay && this.orgData?.realtimeLateflowDelay/60 === this.delay) {
        this.showButton = false;
      }else {
        this.showButton = true;
      }
    } else {
      this.showButton = false;
    }
    this.delay=parseInt(this.delay)
  }

  /* CCL-42065 */
  public validateTimeDelay(): void {
    if (!this.delay || isNaN(this.delay) || this.delay < 1 || this.delay > 5) {
      this.infoBody = this.language['Late Delay should be between 1 to 5 Minutes']
      this.closeModal();
      this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
      return;
    } else {
      this.openConfirmModal()
    }
  }

  private openConfirmModal() {
    this.infoTitle = this.language['Confirm change :'];
    // if (this.delay != undefined && this.delay != 0) { /* CCL-42065 */
    this.infoBody = `${this.language.LateDelay}: ${this.delay} ${this.language['Minute(s)']}`;
    // } else if (this.delay != undefined && this.delay == 0) { /* CCL-42065 */
    // this.infoBody = `${this.language['Late Delay: 0 Seconds will disable Late Delay']}`;
    // } else if (this.delay == undefined) {
    // this.infoBody = `${this.language.USeconds}: ${this.language['60 (using default value) Seconds']}`;
    // }
    this.closeModal();
    this.modalRef = this.dialogService.open(this.confirmModal, { backdrop: 'static', keyboard: false });
  }

  save() {
    this.loading = true;
    this.commonOrgService.closeAlert();
    /* CCL-42065 */
    // let empty = {
    //   orgId: this.ORG_ID
    // }
    const params = {
      realtimeLateflowDelay: this.delay*60
    };
    /* CCL-42065 */

    // if (this.delay != undefined) {
    //   params['realtimeLateflowDelay'] = this.delay;
    // } else {
    //   params['realtimeLateflowDelay'] = 60;
    // }
    this.updateSubs = this.service.updateOrgPatch(this.ORG_ID, params).subscribe((res: any) => {
      this.orgData = res;
      this.loading = false;
      this.showButton = false;
      //this.warningmsg = false;
      // if (this.orgData && this.orgData.realtimeLateflowDelay) {
      //   this.delay = this.orgData.realtimeLateflowDelay/60;
      // }
      this.getData(true);
      this.getDelayData(true,false);
      this.closeModal();
    }, (err: HttpErrorResponse) => {
      this.closeModal();
      this.pageErrorHandle(err);
      //this.warningmsg = false;
    })
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  pageErrorHandle(err: HttpErrorResponse, value?) {
    let errorInfo = '';
    if (err.status == 400) {
      if (err.error === null) {
        this.infoBody = this.language['Invalid Request'];
      } else {
        this.infoBody = this.commonOrgService.pageInvalidRqstErrorHandle(err);
      }
      this.infoTitle = 'Error';
      this.openInfoModal();
      this.loading = false;
    } else {
      if (err.status == 401) {
        errorInfo = this.language['Access Denied'];
      } else {
        errorInfo = this.commonOrgService.pageErrorHandle(err);
        if (err.status == 404 && errorInfo == "Invalid organization provided for update") {
          errorInfo = this.language["Invalid Late Delay value provided for update"];
        }
      }
        this.commonOrgService.openErrorAlert(errorInfo);
        this.commonOrgService.pageScrollTop();
      
      this.loading = false;
    }

  }

  openInfoModal() {
    this.closeModal();
    this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
  }

  getDelayData(value?,val?) {
    this.loading = true;
    let data =val
    this.Delaydata = this.service.getDelay(this.ORG_ID).subscribe((res) => {
      this.loading = false;
      this.delaydata = res? res:{};
      let length =this.delaydata?.summarize?.length - 1
      this.interval =[]
      for(let i=0; i<this.delaydata?.summarize?.length;i++){
       
       if(i==0){
        this.intvalue=`${this.delaydata?.curDelay} +`
       }
       if(i !== length){
        var val =i+this.delaydata?.curDelay
        this.intvalue=`${val} +`
       }
       if(i === length){
        var val =i+this.delaydata?.curDelay
        this.intvalue=`${val} +`
       }
       this.delaydata.summarize[i].interval=this.intvalue
       this.interval.push(this.intvalue)
      }
      //this.delay = this.delaydata?.curDelay ? this.delaydata?.curDelay:Math.ceil(this.orgData.realtimeLateflowDelay/60)
      this.renderTable(false);
      if(data){
        this.warningmsg = false;
      }    
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.delaydata = err;
     //this.delay = this.delaydata?.curDelay ? this.delaydata?.curDelay:Math.ceil(this.orgData.realtimeLateflowDelay/60) 
      this.renderTable(false);
      //this.pageErrorHandle(err);
      if(data){
        this.warningmsg = false;
      } 
    })
  }

  renderTable(rerender?) {
    this.tableLanguageOptions();
    if (this.renderedOnce) {
      this.rerender();
      this.loading = false;
    }
    else if (rerender) {
      this.rerender();
      this.renderedOnce = true;
      this.loading = false;
    }
    else {
      this.rerender();
      this.renderedOnce = true;
      this.loading = false;
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      // dtInstance.clear().draw();
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }
  
  bitsToSize(bytes: any, round?: any, fixed?) {
    if (!+bytes) return '0'

    const k = 1000
    const dm = fixed < 0 ? 0 : fixed
    const sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`

  }

  getChartFormat(time) {
    let dateObj = new Date(time);
    let pipe = new DatePipe('en-US');
    ////console.log(dateObj);
    let dateString = `${pipe.transform(dateObj, 'YYYY-MM-dd HH:mm:ss')}`;
    return dateString;
  }
}

