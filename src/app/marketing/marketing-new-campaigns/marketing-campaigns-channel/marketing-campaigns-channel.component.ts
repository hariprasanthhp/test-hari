import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingCampaignsApiService } from '../../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { MarketingChannelsApiService } from '../../marketing-channels/shared/services/marketing-channels-api.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { MarketingCampaignChannelsApiService } from '../shared/services/marketing-campaign-channels-api.service';
import { MarketingCampaignDefineApiService } from '../shared/services/marketing-campaign-define-api.service';
import { SsoAuthService } from './../../../shared/services/sso-auth.service';
import { MarketingChannel } from "../../shared/constants/marketing.constants";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { ignoreElements } from 'rxjs/operators';

@Component({
    selector: 'app-marketing-campaigns-channel',
    templateUrl: './marketing-campaigns-channel.component.html',
    styleUrls: ['./marketing-campaigns-channel.component.scss']
})
export class MarketingCampaignsChannelComponent implements OnInit, OnDestroy {
    @Output() csvSelectData = new EventEmitter();
    @Output() channelSelectData = new EventEmitter();
    @Output() campaignStatus = new EventEmitter();
    @Output() nextButtonValidation = new EventEmitter();
    @Output() resetChannelData = new EventEmitter();
    @Input() campaignChannelsData;
    hideBeforeLoad: boolean = false;
   
    @Input() set resetChannelSelctedData(value) {
        if (value) {
            this.resetSelectedValues();
        }
    }
    @Input() set selectedSegmentItemData(data) {
        if (data) {
            this.selectedSegmentType = data.segmentType;
            if(data.segmentType == 'Upload'){
                let name = data.segmentName
                let segmentname = name.substring(name.lastIndexOf("_")+1)
                  this.uploadCheck = segmentname == 'Prospects' ? true : false
                }else{
                  this.uploadCheck = false
                } 
        }
        //this.resetData();
        this.resetSelectedValues();
        if (data && this.campaignDetailsDataArray) {
            if (data.segmentType !== this.campaignDetailsDataArray.segmentType) {
                this.isAcquisition = false;
            }
        }
    }
    @Input() set deployPreviousClicked(value: boolean) {
        if (value && this.campaignChannelsData) {
            this.campaignChannelsDataArray = this.campaignChannelsData;
        //     if(!this.triggeredCampaign){
        //         this.campaignChannelsDataArray = this.campaignChannelsData;
        //         }else{
        //             if(this.campaignChannelsData.length == this.campaignChannelsDataArray.length){
        //                 this.campaignChannelsDataArray = this.campaignChannelsData;  
        //             }
        // }
    }
    }
    language: any;
    languageSubject: any;
    uploadCheck:boolean = false
    @ViewChild('includeChannelModal', { static: true }) private includeChannelModal: TemplateRef<any>;
    dtOptions: DataTables.Settings = {};
    // dtTrigger: any = new Subject();

    // SUBJECT
    getCampaignChannelListApiSubject: any;
    getCampaignDetailsApiSubject: any;
    createCampaignSubject: any;
    createChannelSubject: any;
    clearCampaignSubject: any;
    defineCampaignSubject: any;
    channelNextEmitterSubject: any;
    defineSuccessEmitterSubject: any
    editChannelDataSubject: any;
    // DATA VARIABLE
    campaignChannelsDataArray: any;
    campaignDetailsDataArray: any;

