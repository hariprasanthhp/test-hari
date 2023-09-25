import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { SharedModule } from 'src/app/cco/traffic/shared/shared.module';
import { ConvertorService } from 'src/app/shared/services/convertor.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Locations, Regions, Systems } from 'src/assets/mockdata/shared/rls.data';
import { HealthService } from '../../service/health.service';
import { NfainventoryService } from '../service/nfainventory.service';
import { RealtimeComponent } from './realtime.component';
import { ReportsComponent } from '../reports/reports.component';


describe('RealtimeComponent', () => {
  let component: RealtimeComponent;
  let fixture: ComponentFixture<RealtimeComponent>;
  let httpTestingController: HttpTestingController;
  let NfaService: NfainventoryService;
  let socketService: WebsocketService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealtimeComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'cco/health/pon-utilization/overview/basic', component: ReportsComponent },
      ]),
        HttpClientTestingModule,
        CommonModule,
        NgSelectModule,
        DataTablesModule,
        SharedModule,
        FormsModule],
      providers: [
        TranslateService,
        SsoAuthService,
        WebsocketService,
        NfainventoryService,
        ConvertorService, Title,
        NgbModal,
        HealthService,
        ChangeDetectorRef
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(RealtimeComponent);
      httpTestingController = TestBed.inject(HttpTestingController);
      NfaService = TestBed.inject(NfainventoryService);
      socketService = TestBed.inject(WebsocketService);
      component = fixture.componentInstance;
    });
  });

  it('get the regions', () => {
    spyOn(NfaService, 'GetRegions').and.returnValue(of(Regions))
    component.regionsApiLoader();
    expect(component.systemSelected).toMatch("All");
    expect(component.regionsDataArray).not.toBeUndefined();
    expect(component.regionsDataArray[1]).toEqual(Regions[0]);
  });


  it('get the locations', () => {
    spyOn(NfaService, 'GetLocations').and.returnValue(of(Locations))
    component.regionSelected = '3b208e8e-d95e-47bc-9fa4-04d009486403';
    component.loadLocationValue(event);
    expect(component.applyRebuild).toBeTrue();
    expect(component.locationDataArray).not.toBeUndefined();
    expect(component.locationDataArray[1]).toEqual(Locations[0]);
  });


  it('get the systems', () => {
    spyOn(NfaService, 'GetSystems').and.returnValue(of(Systems))
    component.regionSelected = '3b208e8e-d95e-47bc-9fa4-04d009486403';
    component.locationSelected = '7030b6a4-fa59-4f67-b7e1-74a6e681bfa1';
    component.loadSystemValue(event);
    expect(component.applyRebuild).toBeTrue();
    expect(component.systemDataArray).not.toBeUndefined();
    expect(component.systemDataArray[1]).toEqual(Systems[0]);
  });

  it('get the systems name', () => {
    component.systemDataArray = Systems;
    component.systemSelected = 'edda0781-774a-4d18-a024-fc43cb5c0c23';
    component.selectSystem(event);
    expect(component.applyRebuild).toBeTrue();
    expect(component.systemName).toMatch('93.104')
  });

  // it('check clear filter', () => {
  //   spyOn(component, 'applyFilter').and.callThrough();
  //   component.clearFilter();
  //   expect(component.selectedOption).toBe(1);
  //   expect(component.systemDataArray).toEqual(["All"]);
  //   expect(component.applyFilter).toHaveBeenCalled();
  // });


});
