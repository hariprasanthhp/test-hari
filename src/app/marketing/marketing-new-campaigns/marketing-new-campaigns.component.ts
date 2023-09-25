import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingCampaignsApiService } from '../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { MarketingCommonService } from '../shared/services/marketing-common.service';
import { MarketingCampaignChannelsApiService } from './shared/services/marketing-campaign-channels-api.service';
import { MarketingCampaignDefineApiService } from './shared/services/marketing-campaign-define-api.service';
import { Location } from '@angular/common'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarketingApiService } from 'src/app/marketing/shared/services/marketing-api.sevice';
import { downloadQSReports } from '../shared/services/qlik-connection.js';
import { downloadCSVSegmentFilters } from '../shared/services/qlik-connection.js';
import { environment } from 'src/environments/environment';
import { threadId } from 'worker_threads';
import { BehaviorSubject } from 'rxjs';
import { FaUtilsService } from 'src/app/support/support-traffic-reports/service/fa-utils.service';
import { Title } from '@angular/platform-browser';
import { MarketingCampaignsDeployComponent } from './marketing-campaigns-deploy/marketing-campaigns-deploy.component';
import { MarketingHomeApiService } from '../marketing-home/marketing-home-Apiservice';
import { MarketingExploreCommonService } from '../marketing-explore-data/basic/shared/services/explore-data-common.service';
@Component({
  selector: 'app-marketing-new-campaigns',
  templateUrl: './marketing-new-campaigns.component.html',
  styleUrls: ['./marketing-new-campaigns.component.scss']
})
export class MarketingNewCampaignsComponent implements OnInit, OnDestroy {
  @Input() defineData: any;
  active_tab: any = 'define'
  define_tab: boolean = true
  channel_tab: boolean
  deploy_tab: boolean
  result_tab: boolean
  define_complet: boolean
  channel_complet: boolean
  deploy_complet: boolean
  stage_One: boolean = false
  stage_Two: boolean = false
  stageOneComplete: boolean = false;
  saveClicked: boolean = false;
  language: any;
  languageSubject: any;
  errorMsg:any
  scopes: any;
  campaignData: any;
  campaignId: any;

  pageVisible: boolean = false;
  csvSelected: boolean;
  hubspotSelected: boolean;
  isSegmentClicked: boolean = false;

