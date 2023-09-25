
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from 'src/app-services/translate.service';
import { CcoOrgAdminService } from 'src/app/cco/shared/services/cco-org-admin.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { trim } from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/support/data.service';

@Component({
  selector: 'app-cco-org-admin',
  templateUrl: './cco-org-admin.component.html',
  styleUrls: ['./cco-org-admin.component.scss']
})
export class CcoOrgAdminComponent implements OnInit {

  serviceType: string;
  ontIdType: string;
  ontNameFormat: string;
  dhcpServerType: string;
  loading: boolean = true;
  warningMessage: string;
  isError: boolean;
  submitted: boolean;
  success: boolean = false;
  successInfo: string;
  adminsData: any;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  tableAvailable: boolean = false;
  selectedSrType;
  doDelete: boolean = false;
  confrimationMsg: string;
  frTable: DataTables.LanguageSettings;
  enTable: DataTables.LanguageSettings;

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  selectedServiceType: string = 'All';

  language;
  languageSubject;

  constructor(private ccoOrgAdminService: CcoOrgAdminService, private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataServiceService) {
    this.frTable = this.translateService.fr;
    this.enTable = this.translateService.en;
  }

  ngOnInit(): void {
    this.dtOptions = {
      ordering: true
    }

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.tableLanguageOptions();
      setTimeout(() => {
        this.redraw();
      }, 500);
      this.confrimationMsg = `${this.language['Are you sure you want to delete']} - ${this.selectedSrType}`
    })

    this.getAdmins();
  }

  // ngAfterViewInit(): void {
  //   this.dtTrigger.next();
  // }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  // getServiceType(){
  //   this.ccoOrgAdminService.fetchAmdins(this.selectedServiceType).subscribe((data : any)=>{
  //     if(!Array.isArray(data)){
  //       this.adminsData.push(data);
  //     }
  //   },err =>{
  //     this.pageErrorHandle(err);
  //   })
  // }

  createOrgAdmin() {
    this.router.navigate(['../cco-org-admin-add'], { relativeTo: this.route });
  }


  editAdmin(data, srNo) {
    this.router.navigate([`../edit/org-admin/${srNo}`], { relativeTo: this.route, queryParams: data });
  }

  getAdmins(refresh = false) {
    this.ccoOrgAdminService.fetchAmdins(this.selectedServiceType).subscribe((data: any) => {
      this.adminsData = data instanceof Array ? data : [data];

      if (data == 'Org Admin Data not found') {
        this.adminsData = [];
      }

      // if(!Array.isArray(data)){
      //   // this.adminsData = null;
      //   this.adminsData.push(data);
      // }

      this.tableAvailable = true;
      if (refresh) {
        this.rerender();
      } else {
        this.dtTrigger.next();
      }
      this.loading = false;
    }, err => {
      this.pageErrorHandle(err);
    })
    this.tableLanguageOptions()
  }

  removeAdminDetail(srvType) {
    this.selectedSrType = srvType;
    this.confrimationMsg = `${this.language['Are you sure you want to delete']} - ${this.selectedSrType}`
    this.doDelete = true;
  }

  removeAdminConfirmation() {
    this.ccoOrgAdminService.deleteAdminData(this.selectedSrType).subscribe((data: any) => {
      this.selectedSrType = null;
      this.doDelete = false;
      this.getAdmins(true);
    }, err => {
      this.pageErrorHandle(err);
    })
  }

  cancelDelete() {
    this.selectedSrType = null;
    this.doDelete = false;
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      this.dtOptions.language = this.enTable;
    }
  }

  redraw() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  pageErrorHandle(error: HttpErrorResponse) {
    this.isError = true;
    if (error.status == 401) {
      this.warningMessage = this.language['Access Denied'];
    } else if (error.status == 400) {
      this.warningMessage = error.error.message;
    } else if (error.status == 500) {
      this.warningMessage = error.error.message
    } else if (error.status == 504) {
      this.warningMessage = this.language['Gateway time out'];
    } else {
      this.warningMessage = this.dataService.pageErrorHandle(error);
    }
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
  }


}
