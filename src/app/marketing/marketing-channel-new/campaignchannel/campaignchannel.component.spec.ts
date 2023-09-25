import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CampaignchannelComponent } from './campaignchannel.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarketingRoutingsService } from '../../shared/services/marketing-routings.service';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingCampaignsApiService } from '../../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { Title } from '@angular/platform-browser';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { Subject, of } from 'rxjs';
import Highcharts from 'highcharts';

describe('CampaignchannelComponent', () => {
  let component: CampaignchannelComponent;
  let fixture: ComponentFixture<CampaignchannelComponent>;
  let marketingRoutingsService: jasmine.SpyObj<any>;
  let dtInstance: jasmine.SpyObj<DataTables.Api>;
  let marketingCampaignsApiService: jasmine.SpyObj<any>;
  let dialogService: jasmine.SpyObj<any>;
  let dialogConfig: any;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaignchannelComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule
        , NgSelectModule],
      providers: [{
        provide: NgbModal, useValue: {
          open: jasmine.createSpy(),
          dismissAll: jasmine.createSpy(),
        }
      },
      {
        provide: MarketingRoutingsService, useValue: {
          newCampaignPage: jasmine.createSpy(),
          channelsPage: jasmine.createSpy(),
          newCampaignPageEdit: jasmine.createSpy(),
          newCampaignPageResult: jasmine.createSpy(),
        }
      },
      { provide: TranslateService, useClass: CustomTranslateService },
      {
        provide: MarketingCampaignsApiService, useValue: {
          CampaignsListGET: jasmine.createSpy().and.returnValue(of(['streamer', 'camera'])),
          CampaignDELETE: jasmine.createSpy().and.returnValue(of({})),

        }
      }, {
        provide: MarketingCommonService, useValue: {
          getCMCScopes: jasmine.createSpy().and.returnValue({ campaignRead: true, campaignWrite: true }),
        }
      },
      {
        provide: Title, useValue: {
          setTitle: jasmine.createSpy(),
        }
      }]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(CampaignchannelComponent);
        dtInstance = jasmine.createSpyObj('DataTables.Api', ['destroy','search', 'draw']);
        dtInstance.search.and.returnValue(dtInstance); 
        component = fixture.componentInstance;
        component.search_Text_Value = 'test';
        component.languageSubject = new Subject();
        component.dtTrigger = new Subject();
        component.campaignListSubject = new Subject();
        component.campaignListDeleteSubject = new Subject();
        component.dtElement = { dtInstance: Promise.resolve(dtInstance) } as any;   
        marketingCampaignsApiService = jasmine.createSpyObj('MarketingCampaignsApiService', ['CampaignsListGET']);
        // component.marketingCampaignsApiService = marketingCampaignsApiService;
 
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call searchName', async () => {
    const searchText = 'test';
    await component.searchName(searchText);
    expect(dtInstance.search).toHaveBeenCalledWith(searchText);
    expect(dtInstance.draw).toHaveBeenCalled();
  });

  it('should call search_Text_Valuefun', async () => {
    await component.search_Text_Valuefun();
    expect(component.search_Text_Value).toBe('');
    expect(dtInstance.search).toHaveBeenCalledWith('');
    expect(dtInstance.draw).toHaveBeenCalled();
  });

  it('should call ngOnDestroy', () => {
    spyOn(component.languageSubject, 'unsubscribe');
    spyOn(component.dtTrigger, 'unsubscribe');
    spyOn(component.campaignListSubject, 'unsubscribe');
    spyOn(component.campaignListDeleteSubject, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.languageSubject.unsubscribe).toHaveBeenCalled();
    expect(component.dtTrigger.unsubscribe).toHaveBeenCalled();
    expect(component.campaignListSubject.unsubscribe).toHaveBeenCalled();
    expect(component.campaignListDeleteSubject.unsubscribe).toHaveBeenCalled();
  });

  it('should call handleTableView', fakeAsync(() => {
    component.handleTableView();
    expect(component.hideDataTable).toBe(true);
    expect(component.showDataTable).toBe(false);

    tick(600);  

    expect(component.hideDataTable).toBe(false);
    expect(component.showDataTable).toBe(true);
  }));

  it('should call rerender', async () => {
    const dtTriggerSpy = spyOn(component.dtTrigger, 'next');

    await component.rerender();

    expect(dtInstance.destroy).toHaveBeenCalled();
    expect(dtTriggerSpy).toHaveBeenCalled();
  });

  it('should call tableDestroyOnly', async () => {
    await component.tableDestroyOnly();
    expect(dtInstance.destroy).toHaveBeenCalled();
  });

  it('should handle key events correctly', () => {
    component.unpausecampaign = 'unpause';
    component.pausecampaign = 'pause';
    component.resetListCampaign = 'reset';
    let fakeEvent: KeyboardEvent;

    fakeEvent = new KeyboardEvent('keypress', { 'key': 'Enter' });
    spyOn(component, 'campaignDelete');
    spyOnProperty(document, 'activeElement').and.returnValue({
      attributes: {
        'data-dismiss': {}
      }
    });

    component.deleteListCampaign = 'delete';
    component.keyEvent(fakeEvent);
    
    expect(component.deleteListCampaign).toBe('');
    expect(component.unpausecampaign).toBe('');
    expect(component.pausecampaign).toBe('');
    expect(component.resetListCampaign).toBe('');

    component.deleteListCampaign = '';
    component.keyEvent(fakeEvent);
    
    expect(component.campaignDelete).not.toHaveBeenCalled();
    expect(component.deleteListCampaign).toBe('');
    expect(component.unpausecampaign).toBe('');
    expect(component.pausecampaign).toBe('');
    expect(component.resetListCampaign).toBe('');
  });

  it('should set deleteCampaignObject, open dialog, and set deleteListCampaign', () => {
    dialogConfig = {
      backdrop: "static", 
      keyboard: false, 
      size: 'lg', 
      centered: true, 
      windowClass: 'default-modal-ui modal-cust-md'
    };

    dialogService = jasmine.createSpyObj('DialogService', ['open']);
    const data = { key: 'value' };
    component.campaignDeletePrompt(data);
    
    expect(component.deleteCampaignObject).toEqual(data);
    expect(component.deleteListCampaign).toBe('delete');
  });

  it('should handle campaign deletion correctly', () => {
    const handleTableViewSpy = spyOn(component, 'handleTableView');
    const campaignDeleteConfirmSpy = spyOn(component, 'campaignDeleteConfirm');
    const closeModalSpy = spyOn(component, 'closeModal');
    component.deleteCampaignObject = {campaignId:'9867i8hky89yih'};


    component.campaignDelete();

    expect(component.hideDataTable).toBe(true);
    expect(component.showDataTable).toBe(false);
    expect(campaignDeleteConfirmSpy).toHaveBeenCalled();
    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('should get campaign Channel List', () => {
    spyOn(component, 'tableLanguageOptions');
    component.language = { fileLanguage: '' };
    component.campaignChannelList();
    expect(component.tableLanguageOptions).toHaveBeenCalled();
    expect(component.campaignListError).toBeFalsy();
    expect(component.marketingCampaignTable).toEqual(['streamer', 'camera']);
    expect(component.FiltermarketingCampaign).toEqual(['streamer', 'camera']);
  });

  it('should confirm campaign deletion correctly', fakeAsync(() => {
    component.language= {fileLanguage:'es'}
    component.campaignDeleteConfirm();

    expect(component.campaignDeleted).toBe(true);
    expect(component.campaignAlertShow).toBe(true);
    expect(component.campaignAlertMsg).toBe('Campaign Deleted Successfully!.');

    tick(5000); // Wait for 5000 ms (5 seconds)
    expect(component.campaignAlertShow).toBe(false);

    tick(1000); 
  }));

  it('should reset error properties', () => {
    component.campaignDeleted = true;
    component.campaignAlertShow = true;
    component.campaignAlertMsg = 'Some message';
    component.campaignListError = true;
    component.campaignListErrorMsg = 'Some error message';

    component.errorReset();

    expect(component.campaignDeleted).toBe(false);
    expect(component.campaignAlertShow).toBe(false);
    expect(component.campaignAlertMsg).toBeUndefined();
    expect(component.campaignListError).toBe(false);
    expect(component.campaignListErrorMsg).toBe('');
  });

  it('should call selectCampaign', () => {
    const data = { campaignId: 'testCampaignId' };
    component.selectCampaign(data);
  });

  it('should call selectView', () => {
    const data = { campaignId: 'testCampaignId' };
    component.selectView(data);
  });

  it('should call newCampaign', () => {
    spyOn(sessionStorage,'removeItem')
    component.newCampaign();

    expect(sessionStorage.removeItem).toHaveBeenCalledWith('triggered');
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('StatusAct');
  });

  it('should call selectView', () => {
    component.channels();
  });

  it('should delete the campaign ', () => {
    spyOn(component, 'campaignDeleteConfirm');
    component.deleteCampaignObject = { campaignId: '100' };
    component.campaignDelete();
    expect(component.hideDataTable).toBeTruthy();
    expect(component.showDataTable).toBeFalsy();
    expect((component as any).marketingCampaignsApiService.CampaignDELETE).toHaveBeenCalledOnceWith('100');
    expect(component.campaignDeleteConfirm).toHaveBeenCalled();
  });

  // it('should call campaignChannelList ', () => {
  //   spyOn(component,'handleTableView');
  //   component.language = {fileLanguage: 'es'};
  //   component.scopes = {campaignRead: true};
  //   const expectedResponse = {}; // Adjust this value based on your actual use case
  //   let res = marketingCampaignsApiService.CampaignsListGET.and.returnValue(of(expectedResponse));   
  //   component.campaignChannelList();

  //   if(Array.isArray(res)) {
      
  //   } else {
  //     component.marketingCampaignTable = [];
  //     component.FiltermarketingCampaign = [];
  
  //     component.campaignChannelList();
  
  //     expect(component.marketingCampaignTable).toEqual([]);
  //     expect(component.FiltermarketingCampaign).toEqual([]);
  //   }
    
  // });

  it('should handle campaign list GET correctly when response is an array', () => {
    // const lang = 1; // Adjust this value based on your actual use case
    // const expectedResponse = [1, 2, 3]; // Assume the API responds with an array
    // // spyOn(marketingCampaignsApiService,'CampaignsListGET')

    //     component.language = {fileLanguage: 'es'};

    // marketingCampaignsApiService.CampaignsListGET.and.returnValue(of(expectedResponse));

    // component.campaignChannelList(); // Replace with the function containing the CampaignsListGET call

    // // expect(marketingCampaignsApiService.CampaignsListGET).toHaveBeenCalledWith('Scheduled', lang);
    // expect(component.marketingCampaignTable).toEqual(expectedResponse);
  });

  it('should handle campaign list GET correctly when response is not an array', () => {
    // const lang = 1; // Adjust this value based on your actual use case
    // const expectedResponse = 'not an array'; // Assume the API responds with a non-array
    // // spyOn(marketingCampaignsApiService,'CampaignsListGET')
    //     component.language = {fileLanguage: 'es'};

    // marketingCampaignsApiService.CampaignsListGET.and.returnValue(of(expectedResponse));

    // component.campaignChannelList(); // Replace with the function containing the CampaignsListGET call

    // // expect(marketingCampaignsApiService.CampaignsListGET).toHaveBeenCalledWith('Scheduled', lang);
    // expect(component.marketingCampaignTable).toEqual([]);
  });
});
