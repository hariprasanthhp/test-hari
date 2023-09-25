import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
// import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CommonService } from '../../services/common.service';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { TranslateService } from 'src/app-services/translate.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-call-home',
  templateUrl: './call-home.component.html',
  styleUrls: ['./call-home.component.scss']
})
export class CallHomeComponent implements OnInit, OnDestroy {

  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('deleteSuccessModal', { static: true }) private deleteSuccessModal: TemplateRef<any>;

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  deleteId = '';

  language: any;
  languageSubject;

  listObs: any;
  list: any = [];
  loading = true;
  modalRef: any;

  dataAvailable = false;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  isRerender = false;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
  };
  deleteNgbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    windowClass: 'alert-del-modal'
  };
  ORG_ID: any;
  frTable;
  geoLocationOptions = [];

  filtersForm = this.fb.group({
    geoLocationInfo: ''
  });
  MODULE: any;

  hasScopeAccess = false;
  hasWriteAccess = false;
  constructor(private sso: SsoAuthService,
    private http: HttpClient,
    private router: Router,
    // private route: ActivatedRoute,
    private commonOrgService: CommonService,
    // private dateUtilsService: DateUtilsService,
    private dialogService: NgbModal,
    private translateService: TranslateService,
    private titleService: Title,
    private fb: FormBuilder,
  ) {
    this.frTable = this.translateService.fr;
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.MODULE = this.sso.getRedirectModule(url);
    this.commonOrgService.currentPageAdder('call-home');
  }

  ngOnInit(): void {
    let scopes = this.sso.getScopes();
    if (scopes?.['cloud.rbac.coc.operations.systemonboarding.axoscallhome.callhome']?.length) {
      this.hasScopeAccess = true;
    }
    if (scopes?.['cloud.rbac.coc.operations.systemonboarding.axoscallhome.callhome']?.indexOf('write') !== -1) {
      this.hasWriteAccess = true;
    }


    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.getList();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.tableLanguageOptions();
      this.rerender();
      //this.titleService.setTitle(`${this.language['Call Home']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
      this.titleService.setTitle(`Call Home - AXOS Systems - ${this.language['System Onboarding']} - ${this.language['Operations']}  - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    })
    //this.titleService.setTitle(`${this.language['Call Home']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    this.titleService.setTitle(`Call Home - AXOS Systems - ${this.language['System Onboarding']} - ${this.language['Operations']}  - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    this.tableLanguageOptions();
    this.geoLocationOptions = [
      {
        name: 'All',
        value: '',
        label: 'All'
      },
      {
        name: 'Available',
        value: 'exist',
        label: 'Available'
      },
      {
        name: 'Unavailable',
        value: 'missing',
        label: 'Unavailable'
      }
    ];

    if (!this.hasScopeAccess) {
      this.sso.setPageAccess(false);
      return;
    } else {
      this.sso.setPageAccess(true);
    }

  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }



  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtTrigger.next();
      this.tableLanguageOptions();
    });
  }

  showTable = false;
  getList(): any {
    this.showTable = true;
    this.dtOptions = {
      paging: false,
      lengthChange: false,
      searching: false,
      ordering: false
    };

    let query = `${environment.API_BASE_URL}cnap/invmgr/callhome/actions`;
    if (this.filtersForm.get('geoLocationInfo').value) {
      query += `?geoLocationInfo=${this.filtersForm.get('geoLocationInfo').value}`;
    }

    this.listObs = this.http.get(query).subscribe((json: any) => {

      let data = [];
      if (json) {
        json.forEach((element: any) => {
          if (element['networkGroupPath']) {
            let arr = element['networkGroupPath'].split('/');
            element.region = arr[0];
            element.location = arr[1] ? arr[1] : "";
          }

          if (element?.deviceLocation?.point?.latitude && element?.deviceLocation?.ufLocation) {
            element['ui_modified_service_address_latlong'] = `<b>${element?.deviceLocation?.ufLocation}</b> <br> (${element?.deviceLocation?.point?.latitude}, ${element?.deviceLocation?.point?.longitude})`;
          } else if (element?.deviceLocation?.point?.latitude && !element?.deviceLocation?.ufLocation) {
            element['ui_modified_service_address_latlong'] = `${element?.deviceLocation?.point?.latitude}, ${element?.deviceLocation?.point?.longitude}`;
          } else {
            element['ui_modified_service_address_latlong'] = element?.deviceLocation?.ufLocation ? `<b>${element?.deviceLocation?.ufLocation}</b>` : '';
          }

          data.push(element);
        });
      }
      this.list = data;
      this.loading = false;
      if (this.isRerender) {
        this.rerender();
        //this.isRerender = false;
      } else {
        this.dtTrigger.next();
        setTimeout(() => {
          this.dataAvailable = true;
        }, 200);
      }

      this.isRerender = true;

    }, err => {
      this.pageErrorHandle(err);

      this.dataAvailable = true;
    })
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
    this.loading = false;
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  showSuccess(msg): void {
    this.closeAlert();
    this.successInfo = msg;
    this.success = true;
  }

  showError(msg): void {
    this.closeAlert();
    this.errorInfo = msg;
    this.error = true;
  }

  cancelDelete() {
    this.deleteId = '';
  }

  goToAdd() {
    if ((window.location.href).indexOf("/system-onboarding/") !== -1) {
      this.router.navigate([`/cco/operations/system-onboarding/axos-callhome/callhome/add`]);
    } else if ((window.location.href).indexOf("/systemAdministration/") !== -1) {
      this.router.navigate(['/systemAdministration/cco-admin/call-home/add']);
    } else {
      this.router.navigate(['/organization-admin/call-home/add']);
    }
  }

  gotoEdit(id: any) {
    if ((window.location.href).indexOf("/system-onboarding/") !== -1) {
      this.router.navigate([`/cco/operations/system-onboarding/axos-callhome/callhome/edit/${encodeURIComponent(id)}`]);
    } else if ((window.location.href).indexOf("/systemAdministration/") !== -1) {
      this.router.navigate([`/systemAdministration/cco-admin/call-home/edit/${encodeURIComponent(id)}`]);
    } else {
      this.router.navigate([`/organization-admin/call-home/edit/${encodeURIComponent(id)}`]);
    }
  }

  delete(id) {
    this.deleteId = id;

    if (this.modalRef) {
      this.close();
    }

    this.modalRef = this.dialogService.open(this.deleteModal, this.deleteNgbModalOptions);

  }

  close(): void {
    this.modalRef.close();
  }

  doDelete() {
    this.http.delete(`${environment.API_BASE_URL}cnap/invmgr/callhome/actions/${encodeURIComponent(this.deleteId)}`).subscribe((json: any) => {

      this.close();
      this.modalRef = this.dialogService.open(this.deleteSuccessModal, this.ngbModalOptions);
      this.deleteId = '';
      this.isRerender = true;
      this.getList();

    }, (err: any) => {
      this.close();
      this.pageErrorHandle(err);
    });
  }

  clearFilter() {

    this.filtersForm.patchValue({
      geoLocationInfo: ''
    });

    this.getList();

  }

  ngOnDestroy() {
    if (this.listObs) {
      this.listObs.unsubscribe();
    }
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }

}
