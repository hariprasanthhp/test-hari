import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { AcessModifiers, SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from 'src/app/support/data.service';
import { FilesListModel, requestType } from 'src/app/support/netops-management/operations/model/files-list.model';
import { getSwFileList } from 'src/app/support/netops-management/operations/services/endpoint';
import { FileService } from 'src/app/support/netops-management/operations/services/files.service';
import { SupportRadioObjectModel } from 'src/app/support/shared/models/support-radio-object.model';
import { environment } from 'src/environments/environment';
import { TimeZone, TimeZoneValues } from '../cco-foundation-service/util';
import { HSIModel } from './../cco-foundation-model/hsi.model';
import { HSIService } from './../cco-foundation-service/hsi.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FoundationManageService } from '../foundation-systems/foundation-manage/foundation-manage.service';
@Component({
  selector: 'app-foundation-header',
  templateUrl: './foundation-header.component.html',
  styleUrls: ['./foundation-header.component.scss']
})
export class FoundationHeaderComponent implements OnInit {

  language: any;
  languageSubject;
  enabletoggle: boolean = true;
  enable_toggle: boolean = false;
  subnetDeleteModalRef: boolean = false;
  softwareImageOfficial: boolean = false;
  searchSubscriber;
  searchResult;
  orgId;
  type: any;
  type1: any;
  systemSearchText: string;
  scopeFlag: any = {};

  Shown: boolean;
  enable1: boolean;
  loader = false;
  softwareImageObj: FilesListModel[] = [];
  count: number;
  tableOptions: DataTables.Settings = {}
  datatableVisible: boolean = false;
  frTable: any;
  public dtOptions: DataTables.Settings = {};
  // Url Constants.
  private subnetConfigUrl = `${environment[`SUPPORT_URL`]}/netops-subnet/subnet`;
  countReceived: boolean = false;
  dataCount: any;
  // Initialize component variables.
  public subnetList: any[];
  tableCounts;
  // Access modifier - private.
  private httpParam: HttpParams;
  public selectedSubnetObj: any;

  hsiModel: HSIModel;
  swConfrmMsg: string;
  selectedSSID: SupportRadioObjectModel;
  timeZone = TimeZone;
  timeZoneValues = TimeZoneValues;
  selectedTimeZone: any;
  _array = Array;
  mySubscription: any;
  showSystems: boolean = false;
  showOperations: boolean = false;
  showInsights: boolean;
  validateScopeStage: boolean;
  showConfigurations: boolean = false;
  showReports: boolean = false;
  esTable: any;
  constructor(
    private translateService: TranslateService,
    private service: DataServiceService,
    private router: Router,
    private route: ActivatedRoute,
    public ssoService: SsoAuthService,
    private changeDetect: ChangeDetectorRef,
    //private subscribeService: SubscribeService
    private http: HttpClient,
    private modalService: NgbModal, private httpService: ApiService,
    private fileService: FileService, private authService: SsoAuthService,
    private hsiService: HSIService,
    private manageService: FoundationManageService
  ) {
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
  }

  ngOnInit(): void {
    let scopes = this.ssoService.getScopes();
    this.doSearch();
    //this.reloadComponent();
    this.timezoneItem = this.service.timeZoneItem;
    this.securityitem = [
      {
        name: 'WPA WPA2 Personal',
        value: 'WPA WPA2 Personal',
      },
      {
        name: 'WPA2 Personal',
        value: 'WPA2 Personal',
      },
      {
        name: 'WPA Personal',
        value: 'WPA Personal',
      },
      {
        name: 'Security Off',
        value: 'Security Off',
      },
    ]


    this.orgId = this.ssoService.getOrgId();
    const self = this;
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.swConfrmMsg = this.language.Make_SW_Official
    });
    /* window.onclick = e => {
      console.log(e.target);  // to get the element
      console.log(e.target.tagName);  // to get the element tag name alone
    } */

    this.route.queryParams.subscribe(params => {
      if (this.router.url !== "/cco-foundation/foundation-systems/foundation-manage/foundation-system-list") {
        this.systemSearchText = history.state?.systemSearchText || '';
      }
    });

    this.getScopes();
    this.getHSI();
  }

  EnableShow(event) {
    if (event.isTrusted) {
      this.Shown = true;
    }
    else {
      this.Shown = false;
    }

  }
  EnableShow1(event) {
    if (event.isTrusted) {
      this.Shown = false;
    }
    else {
      this.Shown = true;
    }

  }
  enable() {
    this.enable1 = !this.enable1
  }

  getScopes() {
    let scopes = this.ssoService.getScopes();
    scopes['cloud.rbac.foundation.systems'] = scopes['cloud.rbac.foundation.systems'] ? scopes['cloud.rbac.foundation.systems'] : [];
    scopes['cloud.rbac.foundation.insights'] = scopes['cloud.rbac.foundation.insights'] ? scopes['cloud.rbac.foundation.insights'] : [];
    scopes['cloud.rbac.foundation.reports'] = scopes['cloud.rbac.foundation.reports'] ? scopes['cloud.rbac.foundation.reports'] : [];
    scopes['cloud.rbac.foundation.configurations'] = scopes['cloud.rbac.foundation.configurations'] ? scopes['cloud.rbac.foundation.configurations'] : [];

    if (scopes && (scopes['cloud.rbac.foundation.systems'])) {
      if (scopes['cloud.rbac.foundation.systems'].indexOf('read') !== -1 || scopes['cloud.rbac.foundation.systems'].indexOf('write') !== -1) this.showSystems = true
    }
    if (scopes && (scopes['cloud.rbac.foundation.insights'])) {
      if (scopes['cloud.rbac.foundation.insights'].indexOf('read') !== -1 || scopes['cloud.rbac.foundation.insights'].indexOf('write') !== -1) this.showInsights = true;
    }
    if (scopes && (scopes['cloud.rbac.foundation.reports'])) {
      if (scopes['cloud.rbac.foundation.reports'].indexOf('read') !== -1 || scopes['cloud.rbac.foundation.reports'].indexOf('write') !== -1) this.showReports = true;
    }
    if (scopes && (scopes['cloud.rbac.foundation.configurations'])) {
      if (scopes['cloud.rbac.foundation.configurations'].indexOf('read') !== -1 || scopes['cloud.rbac.foundation.configurations'].indexOf('write') !== -1) this.showConfigurations = true;
    }

  }

  subscribers$;
  private systemSearchText$ = new Subject<string>();

  search(subscribersName: string) {
    this.systemSearchText$.next(subscribersName);
  }

  doSearch() {
    this.subscribers$ = this.systemSearchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      // switchMap(textEntered => 
      //   this.service.performSearch(this.orgId, textEntered, 1, 500))
      switchMap(textEntered => {
        this.ssoService.setRefreshTokenNew();
        return this.manageService.performSearch(this.orgId, textEntered, 1, 500)
      })
    ).subscribe(
      (res: any) => {
        if (res) {
          if (res?.records) {
            res?.records.forEach(obj => {
              const RGDevices = obj?.devices.filter(device => device.opMode == "RG");
              if (obj?.devices.length) {
                const index = obj?.devices.findIndex(device => device.opMode == "RG");
                if (index > -1) obj?.devices.splice(0, 0, obj?.devices.splice(index, 1)[0]);
              }
              if (RGDevices.length > 1) {
                let deviceSet: any = [];
                RGDevices.forEach(rg => {
                  let deviceCollector = [rg, ...obj?.devices.filter(device => device.wapGatewaySn == rg.serialNumber)];
                  deviceSet.push(deviceCollector);
                });
                const ds = deviceSet.flat(2).map(devs => devs.deviceId);
                const notMatched = obj?.devices.filter(dev => ds.indexOf(dev.deviceId) == -1);
                if (notMatched.length > 0) deviceSet.push()
                obj.devices = deviceSet;
              }
            });
          }
          this.searchResult = res.records;
          this.changeDetect.detectChanges();
        }
      },
      err => {

      }
    );
  }


  searchByCharacters(event) {
    const textEntered: string = $(event.target).val().toString();
    if (textEntered.length < 2) return;
    this.searchResult = [];

    this.systemSearchText$.next(textEntered);
  }

  showSystem(subscriber, device?) {
    // localStorage.setItem("calix.foundation_systems_data", JSON.stringify(subscriber));
    // localStorage.setItem('calix.foundation_systems_id', subscriber._id);
    let sn;
    if (device) {
      sn =  device.serialNumber ? device.serialNumber : device.deviceId ? device.deviceId  :device.macAddress ? device.macAddress : '';
    } else {
      if (subscriber.devices && subscriber.devices.length) {
        if (subscriber.devices.length > 1) {
          const RGDevices = subscriber.devices.filter(device => device.opMode == "RG");
          device = RGDevices.length ? RGDevices[0] : subscriber.devices[0];
        } else {
          device = subscriber.devices[0];
        }
        sn = device.serialNumber ? device.serialNumber : device.deviceId ? device.deviceId  :device.macAddress ? device.macAddress : '';
      }
    }

    let subscriberId = subscriber.subscriberId ? subscriber.subscriberId : '';
    if (!sn && !subscriberId) {
      return;
    }
    let radio3 = false;
    if (subscriber?.devices?.length && subscriber?.devices.filter(el => el && el.modelName == 'GM2037' && el.opMode != 'RG').length) {
      radio3 = true;
    }
    //this.router.navigate([`/cco-foundation/foundation-systems/foundation-manage/system-details/${sn}`], { state: { systemSearchText: this.systemSearchText || "" } });
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>{
    this.router.navigate([`/cco-foundation/foundation-systems/foundation-manage/system-details`], { queryParams: { sn: sn, subscriber: subscriberId, radio3: radio3 } });
  }
  reloadComponent() {
    this.router.navigateByUrl('/foundation-systems', { skipLocationChange: true }).then(() => {
      this.router.navigate(['./foundation-systems']);
    });
  }

  performSearch() {
    this.manageService.showCount(false);
    if (this.searchSubscriber) this.searchSubscriber.unsubscribe();
    //$("#paramsPassed").text($("#supportSearchId").val().toString());
    this.router.navigate(['/cco-foundation/subscribers-systems/search'], { state: { systemSearchText: this.systemSearchText || "" } });
  }


  onSoftwareChange(event) {
    this.swConfrmMsg = this.language.Make_SW_Official
    this.softwareImageOfficial = true;
  }
  swOfficialConfirmation() {
    this.softwareImageOfficial = false;
  }
  closeswOfficialConfirmation() {
    this.softwareImageOfficial = false;
  }
  openOutModal(content) {
    this.loader = false;
    let ngbOption: NgbModalOptions =
      { ariaLabelledBy: 'modal-title', backdrop: "static", centered: true, windowClass: 'custom-lg-modal' }
    this.getSwImagesListCout();
    this.subnetCount('1');
    this.modalService.open(content, ngbOption).result.then((result) => {
    }, (reason) => {
      this.loader = false;
    });

  }
  getSwImagesListCout() {
    this.fileService.getSwFilesCount(this.orgId).subscribe(res => {
      this.count = res.count;
      this.datatableVisible = true;
      this.fetchSoftwareImageList()
    })
  }

  fetchSoftwareImageList() {
    this.loader = true;
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
          .set("orgId", this.orgId)
          .set("skip", dataTablesParameters.start)
          .set("limit", dataTablesParameters.length)
          .set("type", requestType.SW_FW_Image);
        that.http.get(getSwFileList, { params }).subscribe((resp: FilesListModel[]) => {
          that.softwareImageObj = resp;
          this.loader = false;
          callback({
            recordsTotal: this.count,
            recordsFiltered: this.count,
            data: []
          });
        }), error => {
          this.loader = false;
        }
      }
    };
  }
  closeModal() {
    this.modalService.dismissAll("closed");
    this.loader = false;
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    }else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }
  subnetCount(initload = '') {
    this.loader = true;
    this.httpService.get(this.subnetConfigUrl + '/count', this.constructHttpParam('', '', '')).subscribe((resp: any) => {
      this.dataCount = resp.count;
      this.countReceived = true;
      this.loader = false;
      if (initload) {
        this.loadSubnetConfigurationList();
      }
    }, (error: HttpErrorResponse) => {
      this.loader = false;
      //this.showErrorNotification(error);
    });

  }

  /**
     * @description - Method to load subnet configuration list.
     */
  private loadSubnetConfigurationList(): void {
    this.loader = true;
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
          that.loader = false;
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
              this.loader = false
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
      systemSearchText: dtObj.oPreviousSearch.sSearch.trim(),
      total: dtObj._iRecordsTotal,
      displayCount: dtObj._iDisplayLength,
      displayed: dtObj._iRecordsDisplay,
      start: dtObj._iDisplayStart
    };
    const isFrench = (localStorage.getItem('defaultLanguage') == 'fr'),
      filtered = `${dtObj.oPreviousSearch.sSearch.trim() ?
        (isFrench ?
          `(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` :
          `(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
        ''}`;
    const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
    const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
    $('div [role="status"]').text(isFrench ?
      `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` :
      `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
    )
    $(".first").text(isFrench ? 'Le début' : 'First');
    $(".previous").text(isFrench ? 'Précédent' : 'Previous');
    $(".next").text(isFrench ? 'Suivant' : 'Next');
    $(".last").text(isFrench ? 'Dernière' : 'Last');
  }

  /**
     * @description - Method to construct http param.
     */
  private constructHttpParam(skip, limit, calls): HttpParams {
    this.httpParam = new HttpParams();
    this.httpParam = this.httpParam.set('orgId', this.authService.getOrgId());
    if (calls == 'list') {
      this.httpParam = this.httpParam.set('skip', skip);
      this.httpParam = this.httpParam.set('limit', limit);
    }
    return this.httpParam;
  }

  closeDeleteConfirmation() {
    this.subnetDeleteModalRef = false;
  }
  /**
     * @description - Method to delete subnet.
     * @param - {any} subnetObj.
     */
  public openDeleteConfirmation(subnetObj: any, action) {
    this.selectedSubnetObj = subnetObj;
    this.subnetDeleteModalRef = true;
    if (action) {
      this.loader = true;
      const deleteSubnetByIdUrl: string = this.subnetConfigUrl + '/' + subnetObj._id;
      this.httpService.delete(deleteSubnetByIdUrl).subscribe(() => {
        this.selectedSubnetObj = null;
        this.loader = false;
        this.subnetDeleteModalRef = false;
        // reload table after delete.
        //this.dataCount= undefined;
        this.subnetCount();
        if (this.countReceived) {
          // this.reDraw();
        }
      }, (error: HttpErrorResponse) => {
        this.loader = false;
      });
    }
  }

  getHSI() {
    /*this.hsiService.getHSI(this.orgId).subscribe(res => {
      console.log("HSI=>", res);
      this.hsiModel = res;
      this.selectedTimeZone = this.hsiModel.timezonePosix.Tz;
      this.createSSIDItems();
    })*/
  }
  createSSIDItems() {
    this.ssidItems = this.hsiModel.wifiSsidExos.map(res => { return { name: res.SSID } })
  }

  selectedDropdownSSID(event) {
    if (event.Enable) {
      this.enable_toggle = true;
    } else {
      this.enable_toggle = false;
    }

  }
  onTimeZoneChange(event) {
    this.hsiModel.userCredentials.Password
    this.hsiModel.timezonePosix.Tz = event.value;
    this.hsiModel.timezonePosix.TzName = event.value;
    this.hsiModel.timezonePosix.TzValue = this.timeZoneValues[event.value].TzValue;
  }
  helpRoute() {
    const helpUrl = (this.ssoService.getCscType() === "DME") ?
      "https://www.calix.com/content/calix/en/site-prod/library-html/software-products/cloud/nm/support/dme/index.htm#88478.htm" :
      "https://www.calix.com/content/calix/en/site-prod/library-html/software-products/cloud/nm/support/help/index.htm#93079.htm";
    window.open(helpUrl, "_blank");
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
    if (this.searchSubscriber) this.searchSubscriber.unsubscribe();
    this.systemSearchText = null;
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  ssidItems = [];
  securityitem = [];
  timezoneItem = [];
}
