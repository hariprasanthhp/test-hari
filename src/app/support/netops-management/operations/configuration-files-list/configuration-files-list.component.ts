import { requestType } from './../model/files-list.model';
import { FilesListModel } from './../model/files-list.model';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { FileService } from '../services/files.service';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { getConfigFileList } from '../services/endpoint';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { isThisTypeNode } from 'typescript';


@Component({
  selector: 'app-configuration-files-list',
  templateUrl: './configuration-files-list.component.html',
  styleUrls: ['./configuration-files-list.component.scss'],
  //providers: [FileService, SsoAuthService]
})
export class ConfigurationFilesListComponent implements OnInit {
  @ViewChild('deleteConfiguratioModal', { static: true }) private deleteConfiguratioModal: TemplateRef<any>;
  language: any;
  languageSubject;
  orgId: string;
  filesListObj: FilesListModel[] = [];
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  tableOptions: DataTables.Settings = {}
  public errorMsg: string;
  public showError: boolean = false;
  public showSuccess: boolean = false;
  public successMsg: string;
  count: number;
  dtRendered: boolean = false;
  modalRef: any;
  modalTitle: string;
  modalInfo: string;
  deleteData: FilesListModel;
  loading: boolean = false;
  hasWriteAccess: boolean = false;
  scopes: string;
  tableCounts;
  frTable: DataTables.LanguageSettings;
  hasScopeAccess = false;
  constructor(private translateService: TranslateService, private http: HttpClient,
    public ssoAuthService: SsoAuthService,
    private fileService: FileService, private dialogService: NgbModal,
    private titleService: Title,

    private router: Router,) {
    this.orgId = this.ssoAuthService.getOrgId();
    this.getConfigFilesListCout();
    this.scopes = this.ssoAuthService.getScopes();
    // this.titleService.setTitle('Cloud Calix - Operations - Operations - Subscriber Operations - Operations - Configuration File');
  }
  setTitle(url) {
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco/operations/configuration')) {
      this.titleService.setTitle(`${this.language['Config_Files']} - ${this.language['Operations']} - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    } else if (this.router.url.includes('cco/operations/configuration')) {
      this.titleService.setTitle(`${this.language['Config_Files']} - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {
    // this.titleService.setTitle('Cloud Calix - Support - Netops - Operations - Configuration Files');
    // this.titleService.setTitle('Calix Cloud - Configuration Files');
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.redraw();
      this.setTitle(this.router.url)
    });
    this.setTitle(this.router.url)
    if (!this.router.url.includes('cco/operations/configuration')) {
      if (environment.VALIDATE_SCOPE) {
        this.scopes['cloud.rbac.csc.netops.operations.config_files'] = this.scopes['cloud.rbac.csc.netops.operations.config_files'] ? this.scopes['cloud.rbac.csc.netops.operations.config_files'] : [];
        if (this.scopes['cloud.rbac.csc.netops.operations.config_files'].length) {
          this.hasScopeAccess = true;
        }
        if (this.scopes && (this.scopes['cloud.rbac.csc.netops.operations.config_files'] && this.scopes['cloud.rbac.csc.netops.operations.config_files'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasScopeAccess = true;
        this.hasWriteAccess = true;
      }
    } else {
      if (environment.VALIDATE_SCOPE) {
        if (this.scopes?.['cloud.rbac.coc.operations.configuration.configurationfiles']?.length) {
          this.hasScopeAccess = true;
        }
        if (this.scopes && (this.scopes['cloud.rbac.coc.operations.configuration.configurationfiles']?.includes('write'))) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasScopeAccess = true;
        this.hasWriteAccess = true;
      }
    }

    if (!this.hasScopeAccess) {
      this.ssoAuthService.setPageAccess(false);
      return;
    }

    this.frTable = this.translateService.fr;

    this.fetchConfigurationList();
  }

  // tableLanguageOptions() {
  //   if (localStorage.getItem('defaultLanguage') && localStorage.getItem('defaultLanguage') == 'fr') {
  //     this.tableOptions.language = this.frTable;
  //   } else if (localStorage.getItem('defaultLanguage') && localStorage.getItem('defaultLanguage') == 'en' && this.tableOptions.language) {
  //     delete this.tableOptions.language;
  //   }
  // }

  fetchConfigurationList() {
    this.loading = true;
    const that = this;
    this.tableOptions = {

      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: true,
      processing: false,
      ordering: false,
      dom: "tip",
      responsive: true,
      ajax: (dataTablesParameters: any, callback) => {
        const params: HttpParams = new HttpParams()
          .set("skip", dataTablesParameters.start)
          .set("limit", dataTablesParameters.length)
          .set("type", requestType.Configuration_File)
        if (this.ssoAuthService.getOrg(this.orgId)) {
          params.set("orgId", this.orgId)
        };
        that.http.get(getConfigFileList, { params }).subscribe((resp: FilesListModel[]) => {
          that.filesListObj = resp;
          this.loading = false;
          callback({
            recordsTotal: this.count,
            recordsFiltered: this.count,
            data: []
          });
        }, error => {
          this.loading = false;
          this.errorMsg = error.error.error;
          this.showError = true;
          if (error.status === 500) {
            this.errorMsg = 'Internal Server Error';
          }
        })

      },
      drawCallback: (settings) => {
        this.changeTableStatusLanguage(settings);
        let total = settings._iRecordsDisplay; // for server side rendering
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
        } else {
          //$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
        }
      }
    };
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
      `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` : isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` : isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered}` :
        `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
    );
    //$(".dataTables_filter label")[0].childNodes[0].nodeValue = isFrench ? 'Chercher:' : 'Search:';
    //$(".dataTables_length label")[0].childNodes[0].nodeValue = isFrench ? 'Afficher les ' : 'Show ';
    //$(".dataTables_length label")[0].childNodes[2].nodeValue = isFrench ? ' entrées' : ' entries';
    $(".first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Erste Seite' : 'First');
    $(".previous").text(isFrench ? 'Précédent' : isSpanish ? 'Anterior' : isGermen ? 'Zurück' : 'Previous');
    $(".next").text(isFrench ? 'Suivant' : isSpanish ? 'Siguiente' : isGermen ? 'Weiter' : 'Next');
    $(".last").text(isFrench ? 'Dernière' : isSpanish ? 'Último' : isGermen ? 'Letzte' : 'Last');
  }



  getConfigFilesListCout() {
    this.fileService.getConfigFilesCount(this.orgId).subscribe(res => {
      this.count = res.count;
      this.dtRendered = true;
    })
  }

  deleteConfigFileConfirm(data: FilesListModel) {
    this.loading = false;
    this.errorMsg = "";
    this.showError = false;
    this.deleteData = data;
    this.modalTitle = 'Warning!';
    this.modalInfo = ` ${data.name}?`;
    $("html, body").animate({ scrollTop: 0 }, "slow");
    // document.body.scrollIntoView();
    // this.closeModal();
    // this.modalRef = this.dialogService.open(this.deleteConfiguratioModal);

  }
  deleteConfigFile() {
    // this.closeModal();
    this.loading = true;
    this.fileService.deleteConfigFileById(this.deleteData._id).subscribe(res => {
      this.loading = false;
      this.showSuccess = true;
      this.successMsg = this.language['successfully Deleted!!'];
      this.getConfigFilesListCout();
      this.deleteData = new FilesListModel();
      this.redraw();
    }, err => {

      this.loading = false;
      this.deleteData = new FilesListModel();
      this.errorMsg = "Error! " + err.error.error;
      this.showError = true;
    }
    )
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

  gotoAdd() {
    if (window.location.href?.indexOf('/cco/operations/configuration/configuration-files-list') !== -1) {
      this.router.navigate(['./cco/operations/configuration/configuration-files-form']);
      return;
    }
    this.ssoAuthService.redirectByUrl([
      '/support/netops-management/operations/configuration-files-form',
      '/cco/operations/cco-system-operations/configuration-files/configuration-files-form', '',
      '/cco/operations/configuration/configuration-files-form'
    ])
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }


  // For Unit test case 
  getConfigurationFileList() {
    const params: HttpParams = new HttpParams()
      .set("orgId", this.orgId)
      .set("skip", 0)
      .set("limit", 10)
      .set("type", requestType.Configuration_File);
    this.fileService.getConfigurationFileList(getConfigFileList, { params }).subscribe((resp: FilesListModel[]) => {
      this.filesListObj = resp;
    })
  }
}
