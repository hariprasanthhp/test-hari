import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, Subscription } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { OrganizationApiService } from '../services/organization-api.service';
import { ProspectSubscriberService } from '../services/prospect-subscriber.service';
import { FileListItem } from './subscriber-propect.model';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
@Component({
  selector: 'app-subscriber-prospect-upload',
  templateUrl: './subscriber-prospect-upload.component.html',
  styleUrls: ['./subscriber-prospect-upload.component.scss']
})
export class SubscriberProspectUploadComponent implements OnInit, OnDestroy {
  language: any;
  dtOptions: DataTables.Settings = {};
  modalRef: any;
  redirect: string;
  MODULE: string;
  searchText: string;
  prospectLisData: FileListItem[];
  prospectFileName: string;
  loading = false;
  fileTodelete: FileListItem;
  errorMessage = '';
  successMessage = '';
  saveButtonShow = false;
  prospectListError = false;
  subscriberChecked = true;
  prospectChecked = false;
  selectedFileName = '';
  selectedFile: File;
  listName = '';
  ORG_ID: any;
  private subscriptions: Subscription[] = [];
  apps = {
    cmcPro: false,
    cmc: false,
  };
  orgInfoSubs: any;
  orgInfoEntitlementdata: any;
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  constructor(
    private translateService: TranslateService,
    private dialogService: NgbModal,
    private prospectSubscriberService: ProspectSubscriberService,
    private organizationApiService: OrganizationApiService,
    private router: Router,
    private sso: SsoAuthService,
    private commonOrgService: CommonService,
    private titleService: Title,
    private CommonFunctionsService: CommonFunctionsService,
    private exportExcelService: ExportExcelService
  ) {
    let url = this.router.url;
    this.MODULE = this.sso.getRedirectModule(url);
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.commonOrgService.currentPageAdder('subscriber-prospect-upload');
  }

