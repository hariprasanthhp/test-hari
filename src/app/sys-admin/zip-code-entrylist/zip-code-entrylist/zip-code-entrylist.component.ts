import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { settings } from 'cluster';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../../services/common.service';
import { ZipCodeApiService } from '../../services/zipcode-upload.service';
import { CommonFunctionsService as common } from 'src/app/shared/services/common-functions.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-zip-code-entrylist',
  templateUrl: './zip-code-entrylist.component.html',
  styleUrls: ['./zip-code-entrylist.component.scss']
})
export class ZipCodeEntrylistComponent implements OnInit {
  addZipcode: any
  addZipPlusfour: any;
  deleteZipcodeZipPlusfour: any;
  listIds = [];
  zipCodeDetailLists: any;
  searchText: any;
  dtInstance: Promise<DataTables.Api>;
  allChecked: boolean = false;
  deleteSelectionButtonShow: boolean = false;
  selectedListName: any;
  loading: boolean = false;
  errorShow: boolean = false;
  errorMessage: any;
  MODULE: any;
  language: any;
  languageSubject: any;
  zipcodeName: any;
  zipcodeUpdatedName: any;
  entryZipcode: any;
  entryPlusFour: any;
  entryZipcodeId: any;
  saveButtonShow: boolean = false;
  requiredZipcodeNameShow: boolean = false;
  requiredZipcodeName: string;
  zipcodeListArrayResultError: boolean = false;
  info: DataTables.PageMethodeModelInfoReturn;
  isRerender: boolean = false;
  previousValue: any;
  previousZipPlusFourValue: any;
  Table: DataTables.Api;
  newArray: any = [];
  zipcodeNameError: boolean = false;
  zipcodePlusError: boolean = false;
  hasServiceCheck: boolean = false;
  entryHasService: boolean = false;
  previousEntryChecked: boolean = false;
  addZipResponse: any;
  deleteResponse: any;
  updateEntryZipResponse: any;
  updateZipNameResponse: any;

  zipCodeDtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('deleteZipcodeFilterList', { static: false }) private deleteZipcodeFilterList: TemplateRef<any>;
  @ViewChild('editZipcodeFilterName', { static: false }) private editZipcodeFilterName: TemplateRef<any>;
  @ViewChild('addZipModal', { static: false }) private addZipModal: TemplateRef<any>;
  @ViewChild('delteZipcodes', { static: false }) private delteZipcodes: TemplateRef<any>;
  @ViewChild('editZipModal', { static: false }) private editZipModal: TemplateRef<any>;
  

  constructor(private dialogService: NgbModal,
    private zipcodeService: ZipCodeApiService,
    private router: Router,
    private sso: SsoAuthService,
    private titleService: Title,
    private commonOrgService: CommonService,
    private translateService: TranslateService,
    private common:common,

  ) {
    let url = this.router.url;
    this.MODULE = this.sso.getRedirectModule(url);
    this.titleService.setTitle(`Zip Code File Upload - ${this.MODULE === 'systemAdministration' ? 'System Administration' : 'Administration'} - Calix Cloud`);
    this.commonOrgService.currentPageAdder('zip-code-list');
    this.selectedListName = this.router.getCurrentNavigation()?.extras?.state?.fileName;
    if (!this.selectedListName) {
      this.redirectToZipcodeUpload();
    }
  }


