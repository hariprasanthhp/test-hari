import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { ZipCodeApiService } from '../services/zipcode-upload.service';
import { ZipUploadModel } from './zipdata.model';
import * as XLSX from 'xlsx';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService as common } from 'src/app/shared/services/common-functions.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-zip-code-upload',
  templateUrl: './zip-code-upload.component.html',
  styleUrls: ['./zip-code-upload.component.scss']
})
export class ZipCodeUploadComponent implements OnInit, OnDestroy {
  language: any;
  languageSubject: any;
  zipCodeFilterList: any;
  searchText: any;
  zipcodeName: any;
  loading: boolean = false;
  selectedListName: any;
  zipcodeUpdatedName: any;
  errorMessage = '';
  successMessage = '';
  modalMessage = '';
  MODULE: string;
  saveButtonShow: boolean = false;
  zipcodeArrayResultError: boolean = false;
  isRerender: boolean = false;

  listName = '';
  zipData: ZipUploadModel = {
    list_name: '',
    zip_data: []
  };

  zipCodeFilterOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('editZipcodeFilterName', { static: false }) private editZipcodeFilterName: TemplateRef<any>;
  @ViewChild('deleteZipcodeFilterList', { static: false }) private deleteZipcodeFilterList: TemplateRef<any>;
  @ViewChild('messageDialog') messageDialog: TemplateRef<any>;

  dtInstance: Promise<DataTables.Api>;
  zipcodeNameError: boolean = false;

  //varibles for test cases
  deletResponse:any;
  updateResponse:any;
  zipUploadCSVResponse:any;

  constructor(
    private translateService: TranslateService,
    private dialogService: NgbModal,
    private zipcodeService: ZipCodeApiService,
    private router: Router,
    private sso: SsoAuthService,
    private commonOrgService: CommonService,
    private titleService:Title,
    private common:common,
  ) {
    let url = this.router.url;
    this.MODULE = this.sso.getRedirectModule(url);
    this.commonOrgService.currentPageAdder('zip-code-upload');
  }