  ngOnInit(): void {

    if (this.MODULE === 'systemAdministration') {
      this.getorgInfoData()
    } else {
      this.showApps()
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      ordering: true,
      order: [0, "asc"],
      searching: true,
      dom: 'tipr',
      retrieve: true,
      processing: false,
      columnDefs: [
        { targets: [3, 4], orderable: false },
      ],
    }

    this.language = this.translateService.defualtLanguage;
    this.titleService.setTitle(`${this.language['Subscriber']} ${this.language['Prospect']} ${this.language['File']} ${this.language['Upload']} - ${this.MODULE === 'systemAdministration' ? 'System Administration' : 'Administration'} - ${this.language['Calix Cloud']}`);
    this.subscriptions.push(this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        this.titleService.setTitle(`${this.language['Subscriber']} ${this.language['Prospect']} ${this.language['File']} ${this.language['Upload']} - ${this.MODULE === 'systemAdministration' ? 'System Administration' : 'Administration'} - ${this.language['Calix Cloud']}`);
        this.closeAlert();
        this.getFileList();
        this.setTableOptions();
      }
    ));
    this.tableLanguageOptions();
  }

  subscriberSelected(checked: boolean) {
    this.subscriberChecked = checked;
    this.prospectChecked = !checked;
  }

  prospectSelected(checked: boolean) {
    this.prospectChecked = checked;
    this.subscriberChecked = !checked;
  }

  fileSelected(event, modal: TemplateRef<any>) {
    const file: File = event.target.files[0];
    let blob;
    let that = this;
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (e) {
      var lines = (<string>e.target.result).split('\n');
      lines[0] = "First Name,Last Name,Street Address 1,Street Address 2,City,State,Zip,Email(s)";
      let updatedContent = lines.join('\n');
      blob = new Blob([updatedContent],{type: 'text/csv'});
      that.selectedFile = new File([blob],file.name,{type:'text/csv'});
    };
    if (!file || !file.name.endsWith('.csv')) {
      this.errorMessage = this.language['Please upload a file with valid format (.csv)'];
      setTimeout(() => {
        this.scrollTop();
        this.dialogService.dismissAll();
      }, 200);
      return;
    }
    this.openSubscriberFileNameModal(modal);
    this.selectedFileName = file.name.replace(/\.[^/.]+$/gm, '').replace(/[^a-zA-Z0-9 _.-]+/gm, '');
    this.selectedFile = file;
    event.target.value = '';
    this.subscriberSelected(true);
  }

  saveFile(): void {
    this.closeAlert();
    this.loading = true;
    this.selectedFileName = this.selectedFileName.trim()
    let saveFile$: Observable<boolean>;
    if (this.subscriberChecked) {
      saveFile$ = this.prospectSubscriberService.saveSubscriberFile(this.selectedFile, this.selectedFileName);
    } else if (this.prospectChecked) {
      saveFile$ = this.prospectSubscriberService.saveProspectFile(this.selectedFile, this.selectedFileName);
    } else {
      saveFile$ = this.prospectSubscriberService.saveSubscriberFile(this.selectedFile, this.selectedFileName);
    }

    this.subscriptions.push(saveFile$.subscribe(
      result => {
        this.successMessage = this.language['Saved Successfully'];
        this.errorMessage = '';
        this.getFileList();
      },
      (error) => {
        this.errorMessage = this.errorHandler(error);
        this.successMessage = '';
        this.loading = false;
      }
    ));
    setTimeout(() => {
      this.scrollTop();
      this.dialogService.dismissAll();
    }, 500);
  }

  deleteFile() {
    this.loading = true;
    let deleteFile$: Observable<boolean>;
    if (this.fileTodelete.listType == 'prospects') {
      deleteFile$ = this.prospectSubscriberService.deleteProspect(this.fileTodelete.id);
    }
    else if (this.fileTodelete.listType == 'subscribers') {
      deleteFile$ = this.prospectSubscriberService.deleteSubscriber(this.fileTodelete.id);
    }

    this.subscriptions.push(deleteFile$.subscribe(
      result => {
        this.successMessage = this.language['Deleted Successfully'];
        console.log(this.successMessage);
        this.errorMessage = '';
        this.getFileList();
      },
      (error) => {
        this.errorMessage = this.errorHandler(error);
        this.successMessage = '';
        this.loading = false;
      }
    ));
    setTimeout(() => {
      this.scrollTop();
      this.dialogService.dismissAll();
    }, 500);
  }

  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  closeAlert() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  redirectToFileUpload() {
    this.router.navigate([`${this.MODULE === 'systemAdministration' ? 'systemAdministration' : 'organization-admin'}/subscriber-prospect-upload`])
  }

  searchName(searchText) {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(searchText).draw();
    });
  }

  clearText() {
    this.searchText = '';
    this.searchName(this.searchText);
  }

  getFileList() {
    this.loading = true;
    this.subscriptions.push(this.prospectSubscriberService.getFileList().subscribe(
      (res) => {
        this.reRender();
        this.prospectListError = false;
        if (res && res.length > 0) {
          this.prospectListError = false;
          if (this.apps.cmcPro == false) {
            res = res.filter(type => {
              return type.listType != 'prospects'
            }
            );
          }
          this.prospectLisData = res;
        } else {
          this.prospectListError = true;
          this.prospectLisData = [];
        }
        setTimeout(() => {
          this.reRender();
          if (this.searchText) {
            this.searchName(this.searchText);
          }
          this.loading = false;
        }, 500);
      },
      (error: HttpErrorResponse) => {
        this.prospectListError = true;
        setTimeout(() => this.reRender(), 500);
        this.loading = false;
        this.errorMessage = this.errorHandler(error);
        this.successMessage = '';
      }
    ));
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
      } else if (err.error['message']) {
        this.errorMessage = err.error['message'];
      }
    }
    else {
      this.errorMessage = this.commonOrgService.pageErrorHandle(err);
    }
    return this.errorMessage;
  }

  reRender(): void {
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
    this.dtTrigger.next();
  }

  openSubscriberFileNameModal(modal) {
    this.modalRef = this.dialogService.open(modal, { backdrop: 'static', keyboard: false, centered: true, windowClass: 'custom-modal subscriber-custom-edit' });
  }
  openSubscriberEditFileNameModal(modal) {
    this.modalRef = this.dialogService.open(modal, { backdrop: 'static', keyboard: false, centered: true, windowClass: 'custom-modal subscriber-custom-edit' });
  }
  openSubscriberDeleteModal(item: FileListItem, modal) {
    this.closeAlert();
    this.modalRef = this.dialogService.open(modal, { centered: true, windowClass: 'custom-modal subscriber-alert-delete', backdrop: 'static', keyboard: false });
    this.fileTodelete = item;
  }
  openSubscriberUploadModal(modal) {
    this.closeAlert();
    this.modalRef = this.dialogService.open(modal, { backdrop: 'static', keyboard: false, centered: true, windowClass: 'custom-modal subscriber-custom-upload' });
  }
  goToSubscriber(prospectData: FileListItem) {
    this.router.navigate([`${this.MODULE === 'systemAdministration' ? 'systemAdministration' : 'organization-admin'}/subscriber-prospect-list`], { state: { selectedFile: prospectData } });
  }

  validateFileName(): boolean {
    return (/^[A-Za-z0-9 _.-]+$/gm.test(this.selectedFileName.trim()));
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
  showApps(): void {
    let enttlmnts = this.sso.getEntitlements();
    if (enttlmnts[209]) {
      this.apps.cmcPro = true;
    }
    this.getFileList();
  }

  private setTableOptions() {
    this.tableLanguageOptions();

    setTimeout(() => {
      this.reRender();
    }, 200);
  }
  getorgInfoData() {
    this.orgInfoSubs = this.organizationApiService.orgInfoEntitlement(this.ORG_ID).subscribe((result: any) => {
      this.orgInfoEntitlementdata = result;
      if (result) {
        let obj = {};
        for (let i = 0; i < this.orgInfoEntitlementdata?.length; i++) {
          obj[this.orgInfoEntitlementdata[i].appType] = this.orgInfoEntitlementdata[i];
        }
        if ((obj[119] && obj[119].status !== 'Expired') || (obj[209] && obj[209].status !== 'Expired')) {
          this.apps.cmc = true;
        } else {
          this.apps.cmc = false;
        }
       
        if ((obj[209] && obj[209].status !== 'Expired')) {
          this.apps.cmcPro = true;
        } else {
          this.apps.cmcPro = false;
        }
        this.getFileList()
      }
    }, (err: HttpErrorResponse) => {
      //this.pageErrorHandle(err);
      this.getFileList()
    })
  }
  removeUnwantedSpace(input, value) {
    this[input] = this.CommonFunctionsService.trimSpaceFromNonObjectInputs(value)
  }

  downloadFunction() {
    let chartName = '';
    if(this.apps.cmcPro) {
      chartName = `${this.language.Subscriber}_${this.language.Prospect}_${this.language.Template}`;
    }
    if(!this.apps.cmcPro) {
      chartName = `${this.language.Subscriber}_${this.language.Template}`;
    }
    let that = this;
    let data = [];
    function translateKeys(obj) {
      let translatedObject = {};
      for (let key in obj) {
        let translatedKey = that.language[key];
        let strAd;

        if (key == 'Street Address1' || key == 'Street Address2') {
          strAd = key.substring(0, key.length - 1);
          translatedKey = that.language[strAd];
        } else { }
        if (translatedKey) {
          if (key == 'Street Address1') {
            translatedObject[`${translatedKey} 1`] = obj[key]
          } else if (key == 'Street Address2') {
            translatedObject[`${translatedKey} 2`] = obj[key]
          } else {
            translatedObject[translatedKey] = obj[key];
          }
        } else {
          translatedObject[key] = obj[key];
        }
      }
      data.push(translatedObject);
      return translatedObject;
    }
    let person1 = {
      'First Name': 'Tom',
      'Last Name': 'Jones',
      'Street Address1': '123 East Lane',
      'Street Address2': 'Ap # 6',
      'City': 'San Jose',
      'State': 'CA',
      'Zip': '23137',
      'Email(s)': 'tom.j@email.com; tom2@email.com',
    };
    let person2 = {
      'First Name': 'Bailey',
      'Last Name': 'Thompson',
      'Street Address1': 'P.O. Box 132',
      'Street Address2': '77 Sunny St.',
      'City': 'Omaha',
      'State': 'Idaho',
      'Zip': '32140',
      'Email(s)': '',
    };
    let person3 = {
      'First Name': 'Tina',
      'Last Name': 'Hawkins',
      'Street Address1': '22-109 Great Avenue',
      'Street Address2': '',
      'City': 'Chicago',
      'State': 'IL',
      'Zip': '00011',
      'Email(s)': 'tina@email.com',
    };
    let persons = [person1, person2, person3];
    let translatedPersons = persons.map(person => translateKeys(person));
    this.exportExcelService.downLoadCSVRevenue(chartName, data);
  }
}
