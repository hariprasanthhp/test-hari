import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RouterService } from 'src/app-services/routing.services';
import { TranslateService } from 'src/app-services/translate.service';
import { IssueService } from 'src/app/cco/issues/service/issue.service';
import { MultiSelectComponent } from 'src/app/shared/components/multi-select/multi-select.component';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { WebsocketService } from '../../shared/services/websocket.service';
import { HomeGeomapService } from '../services/home-geomap.service';
import { SystemListComponent } from './system-list/system-list.component';
@Component({
  selector: 'app-active-devices-geomap',
  templateUrl: './active-devices-geomap.component.html',
  styleUrls: ['./active-devices-geomap.component.scss'],
})
export class ActiveDevicesGeomapComponent implements OnInit {
  
  @ViewChild('systemInfo', { static: true }) private systemInfo: TemplateRef<any>;
  hasScopeAccess: boolean = false;
  loading: boolean = true;
  map: any = undefined;
  mapData: any = [];
  infobox: any;
  tooltip: any;
  systemListTooltip: any;
  endHandler: Microsoft.Maps.IHandlerId;
  pins = [];
  language: any;
  languageSubject;
  _that: any;
  reStoreMapViewDetails = {
    mapCenterBound: undefined,
    mapWidthBound: undefined,
    mapHeightBound: undefined,
    mapZoom: undefined,
  };
  filterSubscription;
  locs = 0;
  mapSet: Boolean = false;

  baseUrl = `${environment.API_BASE_URL}analytics-engine/`;

  error: boolean;
  errorInfo: string = '';
  ontInfoBox: any = [
    { key: 'regionLocation', name: 'Region/Location' },
    { key: 'deviceName', name: 'System Name', hyperlink: true },
    { key: 'deviceType', name: 'System Type' },
    { key: 'deviceModel', name: 'Model_Name' },
    { key: 'subscriberName', name: 'Subscriber Name' },
    { key: 'outage', name: 'Internet Outage' },
    { key: 'outageAlarmName', name: 'Internet Outage Cause', hyperlink: true },
  ];

  oltInfoBox: any = [
    { key: 'regionLocation', name: 'Region/Location' },
    { key: 'deviceName', hyperlink: true, name: 'System Name' },
    { key: 'deviceType', name: 'System Type' },
    { key: 'deviceModel', name: 'Model_Name' },
  ];

  listInfoBox: any = [
    { key: 'deviceName', hyperlink: true, name: 'System Name' },
    { key: 'regionLocation', name: 'Region/Location' },
    { key: 'deviceType', name: 'System Type' },
    { key: 'deviceModel', name: 'Model_Name' },
    { key: 'systemAlarmCount', name: 'System Alarms' },
    { key: 'transformedAlarmCount', name: 'Transform Alarms' },
    { key: 'cloudHealthCount', name: 'Health Alerts' },
    { key: 'cloudConnectivityCount', name: 'Cloud Connectivity' },
    { key: 'serviceDisruption', name: 'Service Disruption' },
    { key: 'subscriberName', name: 'Subscriber Name' },
    // { key: 'outage', name: 'Internet Outage' },
    // { key: 'outageAlarmName', name: 'Internet Outage Cause' },
  ];
  canCall: boolean = true;
  devicesIcons = {
    circles: {
      red: 'assets/images/geomap-icons/circle-solid-red.svg',
      green: 'assets/images/geomap-icons/circle-solid-green.svg',
      yellow: 'assets/images/geomap-icons/circle-solid-yellow.svg',
      amber: 'assets/images/geomap-icons/circle-solid-amber.svg',
      black: 'assets/images/geomap-icons/circle-solid-black.svg',
      blue: 'assets/images/geomap-icons/circle-solid-blue.svg',
    },
    diamonds: {
      red: 'assets/images/geomap-icons/diamond-solid-red.svg',
      green: 'assets/images/geomap-icons/diamond-solid-green.svg',
      yellow: 'assets/images/geomap-icons/diamond-solid-yellow.svg',
      amber: 'assets/images/geomap-icons/diamond-solid-amber.svg',
      black: 'assets/images/geomap-icons/diamond-solid-black.svg',
      blue: 'assets/images/geomap-icons/diamond-solid-blue.svg',
    },
    squares: {
      red: 'assets/images/geomap-icons/square-solid-red.svg',
      green: 'assets/images/geomap-icons/square-solid-green.svg',
      yellow: 'assets/images/geomap-icons/square-solid-yellow.svg',
      amber: 'assets/images/geomap-icons/square-solid-amber.svg',
      black: 'assets/images/geomap-icons/square-solid-black.svg',
      blue: 'assets/images/geomap-icons/square-solid-blue.svg',
    },
  };
  geoMapParams: {};
  systemListData: any = {};
  setListInfoBox: any[];
  listHasAllOLT: any;
  canShowSystemList: boolean = false;
  canShowAlertTypeList: boolean = false;
  enableClustering: boolean = false;

  regionSelected: any;
  regionsDataArray = ['All'];
  regionArray = ['All'];
  locationSelected: any;
  locationDataArray = ['All'];
  systemSelected: any;
  systemDataArray = ['All'];
  regionsSubject: any;
  locationsSubject: any;
  systemsSubject: any;

