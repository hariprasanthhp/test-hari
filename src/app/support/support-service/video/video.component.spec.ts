import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from '../../data.service';

import { VideoComponent } from './video.component';
import { metaData } from 'src/assets/mockdata/support/shared/subscriber-menu.data';
import { servicestatus, subscriberservicedata } from 'src/assets/mockdata/support/support-service/voice/voice.service';

import { videodetails, deviceInfo, videoapidataerror, metaDatarestructure, videodetailwowaninfo, videodetailswaninfoempty,videodetailsforip } from 'src/assets/mockdata/support/support-service/video/video.service';
import { throwError, of } from 'rxjs';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';


describe('VideoComponent', () => {
  let component: VideoComponent;
  let fixture: ComponentFixture<VideoComponent>;
  let ssoService: SsoAuthService;
  let dataservice: DataServiceService;
  let SubscriberId

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [TranslateService, DataServiceService, SsoAuthService]

    })
      .compileComponents()
      .then(() => {
        dataservice = TestBed.inject(DataServiceService);
        ssoService = TestBed.inject(SsoAuthService);
        fixture = TestBed.createComponent(VideoComponent);
        component = fixture.componentInstance;
        SubscriberId = ssoService.getCSCSubscriberId();

        //  component.serialNumberSelected='CXNK00A0D228'
        // component.orgId='470053'
        spyOn(component, 'objectExistence').and.returnValue(5)
        spyOn(ssoService, 'getCscType').and.returnValue(of('EME'))
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('video functions with onInit flow', () => {
    sessionStorage.setItem('calix.deviceData', JSON.stringify(deviceInfo));

    spyOn(component, 'loadData').and.callThrough();
    spyOn(dataservice, 'getMetaData').and.returnValue(of(videodetails))
    spyOn(dataservice, 'getServiceVideo').and.returnValue(of(videodetails))
    expect(component).toBeTruthy();


    component.ngOnInit();
    fixture.detectChanges();

  })

  it('video function', () => {
    // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
    sessionStorage.setItem('calix.deviceData', JSON.stringify(deviceInfo));
    spyOn(dataservice, 'getServiceVideo').and.returnValue(of(videodetails))
    component.loadData();
    expect(component).toBeTruthy();
  })
  it('video error handling', () => {
    sessionStorage.setItem('calix.deviceData', JSON.stringify(deviceInfo));
    component.loadData();
    spyOn(dataservice, 'getServiceVideo').and.returnValue(throwError(errorStatus401));
    expect(component).toBeTruthy();

  })

  it('pageErrorHandle function', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough();
    component.pageErrorHandle(videoapidataerror);
    component.alertMessage = "Access Denied"
    expect(component.pageErrorHandle).toHaveBeenCalled();
  });
  it('select WAN', () => {
    component.wanInfo = videodetails.wanInfo.data;
    component.wanInfoToDisplay.Uptime = 1;
    component.wanSelection(0);
    component.dataRender(videodetails);

    component.wanInfoToDisplay.Uptime = 0;
    component.wanSelection(0);
    component.dataRender(videodetails);
  });


  it('video data render function', () => {
    spyOn(component, 'dataRender').and.callThrough();

    // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
    component.dataRender(videodetails);
    expect(component).toBeTruthy();
  })
  
  it('video data render with null ip case', () => {
    spyOn(component, 'dataRender').and.callThrough();

    // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
    component.dataRender(videodetailsforip);
    expect(component).toBeTruthy();
  })
  
  /*it('video data render function waninfo empty', () => {
    spyOn(component, 'dataRender').and.callThrough();

    // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
    component.dataRender(videodetailswaninfoempty);
    expect(component).toBeTruthy();
  })*/
  it('video data render without waninfo ', () => {
    spyOn(component, 'dataRender').and.callThrough();

    // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
    component.dataRender(videodetailwowaninfo);
    expect(component).toBeTruthy();
  })

  it('getmetadata function', () => {
    // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
    component.serialNumberSelected = 'CXNK00FEEEA5';
    component.routerSerialNumber = 'CXNK00FEEEA5';
    spyOn(dataservice, 'fetchMetaData').and.returnValue(of(metaData))
    component.getMetaData();

    //dataservice.setMetaData('CXNK00FEEEA5', metaData);
    expect(component).toBeTruthy();
  })
  it('getmetadata error function', () => {
    spyOn(dataservice, 'fetchMetaData').and.returnValue(throwError(errorStatus401))
    component.getMetaData();

    //dataservice.setMetaData('CXNK00FEEEA5', metaData);
    expect(component).toBeTruthy();
  })
  /* it('reStructureMeta function', () => {
     component.metaData = metaData;
 
     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
     component.reStructureMeta(metaDatarestructure);   
     expect(component).toBeTruthy();
   })
 */

  it('getAllSubsServicesData function', () => {
    spyOn(dataservice, 'getDetailedSubscriberServices').and.returnValue(of(subscriberservicedata))

    // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
    component.getAllSubsServicesData();
    component.allSubsServicesDataSubs = subscriberservicedata
    component.getservicestatus();
    component.allSubsServicesData = subscriberservicedata ? subscriberservicedata : {};
    var services = component.allSubsServicesData.services;
    component.videoservice = services[0] ? services[0] : {};;
    component.servicesData = component.videoservice

    expect(component).toBeTruthy();
  })

  it('getAllSubsServicesData error case', () => {
    spyOn(dataservice, 'getDetailedSubscriberServices').and.returnValue(throwError(errorStatus401));
    component.getAllSubsServicesData();
  });

  it('getservicestatus function', () => {
    spyOn(dataservice, 'servicestatusapicall').and.returnValue(of(servicestatus))
    component.getservicestatus();
    expect(component).toBeTruthy();
  })

  it('getservicestatus error case', () => {
    spyOn(dataservice, 'servicestatusapicall').and.returnValue(throwError(errorStatus401));
    component.getservicestatus();
  });


});
