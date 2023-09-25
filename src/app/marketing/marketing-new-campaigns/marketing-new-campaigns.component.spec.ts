import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { of, Subject } from 'rxjs';
import { MarketingNewCampaignsComponent } from './marketing-new-campaigns.component';
import { MarketingCampaignChannelsApiService } from './shared/services/marketing-campaign-channels-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { MarketingCampaignsApiService } from '../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { MarketingModule } from '../marketing.module';
import { MarketingApiService } from '../shared/services/marketing-api.sevice';
import { MarketingCommonService } from '../shared/services/marketing-common.service';
import { MarketingCampaignDefineApiService } from './shared/services/marketing-campaign-define-api.service';
import { NgSelectModule } from '@ng-select/ng-select';

describe('MarketingNewCampaignsComponent', () => {
    let component: MarketingNewCampaignsComponent;
    let fixture: ComponentFixture<MarketingNewCampaignsComponent>;
    let unsubscribeSpy;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
            declarations: [MarketingNewCampaignsComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, NgSelectModule],
            providers: [
                { provide: TranslateService, useCalss: CustomTranslateService },
                {
                    provide: MarketingCampaignDefineApiService, useValue: {
                        nextAllSubject: jasmine.createSpy(),
                        defineSuccessEmitterSubject: new Subject<any>(),
                        getDefineDataEmitter: jasmine.createSpy().and.returnValue({
                            segmentCategory: 'Recommended',
                            region: 'mockRegion',
                            location: 'mockLocation',
                            service: 'mockService',
                            zipcode: ['mockZip1', 'mockZip2'],
                            segmentId: 'mockSegmentId',
                        }),
                        setDefineDataEmitter: jasmine.createSpy(),
                        segmentSelectSubject: new Subject<any>(),
                        setCampaignChannelDataEmitter: jasmine.createSpy(),
                        deploy2ndNextEventTrigger: jasmine.createSpy(),
                        defineNextEventTrigger: jasmine.createSpy(),
                        channelNextEventTrigger: jasmine.createSpy(),
                        deployNextEventTrigger: jasmine.createSpy(),
                        getCsvDataEmitter: jasmine.createSpy().and.returnValue({}),
                        getCampaignChannelDataEmitter: jasmine.createSpy().and.returnValue({}),
                        clearCampaignDataEmitter: jasmine.createSpy(),
                        completeAllSubject: jasmine.createSpy(),
                        campaignSubject: new Subject<any>(),
                    }
                },

                {
                    provide: MarketingCampaignsApiService, useValue: {
                        getDeplyValidation: jasmine.createSpy(),
                        CampaignDetailGET: jasmine.createSpy().and.returnValue(of({ status: 'Draft', segmentCategory: 'upsell', segmentName: 'camera' })),
                        CampaignPUT: jasmine.createSpy().and.returnValue(of([])),
                        CampaignPauseUnpause: jasmine.createSpy().and.returnValue(of([])),

                    }
                },
                {
                    provide: MarketingCampaignChannelsApiService, useValue: {
                        CampaignChannelByOrgGET: jasmine.createSpy().and.returnValue(of({})),
                    }
                },
                {
                    provide: MarketingCommonService,
                    useValue: jasmine.createSpyObj('marketingCommonService', ['getCampaignID']),
                },
                {
                    provide: MarketingCommonService, useValue: {
                        getCampaignID: jasmine.createSpy().and.returnValue('C Id'),
                        setCampaignID: jasmine.createSpy(),
                        getCMCScopes: jasmine.createSpy().and.returnValue({ campaignRead: true, campaignWrite: true }),
                        removeCampaignID: jasmine.createSpy(),
                    }
                },
                {
                    provide: NgbModal, useValue: {
                        dismissAll: jasmine.createSpy(),
                        open: jasmine.createSpy(),
                    }
                },

                {
                    provide: Title, useValue: {
                        setTitle: jasmine.createSpy(),
                    }
                },
                {
                    provide: MarketingApiService, useValue: {
                        getQlikConnectedApp: jasmine.createSpy(),
                    }
                },
                {
                    provide: ChangeDetectorRef, useValue: {
                        detectChanges: jasmine.createSpy(),
                    }
                },
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(MarketingNewCampaignsComponent);
            component = fixture.componentInstance;
            unsubscribeSpy = jasmine.createSpy('unsubscribe');
            component.defineSuccessSubject = { unsubscribe: unsubscribeSpy };
        });
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should load data', () => {
        //arrange
        let sessionVal;
        spyOn(sessionStorage, 'getItem').and.returnValue('someValue');
        sessionVal = sessionStorage.getItem('triggered');
        component.triggeredCampaign = true;
        fixture.detectChanges();
        expect(component.triggeredCampaign).toBeTruthy();
    });

    it('should load data', () => {
        //arrange
        let sessionVal;
        spyOn(sessionStorage, 'getItem').and.returnValue('');
        sessionVal = sessionStorage.getItem('triggered');
        component.triggeredCampaign = false;

        fixture.detectChanges();
        expect(component.triggeredCampaign).toBeFalsy();
        expect(component.hasScope).toBeTruthy();
        component.scopes.campaignRead = false;
        component.scopes.campaignWrite = false;
        component.hasScope = false;
        expect(component.hasScope).toBeFalsy();
    });

    it('should load data has scope', () => {
        component.scopes.campaignRead = false;
        component.scopes.campaignWrite = true;
        fixture.detectChanges();
        expect(component.hasScope).toBeTruthy();
    });

    it('should push state when popstate event is triggered', () => {
        spyOn(history, 'pushState');
        const popstateEvent = new PopStateEvent('popstate');
        window.dispatchEvent(popstateEvent);
        expect(history.pushState).toHaveBeenCalledWith(null, null, location.href);
    });

    it('should call constructor functions', () => {
        // let data = marketingCommonService.getCampaignID.and.returnValue('campaignId123');
        // fixture.detectChanges();
        // expect(component.editOrResultCheck).toHaveBeenCalledWith(data);
    });

    it('should call constructor functions', () => {
        // let data = marketingCommonService.getCampaignID.and.returnValue('');
        // fixture.detectChanges();
        // data = '';
        // expect(component.editOrResultCheck).toHaveBeenCalled();
        // let value = history.state.value;
        // component.campaignId = value;
        // expect((component as any).MarketingCommonService.setCampaignID).toHaveBeenCalledWith(value);
        // expect(component.editOrResultCheck).toHaveBeenCalled();
        // value = '';
        // component.pageVisible = true;
        // expect(component.pageVisible).toBeTruthy();
    });

    it('should set the title for a new scheduled campaign', () => {
        // spyOn((titleService as any),'setTitle').and.returnValue('New Scheduled Campaign-Marketing_Cloud-Calix Cloud');
        // component.campaignData = null;
        // component.triggeredCampaign = false;
        // component.language = [];
        // component.setTitle();
        // expect(titleService.setTitle).toHaveBeenCalledWith('New Scheduled Campaign-Marketing_Cloud-Calix Cloud');
    });

    it('should set the title for a new triggered campaign', () => {
        // spyOn((titleService as any),'setTitle').and.returnValue(of('New Triggered Campaign-Marketing_Cloud-Calix Cloud'));
        // component.campaignData = { campaignId: "6b3a8192-9c3f-4e83-8ce1-fc14fa84d832" };
        // component.triggeredCampaign = true;
        // component.language = [];
        // component.setTitle();
        // expect(titleService.setTitle).toHaveBeenCalledWith('New Triggered Campaign-Marketing_Cloud-Calix Cloud');
    });

    it('should load data', () => {
        //arrange
        spyOn((component as any).cdref, 'detectChanges');

        //act
        fixture.detectChanges();
        //assert
        expect(component.hasScope).toBeTruthy();
        expect((component as any).cdref.detectChanges).toHaveBeenCalled();

        //arrange
        component.scopes.campaignRead = false;
        component.scopes.campaignWrite = true;
        //assert
        expect(component.hasScope).toBeTruthy();
    });

    it('should load data with scope false', () => {
        //arrange
        spyOn(component, 'setTitle');
        component.scopes.campaignRead = true;
        component.scopes.campaignWrite = false;
        //act
        fixture.detectChanges();
        //assert
        expect(component.hasScope).toBeFalsy();

        (component as any).translateService.selectedLanguage = of();
        component.language = [];
        expect(component.setTitle).toHaveBeenCalled();

    });

    it('should call Define function', () => {
        let activeTab = 'define';
        component.active_tab = activeTab;
        component.define(activeTab);
        component.stage_One = false
        component.stage_Two = false
        component.stageOneComplete = false
        //  False all 
        component.define_tab = false;
        component.channel_tab = false;
        component.deploy_tab = false;
        component.result_tab = false;
        component.define_complet = false
        component.channel_complet = false
        component.deploy_complet = false

    });
    it('should call else if of channel function', () => {
        let activeTab = 'channel';
        component.active_tab = activeTab;
        component.define(activeTab);

    });

    it('should call else if of deploy function', () => {
        let activeTab = 'deploy';
        component.active_tab = activeTab;
        component.define(activeTab);
        let subStep = true;
        component.stageOneComplete = false;
        expect(component.stageOneComplete).toBeFalsy();
        subStep = false;
        component.stageOneComplete = true;
        expect(component.stageOneComplete).toBeTruthy();


    });

    it('should call else if of result function', () => {
        let activeTab = 'result';
        component.active_tab = activeTab;
        component.define(activeTab);

    });

    it('should handle the "channel" case correctly', () => {
        const activeTab = 'channel';
        spyOn(component, 'define');
        component.previous(activeTab);
        expect(component.resetChannelSelctedData).toBe(true);
        expect(component.define).toHaveBeenCalledWith('define');
        expect(sessionStorage.getItem('camp_filter_change')).toBe('prev');
    });

    // it('should handle the "channel" case correctly', () => {
    //     const activeTab = 'channel';
    //     component.defineSuccessSubject = {};
    //     spyOn(component, 'channel');
    //     component.previous(activeTab);
    //     expect(component.define).toHaveBeenCalledWith('channel');
    // });

    it('should unsubscribe from defineSuccessEmitterSubject if it exists', () => {
        const activeTab = 'channel';
        // spyOn(component.defineSuccessSubject, 'unsubscribe');
        component.previous(activeTab);
        expect(unsubscribeSpy).toHaveBeenCalled();
    });
    
      it('should subscribe to defineSuccessEmitterSubject and call necessary methods', () => {
        const activeTab = 'channel';

        spyOn(component, 'define');
        spyOn(component, 'clearAll');
    
        component.previous(activeTab);
    
        // expect((component as any).defineSuccessEmitterSubject.subscribe).toHaveBeenCalled();
    
        // (component as any).defineSuccessEmitterSubject.next('mock value');
    
        expect(component.define).toHaveBeenCalledWith('define');
    
        setTimeout(() => {
            spyOn((component as any),'getDefineDataEmitter');
        //   expect((component as any).getDefineDataEmitter).toHaveBeenCalled();
          expect(component.clearAll).toHaveBeenCalled();
        }, 3000)
      });
    

    it('should handle the "deploy" case correctly when stageOneComplete is true', () => {
        const activeTab = 'deploy';
        spyOn(component, 'define');
        component.stageOneComplete = true;
        component.previous(activeTab);
        expect(component.define).toHaveBeenCalledWith('deploy');

    });

    it('should handle the "deploy" case correctly when stageOneComplete is false', () => {
        const activeTab = 'deploy';
        spyOn(component, 'define');
        component.stageOneComplete = false;
        component.previous(activeTab);
        expect(component.define).toHaveBeenCalledWith('channel');
        expect(component.deployPreviousClicked).toBe(true);
    });

    it('should handle the "result" case correctly', () => {
        const activeTab = 'result';
        spyOn(component, 'define');
        component.previous(activeTab);
        expect(component.define).toHaveBeenCalledWith('deploy', 1);
    });

    it('should handle the "define" case correctly For next fun', () => {
        const activeTab = 'define';
        spyOn(component, 'defineTriggerApiLoader');
        component.next(activeTab);
        expect(component.resetChannelSelctedData).toBe(true);
        expect(component.defineTriggerApiLoader).toHaveBeenCalled();
        expect(sessionStorage.getItem('camp_filter_change')).toBe('next');
    });

    it('should handle the "channel" case correctly', () => {
        const activeTab = 'channel';
        spyOn(component, 'channelTriggerApiLoader');
        component.next(activeTab);
        expect(component.deployPreviousClicked).toBe(false);
        expect(component.channelTriggerApiLoader).toHaveBeenCalled();
    });

    it('should handle the "deploy" case correctly', () => {
        const activeTab = 'deploy';
        spyOn(component, 'deploy');
        component.next(activeTab);
        expect(component.deploy).toHaveBeenCalledWith('deploy');
    });

    it('should handle the "define" case correctly for randomClick fun', () => {
        component.active_tab = 'define';
        spyOn(component, 'define');
        const tabName = 'channel';
        component.randomClickTab(tabName);
        expect(component.resetChannelSelctedData).toBe(true);
        component.stageOneComplete = false;
        expect(component.define).toHaveBeenCalledWith('channel');
    });

    it('should handle the "channel" case correctly when stageOneComplete is false', () => {
        component.active_tab = 'channel';
        spyOn(component, 'define');
        component.stageOneComplete = false;
        const tabName = 'channel';
        component.randomClickTab(tabName);
        expect(component.resetChannelSelctedData).toBe(true);
        expect(component.isValid).toBe(false);
        expect(component.deployPreviousClicked).toBe(false);
        expect(component.isSegmentClicked).toBe(false);
        expect(component.define).toHaveBeenCalledWith('channel');
    });

    it('should handle the "channel" case correctly when stageOneComplete is true', () => {
        component.active_tab = 'deploy';
        spyOn((component as any), 'define').and.returnValue('someTab');
        component.stageOneComplete = false;
        const tabName = 'someTab';
        component.randomClickTab(tabName);
        component.deployPreviousClicked = true;
        expect(component.deployPreviousClicked).toBeTruthy(true);
        // expect(component.define).toHaveBeenCalledWith('someTab');
    });

    

    it('should handle the deploy function "mobileNotificationSelected" case correctly', () => {
        component.mobileNotificationSelected = true;
        const activeTab = 'someTab';
        component.deploy(activeTab);
        // expect((component as any).MarketingCampaignsApiService.getDeplyValidation).toHaveBeenCalledWith(false);
        expect(component.deployCampaignClicked).toBe(true);
    });

    it('should handle the deploy function when campaignType is not "Triggered"', () => {
        component.mobileNotificationSelected = false;
        const activeTab = 'someTab';
        spyOn(component, 'deployValidation');
        component.deploy(activeTab);
        expect(component.deployCampaignClicked).toBe(true);
        expect(component.deployValidation).toHaveBeenCalledWith(true);
    });

    it('should handle the case when csvSelected and deployCampaignClicked are true', () => {
        component.csvSelected = true;
        component.deployCampaignClicked = true;
        spyOn(component, 'nextEventTrigger');
        // component.deployCampaign();
        // expect((component as any).marketingApiService.getQlikConnectedApp).toHaveBeenCalled();
        // expect((component as any).marketingCampaignDefineApiService.getDefineDataEmitter).toHaveBeenCalled();
        // expect((window as any).downloadCSVSegmentFilters).toHaveBeenCalledWith(
        //   'mockSegmentId',
        //   'Recommended',
        //   {
        //     region: 'mockRegion',
        //     location: 'mockLocation',
        //     servicegrp: 'mockService',
        //     zipcode: 'mockZip1;mockZip2',
        //   },
        //   'mockApp'
        // );
        // expect((window as any).downloadQSReports).toHaveBeenCalledWith('mockApp', 'CSV Download');
        // expect(component.nextEventTrigger).toHaveBeenCalledWith(false);
        // expect(component.deployCampaignClicked).toBe(false);
        // expect((component as any).dialogService.dismissAll).toHaveBeenCalled();
        // Assert any other expected changes
    });

    it('should handle handleKeyboardEvent the case when event.key is "Enter" and this.enterKey is true', () => {
        spyOn(component, 'deployCampaign');
        const mockEvent: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Enter' });
        component.enterKey = true;
        component.handleKeyboardEvent(mockEvent);
        expect(component.deployCampaign).toHaveBeenCalled();
        expect(component.enterKey).toBe(false);
    });

    it('should handle the case when this.enterKey is false', () => {
        const mockEvent: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Enter' });
        component.enterKey = false;
        component.handleKeyboardEvent(mockEvent);
    });

    it('should handle the case when event is true', () => {
        spyOn(component, 'deployHeaderMessage');
        const event = true;
        component.deployValidation(event);
        expect(component.deployHeaderMessage).toHaveBeenCalled();
        expect((component as any).dialogService.open).toHaveBeenCalledWith((component as any).sendCampaignModal, { backdrop: 'static', keyboard: false, size: 'lg', centered: true, windowClass: 'custom-modal' });
        expect(component.enterKey).toBe(true);
    });

    it('should handle the case when event is false', () => {
        spyOn(component, 'deployHeaderMessage');
        const event = false;
        component.deployValidation(event);
        expect(component.deployHeaderMessage).not.toHaveBeenCalled();
        expect((component as any).dialogService.open).not.toHaveBeenCalled();
        expect(component.enterKey).toBe(false);
    });

    it('should call closeModal', () => {
        component.closeModal();
        expect((component as any).marketingCampaignsApiService.getDeplyValidation).toHaveBeenCalledWith(false);
        expect(component.deployCampaignClicked).toBe(false);
        expect((component as any).dialogService.dismissAll).toHaveBeenCalled();
        expect(component.enterKey).toBe(false);
    });

    it('should call defineTriggerApiLoader()', () => {
        spyOn(component, 'randomClickTab');
        component.active_tab = 'channel';
        component.defineTriggerApiLoader('define');
        expect(component.randomClickTab).toHaveBeenCalledWith('define');
    });

    it('should call defineTriggerApiLoader()', () => {
        spyOn(component, 'nextEventTrigger');
        component.defineTriggerApiLoader();
        expect(component.nextEventTrigger).toHaveBeenCalledWith(false);
    });

    it('should call nextEventTrigger() if stageOneComplete is false and active_tab is not "deploy"', () => {
        spyOn(component, 'nextEventTrigger');
        component.stageOneComplete = false;
        component.active_tab = 'channel';
        component.channelTriggerApiLoader();
        expect(component.nextEventTrigger).toHaveBeenCalledWith(false);
    });

    it('should channelTriggerApiLoader', () => {
        spyOn(component, 'nextEventTrigger');
        component.stageOneComplete = true;
        component.active_tab = 'deploy';
        component.channelTriggerApiLoader();
        expect(component.nextEventTrigger).not.toHaveBeenCalled();
    });

    it('should call deployTriggerApiLoader', () => {
        spyOn(component, 'nextEventTrigger');
        let tabName = 'deploy';
        component.deployTriggerApiLoader(tabName);
        expect(component.nextEventTrigger).toHaveBeenCalledWith(false);
    });

    it('should call nextEventTrigger() with false argument and getResults() if "next" is truthy', () => {
        spyOn(component, 'nextEventTrigger');
        spyOn(component, 'getResults');
        component.deploy2ndTriggerApiLoader('tabName', true);
        expect(component.nextEventTrigger).toHaveBeenCalledWith(false);
        expect(component.getResults).toHaveBeenCalledWith('tabName');
    });

    it('should call nextEventTrigger() with false argument and not call getResults() if "next" is falsy', () => {
        spyOn(component, 'nextEventTrigger');
        spyOn(component, 'getResults');
        component.deploy2ndTriggerApiLoader('tabName', false);
        expect(component.nextEventTrigger).toHaveBeenCalledWith(false);
        expect(component.getResults).not.toHaveBeenCalled();
    });



    // it('should get Campain Details', () => {
    //     let dataVal = {marketingChannelId:"2172e774-4498-11eb-b378-0242ac130002", marketingChannel:'Mobile Notification', status:'status',segmentCategory:'category', eventType:'type'};
    //     component.scopes.campaignRead = true;
    //     sessionStorage.setItem('segment_status', dataVal.segmentCategory)
    //     component.campaignStatusInfo = dataVal.status;
    //     // expect((component as any).marketingCampaignDefineApiService.eventTypeSubject.next).toHaveBeenCalledWith(dataVal.eventType)
    //     dataVal.status = 'Active';
    //     component.active = true;
    //     dataVal.status == 'Paused'
    //     component.active = true;
    //     expect(component.active).toBeTruthy();
    //     //act
    //     component.getCampainDetails(101);
    //     //assert
    //     // expect(component.campaignStatusInfo).toEqual('Draft');
    //     // expect(component.pageVisible).toBeTruthy();
    //     // expect(component.campaignData).toEqual({ status: 'Draft', segmentCategory: 'upsell', segmentName: 'camera' });
    //     // expect((component as any).marketingCampaignChannelsApiService.CampaignChannelByOrgGET).toHaveBeenCalled();

    it('should call getResults', () => {
        const tabName = 'result';
        spyOn(component, 'define');
        component.define_complet = true;
        component.channel_complet = true;
        component.getResults(tabName);
        expect(component.define).toHaveBeenCalledWith(tabName);
    });

    it('should call getResults', () => {
        const tabName = 'result';
        spyOn(component, 'define');
        component.define_complet = false;
        component.channel_complet = true;
        component.getResults(tabName);
        expect(component.define).not.toHaveBeenCalled();
    });

    it('should call csvSelectData', () => {
        const event = true;
        spyOn(component, 'channelNextButtonValidation');
        component.csvSelectData(event);
        expect(component.csvSelected).toBe(event);
        expect(component.channelNextButtonValidation).toHaveBeenCalled();
    });

    it('should call channelSelectData', () => {
        const event = {
            mobileNotifivationSelect: true,
            mailChimpSelect: false,
            faceBookSelect: true,
            hubspotSelect: false,
            constantSelect: true,
            campaignChannelsDataArray: ['channel1', 'channel2']
        };
        spyOn(component, 'channelNextButtonValidation');
        component.channelSelectData(event);
        expect(component.mobileNotificationSelected).toBe(event.mobileNotifivationSelect);
        expect(component.mailChimpSelected).toBe(event.mailChimpSelect);
        expect(component.faceBookSelected).toBe(event.faceBookSelect);
        expect(component.hubspotSelected).toBe(event.hubspotSelect);
        expect(component.constantSelected).toBe(event.constantSelect);
        expect(component.campaignChannelsDataArray).toEqual(event.campaignChannelsDataArray);
        expect(component.channelNextButtonValidation).toHaveBeenCalled();
    });

    it('should reset channel data properties', () => {
        component.mobileNotificationSelected = true;
        component.mailChimpSelected = true;
        component.faceBookSelected = true;
        component.hubspotSelected = true;
        component.constantSelected = true;
        component.csvSelected = true;
        component.resetChannelData();
        expect(component.mobileNotificationSelected).toBe(false);
        expect(component.mailChimpSelected).toBe(false);
        expect(component.faceBookSelected).toBe(false);
        expect(component.hubspotSelected).toBe(false);
        expect(component.constantSelected).toBe(false);
        expect(component.csvSelected).toBe(false);
    });

    it('should set isValid is false', () => {
        component.mobileNotificationSelected = true;
        component.mailChimpSelected = false;
        component.faceBookSelected = false;
        component.csvSelected = false;
        component.hubspotSelected = false;
        component.constantSelected = false;
        component.channelNextButtonValidation();
        expect(component.isValid).toBe(false);

        component.mobileNotificationSelected = false;
        component.mailChimpSelected = true;
        component.faceBookSelected = false;
        component.csvSelected = false;
        component.hubspotSelected = false;
        component.constantSelected = false;
        component.channelNextButtonValidation();
        expect(component.isValid).toBe(false);

        component.mobileNotificationSelected = false;
        component.mailChimpSelected = false;
        component.faceBookSelected = true;
        component.csvSelected = false;
        component.hubspotSelected = false;
        component.constantSelected = false;
        component.channelNextButtonValidation();
        expect(component.isValid).toBe(false);

        component.mobileNotificationSelected = false;
        component.mailChimpSelected = false;
        component.faceBookSelected = false;
        component.csvSelected = true;
        component.hubspotSelected = false;
        component.constantSelected = false;
        component.channelNextButtonValidation();
        expect(component.isValid).toBe(false);

        component.mobileNotificationSelected = false;
        component.mailChimpSelected = false;
        component.faceBookSelected = false;
        component.csvSelected = false;
        component.hubspotSelected = true;
        component.constantSelected = false;
        component.channelNextButtonValidation();
        expect(component.isValid).toBe(false);

        component.mobileNotificationSelected = false;
        component.mailChimpSelected = false;
        component.faceBookSelected = false;
        component.csvSelected = false;
        component.hubspotSelected = false;
        component.constantSelected = true;
        component.channelNextButtonValidation();
        expect(component.isValid).toBe(false);
    });

    it('should set csvDownloadOnly value', () => {
        component.csvDownloadValue(true);
        expect(component.csvDownloadOnly).toBe(true);
        component.csvDownloadValue(false);
        expect(component.csvDownloadOnly).toBe(false);
    });

    it('should set campaignStatus value', () => {
        let data = 'status'
        component.campaignStatus(data);
        expect(component.campaignStatusInfo).toEqual(data);
    });

    it('should set segmentClicked value', () => {
        component.segmentClicked(true);
        expect(component.isSegmentClicked).toBe(true);
        component.segmentClicked(false);
        expect(component.isSegmentClicked).toBe(false);
    });

    it('should validate next button based on active tab and isSegmentClicked', () => {
        let event = true;
        component.active_tab = "channel";
        component.isSegmentClicked = true;
        component.nextButtonValidation(event);
        expect(component.isValid).toBe(true);
      
        component.active_tab = "channel";
        component.isSegmentClicked = false;
        component.nextButtonValidation(event);
      });

      it('should validate define data and update isValid', () => {
        let event = true;
        component.defineDataValidation(event);
        expect(component.isValid).toBe(false);

        event = false;
        component.isValid = true;
        component.defineDataValidation(event);
        expect(component.isValid).toBe(true);
      });

      it('should trigger nextEventTrigger with true', () => {
        spyOn(component, 'nextEventTrigger');
        component.saveAnyTime();
        expect(component.nextEventTrigger).toHaveBeenCalledWith(true);
      });

      it('should set selectedSegmentItemData and selectedSegmentedType', () => {
        const data = { segmentType: 'Type'};
        component.selectedSegmentItem(data);
        expect(component.selectedSegmentItemData).toEqual(data);
        expect(component.selectedSegmentedType).toEqual(data.segmentType);
      });

      it('should set followAction and followActions based on selected channel count', () => {
        component.mobileNotificationSelected = true;
        component.mailChimpSelected = true;
        component.csvSelected = true;
        component.faceBookSelected = true;
        component.constantSelected = true;
        component.hubspotSelected = true;
      
        component.deployHeaderMessage();
      
        expect(component.followAction).toBe(false);
        expect(component.followActions).toBe(true);
      });

      it('should set followAction and followActions to false when count is 0', () => {
        // Arrange
        component.mobileNotificationSelected = false;
        component.mailChimpSelected = false;
        component.csvSelected = false;
        component.faceBookSelected = false;
        component.constantSelected = false;
        component.hubspotSelected = false;
      
        // Act
        component.deployHeaderMessage();
        // Assert
        expect(component.followAction).toBe(true);
        expect(component.followActions).toBe(false);
      });

      it('should set clear Action', () => {
        component.clearAll();
        expect((component as any).marketingCampaignDefineApiService.clearCampaignDataEmitter).toHaveBeenCalledWith('define');
      });

      it('should call clearClose', () => {
        spyOn((component as any).router, 'navigate');
        component.clearClose();
        expect((component as any).router.navigate).toHaveBeenCalledWith(['/marketing/engagement-channel']);
      });

    //   it('should call stage_result', () => {
    //     let data = '';
    //     component.stage_result(data);
    //   });

      it('should navigate back', () => {
        spyOn((component as any).location, 'back');
        component.back();
        expect((component as any).location.back).toHaveBeenCalled();
      });

      it('should call errorReset', () => {
        component.errorReset();
        component.definePostError = false;
        expect(component.definePostError).toBeFalsy();
      });

      it('should call defineErrorMsgAssigner', () => {
        let error = { status: 504 };
        component.language = {timeoutErrorError : 'timeoutErrorError'};
        component.defineErrorMsgAssigner(error);
        expect(component.definePostErrorMsg).toEqual(component.language.timeoutErrorError);
        expect(component.definePostError).toBe(true);

        error = { status: 502 };
        component.language = {timeoutErrorError : 'timeoutErrorError'};
        component.defineErrorMsgAssigner(error);
        expect(component.definePostErrorMsg).toEqual(component.language.timeoutErrorError);
        expect(component.definePostError).toBe(true);

        error = { status: 409 };
        component.language = {same_campaign : 'same_campaign'};
        component.defineErrorMsgAssigner(error);
        expect(component.definePostErrorMsg).toEqual(component.language.same_campaign);
        expect(component.definePostError).toBe(true);

        error = { status: 500 };
        error['message'] = 'OK';
        component.language = {internalServerError : 'internalServerError'};
        component.defineErrorMsgAssigner(error);
        expect(component.definePostErrorMsg).toEqual(component.language.internalServerError);
        expect(component.definePostError).toBe(true);

        error = { status: 500 };
        error['message'] = 'Not OK';
        component.language = {internalServerError : 'internalServerError'};
        component.defineErrorMsgAssigner(error);
        expect(component.definePostErrorMsg).toEqual(component.language.internalServerError);
        expect(component.definePostError).toBe(true);

        error = { status: 400};
        error['errorMessage'] = 'OK';
        component.language = {Bad_Request : 'Bad_Request'};
        component.defineErrorMsgAssigner(error);
        expect(component.definePostErrorMsg).toEqual(component.language.Bad_Request);
        expect(component.definePostError).toBe(true);

        error = { status: 400};
        error['statusText'] = 'OK';
        error['error'] = {message: 'Error'};
        component.language = {Bad_Request : 'Bad_Request'};
        component.defineErrorMsgAssigner(error);
        expect(component.definePostErrorMsg).toEqual(error['error'].message);
        expect(component.definePostError).toBe(true);

        error = { status: 503};
        component.language = {timeoutErrorError : 'timeoutErrorError'};
        component.defineErrorMsgAssigner(error);
        expect(component.definePostErrorMsg).toEqual('Error');
        expect(component.definePostError).toBe(true);
      });

      it('should open the pause campaign dialog', () => {
        const model = 'dialog-model';
        component.pauseCampaign(model);
        expect((component as any).dialogService.open).toHaveBeenCalledWith(model, { windowClass: 'default-modal-ui modal-cust-md' });
      });

      it('should call unPauseCampaign', () => {
        const model = 'dialog-model';
        component.unPauseCampaign(model);
        expect((component as any).dialogService.open).toHaveBeenCalledWith(model, { windowClass: 'default-modal-ui modal-cust-md' });
      });

      it('should call unPauseCampaign', () => {
        component.scopes.campaignWrite = true;
        let id = '6b3a8192-9c3f-4e83-8ce1-fc14fa84d832';
        component.pauseUnPause('Paused')
      });

      it('should call nextEventTrigger', fakeAsync(() => {
        let save = false;
        spyOn(component, 'define');
        component.campaignData = { 
            campaignId: "6b3a8192-9c3f-4e83-8ce1-fc14fa84d832" };
        component.nextEventTrigger(save);
        setTimeout(() => {
            expect(component.campaignData).toEqual(component.campaignData);
            component.getSetCampaign('Name')

          }, 2000)
        flush(2000);

        component.campaignData.status = 'Draft';
        component.campaignData.status = 'Active';
        component.campaignData.status = 'Paused';
        component.active_tab == 'define';

        component.active = true;
        let tabName = 'channel';
        component.nextEventTrigger(save);
        // expect(component.define).toHaveBeenCalledWith(tabName);
        setTimeout(() => {
            expect(component.campaignData).toEqual(component.campaignData);
          }, 3000)
        flush(3000);

        component.active = false;
        tabName = 'result';
        component.nextEventTrigger(save);
        component.stageOneComplete = true;

        // expect(component.define).toHaveBeenCalledWith(tabName,1);
        expect(component.stageOneComplete).toBeTruthy();
        setTimeout(() => {
            spyOn(component,'clearAll');
            expect(component.campaignData).toEqual(component.campaignData);
          }, 3000)
        flush(3000);
      }));

});
