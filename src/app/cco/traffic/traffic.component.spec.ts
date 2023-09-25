import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { HighchartsChartModule } from 'highcharts-angular';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WebsocketService } from '../shared/services/websocket.service';
import { RealtimeComponent } from './endpoints/realtime/realtime.component';
import { SharedModule } from './shared/shared.module';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { TrafficComponent } from './traffic.component';
import { aggregateEndpoint, Endpoint } from 'src/assets/mockdata/cco/traffic/endpoint/realtime.data';
import { MappedEndpointList } from 'src/assets/mockdata/cco/traffic/network/realtime.data';
import { deviceData, ONTData, ontDetails, subscriberDetails, unmappedEndpointDetails } from 'src/assets/mockdata/cco/traffic/shared/sharedApi.data';
import { of, throwError } from 'rxjs';
import { scopes } from 'src/assets/mockdata/shared/scopes.data';
import { environment } from 'src/environments/environment';

describe('TrafficComponent', () => {
  let component: TrafficComponent;
  let fixture: ComponentFixture<TrafficComponent>;
  let route: ActivatedRoute;
  let ssoAuthService: SsoAuthService
  let router: Router;
  let httpTestingController: HttpTestingController;
  let webSocketService: WebsocketService
  let routerSpy = { navigate: jasmine.createSpy('navigate'), url: '/cco/traffic/endpoints/realtime' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TrafficComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'cco/traffic/endpoints/realtime', component: RealtimeComponent },
      ]),
        HttpClientTestingModule,
        CommonModule,
        NgSelectModule,
        FormsModule,
        CalendarModule,
        HighchartsChartModule,
        SharedUtilsModule,
        SharedModule,
        DataTablesModule,
        NgxSliderModule],
      providers: [
        TranslateService,
        SsoAuthService,
        WebsocketService,
        NgbModal,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: convertToParamMap({
                id: '4e8b1495-13a4-4541-9ca0-5765cb0dae5d'
              })
            }
          }
        },
        { provide: Router, useValue: routerSpy }
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TrafficComponent);
        route = TestBed.inject(ActivatedRoute);
        ssoAuthService = TestBed.inject(SsoAuthService);
        webSocketService = TestBed.inject(WebsocketService);
        router = TestBed.inject(Router);
        httpTestingController = TestBed.inject(HttpTestingController);
        component = fixture.componentInstance;
      });
  });

  it('should initialized constructor()', () => {
    component.constructor;
  });

  it('should check the router url', () => {
    spyOn(component, 'doSearch').and.callThrough();
    spyOn(component, 'getEndPointsDetails').and.callThrough();
    spyOn(ssoAuthService, 'getScopes').and.returnValue(scopes);

    component.ngOnInit();
    expect(component.doSearch).toHaveBeenCalled();
    expect(component.doSearch).toHaveBeenCalledTimes(1);
    expect(component.endpointID).toMatch('4e8b1495-13a4-4541-9ca0-5765cb0dae5d')
    expect(component.getEndPointsDetails).toHaveBeenCalledWith(component.endpointID);
    environment.VALIDATE_SCOPE = 'true';
    component.ngOnInit();
  });

  it('should navigate to endpoint', () => {
    let data = {
      id: "399a6705-1af0-4ee3-9a9c-3726ec84b276",
      ipAddress: "192.168.10.1"
    }
    component.searchText = 'testing';
    component.gotoEndpoint(data);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/cco/traffic/endpoints/realtime'], { queryParams: { id: data.id } });
  });

  it('should get endpoint details', () => {
    let id = '46a827bc-ef49-4f24-a281-a0d2cb327f21';
    spyOn(component, 'isAggregatedGroupAvail').and.callThrough();
    component.getEndPointsDetails(id);
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(Endpoint);
    expect(component.endPointsInfo).toBeTruthy("Could not find the data");
    expect(component.endPointsInfo).toBe(Endpoint, "Value mismatched");
    expect(component.endPointsInfo.id).toEqual(id, 'Id mismathed');
    expect(component.isAggregatedGroupAvail).toHaveBeenCalledTimes(1);
  })

  it('should get endpoint details', () => {
    let id = '46a827bc-ef49-4f24-a281-a0d2cb327f21';
    component.getEndPointsDetails(id);
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.error(ErrorEvent['error']);
  })

  it('should perform IconSearch', () => {
    spyOn(component, 'gotoEndpoint').and.callThrough();
    component.searchText = 'Location-1_EP1';
    component.searchData = MappedEndpointList;
    component.performIconSearch();
    expect(component.loading).toBeFalse();
    expect(component.gotoEndpoint).toHaveBeenCalled();
    component.searchData = [];
    component.performIconSearch();
  });

  it('should get subscriber details', () => {
    sessionStorage.setItem("showSensitiveInfo", "false");
    component.getSubscriberDetails();
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(subscriberDetails);
    expect(component.subscriberInfo).toBeTruthy("Could not find the data");
    expect(component.subscriberInfo).toBe(subscriberDetails);
    expect(component.subscriberName).toEqual("wa*********");
    expect(component.subscriberInfo.phone).toEqual("25*********");
    expect(component.subscriberInfo.billingAddress).toEqual("20*********");
    expect(component.subscriberInfo.email).toEqual("CX***@ca***");
  })

  it('should get ont details', () => {
    component.getONTData('CXNK0021F516');
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(ontDetails);
    expect(component.deviceInfo).toEqual(deviceData);
    expect(component.ontInfo).toEqual(ONTData);
  })

  it('should get unmapped endpoint details', () => {
    spyOn(component, 'unmappedSearchEndPoint').and.returnValue(of(unmappedEndpointDetails))
    component.getUnmappedDetails('10.245.239.125');
    expect(component.webSocketService.isUnmapped).toBeTrue();
    expect(component.endPointName).toMatch("10.245.239.125");
  })

  it('should get unmapped endpoint details 404', () => {
    spyOn(component, 'unmappedSearchEndPoint').and.returnValue(of(404))
    component.getUnmappedDetails('10.245.239.125');
    expect(component.webSocketService.isUnmapped).toBeTrue();
  })

  it('should get unmapped endpoint details', () => {
    spyOn(component, 'unmappedSearchEndPoint').and.returnValue(throwError({ error: 'error' }))
    component.getUnmappedDetails('10.245.239.125');
  })


  it('should get get endpoints aggregate group details', () => {
    let id = '491453e8-9411-421d-b46a-bf2602dcf5cb';
    sessionStorage.setItem("showSensitiveInfo", "false");
    component.getEndPointsByAggGroupDetails(id);
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(aggregateEndpoint);
    expect(component.webSocketService.isUnmapped).toBeFalse();
    expect(component.isAggregate).toBeTrue();
    expect(component.aggregateGroupList).toBe(aggregateEndpoint);
    expect(component.aggregateGroupList[0].aggGroup).toEqual(id); 2552240001
    expect(component.aggregateGroupList[0].subscriberName).toEqual("wa*********");
    expect(component.aggregateGroupList[0].subscriberPhone).toEqual("25*********");
    expect(component.aggregateGroupList[0].email).toEqual("CX***@ca***");
  })

  it('should check aggregate group or not', () => {
    spyOn(component, 'validateUUID').and.callThrough();
    spyOn(component, 'getEndPointsByAggGroupDetails').and.callThrough();
    component.isAggregatedGroupAvail(aggregateEndpoint[0]);
    expect(component.validateUUID).toHaveBeenCalled();
    expect(component.getEndPointsByAggGroupDetails).toHaveBeenCalled();

  })

  it('should show endpoint details', () => {
    spyOn(component, 'performSearch').and.callThrough();
    let id = '491453e8-9411-421d-b46a-bf2602dcf5cb';
    component.searchText = 'testing';
    component.showEndPoints(id);
    expect(component.performSearch).toHaveBeenCalled();
  })

  it('search and close and goSubscribers', () => {
    spyOn(component, 'performSearch').and.callThrough();
    component.search('testing');
    webSocketService.showModalInfo$.next('true');
    webSocketService.endPointSearchError$.next(true);
    webSocketService.endPointSearchError$.next(false);
    component.showModalInfo();
    component.goSubscribers(true);
    // component.watchSearchError();
    // component.close();
  })

  it('mappedSearchEndPoint and unmappedSearchEndPoint', () => {
    component.mappedSearchEndPoint('testing');
    component.unmappedSearchEndPoint('testing');
  })

  it('gotoPreviousScreen and searchByCharacters', () => {
    spyOn(ssoAuthService, 'getEPRredirectFrom').and.returnValue('cco/traffic/endpoints/realtime')
    component.gotoPreviousScreen();
    component.getEndpointName(MappedEndpointList);

    // const event: KeyboardEvent = new KeyboardEvent('keyup', { bubbles: true, cancelable: true });
    // Object.defineProperty(event, 'target', { value: 'testing' });
    // component.searchByCharacters(event);
  })

  it('should mask SensitiveInfo', () => {
    //arrange
    component.endPointsInfo = { subscriberName: "CXNK_N FiCOC", subscriberPhone: "12345678", cmSubscriberInfo: "", email: "CX@FionaorgCOC.com", cmEmail: "" };
    component.endPointName = "CXNK Fionaorg"
    sessionStorage.setItem("showSensitiveInfo", "false");
    //act
    component.maskSensitiveInfo();
    //assert
    expect(component.endPointsInfo.subscriberName).toEqual("CX*********");
    expect(component.endPointsInfo.subscriberPhone).toEqual("12*********");
    expect(component.endPointsInfo.email).toEqual("CX***@Fi***");
    expect(component.endPointName).toEqual("CX*********");
  });
});