  ngOnInit(): void {
    this.zipCodeFilterOptions = {
      pagingType: 'full_numbers',
      processing: true,
      pageLength: 10,
      lengthChange: false,
      ordering: true,
      searching: true,
      dom: 'tipr',
      retrieve: true,
      columnDefs: [
        { targets: [1], orderable: false },
        { targets: [-1], orderable: false }
      ],
    }

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data) => {
      this.language = data;
      this.setTableOptions('language');
      this.getZipcodeListNames();
      this.titleService.setTitle(`${this.language['ZIP Code File Upload']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['ZIP Code File Upload']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    this.getZipcodeListNames();
    this.tableLanguageOptions();
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

  getZipcodeListNames() {
    this.loading = true
    this.zipcodeService.zipCodeListNames().subscribe((res: any) => {
      this.zipcodeArrayResultError = false
      if (this.isRerender) {
        this.rerender()
        if (res) {
          this.zipcodeArrayResultError = false
          this.zipCodeFilterList = res;
          this.isRerender = true;
          this.dtTrigger.next();
        }
      }
      else {
        this.isRerender = true;
        this.dtTrigger.next();
        if (res) {
          this.zipcodeArrayResultError = false
          this.zipCodeFilterList = res;
        }
      }
      this.dtTrigger.next();
      this.loading = false;
      if (this.searchText) {
        this.searchName(this.searchText)
      }
      if (res && res.length == 0) {
        this.zipcodeArrayResultError = true
      }
    }, (error: HttpErrorResponse) => {
      this.zipcodeArrayResultError = true
      this.dtTrigger.next();
      this.rerender()
      this.loading = false;
      this.errorMessage = error.error["errorDesc"] ? error.error["errorDesc"] : this.errorHandler(error)
    })
  }

  fileSelected(event, modal: TemplateRef<any>) {
    const file: File = event.target.files[0];

    this.closeAlert();
    this.resetUploadCsv();

    this.zipData = {
      list_name: '',
      zip_data: []
    };
    this.listName = '';

    if (!file || !['.csv', '.xlsx', '.txt'].some(t => file.name.endsWith(t))) {
      this.modalMessage = this.language['Please upload a file with valid format (.csv, .xlsx, .txt)'];
       this.messageModalOpen();
      return;
     }

    let reader = new FileReader();
    if (file.name.endsWith('.xlsx')) {
      reader.readAsArrayBuffer(file);
    }
    else {
      reader.readAsText(file);
    }
    reader.onload = () => {
      let rawData = reader.result;
      let zipPlusList: string[] = [];

      if (file.name.endsWith('.xlsx')) {
        var xlsxRawData = new Uint8Array(<ArrayBuffer>rawData);
        var xlsxDataList = new Array();
        for (var i = 0; i != xlsxRawData.length; ++i) {
          xlsxDataList[i] = String.fromCharCode(xlsxRawData[i]);
        }
        var xlsxBinary = xlsxDataList.join("");
        const workBook = XLSX.read(xlsxBinary, { type: 'binary' });
        const sheet = workBook.Sheets[workBook.SheetNames[0]];
        const csv = XLSX.utils.sheet_to_csv(sheet)
        zipPlusList = csv.split(/\r\n|\n/).filter(s => s);
      } else {
        zipPlusList = (<string>rawData).split(/\r\n|\n/).filter(s => s);
      }

      if (zipPlusList.some(z => z.split(',').filter(s => s).length > 3)) {
        this.modalMessage = this.language['Please upload a file with valid format (contains more than 3 columns)'];
        this.messageModalOpen();
        return;
      }

      zipPlusList.forEach(c => {
        let zipplus = c.split(',').filter(s => s);

        if (zipplus.length > 2) {
          const zip = zipplus[0].trim();
          const plus = zipplus[1].trim();
          let has = zipplus[2].trim();
          if(has == 'S�') {
            has = has.replace('�','í')
          }
          if(has == 'Oui' || has == 'Ja' || has == 'Sí') {
            has = 'Yes';
          }
          if(has == 'Non' || has == 'Nein' || has =='No') {
            has = 'No';
          }
          this.zipData.zip_data.push({
            zipcode: zip,
            zipPlusFour: plus,
            hasService: has,
          });
        }
        else if (zipplus.length === 2) {
          const zip = zipplus[0].trim();          
          let plus = '';
          let has = '';
          if(/^\d+$/.test(zipplus[1].trim())){
            plus = zipplus[1].trim();
          }
          else{
            has = zipplus[1].trim();
          }
          if(has == 'S�') {
            has = has.replace('�','í')
          }
          if(has == 'Oui' || has == 'Ja' || has == 'Sí') {
            has = 'Yes';
          }
          if(has == 'Non' || has == 'Nein' || has =='No') {
            has = 'No';
          }
          this.zipData.zip_data.push({
            zipcode: zip,
            zipPlusFour: plus,
            hasService: has,
          });
        }
        else if (zipplus.length === 1) {
          const zip = zipplus[0].trim();
          this.zipData.zip_data.push({
            zipcode: zip,
            zipPlusFour: '',
            hasService: '',
          });
        } else {
          this.zipData.zip_data.push({
            zipcode: '',
            zipPlusFour: '',
            hasService: '',
          });
        }
      });

      this.listName = file.name.replace(/\.[^/.]+$/, '');
      this.dialogService.dismissAll()
      this.uploadModalOpen(modal);
    };

    event.target.value = '';
  }

  resetUploadCsv(): void {
    this.listName = '';
    this.zipData = {
      list_name: '',
      zip_data: []
    };
  }

  messageModalOpen(): void {
    this.dialogService.dismissAll();
    this.dialogService.open(this.messageDialog, { backdrop: 'static', keyboard: false,windowClass: 'message-modal' });
  }

  saveZipPlusCsv(): void {
    this.closeAlert();
    this.zipData.list_name = this.listName.trim();
    this.zipcodeService.saveZipPlusFile(this.zipData).subscribe((res:any) => {
      this.zipUploadCSVResponse=res;
      this.successMessage = this.language['CSV Uploaded Successfully'];
      this.errorMessage = '';
      setTimeout(() => this.zipcodeFilter(this.zipData.list_name), 600);
    }, (err: HttpErrorResponse) => {
      this.successMessage = '';
      this.errorMessage = err.error.errorDesc;
    });
    setTimeout(() => this.dialogService.dismissAll(), 500);
  }

  modalOpen(modal?) {
    this.closeAlert();
    this.dialogService.open(this.editZipcodeFilterName, { backdrop: 'static', keyboard: false, centered: true, windowClass: 'admin-default-modal' });
    this.zipcodeName = modal;
    this.zipcodeUpdatedName = modal;
    this.saveButtonShow = false;
    this.zipcodeNameError = false;
  }

  uploadModalOpen(modal?) {
    this.dialogService.open(modal, {backdrop: 'static', keyboard: false, centered: true, windowClass: 'admin-default-modal' });
  }

  delModalOpen(modal?) {
    this.closeAlert();
    this.dialogService.open(this.deleteZipcodeFilterList, { backdrop: 'static', keyboard: false, centered: true, windowClass: 'admin-custom-delete-modal' });
    this.zipcodeName = modal;
  }

  uploadModal(modal?) {
    this.closeAlert();
    this.dialogService.open(modal, { backdrop: 'static', keyboard: false, centered: true, windowClass: 'admin-modal-upload' });
  }

  updateZipcodeName() {
    this.closeDialogModal()
    if (!this.zipcodeName) {
      this.errorMessage = 'ZipcodeName Required'
    }
    let editedData = {
      "listName": this.zipcodeUpdatedName,
      "newListName": this.zipcodeName
    }
    this.zipcodeService.modifyZipcode(editedData).subscribe((res) => {
      if (res) {
        this.updateResponse=res;
        this.closeDialogModal()
        this.selectedListName = this.zipcodeName;
        this.getZipcodeListNames()
      }
    }, (error: HttpErrorResponse) => {
      this.closeDialogModal();
      this.errorMessage = error.error["errorDesc"] ? error.error["errorDesc"] : this.errorHandler(error)
    })

  }

  deleteZipcodeName() {
    this.closeDialogModal();
    this.zipcodeService.removeZipcode(this.zipcodeName).subscribe((res) => {
      if (res) {
        this.deletResponse=res;
        this.closeDialogModal()
        this.redirectToZipcodeUpload()
        this.getZipcodeListNames()
      }
    }, (error: HttpErrorResponse) => {
      this.closeDialogModal();
      this.errorMessage = error.error["errorDesc"] ? error.error["errorDesc"] : this.errorHandler(error)
    })
  }

  zipcodeFilter(zipcodeData) {
    this.router.navigate([`${this.MODULE === 'systemAdministration' ? 'systemAdministration' : 'organization-admin'}/zip-code-entrylist`], { state: { fileName: zipcodeData } });
  }

  redirectToZipcodeUpload() {
    this.router.navigate([`${this.MODULE === 'systemAdministration' ? 'systemAdministration' : 'organization-admin'}/zip-code-upload`])
  }

  closeAlert() {
    this.errorMessage = '';
    this.successMessage = '';
    this.modalMessage = '';
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe()
    }
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }

  }

  setTableOptions(type?: string) {
    this.tableLanguageOptions();
    if (type && type == 'language') {
      setTimeout(() => {
        this.rerender();
      }, 200);
    } else {
      this.loading = false;
    }
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.zipCodeFilterOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'es') {
      this.zipCodeFilterOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.zipCodeFilterOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'en') {
      delete this.zipCodeFilterOptions.language;
    }
  }

  closeDialogModal() {
    this.dialogService.dismissAll();
  }

  onChangeZipcodeFilterName(event) {
    if (event.length == 0 || event == this.zipcodeUpdatedName) {
      this.zipcodeNameError = false;
      this.saveButtonShow = false;
    } else if (/^[A-Za-z0-9 ]+$/gm.test(event)) {
      this.zipcodeNameError = false;
      this.saveButtonShow = true;
    } else {
      this.zipcodeNameError = true;
      this.saveButtonShow = false;
    }
  }
  

  errorHandler(err: HttpErrorResponse) {
    if (err.error['status'] == 500) {
      this.errorMessage = `Internal Server Error`;
    } else if (err.error['statusText'] == 'Unknown Error' && err.error['status'] == 0) {
      // this.errorMessage = "Unknown Error - Please refresh the page"; // remove later
      this.errorMessage = "An unknown error has occurred. Refresh the page to try again";
    } else if (err.error['status'] && err.error['status'] == 401) {
      this.errorMessage = "User Unauthorized";
    }
    else {
      this.errorMessage = this.commonOrgService.pageErrorHandle(err);
    }
    return this.errorMessage;
  }

  validateFileName(value: string): void {
    this.listName = value.replace(/[^a-zA-Z0-9 ]+/g, '');
  }

  isValidZipCode(zipCode: string): boolean {
    return /^\d{5}$/g.test(zipCode);
  }

  isValidZipPlus(zipPlus: string): boolean {
    return /^\d{4}$/g.test(zipPlus);
  }

  isValidService(service: string): boolean {
    return /^(?:Yes|No)$/.test(service);
  }
  removeUnwantedSpace(input,value){
    this[input] = this.common.trimSpaceFromNonObjectInputs(value)
  }

  traslateDate(date) {
    let pipe = new DatePipe('en-US');
    date = pipe.transform(date, 'd MMMM, y').split(' ');
    date[1] = date[1].slice(0, -1);
    date[1] = this.language[date[1]];
    return `${date[0]} ${date[1]}, ${date[2]}`;
  }
}
