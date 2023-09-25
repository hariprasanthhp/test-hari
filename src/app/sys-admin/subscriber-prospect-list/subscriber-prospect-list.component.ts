import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { FileDataItem, FileListItem, FileMetaData } from '../subscriber-prospect-upload/subscriber-propect.model';
import { ProspectSubscriberService } from '../services/prospect-subscriber.service';

@Component({
  selector: 'app-subscriber-prospect-list',
  templateUrl: './subscriber-prospect-list.component.html',
  styleUrls: ['./subscriber-prospect-list.component.scss']
})
export class SubscriberProspectListComponent implements OnInit, OnDestroy {
  language: any;
  dtOptions: DataTables.Settings = {};
  modalRef: any;
  redirect: string;
  searchText: string;
  selectedFilter = 'All';
  errorMessage: string;
  loading = false;
  prospectDetailLists: FileDataItem[];
  prospectAllLists: FileDataItem[];
  prospectMetaData: FileMetaData;
  prospectListDetailError = false;
  selectedFile: FileListItem;
  MODULE: string;
  successMessage = '';
  private subscriptions: Subscription[] = [];

  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  constructor(
    private translateService: TranslateService,
    private dialogService: NgbModal,
    private router: Router,
    private prospectSubscriberService: ProspectSubscriberService,
    private sso: SsoAuthService,
    private titleService: Title,
    private commonOrgService: CommonService,

  ) {
    let url = this.router.url;
    this.MODULE = this.sso.getRedirectModule(url);
    this.commonOrgService.currentPageAdder('subscriber-prospect-list');
    this.selectedFile = this.router.getCurrentNavigation()?.extras?.state?.selectedFile;

    if (!this.selectedFile) {
      this.goBackToSubscriber();
    }
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      retrieve: true,
      processing: false,
      dom: 'tipr',
      searching: true,
      ordering: true,
      order: [4, "asc"],
      columnDefs: [
        { targets: [0, 1, 2, 3], orderable: false },
      ]
    };
    this.language = this.translateService.defualtLanguage;
    this.titleService.setTitle(`${this.language['Subscriber']} ${this.language['Prospect']} ${this.language['File']} ${this.language['Upload']}-${this.MODULE === 'systemAdministration' ? 'System Administration' : 'Administration'} - ${this.language['Calix Cloud']}`);
    this.subscriptions.push(this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        this.titleService.setTitle(`${this.language['Subscriber']} ${this.language['Prospect']} ${this.language['File']} ${this.language['Upload']}-${this.MODULE === 'systemAdministration' ? 'System Administration' : 'Administration'} - Calix Cloud`);
        this.getFileDetails();
        this.setTableOptions();
      })
    );
    this.getFileDetails();
    this.tableLanguageOptions();
  }

  getFileDetails() {
    this.loading = true;
    this.subscriptions.push(this.prospectSubscriberService.getFileData(this.selectedFile.id, this.selectedFile.listType).subscribe(
      (result) => {
        this.reRender();
        this.prospectListDetailError = false;
        if (result && result.fileData && result.fileData.length > 0) {
          this.prospectListDetailError = false;
          this.prospectDetailLists = result.fileData;
          this.prospectAllLists = result.fileData;
          this.prospectMetaData = result.metaData;
        } else {
          this.goBackToSubscriber();
        }
        setTimeout(() => {
          this.reRender();
          if (this.searchText) {
            this.searchName(this.searchText);
          }
          this.loading = false;
        }, 500);
      }, (error: HttpErrorResponse) => {
        this.prospectListDetailError = true;
        setTimeout(() => this.reRender(), 500);
        this.loading = false;
        this.errorMessage = this.errorHandler(error);
        this.successMessage = '';
      }))
  }

  allSelected() {
    this.loading = true;
    this.reRender();
    if (this.selectedFilter === 'Match') {
      this.prospectDetailLists = this.prospectAllLists.filter(m => m.matched === true);
    } else if (this.selectedFilter === 'Non-Match') {
      this.prospectDetailLists = this.prospectAllLists.filter(m => !m.matched);
    } else if (this.selectedFilter === 'All') {
      this.prospectDetailLists = this.prospectAllLists;
    }
    setTimeout(() => {
      this.reRender();
      if (this.searchText) {
        this.searchName(this.searchText);
      }
      this.loading = false;
    }, 500);
  }

  reRender(): void {
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
    this.dtTrigger.next();
  }

  errorHandler(err: HttpErrorResponse) {
    if (err.error) {
      if (err.error['errorDesc']) {
        this.errorMessage = err.error['errorDesc'];
      } else if (err.error['status'] == 500) {
        this.errorMessage = `Internal Server Error`;
      } else if (err.error['statusText'] == 'Unknown Error' && err.error['status'] == 0) {
        // this.errorMessage = "Unknown Error - Please refresh the page"; // remove later
        this.errorMessage = "An unknown error has occurred. Refresh the page to try again";
      } else if (err.error['status'] && err.error['status'] == 401) {
        this.errorMessage = "User Unauthorized";
      }
    }
    else {
      this.errorMessage = this.commonOrgService.pageErrorHandle(err);
    }
    return this.errorMessage;
  }

  searchName(searchText) {
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.search(searchText).draw();
    });
    this.closeAlert();
  }

  clearText() {
    this.searchText = '';
    this.searchName(this.searchText);
  }
  closeAlert() {
    this.errorMessage = '';
    this.successMessage = '';
  }
  goBackToSubscriber() {
    this.router.navigate([`${this.MODULE === 'systemAdministration' ? 'systemAdministration' : 'organization-admin'}/subscriber-prospect-upload`])

  }
  SubscriberEditFileNameModal(modal) {
    this.modalRef = this.dialogService.open(modal, { centered: true, windowClass: 'custom-modal subscriber-custom-modal' });
  }
  SubscriberAddEntryModal(modal) {
    this.modalRef = this.dialogService.open(modal, { centered: true, windowClass: 'custom-modal subscriber-custom-modal' });
  }
  SubscriberEditModal(modal) {
    this.modalRef = this.dialogService.open(modal, { centered: true, windowClass: 'custom-modal subscriber-custom-modal' });
  }
  SubscriberDeleteModal(modal) {
    this.modalRef = this.dialogService.open(modal, { centered: true, windowClass: 'custom-modal subscriber-delete-modal' });
  }
  SubscriberListDeleteModal(modal) {
    this.modalRef = this.dialogService.open(modal, { centered: true, windowClass: 'custom-modal subscriber-delete-modal' });
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'en') {
      delete this.dtOptions.language;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub?.unsubscribe());
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
  }

  private setTableOptions() {
    this.tableLanguageOptions();

    setTimeout(() => {
      this.reRender();
    }, 200);
  }
}
