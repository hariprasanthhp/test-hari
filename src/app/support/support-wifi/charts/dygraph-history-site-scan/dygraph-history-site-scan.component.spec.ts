import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { DataServiceService } from 'src/app/support/data.service';
import { DygraphSiteScanService } from '../../services/dygraph-sitescan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { wifiMockData } from '../../services/wifi-mock-data';

import { DygraphHistorySiteScanComponent } from './dygraph-history-site-scan.component';
import { wifiRGsiteScanObjMockData } from 'src/assets/mockdata/support/support-wifi/rg';
import { wifiDygraphHistorySiteScanChartData, wifiDygraphHistorySiteScandeviceData, wifiDygraphHistorySiteScanRadioSummary, wifiDygraphHistorySiteScanDeviceInfo, wifiDygraphHistorySiteScanRadioSummaryObj, wifiDygraphHistorySiteScanSerialNumber, wifiDygraphHistorySiteScanmainchannelvalue, wifiDygraphHistorySiteScanradio5ChannelList, wifiDygraphSSIDObj, wifiDygraphStream, wifiDygraphsiteScanObj, wifiDygraphradio5channel, wifiDygraphradio24channel, wifiDygraphSiteObj } from 'src/assets/mockdata/support/support-wifi/charts';
import { of } from 'rxjs';

describe('DygraphHistorySiteScanComponent', () => {
  let component: DygraphHistorySiteScanComponent;
  let fixture: ComponentFixture<DygraphHistorySiteScanComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let languageservice: TranslateService;
  let dygraphSiteScanService: DygraphSiteScanService;
  let dataServiceService: DataServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DygraphHistorySiteScanComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [
        DygraphSiteScanService,
        wifiMockData,
        DataServiceService,
        TranslateService
      ]
    })
      .compileComponents()
      .then(() => {
        router = TestBed.inject(Router);
        activatedRoute = TestBed.inject(ActivatedRoute);
        dygraphSiteScanService = TestBed.inject(DygraphSiteScanService);
        dataServiceService = TestBed.inject(DataServiceService);
        languageservice = TestBed.inject(TranslateService);
        fixture = TestBed.createComponent(DygraphHistorySiteScanComponent);
        component = fixture.componentInstance;
        // component.siteScanObj = wifiRGsiteScanObjMockData;
        fixture.detectChanges()
      });
  });

  // it('should initialized onInit()', () => {
    
  //   var matched = [], macaddress = null;
  //   // languageservice.selectedLanguage.subscribe(data => {
  //   //   component.language = data; 
  //   spyOn(component, 'renderSiteScanGraph').and.callThrough(); 
  //   component.ngOnInit();
  //   component.renderSiteScanGraph(true);
  // // })
  //   // expect(component.dtOptions.pageLength).toBe(20, "Table length is not assigned");
  //   expect(component.renderSiteScanGraph).toBeTruthy();
  // })

  /*it('Load Dygraph Site Scan check', () => {
   
    var siteScanObj
    component.orgId = '470053';
    component.fsan = 'CXNK00284BB4';
    component.type = '2.4G';
    component.siteScanChannelSelected = [];
    component.siteScanSSIDSelected = [];
    component.ssidChecked = true;
    component.busynessChecked = true;
    component.deviceInfo = wifiDygraphHistorySiteScanDeviceInfo;
    sessionStorage.setItem('wifidiag.sitescan', JSON.stringify(wifiDygraphsiteScanObj));
    sessionStorage.setItem('radio5ChannelList', JSON.stringify(wifiDygraphradio5channel));
    sessionStorage.setItem('calix.deviceData', JSON.stringify(wifiDygraphHistorySiteScandeviceData));
    console.log("before setradiosummary")
    sessionStorage.setItem('radioSummary', JSON.stringify(wifiDygraphHistorySiteScanRadioSummaryObj));
    console.log("setradiosummary")
    sessionStorage.setItem('mainchannelvalue', JSON.stringify(wifiDygraphHistorySiteScanmainchannelvalue));
    console.log("before graphrender")

    spyOn(component, 'graphRender').and.callThrough();
    console.log("before graphrender")

    component.chartData = wifiDygraphHistorySiteScanChartData;
    console.log("before graphrender")
    component.radioSummary =wifiDygraphHistorySiteScanRadioSummaryObj
    component.graphRender()
    console.log("after graphrender")

    sessionStorage.setItem('serialNumber', JSON.stringify('CXNK008A7441'));
    sessionStorage.setItem('calix.mSSID', JSON.stringify('TonyBen_Office'));
    sessionStorage.setItem('radio5ChannelList', JSON.stringify(wifiDygraphHistorySiteScanradio5ChannelList));
    sessionStorage.setItem('radio24ChannelList', JSON.stringify(wifiDygraphradio24channel));
    sessionStorage.setItem('radio6ChannelList', 'undefined');
    fixture.detectChanges();
    console.log("before dygraphSiteScanService")

    spyOn(dygraphSiteScanService, 'getMainSsidObj').and.returnValue(wifiDygraphSSIDObj);
    component.radioSummary = wifiDygraphHistorySiteScanRadioSummary;
    console.log("after dygraphSiteScanService")

    const channelFilter = 'channelFilter', ssidFilter = 'ssidFilter';/***begin-aswin-11-05-2021-dygraph-filter-channel-issue-fix */

   /* spyOn(dygraphSiteScanService, 'getSiteScanFilterData').and.returnValue(channelFilter);
    let tempval:any = {"RadioEnabled":"true","Mode":"ax","Bandwidth":"20MHz","Channel":"6","AutoChannelEnable":"true","PossibleChannels":{"20MHz":[1,2,3,4,5,6,7,8,9,10,11],"40MHz":[1,2,3,4,5,6,7]},"PowerLevel":"100","NoiseLevel":"-97","PacketsSent":"28635","PacketsReceived":"10380","PacketsReTransmittedDownstream":"346267","PacketsDroppedDownstream":"1559"};
    console.log("after tempval")

    component.renderSiteScanGraph(true);
    console.log("after renderSiteScanGraph")
    spyOn(dygraphSiteScanService, 'getSiteScanObj').and.returnValue(of(tempval));
    spyOn(dygraphSiteScanService, 'getRadioSummaryObj').and.returnValue(of(tempval));
    console.log("after getRadioSummaryObj")


    siteScanObj = wifiDygraphSiteObj
    let ssids = [];
    let bandwidthscase = [
      "20MHZ"
    ]
    // spyOn(component, 'renderSiteScanGraph').and.returnValue();
    

    console.log(component.chartData)
    fixture.detectChanges();
   // expect(component.chartData['2.4G'].channel_bandwidth).toEqual(wifiDygraphHistorySiteScanChartData['2.4G'].channel_bandwidth)
  })*/
});