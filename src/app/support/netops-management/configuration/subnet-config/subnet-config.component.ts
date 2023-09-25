import { Component, OnInit, OnDestroy, ViewChild, ElementRef, TemplateRef, AfterViewInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { ApiService } from '../../../../shared/services/api.service';
import { environment } from '../../../../../environments/environment';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AcessModifiers, SsoAuthService } from '../../../../shared/services/sso-auth.service';
import * as isCidr from 'is-cidr';
import { NgForm } from '@angular/forms';
import * as jquery from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-subnet-config',
  templateUrl: './subnet-config.component.html',
  styleUrls: ['./subnet-config.component.scss']
})

export class SubnetConfigComponent implements OnInit {

  // Initialize component variables.
  public subnetList: any[];
  public subnetValue: string;
  public selectedSubnetObj: any;
  errorMessage: any;
  countReceived: boolean = false;
  subnetDeleteModalRef: boolean = false;
  dataCount: any;
  loading: boolean;
  frTable: any;
  esTable: any;
  germanTable: any;
  modalRef: any;
  // Initialize local variables.
  public toggleSubnetConfigForm = false;
  public language: any;
  public languageSubject: Subscription;
  public dtOptions: DataTables.Settings = {};
  hasWriteAccess: boolean = false;
  tableCounts;
  validateScopeStage: boolean = false;
  // Access modifier - private.
  private httpParam: HttpParams;

  // Url Constants.
  private subnetConfigUrl = `${environment[`SUPPORT_URL`]}/netops-subnet/subnet`;

