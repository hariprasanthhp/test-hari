import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { EndpointComponent } from './endpoint.component';

describe('EndpointComponent', () => {
  let component: EndpointComponent;
  let fixture: ComponentFixture<EndpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndpointComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      providers: [
        { provide: TranslateService, useClass: CustomTranslateService },
        {
          provide: SsoAuthService, useValue: {
            getOrgId: jasmine.createSpy().and.returnValue('3434'),
            hasPageAccess$: of({ access: true }),
            setTrafficReportChartSubscriberInfo: jasmine.createSpy().and.returnValue(''),
            getEPRredirectFrom: jasmine.createSpy().and.returnValue(''),
            getEndpointRedirectTo: jasmine.createSpy().and.returnValue(''),
            setEndpointRedirectTo: jasmine.createSpy(),
            setEPRredirectFrom: jasmine.createSpy(),
            getOrganizationID: () => ''
          }
        },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: { queryParamMap: { get: jasmine.createSpy().and.returnValue('1222') } },
          }
        },
        {
          provide: WebsocketService, useValue: {
            setEndpointValue: jasmine.createSpy(),
            isUnmapped: false,
            endPointName: '',
            getCurrentMonitorInfo: jasmine.createSpy().and.returnValue(''),
            endPointSearchError$: of('err'),
          }
        },
        {
          provide: HttpClient, useValue: {
            get: jasmine.createSpy().and.returnValue(of({ name: '', ipAddress: '', mappedBy: '', updateTime: '', createTime: '', subscriberId: '' })),
          }
        }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(EndpointComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange 
    (component as any).router = { url: 'endpoint.com' };
    spyOn(component, 'doSearch');
    //act
    fixture.detectChanges();
    //assert
    expect(component.menus[0].link).toEqual('realtime');
    expect(component.menus[1].link).toEqual('reports');
    expect(component.activeRoute).toEqual('endpoint.com');
    expect(component.webSocketService.endPointName).toEqual("");
    expect(component.hasPageAccess).toBeTruthy();
    expect(component.showEndpointSearch).toBeTruthy();
    expect(component.doSearch).toHaveBeenCalled();
  });

  it('should get mapped SearchEndPoint', () => {
    //arrange
    const stext = 'text';
    component.url = 'flowendpoint?org-id=&searchstring=text';
    //act
    component.mappedSearchEndPoint(stext);
    //assert
    expect(component.searchData).toEqual([]);
    expect((component as any).http.get).toHaveBeenCalledWith('flowendpoint?org-id=&searchstring=text');
  });

  it('should get unmapped Search EndPoint', () => {
    //arrange
    const stext = 'text1';
    component.url = 'correlator/flowendpoint/unmapped?org-id=&ip=text1';
    //act
    component.unmappedSearchEndPoint(stext);
    //assert
    expect(component.searchData).toEqual([]);
    expect((component as any).http.get).toHaveBeenCalledWith('correlator/flowendpoint/unmapped?org-id=&ip=text1');

  });

  // it('should get EndPoints Details', () => {
  //   //arrange
  //   const id = '1231';
  //   component.url = 'flowendpoint?org-id=&flowId=1231';
  //   spyOn(component, 'isAggregatedGroupAvail');

  //   //act
  //   component.getEndPointsDetails(id);
  //   //assert
  //   expect((component as any).http.get).toHaveBeenCalledWith('flowendpoint?org-id=&flowId=1231');
  //   expect(component.isAggregatedGroupAvail).toHaveBeenCalledWith({ name: '', ipAddress: '', mappedBy: '', updateTime: '', createTime: '', subscriberId: '' });
  //   expect(component.endPointsInfo).toEqual({ name: '', ipAddress: '', mappedBy: '', updateTime: '', createTime: '', subscriberId: '' });
  //   expect(component.endPointName).toEqual("");
  //   expect(component.IPAddress).toEqual("");
  //   expect(component.mappedBy).toEqual("");
  //   expect(component.lastUpdatedTime).toEqual("");
  //   expect((component as any).sso.setTrafficReportChartSubscriberInfo).toHaveBeenCalledWith("");

  // });

  it('should get Unmapped Details', () => {
    //arrange
    const id = '1231';
    spyOn(component, 'unmappedSearchEndPoint').and.callFake(() => { return of([{ name: 'name', ipAddress: '22.43', mappedBy: '', updateTime: '', createTime: '', subscriberId: '' }]) });

    //act
    component.getUnmappedDetails(id);
    //assert
    expect(component.unmappedSearchEndPoint).toHaveBeenCalledWith('1231');
    expect(component.webSocketService.isUnmapped).toBeTruthy();
    expect(component.endPointName).toEqual('name');
    expect(component.IPAddress).toEqual('22.43');
    expect(component.mappedBy).toEqual("");
    expect(component.lastUpdatedTime).toEqual("");
  });

  it('should get Subscriber Details', () => {
    //arrange
    const url = 'subscribers/undefined?includeDeviceData=false&includeDecommissionedDevices=false';
    //act
    component.getSubscriberDetails();
    //assert
    expect((component as any).http.get).toHaveBeenCalledWith(url);
    expect(component.subscriberInfo).toEqual({ name: '', ipAddress: '', mappedBy: '', updateTime: '', createTime: '', subscriberId: '' });
    expect(component.subscriberName).toEqual('');
  });
});