  ngOnInit(): void {
    this.zipCodeDtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      ordering: true,
      order: [1, "asc"],
      searching: true,
      dom: 'tipr',
      retrieve: true,
      processing: true,
      columnDefs: [
        { targets: [0, 3, 4, 5], orderable: false },
      ],
      drawCallback: (settings) => {
        this.Table = $("#example").DataTable()
        this.info = this.Table.page.info();
        this.newArray = this.Table["context"][0]["aiDisplay"]
        this.table(settings)
      }
    }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        this.getZipcodeEntryList();
        this.setTableOptions('language');
      }
    );

    this.getZipcodeEntryList();
    this.tableLanguageOptions();

  }

  table(settings) {
    this.allChecked = false;
    this.listIds = []
    for (let i = 0; i < settings.aoData.length; i++) {
      this.zipCodeDetailLists[i]["checked"] = false
    }
    this.deleteSelectionButtonShow = false;
    this.deleteZipcodeZipPlusfour = [];
  }

  delModalOpen(modal?) {
    this.closeAlert();
    this.dialogService.open(this.deleteZipcodeFilterList, { backdrop: 'static', keyboard: false, centered: true, windowClass: 'admin-custom-delete-modal' });
    this.zipcodeName = modal;
  }

  modalOpen(modal?) {
    this.closeAlert();
    this.dialogService.open(this.editZipcodeFilterName, { backdrop: 'static', keyboard: false, centered: true, windowClass: 'admin-default-modal' });
    this.zipcodeName = modal;
    this.zipcodeUpdatedName = modal;
    this.saveButtonShow = false;
    this.zipcodeNameError = false;
    this.zipcodePlusError = false
  }

  addZipcodeToList() {
    this.closeAlert();
    this.dialogService.open(this.addZipModal, { backdrop: 'static', keyboard: false, centered: true, windowClass: 'admin-modal-upload' });
    this.addZipcode = '';
    this.addZipPlusfour = '';
    this.hasServiceCheck = false;
    this.saveButtonShow = false;
    this.zipcodeNameError = false;
    this.zipcodePlusError = false
  }

  searchName(searchText) {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(searchText).draw();
    });
    this.closeAlert()
  }

  clearText() {
    this.searchText = "";
    this.searchName(this.searchText);
  }

  deleteEntryListZipcode(id?) {
    let arr = id ? [id] : this.listIds
    this.dialogService.open(this.delteZipcodes, { backdrop: 'static', keyboard: false, centered: true, windowClass: 'admin-modal-upload' });
    this.deleteZipcodeZipPlusfour = this.zipCodeDetailLists.filter((x) => {
      return arr.indexOf(x['id']) !== -1
    })

  }

  selectAll(isChecked) {
    this.listIds = []
    this.allChecked = isChecked
    this.deleteSelectionButtonShow = isChecked;
    let arr = this.newArray.slice(this.info.start, this.info.end);

    arr.forEach((i) => {
      this.zipCodeDetailLists[i]["checked"] = isChecked;
    })
    if (isChecked) {
      this.zipCodeDetailLists.map((x) => {
        if (x.checked) { this.listIds.push(x.id) }
      })
    }
    else {
      this.listIds = []
    }

  }

  selectedOne(isChecked, index) {
    this.listIds = []
    let lengthTableValue = this.info.end - this.info.start
    this.zipCodeDetailLists[index]["checked"] = isChecked;
    this.zipCodeDetailLists.filter((x) => {
      if (x["checked"] == true) {
        this.listIds.push(x.id)
      }
    })
    let isAllChecked = this.listIds.length == lengthTableValue
    if (isAllChecked) {
      this.allChecked = true;
    }
    else {
      this.allChecked = false;
    }
    if (this.listIds.length > 0) {
      this.deleteSelectionButtonShow = true;
    } else {
      this.deleteSelectionButtonShow = false;
    }
  }

  getZipcodeEntryList() {
    this.loading = true;
    this.zipcodeService.zipCodeEntryList(encodeURIComponent(this.selectedListName)).subscribe((res: any) => {
      this.zipcodeListArrayResultError = false;
      if (this.isRerender) {
        this.rerender()
        if (res) {
          this.zipcodeListArrayResultError = false
          this.zipCodeDetailLists = res;
          this.isRerender = true;
          this.dtTrigger.next();
        }
      }
      else {
        this.isRerender = true;
        this.dtTrigger.next();
        if (res) {
          this.zipcodeListArrayResultError = false
          this.zipCodeDetailLists = res;
        }
      }

      this.dtTrigger.next();
      this.loading = false;
      if (this.searchText) {
        this.searchName(this.searchText)
      }
      if (res && res.length == 0 && this.zipCodeDetailLists.length == 0) {
        this.zipcodeListArrayResultError = true
        this.redirectToZipcodeUpload()
      }

    }, (error: HttpErrorResponse) => {
      this.zipcodeListArrayResultError = true;
      this.dtTrigger.next();
      this.rerender()
      this.loading = false;
      this.errorShow = true;
      this.errorMessage = error.error["errorDesc"] ? error.error["errorDesc"] : this.errorHandler(error)
    })

  }

  postZipcodeToList() {
    this.closeDialogModal()
    let postZipcodeData = {
      "listName": this.selectedListName,
      "zipcode": this.addZipcode,
      "zipPlusFour": this.addZipPlusfour,
      "hasService": this.hasServiceCheck ? "Yes" : "No"
    }
    this.zipcodeService.addZipcodeEntryList(postZipcodeData).subscribe((res:any) => {
      if (res) {
        this.addZipResponse=res;
        this.closeDialogModal()
        this.getZipcodeEntryList()
      }
    }, (error: HttpErrorResponse) => {
      this.closeDialogModal()
      this.errorShow = true;
      this.errorMessage = error.error["errorDesc"] ? error.error["errorDesc"] : this.errorHandler(error)
    })

  }

  deleteEntryZipcodes() {
    this.closeDialogModal()
    let ids = this.deleteZipcodeZipPlusfour?.map((e) => { return e.id }).join()
    this.zipcodeService.deleteZipcodeEntryList(ids).subscribe((res) => {
      if (res) {
        this.deleteResponse=res;
        this.closeDialogModal()
        this.getZipcodeEntryList();
      }
      this.allChecked = false;
      this.deleteSelectionButtonShow = false;
      this.listIds = [];
    }, (error: HttpErrorResponse) => {
      this.closeDialogModal()
      this.allChecked = false;
      this.listIds = [];
      this.deleteSelectionButtonShow = false;
      this.errorShow = true;
      this.errorMessage = error.error["errorDesc"] ? error.error["errorDesc"] : this.errorHandler(error)
    })
  }

  redirectToZipcodeUpload() {
    this.router.navigate([`${this.MODULE === 'systemAdministration' ? 'systemAdministration' : 'organization-admin'}/zip-code-upload`])
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
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
      this.zipCodeDtOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'es') {
      this.zipCodeDtOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.zipCodeDtOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.zipCodeDtOptions.language) {
      delete this.zipCodeDtOptions.language;
    }
  }

  editZip(modal?) {
    this.previousValue = modal.zipcode;
    this.previousZipPlusFourValue = modal.zipPlusFour
    this.previousEntryChecked = modal.hasService == "Yes" ? true : false
    this.dialogService.open(this.editZipModal, { backdrop: 'static', keyboard: false, centered: true, windowClass: 'admin-modal-upload' });
    this.entryZipcodeId = modal.id
    this.entryZipcode = modal.zipcode
    this.entryPlusFour = modal.zipPlusFour
    this.entryHasService = modal.hasService == "Yes" ? true : false
    this.saveButtonShow = false;
    this.zipcodeNameError = false;
    this.zipcodePlusError = false
  }
  closeAlert() {
    this.requiredZipcodeNameShow = false
    this.errorShow = false
  }

  updateZipcodeName() {
    this.closeDialogModal()
    if (!this.zipcodeName) {
      this.requiredZipcodeNameShow = true
      this.requiredZipcodeName = 'ZipcodeName Required'
    }
    let editedData = {
      "listName": this.zipcodeUpdatedName,
      "newListName": this.zipcodeName
    }
    this.zipcodeService.modifyZipcode(editedData).subscribe((res:any) => {
      if (res) {
        this.updateZipNameResponse=res
        this.selectedListName = this.zipcodeName;
        this.getZipcodeEntryList();
        this.closeDialogModal()
      }
    }, (error: HttpErrorResponse) => {
      this.closeDialogModal()
      this.errorShow = true;
      this.errorMessage = error.error["errorDesc"] ? error.error["errorDesc"] : this.errorHandler(error)
    })

  }

  deleteZipcodeName() {
    this.closeDialogModal()
    this.zipcodeService.removeZipcode(this.zipcodeName).subscribe((res) => {
      if (res) {
        this.closeDialogModal()
        this.redirectToZipcodeUpload()
      }
    }, (error: HttpErrorResponse) => {
      this.closeDialogModal()
      this.errorShow = true;
      this.errorMessage = error.error["errorDesc"] ? error.error["errorDesc"] : this.errorHandler(error)
    })
  }

  updatedEntryZipcode() {
    this.closeDialogModal()
    let entryUpdateZipcodeData = {
      "id": this.entryZipcodeId,
      "zipcode": this.entryZipcode,
      "zipPlusFour": this.entryPlusFour,
      "hasService": this.entryHasService ? "Yes" : "No"
    }
    this.zipcodeService.editZipcodeEntryList(entryUpdateZipcodeData).subscribe((res) => {
      if (res) {
        this.updateEntryZipResponse=res;
        this.closeDialogModal()
        this.getZipcodeEntryList()
      }
    }, (error: HttpErrorResponse) => {
      this.closeDialogModal()
      this.errorShow = true;
      this.errorMessage = error.error["errorDesc"] ? error.error["errorDesc"] : this.errorHandler(error)
    })
  }


  closeDialogModal() {
    this.dialogService.dismissAll();
  }



  onChangeEditZipcode(event) {
    this.zipcodeNameError = false;
    if (/^[0-9]+$/gm.test(event) && event.length == 5 && !this.zipcodePlusError && event != this.previousValue) {
      this.saveButtonShow = true;
    } else {
      if ((this.entryZipcode && !(/^[0-9]+$/gm.test(event)) && !this.zipcodePlusError) || (this.entryZipcode.length < 5 && this.entryZipcode.length)) {
        this.zipcodeNameError = true;
      }
      this.saveButtonShow = false;
    }
    if (event == this.previousValue && ((this.entryPlusFour ? this.entryPlusFour : null) == this.previousZipPlusFourValue)) {
      this.saveButtonShow = false;
    }
    else if (this.zipcodeNameError || this.zipcodePlusError) {
      this.saveButtonShow = false;
    }
    else {
      this.saveButtonShow = true;
    }
  }

  onChangeEditZipPlusFour(event) {
    this.zipcodePlusError = false;
    if (event.length && /^[0-9]+$/gm.test(event) && event.length == 4 && this.entryZipcode && !this.zipcodeNameError) {
      this.saveButtonShow = true;
    } else {
      if ((!(/^[0-9]+$/gm.test(event)) && event.length) || (this.entryPlusFour.length < 4 && this.entryPlusFour.length)) {
        this.zipcodePlusError = true;
      }
      this.saveButtonShow = false;
    }
    if (this.entryPlusFour.length == 0 && this.previousZipPlusFourValue != null) {
      this.saveButtonShow = true;
    }
    if (((event ? event : null) == this.previousZipPlusFourValue) && this.entryHasService == this.previousEntryChecked && this.entryZipcode == this.previousValue) {
      this.saveButtonShow = false;
    }
    else if (this.zipcodePlusError || this.zipcodeNameError) {
      this.saveButtonShow = false
    }
    else if ((!(/^[0-9]+$/gm.test(this.entryZipcode)))) {
      this.saveButtonShow = false;
      this.zipcodeNameError = true;
    } else {
      this.saveButtonShow = true;
    }
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

  onChangeAddZipcode(event) {
    this.zipcodeNameError = false;
    if (/^[0-9]+$/gm.test(event) && event.length == 5 && !this.zipcodePlusError) {
      this.saveButtonShow = true;
    } else {
      if ((this.addZipcode && !(/^[0-9]+$/gm.test(event)) && !this.zipcodePlusError) || (this.addZipcode.length < 5 && this.addZipcode.length)) {
        this.zipcodeNameError = true;
      }
      this.saveButtonShow = false;
    }

  }

  onChangeAddZipPlusFour(event) {
    this.zipcodePlusError = false;
    if (event.length && /^[0-9]+$/gm.test(event) && event.length == 4 && this.addZipcode && !this.zipcodeNameError) {
      this.saveButtonShow = true;
    } else {
      if ((!(/^[0-9]+$/gm.test(event)) && event.length) || (this.addZipPlusfour.length < 4 && this.addZipPlusfour.length)) {
        this.zipcodePlusError = true;
      }
      this.saveButtonShow = false;
    }
    if (this.addZipPlusfour.length == 0) {
      this.saveButtonShow = true;
      this.onChangeAddZipcode(this.addZipcode)
    }
  }

  hasServiceChange(event) {
    if (this.entryZipcode == this.previousValue && ((this.entryPlusFour ? this.entryPlusFour : null) == this.previousZipPlusFourValue) && event == this.previousEntryChecked) {
      this.saveButtonShow = false;
    }
    else if (!this.zipcodeNameError && !this.zipcodePlusError && this.entryZipcode.length == 5) {
      this.saveButtonShow = true;
    }
    else {
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