  filtersForm = this.fb.group({
    region: [''],
    alertType: 'ALL',
    location: [''],
    system: [''],
    modelNames: [],
    vendorId: 'All',
    fsan_serialno: '',
    device_type: 'ALL',
    showAllSystems: true,
    showOntNetOutage: false,
    searchInputText: '',
  });
  fsanvalid: boolean = true;
  clickedRegion: any;
  regionName: any;
  clickedLocation: any;
  locationName: any;
  systemName: any;
  showFSAN = true;
  appliedParams = ['region', 'location', 'system', 'alertType', 'modelNames', 'vendorId', 'fsan_serialno', 'device_type'];
  // backUpMapData: any = [];
  previousOntOutage: boolean = false;
  previousHealthySystem: boolean = true;
  totalActiveSystems = 0;
  modelNames: any = [];
  vendorNames: any = ['All'];
  vendorModals: any;
  actualvendorNames: any[];
  actualModelNames: any[];
  // modelNames : any;
  // searchInputText = '';
  isDev: boolean = false;
  isDevfunc: boolean = false;
  showCountOfItems: boolean = false;
  @ViewChild(MultiSelectComponent, { static: false })
  MultiSelectComponent: MultiSelectComponent;
  clusters = [];
  showAlertTypeList: Subject<any> = new Subject();
  alertTypes = [
    {
      id: 'ALL',
      name: 'All',
    },
    {
      id: 'SYSTEM',
      name: 'System Alarms',
    },
    {
      id: 'TRANSFORMED',
      name: 'Transform Alarms',
      disableFor : 'ONT'
    },
    {
      id: 'HEALTH',
      name: 'Health Alerts',
    },
    {
      id: 'CONNECTIVITY',
      name: 'Cloud Connectivity',
      disableFor : 'ONT'
    },
    {
      name: 'Service Disruptions',
      id: 'DISRUPTION',
      disableFor : 'OLT'
    },
  ];
  selectedAlertTypes = 'All Alerts';
  tempSelectedAlertType = 'All Alerts';
  prefillingFilters: any;
  navigatedGeoFilters: any;
  pushpinMouseOutHandler: Microsoft.Maps.IHandlerId;
  systemInfoData: any;
  clickNoOfAlarms = [
    {
      element: "clickNoOfCloudConnectivityAlarms",
      count: "cloudConnectivityCount",
      col: "Cloud Connectivity",
      id: "CONNECTIVITY",
    },
    {
      element: "clickNoOfcloudHealthAlarms",
      count: "cloudHealthCount",
      col: "Health Alerts",
      id: "HEALTH",
    },
    {
      element: "clickNoOfSystemAlarms",
      count: "systemAlarmCount",
      col: "System Alarms",
      id: "SYSTEM",
    },
    {
      element: "clickNoOfTransformedAlarms",
      count: "transformedAlarmCount",
      col: "Transform Alarms",
      id: "TRANSFORMED",
    },
  ];
  constructor(
    private translateService: TranslateService,
    private renderer: Renderer2,
    private router: Router,
    private issueService: IssueService,
    private http: HttpClient,
    private commonOrgService: CommonService,
    private fb: FormBuilder,
    public ssoService: SsoAuthService,
    private titleService: Title,
    private homeGeomapService: HomeGeomapService,
    public websocketservice: WebsocketService,
    private routerService: RouterService
  ) {
    // let base = `${environment.API_BASE}`;
    let host = window.location.host;
    this.prefillingFilters = history?.state?.filters;

    // if (base.indexOf('/dev.api.calix.ai') > -1 || host.indexOf('localhost') > -1) {
    //   this.isDev = true;
    // } else this.isDev = false;
  }
  ngOnInit(): void {
    console.log(history.state);
    this.isDev =
      `${WindowRefService.prototype.nativeWindow}`.includes(
        'cloud-dev.calix.com'
      ) || `${WindowRefService.prototype.nativeWindow}`.includes('localhost')
        ? true
        : false;
    this.isDevfunc =
      `${WindowRefService.prototype.nativeWindow}`.includes(
        'cloud-devfunc.calix.com'
      ) || `${WindowRefService.prototype.nativeWindow}`.includes('localhost')
        ? true
        : false;
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        this.hideToolbox();
        this.titleService.setTitle(
          `${this.language['Active GeoMap']} - ${this.language['Home']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`
        );
      }
    );
    this.titleService.setTitle(
      `${this.language['Active GeoMap']} - ${this.language['Home']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`
    );
    let scopes = this.ssoService.getScopes();
    if (environment.VALIDATE_SCOPE) {
      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (
            validScopes[i].indexOf(
              'cloud.rbac.coc.insights.activdevicesgeomap'
            ) !== -1
          ) {
            this.hasScopeAccess = true;
            break;
          }
        }
      }
    } else {
      this.hasScopeAccess = true;
    }

    if (!this.hasScopeAccess) {
      this.loading = false;
      return;
    } else {
      this.ssoService.setPageAccess(true);
    }
    this.filtersForm.patchValue(
      {
        region: ['All'],
        location: ['All'],
        system: ['All'],
        alertType: 'ALL',
        modelNames: [],
        vendorId: 'All',
        fsan_serialno: '',
        device_type: 'ALL',
        showAllSystems: true,
        showOntNetOutage: false,
        searchInputText: '',
      },
      { emitEvent: false, onlySelf: true }
    );

    if (this.prefillingFilters) {
      this.filtersForm.patchValue(this.prefillingFilters, {
        emitEvent: false,
        onlySelf: true,
      });
    }

    this.filterSubscription = this.issueService.issuesFilterChanged$.subscribe(
      (value) => {
        if (value) {
          this.hideToolbox();
          setTimeout(() => {
            this.getData();
          }, 300);
        }
      }
    );

    // setTimeout(() => {
    // this.navigatedGeoFilters = this.prefillingFilters ? this.prefillingFilters : this.issueService?.getGeomapAppliedFilters();
    this.navigatedGeoFilters = this.prefillingFilters;
    if (
      this.routerService.previousUrl.includes(
        'cco/system/cco-network-system/show-details'
      ) ||
      this.routerService.previousUrl.includes(
        'cco/services/subscribers/system/list'
      ) || 
      this.routerService.previousUrl.includes(
        'active-reports?geoMapIssue=true'
      )
      
    ) {
      this.navigatedGeoFilters = this.issueService?.getGeomapAppliedFilters();
    }

    if (
      this.navigatedGeoFilters &&
      Object.keys(this.navigatedGeoFilters).length > 0 &&
      (this.navigatedGeoFilters['fromIssuesGeoMap'] == 'olt' ||
        this.navigatedGeoFilters['fromIssuesGeoMap'] == 'ont' ||
        this.navigatedGeoFilters['alertType'] != '')
    ) {
      let alertType = this.navigatedGeoFilters
        ? this.alertTypes.find(
            (el) => el.id == this.navigatedGeoFilters.alertType
          )
        : undefined;
      this.selectedAlertTypes = this.tempSelectedAlertType =
        alertType && alertType['name'] ? (alertType['name'] == 'All' ? 'All Alerts' : alertType['name']) : 'All Alerts';
      if (this.navigatedGeoFilters['reStoreMapViewDetails']) {
        this.reStoreMapViewDetails = {
          mapCenterBound:
            this.navigatedGeoFilters['reStoreMapViewDetails'][
              'mapCenterBound'
            ] || undefined,
          mapWidthBound:
            this.navigatedGeoFilters['reStoreMapViewDetails'][
              'mapWidthBound'
            ] || undefined,
          mapHeightBound:
            this.navigatedGeoFilters['reStoreMapViewDetails'][
              'mapHeightBound'
            ] || undefined,
          mapZoom:
            this.navigatedGeoFilters['reStoreMapViewDetails']['mapZoom'] ||
            undefined,
        };
      }
      this.filtersForm.patchValue(
        {
          fsan_serialno: this.navigatedGeoFilters['fsan_serialno'] ? this.navigatedGeoFilters['fsan_serialno'] : this.navigatedGeoFilters['fsan'] ? this.navigatedGeoFilters['fsan'] : '',
          device_type: this.navigatedGeoFilters['device_type'] || 'ALL',
          alertType: this.navigatedGeoFilters['alertType'] || 'ALL',
          showAllSystems:
            this.navigatedGeoFilters &&
            this.navigatedGeoFilters['showAllSystems'] == false
              ? false
              : true,
          showOntNetOutage:
            this.navigatedGeoFilters['showOntNetOutage'] || false,
        },
        { emitEvent: false, onlySelf: true }
      );
    }
    // this.issueService.setgeoMapHomeFilterParams(geoFilters, true);
    // }, 2000);
    this.regionsApiLoader();
    // this.getModalVendorIds();
  }
  ngAfterViewInit() {
    this.filtersForm
      .get('showAllSystems')
      .valueChanges?.subscribe((selectedValue) => {
        this.filtersForm
          .get('showAllSystems')
          .setValue(selectedValue, { emitEvent: false });
        let geoFilters = this.issueService?.getGeomapAppliedFilters();
        geoFilters['showAllSystems'] = selectedValue;

        if (selectedValue) {
          this.filtersForm
            .get('showOntNetOutage')
            .setValue(!selectedValue, { emitEvent: false });
          geoFilters['showOntNetOutage'] = !selectedValue;
        }

        this.issueService?.setGeomapAppliedFilters(geoFilters);
        this.getData();
      });
    this.filtersForm
      .get('showOntNetOutage')
      .valueChanges?.subscribe((selectedValue) => {
        this.filtersForm
          .get('showOntNetOutage')
          .setValue(selectedValue, { emitEvent: false });
        let geoFilters = this.issueService?.getGeomapAppliedFilters();
        geoFilters['showOntNetOutage'] = selectedValue;

        if (selectedValue) {
          this.filtersForm
            .get('showAllSystems')
            .setValue(!selectedValue, { emitEvent: false });
          geoFilters['showAllSystems'] = !selectedValue;
        }
        this.getData();
        this.issueService?.setGeomapAppliedFilters(geoFilters);
      });
    this.filtersForm.get('fsan_serialno').valueChanges.subscribe((fsan) => {
      if (!fsan) {
        this.fsanvalid = true;
      } else if (fsan.length == 12) {
        this.fsanvalid = true;
      }
    });
  }
  getModalVendorIds() {
    let url = `${this.baseUrl}modelNames-vendorIds`;
    // let url = `assets/data/modelvendor.json`;
    this.http.get(url).subscribe(
      (data: any) => {
        this.vendorModals = data;
        let modifiedModel = [];
        let modifiedVendor = [];
        if (this.vendorModals?.vendorIdToModelMap) {
          for (let [key, value] of Object.entries(
            this.vendorModals?.vendorIdToModelMap
          )) {
            if (value && value['length'] > 0 && Array.isArray(value)) {
              value.forEach((el) => {
                let obj = {};
                obj['vendor'] = key;
                obj['model'] = obj['value'] = obj['label'] = obj['name'] = el;
                modifiedModel.push(obj);
              });
            }
            let vendorObj = {};
            vendorObj['vendor'] =
              vendorObj['value'] =
              vendorObj['label'] =
              vendorObj['name'] =
                key;
            vendorObj['models'] = value;
            modifiedVendor.push(vendorObj);
          }
        }
        //sort modifiedVendor
        modifiedModel.sort((a, b) =>
          (a.model || '')
            .toString()
            .localeCompare((b.model || '').toString(), 'en', {
              numeric: false,
            })
        );
        this.actualModelNames = [...modifiedModel];
        this.modelNames = [...modifiedModel];
        this.actualvendorNames = [...this.vendorNames, ...modifiedVendor];
        this.vendorNames = [...this.vendorNames, ...modifiedVendor];

        this.filtersForm
          .get('modelNames')
          .setValue(this.actualModelNames.map((el) => el.model));
        // this.filtersForm.get('modelNames').setValue(['All']);

        // let geoFilters = this.issueService?.getGeomapAppliedFilters();
        if (
          this.navigatedGeoFilters &&
          (this.navigatedGeoFilters['fromIssuesGeoMap'] == 'olt' ||
            this.navigatedGeoFilters['fromIssuesGeoMap'] == 'ont' ||
            this.navigatedGeoFilters['alertType'] != '')
        ) {
          this.filtersForm
            .get('modelNames')
            .setValue(
              this.navigatedGeoFilters['modelNames'] ||
                this.actualModelNames.map((el) => el.model)
            );
          // this.filtersForm.get('modelNames').setValue(this.navigatedGeoFilters['modelNames'] || ['All']);
          this.filtersForm
            .get('vendorId')
            .setValue(this.navigatedGeoFilters['vendorId'] || 'All');
          this.setModelNames({
            selectedItems:
              this.navigatedGeoFilters['modelNames'] ||
              this.actualModelNames.map((el) => el.model),
          });
          this.onSelectVendor(
            this.navigatedGeoFilters['vendorId'] || 'All',
            this.navigatedGeoFilters['modelNames'] ||
              this.actualModelNames.map((el) => el.model)
          );
          this.onAlarmGroupChange(
            this.navigatedGeoFilters['device_type']?.toUpperCase()
          );
        }
        setTimeout(() => {
          this.generateParams();
        }, 1000);
      },
      (error) => {
        setTimeout(() => {
          this.generateParams();
        }, 1000);
      }
    );
  }
  regionsApiLoader() {
    const seen = new Set();
    this.regionSelected = 'All';
    this.locationSelected = 'All';
    this.systemSelected = 'All';
    this.regionsSubject = this.issueService.getRegions().subscribe(
      (res: any) => {
        if (res && res.length) {
          res.forEach((element: any) => {
            if (this.findObjectsCountByValue(res, element.name) > 1) {
              let fqn = '';
              if (element.fqn) {
                let tmp = element['fqn'].split(',');
                if (tmp.length) {
                  let deviceName = tmp[0];
                  if (deviceName) {
                    let arr = deviceName.split('=');
                    if (arr.length && arr[1]) {
                      fqn = arr[1];
                    }
                  }
                }
              }
              element['tempName'] = `${element.name} ${fqn ? `(${fqn})` : ''}`;
            } else {
              element['tempName'] = element.name;
            }
          });

          res.forEach((element: any) => {
            element['name'] = element.tempName;
          });
        }
        res.sort();
        this.regionsDataArray = [...this.regionsDataArray, ...res];

        //geomap functionalities
        //set params that are set in geomap after navigated from alarm pushpins
        // if (this.issueService.isMap()) {
        // let geoFilters = this.issueService?.getGeomapAppliedFilters();

        if (
          this.navigatedGeoFilters &&
          (this.navigatedGeoFilters['fromIssuesGeoMap'] == 'olt' ||
            this.navigatedGeoFilters['fromIssuesGeoMap'] == 'ont' ||
            this.navigatedGeoFilters['alertType'] != '')
        ) {
          let regionArray = ['All'];
          let locationArray = ['All'];
          let systemArray = ['All'];
          if (this.navigatedGeoFilters['region']) {
            regionArray = this.navigatedGeoFilters['region'] || 'All';
          }
          if (this.navigatedGeoFilters['location']) {
            locationArray = this.navigatedGeoFilters['location'] || 'All';
          }

          if (this.navigatedGeoFilters['system']) {
            systemArray = this.navigatedGeoFilters['system'] || 'All';
          }
          this.filtersForm.get('region').setValue(regionArray);

          setTimeout(() => {
            this.filtersForm.get('location').setValue(locationArray);
            this.loadLocationValue('');
            setTimeout(() => {
              this.filtersForm.get('system').setValue(systemArray);
              this.selectSystem('');
              this.loadSystemValue();
              // setTimeout(() => {
              //   this.loadIntialData();
              // }, 1000)
            }, 200);
          }, 200);
        }
        this.getModalVendorIds();
        // }
      },
      (error) => {
        this.getModalVendorIds();
        this.error = true;
        this.loading = false;
        this.pageErrorHandle(error);
      }
    );
  }

  findObjectsCountByValue(jsObjects, value: any) {
    let count: any = 0;

    if (jsObjects && jsObjects.length) {
      for (var i = 0; i < jsObjects.length; i++) {
        if (jsObjects[i]['name'].toLowerCase() == value.toLowerCase()) {
          count++;
        }
      }
    }

    return count;
  }

  loadLocationValue(event: any) {
    this.clickedRegion = '';
    this.locationSelected = 'All';
    this.systemSelected = 'All';
    let ids = this.filtersForm.get('region').value;
    let locationIds = this.filtersForm.get('location').value;
    this.regionSelected = ids;
    if (this.regionSelected.length) {
      let regionQuery = '';

      if (ids.length) {
        if (ids.indexOf('All') !== -1) {
          this.locationDataArray = ["All"];
          this.systemDataArray = ['All'];
          this.filtersForm.get('location').setValue(['All']);
          this.filtersForm.get('system').setValue(['All']);
          this.regionName = null;
          this.locationName = null;
          this.systemName = null;
          return;
        }
        ids.forEach((element) => {
          if (element == 'All') {
            return;
          }
          regionQuery += `&region=${element}`;
        });

        this.locationsSubject = this.http
          .get(
            `${environment.API_BASE_URL}nfa/locations?tenant=0${regionQuery}`
          )
          .pipe(
            map((res: any) => {
              res = this.issueService.appendFqn(res);
              res.sort((a, b) =>
                (a['name'] || '')
                  .toString()
                  .localeCompare((b['name'] || '').toString(), 'en', {
                    numeric: false,
                  })
              );
              return res;
            }),
            catchError(this.handleError)
          )
          .subscribe(
            (res: any) => {
              //this.setLocationsInfo(res);
              this.locationDataArray = ['All'];
              this.locationDataArray = [...this.locationDataArray, ...res];
              // this.locationDataArray = res;
              // this.locationDataArray.push("All");
              let locationsArray = this.filtersForm.get('location').value;
              if (locationsArray && locationsArray.length > 0) {
                locationsArray.forEach((el, index) => {
                  if (el != 'All') {
                    if (
                      this.locationDataArray?.findIndex(
                        (fi) => fi['id'] == el
                      ) == -1
                    ) {
                      locationsArray = locationsArray?.filter(
                        (element) => element != el
                      );
                    }
                  }
                });
              }
              if (!locationsArray || locationsArray.length == 0) {
                locationsArray = ['All'];
              }

              this.filtersForm.get('location').setValue(locationsArray);
              this.loadSystemValue();
            },
            (error) => {}
          );

        //start of CCL-34242
        this.regionName = ids;
        //end of CCL-34242

        this;
      } else {
        this.filtersForm.get('region').setValue(['All']);
        this.filtersForm.get('location').setValue(['All']);
        this.filtersForm.get('system').setValue(['All']);
        //this.filtersForm.get('region').setValue(['All']);
        this.regionName = null;
        this.locationName = null;
        this.systemName = null;
        this.locationDataArray = ['All'];
        this.systemDataArray = ['All'];
      }
    }
  }

  loadSystemValue(event?: any) {
    this.clickedLocation = '';
    let regionids = this.filtersForm.get('region').value;
    let locationids = this.filtersForm.get('location').value;
    let systemIds = this.filtersForm.get('system').value;
    this.systemSelected = ['All'];
    if (
      regionids.length &&
      locationids.length &&
      locationids.indexOf('All') === -1
    ) {
      let regionQuery = '';

      regionids.forEach((element) => {
        if (element == 'All') {
          return;
        }
        regionQuery += `&region=${element}`;
      });

      let locationQuery = '';

      locationids.forEach((element) => {
        if (element == 'All') {
          return;
        }
        locationQuery += `&location=${element}`;
      });

      this.systemsSubject = this.http
        .get(
          `${environment.API_BASE_URL}nfa/systems?tenant=0${regionQuery}${locationQuery}`
        )
        .pipe(
          map((res: any) => {
            res.sort((a, b) =>
              (a['name'] || '')
                .toString()
                .localeCompare((b['name'] || '').toString(), 'en', {
                  numeric: false,
                })
            );
            return res;
          }),
          catchError(this.handleError)
        )
        .subscribe(
          (res: any) => {
            //this.setSystemsInfo(res);
            this.systemDataArray = ['All'];
            this.systemDataArray = [...this.systemDataArray, ...res];

            let systemsArray = this.filtersForm.get('system').value;
            if (systemsArray && systemsArray.length > 0) {
              systemsArray.forEach((el, index) => {
                if (el != 'All') {
                  if (
                    this.systemDataArray?.findIndex((fi) => fi['uuid'] == el) ==
                    -1
                  ) {
                    systemsArray = systemsArray?.filter(
                      (element) => element != el
                    );
                  }
                }
              });
            }
            if (!systemsArray || systemsArray.length == 0) {
              systemsArray = ['All'];
            }

            this.filtersForm.get('system').setValue(systemsArray);
            // this.systemDataArray = res;
            // this.systemDataArray.push("All");
          },
          (error) => {}
        );

      //start of CCL-34242
      this.locationName = locationids;
      //end of CCL-34242
    } else {
      if (!locationids.length || locationids.indexOf('All') != -1) {
        this.filtersForm.get('location').setValue(['All']);
        this.filtersForm.get('system').setValue(['All']);
        this.locationName = null;
        this.systemName = null;
        this.systemDataArray = ['All'];
      }
    }
  }

  selectSystem(event: any) {
    let systemid = this.filtersForm.get('system').value;
    this.systemName = systemid;

    if (systemid == 'All') {
      this.systemName = null;
    }
  }
  validateRegion(event: any) {
    let regions = this.filtersForm.get('region').value;

    if (event === 'All') {
      regions = ['All'];
    } else {
      let index = regions.indexOf('All');
      if (index > -1) {
        regions.splice(index, 1);
      }
    }

    this.filtersForm.get('region').setValue(regions);

    this.loadLocationValue('');
  }

  validateLocation(event: any) {
    let locations = this.filtersForm.get('location').value;

    if (event === 'All') {
      this.clickedLocation = undefined;
      this.locationName = undefined;
      locations = ['All'];
    } else {
      let index = locations.indexOf('All');
      if (index > -1) {
        locations.splice(index, 1);
      }
    }

    this.filtersForm.get('location').setValue(locations);
    this.loadSystemValue('');
  }

  validateSystem(event: any) {
    let systems = this.filtersForm.get('system').value;

    if (!systems.length) {
      systems = ['All'];
    } else if (event === 'All') {
      systems = ['All'];
    } else {
      let index = systems.indexOf('All');
      if (index > -1) {
        systems.splice(index, 1);
      }
    }

    this.filtersForm.get('system').setValue(systems);
  }
  generateParams() {
    this.validateFSAN();
    if (!this.fsanvalid) return;

    //hide healthy systems behaviour change
    this.selectedAlertTypes = this.tempSelectedAlertType == 'All'? 'All Alerts' : this.tempSelectedAlertType;
    if (this.selectedAlertTypes != 'All Alerts') {
      if (this.selectedAlertTypes == 'Cloud Connectivity' || this.selectedAlertTypes == 'Transform Alarms') {
        this.filtersForm
          .get('fsan_serialno')
          .setValue('', { emitEvent: false });
        this.filtersForm.get('fsan_serialno').disable({ emitEvent: false });
      }else{
        this.filtersForm.get('fsan_serialno').enable({ emitEvent: false });
      }
      if (this.selectedAlertTypes == 'Service Disruptions'){
        this.previousHealthySystem = this.filtersForm.get('showAllSystems').value;
        this.filtersForm.get('showAllSystems').setValue(false, { emitEvent: false });
      }else{
        this.filtersForm
        .get('showAllSystems')
        .setValue(true, { emitEvent: false });
      }
      this.filtersForm.get('showAllSystems').disable({ emitEvent: false });
    } else {
      this.filtersForm.get('showAllSystems').setValue(this.previousHealthySystem, { emitEvent: false });
      this.filtersForm.get('showAllSystems').enable({ emitEvent: false });
      this.filtersForm.get('fsan_serialno').enable({ emitEvent: false });
    }

    let fields = this.filtersForm.value;
    let params = {
      showAllSystems: fields['showAllSystems'],
      showOntNetOutage: fields['showOntNetOutage'],
      region: fields['region'],
      location: fields['location'],
      system: fields['system'],
      fsan_serialno: fields['fsan_serialno'] ? fields['fsan_serialno'] : '',
      device_type: fields['device_type'],
      alertType: fields['alertType'],
      modelNames: fields['modelNames'],
      vendorId: fields['vendorId'],
    };
    // if (fields['fsan_serialno'] && fields['device_type'] !== 'OLT') {
    //   params['fsan_serialno'] = this.filtersForm.get('fsan_serialno').value;
    // }
    this.selectedAlertTypes = 'All Alerts';
    if (fields['alertType']) {
      this.selectedAlertTypes =
        this.tempSelectedAlertType == 'All'
          ? 'All Alerts'
          : this.tempSelectedAlertType;
    }
    // if (fields['vendorId'] && fields['device_type'] !== 'OLT') {
    //   params['vendorId'] = fields['vendorId'];
    // }

    this.previousOntOutage = fields['showOntNetOutage'];
    this.issueService.setGeomapAppliedFilters(params);
    this.getData();
  }

  getData() {
    if (this.canCall) {
      this.hideToolbox();
      this.canShowAlertTypeList = false;
      this.canShowSystemList = false;
      this.canCall = false;
      // this.totalActiveSystems = 0;
      this.loading = true;
      this.error = false;
      this.errorInfo = undefined;
      this.geoMapParams = {};
      if (this.map) {
        Microsoft.Maps.Events.removeHandler(this.endHandler);
        if (this.map['layers']) {
          this.map.layers.clear();
        }

        this.mapData = [];
        // this.backUpMapData = [];
        this.pins = [];
      }

      let getParams = {
        ...this.issueService.getGeomapAppliedFilters(),
      };
      if (getParams) {
        this.geoMapParams = getParams;
      }

      let query = '';
      if (this.filtersForm.get('showAllSystems').value) {
        query =
          'hide_healthy_systems=' +
          encodeURIComponent(this.filtersForm.get('showAllSystems').value);
      }

      for (var key in this.geoMapParams) {
        if (
          this.geoMapParams[key] == undefined ||
          this.geoMapParams[key] == '' ||
          (key == 'region' &&
            this.geoMapParams[key].length == 1 &&
            this.geoMapParams[key][0]?.toLowerCase() == 'all') ||
          (key == 'location' &&
            this.geoMapParams[key].length == 1 &&
            this.geoMapParams[key][0]?.toLowerCase() == 'all') ||
          (key == 'system' &&
            this.geoMapParams[key].length == 1 &&
            this.geoMapParams[key][0]?.toLowerCase() == 'all') ||
          key == 'showAllSystems' ||
          key == 'showOntNetOutage' ||
          (key == 'modelNames' &&
            this.geoMapParams[key]?.length == this.actualModelNames?.length) ||
          (key == 'vendorId' && this.geoMapParams[key] == 'All') ||
          this.appliedParams.findIndex(el => el == key) == -1
        ) {
          continue;
        }

        if (query != '') {
          query += '&';
        }

        query += key + '=' + encodeURIComponent(this.geoMapParams[key]);
      }

      setTimeout(() => {
        let url = `${this.baseUrl}devices?withoutGeo=false`;
        if (query && query != '') {
          url = `${this.baseUrl}devices?withoutGeo=false&${query}`;
        }
        // let json = `assets/data/indialoc.json`;
        this.http
          .get(url)
          // this.http.get(json)
          .subscribe(
            (json: any) => {
              // if (this.isDev || this.isDevfunc) {
              this.mapData =
                json && json['devicesOutputData']
                  ? json['devicesOutputData']
                  : json
                  ? json
                  : [];
              //set totalActiveSystems kpi
              this.totalActiveSystems =
                json && json['activeSystemsCount']
                  ? json['activeSystemsCount']
                  : this.mapData &&
                    this.mapData[0] &&
                    this.mapData[0]['activeSystemsCount']
                  ? this.mapData[0]['activeSystemsCount']
                  : 0;
              // }
              // else {
              //   this.mapData = json ? json : [];
              //   //set totalActiveSystems kpi
              //   this.totalActiveSystems = 0;
              //   if (this.mapData.length > 0) {
              //     this.totalActiveSystems = this.mapData && this.mapData[0] && this.mapData[0]['activeSystemsCount'] ? this.mapData[0]['activeSystemsCount'] : 0;
              //   }
              // }

              if (this.mapData.length > 0) {
                //filter empty response with system count
                if (this.mapData && this.mapData.length == 1) {
                  this.mapData = this.mapData.filter(
                    (el) => el['deviceUuid'] && el['deviceName']
                  );
                }

                // find invalid lat and long and show message
                this.error = this.mapData.some(
                  (el) =>
                    Number(el['latitude']) == 0 && Number(el['longitude']) == 0
                );
                this.mapData = this.mapData.filter(
                  (el) =>
                    Number(el['latitude']) || Number(el['longitude'])
                );

                this.mapData.forEach((el) => {
                  el['regionLocation'] = '-';
                  el['outage'] =
                    el['outage'] || el['outage'] == false
                      ? String(el['outage']).charAt(0).toUpperCase() +
                        String(el['outage']).slice(1)
                      : undefined;
                  if (
                    (el['deviceRegion'] && el['deviceRegion']['region_name']) ||
                    (el['deviceLocation'] &&
                      el['deviceLocation']['networkgroup_name'])
                  ) {
                    el['regionLocation'] = `${
                      el['deviceRegion'] && el['deviceRegion']['region_name']
                        ? el['deviceRegion']['region_name']
                        : '-'
                    }/${
                      el['deviceLocation'] &&
                      el['deviceLocation']['networkgroup_name']
                        ? el['deviceLocation']['networkgroup_name']
                        : '-'
                    }`;
                  }
                });

                if (this.error) {
                  this.errorInfo = 'Invalid location co-ordinates (0,0)';
                }
              }
              // this.backUpMapData = [...this.mapData];
              // if(this.filtersForm.get('showOntNetOutage').value){

              //   this.showOnlyOntInternetOutage();

              // } else{

              if (!this.mapSet) {
                this.setMap();
                this.mapSet = true;
              } else {
                if (this.mapData.length > 0) {
                  this.loadMap();
                }
              }

              // canApplyOrRefresh again
              this.canCall = true;
              this.loading = false;
              // }
            },
            (err: HttpErrorResponse) => {
              this.canCall = true;
              this.error = true;
              this.loading = false;
              this.pageErrorHandle(err);
            }
          );
      }, 1000);
    }
  }
  // showOnlyOntInternetOutage(){
  //   this.mapData = this.backUpMapData.filter(el => el['outage'] == 'True');

  //   if (!this.mapSet) {
  //     this.setMap();
  //     this.mapSet = true;
  //   } else {
  //     if (this.mapData.length > 0) {
  //       this.loadMap();
  //     }
  //   }
  //   // canApplyOrRefresh again
  //   this.canCall = true;
  //   this.loading = false;
  // }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = 'Access Denied';
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.error = true;
  }
  clearFilter() {
    this.showFSAN = true;
    this.fsanvalid = true;
    this.locationDataArray = ['All'];
    this.systemDataArray = ['All'];
    this.selectedAlertTypes = 'All Alerts';
    this.tempSelectedAlertType = 'All';
    this.clickedRegion = undefined;
    this.clickedLocation = undefined;
    this.locationName = undefined;
    this.regionName = undefined;
    this.systemName = undefined;
    // this.modelNames = [];
    this.filtersForm.get('showOntNetOutage').enable({ emitEvent: false });
    this.filtersForm.get('showAllSystems').enable({ emitEvent: false });
    this.filtersForm.get('fsan_serialno').enable({ emitEvent: false });
    let alertTypes = [...this.alertTypes];
    alertTypes.forEach((element) => {
      element['disabled'] = false;
    });
    this.alertTypes = [...alertTypes];
    this.filtersForm.patchValue(
      {
        region: ['All'],
        location: ['All'],
        system: ['All'],
        modelNames: [],
        vendorId: 'All',
        fsan_serialno: '',
        device_type: 'ALL',
        showAllSystems: true,
        showOntNetOutage: false,
        searchInputText: '',
        alertType: 'ALL',
      },
      { emitEvent: false, onlySelf: true }
    );
    // this.filtersForm.get('showAllSystems').setValue(true, { emitEvent: false });
    // this.filtersForm.get('fsan_serialno').setValue('', { emitEvent: false });
    // this.filtersForm.get('showOntNetOutage').setValue(false, { emitEvent: false });
    this.setVendorModelToDefault();
    let params = this.filtersForm.value;

    // this.appliedParams = params;
    this.issueService.setGeomapAppliedFilters(params);
    this.getData();
  }

  setVendorModelToDefault() {
    this.MultiSelectComponent?.resetSearchFilter();
    this.showCountOfItems = false;
    this.modelNames = [...this.actualModelNames];
    this.filtersForm
      .get('modelNames')
      .setValue(this.actualModelNames.map((el) => el.model));
    this.vendorNames = [...this.actualvendorNames];
    this.filtersForm.get('vendorId').setValue('All');
  }
  setMap() {
    this.map = new Microsoft.Maps.Map('#geoViewIssue', {
      credentials: environment.BING_API_KEY,
      zoom: 1,
    });

    this.map.setView({
      mapTypeId: Microsoft.Maps.MapTypeId.road,
    });
    this.map.setOptions({
      showLogo: false,
      showLocateMeButton: false,
      // showDashboard: false,
      showMapTypeSelector: false,
      showCopyright: false,
      disableBirdseye: true,
      disableStreetside: false,
      showZoomButtons: true,
    });

    this.systemListTooltip = new Microsoft.Maps.Infobox(this.map.getCenter(), {
      visible: false,
    });
    this.systemListTooltip.setMap(this.map);

    this.tooltip = new Microsoft.Maps.Infobox(this.map.getCenter(), {
      visible: false,
      offset: new Microsoft.Maps.Point(10, -75)
    });
    this.tooltip.setMap(this.map);
    let that = this;
    Microsoft.Maps.Events.addHandler(that.map, 'click', function () {
      that.hideToolbox();
    });
    // Microsoft.Maps.registerModule('SpiderClusterManager', 'assets/js/SpiderClusterManager.js');
    if (that.mapData.length > 0) {
      that.loadMap();
    }
  }

  loadMap() {
    let that = this;
    this._that = this;
    var pins: any,
      clusterLayer,
      locs = [];

    // Microsoft.Maps.loadModule(['SpiderClusterManager'], () => {
    Microsoft.Maps.loadModule('Microsoft.Maps.Clustering', function () {
      pins = that.mapData;
      let icon = {};
      let locationsLen = pins.length;
      for (let i = 0; i < locationsLen; i++) {
        icon = that.createSpiderIcon(
          pins[i]['nonZeroSev']?.toLowerCase(),
          pins[i]['deviceType']?.toLowerCase()
        ); //flag
        let clusterPin = new Microsoft.Maps.Pushpin(
          new Microsoft.Maps.Location(
            pins[i]['latitude'],
            pins[i]['longitude']
          ),
          icon
        );

        clusterPin.metadata = pins[i];
        clusterPin['customId'] = pins[i]['deviceUuid'] + pins[i]['deviceName'];
        locs.push(
          new Microsoft.Maps.Location(pins[i]['latitude'], pins[i]['longitude'])
        );

        Microsoft.Maps.Events.addHandler(
          clusterPin,
          'mouseover',
          innerFnShowToolBox
        );
        // Microsoft.Maps.Events.addHandler(
        //   clusterPin,
        //   'click',
        //   pushpinClicked
        // );
        that.pushpinMouseOutHandler = Microsoft.Maps.Events.addHandler(
          clusterPin,
          'mouseout',
          innerFnhideToolbox
        );

        that.pins.push(clusterPin);
      }
      var bounds = Microsoft.Maps.LocationRect.fromLocations(locs);
      that.map.setView({ bounds: bounds, padding: 100 });
      clusterLayer = new Microsoft.Maps.ClusterLayer(that.pins, {
        clusteredPinCallback: createCustomClusteredPin,
        gridSize: 80,
        // clusteringEnabled : that.enableClustering
      });
      that.map.layers.insert(clusterLayer);

      if (that.reStoreMapViewDetails.mapCenterBound) {
        // && (that.locs != 0 || (that.locs == locs.length))
        let center = new Microsoft.Maps.Location(
          that.reStoreMapViewDetails.mapCenterBound.latitude,
          that.reStoreMapViewDetails.mapCenterBound.longitude
        );
        let bounds = new Microsoft.Maps.LocationRect(
          center,
          that.reStoreMapViewDetails.mapWidthBound,
          that.reStoreMapViewDetails.mapHeightBound
        );
        // let bounds = Microsoft.Maps.LocationRect.fromEdges(that.mapNorthBound, that.mapWestBound, that.mapSouthBound, that.mapEastBound)
        that.map.setView({ bounds: bounds });
        that.map.setView({ zoom: that.reStoreMapViewDetails.mapZoom });
      }

      function innerFnShowToolBox(e) {
        that.showToolbox(e);
      }

      function innerFnhideToolbox(e) {
        that.hideToolbox();
      }

      function createCustomClusteredPin(cluster) {
        if (
          that.clusters.findIndex(
            (el) => el['customId'] == cluster['customId']
          ) == -1 &&
          cluster.containedPushpins.length > 0
        ) {
          cluster['customId'] = cluster.containedPushpins[0].customId;
          that.clusters.push(cluster);
        }
        let clickedIndex = that.clusters.findIndex(
          (el) => el['customId'] == cluster['customId']
        );
        if (clickedIndex != -1 && that.clusters[clickedIndex]['lastClicked']) {
          cluster['lastClicked'] = true;
        }

        //Define variables for minimum cluster radius, and how wide the outline area of the circle should be.
        var minRadius = 12;
        var outlineWidth = 7;
        //Get the number of pushpins in the cluster
        var clusterSize = cluster.containedPushpins?.length;
        var fillColor = '#008cff';

        //find last aggregated cluster

        // if(cluster.containedPushpins.length >= 50){
        Microsoft.Maps.Events.addHandler(cluster, 'click', clusterClicked);
        // cluster._options.visible = false
        // }
        if (cluster.containedPushpins && cluster.containedPushpins.length > 0) {
          let initialGeometry = cluster.containedPushpins[0].geometry;
          let lastAggCluster = cluster.containedPushpins.every(
            (el) =>
              el['geometry']['x'] == initialGeometry['x'] &&
              el['geometry']['y'] == initialGeometry['y']
          );
          cluster.containedPushpins.forEach((element) => {
            element.changed.isPreviouslyInvoked = true;
          });

          if (lastAggCluster) {
            fillColor = 'purple';
          }
          console.log(lastAggCluster, 'lastAggCluster');
        }

        //Calculate the radius of the cluster based on the number of pushpins in the cluster, using a logarithmic scale.
        var radius = (Math.log(clusterSize) / Math.log(10)) * 3 + minRadius;

        //set outerring color
        let outerRingColor = '';
        if (fillColor == 'purple') {
          outerRingColor = '#ff00ff';
        } else {
          outerRingColor = '#003866';
        }
        //Default cluster color is red.
        var svg = [];
        if (cluster['lastClicked']) {
          outlineWidth = 4;
          svg = [
            '<svg xmlns="http://www.w3.org/2000/svg" width="',
            radius * 2,
            '" height="',
            radius * 2,
            '">',

            '<circle cx="',
            radius,
            '" cy="',
            radius,
            '" r="',
            radius,
            '" fill="',
            outerRingColor,
            '"/>',

            '<circle cx="',
            radius,
            '" cy="',
            radius,
            '" r="',
            radius - outlineWidth,
            '" fill="',
            fillColor,
            '"/>',

            '</svg>',
          ];
        } else {
          svg = [
            '<svg xmlns="http://www.w3.org/2000/svg" width="',
            radius * 2,
            '" height="',
            radius * 2,
            '">',

            '<circle cx="',
            radius,
            '" cy="',
            radius,
            '" r="',
            radius,
            '" fill="',
            fillColor,
            '"/>',

            '<circle cx="',
            radius,
            '" cy="',
            radius,
            '" r="',
            radius - outlineWidth,
            '" fill="',
            fillColor,
            '"/>',

            '</svg>',
          ];
        }
        //Customize the clustered pushpin using the generated SVG and anchor on its center.

        cluster.setOptions({
          icon: svg.join(''),

          anchor: new Microsoft.Maps.Point(radius, radius),

          textOffset: new Microsoft.Maps.Point(0, radius - 8), //Subtract 8 to compensate for height of text.
        });
      }
      function clusterClicked(e) {
        // if systems greater than 50 show list
        // that.spiderManager.hideSpiderCluster();
        // if (e.target.containedPushpins && e.target.containedPushpins.length >= 50) {
        that.hideToolbox('systemList');
        // if(that.clusters.findIndex(el => el['customId'] == e.target.customId) == -1 && e.target.containedPushpins.length > 0){

        // }
        let clickedClusterIndex = that.clusters.findIndex(
          (el) => el['customId'] == e.target.customId
        );

        that.clusters = [
          ...new Map(that.clusters.map((m) => [m.customId, m])).values(),
        ];
        that.clusters.forEach((cluster, index) => {
          cluster['lastClicked'] = false;
        });
        that.clusters.forEach((cluster, index) => {
          if (clickedClusterIndex == index) {
            cluster['lastClicked'] = true;
          }
          createCustomClusteredPin(cluster);
        });
        var minRadius = 12;
        var outlineWidth = 4;
        //Get the number of pushpins in the cluster
        var clusterSize = e.target.containedPushpins?.length;
        var fillColor = '#008cff';

        //find last aggregated cluster

        // if(e.target.containedPushpins.length >= 50){
        // Microsoft.Maps.Events.addHandler(cluster, 'click', clusterClicked);
        // cluster._options.visible = false
        // }
        if (
          e.target.containedPushpins &&
          e.target.containedPushpins.length > 0
        ) {
          let initialGeometry = e.target.containedPushpins[0].geometry;
          let lastAggCluster = e.target.containedPushpins.every(
            (el) =>
              el['geometry']['x'] == initialGeometry['x'] &&
              el['geometry']['y'] == initialGeometry['y']
          );
          if (lastAggCluster) {
            fillColor = 'purple';
          }
          console.log(lastAggCluster, 'lastAggCluster');
        }

        //set outerring color
        let outerRingColor = '';
        if (fillColor == 'purple') {
          outerRingColor = '#ff00ff';
        } else {
          outerRingColor = '#003866';
        }

        //Calculate the radius of the cluster based on the number of pushpins in the cluster, using a logarithmic scale.
        var radius = (Math.log(clusterSize) / Math.log(10)) * 3 + minRadius;

        var svg = [
          '<svg xmlns="http://www.w3.org/2000/svg" width="',
          radius * 2,
          '" height="',
          radius * 2,
          '">',

          '<circle cx="',
          radius,
          '" cy="',
          radius,
          '" r="',
          radius,
          '" fill="',
          outerRingColor,
          '"/>',

          '<circle cx="',
          radius,
          '" cy="',
          radius,
          '" r="',
          radius - outlineWidth,
          '" fill="',
          fillColor,
          '"/>',

          '</svg>',
        ];
        e.target.setOptions({
          icon: svg.join(''),

          anchor: new Microsoft.Maps.Point(radius, radius),

          textOffset: new Microsoft.Maps.Point(0, radius - 8), //Subtract 8 to compensate for height of text.
        });
        that.systemListData = {};
        that.loading = true;

        // var locs = [];
        let data = [];
        if (
          e.target.containedPushpins &&
          e.target.containedPushpins.length > 0
        ) {
          e.target.containedPushpins.forEach((el) => {
            data.push(el?.metadata);
          });
        }
        that.showSystemsList(e.location, data);
      }
    });
    that.locs = locs.length;
    that.endHandler = Microsoft.Maps.Events.addHandler(
      that.map,
      'viewchangeend',
      function () {
        highlight('mapViewChangEnd');
      }
    );

    function highlight(id) {
      //Highlight the div to indicate that the event has fired.
      let bounds = that.map.getBounds();
      if (id == 'mapViewChangEnd') {
        that.reStoreMapViewDetails.mapCenterBound = bounds.center;
        that.reStoreMapViewDetails.mapWidthBound = bounds.width;
        that.reStoreMapViewDetails.mapHeightBound = bounds.height;
        that.reStoreMapViewDetails.mapZoom = that.map.getZoom();
      }
    }
  }

  showSystemsList(location, listData) {
    // this.hideToolbox('systemList');
    this.systemListData = {};
    let geoFilters = this.issueService?.getGeomapAppliedFilters();
    if (geoFilters) {
      this.systemListData = geoFilters;
    }
    // this.removeElementsFromList(listData);
    listData.forEach((el) => {
      if(el['deviceType'] == 'ONT'){
        if(el['outage'] == 'True'){
          el['serviceDisruption'] = `Yes - ${el['outageAlarmName']}`;
        }else{
          el['serviceDisruption'] = 'No';
        }
      }
    })
    this.systemListData['listData'] = listData;
    this.systemListData['selectedAlertTypes'] = this.selectedAlertTypes;
    this.systemListData['reStoreMapViewDetails'] = this.reStoreMapViewDetails;

    //set header
    this.listHasAllOLT = listData.every(
      (el) => el['deviceType']?.toUpperCase() == 'OLT'
    );

    this.setListInfoBox = [...this.listInfoBox];
    if (this.listHasAllOLT) {
      this.setListInfoBox = this.listInfoBox.filter(
        (el) =>
          el['key'] != 'subscriberName' &&
          el['key'] != 'serviceDisruption'
      );
    }

    this.systemListData['listColumn'] = this.setListInfoBox;
    this.systemListData['listHasAllOLT'] = this.listHasAllOLT;

    setTimeout(() => {
      this.canShowSystemList = true;
      this.loading = false;
    }, 200);
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 500)
  }
  showToolbox(e) {
    this.systemInfoData = e.target.metadata;
    let counts = ['systemAlarmCount', 'transformedAlarmCount', 'cloudHealthCount', 'cloudConnectivityCount'];
    this.systemInfoData['NoOfAlerts'] = 0;
    counts.forEach((count) => {
      if(this.systemInfoData[count] && this.systemInfoData[count] > 0){
        this.systemInfoData['NoOfAlerts']++;
      }
    });

    this.hideToolbox();
    this.systemListData['reStoreMapViewDetails'] = this.reStoreMapViewDetails;
    this.systemListData = {};
    let geoFilters = this.issueService?.getGeomapAppliedFilters();
    if (geoFilters) {
      this.systemListData = geoFilters;
    }
    
    setTimeout(() => {
      let template = this.systemInfo['nativeElement'].innerHTML;
      template = template.replace('hide-modal', '');
      let Options = {
        location: e.target.getLocation(),
        htmlContent:
        template,
        visible: true,
        width: 500,
      };
      this.tooltip.setOptions(Options);
      this.repositionToolBox(e.target.getLocation(), this.tooltip);

      let deviceNameTag = document.getElementById('clickdeviceName');
      if (deviceNameTag) {
        this.renderer.listen(deviceNameTag, 'click', (event) => {
          this.homeGeomapService.redirectToPage(
            'deviceName',
            e.target.metadata,
            this.systemListData
          );
        });
      }

      let outageAlarmTag = document.getElementById('clickOutageAlarmName');
      if (outageAlarmTag) {
        this.renderer.listen(outageAlarmTag, 'click', (event) => {
          this.homeGeomapService.redirectToPage(
            'outageAlarmName',
            e.target.metadata,
            this.systemListData
          );
        });
      }

      this.clickNoOfAlarms.forEach((el) => {
        let systemData = {...e.target.metadata};
        let noOfAlarmsTag = document.getElementById(el['element']);
        if (noOfAlarmsTag) {
          this.renderer.listen(noOfAlarmsTag, 'click', (event) => {
            systemData = {...systemData, ...el};
            this.homeGeomapService.redirectToPage(
              'noOfAlarms',
              systemData,
              this.systemListData
            );
          });
        }
      })
      
    }, 200);
  }
  repositionToolBox(location, tooltip, type?) {
    let buffer = 15;
    let infoboxOffset = tooltip.getOffset();
    let infoboxAnchor = tooltip.getAnchor();
    let infoboxLocation = this.map.tryLocationToPixel(
      location,
      Microsoft.Maps.PixelReference.control
    );
    let dx = infoboxLocation['x'] + infoboxOffset['x'] - infoboxAnchor['x'];
    let dy = infoboxLocation.y - 15 - infoboxAnchor.y;
    if (dy < buffer) {
      //Infobox overlaps with top of map.
      //Offset in opposite direction.
      dy *= -1;
      //add buffer from the top edge of the map.
      dy += buffer;
    } else {
      //If dy is greater than zero than it does not overlap.
      dy = 0;
    }
    if (dx < buffer) {
      //Check to see if overlapping with left side of map.
      //Offset in opposite direction.
      dx *= -1;
      //add a buffer from the left edge of the map.
      dx += buffer;
    } else {
      //Check to see if overlapping with right side of map.
      dx =
        this.map.getWidth() -
        infoboxLocation.x +
        infoboxAnchor.x -
        tooltip.getWidth();
      //If dx is greater than zero then it does not overlap.
      if (dx > buffer) {
        dx = 0;
      } else {
        //add a buffer from the right edge of the map.
        dx -= buffer;
      }
    }
    //Adjust the map so infobox is in view
    if (type == 'showSystemsList') {
      // this.map.setView({ center: centerOffset });
      // this.map.setView({ zoom: this.map.getZoom() });
      // let center = {latitude: -28.040005914544835, longitude: -91.7605768435985, altitude: 0, altitudeReference: -1};
      // this.map.setView({
      //   // centerOffset: new Microsoft.Maps.Point(0, -214),
      //   center: center,
      // });
    }
    if (dx != 0 || dy != 0) {
      this.map.setView({
        centerOffset: new Microsoft.Maps.Point(dx, dy),
        center: this.map.getCenter(),
      });
    }
  }
  hideToolbox(toolbox?) {
    if (this.map) {
      this.clusters = [
        ...new Map(this.clusters.map((m) => [m.customId, m])).values(),
      ];
      this.clusters.forEach((cluster) => {
        cluster['lastClicked'] = false;
      });
      let center = this.map.getCenter();
      this.map.setView({
        // centerOffset: new Microsoft.Maps.Point(0, -214),
        center: {
          latitude: Number(center.latitude) + 0.00001,
          longitude: Number(center.longitude) + 0.00001,
        },
      });
    }

    if (toolbox == 'systemList') {
      if (this.systemListTooltip !== undefined) {
        this.systemListTooltip.setOptions({ visible: false });
        this.canShowSystemList = false;
      }
    } else {
      if (this.tooltip !== undefined) {
        this.tooltip.setOptions({ visible: false });
      }
      // if (this.systemListTooltip !== undefined) {
      //   this.systemListTooltip.setOptions({ visible: false });
      //   this.canShowSystemList = false;
      // }
    }
  }
  createSpiderIcon(issueType, deviceType) {
    let outlineWidth = 7;
    let radius = 9;
    //Default cluster color is red.
    // let fillColor = 'green';
    let svg = '';
    if (deviceType == 'ont') {
      if (issueType == 'critical') {
        svg = this.devicesIcons.circles.red;
      } else if (issueType == 'major') {
        svg = this.devicesIcons.circles.amber;
      } else if (issueType == 'minor') {
        svg = this.devicesIcons.circles.yellow;
      } else {
        svg = this.devicesIcons.circles.green;
      }
    } else if (deviceType == 'olt') {
      if (issueType == 'critical') {
        svg = this.devicesIcons.squares.red;
      } else if (issueType == 'major') {
        svg = this.devicesIcons.squares.amber;
      } else if (issueType == 'minor') {
        svg = this.devicesIcons.squares.yellow;
      } else {
        svg = this.devicesIcons.squares.green;
      }
    } else if (deviceType == 'asm') {
      if (issueType == 'critical') {
        svg = this.devicesIcons.diamonds.red;
      } else if (issueType == 'major') {
        svg = this.devicesIcons.diamonds.amber;
      } else if (issueType == 'minor') {
        svg = this.devicesIcons.diamonds.yellow;
      } else {
        svg = this.devicesIcons.diamonds.green;
      }
    }

    //Create a pushpin from the SVG and anchor it to the center of the circle.
    let svgIcon = {
      icon: svg,
      anchor: new Microsoft.Maps.Point(radius, radius),
      //text: devCount.toString(),
    };
    return svgIcon;
  }

  closeAlert() {
    this.error = false;
  }

  validateFSAN() {
    this.fsanvalid = true;
    if (
      this.filtersForm.get('fsan_serialno')?.value?.length !== 0 &&
      this.filtersForm.get('fsan_serialno')?.value?.length !== 12
    ) {
      this.fsanvalid = false;
    }
  }

  onAlarmGroupChange(value, type?) {
    //disable alertTypes 
    let alertTypes = [...this.alertTypes];
    alertTypes.forEach((element) => {
      if(value != 'ALL' && this.filtersForm.get('alertType').value == element['id'] && element['disableFor']?.includes(value)){
        this.filtersForm.get('alertType').setValue('ALL');
      }
      if(value == 'ONT' && element['disableFor']?.includes('ONT')){
        element['disabled'] = true;
      } else if(value == 'OLT' && element['disableFor']?.includes('OLT')){
        element['disabled'] = true;
      } else{
        element['disabled'] = false;
      }
    });
    this.alertTypes = [...alertTypes];
    if (value === 'OLT') {
      if (this.filtersForm.get('showOntNetOutage').value == true) {
        this.previousOntOutage = true;
        this.filtersForm.get('showOntNetOutage').setValue(false);
      }
      this.filtersForm.get('showOntNetOutage').disable({ emitEvent: false });
      this.filtersForm.get('fsan_serialno').disable({ emitEvent: false });
      this.filtersForm.get('fsan_serialno').setValue('');
      this.showFSAN = false;

      if (type == 'docChange') {
        this.setVendorModelToDefault();
      }
    } else {
      this.filtersForm.get('fsan_serialno').enable({ emitEvent: false });
      if (
        this.filtersForm.get('showOntNetOutage').value == false &&
        this.previousOntOutage
      ) {
        this.filtersForm.get('showOntNetOutage').setValue(true);
      }
      this.filtersForm.get('showOntNetOutage').enable({ emitEvent: false });
      this.showFSAN = true;

      if (type == 'docChange') {
        this.setVendorModelToDefault();
      }
    }
  }
  removespecialcharacter(event) {
    var key;
    key = event.keyCode; //key = event.charCode;
    return (
      (key > 47 && key < 58) ||
      (key > 64 && key < 91) ||
      (key > 96 && key < 123)
    );
  }

  refreshGeomap() {
    this.hideToolbox();
    setTimeout(() => {
      this.getData();
    }, 300);
  }
  gotoRealtime() {
    let existingParams = this.issueService.getGeomapAppliedFilters();
    existingParams['reStoreMapViewDetails'] = this.reStoreMapViewDetails;
    existingParams = { ...existingParams, ...existingParams };
    this.issueService.setGeomapAppliedFilters(existingParams);

    let url = `/cco/alerts/${this.filtersForm
      .get('alertType')
      .value.toLowerCase()}`;
    if (this.filtersForm.get('alertType').value.toLowerCase() == 'disruption') {
      url += '/list';
    }

    this.router.navigate([url], {
      state: { filters: this.issueService.getGeomapAppliedFilters() },
    });
    // const link = this.router.serializeUrl(
    //   this.router.createUrlTree([url], {
    //     queryParams: queryParams,
    //   })
    // );
    // window.open(link, '_blank');
  }

  //multiselect model names
  setModelNames(event: any) {
    if (event && event['selectedItems']) {
      this.filtersForm.get('modelNames').setValue(event['selectedItems']);
      this.loadVendorValues(event['selectedItems']);
    }
  }
  setModelNamesOnBlur(event: any) {
    if (
      event &&
      event['selectedItems'] &&
      event['selectedItems'].length == 0 &&
      !event?.event?.target?.checked
    ) {
      let vendors = this.filtersForm.get('vendorId').value;
      if (vendors != '' && vendors != 'All') {
        this.filtersForm
          .get('modelNames')
          .setValue(this.modelNames.map((el) => el.model));
      } else {
        this.filtersForm
          .get('modelNames')
          .setValue(this.actualModelNames.map((el) => el.model));
      }

      this.loadVendorValues(this.actualModelNames.map((el) => el.model));
    }
  }
  loadVendorValues(selectedModels) {
    let actualVendors = [...this.actualvendorNames];
    let appendVendors = [];
    if (selectedModels && selectedModels.length > 0) {
      selectedModels.forEach((items) => {
        let filteredVendors = actualVendors.filter((el) => {
          if (el && el.models && el.models.length > 0) {
            return el.models.findIndex((mod) => mod == items) != -1;
          }
          return false;
        });
        appendVendors = [...appendVendors, ...filteredVendors];
      });
    }
    appendVendors = [
      ...new Map(appendVendors.map((item) => [item['value'], item])).values(),
    ];
    this.vendorNames = ['All', ...appendVendors];
  }
  onSelectVendor(event: any, navModelNames?) {
    let vendors = this.filtersForm.get('vendorId').value;
    if (event === 'All') {
      if (!navModelNames) {
        this.vendorNames = [...this.actualvendorNames];
      }
      vendors = 'All';
      // this.modelNames = [...this.actualModelNames];
    } else {
      let index = vendors.indexOf('All');
      if (index > -1) {
        vendors.splice(index, 1);
      }
    }
    this.filtersForm.get('vendorId').setValue(vendors);
    this.loadModelValues(vendors, navModelNames);
  }
  loadModelValues(vendors, navModelNames?) {
    this.showCountOfItems = false;
    let selectedVendor = this.filtersForm.get('vendorId').value;
    if (selectedVendor && selectedVendor === 'All') {
      this.filtersForm.get('vendorId').setValue('All');
      this.modelNames = [...this.actualModelNames];
      // let selModels = this.filtersForm.get('modelNames').value;
      // if(this.modelNames.filter(el => selModels?.findIndex(mod => mod == el['model']) !== -1)?.map(el => el.model)?.length > 0){
      //   this.filtersForm.get('modelNames').setValue(this.modelNames.filter(el => selModels?.findIndex(mod => mod == el['model']) !== -1)?.map(el => el.model));
      // }else{
      if (navModelNames) {
        this.filtersForm.get('modelNames').setValue(navModelNames);
      } else {
        this.filtersForm.get('vendorId').setValue('All');
        this.filtersForm
          .get('modelNames')
          .setValue(this.modelNames.map((el) => el.model));
      }
      // }
    } else {
      let selModels = this.filtersForm.get('modelNames').value;
      this.modelNames = [
        ...this.actualModelNames.filter((el) => el['vendor'] == selectedVendor),
      ];

      if (this.modelNames.length != this.actualModelNames.length) {
        this.showCountOfItems = true;
      }
      if (
        this.modelNames
          .filter(
            (el) => selModels?.findIndex((mod) => mod == el['model']) !== -1
          )
          ?.map((el) => el.model)?.length > 0
      ) {
        this.filtersForm
          .get('modelNames')
          .setValue(
            this.modelNames
              .filter(
                (el) => selModels?.findIndex((mod) => mod == el['model']) !== -1
              )
              ?.map((el) => el.model)
          );
      } else {
        this.filtersForm
          .get('modelNames')
          .setValue(this.modelNames?.map((el) => el.model));
      }
    }
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
  onSelectAlertTypes(event) {
    this.tempSelectedAlertType = event.name;
    if (this.tempSelectedAlertType == 'Cloud Connectivity' || this.tempSelectedAlertType == 'Transform Alarms') {
      this.fsanvalid = true;
      this.filtersForm
        .get('fsan_serialno')
        .setValue('', { emitEvent: false });
      this.filtersForm.get('fsan_serialno').disable({ emitEvent: false });
    }else{
      this.filtersForm.get('fsan_serialno').enable({ emitEvent: false });
    }
  }
  redirectToPages(type, systemInfoData){
    this.homeGeomapService.redirectToPage(type,systemInfoData, this.systemListData)
  }
  ngOnDestroy() {
    if (!this.router?.url?.includes('current-issues')) {
      this.issueService.fromMapNavigation(false);
    }
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
}
