import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { InputBoxComponent } from './input-box.component';

describe('InputBoxComponent', () => {
  let component: InputBoxComponent;
  let fixture: ComponentFixture<InputBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputBoxComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      providers: [
        { provide: TranslateService, useClass: CustomTranslateService }
        , {
          provide: WebsocketService, useValue: {
            setEndpointValue: jasmine.createSpy(),
            isUnmapped: false,
          }
        },
        {
          provide: Router, useValue: {
            events: of(''),
            navigate: jasmine.createSpy(),
            url: ""
          }
        },
        {
          provide: HttpClient, useValue: {
            get: jasmine.createSpy().and.returnValue(of()),
          }
        }, {
          provide: SsoAuthService, useValue: {
            getOrganizationID: jasmine.createSpy().and.returnValue('1234'),
          }
        }]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(InputBoxComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange  
    spyOn(component, 'doSearch');
    //act
    fixture.detectChanges();
    //assert
    expect(component.ORG_ID).toEqual('1234');
    expect(component.doSearch).toHaveBeenCalled();
  });

  it('should do performIconSearch', () => {
    //arrange
    component.searchData = [];
    spyOn(component, 'performSearch');
    //act
    component.performIconSearch();
    //assert
    expect(component.performSearch).toHaveBeenCalled();

  });
  it('should go to Endpoint', () => {
    //arrange
    const data = { id: '12w34' }
    component.epSearchError = false;
    component.loading = false;
    component.searchText = 'false';
    //act
    component.gotoEndpoint(data);
    //assert
    expect(component.webSocketService.setEndpointValue).toHaveBeenCalledWith('12w34');
    expect(component.router.navigate).toHaveBeenCalledWith(['/systemAdministration/flowAnalyze/traffic/endpoint/realtime'], Object({ queryParams: Object({ id: '12w34' }) }));
  });

  it('should get mapped SearchEndPoint', () => {
    //arrange
    const stext = 'text';
    component.url = 'flowendpoint?org-id=undefined&searchstring=text';
    //act
    component.mappedSearchEndPoint(stext);
    //assert
    expect((component as any).http.get).toHaveBeenCalledWith('flowendpoint?org-id=undefined&searchstring=text');
  });

  it('should get unmapped Search EndPoint', () => {
    //arrange
    const stext = 'text1';
    component.url = 'correlator/flowendpoint/unmapped?org-id=undefined&ip=text1';
    //act
    component.unmappedSearchEndPoint(stext);
    //assert
    expect(component.searchData).toEqual([]);
    expect((component as any).http.get).toHaveBeenCalledWith('correlator/flowendpoint/unmapped?org-id=undefined&ip=text1');
  });
});
