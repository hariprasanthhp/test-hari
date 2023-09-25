import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { requestType } from '../../../model/files-list.model';
import { FileService } from '../../../services/files.service';
/* new imports */
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { IssueService } from 'src/app/cco/issues/service/issue.service';
/* new imports ends */

@Component({
  selector: 'app-alarm-wrkflow-wizard-opr-parameters',
  templateUrl: './wrkflow-alarm-wizard-opr-parameters.component.html',
  styleUrls: ['./wrkflow-alarm-wizard-opr-parameters.component.scss']
})
export class WrkflowAlarmWizardOprParametersComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  @Input() workflowInputData
  @Output() workflowOprData: EventEmitter<any> = new EventEmitter();
  @Output() activeTab: EventEmitter<any> = new EventEmitter();

  orgId: number;
  language: any;
  languageSubject;
  dataAvailable: boolean;
  inputLocations = [{ label: 'location1' }, { label: 'location2' }, { label: 'location3' }]
  dropdownPeriod = ['Bandwidth', 'Data Service', 'Video Service', 'Voice Service'];
  inputOperationType = [{ name: 'Configuration File Download', id: 'Configuration File Download' }, { name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'Edge Suites Provision', id: 'Edge Suites Provision' },];
  configFileDnwld = ['Name', 'Description', 'Software Version', 'Type']
  commonHeader = ['Name', 'Description']
  replaceService = ['Name', 'Description', 'Type']
  actionType = 'Download Configuration File'
  categoryChoosed = 'Bandwidth'
  tableHeader = []
  replaceProfile = false
  loading: boolean = true;
  isRerender = false;
  newOprtn = false
  doneActive = false
  newProfileShow = false
  header: any
  oprTypeValueSelected: any
  originalProfile: any
  NewProfile: any
  oldProData: any
  newProValue: any
  cofigFileData: any
  swFileData: any
  configProFileData: any
  staticDeviceData: any
  staticDeviceTable: any
  operationCondition: any
  selectedDevices = []
  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  IQtemp = [];

  tableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    dom: 't',
    ordering: false,
    columnDefs: [
      { targets: [1, 2, 3, 4], orderable: false },
      { targets: [0], orderable: true }
    ],
    order: [0, 'asc'],
    drawCallback: (settings) => {
      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find('#opr-table_last').addClass('disabled');
      }
    }
  };

  dtTrigger: Subject<any> = new Subject();
  frTable: any;

  getConfigFileSubscribe
  getReplaceServiceSubscribe
  getNewProfileSubscribe
  getSwImageSubscribe
  getConfigProfileSubscribe
  getStaticSubscribe
  sysAdminRoute: string = 'systemAdministration';
  doneClicked = false
  groupOfCategory = ["Service Attributes", "Services"];
  IQSuitesData = []
  showEditButton: boolean = false;
  editIndex: number;
  FromDate: any;
  /* new variables */
  filtersForm = this.fb.group({
    region: [''],
    location: [''],
    system: [''],
    duration: ['', [Validators.min(1)]],
    count: ['', [Validators.min(1)]],
    additionalParams: this.fb.array([this.createItem()]),
    startDate: [''],
    endDate: [''],
    SelectedAlarm: ['']
  });
  regionSelected: any;
  regionsDataArray = ["All"];
  locationSelected: any;
  locationDataArray = ["All"];
  systemSelected: any
  systemDataArray = ["All"]
  categories = [];
  Severity: any;
  baseUrl = `${environment.API_BASE_URL}analytics-engine/`;
  regionsSubject: any;
  ServiceAffecting = "Yes";
  ServiceImpacting = "Yes";
  regionName: any;
  locationName: any;
  systemName: any;
  clickedLocation: string;
  clickedRegion: string;
  clickedSystem = '';
  clickedSeverity;
  inputAlarms = [{ label: 'device_sync_failure' }, { label: 'post_i2c' }, { label: 'dhcp-server-detected' },]
  alarmValueSelected: any;
  maxDate = new Date();
  maxForStartDate = new Date();
  additionalParameters = [{ label: "Service Impacting" }, { label: "Service Affecting" }, { label: "Severity" }]
  paramList: FormArray;
  todayDate = new Date();
  /* new Variables ends */
  constructor(
    private translateService: TranslateService,
    private customTranslateService: CustomTranslateService,
    private commonOrgService: CommonService,
    private api: NetopsServiceService, private router: Router,
    private sso: SsoAuthService, private fileService: FileService,
    private fb: FormBuilder, private http: HttpClient,
    private dateUtilsService: DateUtilsService, private issueService: IssueService,
  ) {
    this.orgId = this.sso.getOrgId();
    this.frTable = this.customTranslateService.fr;
    this.sysAdminRoute = environment.SYS_ADMIN_ROUTE;
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.tableHeader = this.configFileDnwld;
    if (this.workflowInputData) {
      this.workflowInputData.actions.forEach(e => {
        if (e.actionType === 'Edge Suites Provision') {
          let obj = e;
          obj["actionType"] = "Edge Suites Bulk Activation";
        }
      });
    }
    if (this.router.url.includes('cco-foundation')) {
      this.oprTypeValueSelected = 'Download SW/FW Image'
      if (this.sso.getEntitlementsArr().indexOf('203') > -1 || this.sso.getEntitlementsArr().indexOf('204') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1) {
        this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'Edge Suites Provision', id: 'Edge Suites Provision' }]
      } else {
        this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
      }
      this.optTypeValueChoose();
    } else {
      this.oprTypeValueSelected = 'Configuration File Download'
      this.optTypeValueChoose();
      if (this.sso.getEntitlementsArr().indexOf('203') > -1 || this.sso.getEntitlementsArr().indexOf('204') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1) {
        this.inputOperationType = [{ name: 'Configuration File Download', id: 'Configuration File Download' }, { name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'Edge Suites Provision', id: 'Edge Suites Provision' }]
      } else {
        this.inputOperationType = [{ name: 'Configuration File Download', id: 'Configuration File Download' }, { name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
      }
    }
    this.checkSwCondition()
    /* new code */
    this.Severity = 'all';
    this.filtersForm.patchValue({
      region: ['All'],
      location: ['All'],
      system: ['All'],
      severity: ['All'],
    });
    this.initData();
    this.regionsApiLoader();
    this.getCategories();
    /* new code ends */
  }
  initData() {
    if (this.workflowInputData) {
      if (this.workflowInputData.region) {
        this.filtersForm.get('region').setValue(this.workflowInputData.region);
        this.loadLocationValue(this.workflowInputData.region);
      }
      if (this.workflowInputData.location) {
        this.filtersForm.get('location').setValue(this.workflowInputData.location);
        this.loadSystemValue(this.workflowInputData.location)
      } if (this.workflowInputData.system) {
        this.filtersForm.get('system').setValue(this.workflowInputData.system);
      } if (this.workflowInputData.count) {
        this.filtersForm.get('count').setValue(this.workflowInputData.count);
      }
      if (this.workflowInputData.duration) {
        this.filtersForm.get('duration').setValue(this.workflowInputData.duration);
      }
      if (this.workflowInputData.additionalParams.length != 0) {
        this.addAvailableSystems(this.workflowInputData.additionalParams);
        this.updateSelectedValues(this.workflowInputData.additionalParams);
      }
      if (this.workflowInputData.startDate) {
        this.filtersForm.get('startDate').setValue(new Date(this.workflowInputData.startDate));
      }
      if (this.workflowInputData.endDate) {
        this.filtersForm.get('endDate').setValue(new Date(this.workflowInputData.endDate));
      }
      if (this.workflowInputData.alarmName) {
        this.filtersForm.get('SelectedAlarm').setValue(this.workflowInputData.alarmName);
      }
    }
  }
  createItem(data?): FormGroup {
    return this.fb.group({
      Severity: data?.Severity || undefined,
      ServiceImpacting: data?.ServiceImpacting || undefined,
      ServiceAffecting: data?.ServiceAffecting || undefined
    });
  }
  updateSelectedValues(list) {
    list.forEach((e, i) => {
      if (e.Severity) {
        if (this.selectedAddParams[i]) {
          this.selectedAddParams[i] = this.selectedAddParams[i] + ",Severity"
        } else {
          this.selectedAddParams[i] = "Severity"
        }
      }
      if (e.ServiceImpacting) {
        if (this.selectedAddParams[i]) {
          this.selectedAddParams[i] = this.selectedAddParams[i] + ",Service Impacting"
        } else {
          this.selectedAddParams[i] = "Service Impacting"
        }
      }
      if (e.ServiceAffecting) {
        if (this.selectedAddParams[i]) {
          this.selectedAddParams[i] = this.selectedAddParams[i] + ",Service Affecting"
        } else {
          this.selectedAddParams[i] = "Service Affecting"
        }
      }
    });
  }
  removeSingleParams(ind, name) {
    let str = this.selectedAddParams[ind];
    let splitted = str.split(",");
    splitted = splitted.filter(val => val != name).join();
    this.selectedAddParams[ind] = splitted;
    if (name == "Severity") {
      ((this.filtersForm.get('additionalParams') as FormArray).at(ind) as FormGroup).get('Severity').patchValue(undefined);
    }
    if (name == "Service Impacting") {
      ((this.filtersForm.get('additionalParams') as FormArray).at(ind) as FormGroup).get('ServiceImpacting').patchValue(undefined);
    }
    if (name == "Service Affecting") {
      ((this.filtersForm.get('additionalParams') as FormArray).at(ind) as FormGroup).get('ServiceAffecting').patchValue(undefined);
    }
    /* let val = [];
    Object.keys(this.paramList.value).forEach(res=>{
      if( res == name  ){
          this.paramList.removeAt()
      }
    }) */
  }

  addAvailableSystems(list) {
    this.paramList = this.filtersForm.get('additionalParams') as FormArray;
    while (this.paramList.length !== 0) {
      this.paramList.removeAt(0)
    }
    list.forEach((e, i) => {
      this.paramList.push(this.createItem(e));
    });
  }
  removeAddParams(ind) {
    this.paramList.removeAt(ind);
    delete this.selectedAddParams[ind];
    this.selectedAddParams = this.selectedAddParams.filter(val => val)
    this.addAvailableSystems(this.paramList.value)
  }
  addParams() {
    this.paramList = this.filtersForm.get('additionalParams') as FormArray;
    this.paramList.push(this.createItem());
  }
  selectSystem(event: any) {
    let systemid = this.filtersForm.get('system').value;
    this.systemName = systemid

    if (systemid == 'All') {
      this.systemName = null;
    }
  }
  validateRegion(event: any) {
    let regions = this.filtersForm.get('region').value;

    if (event === 'All') {
      this.workflowInputData.regionName = "All"
      regions = ['All'];
    } else {
      this.workflowInputData.regionName = event.name
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
      this.workflowInputData.locationName = 'All'
      locations = ['All'];
    } else {
      this.workflowInputData.locationName = event.name
      let index = locations.indexOf('All');
      if (index > -1) {
        locations.splice(index, 1);
      }

    }

    this.filtersForm.get('location').setValue(locations);
    this.loadSystemValue('');

  }
  changeSeverity() {
    this.clickedSeverity = '';
  }
  validateSystem(event: any) {
    let systems = this.filtersForm.get('system').value;

    if (event === 'All') {
      this.workflowInputData.systemName = 'All'
      systems = ['All'];
    } else {
      this.workflowInputData.systemName = event.name
      let index = systems.indexOf('All');
      if (index > -1) {
        systems.splice(index, 1);
      }

    }

    this.filtersForm.get('system').setValue(systems);

  }
  addAdditionalParam(event) {
  }
  selectedAddParams = [];
  selectAdditionalParam(event, index) {
    if (this.selectedAddParams[index]) {
      let tempSelected = this.selectedAddParams[index]
      this.selectedAddParams[index] = tempSelected + ',' + event.label;
    } else {
      this.selectedAddParams[index] = event.label;
    }
  }
  loadSystemValue(event: any) {
    this.clickedLocation = '';
    let regionids = this.filtersForm.get('region').value;
    let locationids = this.filtersForm.get('location').value;
    this.systemSelected = ["All"];
    if (regionids.length && locationids.length && locationids.indexOf('All') === -1) {

      let regionQuery = '';

      regionids.forEach(element => {
        if (element == 'All') {
          return;
        }
        regionQuery += `&region=${element}`
      });

      let locationQuery = '';

      locationids.forEach(element => {
        if (element == 'All') {
          return;
        }
        locationQuery += `&location=${element}`
      });

      this.http.get(`${environment.API_BASE_URL}nfa/systems?tenant=0&org-id=${this.sso.getOrgId()}${regionQuery}${locationQuery}`)
        .subscribe((res: any) => {
          this.systemDataArray = res;
          this.systemDataArray.push("All");
        }, (error) => {
        });

      let locations = [];
      this.locationDataArray.forEach((element: any) => {

        if (locationids.indexOf(element['id']) !== -1) {
          locations.push(element.name);
        }

      });

      this.locationName = locations;
    } else {
      if (!locationids.length) {
        this.filtersForm.get('system').setValue(['All']);
        //this.filtersForm.get('location').setValue(['All']);
        this.locationName = null;
        this.systemName = null;
        this.systemDataArray = ["All"];
      }
    }

  }

  loadLocationValue(event: any) {
    this.clickedRegion = '';
    this.locationSelected = "All"
    this.systemSelected = "All"
    let ids = this.filtersForm.get('region').value;
    this.regionSelected = ids;
    if (this.regionSelected && this.regionSelected != ['All']) {
      let regionQuery = '';

      if (ids.length && ids !== ['All']) {
        if (ids.indexOf('All') !== -1) {
          this.regionName = null;
          this.locationName = null;
          this.systemName = null;
          this.locationDataArray = ["All"];
          this.systemDataArray = ["All"];
          return;
        }
        ids.forEach(element => {
          if (element == 'All') {
            return;
          }
          regionQuery += `&region=${element}`
        });

        this.http.get(`${environment.API_BASE_URL}nfa/locations?tenant=0&org-id=${this.sso.getOrgId()}${regionQuery}`)
          .subscribe((res: any) => {
            this.locationDataArray = res;
            this.locationDataArray.push("All");
          }, (error) => {
          });

        let regions = [];
        this.regionsDataArray.forEach((element: any) => {

          if (ids.indexOf(element['id']) !== -1) {
            regions.push(element.name);
          }

        });

        this.regionName = regions;
      } else {

        this.filtersForm.get('location').setValue(['All']);
        this.filtersForm.get('system').setValue(['All']);
        //this.filtersForm.get('region').setValue(['All']);
        this.regionName = null;
        this.locationName = null;
        this.systemName = null;
        this.locationDataArray = ["All"];
        this.systemDataArray = ["All"];
      }



    }

  }
  /* new code */
  regionsApiLoader() {
    this.regionSelected = 'All';
    this.locationSelected = "All";
    this.systemSelected = "All";
    this.regionsSubject = this.issueService.getRegions()
      .subscribe((res: any) => {
        res.sort();
        this.regionsDataArray = [...this.regionsDataArray, ...res];
      }, (error) => {
      })
  }
  getCategories() {

    let fields = this.filtersForm.value;

    let params = {
      //date: `${this.dateUtilsService.getUtCMilliSecByDateObj(fields['startDate'])},${this.dateUtilsService.getUtCMilliSecByDateObj(fields['endDate'], true)}`,
      historyReport: false,
    }

    /*  if (fields['startDate']) {
       if (!fields['endDate']) {
         fields['endDate'] = new Date();
       }
       params['date'] = `${this.dateUtilsService.getUtCMilliSecByDateObj(fields['startDate'])},${this.dateUtilsService.getUtCMilliSecByDateObj(fields['endDate'], true)}`;
     }
  */

    let query = "";
    for (var key in params) {

      if (params[key] == undefined || params[key] == "" || params[key] === []) {
        continue;
      }

      if (query != "") {
        query += "&";
      }

      query += key + "=" + encodeURIComponent(params[key]);

    }

    query += '&historyReport=false';

    this.http.get(`${this.baseUrl}category?${query}`).subscribe((json: any) => {
      let categories = [
        { id: "All", name: "All" }
      ];

      if (json) {
        json.forEach(element => {

          if (!element) {
            return;
          }

          categories.push({
            id: element,
            name: element
          })
        });
      }

      this.categories = categories;
    })
  }
  /* new code ends */
  checkSwCondition() {
    if (this.workflowInputData) {
      for (let i = 0; i < this.workflowInputData.actions.length; i++) {
        if (this.workflowInputData.actions[i].actionType == "Download SW/FW Image" &&
          this.workflowInputData.execPolicy.initialTrigger.type == "CPE Event" &&
          this.workflowInputData.state != "Suspended"
        ) {
          this.actionType = this.workflowInputData.actions[0].actionType
          this.showEditButton = true;
          break;
        }
        this.showEditButton = false;
      }
    }
  }
  newOprtnAdd(type: string, index?: number) {
    this.newOprtn = true;
    if (type === 'new') {
      this.operationCondition = ''
      this.categoryChoosed = 'Bandwidth'
      this.doneActive = false;
      this.actionType = '';
    }
    if (this.workflowInputData.groups.length) {
      if (this.workflowInputData.actions.length != 0 && this.workflowInputData.actions[0].actionType) {
        if (type === 'edit') {
          this.editIndex = index;
          this.oprTypeValueSelected = this.workflowInputData.actions[index].actionType;
          this.optTypeValueChoose();
        } else {
          this.oprTypeValueSelected = this.workflowInputData.actions[0].actionType
          let indexOfES = this.workflowInputData.actions.findIndex(i => i.actionType === "Edge Suites Bulk Activation");
          if (this.router.url.includes('cco-foundation')) {
            this.oprTypeValueSelected = 'Download SW/FW Image'
            if ((this.sso.getEntitlementsArr().indexOf('203') > -1 || this.sso.getEntitlementsArr().indexOf('204') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1)) {
              this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'Edge Suites Provision', id: 'Edge Suites Provision' }]
            } else {
              this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
            }
          }
          this.optTypeValueChoose();
        }
      } else {
        let indexOfES = this.workflowInputData.actions.findIndex(i => i.actionType === "Edge Suites Bulk Activation");
        if (this.router.url.includes('cco-foundation')) {
          this.oprTypeValueSelected = 'Download SW/FW Image'
          if ((this.sso.getEntitlementsArr().indexOf('203') > -1 || this.sso.getEntitlementsArr().indexOf('204') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1)) {
            this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'Edge Suites Provision', id: 'Edge Suites Provision' }]
          } else {
            this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
          }
          this.optTypeValueChoose();
        } else {
          this.oprTypeValueSelected = 'Configuration File Download'
          if ((this.sso.getEntitlementsArr().indexOf('203') > -1 || this.sso.getEntitlementsArr().indexOf('204') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1)) {
            this.inputOperationType = [{ name: 'Configuration File Download', id: 'Configuration File Download' }, { name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'Edge Suites Provision', id: 'Edge Suites Provision' }]
          } else {
            this.inputOperationType = [{ name: 'Configuration File Download', id: 'Configuration File Download' }, { name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
          }
          this.optTypeValueChoose();
        }
      }
    } else {
      let indexOfES = this.workflowInputData.actions.findIndex(i => i.actionType === "Edge Suites Bulk Activation");
      this.oprTypeValueSelected = 'Replace Service Profile'
      if ((this.sso.getEntitlementsArr().indexOf('203') > -1 || this.sso.getEntitlementsArr().indexOf('204') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1)) {
        this.inputOperationType = [{ name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Edge Suites Provision', id: 'Edge Suites Provision' }]
      } else {
        this.inputOperationType = [{ name: 'Replace Service Profile', id: "Replace Service Profile" }]
      }
      this.tableHeader = this.replaceService
      this.replaceProfile = true
      this.actionType = 'Replace Service Profile'
      this.getReplaceService(this.categoryChoosed)
      this.getConfigFile()
    }
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
    if (this.getConfigFileSubscribe) {
      this.getConfigFileSubscribe.unsubscribe()
    }
    if (this.getSwImageSubscribe) {
      this.getSwImageSubscribe.unsubscribe()
    }
    if (this.getConfigProfileSubscribe) {
      this.getConfigProfileSubscribe.unsubscribe()
    }
    if (this.getStaticSubscribe) {
      this.getStaticSubscribe.unsubscribe()
    }
    if (this.getReplaceServiceSubscribe) {
      this.getReplaceServiceSubscribe.unsubscribe()
    }
    if (this.getNewProfileSubscribe) {
      this.getNewProfileSubscribe.unsubscribe()
    }
  }

  setTableOptions(type?: string) {
    this.tableOptions = {
      pagingType: 'full_numbers',
      rowId: 'id',
      searching: false,
      lengthChange: false,
      paging: false,
      ordering: false,
      dom: 't',
      columnDefs: [
        { targets: [1, 2, 3, 4], orderable: false },
        { targets: [0], orderable: true }
      ],
      order: [0, 'asc'],
      drawCallback: (settings) => {
        let total = settings.aoData.length;
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#opr-table_last').addClass('disabled');
        }
      }
    };
    // this.tableLanguageOptions();
    if (type && type == 'language') {
      setTimeout(() => {
        this.rerender();
        setTimeout(() => {
          this.dataAvailable = true;
          this.loading = false;
        }, 100);
      }, 100);
    } else {
      setTimeout(() => {
        this.dataAvailable = true;
        // this.hideSearch();
        this.loading = false;
      }, 500);
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  // tableLanguageOptions() {
  //   if (localStorage.getItem('defaultLanguage') && localStorage.getItem('defaultLanguage') == 'fr') {
  //     this.tableOptions.language = this.frTable;
  //   } else if (localStorage.getItem('defaultLanguage') && localStorage.getItem('defaultLanguage') == 'en' && this.tableOptions.language) {
  //     delete this.tableOptions.language;
  //   }
  // }

  chooseCategory() {
    if (this.categoryChoosed === 'Data Service') {
      this.getReplaceService('Data Service')
      this.newProfileShow = false

    } else if (this.categoryChoosed === 'Voice Service') {
      this.getReplaceService('Voice Service')
      this.newProfileShow = false

    } else if (this.categoryChoosed === 'Video Service') {
      this.getReplaceService('Video Service')
      this.newProfileShow = false

    } else {
      this.getReplaceService('Bandwidth')
      this.newProfileShow = false

    }
  }

  optTypeValueChoose() {
    if (this.workflowInputData)
      if (this.workflowInputData.source) delete this.workflowInputData.source;
    if (this.oprTypeValueSelected === 'Configuration File Download') {
      this.tableHeader = this.configFileDnwld
      this.replaceProfile = false
      this.actionType = 'Download Configuration File'
      this.getConfigFile()
    }
    else if (this.oprTypeValueSelected === 'Download SW/FW Image') {
      this.tableHeader = this.commonHeader
      this.replaceProfile = false
      this.actionType = 'Download SW/FW Image'
      if (this.router.url.includes("/cco-foundation/foundation-operations/foundation-system-operation/workflows/workflow-wizard")) {
        this.workflowInputData.fullGroupExecute = true;
        this.workflowInputData.source = "Foundation";
      }
      this.getSwImgFile()
    }
    else if (this.oprTypeValueSelected === 'Apply Configuration Profile') {
      this.tableHeader = this.commonHeader
      this.replaceProfile = false
      this.actionType = 'Apply Configuration Profile'
      this.getConfigProfile()
    }
    else if (this.oprTypeValueSelected === 'Add Static Device Group') {
      this.tableHeader = this.commonHeader
      this.replaceProfile = false
      this.actionType = 'Add to Static Device Group'
      this.getStaticDevice()
    }
    else if (this.oprTypeValueSelected === 'Reboot') {
      this.actionType = 'Reboot'
      this.doneActive = true
      this.oprData = {}
    }
    else if (this.oprTypeValueSelected === 'Edge Suites Provision') {
      this.IQtemp.length = 0;
      this.IQSuitesData.length = 0;
      this.tableHeader = this.commonHeader
      this.replaceProfile = false
      this.actionType = 'Edge Suites Bulk Activation'
      if (this.sso.getEntitlementsArr().indexOf('203') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1) {
        this.IQSuitesData.push({ _id: '2', name: 'ProtectIQ', checked: false, description: "ProtectIQ" });
      }
      if (this.sso.getEntitlementsArr().indexOf('204') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1) {
        this.IQSuitesData.push({ _id: '1', name: 'ExperienceIQ', checked: false, description: "ExperienceIQ" });
      }


      /*this.api.getIqSuites(this.orgId).subscribe((res: any) => {
        for (let key in res) {
          if( key=='subscribedToExperienceIq'&&res[key]){
            this.IQSuitesData.push({ _id: '1', name: 'ExperienceIQ', checked: false, description: "ExperienceIQ" })
          } else if(key=='subscribedToProtectIq'&&res[key]){
            this.IQSuitesData.push( { _id: '2', name: 'ProtectIQ', checked: false, description: "ProtectIQ" })
          }
        }
      })*/
    }
    else {
      this.oprData = {}
      this.tableHeader = this.replaceService
      this.replaceProfile = true
      this.actionType = 'Replace Service Profile'
      this.getReplaceService(this.categoryChoosed)

    }
  }
  oprData = {}
  bindConfigData(event, value) {
    if (event.target.checked) {
      this.oprData = {}
      if (this.actionType === 'Add to Static Device Group') {
        this.doneActive = true
        let data = {}
        data['staticGroupId'] = value._id;
        data['actionType'] = this.actionType;
        data['profileName'] = value.name
        if (this.operationCondition) data['conditionLogic'] = this.operationCondition
        this.oprData = data
      }
      else if (this.actionType === 'Apply Configuration Profile') {
        this.doneActive = true
        let data = {}
        data['profileId'] = value._id;
        data['actionType'] = this.actionType;
        data['profileName'] = value.name
        if (this.operationCondition) data['conditionLogic'] = this.operationCondition
        this.oprData = data

      }
      else if (this.actionType === 'Edge Suites Bulk Activation') {
        this.doneActive = true
        let data = {}
        this.IQtemp.push(value.name);
        data['actionType'] = this.actionType;
        data['appType'] = this.IQtemp.join(',');
        if (this.router.url.includes("/cco-foundation")) {
          this.workflowInputData.source = "Foundation";
        }
        if (this.operationCondition) data['conditionLogic'] = this.operationCondition
        this.oprData = data

      }
      else {
        this.doneActive = true
        let data = {}
        data['fileId'] = value._id;
        data['actionType'] = this.actionType;
        data['profileName'] = value.name
        if (this.operationCondition) data['conditionLogic'] = this.operationCondition
        this.oprData = data
      }
    } else {
      if (this.actionType === 'Edge Suites Bulk Activation') {
        let indexVal = this.IQtemp.indexOf(value.name)
        if (indexVal != -1) {
          this.IQtemp.splice(indexVal, 1)
        }
        let data = {}
        data['actionType'] = this.actionType;
        data['appType'] = this.IQtemp.join(',');
        if (!data['appType']) {
          this.doneActive = false;
        }

        if (this.router.url.includes("/cco-foundation")) {
          this.workflowInputData.source = "Foundation";
        }
        if (this.operationCondition) data['conditionLogic'] = this.operationCondition
        this.oprData = data
      }
    }
  }

  findObjIndex(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i]._id === nameKey) {
        return i
      }
    }
    return -1
  }
  checkErrors(formGroup: FormGroup, errors: any = {}) {
    // IF not populated correctly - you could get aggregated FormGroup errors object
    let retrnVal = false;
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        errors[field] = control.errors;
      } else if (control instanceof FormGroup) {
        errors[field] = this.checkErrors(control);
      }
    });
    if (Object.keys(errors).length != 0) {
      Object.keys(errors).forEach(element => {
        if (errors[element] instanceof Object) {
          retrnVal = true
        }
      });
    }
    return retrnVal;
  }

  go_next() {
    if (this.workflowInputData.actions.length > 0) {
      if (this.workflowInputData.levelPassed <= 3) {
        this.workflowInputData.levelPassed = 3;
      }
      this.workflowOprData.emit(this.workflowInputData)
      this.activeTab.emit('Select Schedule Parameters')
      return true;
    } else {
      if (this.checkErrors(this.filtersForm)) {
        return
      }
      if (this.workflowInputData.levelPassed <= 3) {
        this.workflowInputData.levelPassed = 3;
      }
      this.workflowInputData.region = this.filtersForm.get('region').value
      this.workflowInputData.location = this.filtersForm.get('location').value
      this.workflowInputData.system = this.filtersForm.get('system').value
      this.workflowInputData.duration = this.filtersForm.get('duration').value
      this.workflowInputData.count = this.filtersForm.get('count').value
      this.workflowInputData.additionalParams = [];
      this.workflowInputData.additionalParams = this.filtersForm.get('additionalParams').value;
      if (this.filtersForm.get('startDate').value) {
        this.workflowInputData.startDate = new Date(this.filtersForm.get('startDate').value).toUTCString()
      }
      if (this.filtersForm.get('endDate').value) {
        this.workflowInputData.endDate = new Date(this.filtersForm.get('endDate').value).toUTCString()
      }
      this.workflowInputData.alarmName = this.filtersForm.get('SelectedAlarm').value
      this.workflowOprData.emit(this.workflowInputData)
      this.activeTab.emit('Select Schedule Parameters')
      return true;
    }

  }
  go_previous() {
    this.workflowOprData.emit(this.workflowInputData)
    if (this.router.url.endsWith("official-workflow-wizard")) {
      this.activeTab.emit('Start')
    } else {
      this.activeTab.emit('Select Device Groups')
    }
  }

  deleteWrkflw(data) {
    this.workflowInputData.actions.splice(data, 1)
    // let indexVal = this.findObjIndex(data,this.workflowInputData.actions)
    //     if(indexVal != -1){
    // this.workflowInputData.actions.splice(indexVal,1)
    //     }
  }
  getConfigFile() {
    this.getConfigFileSubscribe = this.api.getConfigFile(this.orgId, 'Configuration File').subscribe((res: any) => {
      if (res) {
        let selectedOper = []
        if (this.workflowInputData.actions) {
          this.workflowInputData.actions.forEach(element => {
            selectedOper.push(element.fileId)
          });
        }
        let optData = {}
        for (var i = 0; i < res.length; i++) {
          optData[res[i]._id] = res[i]
        }
        for (var j = 0; j < res.length; j++) {
          if (selectedOper.indexOf(res[j]._id) != -1) {
            delete optData[res[j]._id];
          }
        }
        this.cofigFileData = Object.values(optData)
        this.setTableOptions();
        if (this.isRerender) {
          this.rerender();
          this.isRerender = false;
        } else {
          this.dtTrigger.next();
        }
      }
    }, (err: HttpErrorResponse) => {
      this.setTableOptions();
      if (this.isRerender) {
        this.rerender();
        this.isRerender = false;
      } else {
        this.dtTrigger.next();
      }
      this.loading = false;
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    }, () => {
      //this.loading = false;
    })
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.sso.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }
  closeAlert() {
    this.error = false;
    this.success = false;
  }


  getSwImgFile() {
    this.getSwImageSubscribe = this.fileService.getSwFilesList(String(this.orgId), "", requestType.SW_FW_Image).subscribe((res: any) => {
      if (res) {
        let selectedOper = []
        if (this.workflowInputData.actions) {
          this.workflowInputData.actions.forEach(element => {
            selectedOper.push(element.fileId)
          });
        }
        let optData = {}
        for (var i = 0; i < res.length; i++) {
          optData[res[i]._id] = res[i]
        }
        for (var j = 0; j < res.length; j++) {
          if (selectedOper.indexOf(res[j]._id) != -1) {
            delete optData[res[j]._id];
          }
        }
        this.swFileData = Object.values(optData)
        this.setTableOptions();
        if (this.isRerender) {
          this.rerender();
          this.isRerender = false;
        } else {
          this.dtTrigger.next();
        }
      }
    }, (err: HttpErrorResponse) => {
      this.setTableOptions();
      if (this.isRerender) {
        this.rerender();
        this.isRerender = false;
      } else {
        this.dtTrigger.next();
      }
      this.loading = false;
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    }, () => {
      //this.loading = false;
    })
  }
  getConfigProfile() {
    this.getConfigProfileSubscribe = this.api.getConfigProfile(this.orgId).subscribe((res: any) => {
      if (res) {
        let selectedOper = []
        if (this.workflowInputData.actions) {
          this.workflowInputData.actions.forEach(element => {
            selectedOper.push(element.profileId)
          });
        }
        let optData = {}
        for (var i = 0; i < res.length; i++) {
          optData[res[i]._id] = res[i]
        }
        for (var j = 0; j < res.length; j++) {
          if (selectedOper.indexOf(res[j]._id) != -1) {
            delete optData[res[j]._id];
          }
        }
        this.configProFileData = Object.values(optData)
        this.configProFileData = this.configProFileData.filter(e => !e.innerProfileCategory)
        this.setTableOptions();
        if (this.isRerender) {
          this.rerender();
          this.isRerender = false;
        } else {
          this.dtTrigger.next();
        }
      }
    }, (err: HttpErrorResponse) => {
      this.setTableOptions();
      if (this.isRerender) {
        this.rerender();
        this.isRerender = false;
      } else {
        this.dtTrigger.next();
      }
      this.loading = false;
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    }, () => {
      //this.loading = false;
    })
  }




  getStaticDevice() {
    this.getStaticSubscribe = this.api.getStaticDevice(this.orgId).subscribe((res: any) => {
      if (res) {
        let selectedOper = []
        if (this.workflowInputData.actions) {
          this.workflowInputData.actions.forEach(element => {
            selectedOper.push(element.staticGroupId)
          });
        }
        let optData = {}
        for (var i = 0; i < res.length; i++) {
          optData[res[i]._id] = res[i]
        }
        for (var j = 0; j < res.length; j++) {
          if (selectedOper.indexOf(res[j]._id) != -1) {
            delete optData[res[j]._id];
          }
        }
        this.staticDeviceData = Object.values(optData)
        this.staticDeviceTable = this.staticDeviceData.filter(data => data.type === 'static')
        this.setTableOptions();
        if (this.isRerender) {
          this.rerender();
          this.isRerender = false;
        } else {
          this.dtTrigger.next();
        }
      }
    }, (err: HttpErrorResponse) => {
      this.setTableOptions();
      if (this.isRerender) {
        this.rerender();
        this.isRerender = false;
      } else {
        this.dtTrigger.next();
      }
      this.loading = false;
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    }, () => {
      //this.loading = false;
    })
  }

  getReplaceService(category) {
    this.loading = true;
    this.getReplaceServiceSubscribe = this.api.getReplaceService(this.orgId, category).subscribe((res: any) => {
      if (res) {
        let selectedOper = []
        if (this.workflowInputData.actions) {
          this.workflowInputData.actions.forEach(element => {
            selectedOper.push(element.profileId)
          });
        }
        let optData = {}
        for (var i = 0; i < res.length; i++) {
          optData[res[i].id] = res[i]
        }
        for (var j = 0; j < res.length; j++) {
          if (selectedOper.indexOf(res[j].id) != -1) {
            delete optData[res[j].id];
          }
        }
        this.originalProfile = Object.values(optData)
        this.setTableOptions();
        if (this.isRerender) {
          this.rerender();
          this.isRerender = false;
        } else {
          this.dtTrigger.next();
        }
      }
    }, (err: HttpErrorResponse) => {
      this.setTableOptions();
      if (this.isRerender) {
        this.rerender();
        this.isRerender = false;
      } else {
        this.dtTrigger.next();
      }
      this.loading = false;
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    }, () => {
      //this.loading = false;
    })
  }

  getNewProfileData(category, profileId?: string, mode?: string, framingType?: string, voicetype?: string) {
    this.loading = true;
    this.getNewProfileSubscribe = this.api.getReplaceService(this.orgId, category, profileId, mode, framingType, voicetype).subscribe((res: any) => {
      if (res) {
        let selectedOper = []
        if (this.workflowInputData.actions) {
          this.workflowInputData.actions.forEach(element => {
            selectedOper.push(element.replacedByProfileId)
          });
        }
        let optData = {}
        for (var i = 0; i < res.length; i++) {
          optData[res[i].id] = res[i]
        }
        for (var j = 0; j < res.length; j++) {
          if (selectedOper.indexOf(res[j].id) != -1) {
            delete optData[res[j].id];
          }
        }
        this.NewProfile = Object.values(optData)
        this.setTableOptions();
        this.newProfileShow = true
        if (this.isRerender) {
          this.rerender();
          this.isRerender = false;
        } else {
          this.dtTrigger.next();
        }
      }
    }, (err: HttpErrorResponse) => {
      this.setTableOptions();
      if (this.isRerender) {
        this.rerender();
        this.isRerender = false;
      } else {
        this.dtTrigger.next();
      }
      this.loading = false;
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    }, () => {
      //this.loading = false;
    })
  }

  bindReplaceData(event, value) {
    if (event.target.checked) {
      this.oldProData = value
      if (this.categoryChoosed === 'Data Service') {
        this.getNewProfileData('Data Service', value.id, value.mode, value.framingtype)

      } else if (this.categoryChoosed === 'Voice Service') {
        this.getNewProfileData('Voice Service', value.id, value.mode, null, value.voicetype)

      } else if (this.categoryChoosed === 'Video Service') {
        this.getNewProfileData('Video Service', value.id, value.mode)

      } else {
        this.getNewProfileData('Bandwidth', value.id, value.mode, value.framingtype)

      }
    }
  }

  bindReplaceNewData(event, value) {
    if (event.target.checked) {
      this.newProValue = value
      this.doneActive = true
    }
  }

  doneClick() {
    this.doneClicked = true
    this.newOprtn = false
    this.error = false
    if (this.actionType === 'Reboot') {
      let data = {}
      data['actionType'] = this.actionType;
      if (this.operationCondition) data['conditionLogic'] = this.operationCondition
      this.workflowInputData.actions.push(data)
    }
    if (this.actionType === 'Replace Service Profile') {
      let data = {}
      data['actionType'] = this.actionType;
      data['profileId'] = this.oldProData.id;
      data['replacedByProfileId'] = this.newProValue.id;
      data['profileName'] = this.oldProData.name + " is replaced by " + this.newProValue.name;
      if (this.operationCondition) data['conditionLogic'] = this.operationCondition
      this.workflowInputData.actions.push(data);

    }
    if (this.actionType === 'Download Official Image') {
      let data = {}
      data['actionType'] = this.actionType;
      this.workflowInputData.actions.push(data)
    }
    if (Object.keys(this.oprData).length) {
      if (this.operationCondition) this.oprData['conditionLogic'] = this.operationCondition;
      if (this.showEditButton) {
        this.workflowInputData.actions[this.editIndex] = this.oprData;
      } else {
        this.workflowInputData.actions.push(this.oprData)
      }
    }
    if (this.oprTypeValueSelected === 'Apply Configuration Profile') this.getConfigProfile()
    if (this.oprTypeValueSelected === 'Configuration File Download') this.getConfigFile();
    if (this.oprTypeValueSelected === 'Download SW/FW Image') this.getSwImgFile();
    if (this.oprTypeValueSelected === 'Add Static Device Group') this.getStaticDevice()
    if (this.oprTypeValueSelected === 'Replace Service Profile') this.getReplaceService(this.categoryChoosed)
    if (this.oprTypeValueSelected === 'Replace Service Profile') this.getNewProfileData(this.categoryChoosed)
  }
}