  mobileNotificationSelected: boolean;
  mailChimpSelected: boolean;
  faceBookSelected: boolean;
  constantSelected: boolean;
  deployCampaignClicked: boolean = false;
  deployPreviousClicked: boolean = false;
  csvDownloadOnly: boolean = false;
  isValid: boolean = false;
  campaignChannelsDataArray: any;
  followAction: boolean;
  followActions: boolean;
  // SUBJECT
  campaignDetailsSubject: any;
  campaignChannelSubject: any;
  savedSegmentSubject: any
  defineSuccessSubject: any;
  campaignStatusInfo: string;
  @ViewChild('sendCampaignModal', { static: true }) private sendCampaignModal: TemplateRef<any>;
  @ViewChild(MarketingCampaignsDeployComponent) MarketingCampaignsDeployComponent: MarketingCampaignsDeployComponent;
  hasScope: boolean = false
  csvSelect: any;
  hubspot: any;
  loading: boolean = false;
  selectedSegmentItemData: any;
  selectedSegmentedType: any;
  draftSegmentType: string;
  resetChannelSelctedData: boolean = false;
  dev: boolean = false
  enterKey: boolean = false;
triggeredCampaign:boolean = false
active:boolean = true
  definePostErrorMsg: any;
  definePostError: any;
  statusActive: boolean = false;
  isTsAvailable: boolean = false;
  tsError: boolean = false;
  pauseError: boolean = false;
  attributesStatusInfo: boolean = false;
  uploadData: boolean = false;
  cmcType: boolean = false;
  customFieldsuccess: boolean = false;
  deployedModalSelectedChannels: any;
  @HostListener('window:popstate', ['$event']) onClickBack(
    event: PopStateEvent
  ) {
    history.pushState(null, null, location.href);
  }
  constructor(
    private translateService: TranslateService,
    private marketingCampaignDefineApiService: MarketingCampaignDefineApiService,
    private marketingCampaignsApiService: MarketingCampaignsApiService,
    private marketingCampaignChannelsApiService: MarketingCampaignChannelsApiService,
    private route: ActivatedRoute,
    private marketingCommonService: MarketingCommonService,
    private location: Location,
    private dialogService: NgbModal,
    private router: Router,
    private titleService: Title,
    private marketingApiService: MarketingApiService,
    private cdref: ChangeDetectorRef,
    private marketingExploreCommonService: MarketingExploreCommonService
  ) {
    
    this.marketingCampaignDefineApiService.nextAllSubject();
    this.scopeAsssiner();
    sessionStorage.setItem('camp_edit', 'false')
    if (this.marketingCommonService.getCampaignID()) {
      sessionStorage.setItem('camp_filter_change', 'edit')
      this.editOrResultCheck(this.marketingCommonService.getCampaignID())
    } else {
      if (history.state.value) {
        this.campaignId = history.state.value;
        sessionStorage.setItem('camp_filter_change', 'edit')
        this.marketingCommonService.setCampaignID(this.campaignId);
        this.editOrResultCheck(this.marketingCommonService.getCampaignID())
      } else {
        this.pageVisible = true;
      }
    }
    let base = `${environment.API_BASE}`;
    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.dev = true
    } else {
      this.dev = false
    }
  }
  setTitle(){
    if (!this.campaignData && !this.triggeredCampaign) {
      this.titleService.setTitle(`${this.language["New Scheduled Campaign"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
    } else {
      this.titleService.setTitle(`${this.language["New Triggered Campaign"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
    }
  }
  ngOnInit(): void {
    
    this.triggeredCampaign = sessionStorage.getItem('triggered') ? true : false
    if ((this.scopes.campaignRead && this.scopes.campaignWrite)) {
      this.hasScope = true
    } else if ((!this.scopes.campaignRead && this.scopes.campaignWrite)) {
      this.hasScope = true
    } else {
      this.hasScope = false
    }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.setTitle()
    });
    this.setTitle()
    this.cdref.detectChanges();
    this.statusActive = (sessionStorage.getItem('StatusAct')!=null && sessionStorage.getItem('StatusAct')!=undefined) ? true : false
  }
  scopeAsssiner() {
    this.scopes = this.marketingCommonService.getCMCScopes();
  }
  editOrResultCheck(id) {
    this.getCampainDetails(id)

  }

  define(val: any, subStep?: any) {
    this.active_tab = val

    this.stage_One = false
    this.stage_Two = false
    this.stageOneComplete = false
    //  False all 
    this.define_tab = false;
    this.channel_tab = false;
    this.deploy_tab = false;
    this.result_tab = false;
    this.define_complet = false
    this.channel_complet = false
    this.deploy_complet = false
    if (val == 'define') {
      this.isValid = false;
      this.define_tab = true;
    } else if (val == 'channel') {
     // this.isValid = this.deployPreviousClicked === true ? false : true;
      // this.isValid = false
      this.channelNextButtonValidation()
      this.resetChannelSelctedData = false;
      this.channel_tab = true
      this.define_complet = true
    } else if (val == 'deploy') {
    
      this.deployPreviousClicked = false;
      this.deploy_tab = true;
      this.define_complet = true
      this.channel_complet = true
      this.stage_One = true
      this.stage_Two = true
      if (subStep) {
        this.stageOneComplete = false;
      } else {
        this.stageOneComplete = false
      }
    } else if (val == 'result') {
      this.stageOneComplete = true
      this.define_complet = true
      this.channel_complet = true
      this.deploy_complet = true
      this.result_tab = true;
    }
  }

  previous(activeTab) {
    switch (activeTab) {
      case 'channel':
        this.resetChannelSelctedData = true;
        this.isSegmentClicked = false;
        this.deployPreviousClicked = false;
        this.define('define');
        sessionStorage.setItem('camp_filter_change', 'prev')
        //  this.getCampainDetails(sessionStorage.getItem('camp_flow_id'))
        // this.marketingCampaignDefineApiService.defineNextEventTrigger();
        if (this.defineSuccessSubject) {
          this.defineSuccessSubject.unsubscribe();
        }
        this.defineSuccessSubject = this.marketingCampaignDefineApiService.defineSuccessEmitterSubject.subscribe(res => {
          //   if (!save) {
          this.define('channel');
          setTimeout(() => {
            this.campaignData = this.marketingCampaignDefineApiService.getDefineDataEmitter();
            this.getSetCampaign(this.campaignData.name)
            this.clearAll();
          }, 3000);
          //   }
        })
        break;
      case 'deploy':
        if (this.stageOneComplete) {
          this.define('deploy');
        } else {
          this.deployPreviousClicked = true;
          this.define('channel');
        }
        break;
      case 'result':
        this.define('deploy', 1);
        // this.define('deploy');
        break;
      default:
        break;
    }
  }
  next(activeTab) {
    switch (activeTab) {
      case 'define':
        this.resetChannelSelctedData = true;
        //this.isValid = true;
        this.defineTriggerApiLoader()
        sessionStorage.setItem('camp_filter_change', 'next')
        break;
      case 'channel':
        this.deployPreviousClicked = false;
        this.channelTriggerApiLoader();
        break;
      case 'deploy':
        this.deploy('deploy');
        break;
      default:
        break;
    }
  }
  randomClickTab(tabName) {
    // let deployMode = this.active_tab == 'deploy'
    switch (this.active_tab) {
      case 'define':
        this.resetChannelSelctedData = true;
        // this.deployPreviousClicked = false;
        if (!this.stageOneComplete) {
          // this.channelNextButtonValidation();
          this.define(tabName)
        }
        break;
      case 'channel':
        this.resetChannelSelctedData = true;
        this.isValid = false;
        this.deployPreviousClicked = false;
        this.isSegmentClicked = false;
        if (!this.stageOneComplete) {
          this.define(tabName)
        }
        break;
      case 'deploy':
        if (!this.stageOneComplete) {
          this.deployPreviousClicked = true;
          // this.deployTriggerApiLoader(tabName)
          this.define(tabName)
        }
        break;
      case 'result':
        break;
      default:
        break;
    }

  }
  // csvDownload() {
  //   debugger;
  //   let app = this.marketingApiService.getQlikConnectedApp();
  //   downloadQSReports(app, 'CSV Download')
  //   setTimeout(() => {
  //     this.stageOneComplete = true;
  //     this.nextEventTrigger(false);
  //     this.dialogService.dismissAll();
  //   }, 2000);

  // }
  deploy(activeTab) {
    this.marketingCampaignsApiService.getDeplyValidation(false);
    let definedData = this.marketingCampaignDefineApiService.getDefineDataEmitter()
    this.getSetCampaign(definedData.name)
    // this.deployCampaignValidation = false;
    this.deployCampaignClicked = false;
    // this.nextEventTrigger(false);
    // console.log(definedData.campaignType == 'Triggered' && (definedData.eventType == 'Service Limit Hit'))
    if (this.mobileNotificationSelected) {
      this.deployCampaignClicked = true;
      this.marketingCampaignsApiService.getDeplyValidation(true);
    }
    else{
      this.deployCampaignClicked = true;
      if(definedData.campaignType != 'Triggered'){
this.deployValidation(true);
      }
      
      // console.log('enter2')
    }
  }
  // deployCampaign() {
  //    this.marketingCampaignDefineApiService.csvDownloadSelectSubject.subscribe(csvSelectedData =>{
  //   this.csvSelect = csvSelectedData;
  //  })
  //   //  sessionStorage.getItem('SelectedCSV');
  //   debugger;
  //   if(this.csvSelect){
  //   this.csvDownload();
  //   }

  // this.nextEventTrigger(false);
  // this.dialogService.dismissAll();
  // sessionStorage.clear();

  // localStorage.removeItem(csvSelect);
  // }
  // this.nextEventTrigger(false);
  // this.dialogService.dismissAll();


  // deployCampaign() {
  //   let csvSelect = sessionStorage.getItem('SelectedCSV');
  //   debugger;
  //   if (csvSelect === 'true') {
  //     this.csvDownload();
  //   } else {
  //     this.stageOneComplete = true;
  //     this.nextEventTrigger(false);
  //     this.dialogService.dismissAll();
  //     // localStorage.removeItem(csvSelect);
  //     // sessionStorage.clear();
  //   }
  // }
  deployCampaign() {
    if (this.csvSelected && this.deployCampaignClicked) {
      let app = this.marketingApiService.getQlikConnectedApp();
      this.defineData = this.marketingCampaignDefineApiService.getDefineDataEmitter();
      this.getSetCampaign(this.defineData.name)
        if(this.cmcType){
          this.getTsCSCdownload(this.defineData.campaignId)
        }
    
      
      // let filter
      // if (this.defineData.segmentCategory == 'Recommended') {
      //   filter = {
      //     region: this.defineData.region != '' ? this.defineData.region : 'All',
      //     location: this.defineData.location != '' ? this.defineData.location : 'All',
      //     servicegrp: this.defineData.service != '' ? this.defineData.service : 'All',
      //     zipcode: (this.defineData.zipcode != null && this.defineData.zipcode.length > 0) ? this.defineData.zipcode.join(';') : '',
      //   }
      // } else {
      //   filter = {}
      // }
      // downloadCSVSegmentFilters(this.defineData.segmentId, this.defineData.segmentCategory, filter, app)

      // downloadQSReports(app, 'CSV Download')
    }

    this.nextEventTrigger(false);
    this.deployCampaignClicked = false;

    this.dialogService.dismissAll();
  }
  csvDownload() {
    let tsDataAvailable:boolean = sessionStorage.getItem('TSAVAIL') == 'true' ? true : false;
    // if(tsDataAvailable){
      // this.defineData = this.marketingCampaignDefineApiService.getDefineDataEmitter();
      // this.getTsCSCdownload(this.defineData.campaignId)

    // }else{
    // let app = this.marketingApiService.getQlikConnectedApp();
    var edit_avail = sessionStorage.getItem('camp_edit')
    this.defineData = this.marketingCampaignDefineApiService.getDefineDataEmitter();
    this.getTsCSCdownload(this.defineData.campaignId)
    // if (edit_avail == 'true') {

    //   let filter
    //   if (sessionStorage.getItem('camp_segment_type') == 'Recommended') {
    //     filter = {
    //       region: sessionStorage.getItem('camp_region'),
    //       location: sessionStorage.getItem('camp_location'),
    //       servicegrp: sessionStorage.getItem('camp_service')
    //     }
    //   } else {
    //     filter = {}
    //   }

    //   downloadCSVSegmentFilters(sessionStorage.getItem('camp_segment_id'), sessionStorage.getItem('camp_segment_type'), filter, app)

    // } else {
    //   this.defineData = this.marketingCampaignDefineApiService.getDefineDataEmitter();

    //   let filter
    //   if (this.defineData.segmentCategory == 'Recommended') {

    //     filter = {
    //       region: this.defineData.region != '' ? this.defineData.region : 'All',
    //       location: this.defineData.location != '' ? this.defineData.location : 'All',
    //       servicegrp: this.defineData.service != '' ? this.defineData.service : 'All',
    //     }
    //   } else {
    //     filter = {}
    //   }

    //   downloadCSVSegmentFilters(this.defineData.segmentId, this.defineData.segmentCategory, filter, app)

    // }

  //   downloadQSReports(app, 'CSV Download')
  // }

  }
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.enterKey) {
      this.deployCampaign();
      this.enterKey = false;
    }
    this.enterKey = false;
  }
  deployValidation(event) {
    // this.deployCampaignClicked = false;
    if (event) {
      this.deployHeaderMessage();
      this.dialogService.open(this.sendCampaignModal, { backdrop: 'static', keyboard: false, size: 'lg', centered: true, windowClass: 'custom-modal' });
      this.enterKey = true;
    }
  }
  closeModal() {
    this.marketingCampaignsApiService.getDeplyValidation(false);
    this.deployCampaignClicked = false;
    this.dialogService.dismissAll();
    this.enterKey = false;
  }
  defineTriggerApiLoader(tabName?: any) {

    if (tabName && this.active_tab != 'define') {
     this.randomClickTab(tabName)
    } else {
      this.nextEventTrigger(false);
    }
  }
  channelTriggerApiLoader(tabName?: any) {
    if (!this.stageOneComplete && this.active_tab != 'deploy') {
      this.nextEventTrigger(false);
    }
  }
  deployTriggerApiLoader(tabName) {
    this.nextEventTrigger(false);
  }
  deploy2ndTriggerApiLoader(tabName, next?: any) {
    this.nextEventTrigger(false);
    if (next) {
      this.getResults(tabName)
    }
  }
  getTsCSCdownload(id){
    let downloadDataObject = this.marketingCampaignChannelsApiService.downloadCSVTS(id);
      this.marketingApiService.getDownloadFileContentTS(downloadDataObject.downloadURL).subscribe(res => {
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    }, (error: any) => {
    
        if(error.status == 500){
        this.tsError = true;
        this.errorMsg = this.language['internalServerError']
        }else if(error.status == 409){
          this.tsError = true;
          this.errorMsg = 'Prospect Campaign not Supported'
        }else if(error.status == 404){
          this.tsError = true;
          this.errorMsg = 'No Contacts for this campaign'
        }else{
          this.tsError = false; 
        }
      
    });
  }
