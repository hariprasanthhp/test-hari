import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SubscriberService } from './service/subscriber.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CommonService } from 'src/app/sys-admin/services/common.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit, AfterViewInit {
  language: any;
  languageSubject;
  subscriberList = [];
  loading: boolean = false;
  deletedata: any;
  modalInfo: any;
  modalRef: any;
  btnDisabled: boolean;
  errorInfo: any;
  error: boolean;
  renderedOnce: boolean = false;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  frTable: DataTables.LanguageSettings;
  dtTrigger: Subject<any> = new Subject();
  successInfo: any;
  success: boolean = false;

  dataAvailable: boolean;

  constructor(private translateService: TranslateService,
    private customTranslateService: CustomTranslateService,
    private subscriberService: SubscriberService,
    private commonOrgService: CommonService,
    private router: Router) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      setTimeout(() => {
        if (this.renderedOnce) this.renderTable(true);
      }, 500);
    });
    this.renderedOnce = false;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: true,
      processing: false,
      dom: 'tipr',
      columnDefs: [
        { targets: [0], orderable: true }
      ],
      order: [0, 'asc']
    }
    this.tableLanguageOptions();
    this.Getsubscriber();

  }

  Getsubscriber() {

    this.loading = true;
    this.subscriberService.getsubscriber().subscribe((data: any) => {
      if (data == 'Service template not found')
        this.subscriberList = [];
      else
        this.subscriberList = data;
      this.renderTable(false);
      this.loading = false;
    },
      (err) => {
        this.error = true;
        this.pageErrorHandle(err);
        this.loading = false;
        this.renderTable(false);
        this.dataAvailable = true;
      });
  }


  editsubscriber(name) {
    this.router.navigate([`/cco/operations/cco-subscriber-operations/templates/subscriber-templates/edit/${name}`]);
  }


  deleteDeviceGrp(list) {
    this.deletedata = list;
    this.modalInfo = this.deletedata.name;
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  Deletesubscriber() {
    this.btnDisabled = true;
    this.loading = true;
    this.subscriberService.delsubscriber(this.deletedata.name).subscribe((data: any) => {
      this.loading = false;
      this.success = true;
      this.successInfo = this.language['Deleted Successfully'];
      $("html, body").animate({ scrollTop: 0 }, "slow");
      setTimeout(() => {
        this.Getsubscriber();
      }, 500)

      this.btnDisabled = false;
      this.deletedata = "";
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.error = true;
      this.pageErrorHandle(err);
      this.btnDisabled = false;
      this.deletedata = "";
    }, () => {
      this.btnDisabled = false;
      this.deletedata = "";
      this.loading = false;
    })
  }

  closeModal(): void {
    this.deletedata = "";
  }
  renderTable(rerender?) {
    this.tableLanguageOptions();
    if (this.renderedOnce) {
      this.dataAvailable = true;
      this.rerender();
    }
    else if (rerender) {
      this.rerender();
      this.renderedOnce = true;
      this.dataAvailable = true;
      this.loading = false;
    }
    else {
      this.rerender();
      this.renderedOnce = true;
      this.dataAvailable = true;
      this.loading = false;
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
  }

  closeAlert() {
    this.error = false;
  }



  rerender(): void {
    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }


}