    definePostObject: any;
    campaignPostObject: any = {};
    selectedChannelList: MarketingChannel = {};
    csvSelected: boolean = false;
    doubleChecked: boolean = false;
    includechannelSelected = {
        name: 'All',
        count: 0
    };
    includeMailchimpSelected: string = 'All';
    includeFacebookSelected: string = 'All';
    includeHubspotSelected: string = 'All';
    includeConstantSelected: string = 'All';
    validationPassed: boolean = false;
    channelPostError: boolean = false;
    channelPostErrorMsg: any;
    availableFacebook: boolean = false;
    availableMailChimp: boolean = false;
    availableHubspot: boolean = false;
    availableConstant: boolean = false;
    availableMobile: boolean = false;
    campaignSuccess: boolean = false;
    campaignSuccessMsg: any;
    segmentSize = 0;
    segmentExecutableSize = 0;
    segmentNonMobileAppSize = 0;
    segmentNonMobileExecutableSize = 0;
    segmentMobileAppSize = 0;
    segmentMobileExecutableSize = 0;
    segmentNonMobileSocialSize = 0;
    segmentSocialSize = 0
    editMode: boolean = false;
    debounceTimer: boolean = false;
    scopes: any;
    mailChimp: boolean = false;
    hubspot: boolean = false;
    mobileNotification: boolean = false;
    faceBook: boolean = false;
    constant: boolean = false;
    selectedCSV: any;
    mailChimpSegmentCount: any;
    faceBookSegmentCount: any;
    hubspotSegmentCount: any;
    constantSegmentCount: any;
    loading: boolean = false;
    deployErrorMsg: any;
    deployError: boolean = false;
    channelAlertMsg: boolean = false;
    channelAlertErrorMsg: string;
    selectedSegmentType: string;
    isAcquisition: boolean = false;
    campaignChannelsResponseData: any;
    isAcquisitionCheck: boolean = false;
    isDataAvilable: boolean = false;
    isMobileEvent:any
    triggeredCampaign:any
    constructor(
        private dialogService: NgbModal,
        private translateService: TranslateService,
        private marketingChannelsApiService: MarketingChannelsApiService,
        private marketingCampaignsApiService: MarketingCampaignsApiService,
        private marketingCampaignDefineApiService: MarketingCampaignDefineApiService,
        private marketingCampaignChannelsApiService: MarketingCampaignChannelsApiService,
        private ssoAuthService: SsoAuthService,
        private marketingCommonService: MarketingCommonService
    ) {
        this.scopeAsssiner()
        this.language = this.translateService.defualtLanguage;
        this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
            this.language = data;
        });
        
    }

    ngOnInit(): void {
        this.errorReset()
        this.channelSubmit();
        this.clearFunction();
    }

    scopeAsssiner() {
        this.scopes = this.marketingCommonService.getCMCScopes();
    }
    dtOptionsAssigner() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            processing: true,
            pageLength: 10,
            lengthChange: false,
            ordering: false,
            searching: false,
        };
    }
    
    getCampaignChannelListApiLoader() {
        this.campaignChannelsDataArray=[]
        if (this.scopes.campaignWrite) {
            this.errorReset();
            this.loading = true;
            this.hideBeforeLoad = false;
            this.getCampaignChannelListApiSubject =
                this.marketingChannelsApiService.MarketingChannelsListGET()
                    .subscribe((res: any) => {
                        this.definePostObject = this.marketingCampaignDefineApiService.getDefineDataEmitter();
                        this.loading = false;
                        this.triggeredCampaign = (this.definePostObject && (this.definePostObject.campaignType == 'Triggered')) ? true :false
                       
                         if(this.triggeredCampaign && (this.definePostObject.eventType != 'Service Limit Hit') ){
                            res = res.filter(trigger => trigger.marketingChannel == 'Mobile Notification')
                        }
                        else if(this.triggeredCampaign && (this.definePostObject.eventType == 'Service Limit Hit')){
                            res = res.filter(trigger => trigger.marketingChannel == 'Mobile Notification' || trigger.marketingChannel == 'Mailchimp')
                        }
                        this.campaignChannelsDataArray = res;
                        this.campaignChannelsResponseData = res;
                        this.getCampaignDetailsApiLoader();
                    }, (error) => {
                        this.channelPostErrorMsg = this.marketingCommonService.errorHandling(error);
                        this.channelPostError = true;
                        this.channelErrorMsgAssigner(error);
                    })
        }
    }
  
    getCampaignDetailsApiLoader() {
        this.definePostObject = this.marketingCampaignDefineApiService.getDefineDataEmitter();
        if (this.definePostObject) {
            this.errorReset();
            this.loading = true;
            this.isDataAvilable = false;
            if (this.selectedSegmentType === undefined) {
                this.selectedSegmentType = this.definePostObject.segmentType;
                if(this.definePostObject.segmentType == 'Upload'){
                    let name = this.definePostObject.segmentName
                    let segmentname = name.substring(name.lastIndexOf("_")+1)
                      this.uploadCheck = segmentname == 'Prospects' ? true : false
                    }else{
                      this.uploadCheck = false
                    }
                this.isAcquisition = this.selectedSegmentType === "Acquisition" || this.uploadCheck ? true : false;
            }
          
            if (this.selectedSegmentType !== (this.campaignDetailsDataArray && this.campaignDetailsDataArray.segmentType)) {
                this.nextButtonValidation.emit(true);
            }
            this.getCampaignDetailsApiSubject =
                this.marketingCampaignChannelsApiService.GetCampaignDetails(this.definePostObject.campaignId)
                    .subscribe((res: any) => {
                        this.campaignDetailsDataArray = res;
                        this.campaignStatus.emit(res.status);
                        this.loading = false;
                        this.hideBeforeLoad = true;
                        this.segmentSize = this.campaignDetailsDataArray ? this.campaignDetailsDataArray.segmentSize : 0;
                        this.segmentMobileAppSize = this.campaignDetailsDataArray && this.campaignDetailsDataArray.segmentMobileAppSize != null ? this.campaignDetailsDataArray.segmentMobileAppSize : 0;

                        this.segmentNonMobileAppSize = this.definePostObject && this.definePostObject.segmentMobileAppSize != null ? this.definePostObject.segmentSize - this.definePostObject.segmentMobileAppSize : 0;
                        //   console.log(this.segmentNonMobileAppSize);
                        this.segmentExecutableSize = this.campaignDetailsDataArray ? this.campaignDetailsDataArray.segmentExecutableSize : 0;
                        this.segmentSocialSize = this.campaignDetailsDataArray && this.campaignDetailsDataArray.segmentSocialSize != null ? this.campaignDetailsDataArray.segmentSocialSize : 0
                        this.segmentNonMobileExecutableSize = this.segmentExecutableSize && this.definePostObject.segmentMobileAppSize != null ? this.segmentExecutableSize - this.definePostObject.segmentMobileAppSize : 0;

                        this.segmentNonMobileSocialSize = this.segmentSocialSize && this.definePostObject.segmentMobileAppSize != null ? this.segmentSocialSize - this.definePostObject.segmentMobileAppSize : 0;





                        if (this.includechannelSelected['name'] === 'Non-Mobile Message') {
                            this.includechannelSelected['count'] = this.segmentNonMobileAppSize;
                        } else {
                            this.includechannelSelected['count'] = this.segmentSize;
                        }
                      let camp_channelArr = this.campaignChannelsDataArray
                        this.campaignChannelsDataArray = camp_channelArr.map(data => {
                            if(this.triggeredCampaign && (this.definePostObject.eventType == 'Service Limit Hit')){
                                if (data.marketingChannel === 'Mailchimp') {
                                    data.segmentSize = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;
                                    data.include = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;
                                    data.show = true;
                                    data.mobcheck = false
                                    if (this.includeMailchimpSelected === 'Non-Mobile Message') {
                                        this.mailChimpSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentNonMobileExecutableSize : this.segmentNonMobileAppSize;
                                    } else {
                                        this.mailChimpSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;
                                    }
                                    data.include2 = this.includeMailchimpSelected;
                                    this.availableMailChimp = data.available ? true : false;
                            }else if(data.marketingChannel === 'Mobile Notification') {
                                data.segmentSize = this.segmentMobileAppSize;
                                data.include = this.segmentMobileAppSize;
                                data.include3 = this.segmentMobileAppSize;
                                data.mobcheck = this.segmentMobileAppSize == 0 ? true : false
                                data.show = this.selectedSegmentType === "Acquisition" || this.uploadCheck ? false : true;
                                this.isAcquisitionCheck = this.selectedSegmentType === "Acquisition" || this.uploadCheck ? true : false;
                                this.availableMobile = data.available ? true : false;
                            }
                            return data
                        }else if(this.triggeredCampaign && (this.definePostObject.eventType != 'Service Limit Hit') ){
                            if(data.marketingChannel === 'Mobile Notification') {
                                data.segmentSize = this.segmentMobileAppSize;
                                data.include = this.segmentMobileAppSize;
                                data.include3 = this.segmentMobileAppSize;
                                data.mobcheck = this.segmentMobileAppSize == 0 ? true : false
                                data.show = this.selectedSegmentType === "Acquisition" || this.uploadCheck ? false : true;
                                this.isAcquisitionCheck = this.selectedSegmentType === "Acquisition" || this.uploadCheck ? true : false;
                                this.availableMobile = data.available ? true : false;
                            }
                            return data
                        
                        }else{
                            if (data.marketingChannel === 'Mobile Notification') {
                                data.segmentSize = this.segmentMobileAppSize;
                                data.include = this.segmentMobileAppSize;
                                data.include3 = this.segmentMobileAppSize;
                                data.mobcheck = this.segmentMobileAppSize == 0 ? true : false
                                data.show = this.selectedSegmentType === "Acquisition" || this.uploadCheck ? false : true;
                                this.isAcquisitionCheck = this.selectedSegmentType === "Acquisition" || this.uploadCheck ? true : false;
                                this.availableMobile = data.available ? true : false;
                            } else if (data.marketingChannel === 'Mailchimp') {
                                data.segmentSize = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;
                                    data.include = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;
                                data.show = true;
                                data.mobcheck = false
                                if (this.includeMailchimpSelected === 'Non-Mobile Message') {
                                    this.mailChimpSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentNonMobileExecutableSize : this.segmentNonMobileAppSize;
                                } else {
                                    this.mailChimpSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;
                                }
                                data.include2 = this.includeMailchimpSelected;
                                this.availableMailChimp = data.available ? true : false;
                            } else if (data.marketingChannel === 'Facebook') {
                                data.segmentSize = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentSocialSize : this.segmentSize;
                                data.include =this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentSocialSize : this.segmentSize;
                                data.show = true;
                                data.mobcheck = false
                                if (this.includeFacebookSelected === 'Non-Mobile Message') {
                                    this.faceBookSegmentCount =this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentNonMobileSocialSize : this.segmentNonMobileAppSize;
                                } else {
                                    this.faceBookSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentSocialSize : this.segmentSize;;
                                }
                                data.include1 = this.includeFacebookSelected;

                                this.availableFacebook = data.available ? true : false;
                            } else if (data.marketingChannel === 'Hubspot') {
                                data.segmentSize = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;
                                    data.include = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;
                                data.show = true;
                                data.mobcheck = false
                                if (this.includeHubspotSelected === 'Non-Mobile Message') {
                                    this.hubspotSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentNonMobileExecutableSize : this.segmentNonMobileAppSize;;
                                } else {
                                    this.hubspotSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;;
                                }
                                data.include1 = this.includeHubspotSelected;

                                this.availableHubspot = data.available ? true : false;
                            }
                            else if (data.marketingChannel === 'ConstantContact' || data.marketingChannel === 'Constant Contact') {
                                data.segmentSize = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;
                                    data.include = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;
                                data.show = true;
                                data.mobcheck = false
                                if (this.includeConstantSelected === 'Non-Mobile Message') {
                                    this.constantSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentNonMobileExecutableSize : this.segmentNonMobileAppSize;;
                                } else {
                                    this.constantSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;;
                                }
                                data.include4 = this.includeConstantSelected;

                                this.availableConstant = data.available ? true : false;
                            }
                            return data;
                        }})
                        if (this.isAcquisitionCheck && !this.availableFacebook && !this.availableHubspot && !this.availableMailChimp && !this.availableConstant) {
                            this.isDataAvilable = true;
                        }
                     
                        if(this.triggeredCampaign && this.campaignChannelsDataArray.length == 1){
                            for(var i=0;i<this.campaignChannelsDataArray.length;i++){
                              this.isDataAvilable =  (this.campaignChannelsDataArray[i].available  && !this.campaignChannelsDataArray[i].mobcheck ) ? false :true
                            }
                        }
                    }, (error) => {
                        this.loading = false;
                        this.channelErrorMsgAssigner(error);
                        //  this.channelPostErrorMsg = this.marketingCommonService.errorHandling(error);

                    })
        }
    }
    channelErrorMsgAssigner(error) {
        // if (error.status == 404) {
        //     this.channelPostErrorMsg = this.language.URLnotFoungError;
        //     return;

        // } else 
        if (error.status == 504 || error.status == 502) {
            this.channelPostError = true;
            this.channelPostErrorMsg = this.language.timeoutErrorError;
            return;
        } else if (error.status == 400) {
            if (error.errorMessage == "OK") {
                this.channelPostErrorMsg = this.language.Bad_Request;
                this.channelPostError = true;
            }
            else {
                this.channelPostErrorMsg = error.error;
                this.channelPostError = true;
            }
            return;
        }
        else if (error.status == 500) {

            if (error.errorMessage == "OK") {
                this.channelPostErrorMsg = this.language.internalServerError;
                this.channelPostError = true;
            }
            else {
                this.channelPostErrorMsg = error.error;
                this.channelPostError = true;
            }
            return;
        }
        // else if (error.error) {
        //     this.channelPostError = true;
        //     let errorMsg = error.error.errorDesc;
        //     this.channelPostErrorMsg = errorMsg ? errorMsg : error.error;
        // }
    }
    channelSelect(event, data) {
        this.isAcquisition = this.selectedSegmentType === "Acquisition" || this.uploadCheck ? true : false;
        this.channelAlertMsg = false;
        // console.log(data, 'data===')
        if(this.triggeredCampaign && (this.definePostObject.eventType == 'Service Limit Hit')){
            if (data.marketingChannel === 'Mailchimp') {
                this.mailChimp = event;
                if (event) {
                    this.selectedChannelList.mailChimp = data;
                    //   console.log(this.selectedChannelList.mailChimp, 'data this.selectedChannelList.mailChimp', data)
                    this.includeMailchimpSelected = 'All';
                    this.mailChimpSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck? this.segmentExecutableSize : this.segmentSize;;
                } else {
                    this.selectedChannelList.mailChimp = {};
                    this.includeMailchimpSelected = 'All';
                    this.mailChimpSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;;
                }
            }else if (data.marketingChannel === 'Mobile Notification') {
                this.mobileNotification = event;
                if (event) {
                    this.selectedChannelList.mobileNotification = data;
                } else {
                    this.selectedChannelList.mobileNotification = {};
                }
            } 
            this.selectedChannelList.faceBook = {};
            this.selectedChannelList.hubspot = {};
            this.selectedChannelList.constant = {};
          //  this.selectedChannelList.mobileNotification = {};
        }else if(this.triggeredCampaign && (this.definePostObject.eventType != 'Service Limit Hit') ){
             if (data.marketingChannel === 'Mobile Notification') {
                this.mobileNotification = event;
                if (event) {
                    this.selectedChannelList.mobileNotification = data;
                } else {
                    this.selectedChannelList.mobileNotification = {};
                }
            } 
            this.selectedChannelList.faceBook = {};
            this.selectedChannelList.hubspot = {};
            this.selectedChannelList.constant = {};
            this.selectedChannelList.mailChimp = {};
        
        }else{
        if (data.marketingChannel === 'Mailchimp') {
            this.mailChimp = event;
            if (event) {
                this.selectedChannelList.mailChimp = data;
                //   console.log(this.selectedChannelList.mailChimp, 'data this.selectedChannelList.mailChimp', data)
                this.includeMailchimpSelected = 'All';
                this.mailChimpSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck? this.segmentExecutableSize : this.segmentSize;;
            } else {
                this.selectedChannelList.mailChimp = {};
                this.includeMailchimpSelected = 'All';
                this.mailChimpSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;;
            }
        } else if (data.marketingChannel === 'Mobile Notification') {
            this.mobileNotification = event;
            if (event) {
                this.selectedChannelList.mobileNotification = data;
            } else {
                this.selectedChannelList.mobileNotification = {};
            }
        } else if (data.marketingChannel === 'Facebook') {
            this.faceBook = event;
            if (event) {
                this.selectedChannelList.faceBook = data;
                this.includeFacebookSelected = 'All';
                this.faceBookSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentSocialSize : this.segmentSize;
            } else {
                this.selectedChannelList.faceBook = {};
                this.includeFacebookSelected = 'All';
                this.faceBookSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentSocialSize : this.segmentSize;
            }
        }
        else if (data.marketingChannel === 'Hubspot') {
            this.hubspot = event;
            if (event) {
                this.selectedChannelList.hubspot = data;
                this.includeHubspotSelected = 'All';
                this.hubspotSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;;
            } else {
                this.selectedChannelList.hubspot = {};
                this.includeHubspotSelected = 'All';
                this.hubspotSegmentCount = (this.selectedSegmentType == 'Acquisition' || this.uploadCheck) ? this.segmentExecutableSize : this.segmentSize;;
            }
        } else if (data.marketingChannel === 'ConstantContact' || data.marketingChannel === 'Constant Contact') {
            this.constant = event;
            if (event) {
                this.selectedChannelList.constant = data;
                this.includeConstantSelected = 'All';
                this.constantSegmentCount = (this.selectedSegmentType == 'Acquisition' || this.uploadCheck) ? this.segmentExecutableSize : this.segmentSize;;
            } else {
                this.selectedChannelList.constant = {};
                this.includeConstantSelected = 'All';
                this.constantSegmentCount = (this.selectedSegmentType == 'Acquisition' || this.uploadCheck) ? this.segmentExecutableSize : this.segmentSize;;
            }
        }
    }
        let checkBoxData = {
            mobileNotifivationSelect: this.mobileNotification,
            mailChimpSelect: this.mailChimp,
            faceBookSelect: this.faceBook,
            hubspotSelect: this.hubspot,
            constantSelect: this.constant,
            campaignChannelsDataArray: this.campaignChannelsDataArray

        }
        this.headerCheckBoxChecker();
        this.channelSelectData.emit(checkBoxData);
        // if (event) {
        //     this.selectedChannelList = data;
        // } else {
        //     this.selectedChannelList = undefined;
        // }
        // this.headerCheckBoxChecker();
    }
    channelAllSelect(event) {
        this.isAcquisition = this.selectedSegmentType === "Acquisition" || this.uploadCheck ? true : false;
        this.channelAlertMsg = false;
        if (this.selectedSegmentType === 'Acquisition' || this.uploadCheck) {
            this.csvSelect(false)
            this.mobileNotification = false;
        } else if (this.triggeredCampaign) {
            this.csvSelect(false)
            this.mobileNotification = event;
        }  else {

            this.csvSelect(event)
            this.mobileNotification = event;
        }
        if(!this.triggeredCampaign){
            this.mailChimp = event;
            this.faceBook = event;
            this.hubspot = event;
            this.constant = event;
        }
        else if(this.triggeredCampaign && (this.definePostObject.eventType == 'Service Limit Hit')){
            this.mailChimp = event;  
        }else if(this.triggeredCampaign && (this.definePostObject.eventType != 'Service Limit Hit')){
            this.mailChimp =false;  
        }
       
        if (event) {
            this.campaignChannelsDataArray.filter(data => {
                data.checked = event;
                
                if (data.marketingChannel === 'Mailchimp') {
                    if (data.available) {
                        this.selectedChannelList.mailChimp = data;
                        //  console.log(this.selectedChannelList, 'this.selectedChannelList', data)
                        this.includeMailchimpSelected = 'All';
                        this.mailChimpSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;;
                        this.mailChimp = true;
                    }

                    else {
                        data.checked = false;
                        this.mailChimp = false;
                        this.selectedChannelList.mailChimp = {};
                     // console.log('this.selectedChannelList112')
                       }
                } else if (data.marketingChannel === 'Facebook') {
                    if (data.available) {
                        this.selectedChannelList.faceBook = data;
                        this.includeFacebookSelected = 'All';
                        this.faceBookSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentSocialSize : this.segmentSize;
                        this.faceBook = true;
                    }
                    else {
                        data.checked = false;
                        this.faceBook = false;
                        this.selectedChannelList.faceBook = {};

                    }
                }
                else if (data.marketingChannel === 'Hubspot') {
                    if (data.available) {
                        this.selectedChannelList.hubspot = data;
                        this.includeHubspotSelected = 'All';
                        this.hubspotSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;;
                        this.hubspot = true;
                    }
                    else {
                        data.checked = false;
                        this.hubspot = false;
                        this.selectedChannelList.hubspot = {};
                    }

                }
                else if (data.marketingChannel === 'ConstantContact' || data.marketingChannel === 'Constant Contact') {
                    if (data.available) {
                        this.selectedChannelList.constant = data;
                        this.includeConstantSelected = 'All';
                        this.constantSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;;
                        this.constant = true;
                    }
                    else {
                        data.checked = false;
                        this.constant = false;
                        this.selectedChannelList.constant = {};

                    }
                } else {
                    if (data.available) {
                        this.selectedChannelList.mobileNotification = data;
                        this.mobileNotification = data.mobcheck ? false : true;
                        data.checked = data.mobcheck ? false : true;
                    }
                    else {
                        data.checked = false;
                        this.mobileNotification = false;
                        this.selectedChannelList.mobileNotification = {};
                    }
                }
            });
        } else {
            this.campaignChannelsDataArray.filter(data => {
                data.checked = event;
            });
            this.selectedChannelList = {};
            this.includeMailchimpSelected = 'All';
            this.mailChimpSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;;

        }
    
        let checkBoxData = {
            mobileNotifivationSelect: this.mobileNotification,
            mailChimpSelect: this.mailChimp,
            faceBookSelect: this.faceBook,
            hubspotSelect: this.hubspot,
            constantSelect: this.constant,
            campaignChannelsDataArray: this.campaignChannelsDataArray
        }

       // console.log(checkBoxData,'checkBoxData')
        this.headerCheckBoxChecker();
        this.channelSelectData.emit(checkBoxData);
        // this.channelSelect(event, this.campaignChannelsDataArray[0])
    }
    csvSelect(event) {
        this.channelAlertMsg = false;
        this.csvSelected = event;
        this.selectedCSV = event;

        sessionStorage.setItem('SelectedCSV', this.selectedCSV);
        // this.marketingCampaignDefineApiService.csvDownloadSelectSubject.next(event);
        this.headerCheckBoxChecker();
        if (event) {
            this.includechannelSelected = {
                name: 'All',
                count: this.segmentSize
            };
        } else {
            this.includechannelSelected = {
                name: 'All',
                count: this.segmentSize
            };
        }

        this.csvSelectData.emit(this.csvSelected);


    }

    selectIncludeCahnnel(name) {

        this.includechannelSelected['name'] = name;
        if (name == 'All') {
            this.includechannelSelected['count'] = this.segmentSize;
        } else {
            this.includechannelSelected['count'] = this.segmentNonMobileAppSize;
        }
    }

    selectIncludeMailchimp(name) {
        if (name === 'All') {
            this.includeMailchimpSelected = 'All';
            this.mailChimpSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;
        } else {
            this.includeMailchimpSelected = 'Non-Mobile Message';
            this.mailChimpSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentNonMobileExecutableSize : this.segmentNonMobileAppSize;

        }
    }
    selectIncludeConstant(name) {
        if (name === 'All') {
            this.includeConstantSelected = 'All';
            this.constantSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentExecutableSize : this.segmentSize;;
            //this.selectedChannelList.constant['include2'] = this.includeConstantSelected
        } else {
            this.includeConstantSelected = 'Non-Mobile Message';
            this.constantSegmentCount = this.selectedSegmentType == 'Acquisition'  || this.uploadCheck? this.segmentNonMobileExecutableSize : this.segmentNonMobileAppSize;
            // this.selectedChannelList.constant['include2'] = this.includeConstantSelected
            //this.headerCheckBoxChecker()
        }
    }
    selectIncludeFacebook(name) {
        if (name === 'All') {
            this.includeFacebookSelected = 'All';
            this.faceBookSegmentCount = this.selectedSegmentType == 'Acquisition'  || this.uploadCheck ? this.segmentSocialSize : this.segmentSize;
        } else {
            this.includeFacebookSelected = 'Non-Mobile Message';
            this.faceBookSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentNonMobileSocialSize : this.segmentNonMobileAppSize;
        }
    }
    selectIncludeHubspot(name) {

        if (name === 'All') {
            this.includeHubspotSelected = 'All';
            this.hubspotSegmentCount = this.selectedSegmentType == 'Acquisition'  || this.uploadCheck? this.segmentExecutableSize : this.segmentSize;
        } else {
            this.includeHubspotSelected = 'Non-Mobile Message';
            this.hubspotSegmentCount = this.selectedSegmentType == 'Acquisition' || this.uploadCheck ? this.segmentNonMobileExecutableSize : this.segmentNonMobileAppSize;
        }
    }

    // Submit within Component
    channelSubmit() {
        // if (this.validationPassed) {
        this.editDataAssigner();
        if (this.defineSuccessEmitterSubject) {
            this.defineSuccessEmitterSubject.unsubscribe();
        }
        this.definePostObject = this.marketingCampaignDefineApiService.getDefineDataEmitter();
        this.defineSuccessEmitterSubject = this.marketingCampaignDefineApiService.defineSuccessEmitterSubject.subscribe((res) => {
            this.triggeredCampaign = (this.definePostObject && (this.definePostObject.campaignType == 'Triggered')) ? true :false
            this.getCampaignChannelListApiLoader();
           

            if (this.includechannelSelected) {
                this.includechannelSelected['count'] = this.segmentSize
            }
        })
        // this.marketingCampaignDefineApiService.defineNextEmitterSubject.subscribe((res) => {
        //     this.definePostObject = this.marketingCampaignDefineApiService.getDefineDataEmitter();

        //     this.segmentSize = this.definePostObject ? this.definePostObject.segmentSize : 0;
        //     this.segmentNonMobileAppSize = this.definePostObject ? this.definePostObject.segmentMobileAppSize - this.definePostObject.segmentSize : 0;
        //     this.includechannelSelected['count'] = this.segmentSize
        // })
        if (this.channelNextEmitterSubject) {
            this.channelNextEmitterSubject.unsubscribe();
        }
        this.channelNextEmitterSubject = this.marketingCampaignDefineApiService.channelNextEmitterSubject.subscribe(res => {
            this.validator();
            if (this.validationPassed) {
                // if (this.selectedChannelList || this.csvSelected) {
                if ((this.selectedChannelList.mailChimp && this.selectedChannelList.hubspot && this.selectedChannelList.constant && this.includechannelSelected) || (this.selectedChannelList.mobileNotification && this.includechannelSelected)) {

                    // this.campaignChannelsDataArray[0]['includeInChannel'] = this.includechannelSelected['name']
                    this.campaignChannelsDataArray.filter(data => {
                        data['includeInChannel'] = this.includechannelSelected['name'];

                    })
                }
           
                let channelSelected = this.selectedChannelList ? true : false
                this.definePostObject["csvDownloadOnly"] = this.csvSelected;
                // if (this.csvSelected && !this.mobileNotification && !this.mailChimp && !this.faceBook) {
                //     this.definePostObject["status"] = 'In-Progress';
                //     this.campaignUpdater(res);
                // } else if (!this.csvSelected && !this.mobileNotification && !this.mailChimp && !this.faceBook) {
                //     // this.csvSelected = true
                //     this.csvSelectData.emit(this.csvSelected);
                //     this.definePostObject["csvDownloadOnly"] = this.csvSelected;
                //     this.definePostObject["status"] = 'In-Progress';
                //     this.campaignUpdater(res);
                // } else {
                this.campaignUpdater(res);
                // setTimeout(() => {
                //     this.marketingCampaignDefineApiService.defineSuccesEventTrigger();
                // }, 100);
                // }
                this.headerCheckBoxChecker()
            }

        })
       
    }
    campaignUpdater(saveBtn) {
        this.errorReset();
        if (!this.debounceTimer) {
            this.debounceTimer = true;
            this.csvSelected = this.definePostObject.csvDownloadOnly;
            if (this.scopes.campaignWrite) {
                this.loading = true;


                if (this.definePostObject.hasOwnProperty('segmentExecutableSize')) {
                    delete this.definePostObject["segmentExecutableSize"];
                }
                this.defineCampaignSubject = this.marketingCampaignsApiService.CampaignPUT(this.definePostObject)
                    .subscribe((res: any) => {
                        if (saveBtn == false) {
                            this.marketingCampaignDefineApiService.setDefineDataEmitter(res);
                            this.campaignSuccess = true;
                            this.campaignSuccessMsg = this.language.Campaign_update;
                        } else {
                            this.marketingCampaignDefineApiService.defineSuccesEventTrigger(res);
                        }
                        this.debounceTimer = false;
                        this.loading = false;
                    }, (error) => {
                        this.loading = false;
                        this.defineErrorMsgAssigner(error)
                        this.debounceTimer = false;
                        this.channelErrorMsgAssigner(error)
                    })
            }
        }
    }

    errorReset() {
        this.channelPostError = false;
        this.campaignSuccess = false;
        this.channelAlertMsg = false;
    }
    defineErrorMsgAssigner(error) {
        let errorMsg = error.error.errorDesc;
        this.channelPostErrorMsg = errorMsg ? errorMsg : error.error;
        this.channelPostError = true;
    }
    clearFunction() {
        if (this.clearCampaignSubject) {
            this.clearCampaignSubject.unsubscribe();
        }
        this.clearCampaignSubject = this.marketingCampaignDefineApiService.clearCampaignDataSubject.subscribe((res: any) => {
            if (res == 'channel') {
                this.dataAssigner();
            }
        })
    }
    dataAssigner(res?: any) {
        let data = this.marketingCampaignDefineApiService.getDefineDataEmitter()
        if (data) {
            this.editDataAssigner();
        } else {
            this.resetData();
        }
    }
    editDataAssigner() {
        if (this.editChannelDataSubject) {
            this.editChannelDataSubject.unsubscribe();
        }
        this.editChannelDataSubject = this.marketingCampaignDefineApiService.editChannelDataSubject.subscribe((res: any) => {
            setTimeout(() => {
                this.editMode = true;
                let data = this.marketingCampaignDefineApiService.getMobileChannelDataEmitter()
                //console.log(data)
                //this.definePostObject = this.marketingCampaignDefineApiService.getDefineDataEmitter();
                // this.csvSelected = this.definePostObject.csvDownloadOnly;
                // this.csvSelect(this.csvSelected)
                if (data.mailChimp || data.mobileNotification || data.faceBook || data.hubspot || data.constant) {
                    if(!this.triggeredCampaign){
                    this.campaignChannelsDataArray = this.campaignChannelsData;
                    }else{
                          //  console.log('enter222', this.campaignChannelsDataArray.length,this.campaignChannelsData.length)
                          //  console.log('enter111')
                        if(this.campaignChannelsData.length == this.campaignChannelsDataArray.length){
                            this.campaignChannelsDataArray = this.campaignChannelsData;  
                        }else{
                            // console.log('enter222', this.campaignChannelsDataArray.length,this.campaignChannelsData.length)
                            if( this.campaignChannelsDataArray.length > 0){
                                let checkBoxData = {
                                mobileNotifivationSelect: false,
                                mailChimpSelect: false,
                                faceBookSelect: false,
                                hubspotSelect: false,
                                constantSelect: false,
                                campaignChannelsDataArray: this.campaignChannelsDataArray
                            }
                    
                            this.channelSelectData.emit(checkBoxData);
                            }
                            //
                            // let checkBoxData = {
                            //     mobileNotifivationSelect: false,
                            //     mailChimpSelect: false,
                            //     faceBookSelect: false,
                            //     hubspotSelect: false,
                            //     constantSelect: false,
                            //     campaignChannelsDataArray: this.campaignChannelsDataArray
                            // }
                    
                            // this.channelSelectData.emit(checkBoxData);
                        }
                    }
                    this.selectedChannelList = data;
                    // .find(el => el.marketingChannelId == data[0].marketingChannelId);
                }
                //console.log(this.selectedChannelList, 'this.selectedChannelList111')
                this.headerCheckBoxChecker();
            }, 1000);
        });
    }
    resetSelectedValues() {
       // console.log('reset')
        this.doubleChecked = false;
        if (this.campaignChannelsDataArray) {
            this.campaignChannelsDataArray.filter(data => {
                data.checked = false;
            })
        }
        this.mobileNotification = false;
        this.mailChimp = false;
        this.faceBook = false;
        this.hubspot = false;
        this.constant = false;
        this.csvSelected = false;
        this.resetChannelData.emit();
    }
    resetData() {
        this.selectedChannelList = this.campaignChannelsDataArray;
        this.doubleChecked = false;
        this.csvSelected = false;
    };
    headerCheckBoxChecker() {
       // console.log('enter');
    // console.log(this.selectedChannelList, 'this.selectedChannelList2222')
       
        this.marketingCampaignDefineApiService.setMobileChannelDataEmitter(this.selectedChannelList);
        this.marketingCampaignDefineApiService.setCsvDataEmitter(this.csvSelected)

        if (this.isAcquisition || this.uploadCheck) {

            let campaignChannelsDataChecked = this.campaignChannelsDataArray.filter(item => item.checked == true && item.marketingChannel !== "Mobile Notification");

            let campaignChannelsDataAvailable = this.campaignChannelsDataArray.filter(item => item.available == true && item.marketingChannel !== "Mobile Notification");
           // console.error(campaignChannelsDataChecked,campaignChannelsDataAvailable,'else')
            if (campaignChannelsDataChecked.length == campaignChannelsDataAvailable.length) {
                this.doubleChecked = true;
            }
            else {
                this.doubleChecked = false
            }
        } else {
            let campaignChannelsDataChecked = this.campaignChannelsDataArray.filter(item => item.checked == true);
            let campaignChannelsDataAvailable = this.campaignChannelsDataArray.filter(item => item.available == true && item.mobcheck == false);

          // console.log(campaignChannelsDataChecked.length, campaignChannelsDataAvailable.length, this.csvSelected,'else')

           
            if(!this.triggeredCampaign){
            //console.error({campaignChannelsDataChecked,campaignChannelsDataAvailable})
            if (campaignChannelsDataChecked.length == campaignChannelsDataAvailable.length && this.csvSelected) {
                this.doubleChecked = true;
            }
            else {
                this.doubleChecked = false
            }
        }else{
            
            this.doubleChecked = campaignChannelsDataChecked.length  == campaignChannelsDataAvailable.length ? true : false
        }
        }


    }

    validator() {
        if(this.triggeredCampaign){
        let campaignChannelsTrigger = this.campaignChannelsDataArray.filter(item => item.checked == true);
        if(campaignChannelsTrigger.length == 0){
            this.mobileNotification= false
            this.mailChimp= false
        }
    }
        if (this.mobileNotification || this.mailChimp || this.faceBook || this.constant || this.csvSelected || this.hubspot) {
            this.validationPassed = true;
            this.channelAlertMsg = false;
        } else {
            this.validationPassed = false;
            this.channelAlertErrorMsg = 'Please select at least one channel';
            this.channelAlertMsg = true;

        }
    }

    ngOnDestroy(): void {
        if (this.languageSubject) {
            this.languageSubject.unsubscribe();
        }
        if (this.getCampaignChannelListApiSubject) {
            this.getCampaignChannelListApiSubject.unsubscribe();
        }
        if (this.defineCampaignSubject) {
            this.defineCampaignSubject.unsubscribe();
        }
        if (this.createCampaignSubject) {
            this.createCampaignSubject.unsubscribe();
        }
        if (this.createChannelSubject) {
            this.createChannelSubject.unsubscribe();
        }
        if (this.clearCampaignSubject) {
            this.clearCampaignSubject.unsubscribe();
        }
        if (this.channelNextEmitterSubject) {
            this.channelNextEmitterSubject.unsubscribe();
        }
        if (this.defineSuccessEmitterSubject) {
            this.defineSuccessEmitterSubject.unsubscribe();
        }
        if (this.editChannelDataSubject) {
            this.editChannelDataSubject.unsubscribe();
        }
    }

    includeChannelModalOpen() {
        this.dialogService.open(this.includeChannelModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
    }


    closeModal() {
        this.dialogService.dismissAll();
    }

}