  @ViewChild('subnetNgForm') subnetNgForm: NgForm;
  @ViewChild('subnet') subnetFormControl: ElementRef;
  @ViewChild('subnetDeleteModalRef') deleteModalRef: TemplateRef<any>;
  @ViewChild('addSubnet', { static: true }) private addSubnet: TemplateRef<any>;
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('closeModal', { static: true }) private closeModal: ElementRef;
  @ViewChild('addSubnetConfigMOdal', { static: true }) private addSubnetConfigMOdal: TemplateRef<any>;
  allowSubnetConfig = true;
  hasScopeAccess = false;
  constructor(
    private translateService: TranslateService,
    private httpService: ApiService,
    public router: Router,
    private authService: SsoAuthService,
    private modalService: NgbModal,
    private titleService: Title,
    private CommonFunctionsService: CommonFunctionsService,
  ) {
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es
    this.germanTable = this.translateService.de_DE
  }
  setTitle(url) {
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco/services/configuration/subnet-configuration')) {
      this.titleService.setTitle(`${this.language['Subnet Configuration']} - ${this.language['Configurations']} - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    } else if (this.router.url.includes('cco/services/configuration/subnet-configuration')) {
      this.titleService.setTitle(`${this.language['Subnet Configuration']} - ${this.language['Configuration']} - ${this.language['Services']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else {
      this.titleService.setTitle(`${this.language['subnets']} - ${this.language['settings']} - ${this.language['configuration']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {

    // this.titleService.setTitle('Calix Cloud - Configurations - Subnet Configuration');
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.reDraw();
      this.setTitle(this.router.url);
      // this.rerender();
    });
    this.setTitle(this.router.url);
    let scopes = this.authService.getScopes();
    if (!this.router.url.includes('cco-foundation') && (!this.router.url.includes('cco/services/configuration/subnet-configuration') && !this.router.url.includes('cco/operations/configuration/workflows'))) {
      if (environment.VALIDATE_SCOPE) {
        scopes['cloud.rbac.csc.netops.config.subnet_config'] = scopes['cloud.rbac.csc.netops.config.subnet_config'] ? scopes['cloud.rbac.csc.netops.config.subnet_config'] : [];
        if (scopes['cloud.rbac.csc.netops.config.subnet_config'].length) {
          this.hasScopeAccess = true;
        }
        if (scopes && (scopes['cloud.rbac.csc.netops.config.subnet_config'] && scopes['cloud.rbac.csc.netops.config.subnet_config'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    } else if (this.router.url.includes('cco/services/configuration/subnet-configuration') || this.router.url.includes('cco/operations/configuration/workflows')) {
      if (environment.VALIDATE_SCOPE) {
        if (scopes['cloud.rbac.coc.services.configuration.subnetconfiguration']?.length) {
          this.hasScopeAccess = true;
        }
        if (scopes && (scopes['cloud.rbac.coc.services.configuration.subnetconfiguration']?.includes('write'))) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    } else {
      if (environment.VALIDATE_SCOPE) {
        scopes['cloud.rbac.foundation.configurations'] = scopes['cloud.rbac.foundation.configurations'] ? scopes['cloud.rbac.foundation.configurations'] : [];
        if (scopes['cloud.rbac.foundation.configurations'].length) {
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
      this.authService.setPageAccess(false);
      return;
    }

    let enttlmnts = this.authService.getEntitlements();
    if (this.router.url.includes('cco/operations') && enttlmnts[210] && !enttlmnts[102]) {
      this.allowSubnetConfig = false;
    }


    // let base = `${environment.API_BASE}`;
    // if (base.indexOf('/dev.api.calix.ai') > -1) {
    //   this.validateScopeStage = true;
    // } else this.validateScopeStage = false;

    /*this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      serverSide: true,
      processing: false,
      dom: 'tipr',
      columnDefs: [
        { targets: [0], orderable: true }
      ],
      order: [0, 'asc'],
    };*/
    this.subnetCount('1');

  }

  ngAfterViewInit() {
  }
  addSubnetConfigMOdalOpen() {
    this.modalRef = this.modalService.open(this.addSubnetConfigMOdal, { centered: true, windowClass: 'vid-med-modal' });
  }
  ngOnDestroy() {
    if (this.languageSubject) this.languageSubject.unsubscribe();
  }

  subnetCount(initload = '') {
    this.loading = true;
    this.httpService.get(this.subnetConfigUrl + '/count', this.constructHttpParam('', '', '')).subscribe((resp: any) => {
      this.dataCount = resp.count;
      this.countReceived = true;
      this.loading = false;
      if (initload) {
        this.loadSubnetConfigurationList();
      }
    }, (error: HttpErrorResponse) => {

      this.loading = false;
      //this.showErrorNotification(error);
    });

  }

  /**
   * @description - Method to load subnet configuration list.
   */
  public loadSubnetConfigurationList(): void {
    this.loading = true;
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      serverSide: true,
      processing: false,
      dom: 'tipr',
      "ordering": false,
      ajax: (dataTablesParameters: any, callback) => {
        that.httpService.get(`${environment[`SUPPORT_URL`]}/netops-subnet/subnet`, that.constructHttpParam(dataTablesParameters.start, dataTablesParameters.length, 'list')).subscribe((subnetList: any) => {
          that.subnetList = subnetList;
          that.loading = false;
          callback({
            recordsTotal: (that.dataCount != undefined) ? that.dataCount : 0,
            recordsFiltered: (that.dataCount != undefined) ? that.dataCount : 0,
            data: []
          });
        },
          (err: HttpErrorResponse) => {
            if (err.status == 404) {
              that.subnetList = [];
              setTimeout(() => {
                callback({
                  recordsTotal: (that.dataCount != undefined) ? that.dataCount : 0,
                  recordsFiltered: (that.dataCount != undefined) ? that.dataCount : 0,
                  data: []
                });
              }, 100);
            } else {
              that.showErrorNotification(err);
            }
          });
      }, drawCallback: (settings) => {
        this.changeTableStatusLanguage(settings);
        let total = settings._iRecordsDisplay; // for server side rendering
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
        } else {
          //$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
        }
      },
      columns: [{ data: 'Subnet' }]

    }
    this.tableLanguageOptions();
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


  reDraw(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  /**
   * @description - Method to construct http param.
   */
  orgId
  private constructHttpParam(skip, limit, calls): HttpParams {
    this.httpParam = new HttpParams();
    // this.httpParam = this.httpParam.set('orgId', this.authService.getOrgId());
    if (this.authService.getOrg(this.orgId)) {
      this.httpParam.set("orgId", this.orgId)
    }
    if (calls == 'list') {
      this.httpParam = this.httpParam.set('skip', skip);
      this.httpParam = this.httpParam.set('limit', limit);
    }
    return this.httpParam;
  }

  /**
   * @description - Method to toggle subnet add form.
   */
  public toggleSubnet(): void {
    this.toggleSubnetConfigForm = !this.toggleSubnetConfigForm;
    if (this.toggleSubnetConfigForm) {
      this.subnetNgForm.resetForm();
      setTimeout(() => {
        this.subnetFormControl.nativeElement.focus();
      }, 100);
    }
  }

  /**
   * @description - Method to trigger submit.
   */
  public onSubmit(): void {
    if (this.subnetList.length > 1) {
      var item = this.subnetList.find(item => item.subnet == this.subnetValue);
    }
    if (!this.subnetNgForm.valid) {
      setTimeout(() => {
        this.subnetFormControl.nativeElement.focus();
      }, 100);
      return;
    } else if (!isCidr.v4(this.subnetValue.trim())) {
      jquery('.alert').show();

      if (parseInt(this.subnetValue.split('/')[1]) > 32) {
        this.errorMessage = 'The subnet size cannot be greater than 32.';
      } else {
        this.errorMessage = 'Invalid IPv4 CIDR Format.';

      }

      return;

    }
    this.onSaveSubnetConfig();

  }

  /**
   * @description - Method to save subnet config.
   */
  public onSaveSubnetConfig(): void {
    this.loading = true;
    if (this.subnetNgForm.valid) {
      this.httpService.post(this.subnetConfigUrl, this.constructSubnetConfigObj(),
        this.constructHttpParam('', '', '')).subscribe((subnetConfig: any) => {
          this.loading = false;
          if (subnetConfig) {
            this.toggleSubnetConfigForm = false;
            // this.modalService.dismissAll();
            // this.closeModal.nativeElement.click();
            // this.subnetValue = null;
            // this.closeAlert();
            this.closeSubnet();
            //reload table after save.
            this.subnetCount();
            if (this.countReceived) {
              this.reDraw();
            }
            setTimeout(() => {
              this.subnetValue = null;
            }, 1000);
          }

        }, err => {
          this.loading = false;

          if (err.status == 409) {

            jquery('.alert').show();
            this.errorMessage = this.language['Subnet Conflict'];
            return;
          } else {
            this.showErrorNotification(err);
          }
        });
    }
  }

  /**
   * @description - Method to construct subnet config post object.
   */
  private constructSubnetConfigObj(): object {
    const subnetValue: string = this.subnetNgForm.value;
    var part = subnetValue[`subnet`].split("/"); // part[0] = base address, part[1] = netmask
    var ipaddress = part[0].split('.');
    var netmaskblocks: any = ["0", "0", "0", "0"];
    if (!/\d+\.\d+\.\d+\.\d+/.test(part[1])) {
      // part[1] has to be between 0 and 32
      netmaskblocks = ("1".repeat(parseInt(part[1], 10)) + "0".repeat(32 - parseInt(part[1], 10))).match(/.{1,8}/g);
      netmaskblocks = netmaskblocks.map(function (el) { return parseInt(el, 2); });
    } else {
      // xxx.xxx.xxx.xxx
      netmaskblocks = part[1].split('.').map(function (el) { return parseInt(el, 10) });
    }
    var invertedNetmaskblocks = netmaskblocks.map(function (el: any) { return el ^ 255; });
    var baseAddress = ipaddress.map(function (block: any, idx) { return block & netmaskblocks[idx]; });
    var broadcastaddress = ipaddress.map(function (block: any, idx) { return block | invertedNetmaskblocks[idx]; });
    //return [baseAddress.join('.'), broadcastaddress.join('.')];
    const subnetObj = {
      subnet: subnetValue[`subnet`],
      start: baseAddress.join('.'),
      end: broadcastaddress.join('.')
    };
    return subnetObj;
  }

  /**
   * @description - Method to close alert.
   */
  public closeAlert(): void {
    jquery('.alert').hide('slow');
    this.closeModal.nativeElement.click();
  }
  public closeExistingAlert() {
    jquery('.alert').hide('slow');
  }
  closeSubnet() {
    if (this.modalRef) {
      this.modalRef.close();

    }
  }
  /**
   * @description - Method to delete subnet.
   * @param - {any} subnetObj.
   */
  public openDeleteConfirmation(subnetObj: any, action) {

    this.selectedSubnetObj = subnetObj;
    this.subnetDeleteModalRef = true;
    if (action) {
      this.loading = true;
      const deleteSubnetByIdUrl: string = this.subnetConfigUrl + '/' + subnetObj._id;
      this.httpService.delete(deleteSubnetByIdUrl).subscribe(() => {
        this.selectedSubnetObj = null;
        this.subnetDeleteModalRef = false;
        this.loading = false;
        // reload table after delete.
        //this.dataCount= undefined;
        this.subnetCount();
        if (this.countReceived) {
          this.reDraw();
        }
      }, (error: HttpErrorResponse) => {
        this.showErrorNotification(error);
      });
    }
    let scrollTop = document.getElementById('subnet-config');
    if (scrollTop !== null) {
      scrollTop.scrollIntoView({ behavior: 'smooth' });
      scrollTop = null;
    }
  }

  /**
   * @description - Method to show error snackbar.
   * @param - { error }
   */
  private showErrorNotification(error: HttpErrorResponse): void {
    // Needs to show error msg.

    jquery('.alert').show();
    this.errorMessage = error.error.error;
  }
  closeDeleteConfirmation() {
    this.subnetDeleteModalRef = false;
  }
  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {

      this.dtOptions.language = this.frTable;
    }
    else if (this.language.fileLanguage == 'es') {

      this.dtOptions.language = this.esTable;
    }
    else if (this.language.fileLanguage == 'de_DE') {

      this.dtOptions.language = this.germanTable;
    }
    else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  removeUnwantedSpace(input, value) {
    this[input] = this.CommonFunctionsService.trimSpaceFromNonObjectInputs(value)
  }
}
