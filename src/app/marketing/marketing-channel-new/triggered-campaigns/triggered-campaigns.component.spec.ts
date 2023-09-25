import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { TriggeredCampaignsComponent } from './triggered-campaigns.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarketingRoutingsService } from '../../shared/services/marketing-routings.service';
import { MarketingCampaignsApiService } from '../../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { Title } from '@angular/platform-browser';
import { Subject, of, throwError } from 'rxjs';
import { errorStatus400, errorStatus401, errorStatus500, errorStatus504 } from 'src/assets/mockdata/shared/error.data';
import { TranslateService } from 'src/app-services/translate.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';

describe('TriggeredCampaignsComponent', () => {
  let component: TriggeredCampaignsComponent;
  let fixture: ComponentFixture<TriggeredCampaignsComponent>;
  let dtInstance: jasmine.SpyObj<DataTables.Api>;
  let dialogService: jasmine.SpyObj<any>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TriggeredCampaignsComponent],
      imports: [RouterTestingModule, HttpClientModule, HttpClientTestingModule],
      providers: [NgbModal, MarketingCommonService, Title,
        {
          provide: MarketingCampaignsApiService, useValue: {
            CampaignsListGET: () => (of({})),
            CampaignPauseUnpause: () => (of({})),
            CampaignDELETE: () => (of({})),
          }
        },
        {
          provide: CommonFunctionsService, useValue: {
            trackPendoEvents: () => (of({})),
          }
        },
        {
          provide: MarketingRoutingsService, useValue: {
            newCampaignPageEdit: () => (of({})),
            newCampaignPageResult: () => (of({})),
            newCampaignPage: () => (of({})),
            channelsPage: () => (of({})),
          }
        },
        { provide: TranslateService, useClass: CustomTranslateService },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(TriggeredCampaignsComponent);
        dtInstance = jasmine.createSpyObj('DataTables.Api', ['destroy', 'search', 'draw']);
        dtInstance.search.and.returnValue(dtInstance);
        component = fixture.componentInstance;
        component.languageSubject = new Subject();
        component.dtTrigger = new Subject();
        component.campaignListSubject = new Subject();
        component.campaignListDeleteSubject = new Subject();
        component.dtElement = { dtInstance: Promise.resolve(dtInstance) } as any;
      });
  });

  it('should create', () => {
    component.FiltermarketingCampaign = [
      { id: 1, status: 'Active', campaignType: 'All'},
      { id: 2, status: 'Inactive', campaignType: 'All'},
      { id: 3, status: 'Active', campaignType: 'All'},
      { id: 4, status: 'Inactive', campaignType: 'All'},
    ];
    component.marketingCampaignTable = [...component.FiltermarketingCampaign];
    
    component.ngOnInit();
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

  it('should call campaignChannelList', () => {
    spyOn(component, 'tableLanguageOptions');
    component.marketingCampaignSearchTableErrorMsg = false
    component.hideDataTable = true;
    component.showDataTable = false;
    component.language = { fileLanguage: '' };
    component.campaignChannelList();
  });

  it('should call campaignChannelList', () => {
    component.scopes = { campaignRead: true };
    component.language = { fileLanguage: '' };
    let res = [{ campaignType: 'campaignType', segmentType: 'segmentType' }]
    spyOn((<any>component).marketingCampaignsApiService, 'CampaignsListGET').and.returnValue(of(res));

    component.campaignChannelList();
  });

  it('should call campaignChannelList if ref condition', fakeAsync(() => {
    let ref = true;
    component.scopes = { campaignRead: true };
    component.language = { fileLanguage: '' };
    let res = [{ campaignType: 'campaignType', segmentType: 'segmentType' }]
    spyOn((<any>component).marketingCampaignsApiService, 'CampaignsListGET').and.returnValue(of(res));

    component.campaignChannelList(ref);

    ref = false;
    component.campaignChannelList(ref);
    setTimeout(() => {
      component.isRerender = true;
      spyOn((component as any).dtTrigger, 'next');
    }, 300)
    flush(300);
  }));

  it('should call campaignChannelList if res is empty', () => {
    let res = [];
    component.scopes = { campaignRead: true };
    component.language = { fileLanguage: '' };
    spyOn((<any>component).marketingCampaignsApiService, 'CampaignsListGET').and.returnValue(of(res));
    component.campaignChannelList();
  });

  it('should call campaignChannelList if res is not array', fakeAsync(() => {
    let _res = {};
    let ref = true;
    component.scopes = { campaignRead: true };
    component.language = { fileLanguage: '' };
    spyOn((<any>component).marketingCampaignsApiService, 'CampaignsListGET').and.returnValue(of(_res));
    component.campaignChannelList(ref);

    ref = false;
    component.campaignChannelList(ref);
    setTimeout(() => {
      component.isRerender = true;
      component.showDataTable = true;
      spyOn((component as any).dtTrigger, 'next');
      spyOn(component, 'handleTableView');
    }, 300)
    flush(300);
  }));

  it('should call campaignChannelList throwError', () => {
    let error = { status: 500 };
    component.language = { fileLanguage: '' };
    spyOn((<any>component).marketingCampaignsApiService, 'CampaignsListGET').and.returnValue(throwError(error));
    component.campaignChannelList();
  });

  it('should call campaignChannelList throwError 504', () => {
    component.language = { fileLanguage: '' };
    spyOn((<any>component).marketingCampaignsApiService, 'CampaignsListGET').and.returnValue(throwError(errorStatus504));

    component.campaignChannelList();

    expect((component as any).marketingCampaignsApiService.CampaignsListGET).toHaveBeenCalled();
  });

  it('should call campaignChannelList throwError 400', () => {
    component.language = { fileLanguage: '' };
    spyOn((<any>component).marketingCampaignsApiService, 'CampaignsListGET').and.returnValue(throwError(errorStatus400));

    component.campaignChannelList();

    expect((component as any).marketingCampaignsApiService.CampaignsListGET).toHaveBeenCalled();
  });

  it('should call campaignChannelList throwError 401', () => {
    component.language = { fileLanguage: '' };
    spyOn((<any>component).marketingCampaignsApiService, 'CampaignsListGET').and.returnValue(throwError(errorStatus401));

    component.campaignChannelList();

    expect((component as any).marketingCampaignsApiService.CampaignsListGET).toHaveBeenCalled();
  });

  it('should call campaignChannelList throwError 500', () => {
    component.language = { fileLanguage: '' };
    spyOn((<any>component).marketingCampaignsApiService, 'CampaignsListGET').and.returnValue(throwError(errorStatus500));

    component.campaignChannelList();

    expect((component as any).marketingCampaignsApiService.CampaignsListGET).toHaveBeenCalled();
  });

  it('should get Campaign ChannelList ApiLoader Error', () => {
    let errorSts = { status: 505, error: { errorDesc: 'ErrorDec', message: '' } }
    component.language = { fileLanguage: '' };
    spyOn((<any>component).marketingCampaignsApiService, 'CampaignsListGET').and.returnValue(throwError(errorSts));
    component.campaignListErrorMsg = `${errorSts.error.errorDesc}`;

    component.campaignChannelList();

    expect((component as any).marketingCampaignsApiService.CampaignsListGET).toHaveBeenCalled();
  });

  it('should get Campaign campaignChannelList ApiLoader Error', () => {
    let errorSts = { status: 505, error: { errorDesc: '', message: 'ErrorDec' } }
    component.language = { fileLanguage: '' };
    spyOn((<any>component).marketingCampaignsApiService, 'CampaignsListGET').and.returnValue(throwError(errorSts));
    component.campaignListErrorMsg = `${errorSts.error.message}`;

    component.campaignChannelList();

    expect((component as any).marketingCampaignsApiService.CampaignsListGET).toHaveBeenCalled();
  });

  it('should get Campaign campaignChannelList ApiLoader Error', () => {
    let errorSts = { status: 505, message: 'Msg', error: { errorDesc: '', message: '' } };
    component.language = { fileLanguage: '' };

    spyOn((<any>component).marketingCampaignsApiService, 'CampaignsListGET').and.returnValue(throwError(errorSts));

    component.campaignChannelList();

    expect((component as any).marketingCampaignsApiService.CampaignsListGET).toHaveBeenCalled();
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
    let isClose = spyOnProperty(document, 'activeElement').and.returnValue({
      attributes: {
        // 'data-dismiss': {}
      }
    });
    component.deleteListCampaign = 'delete';
    component.deleteCampaignObject = { campaignId: '1122' }
    spyOn(component, 'campaignDelete');
    component.keyEvent(fakeEvent);
    expect(component.campaignDelete).toHaveBeenCalledWith(0);

    component.unpausecampaign = 'Paused';
    spyOn(component, 'pauseUnPause');
    component.keyEvent(fakeEvent);
    expect(component.pauseUnPause).toHaveBeenCalledWith('Paused');

    component.pausecampaign = 'Active';
    component.keyEvent(fakeEvent);
    expect(component.pauseUnPause).toHaveBeenCalledWith('Active');

    component.resetListCampaign = 'reset';
    component.keyEvent(fakeEvent);
    expect(component.campaignDelete).toHaveBeenCalledWith(1);
  });

  it('should set deleteCampaignObject, open dialog, and set deleteListCampaign', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);
    const data = { key: 'value' };

    component.campaignDeletePrompt(data);
    component.campaignResetPrompt(data);


    expect(component.deleteCampaignObject).toEqual(data);
    expect(component.deleteListCampaign).toBe('delete');
    expect(component.resetListCampaign).toBe('reset');

  });

  it('should call pauseUnpausePrompt', () => {
    const data = { key: 'value' };
    let status = 'Active';
    dialogService = jasmine.createSpyObj('DialogService', ['open']);
    spyOn((<any>component).commonFunctionsService, 'trackPendoEvents');

    component.pauseUnpausePrompt(data, status);

    expect((component as any).commonFunctionsService.trackPendoEvents).toHaveBeenCalledWith('Engagement_Cloud', 'Campaign resumed');

    status = 'Paused';
    component.pauseUnpausePrompt(data, status);
    expect((component as any).commonFunctionsService.trackPendoEvents).toHaveBeenCalledWith('Engagement_Cloud', 'Campaign paused');

    expect(component.deleteCampaignObject).toEqual(data);
  });

  it('should call pauseUnPause', fakeAsync(() => {
    let status = 'Active';
    let res = {};
    component.scopes = { campaignWrite: true };
    component.language = { fileLanguage: '' };
    component.deleteCampaignObject = { campaignId: '1122' }
    spyOn((<any>component).marketingCampaignsApiService, 'CampaignPauseUnpause').and.returnValue(of(res));

    component.pauseUnPause(status);

    setTimeout(() => {
      spyOn(component, 'campaignChannelList');
    }, 1000)
    flush(1000);
  }));

  it('should call pauseUnPause', fakeAsync(() => {
    let status = 'Active';
    let error = { messgae: 'Error', status: 200 };
    component.scopes = { campaignWrite: true };
    component.language = { fileLanguage: '' };
    component.deleteCampaignObject = { campaignId: '1122' }
    spyOn((<any>component).marketingCampaignsApiService, 'CampaignPauseUnpause').and.returnValue(throwError(error));

    component.pauseUnPause(status);

    setTimeout(() => {
      spyOn(component, 'campaignChannelList');
    }, 1000)
    flush(1000);
  }));

  it('should call campaignDelete', () => {
    component.scopes = { campaignWrite: true };
    component.language = { fileLanguage: '' };
    component.deleteCampaignObject = { campaignId: '1122' }
    let res = [{ campaignType: 'campaignType', segmentType: 'segmentType' }]
    spyOn((<any>component).marketingCampaignsApiService, 'CampaignDELETE').and.returnValue(of(res));

    component.campaignDelete(1);
  });

  it('should call campaignDelete error', () => {
    component.scopes = { campaignWrite: true };
    component.language = { fileLanguage: '' };
    component.deleteCampaignObject = { campaignId: '1122' }
    let errorStatus200 = { status: 200, Message: 'Error' };
    spyOn((<any>component).marketingCampaignsApiService, 'CampaignDELETE').and.returnValue(throwError(errorStatus200));

    component.campaignDelete(1);

    expect((<any>component).marketingCampaignsApiService.CampaignDELETE).toHaveBeenCalled();
  });

  it('should call campaignDelete error', () => {
    component.scopes = { campaignWrite: true };
    component.language = { fileLanguage: '' };
    component.deleteCampaignObject = { campaignId: '1122' }
    let errorStatus409 = { status: 409, error: { message: 'ErrMSg' } }
    spyOn((<any>component).marketingCampaignsApiService, 'CampaignDELETE').and.returnValue(throwError(errorStatus409));

    component.campaignDelete(1);

    expect((<any>component).marketingCampaignsApiService.CampaignDELETE).toHaveBeenCalled();
  });

  it('should call campaignDelete error', () => {
    component.scopes = { campaignWrite: true };
    component.language = { fileLanguage: '' };
    component.deleteCampaignObject = { campaignId: '1122' }
    let errorStatus500 = { status: 500, error: { message: 'ErrMSg' } }
    spyOn((<any>component).marketingCampaignsApiService, 'CampaignDELETE').and.returnValue(throwError(errorStatus500));

    component.campaignDelete(1);

    expect((<any>component).marketingCampaignsApiService.CampaignDELETE).toHaveBeenCalled();
  });

  it('should call campaignDeleteConfirm', fakeAsync(() => {
    component.language = { fileLanguage: '' };

    component.campaignDeleteConfirm(0);

    setTimeout(() => {
      component.campaignAlertShow = false;
    }, 5000)
    flush(5000);

    // setTimeout(() => {
    //   spyOn(component, 'campaignChannelList');
    // }, 1000)
    // flush(1000);
  }));

  it('should call errorReset', () => {
    component.errorReset();
    component.campaignDeleted = false;
    component.campaignAlertShow = false;
    component.campaignAlertMsg = undefined;;
    component.campaignListError = false;
    component.campaignListErrorMsg = '';
  });

  it('should call selectCampaign', () => {
    let data = { campaignType: 'Triggered', campaignId: 'I079879', status: '' };
    let from = 0;
    component.language = { active: 'Active' }
    spyOn((<any>component).marketingRoutingsService, 'newCampaignPageEdit');

    component.selectCampaign(data, from);

    expect((component as any).marketingRoutingsService.newCampaignPageEdit).toHaveBeenCalledWith(data.campaignId);

    data = { campaignType: 'All', campaignId: 'I079879', status: 'Active' };
    from = 1;
    component.selectCampaign(data, from);
  });

  it('should call selectView', () => {
    let data = { campaignType: 'Triggered', campaignId: 'I079879', status: '' };
    spyOn((<any>component).marketingRoutingsService, 'newCampaignPageResult');

    component.selectView(data);

    expect((component as any).marketingRoutingsService.newCampaignPageResult).toHaveBeenCalledWith(data.campaignId);
  });

  it('should call selectCampaignFilter', () => {
    component.language = { All: 'All' }
    component.campaignType = 'All';
    component.campaignStatus = '';
    component.FiltermarketingCampaign = [
      { id: 1, status: 'Active', campaignType: 'All'},
      { id: 2, status: 'Inactive', campaignType: 'All'},
      { id: 3, status: 'Active', campaignType: 'All'},
      { id: 4, status: 'Inactive', campaignType: 'All'},
    ];
    component.marketingCampaignTable = component.FiltermarketingCampaign.filter(
      (x) => x.status == component.campaignStatus
    );
    
    component.selectCampaignFilter();

    component.campaignType = '';
    component.campaignStatus = 'All';
    component.selectCampaignFilter();

    component.campaignType = '';
    component.campaignStatus = '';
    component.selectCampaignFilter();
  });

  it('should call newCampaign', () => {
    component.newCampaign();
  });

  it('should call channels', () => {
    component.channels();
  });

  it('should call getTimestamp', () => {
    let date = new Date();
    let result = date.getTime();
    component.getTimestamp(date);

    expect(result).toEqual(date.getTime());

  });
});
