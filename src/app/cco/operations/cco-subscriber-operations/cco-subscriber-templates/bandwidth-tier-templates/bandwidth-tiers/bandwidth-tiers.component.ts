import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bandwidth-tiers',
  templateUrl: './bandwidth-tiers.component.html',
  styleUrls: ['./bandwidth-tiers.component.scss']
})
export class BandwidthTiersComponent implements OnInit {

  language: any;
  error: boolean;
  errorInfo: string = '';
  subscribe: any;
  languageSubs: any;
  bandWidthData: any;
  deleteName: any = "";
  loading: boolean = false;
  btnDisabled: boolean = false;
  renderedOnce: boolean = false;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  frTable: DataTables.LanguageSettings;
  dataAvailable: boolean;
  dtTrigger: Subject<any> = new Subject();
  modalRef: any;
  baseUrl = `${environment.COC_SERVICES_ACTIVATION_URL}/bandwidthTiers`;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('deleteSuccessModal', { static: true }) private deleteSuccessModal: TemplateRef<any>;

  constructor(
    private http: HttpClient,
    private commonOrgService: CommonService,
    private customTranslateService: CustomTranslateService,
    private router: Router,
    private dialogService: NgbModal
  ) {
    this.language = this.customTranslateService.defualtLanguage;
    this.frTable = this.customTranslateService.fr;
    this.languageSubs = this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      setTimeout(() => {
        if (this.renderedOnce) this.renderTable(true);
      }, 500);
    });
  }

  ngOnInit(): void {
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
    this.getBandwidths();
  }

  getBandwidths() {
    this.loading = true;
    this.subscribe = this.http.get(this.baseUrl).subscribe((res: any) => {
      if (res) {
        this.bandWidthData = res;
        this.renderTable(false);
        this.loading = false;
      }
      else {
        this.loading = false;
        this.dataAvailable = true;
      }
    }, (err: HttpErrorResponse) => {
      this.error = true;
      this.loading = false;
      this.dataAvailable = true;
      this.pageErrorHandle(err);
    })
  }

  renderTable(rerender?) {
    this.tableLanguageOptions();
    if (rerender || this.renderedOnce) {
      this.rerender();
      this.dataAvailable = true;
      this.loading = false;
    } else {
      this.dtTrigger.next();
      this.renderedOnce = true;
      this.dataAvailable = true;
      this.loading = false;
    }
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

  deleteConfirmation(list) {
    this.deleteName = list.name;
    if (this.modalRef) {
      this.close();
    }
    this.modalRef = this.dialogService.open(this.deleteModal);
  }

  close(): void {
    this.modalRef.close();
    this.btnDisabled = false;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    if (this.languageSubs) {
      this.languageSubs.unsubscribe();
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
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

  gotoEdit(name: any) {
    this.router.navigate([`cco/operations/cco-subscriber-operations/templates/bandwidth-tiers/edit/${name}`]);
  }

  deleteBandWidth() {
    this.loading = true;
    this.error = false;
    this.btnDisabled = true;
    this.subscribe = this.http.delete(`${this.baseUrl}/${this.deleteName}`).subscribe((res: any) => {
      this.close();
      if (res == null) {
        this.modalRef = this.dialogService.open(this.deleteSuccessModal);
        this.loading = false;
        this.dataAvailable = true;
        setTimeout(() => {
          this.close();
          this.getBandwidths();
        }, 500)
      }
      else if (res) {
        this.dataAvailable = true;
        this.loading = false;
        this.error = true;
        this.errorInfo = res;
      }

    }, (err: HttpErrorResponse) => {
      this.close();
      this.dataAvailable = true;
      this.loading = false;
      this.error = true;
      this.pageErrorHandle(err);
    })
  }

}
