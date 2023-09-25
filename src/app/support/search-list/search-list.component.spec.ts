import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTablesModule } from 'angular-datatables';
import { of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { searchResult } from 'src/assets/mockdata/support/search-list/search-list';
import { DataServiceService } from '../data.service';
import { SubscribeService } from '../shared/service/subscriber.service';

import { SearchListComponent } from './search-list.component';
import { SearchListModel } from '../shared/models/search-list.model';
import { HighlightSearch } from '../shared/custom-pipes/highlight.pipe';
import { SortDeviceDataPipe } from '../shared/sort-device-data.pipe';

describe('SearchListComponent', () => {
  let component: SearchListComponent;
  let fixture: ComponentFixture<SearchListComponent>;
  let subscribeService: SubscribeService
  let sso: SsoAuthService;
  let httpTestingController: HttpTestingController;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchListComponent,HighlightSearch,SortDeviceDataPipe],
      imports: [RouterTestingModule, HttpClientTestingModule,DataTablesModule,FormsModule,ReactiveFormsModule
],
      providers: [TranslateService, DataServiceService, HttpClient, SsoAuthService, SubscribeService]
    })
      .compileComponents()
      .then(() => {
        subscribeService = TestBed.inject(SubscribeService);
        http = TestBed.inject(HttpClient);
        sso = TestBed.inject(SsoAuthService);
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(SearchListComponent);
        component = fixture.componentInstance;
        component.orgId = 470053;
        component.searchText = '';
        fixture.detectChanges();
      });
  });

  it('should initialized onInit()', () => {
    spyOn(component, 'loadSubscriberData').and.callThrough();
    component.ngOnInit();
    // expect(component.dtOptions.pageLength).toBe(20, "Table length is not assigned");
    expect(component.loadSubscriberData).toHaveBeenCalled();
    expect(component.loadSubscriberData).toHaveBeenCalledTimes(1);
  });

  it('should get Search list data', () => {
    // spyOn(component, 'loadSubscriberData').and.callFake(()=>
    //   {
    //     component.showResult = true;
    //     const that = component;
    //     component.dtOptions = {
    //       pagingType: 'full_numbers',
    //       pageLength: 10,
    //       serverSide: true,
    //       processing: false,
    //       ordering: false,
    //       dom: "tip",
    //       responsive: true,
    //       ajax: (dataTablesParameters: any, callback) => {
    //         let pageNo = null;
    //         if (dataTablesParameters.start == 0) {
    //           pageNo = 0;
    //         } else {
    //           pageNo = dataTablesParameters.start / dataTablesParameters.length;
    //         }
    //         const params = new HttpParams()
    //           .set("orgId", component.orgId)
    //           .set("filter", component.searchText || "")
    //           .set("pageNumber", pageNo + 1)
    //           .set("pageSize", dataTablesParameters.length)
    //         http.get(`${'https://stage.api.calix.ai/v1/csc/subscriber-search'}`, { params }).subscribe((resp: SearchListModel) => {
    //           component.loader = false;
    //           component.count = resp.metadata.totalHits;
    //           component.showCount = true;
    //           if (resp?.records) {
    //             resp?.records.forEach(obj => {
    //               const RGDevices = obj?.devices.filter(device => device.opMode == "RG");
    //               if (RGDevices.length > 1) {
    //                 let deviceSet: any = [];
    //                 RGDevices.forEach(rg => {
    //                   let deviceCollector = [rg, ...obj?.devices.filter(device => device.wapGatewaySn == rg.serialNumber)];
    //                   deviceSet.push(deviceCollector);
    //                 });
    //                 const ds = deviceSet.flat(2).map(devs => devs.deviceId);
    //                 const notMatched = obj?.devices.filter(dev => ds.indexOf(dev.deviceId) == -1);
    //                 if (notMatched.length > 0) deviceSet.push()
    //                 obj.devices = deviceSet;
    //               }
    //             });
    
    //             //to fix CCL-35753
    //             const order = {
    //               'ONT': 1,
    //               'RG': 2,
    //               'WAP': 3
    //             }
    //             if (resp?.records.length) {
    //               for (let i = 0; i < resp.records.length; i++) {
    //                 if (resp?.records[i]?.devices) {
    //                   resp.records[i].devices = resp.records[i].devices.sort((a, b) => {
    //                     let opmodeA = a['ont'] ? 'ONT' : a?.opMode ? a?.opMode : '';
    //                     let opmodeB = b['ont'] ? 'ONT' : b?.opMode ? b?.opMode : '';
    //                     return (order[opmodeA] ? order[opmodeA] : 0) - (order[opmodeB] ? order[opmodeB] : 0);
    //                   });
    //                 }
    //               }
    //             }
    //             // fix-end CCL-35753
    
    //           }
    
    //           that.searchResult = resp;
    //           callback({
    //             recordsTotal: component.count,
    //             recordsFiltered: (component.filterCount != undefined) ? component.filterCount : that.count,
    //             data: []
    //           });
    //         }, error => {
    //           component.loader = false;
    //           component.showError = true;
    //           component.errorMsg = component.pageErrorHandle(error);
    //         })
    //       },
    //       drawCallback: (settings) => {
    //         component.changeTableStatusLanguage(settings);
    //         let total = settings._iRecordsDisplay; // for server side rendering
    //         let length = settings._iDisplayLength;
    //         if (total <= length) {
    //           $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
    //         } else {
    //           //$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
    //         }
    //       },
    //     };
    //   }
    // );
    spyOn(component, 'loadSubscriberData').and.callThrough();
    // component.searchResult = searchResult;
    // fixture.detectChanges();
    component.loadSubscriberData();
    component.searchResult = searchResult;
    // console.log("search list",component.searchResult);
    
    // const req = httpTestingController.expectOne(reqs => {
    //   console.log("reqs",reqs);
    //   return true;
    //   // return reqs.url.includes('subscriber-search') && reqs.method == 'GET'
    // });
    // tick();
    // req.flush(searchResult);
    fixture.detectChanges();
    expect(component.searchResult['records'][0].subscriberLocationId).toEqual(searchResult['records'][0].subscriberLocationId)
  });
});
