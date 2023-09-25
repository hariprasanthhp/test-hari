import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { MycommunityIqService } from 'src/app/sys-admin/services/mycommunity-iq.service';
import { environment } from 'src/environments/environment';
import { requestType } from '../../../model/files-list.model';
import { FileService } from '../../../services/files.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ExpectedConditions } from 'protractor';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';



@Component({
  selector: 'app-wrkflow-wizard-opr-parameters',
  templateUrl: './wrkflow-wizard-opr-parameters.component.html',
  styleUrls: ['./wrkflow-wizard-opr-parameters.component.scss']
})
export class WrkflowWizardOprParametersComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  @Input() workflowInputData
  @Input() editWorkflow
  @Output() workflowOprData: EventEmitter<any> = new EventEmitter();
  @Output() activeTab: EventEmitter<any> = new EventEmitter();

  orgId: number;
  language: any;
  languageSubject;
  dataAvailable: boolean;
  hotspotpasspoint: boolean;
  eduroam: boolean;
  dropdownPeriod = ['Bandwidth', 'Data Service', 'Video Service', 'Voice Service'];
  inputOperationType = [{ name: 'Configuration File Download', id: 'Configuration File Download' }, { name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'ProtectIQ Provision', id: 'ProtectIQ Provision' }, { name: 'ExperienceIQ Provision', id: 'ExperienceIQ Provision' }];
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
  Smartbizradiobutton: string = '';
  IQtemp = [];
  communityArr=[];
  passpointConfigenable: boolean = false;
  hotspotActivationObj = {
    "actionType": "myCommunityIQ Bulk Activation",
    "conditionLogic": "",
    "passpointConfig": {
      "enable": false,
      "communities": []
    },
    "eduroam": {
      "enable": false,
      "secret": "",
      "primaryServer": "",
      "secondaryServer": ""
    }
  }
  micrositeLoader: boolean;

  primaryServerPatternValidation() {
    return !(!this.hotspotActivationObj.eduroam.primaryServer || /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\])|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}[:](6553[0-4]|655[0-2][0-9]\d|65[0-4](\d){2}|6[0-4](\d){3}|[1-5](\d){4}|[1-9](\d){0,3})$/.test(this.hotspotActivationObj?.eduroam?.primaryServer));
  }
  secondaryServerPatternValidation() {
    return !(!this.hotspotActivationObj.eduroam.secondaryServer || /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\])|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}[:](6553[0-4]|655[0-2][0-9]\d|65[0-4](\d){2}|6[0-4](\d){3}|[1-5](\d){4}|[1-9](\d){0,3})$/.test(this.hotspotActivationObj?.eduroam?.secondaryServer));
  }
  showUnder: string;
  showRadiousError: boolean;
  radiousServerShoudNotMatchValidation(show?) {
    if (show) this.showUnder = show;
    this.showRadiousError = this.hotspotActivationObj.eduroam.enable && (/^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\])|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}[:](6553[0-4]|655[0-2][0-9]\d|65[0-4](\d){2}|6[0-4](\d){3}|[1-5](\d){4}|[1-9](\d){0,3})$/.test(this.hotspotActivationObj?.eduroam?.secondaryServer) && (this.hotspotActivationObj.eduroam.secondaryServer == this.hotspotActivationObj.eduroam.primaryServer))
  }
  activatedPasspoint: boolean = false;

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
  isDev: boolean;
  addBspsub: any;
  hidepwd: boolean = true;
  enableMyCommunity: boolean;
  enableSmartBiz: boolean;
  @Input() isNewwrkflw;
  showReordertbl: boolean = false;
  enableDone: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private customTranslateService: CustomTranslateService,
    private commonOrgService: CommonService,
    private api: NetopsServiceService, private router: Router,
    private CommonFunctionsService:CommonFunctionsService,
    private sso: SsoAuthService, private fileService: FileService, private communityService: MycommunityIqService, private dialogService: NgbModal
  ) {
    let entitlement = this.sso.getEntitlements();
    if (entitlement && (entitlement['214']?.apptype === 214 || entitlement['222']?.apptype === 222||entitlement['223']?.apptype === 223)) {
      this.enableMyCommunity = true;
    } else {
      this.enableMyCommunity = false;
    }

    if (entitlement && entitlement['218'] && entitlement['218'].apptype === 218) {
      this.enableSmartBiz = true;
    } else {
      this.enableSmartBiz = false;
    }

    this.orgId = this.sso.getOrgId();
    this.frTable = this.customTranslateService.fr;
    this.sysAdminRoute = environment.SYS_ADMIN_ROUTE;
  }
  removeUnwantedSpace(input,value){
    this[input] = this.CommonFunctionsService.trimSpaceFromNonObjectInputs(value)
  }
  workFlowEdit: any;
  ngOnInit(): void {

    let base = `${environment.API_BASE}`;
    let host = window.location.host;
    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.isDev = true;
    } else { this.isDev = false; }

    this.route.queryParams.subscribe((res) => {
      let passpointEnabled = this.workflowInputData.actions.findLastIndex((element) => element?.passpointConfig?.enable);
      let passpointDeactivated = this.workflowInputData.actions.findLastIndex((element) => (element?.passpointConfig) ? element?.passpointConfig?.enable == false : false);
      if (res['item']) {
        this.workFlowEdit = passpointEnabled > passpointDeactivated;
        this.hotspotpasspoint = true
        this.eduroam = true
      }
    })

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
        if(e.actionType === 'myCommunityIQ Bulk Activation' && this.enableMyCommunity){
          this.GetMicrosites()
        }
      });
    }
    if (this.router.url.includes('cco-foundation')) {
      this.oprTypeValueSelected = 'Download SW/FW Image'
      if (this.sso.getEntitlementsArr().indexOf('203') > -1 || this.sso.getEntitlementsArr().indexOf('204') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1) {
        if ((this.router.url.includes('cco-foundation') || this.router.url.includes('support') || this.router.url.includes('cco')) && this.enableMyCommunity) {
          // this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'ProtectIQ Provision', id: 'ProtectIQ Provision' }, { name: 'ExperienceIQ Provision', id: 'ExperienceIQ Provision' }, { name: 'myCommunityIQ Bulk Activation', id: 'myCommunityIQ Bulk Activation' }]
          this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
          
          this.addEiqPiqToList();
          this.inputOperationType.push({ name: 'myCommunityIQ Bulk Activation', id: 'myCommunityIQ Bulk Activation' });

        } else {
          // this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'ProtectIQ Provision', id: 'ProtectIQ Provision' }, { name: 'ExperienceIQ Provision', id: 'ExperienceIQ Provision' }]
          this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
          this.addEiqPiqToList();
        }

      } else {
        this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
      }

      this.optTypeValueChoose();
    } else {
      this.oprTypeValueSelected = 'Configuration File Download'
      this.optTypeValueChoose();
      if (this.sso.getEntitlementsArr().indexOf('203') > -1 || this.sso.getEntitlementsArr().indexOf('204') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1) {
        if (this.enableMyCommunity) {
          // this.inputOperationType = [{ name: 'Configuration File Download', id: 'Configuration File Download' }, { name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'ProtectIQ Provision', id: 'ProtectIQ Provision' }, { name: 'ExperienceIQ Provision', id: 'ExperienceIQ Provision' }, { name: 'myCommunityIQ Bulk Activation', id: 'myCommunityIQ Bulk Activation' }]
          this.inputOperationType = [{ name: 'Configuration File Download', id: 'Configuration File Download' }, { name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }];

          this.addEiqPiqToList();
          this.inputOperationType.push({ name: 'myCommunityIQ Bulk Activation', id: 'myCommunityIQ Bulk Activation' });
        
        } else {
          this.inputOperationType = [{ name: 'Configuration File Download', id: 'Configuration File Download' }, { name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
          this.addEiqPiqToList();
        }

      } else {
        if (this.enableMyCommunity) {
          this.inputOperationType = [{ name: 'Configuration File Download', id: 'Configuration File Download' }, { name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'myCommunityIQ Bulk Activation', id: 'myCommunityIQ Bulk Activation' }]
        } else {
          this.inputOperationType = [{ name: 'Configuration File Download', id: 'Configuration File Download' }, { name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
        }

      }
    }
    /********************** For CCL-54317(Adding SmartBiz Bulk Activation in Drop down) ****************************/
    if (this.sso.getEntitlementsArr().indexOf('218') > -1) {
      if ((this.router.url.includes('cco-foundation') || this.router.url.includes('support') || this.router.url.includes('cco')) && this.enableSmartBiz) {
        if (this.enableSmartBiz) {
          this.inputOperationType.push({ name: 'SmartBiz Bulk Activation', id: 'SmartBiz Bulk Activation' });
        }
      }
    }
    this.Smartbizradiobutton = 'Unsubscribed';
    this.checkSwCondition()

  }

  // for Adding PIQ and EIQ if Entitle element available...
  addEiqPiqToList(){
    if(this.sso.getEntitlementsArr().indexOf('205') > -1){

      this.inputOperationType.push({ name: 'ProtectIQ Provision', id: 'ProtectIQ Provision' }, { name: 'ExperienceIQ Provision', id: 'ExperienceIQ Provision' });

    }else{
      if(this.sso.getEntitlementsArr().indexOf('203') > -1 && this.sso.getEntitlementsArr().indexOf('204') > -1){

        this.inputOperationType.push({ name: 'ProtectIQ Provision', id: 'ProtectIQ Provision' }, { name: 'ExperienceIQ Provision', id: 'ExperienceIQ Provision' });

      }else if(this.sso.getEntitlementsArr().indexOf('203') > -1){

        this.inputOperationType.push({ name: 'ProtectIQ Provision', id: 'ProtectIQ Provision' });

      }else if(this.sso.getEntitlementsArr().indexOf('204') > -1){

        this.inputOperationType.push({ name: 'ExperienceIQ Provision', id: 'ExperienceIQ Provision' });

      }            
    }
  }
  GetMicrosites() {
    this.micrositeLoader = true;
    this.communityService.GetMicrosite().subscribe((res: any) => {
      this.communityArr = res ? res : [];
      this.communityArr = res ? res.filter(x => x.status === "READY") : [];
      this.communityArr.sort((a, b) => {
        return a.communityName.localeCompare(b.communityName);;
      });
      this.micrositeLoader = false;
    }, err => {
      this.micrositeLoader = false;
    })
  }
  drop(event: CdkDragDrop<string[]>) {
    if (true) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

  }
  filterUnwantedOption(list){
   return this.inputOperationType.filter(element=>{
      return !list.includes(element.name);
    })
  }

  removeOrAddUnwantedOptions() {
    let myCommunityIqAdded = this.workflowInputData.actions.some((element) => element.actionType === 'myCommunityIQ Bulk Activation');
    let EIQAdded = this.workflowInputData.actions.some((element) => element.actionType === 'ExperienceIQ Bulk Activation');
    let PIQAdded =  this.workflowInputData.actions.some((element) => element.actionType === 'ProtectIQ Bulk Activation');
    let arr = [];
    if(myCommunityIqAdded ){
       arr.push('ExperienceIQ Provision','ProtectIQ Provision');
    }
    if(EIQAdded){
      arr.push('ExperienceIQ Provision');
    }
    if(PIQAdded ){
      arr.push('ProtectIQ Provision')
    }
    this.inputOperationType = this.filterUnwantedOption(arr);
    if (this.sso.getEntitlementsArr().indexOf('203') > -1 || this.sso.getEntitlementsArr().indexOf('204') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1) {

      if ((this.sso.getEntitlementsArr().indexOf('205') > -1) && !myCommunityIqAdded&& !EIQAdded && !PIQAdded && 
      !this.inputOperationType.find((element) => element.name === 'ProtectIQ Provision' || element.name === 'ExperienceIQ Provision')) {
        this.inputOperationType.push({ name: 'ProtectIQ Provision', id: 'ProtectIQ Provision' }, { name: 'ExperienceIQ Provision', id: 'ExperienceIQ Provision' })
      }
      if ((this.sso.getEntitlementsArr().indexOf('204') > -1) && !EIQAdded &&!myCommunityIqAdded && 
      !this.inputOperationType.find((element) =>  element.name === 'ExperienceIQ Provision')) {
        this.inputOperationType.push({ name: 'ExperienceIQ Provision', id: 'ExperienceIQ Provision' })
      }
      if ((this.sso.getEntitlementsArr().indexOf('203') > -1) && !PIQAdded&&!myCommunityIqAdded && 
      !this.inputOperationType.find((element) => element.name === 'ProtectIQ Provision')) {
        this.inputOperationType.push({ name: 'ProtectIQ Provision', id: 'ProtectIQ Provision' })
      }
    }
    

  }
  CancelCommunities() {
    this.enableDone = false
    this.hotspotActivationObj.passpointConfig.communities = []
  }
  checkSwCondition() {
    if (this.workflowInputData) {
      for (let i = 0; i < this.workflowInputData.actions.length; i++) {
        if (this.workflowInputData.actions[i].actionType == "Download SW/FW Image" &&
          this.workflowInputData.execPolicy.initialTrigger?.type == "CPE Event" &&
          this.workflowInputData.state != "Suspended" && this.editWorkflow
        ) {
          this.actionType = this.workflowInputData.actions[0].actionType
          this.showEditButton = true;
          break;
        }
        if (this.workflowInputData.state == "Suspended" && this.editWorkflow) {
          this.showReordertbl = true;
        }
        this.showEditButton = false;
      }
    }
  }
  addCommunity(value?) {
    this.enableDone = true
    if (value) {
      value.dismiss('Cross Click')
    }
  }
  // setPasspointEnable() {
  //   for (let i = 0; i < this.workflowInputData?.actions?.length; i++) {
  //     if (this.workflowInputData?.actions[i].actionType == 'myCommunityIQ Bulk Activation') {
  //       this.activatedPasspoint = true;
  //       return this.workflowInputData?.actions[i].passpointConfig.enable;
  //     };
  //   };
  //   this.activatedPasspoint = false;
  //   return false;
  // }
  // setEduroam() {

  // }
  selectedCommunitiesWarnModal(modal) {
    this.dialogService.open(modal, { centered: true, windowClass: 'selected-communities-alert' });
  }
  newOprtnAdd(type: string, index?: number) {
    this.newOprtn = true;
    //  this.hotspotActivationObj.passpointConfig.enable = this.setPasspointEnable()
    //this.hotspotActivationObj.eduroam.enable=this.setEduroam()
    if (type === 'new') {
      this.operationCondition = ''
      this.categoryChoosed = 'Bandwidth'
      this.doneActive = false;
      this.actionType = '';
    }
    if (this.workflowInputData.groups.length) {
      if (this.workflowInputData.actions.length != 0 && this.workflowInputData.actions[0]?.actionType) {
        if (type === 'edit') {
          this.showEditButton = (this.workflowInputData.state != "Suspended" || this.workflowInputData.state == "Suspended") ? true : this.showEditButton;
          this.editIndex = index;
          this.oprTypeValueSelected = this.workflowInputData.actions[index]?.actionType;
          this.optTypeValueChoose();
        } else {
          this.oprTypeValueSelected = 'Download SW/FW Image'
          // this.oprTypeValueSelected = this.workflowInputData.actions[0].actionType;
          let indexOfES = this.workflowInputData.actions.findIndex(i => i.actionType === "Edge Suites Bulk Activation");
          if (this.router.url.includes('cco-foundation')) {
            this.oprTypeValueSelected = 'Download SW/FW Image'
            if ((this.sso.getEntitlementsArr().indexOf('203') > -1 || this.sso.getEntitlementsArr().indexOf('204') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1)) {
              if (this.router.url.includes('cco-foundation') && this.enableMyCommunity) {
                // this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'ProtectIQ Provision', id: 'ProtectIQ Provision' }, { name: 'ExperienceIQ Provision', id: 'ExperienceIQ Provision' }, { name: 'myCommunityIQ Bulk Activation', id: 'myCommunityIQ Bulk Activation' }]
                
                this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
                this.addEiqPiqToList();
                this.inputOperationType.push({ name: 'myCommunityIQ Bulk Activation', id: 'myCommunityIQ Bulk Activation' });
              
              } else {
                // this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'ProtectIQ Provision', id: 'ProtectIQ Provision' }, { name: 'ExperienceIQ Provision', id: 'ExperienceIQ Provision' }]
                this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
                this.addEiqPiqToList();
              
              }

            } else {
              if (this.router.url.includes('cco-foundation') && this.enableMyCommunity) {
                this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'myCommunityIQ Bulk Activation', id: 'myCommunityIQ Bulk Activation' }]
              } else {
                this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
              }

            }
          }
          let checkIf = this.inputOperationType.filter(res => res.name == 'SmartBiz Bulk Activation');
          (this.sso.getEntitlementsArr().indexOf('218') > -1 && this.enableSmartBiz && !checkIf.length) ? this.inputOperationType.push({ name: 'SmartBiz Bulk Activation', id: 'SmartBiz Bulk Activation' }) : '';

    if(this.workflowInputData.actions.some(element=> element.actionType == "SmartBiz Bulk Activation")) this.inputOperationType = this.inputOperationType.filter(element => element.name != 'SmartBiz Bulk Activation');
          this.optTypeValueChoose();
        }

      } else {
        let indexOfES = this.workflowInputData.actions.findIndex(i => i.actionType === "Edge Suites Bulk Activation");
        if (this.router.url.includes('cco-foundation')) {
          this.oprTypeValueSelected = 'Download SW/FW Image'
          if ((this.sso.getEntitlementsArr().indexOf('203') > -1 || this.sso.getEntitlementsArr().indexOf('204') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1)) {
            if (this.router.url.includes('cco-foundation') && this.enableMyCommunity) {
              // this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'ProtectIQ Provision', id: 'ProtectIQ Provision' }, { name: 'ExperienceIQ Provision', id: 'ExperienceIQ Provision' }, { name: 'myCommunityIQ Bulk Activation', id: 'myCommunityIQ Bulk Activation' }]
              this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
              this.addEiqPiqToList();
              this.inputOperationType.push({ name: 'myCommunityIQ Bulk Activation', id: 'myCommunityIQ Bulk Activation' });
            
            } else {
              // this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'ProtectIQ Provision', id: 'ProtectIQ Provision' }, { name: 'ExperienceIQ Provision', id: 'ExperienceIQ Provision' }]
              this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
              this.addEiqPiqToList();
            
            }

          } else {

            if (this.router.url.includes('cco-foundation') && this.enableMyCommunity) {
              this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'myCommunityIQ Bulk Activation', id: 'myCommunityIQ Bulk Activation' }]
            } else {
              this.inputOperationType = [{ name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
            }

          }
          this.optTypeValueChoose();
        } else {
          this.oprTypeValueSelected = 'Download SW/FW Image'
          // this.oprTypeValueSelected = 'Configuration File Download'
          if ((this.sso.getEntitlementsArr().indexOf('203') > -1 || this.sso.getEntitlementsArr().indexOf('204') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1)) {
            if (this.enableMyCommunity) {
              // this.inputOperationType = [{ name: 'Configuration File Download', id: 'Configuration File Download' }, { name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'ProtectIQ Provision', id: 'ProtectIQ Provision' }, { name: 'ExperienceIQ Provision', id: 'ExperienceIQ Provision' }, { name: 'myCommunityIQ Bulk Activation', id: 'myCommunityIQ Bulk Activation' }]
              this.inputOperationType = [{ name: 'Configuration File Download', id: 'Configuration File Download' }, { name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
              this.addEiqPiqToList();
              this.inputOperationType.push({ name: 'myCommunityIQ Bulk Activation', id: 'myCommunityIQ Bulk Activation' });
      
            } else {
              this.inputOperationType = [{ name: 'Configuration File Download', id: 'Configuration File Download' }, { name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
              this.addEiqPiqToList();
            
            }

          } else {
            if (this.enableMyCommunity) {
              this.inputOperationType = [{ name: 'Configuration File Download', id: 'Configuration File Download' }, { name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }, { name: 'myCommunityIQ Bulk Activation', id: 'myCommunityIQ Bulk Activation' }]
            } else {
              this.inputOperationType = [{ name: 'Configuration File Download', id: 'Configuration File Download' }, { name: 'Download SW/FW Image', id: 'Download SW/FW Image' }, { name: 'Reboot', id: 'Reboot' }, { name: 'Apply Configuration Profile', id: 'Apply Configuration Profile' }, { name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'Add to Static Device Group', id: "Add Static Device Group" }]
            }

          }
          this.optTypeValueChoose();
        }
      }
      let checkIf = this.inputOperationType.filter(res => res.name == 'SmartBiz Bulk Activation');
      (this.sso.getEntitlementsArr().indexOf('218') > -1 && this.enableSmartBiz && !checkIf.length) ? this.inputOperationType.push({ name: 'SmartBiz Bulk Activation', id: 'SmartBiz Bulk Activation' }) : '';
      if(this.workflowInputData.actions.some(element=> element.actionType == "SmartBiz Bulk Activation")) this.inputOperationType = this.inputOperationType.filter(element => element.name != 'SmartBiz Bulk Activation');

      // /********************** For CCL-54317(Adding SmartBiz Bulk Activation in Drop down) ****************************/
      // if (this.sso.getEntitlementsArr().indexOf('218') > -1) {
      //   if ((this.router.url.includes('cco-foundation') || this.router.url.includes('support') || this.router.url.includes('cco')) && this.enableSmartBiz) {
      //     if (this.enableSmartBiz) {
      //       this.inputOperationType.push({ name: 'SmartBiz Bulk Activation', id: 'SmartBiz Bulk Activation' });
      //     }
      //   }
      // }
    } else {
      let indexOfES = this.workflowInputData.actions.findIndex(i => i.actionType === "Edge Suites Bulk Activation");
      // this.oprTypeValueSelected = 'Download SW/FW Image'
      this.oprTypeValueSelected = 'Replace Service Profile'
      if ((this.sso.getEntitlementsArr().indexOf('203') > -1 || this.sso.getEntitlementsArr().indexOf('204') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1)) {
        if ((this.router.url.includes('cco-foundation') || this.router.url.includes('support') || this.router.url.includes('cco')) && this.enableMyCommunity) {
          // this.inputOperationType = [{ name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'ProtectIQ Provision', id: 'ProtectIQ Provision' }, { name: 'ExperienceIQ Provision', id: 'ExperienceIQ Provision' }, { name: 'myCommunityIQ Bulk Activation', id: 'myCommunityIQ Bulk Activation' }]
          this.inputOperationType = [{ name: 'Replace Service Profile', id: "Replace Service Profile" }]
          this.addEiqPiqToList();
          this.inputOperationType.push({ name: 'myCommunityIQ Bulk Activation', id: 'myCommunityIQ Bulk Activation' });
        
        } else {
          this.inputOperationType = [{ name: 'Replace Service Profile', id: "Replace Service Profile" }];
          this.addEiqPiqToList();

        }

      } else {
        if ((this.router.url.includes('cco-foundation') || this.router.url.includes('support') || this.router.url.includes('cco')) && this.enableMyCommunity) {
          this.inputOperationType = [{ name: 'Replace Service Profile', id: "Replace Service Profile" }, { name: 'myCommunityIQ Bulk Activation', id: 'myCommunityIQ Bulk Activation' }]
        } else {
          this.inputOperationType = [{ name: 'Replace Service Profile', id: "Replace Service Profile" }]
        }

      }

      if (this.workflowInputData.groups.length) {
        let checkIf = this.inputOperationType.filter(res => res.name == 'SmartBiz Bulk Activation');
        (this.sso.getEntitlementsArr().indexOf('218') > -1 && this.enableSmartBiz && !checkIf.length) ? this.inputOperationType.push({ name: 'SmartBiz Bulk Activation', id: 'SmartBiz Bulk Activation' }) : '';
        if (this.workflowInputData.actions.some(element => element.actionType == "SmartBiz Bulk Activation")) this.inputOperationType = this.inputOperationType.filter(element => element.name != 'SmartBiz Bulk Activation');
      }
      // /********************** For CCL-54317(Adding SmartBiz Bulk Activation in Drop down) ****************************/
      // if (this.sso.getEntitlementsArr().indexOf('218') > -1) {
      //   if ((this.router.url.includes('cco-foundation')) && this.enableSmartBiz) {
      //     if (this.enableSmartBiz) {
      //       this.inputOperationType.push({ name: 'SmartBiz Bulk Activation', id: 'SmartBiz Bulk Activation' });
      //     }
      //   }
      // }
      this.tableHeader = this.replaceService
      this.replaceProfile = true
      this.actionType = 'Replace Service Profile'
      this.getReplaceService(this.categoryChoosed)
      this.getConfigFile()
    }
    this.removeOrAddUnwantedOptions();
    this.Smartbizradiobutton = 'Unsubscribed';
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
    if (this.workflowInputData) {
      if (this.workflowInputData.source) delete this.workflowInputData.source;
    }
    this.doneActive = false;
    this.oprData = {}
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
      this.oprData = {};
    }
    // else if (this.oprTypeValueSelected === 'Edge Suites Provision') {
    //   this.IQtemp.length = 0;
    //   this.IQSuitesData.length = 0;
    //   this.tableHeader = this.commonHeader
    //   this.replaceProfile = false
    //   this.actionType = 'Edge Suites Bulk Activation'
    //   if (this.sso.getEntitlementsArr().indexOf('203') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1) {
    //     this.IQSuitesData.push({ _id: '2', name: 'ProtectIQ', checked: false, description: "ProtectIQ" });
    //   }
    //   if (this.sso.getEntitlementsArr().indexOf('204') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1) {
    //     this.IQSuitesData.push({ _id: '1', name: 'ExperienceIQ', checked: false, description: "ExperienceIQ" });
    //   }


    //   /*this.api.getIqSuites(this.orgId).subscribe((res: any) => {
    //     for (let key in res) {
    //       if( key=='subscribedToExperienceIq'&&res[key]){
    //         this.IQSuitesData.push({ _id: '1', name: 'ExperienceIQ', checked: false, description: "ExperienceIQ" })
    //       } else if(key=='subscribedToProtectIq'&&res[key]){
    //         this.IQSuitesData.push( { _id: '2', name: 'ProtectIQ', checked: false, description: "ProtectIQ" })
    //       }
    //     }
    //   })*/
    // }
    else if (this.oprTypeValueSelected === 'ExperienceIQ Provision') {
      this.IQtemp.length = 0;
      this.IQSuitesData.length = 0;
      this.tableHeader = this.commonHeader;
      this.replaceProfile = false;
      this.doneActive = true;
      this.actionType = 'ExperienceIQ Bulk Activation';

      if (this.sso.getEntitlementsArr().indexOf('204') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1) {
        this.IQSuitesData.push({ "actionType": "ExperienceIQ Bulk Activation", "bulkActivationConfig": { "subscribe": false, "enable": false }, name: 'ExperienceIQ', description: "ExperienceIQ" });
      }

    } else if (this.oprTypeValueSelected === 'ProtectIQ Provision') {
      this.IQtemp.length = 0;
      this.IQSuitesData.length = 0;
      this.tableHeader = this.commonHeader
      this.replaceProfile = false;
      this.doneActive = true;
      this.actionType = 'ProtectIQ Bulk Activation'
      if (this.sso.getEntitlementsArr().indexOf('203') > -1 || this.sso.getEntitlementsArr().indexOf('205') > -1) {
        this.IQSuitesData.push({ "actionType": "ProtectIQ Bulk Activation", "bulkActivationConfig": { "subscribe": false, "enable": false }, name: 'ProtectIQ', description: "ProtectIQ" });
      }

    } else if (this.oprTypeValueSelected === 'myCommunityIQ Bulk Activation') {
      this.actionType = 'myCommunityIQ Bulk Activation';
      this.GetMicrosites()
    } else if (this.oprTypeValueSelected === 'SmartBiz Bulk Activation') {
      this.actionType = 'SmartBiz Bulk Activation'
      this.doneActive = true
    }
    else {
      this.oprData = {}
      this.tableHeader = this.replaceService
      this.replaceProfile = true
      this.actionType = 'Replace Service Profile'
      this.getReplaceService(this.categoryChoosed)

    }
  }
  oprData: any = {}
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

      } else {
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
      // else if (this.actionType === 'ExperienceIQ Bulk Activation' || this.actionType === 'ProtectIQ Bulk Activation') {
      //   if (!value.bulkActivationConfig.subscribe && !value.bulkActivationConfig.enable) {
      //     this.doneActive = false;
      //   }
      // }
    }
  }

  // findObjIndex(nameKey, myArray) {
  //   for (var i = 0; i < myArray.length; i++) {
  //     if (myArray[i]._id === nameKey) {
  //       return i
  //     }
  //   }
  //   return -1
  // }

  go_next() {
    if (this.workflowInputData.actions.length > 0) {
      if (this.workflowInputData.levelPassed <= 3) {
        this.workflowInputData.levelPassed = 3;
      }
      this.workflowOprData.emit(this.workflowInputData)
      this.activeTab.emit('Select Schedule Parameters')
      return true;
    } else {
      this.error = true;
      this.errorInfo = 'Please add at least one operation.';
      return false;
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
  checkSubscribe(event, data) {
    if (event.target.checked) data.bulkActivationConfig.subscribe = true;
  }
  deleteWrkflw(data) {
    this.removeOrAddUnwantedOptions();
    this.Smartbizradiobutton = 'Unsubscribed';
    this.workflowInputData.actions.splice(data, 1)
  }
  getConfigFile() {
    this.loading=true
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
      this.loading = false;
    })
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = 'Access Denied';
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
    this.loading=true;
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
      this.loading = false;
    })
  }
  getConfigProfile() {
    this.loading=true
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
      this.loading = false;
    })
  }




  getStaticDevice() {
    this.loading=true
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
      this.loading = false;
    })
  }

  getReplaceService(category) {
    this.loading=true
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
      this.loading = false;
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
      this.loading = false;
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
  changeEduroam() {
    if (!this.eduroam) {
      this.hotspotActivationObj.eduroam.enable = false
    }
  }
  changePasspoint() {
    if (!this.hotspotpasspoint) {
      this.hotspotActivationObj.passpointConfig.enable = false
    }
  }
  doneClick(modal?) {


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
    if (this.actionType === 'myCommunityIQ Bulk Activation') {
      let data = Object.assign({}, this.hotspotActivationObj);
      if (this.workFlowEdit || this.hotspotActivationObj.passpointConfig.enable) {
        data.passpointConfig = Object.assign({}, this.hotspotActivationObj.passpointConfig);
        data.passpointConfig.communities = Object.assign([], this.hotspotActivationObj.passpointConfig.communities);
        data.passpointConfig.communities = data.passpointConfig.communities.map((element) => {
          return { micrositeId: element }
        });
        // if(!data.passpointConfig.communities.length){
        //   delete data.passpointConfig.communities
        // }
      } else if (this.hotspotpasspoint && !this.hotspotActivationObj.passpointConfig.enable) {
        data.passpointConfig
      } else if (!this.hotspotpasspoint) {
        this.hotspotActivationObj.passpointConfig.enable = false
        delete data.passpointConfig
      }

      if (this.hotspotActivationObj.eduroam.enable === true) {
        this.hotspotActivationObj.eduroam.enable = true
        if (this.hotspotActivationObj.eduroam.primaryServer === '' || this.hotspotActivationObj.eduroam.secret === '' || this.secondaryServerPatternValidation() || this.primaryServerPatternValidation()) {
          this.newOprtn = true
          return
        }
        data.eduroam = Object.assign({}, this.hotspotActivationObj.eduroam)
      } else if (this.eduroam && !this.hotspotActivationObj.eduroam.enable === true) {
        data.eduroam
      } else if (!this.eduroam) {
        this.hotspotActivationObj.eduroam.enable = false
        delete data.eduroam
      }


      (this.operationCondition) ? data.conditionLogic = this.operationCondition : delete data.conditionLogic;
      // if (this.duplicateCheck(data)){
      this.activatedPasspoint = true;
      this.workflowInputData.actions.push(data);
      //  }
      this.hotspotActivationObj = {
        "actionType": "myCommunityIQ Bulk Activation",
        "conditionLogic": "",
        "passpointConfig": {
          "enable": false,
          "communities": []
        },
        "eduroam": {
          "enable": false,
          "secret": "",
          "primaryServer": "",
          "secondaryServer": ""
        }
      }
      if (modal) {
        modal.dismiss('Cross Click')
      }
    }
     if (this.actionType === 'ExperienceIQ Bulk Activation' || this.actionType === 'ProtectIQ Bulk Activation') {
      this.doneActive = true;
      let value = Object.assign({}, this.IQSuitesData[0]);
      if (this.operationCondition) value['conditionLogic'] = this.operationCondition
      this.workflowInputData.actions.push(value)
    } 
    if (this.actionType === 'SmartBiz Bulk Activation') {
      let data = {}
      data['actionType'] = this.actionType;
      data['profileName'] = "SmartBiz: " + this.Smartbizradiobutton;
      if (this.operationCondition) {
        data['conditionLogic'] = this.operationCondition;
      };
      this.workflowInputData.actions.push(data)
    }

    if (Object.keys(this.oprData).length) {
      if (this.operationCondition) this.oprData['conditionLogic'] = this.operationCondition;
      if (this.showEditButton) {
        this.workflowInputData.actions[this.editIndex] = this.oprData;
        this.showEditButton = (this.workflowInputData.state == "Suspended" || this.isNewwrkflw) ? false : this.showEditButton;
      } else {
        this.workflowInputData.actions.push(this.oprData)
      }
    }
    if (this.oprTypeValueSelected === 'Apply Configuration Profile') this.getConfigProfile()
    if (this.oprTypeValueSelected === 'Configuration File Download') this.getConfigFile();
    if (this.oprTypeValueSelected === 'Download SW/FW Image') this.getSwImgFile();
    if (this.oprTypeValueSelected === 'Add Static Device Group') this.getStaticDevice()
    if (this.oprTypeValueSelected === 'Replace Service Profile') this.getReplaceService(this.categoryChoosed)
    if (this.oprTypeValueSelected === 'Replace Service Profile') this.getNewProfileData(this.categoryChoosed);
    this.removeOrAddUnwantedOptions();
  }
  showPass() {
    this.hidepwd = !this.hidepwd;
  }
  refreshHotspotActivation() {
    this.showEditButton = (this.workflowInputData.state == "Suspended" || this.isNewwrkflw) ? false : this.showEditButton;
    this.hotspotActivationObj = {
      "actionType": "myCommunityIQ Bulk Activation",
      "conditionLogic": "",
      "passpointConfig": {
        "enable": false,
        "communities": []
      },
      "eduroam": {
        "enable": false,
        "secret": "",
        "primaryServer": "",
        "secondaryServer": ""
      }
    }
  }

  showMicroSiteName(id) {
    for (let i = 0; i < this.communityArr?.length; i++) {
      if (this.communityArr[i].id == id) {
        return this.communityArr[i].communityName
      }
    }
  }
  removeCommunity() {
    if (!this.hotspotActivationObj?.passpointConfig?.enable) {
      this.hotspotActivationObj.passpointConfig.communities = [];
      this.doneActive = false;
    } else {
      this.doneActive = true;
    }

  }
  selectedCar: number;

  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  selectedVan: number;

  Vans = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

}
