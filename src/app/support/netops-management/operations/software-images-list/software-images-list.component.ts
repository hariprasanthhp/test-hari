import { FilesListModel } from './../model/files-list.model';
import { FileService } from './../services/files.service';
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { AcessModifiers, SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { requestType } from '../model/files-list.model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { getSwFileList } from '../services/endpoint';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { parse } from 'path';

@Component({
  selector: 'app-software-images-list',
  templateUrl: './software-images-list.component.html',
  styleUrls: ['./software-images-list.component.scss'],
  //providers: [SsoAuthService, FileService]
})
export class SoftwareImagesListComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('deleteSoftareImageModal', { static: true }) private deleteSoftareImageModal: TemplateRef<any>;
  dtInstance: Promise<DataTables.Api>;
  language: any;
  languageSubject;
  orgId: string;
  count: number;
  tableOptions: DataTables.Settings = {}
  tableCounts;
  Table: DataTables.Api;
  datatableVisible: boolean = false;
  public errorMsg: string;
  public showError: boolean = false;
  public showSuccess: boolean = false;
  public successMsg: string;
  modalRef: any;
  softwareImageObj: FilesListModel[] = [];
  modalTitle: string;
  modalInfo: string;
  deleteData: FilesListModel;
  loading: boolean = false;
  hasWriteAccess: boolean = false;
  scopes: string;
  swConfrmMsg: any;
  softwareImageOfficial: boolean;
  officialImageId: FilesListModel;
  isFoundation: boolean;
  officalSubs: any;
  unOfficalSubs: any;
  hasScopeAccess = false;
  filterImages: any;

  listIds = [];
  zipCodeDetailLists: any;
  allChecked: boolean = false;
  deleteSelectionButtonShow: boolean = false;
  deleteZipcodeZipPlusfour: any;
  newArray: any = [];
  info: DataTables.PageMethodeModelInfoReturn;
  releaseValue:any = 2;
  emptyReleaseValue: boolean = false;
  releaseValue1:any = 2;
  emptyReleaseValue1: boolean = false;
  softwareVersion: any;
  warningInfo: string;
  warning: boolean = false;
  softwareLoading: boolean;
  errorVersionPost: boolean = false;
  showOutageAlert: boolean = true;
  constructor(
    private translateService: TranslateService,
    public ssoAuthService: SsoAuthService,
    private http: HttpClient,
    private fileService: FileService,
    private dialogService: NgbModal,
    private commonOrgService: CommonService,
    public router: Router, private titleService: Title,
    private modalService: NgbModal,
  ) {
    let url = this.router.url;
    if (url.indexOf('/cco-foundation') > -1) {
      this.isFoundation = true;
    } else if (url.indexOf('/cco/operations/configuration') > -1) {
      this.isFoundation = true;
    } else this.isFoundation = false;
    this.orgId = ssoAuthService.getOrgId();
    this.getSwImagesListCout();
    this.scopes = this.ssoAuthService.getScopes();
  }
  setTitle(url) {
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('/cco/operations/configuration')) {
      this.titleService.setTitle(`${this.language['Software Images']} - ${this.language['Operations']}  - ${this.language['NetOps']}  - ${this.language['Service']}  - ${this.language['Calix Cloud']}`);
    } else if (this.router.url.includes('/cco/operations/configuration')) {
      this.titleService.setTitle(`${this.language['Software Images']} - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else {
      this.titleService.setTitle(`${this.language['Software Images']} - ${this.language['Workflow Prerequisites']} - ${this.language['configuration']}  - ${this.language['Deployment']}  - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {

    // this.titleService.setTitle('Calix Cloud - Operations - Software Images');
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.redraw();
      this.setTitle(this.router.url);
    });
    this.setTitle(this.router.url);

    if (this.router.url.includes('cco/operations/configuration/software') || 
    this.router.url.includes('/cco-foundation/foundation-configuration/configuration-prerequisites/software-images-list')){
      this.showOutageAlert = false
    }

    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco/operations/configuration/software')) {
      if (environment.VALIDATE_SCOPE) {
        this.scopes['cloud.rbac.csc.netops.operations.sw_images'] = this.scopes['cloud.rbac.csc.netops.operations.sw_images'] ? this.scopes['cloud.rbac.csc.netops.operations.sw_images'] : [];
        if (this.scopes['cloud.rbac.csc.netops.operations.sw_images'].length) {
          this.hasScopeAccess = true;
        }
        if (this.scopes && (this.scopes['cloud.rbac.csc.netops.operations.sw_images'] && this.scopes['cloud.rbac.csc.netops.operations.sw_images'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    } else if (this.router.url.includes('cco/operations/configuration/software')) {
      if (environment.VALIDATE_SCOPE) {
        if (this.scopes['cloud.rbac.coc.operations.configuration.softwareimages']?.length) {
          this.hasScopeAccess = true;
        }
        if (this.scopes && (this.scopes['cloud.rbac.coc.operations.configuration.softwareimages']?.includes('write'))) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    } else {
      if (environment.VALIDATE_SCOPE) {
        let scopes = this.scopes;
        scopes['cloud.rbac.foundation.configurations'] = scopes['cloud.rbac.foundation.configurations'] ? scopes['cloud.rbac.foundation.configurations'] : [];
        if (this.scopes['cloud.rbac.foundation.configurations'].length) {
          this.hasScopeAccess = true;
        }
        if (scopes && (scopes['cloud.rbac.foundation.configurations'].includes('write'))) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    }

    if (!this.hasScopeAccess) {
      this.ssoAuthService.setPageAccess(false);
      return;
    }

    this.fetchSoftwareImageList();
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorMsg = this.language['Access Denied'];
    } else {
      this.errorMsg = this.ssoAuthService.pageErrorHandle(err);
    }
    if (err.status === 503) {
      this.errorMsg = "Service Temporarily Unavailable"
    }
    // this.closeAlert();
    this.showError = true;
  }


  getSwImagesListCout() {
    this.fileService.getSwFilesCount(this.orgId).subscribe(res => {
      this.count = res.count;
      this.datatableVisible = true;
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
    })
  }

  fetchSoftwareImageList() {
    this.loading = true;
    const that = this;
    this.tableOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: true,
      processing: false,
      ordering: true,
      columnDefs: [{ targets: [0], orderable: false }, { targets: [-2], orderable: false }, { targets: [-1], orderable: false }],
      dom: "tip",
      responsive: true,
      order: [],
      columns: [
        { name: 'name', orderable: true },
        { name: 'model', orderable: true },
        { name: 'description', orderable: true },
        { name: 'version', orderable: true },
        { name: 'size', orderable: true }
      ],
      ajax: (dataTablesParameters: any, callback) => {
        let sortObj = {};
        if (dataTablesParameters.order[0]) {
          let dir = dataTablesParameters.order[0].dir;
          let column = dataTablesParameters.order[0].column;
          let columnName = dataTablesParameters.columns[column]?.name;
          if (columnName) {
            sortObj[columnName] = dir == 'asc' ? 1 : -1;
          }
        } else {
          sortObj['name'] = 1;
        }

        let inputParams = {
          orgId: this.orgId,
          skip: dataTablesParameters.start,
          limit: dataTablesParameters.length,
          type: requestType.SW_FW_Image,
          orderby: sortObj
        }
        const params: HttpParams = new HttpParams()
          .set("skip", dataTablesParameters.start)
          .set("limit", dataTablesParameters.length)
          .set("type", requestType.SW_FW_Image)
          .set("orderby", JSON.stringify(inputParams.orderby));
        if (this.ssoAuthService.getOrg(this.orgId)) {
          params.set("orgId", this.orgId)
        }
        that.http.get(getSwFileList, { params }).subscribe((resp: FilesListModel[]) => {
          sessionStorage.setItem('swi', JSON.stringify(resp));
          that.softwareImageObj = resp;
          that.zipCodeDetailLists = resp;
          this.loading = false;
          callback({
            recordsTotal: this.count,
            recordsFiltered: this.count,
            data: []
          });
        }), error => {
          this.loading = false;
          this.errorMsg = error.error.error;
          this.showError = true;
        }
      }, drawCallback: (settings) => {
        this.changeTableStatusLanguage(settings);
        let total = settings._iRecordsDisplay; // for server side rendering
        let length = settings._iDisplayLength;
        this.Table = $("#software-images-table").DataTable()
        this.info = this.Table.page.info();
        this.newArray = this.Table["context"][0]["aiDisplay"]
        this.table(settings)
        if (total <= length) {
          $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
        } else {
          //$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
        }
      },
    };

    if (this.isFoundation) {
      this.tableOptions.columns.push({ name: 'supported', orderable: true });
      this.tableOptions.order[0] = [0, 'asc'];
      if (this.hasWriteAccess) {
        this.tableOptions.columns.unshift({ name: 'official status', orderable: false });
        this.tableOptions.order[0] = [1, 'asc'];
      }
    } else {
      this.tableOptions.order[0] = [0, 'asc'];
    }
  }
  changeTableStatusLanguage(dtObj) {
    const nf = new Intl.NumberFormat();
    this.tableCounts = {
      searchText: dtObj.oPreviousSearch.sSearch.replace(/\s+/g, ""),
      total: dtObj._iRecordsTotal,
      displayCount: dtObj._iDisplayLength,
      displayed: dtObj._iRecordsDisplay,
      start: dtObj._iDisplayStart
    };
    const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr');
    const isSpanish = (sessionStorage.getItem('defaultLanguage') == 'es');
    const isGermen = (sessionStorage.getItem('defaultLanguage') == 'de_DE');
    const filtered = `${dtObj.oPreviousSearch.sSearch.replace(/\s+/g, "") ?
      (isFrench ?
        `(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` : isSpanish ? `(filtrado de un total de ${nf.format(dtObj._iRecordsTotal)} entradas)` :
          isGermen ? `(gefiltert aus ${nf.format(dtObj._iRecordsTotal)} Einträgen)` :
            `(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
      ''}`;
    const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
    const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
    $('div [role="status"]').text(isFrench ?
      `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` :
      isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` :
        isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered}` :
          `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
    );
    //$(".dataTables_filter label")[0].childNodes[0].nodeValue = isFrench ? 'Chercher:' : 'Search:';
    //$(".dataTables_length label")[0].childNodes[0].nodeValue = isFrench ? 'Afficher les ' : 'Show ';
    //$(".dataTables_length label")[0].childNodes[2].nodeValue = isFrench ? ' entrées' : ' entries';
    $(".first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Erste Seite' : 'First');
    $(".previous").text(isFrench ? 'Précédent' : isSpanish ? 'Anterior' : isGermen ? 'Letzte' : 'Previous');
    $(".next").text(isFrench ? 'Suivant' : isSpanish ? 'Siguiente' : isGermen ? 'Weiter' : 'Next');
    $(".last").text(isFrench ? 'Dernière' : isSpanish ? 'Último' : isGermen ? 'Zurück' : 'Last');
  }
  // changeTableStatusLanguage(dtObj) {
  //   const nf = new Intl.NumberFormat();
  //   this.tableCounts = {
  //     searchText: dtObj.oPreviousSearch.sSearch.trim(),
  //     total: dtObj._iRecordsTotal,
  //     displayCount: dtObj._iDisplayLength,
  //     displayed: dtObj._iRecordsDisplay,
  //     start: dtObj._iDisplayStart
  //   };
  //   const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr'),
  //     filtered = `${dtObj.oPreviousSearch.sSearch.trim() ?
  //       (isFrench ?
  //         `(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` :
  //         `(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
  //       ''}`;
  //   const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
  //   const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
  //   $('div [role="status"]').text(isFrench ?
  //     `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` :
  //     `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
  //   )
  //   $(".first").text(isFrench ? 'Le début' : 'First');
  //   $(".previous").text(isFrench ? 'Précédent' : 'Previous');
  //   $(".next").text(isFrench ? 'Suivant' : 'Next');
  //   $(".last").text(isFrench ? 'Dernière' : 'Last');
  // }



  deleteSoftwareFileConfirm(data: FilesListModel) {
    this.loading = false;
    this.errorMsg = null;
    this.showError = false;
    this.deleteData = data;
    this.modalTitle = 'Delete Software Image';
    this.modalInfo = `the software image ${data.name}?`
    $("html, body").animate({ scrollTop: 0 }, "slow");
    //this.closeModal();
    //this.modalRef = this.dialogService.open(this.deleteSoftareImageModal);

  }
  deleteSoftwareFile() {
    //this.closeModal();
    this.loading = true;
    this.fileService.deleteSwFileById(this.deleteData._id).subscribe(res => {
      this.loading = false;
      this.showSuccess = true;
      this.successMsg = "Successfully Deleted!"
      this.getSwImagesListCout();
      this.deleteData = new FilesListModel();
      this.redraw();
    }, err => {

      this.loading = false;
      this.deleteData = new FilesListModel();
      this.errorMsg = err.error.error;
      this.showError = true;
    })
  }


  redraw() {
    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }


  closeModal(): void {
    this.deleteData = new FilesListModel();
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  hideError() {
    this.showError = false;
    this.errorMsg = '';
  }
  hideSuccess() {
    this.showSuccess = false;
    this.successMsg = '';
  }
  uniqueimagename: any;
  uniqueimageoldname: any;
  onSoftwareChange(event: FilesListModel) {


    $("html, body").animate({ scrollTop: 0 }, "slow");
    JSON.parse(sessionStorage.getItem('swi')).forEach(res => {
      if (res._id == event._id) {
        if (res.isOfficialImage) {
          this.swConfrmMsg = this.language.Make_SW_UnOfficial
        } else {
          let resVersionFilter = [];
          JSON.parse(sessionStorage.getItem('swi')).forEach(res1 => {
            if (res1.isOfficialImage) {
              event.models.filter(obj =>
                (res1.models.indexOf(obj) !== -1) ? resVersionFilter.push(res1.name) : ''
              )

            }
          })

          var unique = resVersionFilter.filter((v, i, a) => a.indexOf(v) === i);
          this.uniqueimagename = resVersionFilter.filter((v, i, a) => a.indexOf(v) === i);
          this.uniqueimageoldname = event?.name

          if (unique.length == 0) {
            this.swConfrmMsg = this.language.Make_SW_Official;

          } else {
            this.swConfrmMsg = this.language.SoftwareImagesWarrningMsg(this.uniqueimagename, this.uniqueimageoldname);
            // this.language.SoftwareImagesWarrningMsg(this.uniqueimagename, this.uniqueimageoldname)

          }
        }
      }
    })

    this.softwareImageOfficial = true;
    this.officialImageId = event;
  }


  swOfficialConfirmation() {
    this.softwareImageOfficial = false;
    let model = {
      imageId: this.officialImageId._id
    }
    if (!this.officialImageId.isOfficialImage) {
      this.unOfficalSubs = this.fileService.makeUnOfficialImge(this.orgId, this.officialImageId._id).subscribe(res => {
        this.officialImageId = new FilesListModel();
        this.getSwImagesListCout();
        this.redraw()
      }, error => {
        this.loading = false;
        this.errorMsg = error.error.error;

        this.showError = true;
      })
    } else {
      this.officalSubs = this.fileService.makeOfficialImage(model).subscribe(res => {
        this.officialImageId = new FilesListModel();
        this.getSwImagesListCout();
        this.redraw()
      }, error => {
        this.loading = false;
        this.errorMsg = error.error.error;

        this.showError = true;
      })
    }
  }

  closeswOfficialConfirmation() {
    this.softwareImageOfficial = false;
    this.getSwImagesListCout();
    this.redraw()
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
    if (this.officalSubs) this.officalSubs.unsubscribe();
    if (this.unOfficalSubs) this.unOfficalSubs.unsubscribe();
  }
  opendeleteSIModal(modal) {
    this.dialogService.open(modal, {
      centered: true,
      windowClass: 'alert-delete-warning-modal',
    });
  }


  selectAll(isChecked) {
    this.listIds = []
    this.allChecked = isChecked
    this.deleteSelectionButtonShow = isChecked;
    let arr = this.newArray.slice(this.info.start, this.info.end);
    for (let i = 0; i < this.zipCodeDetailLists.length; i++) {
      this.zipCodeDetailLists[i]["checked"] = isChecked
    }
    if (isChecked) {
      this.zipCodeDetailLists.map((x) => {
        if (x.checked) {
          this.listIds.push(x._id)
          //this.deleteZipcodeZipPlusfour.push(x)
        }
      })
    }
    else {
      this.listIds = []
    }

  }
  table(settings) {
    this.allChecked = false;
    this.listIds = []
    for (let i = 0; i < this.zipCodeDetailLists.length; i++) {
      this.zipCodeDetailLists[i]["checked"] = false
    }
    this.deleteSelectionButtonShow = false;
    this.deleteZipcodeZipPlusfour = [];
  }

  selectedOne(isChecked, index) {
    this.listIds = []
    let lengthTableValue = this.info.end - this.info.start
    this.zipCodeDetailLists[index]["checked"] = isChecked;
    this.zipCodeDetailLists.filter((x) => {
      if (x["checked"] == true) {
        this.listIds.push(x._id)
        // this.deleteZipcodeZipPlusfour.push(x)

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
  deleteEntryListZipcode(deleteSoftwareImages) {
    let arr = this.listIds
    this.dialogService.open(deleteSoftwareImages, {
      centered: true,
      windowClass: 'alert-delete-warning-modal',
    });
    /* this.dialogService.open(this.delteZipcodes, { backdrop: 'static', keyboard: false, centered: true, windowClass: 'admin-modal-upload' });*/
    this.deleteZipcodeZipPlusfour = this.zipCodeDetailLists.filter((x) => {
      return arr.indexOf(x['_id']) !== -1
    })

  }


  deleteEntryZipcodes() {
    //this.closeDialogModal()
    let ids = this.deleteZipcodeZipPlusfour.map((e) => { return e.id }).join()
    /*this.zipcodeService.deleteZipcodeEntryList(ids).subscribe((res) => {
       if (res) {
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
     })*/
  }

  gotoAdd() {
    if (window.location.href?.indexOf('/cco/operations/configuration/software/software-images-list') !== -1) {
      this.router.navigate(['/cco/operations/configuration/software/software-images-form']);
      return;
    }

    this.ssoAuthService.redirectByUrl([
      '/support/netops-management/software-images-form',
      '/cco/software-image/software-images-form',
      '/cco-foundation/foundation-configuration/software-images-list/software-images-form',
      '/cco/operations/configuration/software/software-images-form'

    ]);
  }
  openOutdatedImageAlert(modal){
    this.errorVersionPost = false;
    this.modalService.open(modal,{size: 'lg',centered: true,  windowClass: 'clx-default-modal',backdrop : 'static',
    keyboard : false
    });
    this.emptyReleaseValue = false;
    this.emptyReleaseValue1 = false;
    this.softwareLoading = true;
    this.fileService.getSoftwareImageversion().subscribe((res:any)=>{
      this.softwareVersion = res;
      this.releaseValue = this.softwareVersion.GSThreshold;
      this.releaseValue1 = this.softwareVersion.GCThreshold;
      this.softwareLoading = false;
    },err=>{
      if(err.error.error){
        this.errorVersionPost = true;
        this.releaseValue = 2;
        this.releaseValue1 = 2;
      }
      this.softwareLoading = false;

    })
  }

  closeOutageModal(){
    this.warning = false;
    this.dialogService.dismissAll();
  }

  saveAlert() {

    if (this.releaseValue == "") {
      this.warning = false;
      this.emptyReleaseValue = true;
    }
    else if(this.releaseValue != "")
    {
      this.emptyReleaseValue = false;
    }
    if (this.releaseValue1 == "") {
      this.warning = false;
      this.emptyReleaseValue1 = true;
    }
    else if(this.releaseValue1 != "")
    {
      this.emptyReleaseValue1 = false;
    }
    
let value =  parseFloat(this.releaseValue);
let value1 = parseFloat(this.releaseValue1);


if(typeof value === 'number' && !Number.isNaN(value) && !Number.isInteger(value))
{
  this.warningInfo = this.language['Software Alert should not be in Decimal']
  return this.warning = true;
}

if(typeof value1 === 'number' && !Number.isNaN(value1) && !Number.isInteger(value1))
{
  this.warningInfo = this.language['Software Alert should not be in Decimal']
  return this.warning = true;
}

    if ((this.releaseValue != "" && Number.isNaN(value)) || (this.releaseValue != "" && this.releaseValue < 1) 
    || (this.releaseValue != "" && this.releaseValue > 10 )) {
      this.warning = true;
      this.warningInfo = this.language['Please enter alert value between 1 to 10'];
      this.emptyReleaseValue = false;
    }

    if ((this.releaseValue1 != "" && Number.isNaN(value1)) || (this.releaseValue1 != "" && this.releaseValue1 < 1) 
    || (this.releaseValue1 != "" && this.releaseValue1 > 10 ))  {
      this.warning = true;
      this.warningInfo = this.language['Please enter alert value between 1 to 10'];
      this.emptyReleaseValue1 = false;
    }


    // if ((this.releaseValue != "" && this.releaseValue < 1)) {
    //   this.warning = true;
    //   this.warningInfo = this.language['Please enter alert value between 1 to 10'];
    //   this.emptyReleaseValue = false;
    // }

    // if ((this.releaseValue != "" && this.releaseValue > 10 )) {
    //   this.warning = true;
    //   this.warningInfo = this.language['Please enter alert value below or equal to 10'];
    //   this.emptyReleaseValue = false;
    // }

    // if ((this.releaseValue1 != "" && this.releaseValue1 < 1 )) {
    //   this.warning = true;
    //   this.warningInfo = this.language['Please enter alert value between 1 to 10'];
    //   this.emptyReleaseValue1 = false;
    // }

    // if ((this.releaseValue1 != "" &&  this.releaseValue1 > 10 )) {
    //   this.warning = true;
    //   this.warningInfo = this.language['Please enter alert value below or equal to 10'];
    //   this.emptyReleaseValue1 = false;
    // }



    if ((this.releaseValue >=1 && this.releaseValue <= 10) && (this.releaseValue1 >=1 && this.releaseValue1 <= 10)) {
        var rqstBody = {
          GSThreshold: `${this.releaseValue}`,
          GCThreshold: `${this.releaseValue1}`
        }
        if(this.errorVersionPost){
          this.fileService.postSoftwareImageversion(rqstBody).subscribe((res: any) => {
          })
        }
        else if(!this.errorVersionPost){
          this.fileService.putSoftwareImageversion(rqstBody).subscribe((res: any) => {
          })
        }

      this.closeOutageModal();
    }
  }
}
