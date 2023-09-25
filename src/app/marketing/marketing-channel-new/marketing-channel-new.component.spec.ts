import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketingChannelNewComponent } from './marketing-channel-new.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MarketingRoutingsService } from '../shared/services/marketing-routings.service';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingCommonService } from '../shared/services/marketing-common.service';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { Subject, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('MarketingChannelNewComponent', () => {
  let component: MarketingChannelNewComponent;
  let fixture: ComponentFixture<MarketingChannelNewComponent>;
  let route: ActivatedRoute;
  let modalService: NgbModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketingChannelNewComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [NgbModal,{
        provide: MarketingRoutingsService, useValue: {
          newCampaignPage: jasmine.createSpy(),
        }
      },
      {
        provide: ActivatedRoute, useValue: {
          queryParams: of({
            typeSelected: 'traffic',
              criteria: 'usage',
              applicationsSelected: ['134dac7b-7207-472b-a21a-42ba827b95ca', 'All'],
              locationsSelected: ['21076ef9-6e82-4b92-b879-578ef125e838', 'All'],
              startDate: new Date(),
              endDate: new Date(),
              isApplicationGroup: 'no'
          }),
        }
      },
      { provide: TranslateService, useClass: CustomTranslateService },

      {
        provide: MarketingCommonService, useValue: {
          getCMCScopes: jasmine.createSpy().and.returnValue({ campaignRead: true, campaignWrite: true }),

        }
      },]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(MarketingChannelNewComponent);
        route = TestBed.inject(ActivatedRoute);
        modalService = TestBed.inject(NgbModal);
        component = fixture.componentInstance;
        component.languageSubject = new Subject();
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should load data', () => {
    component.scopes = {campaignRead : true,campaignWrite : true}
    component.ngOnInit();
    expect(component.hasScope).toBeTruthy();

    component.scopes = {campaignRead : false,campaignWrite : true}
    component.ngOnInit();
    expect(component.hasScope).toBeTruthy();

    component.scopes = {campaignRead : false,campaignWrite : false}
    component.ngOnInit();
    expect(component.hasScope).toBeFalsy();
  });

  it('should subcribe queryParams', () => {
    component.ngOnInit();
    fixture.detectChanges();
    history.pushState('', '', '');
    route.queryParams.subscribe((value) => {
      
    })
    expect(component.active_Chart).toEqual('campaign');
    expect(component.campaign).toBeTruthy();
    expect(component.channel).toBeFalsy();
    expect(component.triggeredCampaigns).toBeFalsy();

  });

  it('should call electronicLink', () => {
    window.open = jasmine.createSpy('open');
    const expectedUrl = 'https://calix.force.com/idp/login?app=0sp4u0000008OKk';

    component.electronicLink();

    expect(window.open).toHaveBeenCalledWith(expectedUrl);  
  });

  it('should call ngOnDestroy', () => {
    spyOn(component.languageSubject, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.languageSubject.unsubscribe);
  });

  it('should call newCampaign is 1', () => {
    component.newCampaign(1);
  });

  it('should call newCampaign is 0', () => {
    component.newCampaign(0);
  });

});