getSetCampaign(campaignName){
  this.marketingCampaignDefineApiService.campaignSubject.next(campaignName);
}

  getCampainDetails(id) {
    if (this.scopes.campaignRead) {
      this.campaignDetailsSubject = this.marketingCampaignsApiService.CampaignDetailGET(id).subscribe((res: any) => {
       
        this.marketingCampaignDefineApiService.setDefineDataEmitter(res);
        this.campaignStatusInfo = res.status;
        this.marketingCampaignDefineApiService.campaignSubject.next(res.name);
        sessionStorage.setItem('segment_status', res.segmentCategory)
        this.marketingCampaignDefineApiService.segmentSelectSubject.next(res.segmentName);
        this.marketingCampaignDefineApiService.eventTypeSubject.next(res.eventType);
        this.active = (res.status == 'Active' || res.status == 'Paused') ? false :true
       // console.log(res.status,'=======')
        let datas : any = res.campaignType == 'Triggered' ? sessionStorage.setItem('triggered','new') : sessionStorage.removeItem('triggered')
        if (res.status != 'Draft' && res.status != 'Active' && res.status != 'Paused') {
         // console.log('1','res======')
          this.pageVisible = true;
          this.define('result')
          this.getResults('result')
        } else {
          this.pageVisible = true;
          if (!this.scopes.campaignWrite) {
            this.define('result')
            this.getResults('result')
          } else {
          //  console.log('3','res======')
            if(res.status == 'Active' && this.statusActive){
              this.define('result')
              this.getResults('result')
            }else{
            this.define('define')
            }
          }
        }
        this.campaignData = res;
        sessionStorage.setItem('camp_edit', 'true')
        sessionStorage.setItem('camp_segment_id', res.segmentId)
        sessionStorage.setItem('camp_segment_type', res.segmentCategory)
        if (res.region != '') {
          sessionStorage.setItem('camp_region', res.region)
        } else {
          sessionStorage.setItem('camp_region', 'All')
        }
        if (res.location != '') {
          sessionStorage.setItem('camp_location', res.location)
        } else {
          sessionStorage.setItem('camp_location', 'All')
        }
        if (res.service != '') {
          sessionStorage.setItem('camp_service', res.service)
        } else {
          sessionStorage.setItem('camp_service', 'All')
        }
        if (res.propensity != '') {
          sessionStorage.setItem('camp_propensity', res.propensity)
        } else {
          sessionStorage.setItem('camp_propensity', 'All')
        }

        this.campaignChannelSubject = this.marketingCampaignChannelsApiService.CampaignChannelByOrgGET(res.campaignId)
          .subscribe((res: any) => {
            if (res && res.status) {
              this.defineErrorMsgAssigner(res)
              this.marketingCampaignDefineApiService.setCampaignChannelDataEmitter(undefined);
            } else {

              this.marketingCampaignDefineApiService.setCampaignChannelDataEmitter(res);
            }
          })
      },
        (error) => {
          this.defineErrorMsgAssigner(error)
        })
    }
  }

  getResults(tabName) {
    this.marketingCampaignDefineApiService.deploy2ndNextEventTrigger();
    if (this.define_complet && this.channel_complet) {
      this.define(tabName)
    }
  }
  nextEventTrigger(save?: boolean) {
    setTimeout(() => {
      this.campaignData = this.marketingCampaignDefineApiService.getDefineDataEmitter();
     // this.getSetCampaign(this.campaignData.name)
    }, 2000);
 
   // console.log(this.statusActive,sessionStorage.getItem('StatusAct'))
    if (!this.campaignData || this.campaignData && (this.campaignData.status == 'Draft' || this.campaignData.status == 'Active'||this.campaignData.status == 'Paused')) {
      if (this.active_tab == 'define') {
        this.marketingCampaignDefineApiService.defineNextEventTrigger();
        if (this.defineSuccessSubject) {
          this.defineSuccessSubject.unsubscribe();
        }
        this.defineSuccessSubject = this.marketingCampaignDefineApiService.defineSuccessEmitterSubject.subscribe(res => {
      
          if (!save && this.active) {
          console.log(!save && this.active)
            this.define('channel');
            setTimeout(() => {
              this.campaignData = this.marketingCampaignDefineApiService.getDefineDataEmitter();
              this.getSetCampaign(this.campaignData.name)
              this.clearAll();
            }, 3000);
          }
          else if(!this.active && !save){
              this.define('result', 1);
              this.stageOneComplete = true;
              this.marketingCampaignDefineApiService.deploy2ndNextEventTrigger();
              setTimeout(() => {
                this.campaignData = this.marketingCampaignDefineApiService.getDefineDataEmitter();
                this.getSetCampaign(this.campaignData.name)
                this.clearAll();
              }, 3000);
        } else if(this.active && save) {
          this.campaignData = this.marketingCampaignDefineApiService.getDefineDataEmitter();
        }
        })
      } else if (this.active_tab == 'channel') {
        this.marketingCampaignDefineApiService.channelNextEventTrigger(!save ? true : false);
        if (this.defineSuccessSubject) {
          this.defineSuccessSubject.unsubscribe();
        }
        this.defineSuccessSubject = this.marketingCampaignDefineApiService.defineSuccessEmitterSubject.subscribe(res => {
          this.defineData = this.marketingCampaignDefineApiService.getDefineDataEmitter();
          this.getSetCampaign(this.defineData.name)
          if (this.defineData && this.defineData.status == 'In-Progress') {
            this.define('deploy', 1);
            // this.define('deploy');
          } else {
            if (!save) {
              this.define('deploy');
            }
          }
        })
      } else if (this.active_tab == 'deploy') {
        if (!this.stageOneComplete) {
          this.marketingCampaignDefineApiService.deployNextEventTrigger(!save ? true : false);
          if (this.defineSuccessSubject) {
            this.defineSuccessSubject.unsubscribe();
          }
          if (this.csvSelected && !this.constantSelected && !this.faceBookSelected && !this.hubspotSelected && !this.mobileNotificationSelected && !this.mailChimpSelected) {
            var definePostObject = this.marketingCampaignDefineApiService.getDefineDataEmitter();
            this.getSetCampaign(definePostObject.name)
            definePostObject.status = (definePostObject.campaignType == 'Triggered') ? 'Active':"In-Progress"
            this.marketingCampaignsApiService.CampaignPUT(definePostObject)
              .subscribe((res: any) => {
                this.define('result', 1);
                this.stageOneComplete = true;
                this.marketingCampaignDefineApiService.deploy2ndNextEventTrigger();
              }, (error) => {
                this.stageOneComplete = false;
              })
            // this.stageOneComplete = true;
            // this.marketingCampaignDefineApiService.deploy2ndNextEventTrigger();
          }
          else {
            this.defineSuccessSubject = this.marketingCampaignDefineApiService.defineSuccessEmitterSubject.subscribe(res => {
              // !save &&this.marketingCampaignDefineApiService.getCsvDataEmitter()
              let definedData = this.marketingCampaignDefineApiService.getDefineDataEmitter()
              this.getSetCampaign(definedData.name)
              if (definedData.csvDownloadOnly) {
                this.define('result', 1);
                this.stageOneComplete = true;
                this.marketingCampaignDefineApiService.deploy2ndNextEventTrigger();
              } else {
                this.getResults('result')
                this.stageOneComplete = true;
              }
              // if (!this.marketingCampaignDefineApiService.getCsvDataEmitter()) {
              //   this.getResults('result')
              // }
            })
          }


        } else {
          if (this.marketingCampaignDefineApiService.getCsvDataEmitter() && !this.marketingCampaignDefineApiService.getCampaignChannelDataEmitter()) {
            this.deploy2ndTriggerApiLoader('result');
            if (!save) {
              this.getResults('result')
            }
          } else {
            this.getResults('result')
          }
        }
      }
    } else {
      if (this.active_tab == 'deploy') {
        if (!save) {
          // this.deploy2ndTriggerApiLoader('result');
          this.getResults('result')
        }
      }
    }
  }
  csvSelectData(event) {
    this.csvSelected = event;
    this.channelNextButtonValidation();
  }

  channelSelectData(event) {
    this.mobileNotificationSelected = event.mobileNotifivationSelect;
    this.mailChimpSelected = event.mailChimpSelect;
    this.faceBookSelected = event.faceBookSelect;
    this.hubspotSelected = event.hubspotSelect;
    this.constantSelected = event.constantSelect;
   //console.log(this.mobileNotificationSelected ,this.mailChimpSelected,this.faceBookSelected,this.hubspotSelected,this.constantSelected )
    this.campaignChannelsDataArray = event.campaignChannelsDataArray;
    this.channelNextButtonValidation();

  }
  resetChannelData() {
    this.mobileNotificationSelected = false;
    this.mailChimpSelected = false;
    this.faceBookSelected = false;
    this.hubspotSelected = false;
    this.constantSelected = false;
    this.csvSelected = false;
  }
  channelNextButtonValidation() {
    if (this.mobileNotificationSelected) {
      this.isValid = this.mobileNotificationSelected === true ? false : true;
    } else if (this.mailChimpSelected) {
      this.isValid = this.mailChimpSelected === true ? false : true;
    } else if (this.faceBookSelected) {
      this.isValid = this.faceBookSelected === true ? false : true;
    } else if (this.csvSelected) {
      this.isValid = this.csvSelected === true ? false : true;
    } else if (this.hubspotSelected) {
      this.isValid = this.hubspotSelected === true ? false : true;
    }
    else if (this.constantSelected) {
      this.isValid = this.constantSelected === true ? false : true;
    } else {
      this.isValid = true;
    }
  }
  csvDownloadValue(event) {
    this.csvDownloadOnly = event;
  }
  campaignStatus(event) {
    this.campaignStatusInfo = event;
  }
  attributesStatus(event) {
    this.attributesStatusInfo = event;
  }
  customFieldSuccess(event){
this.customFieldsuccess = event
  if(!this.cmcType && !this.triggeredCampaign && this.csvSelected){
  this.getTsCSCdownload(this.defineData.campaignId)
  }
  }
  nextButtonValidation(event) {
    if (this.active_tab == "channel" && this.isSegmentClicked) {
      this.isValid = true;
    }
  }
  segmentClicked(event) {
    this.isSegmentClicked = event;
  }
  defineDataValidation(event) {
    if (event) {
      this.isValid = false;
    }
  }
  refreshClick() {
    var btn = document.getElementById('serviceDataRefresh');
    btn.children[0].classList.add('spin-animation');
    this.marketingCampaignDefineApiService.deploy2ndNextEventTrigger();
    setTimeout(function () {
      btn.children[0].classList.remove('spin-animation');
    }, 1000);
    this.tsError = false
  }
  saveAnyTime() {
    this.nextEventTrigger(true)
  }
  selectedSegmentItem(event) {
    this.selectedSegmentItemData = event;
    this.selectedSegmentedType = event.segmentType;
    if(this.selectedSegmentedType == 'Upload'){
      let name = event.segmentName
      let segmentname = name.substring(name.lastIndexOf("_")+1)
      this.uploadData = segmentname == 'Prospects' ? true : false
    }else{
      this.uploadData = false
    }
    this.cmcType = (this.selectedSegmentedType == 'Acquisition' || this.uploadData) ? true : false;
  }
  deployHeaderMessage() {
    let count = 0;

    if (this.mobileNotificationSelected) {
      count++;
    }
    if (this.mailChimpSelected) {
      count++;
    }
    if (this.csvSelected) {
      count++;
    }
    if (this.faceBookSelected) {
      count++
    }
    if (this.constantSelected) {
      count++
    }
    if (this.hubspotSelected) {
      count++
    }
    if (count > 1) {
      this.followAction = false;
      this.followActions = true;
    } else {
      this.followAction = true;
      this.followActions = false;
    }
  }
  clearAll() {
    this.marketingCampaignDefineApiService.clearCampaignDataEmitter(this.active_tab)

  }
  clearClose() {
    this.router.navigate(['/engagement/engagement-channel'])
  }

  back(): void {
    this.stage_One = false
    this.stage_Two = false
    this.stageOneComplete = false
    //  False all 
    this.define_tab = false;
    this.channel_tab = false;
    this.deploy_tab = false;
    this.result_tab = false;
    this.define_complet = false
    this.channel_complet = false
    this.deploy_complet = false
    this.location.back()
  }
  errorReset() {
    this.definePostError = false;
  }
  defineErrorMsgAssigner(error) {
    // if (error.status == 404) {
    //   this.definePostErrorMsg = this.language.URLnotFoungError;
    //   this.definePostError = true;
    //   return;

    // } else 
    if (error.status == 504 || error.status == 502) {
      this.definePostErrorMsg = this.language.timeoutErrorError;
      this.definePostError = true;
      return;
    }
    else if (error.status == 409) {
      this.definePostErrorMsg = this.language.same_campaign;
      this.definePostError = true;
      return;
    }
    else if (error.status == 500) {

      if (error.message == "OK") {
        this.definePostErrorMsg = this.language.internalServerError;
        this.definePostError = true;
      }
      else {
        this.definePostErrorMsg = this.language.internalServerError;
        this.definePostError = true;
      }
      return;
    }
    else if (error.status == 400) {

      if (error.errorMessage == "OK") {
        this.definePostErrorMsg = this.language.Bad_Request;
        this.definePostError = true;
      }else if(error.statusText  == "OK"){
        this.definePostErrorMsg = error.error.message;
        this.definePostError = true;
      }
      else {
        this.definePostErrorMsg =  this.language.timeoutErrorError;
        this.definePostError = true;
      }
      return;

    }
    // else if (error.error) {
    //   let errorMsg = error.error.errorDesc;
    //   this.definePostErrorMsg = errorMsg ? errorMsg : error.error;
    //   this.definePostError = true;
    //   this.defineDataValidation.emit(true);
    // }
  }
  ngOnDestroy() {
    // location.reload()
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.campaignDetailsSubject) {
      this.campaignDetailsSubject.unsubscribe();
    }
    if (this.campaignChannelSubject) {
      this.campaignChannelSubject.unsubscribe();
    }
    if (this.defineSuccessSubject) {
      this.defineSuccessSubject.unsubscribe();
    }

    this.marketingCampaignDefineApiService.setDefineDataEmitter(undefined);
    this.marketingCommonService.removeCampaignID();
    this.marketingCampaignDefineApiService.completeAllSubject()

  }


  // checkTSStatus(){
  //   this.marketingHomeApiService.thoughtSpotStatusCheckGET().subscribe((res: any) => {
  //    if(res){
  //    this.isTsAvailable = res.thoughtspotSupported  == true ? true : false
  //    this.marketingCampaignDefineApiService.setTsDataEmitter(this.isTsAvailable);
  //    }
  //   },(error: any) => {
  //    this.isTsAvailable = false
  //    this.marketingCampaignDefineApiService.setTsDataEmitter(this.isTsAvailable);
  //  })
  //  }
  pauseCampaign(model){
    this.dialogService.open(model, {windowClass: 'default-modal-ui modal-cust-md',backdrop: 'static', keyboard: false});
  }
  unPauseCampaign(model){
    this.dialogService.open(model, {windowClass: 'default-modal-ui modal-cust-md',backdrop: 'static', keyboard: false});
  }
 

  pauseUnPause(status) {
    if (this.scopes.campaignWrite) {
      var definePostObject = this.marketingCampaignDefineApiService.getDefineDataEmitter();
console.log(definePostObject.campaignId,'definePostObject.campaignId')
      this.marketingCampaignsApiService.CampaignPauseUnpause(`${definePostObject.campaignId}`,status)
        .subscribe((res: any) => {
          setTimeout(() => {
            this.marketingCampaignDefineApiService.deploy2ndNextEventTrigger();
          }, 1000);

          // }
        }, (error) => {
          if (error.status == 200) {
            setTimeout(() => {
              this.marketingCampaignDefineApiService.deploy2ndNextEventTrigger();
            }, 1000);
          } else if(error.status == 500){
            this.pauseError = true
          }else{
            this.pauseError = false; 
          }
         
        })

      this.closeModal()
    }
  }
  
  deployModalChannels(deployedToSelectedChannels ) {
  this.deployedModalSelectedChannels = deployedToSelectedChannels;
}

}
