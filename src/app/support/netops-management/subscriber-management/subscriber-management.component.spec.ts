import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA, ElementRef, NO_ERRORS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from '../../data.service';
import { SubscribeService } from '../../shared/service/subscriber.service';
import { ManagementService } from './service/management.service';

import { SubscriberManagementComponent } from './subscriber-management.component';
import * as sbmnt from '../../../../assets/mockdata/support/netops-management/subscriber-management/subscriber-management';
import { Observable, of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HighlightSearch } from '../../shared/custom-pipes/highlight.pipe';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { SortDeviceDataPipe } from '../../shared/sort-device-data.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { SCOPES } from 'src/assets/mockdata/shared/services/scopes';
import { environment } from 'src/environments/environment';
import { EnglishJSON } from 'src/assets/language/english.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';

describe('SubscriberManagementComponent', () => {
  let component: SubscriberManagementComponent;
  let fixture: ComponentFixture<SubscriberManagementComponent>;
  let translateService: TranslateService;
  let service: DataServiceService;
  let managementService: ManagementService;
  let ssoAuthService: SsoAuthService;
  let route: ActivatedRoute;
  let router: Router;
  let httpTestingController: HttpTestingController;
  let CommonfunctionsService: CommonFunctionsService;
  let routerSpy = { navigate: jasmine.createSpy('navigate'), url: '/support/netops-management/subscriber-wizard' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscriberManagementComponent, HighlightSearch, SortDeviceDataPipe],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        NgbModule,
        DataTablesModule
      ],
      providers: [
        NgbModal,
        TranslateService,
        DataServiceService,
        FoundationManageService,
        ChangeDetectorRef,
        HttpClient,
        FormBuilder,
        SsoAuthService,
        SubscribeService,
        ManagementService,
        Title,
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of({ searchText: '' })
          }
        },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SubscriberManagementComponent);
      component = fixture.componentInstance;
      component.showResult = true;
      component.orgId = '470053';
      component.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: false,
        ordering: false,
        dom: "tip",
        responsive: true,
      }
      fixture.detectChanges();
      service = TestBed.inject(DataServiceService);
      translateService = TestBed.inject(TranslateService);
      managementService = TestBed.inject(ManagementService)
      ssoAuthService = TestBed.inject(SsoAuthService)
      route = TestBed.inject(ActivatedRoute);
      router = TestBed.inject(Router);
      CommonfunctionsService = TestBed.inject(CommonFunctionsService);
      httpTestingController = TestBed.inject(HttpTestingController);
      window.history.pushState({ menuDelete: false, isProvision: true, menuSub: sbmnt.subscriber }, '');
      localStorage.setItem('calix.scopes', JSON.stringify(SCOPES));
    })
  });


  it('Ng onInit test', () => {
    spyOn(component, 'getDeleteAndFactoryResetData').and.callThrough();
    spyOn(service, 'performSearch').and.returnValue(of(sbmnt.subscriber_data));
    spyOn(component, 'formGrouping').and.callThrough();
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    environment.VALIDATE_SCOPE = "true";
    component.ngOnInit();
    //expect(component.getDeleteAndFactoryResetData).toHaveBeenCalled();
    //expect(component.formGrouping).toHaveBeenCalled();
  });

  //subscriber list start
  it('subscriber list', () => {
    let app: SubscriberManagementComponent;
    let fixture: ComponentFixture<SubscriberManagementComponent>;
    fixture = TestBed.createComponent(SubscriberManagementComponent);
    app = fixture.componentInstance;
    app.showResult = true;
    app.orgId = '470053';
    fixture.detectChanges()
    spyOn(app, 'loadSubscriberData').and.callThrough();
    app.loadSubscriberData("")
    app.searchResult = sbmnt.subscriber_data;
    // console.log('html', fixture.nativeElement.querySelector('#managementTableId'))
    fixture.detectChanges();
    let subscriber_address = fixture.nativeElement.querySelector('.subscriber-address').innerHTML;
    //expect(subscriber_address.trim()).toEqual(sbmnt.subscriber_data.records[0].serviceAddress.trim())
    // app.ngOnDestroy();
  })
  //subscriber list end

  //Add subscriber click start
  it('Add subscriber else', () => {
    spyOn(managementService, 'addSubscriber').and.returnValue(of(sbmnt.add_subscriber));
    spyOn(component, 'formGrouping').and.callThrough();
    spyOn(component, 'showAddSubscriberModal').and.callThrough();
    let addSubscriber = fixture.debugElement.query(By.css('#addSubscriberId')).nativeElement.click();
    component.createSubscriber = new FormGroup({
      account: new FormControl(sbmnt.subscriber.account),
      subscriberLocationId: new FormControl(sbmnt.subscriber.subscriberLocationId),
      name: new FormControl(sbmnt.subscriber.name),
      serviceAddress: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
    });
    fixture.detectChanges();
    component.addSubscriber(false,true);
    //expect(component.showAddSubscriberModal).toHaveBeenCalled();

  });
  it('Add subscriber else error handling', () => {
    spyOn(managementService, 'addSubscriber').and.returnValue(throwError(sbmnt.error));
    spyOn(component, 'showAddSubscriberModal').and.callThrough();
    component.formGrouping({}); component.showAddSubscriberModal();
    // let addSubscriber = fixture.nativeElement.getElementById('#addSubscriberId')
    component.createSubscriber = new FormGroup({
      account: new FormControl(sbmnt.subscriber.account),
      subscriberLocationId: new FormControl(sbmnt.subscriber.subscriberLocationId),
      name: new FormControl(sbmnt.subscriber.name),
      serviceAddress: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
    });
    fixture.detectChanges();
    component.addSubscriber(false,true);
    //expect(component.showAddSubscriberModal).toHaveBeenCalled();
  });
  it('Add subscriber else error handling', () => {
    spyOn(managementService, 'addSubscriber').and.returnValue(throwError(sbmnt.error));
    spyOn(component, 'showAddSubscriberModal').and.callThrough();
    component.formGrouping({}); component.showAddSubscriberModal();
    // let addSubscriber = fixture.debugElement.query(By.css('#addSubscriberId')).nativeElement.click();
    component.createSubscriber = new FormGroup({
      account: new FormControl(sbmnt.subscriber.account),
      subscriberLocationId: new FormControl(sbmnt.subscriber.subscriberLocationId),
      name: new FormControl(''),
      serviceAddress: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
    });
    fixture.detectChanges();
    component.addSubscriber(true,true);
    //expect(component.showAddSubscriberModal).toHaveBeenCalled();
  });
  it('Add subscriber if', () => {
    spyOn(managementService, 'editSubscriber').and.returnValue(of(sbmnt.edit_subscriber));
    spyOn(component, 'formGrouping').and.callThrough();
    spyOn(component, 'showAddSubscriberModal').and.callThrough();
    component.formGrouping({}); component.showAddSubscriberModal();
    // let addSubscriber = fixture.debugElement.query(By.css('#addSubscriberId')).nativeElement.click();
    component.createSubscriber = new FormGroup({
      account: new FormControl(sbmnt.subscriber.account),
      subscriberLocationId: new FormControl(sbmnt.subscriber.subscriberLocationId),
      name: new FormControl(sbmnt.subscriber.name),
      serviceAddress: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
    });
    component.flag.editSubscriberId = sbmnt.subscriber.subscriberId;
    fixture.detectChanges();
    component.addSubscriber(true,true);
    // console.log(fixture.nativeElement.querySelector('#addSubscriberModal'))
    //expect(component.formGrouping).toHaveBeenCalled();
    //expect(component.showAddSubscriberModal).toHaveBeenCalled();

  });
  it('Add subscriber if error handling', () => {
    spyOn(managementService, 'editSubscriber').and.returnValue(of(throwError(sbmnt.error)));
    spyOn(component, 'formGrouping').and.callThrough();
    spyOn(component, 'showAddSubscriberModal').and.callThrough();
    component.formGrouping({}); component.showAddSubscriberModal();
    // let addSubscriber = fixture.debugElement.query(By.css('#addSubscriberId')).nativeElement.click();
    component.createSubscriber = new FormGroup({
      account: new FormControl(sbmnt.subscriber.account),
      subscriberLocationId: new FormControl(sbmnt.subscriber.subscriberLocationId),
      name: new FormControl(sbmnt.subscriber.name),
      serviceAddress: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
    });
    component.flag.editSubscriberId = sbmnt.subscriber.subscriberId;
    fixture.detectChanges();
    component.addSubscriber(true,true);
    // console.log(fixture.nativeElement.querySelector('#addSubscriberModal'))
    //expect(component.formGrouping).toHaveBeenCalled();
    //expect(component.showAddSubscriberModal).toHaveBeenCalled();

  })
  //Add subscriber click end

  //edit subscriber click start
  it('edit subscriber', () => {
    spyOn(component, 'editSubscriberModal').and.callThrough();
    spyOn(component, 'formGrouping').and.callThrough();
    component.editSubscriberModal(sbmnt.subscriber);
    const req = httpTestingController.expectOne(reqs => {
      return reqs.url.includes('/subscriber/fdc3f52f-9ef7-4c19-9130-ca1d562c7670') && reqs.method == 'GET'
    });
    req.flush(sbmnt.edit_subscriber);
    fixture.detectChanges();
    //expect(component.formGrouping).toHaveBeenCalled()
  })
  //edit subscriber click end

  //add system click start
  it('add system click button test', () => {
    spyOn(component, 'addDevice').and.callThrough();
    spyOn(component, 'addSubscriber').and.callThrough()
    spyOn(component, 'closeModal').and.callThrough()

    component.addDevice(sbmnt.add_system);
    //expect(component.closeModal()).toBeUndefined();
    //expect(routerSpy.navigate).toHaveBeenCalled()
    // //expect(routerSpy.navigate).toHaveBeenCalledWith(['/support/netops-management/subscriber-wizard'], { state: { subscriberData: sbmnt.add_system, isNewRecord: true, isUnassociateSubscriber: false, searchText: '', isProvision: false } })

    component.addDevice({}, true);
    //expect(component.addSubscriber).toHaveBeenCalled()

    component.addDevice(sbmnt.add_system, true);
    //expect(component.submitted).toBeTrue()
  })
  //add system click end

  //edit system click start
  it('edit system click button test', () => {
    component.editDevice(sbmnt.subscriber, 'CXNK00207C99', 'RG');
    const req = httpTestingController.match(reqs => {
      return reqs.url.includes('/subscriber-provisioning/provisioning-record') && reqs.method == 'GET'
    });
    // req[0].flush(sbmnt.edit_pr_data);
    // req[1].flush(sbmnt.edit_pr_data);
    //expect(routerSpy.navigate).toHaveBeenCalled()
    // //expect(routerSpy.navigate).toHaveBeenCalledWith(['/support/netops-management/subscriber-wizard'], { state: { subscriberData: sbmnt.subscriber, isNewRecord: false, editDeviceObj: sbmnt.edit_pr_data, searchText: '', isProvision: false } })

    spyOn(managementService, 'getDeviceInfo').and.returnValue(of(null));
    spyOn(service, 'getDeviceInfo').and.returnValue(of(sbmnt.edit_dInfo_data));
    component.editDevice(sbmnt.subscriber, 'CXNK00207C99', 'RG');
    //expect(routerSpy.navigate).toHaveBeenCalled()
    // //expect(routerSpy.navigate).toHaveBeenCalled(['/support/netops-management/subscriber-wizard'], { state: { subscriberData: sbmnt.subscriber, isNewRecord: false, editDeviceObj: sbmnt.edit_pr_data, searchText: '', isProvision: false } })
  })

  it('edit system getDeviceInfo error handling', () => {
    spyOn(managementService, 'getDeviceInfo').and.returnValue(of(null));
    spyOn(service, 'getDeviceInfo').and.returnValue(throwError(sbmnt.error));
    component.editDevice(sbmnt.subscriber, 'CXNK00207C99', 'RG');
    //expect(routerSpy.navigate).toHaveBeenCalled();
  })

  it('edit system provision error handling', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough()
    spyOn(managementService, 'getDeviceInfo').and.returnValue(throwError(sbmnt.pr_error));
    component.editDevice(sbmnt.subscriber, 'CXNK00207C99', 'RG');
    //expect(component.pageErrorHandle).toHaveBeenCalled();
  })
  //edit system click end


  it('delete system click test true', () => {
    let app: SubscriberManagementComponent;
    let fixture: ComponentFixture<SubscriberManagementComponent>;
    fixture = TestBed.createComponent(SubscriberManagementComponent);
    app = fixture.componentInstance;
    app.showResult = true;
    app.orgId = '470053';
    // fixture.detectChanges()
    spyOn(app, 'loadSubscriberData').and.callThrough();
    spyOn(app, 'displayWaringMessageModel').and.callThrough();
    spyOn(app, 'unassociateDelete').and.callThrough();
    app.loadSubscriberData("")
    const req = httpTestingController.match(reqs => {
      return reqs.url.includes('/subscriber-search') && reqs.method == 'GET'
    });
    req[0].flush(sbmnt.subscriber_data);
    req[1].flush(sbmnt.subscriber_data);
    // app.searchResult = sbmnt.subscriber_data;
    fixture.detectChanges();

    let element: ElementRef<any> = fixture.nativeElement.querySelector('.deletepopup-temp') as ElementRef<any>;
    app.displayWaringMessageModel(element, sbmnt.subscriber, sbmnt.delete_device, 0)
    //unassociateDelete if condition
    app.unassociateDelete(sbmnt.delete_device);
    fixture.detectChanges()
    //expect(app.displayWaringMessageModel).toHaveBeenCalledTimes(1);
    //expect(app.dataObj.subscriber).toEqual(sbmnt.subscriber);
    //expect(app.unassociateDelete).toHaveBeenCalledTimes(1);

    //unassociateDelete else condition
    component.unassociateDelete(sbmnt.delete_device.serialNumber = '');
    fixture.detectChanges()
    //expect(component.dataObj.systemId).toEqual("");
    // app.ngOnDestroy();
  })

  //for redraw && newRedraw start
  it('newRedraw function', () => {
    spyOn(component, 'newRedraw').and.callThrough();
    spyOn(component.dtElement.dtInstance, 'then').and.callThrough();
    component.searchText = '123abcd';
    component.newRedraw();
    component.redraw();
    component.rerender();
    //expect(component.dtElement.dtInstance).toBeTruthy();
  });

  it('redraw function if condition', () => {
    spyOn(component, 'redraw').and.callThrough();
    spyOn(component.dtElement.dtInstance, 'then').and.callThrough();
    component.searchText = '1';
    fixture.detectChanges();
    component.redraw();
    //expect(component.dtElement.dtInstance).toBeTruthy();
  });
  //for redraw && newRedraw end

  // for getScopes function
  it('scopes function', () => {
    // spyOn(ssoAuthService, 'getScopes').and.callFake(()=>{
    //   return window.localStorage.getItem('calix.scopes') ? JSON.parse(window.localStorage.getItem('calix.scopes')) : {};
    // });
    component.getScopes();
    //expect(component.searchText).toBe(undefined);
  });

  it('loadSubscriberMetadata function', () => {
    spyOn(service, 'performSearch').and.returnValue(throwError(sbmnt.error));
    component.loadSubscriberMetadata('123abcd');
    //expect(component.loader).toBe(false);
  });

  //DeleteAndFactoryResetData start
  it('getDeleteAndFactoryResetData function', () => {
    spyOn(service, 'getDeleteAndFactoryreset').and.returnValue(of(sbmnt.delete_factory_res));
    component.getDeleteAndFactoryResetData();
    //expect(component.orgData).toBe(sbmnt.delete_factory_res);
  });

  it('getDeleteAndFactoryResetData function error handle', () => {
    spyOn(service, 'getDeleteAndFactoryreset').and.returnValue(throwError(sbmnt.error));
    component.getDeleteAndFactoryResetData();
    //expect(service.getDeleteAndFactoryreset).toHaveBeenCalled();
  });
  //DeleteAndFactoryResetData end

  //deleteSubscriberConfirmBox start
  it('deleteSubscriberConfirmBox function', fakeAsync(() => {
    spyOn(service, 'deleteWarningSubscriber').and.returnValue(of({}));
    component.deleteSubscriberConfirmBox();
    flush(3100);
    //expect(service.deleteWarningSubscriber).toHaveBeenCalled();
    //expect(component.deletePrompt).toBe(true);
  }));

  it('deleteSubscriberConfirmBox function error handle', () => {
    spyOn(service, 'deleteWarningSubscriber').and.returnValue(throwError(sbmnt.error));
    component.deleteSubscriberConfirmBox();
    //expect(service.deleteWarningSubscriber).toHaveBeenCalled();
    //expect(component.hasServify).toBe(false);
  });
  //deleteSubscriberConfirmBox end

  //for notONT device
  it('notONT function', () => {
    spyOn(component, 'notONT1').and.callThrough();
    component.notONT({});
    component.notONT1(sbmnt.subscriber);
    //expect(component.notONT1).toHaveBeenCalled();
  });

  //for showSubscriber start
  it('showSubscriber function if case', () => {
    spyOn(component, 'formGrouping').and.callThrough();
    component.showSubscriber("f19201ab-4782-4922-9e5c-75e02c14d40f");
    component.closeSearch();
    //expect(component.formGrouping).toHaveBeenCalled();
  });

  //for pageErrorHandle start
  it('pageErrorHandle function if case', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough();
    component.pageErrorHandle(errorStatus401);
    //expect(component.pageErrorHandle).toHaveBeenCalled();
  });
  it('pageErrorHandle function else case', () => {
    spyOn(service, 'pageErrorHandle').and.callThrough();
    component.pageErrorHandle(errorStatus500);
    //expect(service.pageErrorHandle).toHaveBeenCalled();
  });
  //for pageErrorHandle end

  //for modelErrorHandle start
  it('modelErrorHandle function if case', () => {
    spyOn(component, 'modelErrorHandle').and.callThrough();
    component.modelErrorHandle(errorStatus401);
    //expect(component.modelErrorHandle).toHaveBeenCalled();
  });
  it('modelErrorHandle function else case', () => {
    spyOn(service, 'pageErrorHandle').and.callThrough();
    component.modelErrorHandle(errorStatus500);
    //expect(service.pageErrorHandle).toHaveBeenCalled();

  });
  //for modelErrorHandle end

  //fetchEditSubData start
  it('fetchEditSubData function', () => {
    spyOn(service, 'searchBySubscriberId').and.returnValue(of({}));
    component.fetchEditSubData(sbmnt.subscriber);
    //expect(service.searchBySubscriberId).toHaveBeenCalled();
    // //expect(component.deletePrompt).toBe(true);
  });

  it('fetchEditSubData function error handle', () => {
    spyOn(service, 'searchBySubscriberId').and.returnValue(throwError(sbmnt.error));
    component.fetchEditSubData(sbmnt.subscriber);
    //expect(service.searchBySubscriberId).toHaveBeenCalled();
    // //expect(component.hasServify).toBe(false);
  });
  //fetchEditSubData end

  //getSubscriberInfo start
  it('getSubscriberInfo function', () => {
    spyOn(service, 'setSubscriberInfo').and.callThrough();
    component.searchResult = sbmnt.subscriber_data;
    component.getSubscriberInfo("f19201ab-4782-4922-9e5c-75e02c14d40f");
    //expect(routerSpy.navigate).toHaveBeenCalled();
    //expect(service.setSubscriberInfo).toHaveBeenCalled();
  });
  //getSubscriberInfo end

  it('getSubscriberInfo function', () => {
    spyOn(service, 'performSearch').and.returnValue(of(sbmnt.subscriber_data));
    component.searchText = '';
    component.keupEnter();
    component.onchangeReplaceDevice();
    component.assignDeviceReplace('CXNK00207C99', '123zzzz', {});
    component.getFeatureProperties('844E-2');
    let req = httpTestingController.expectOne(req => {
      return req.url.includes('feature-properties?') && req.method == 'GET';
    });
    req.flush(sbmnt.feature_properties_res);
    component.findObjByKeyValue('SSID1', sbmnt.feature_properties_res.properties);
    component.replaceDevice('123abcd', '123zzzz');
    component.doPerformReplaceDevice('fdc3f52f-9ef7-4c19-9130-ca1d562c7670', '123abcd', '123zzzz');
    //expect(component.dtElement.dtInstance).toBeTruthy();
    // component.ngOnDestroy();
  });

  //delete subscriber start
  it('deleteSubscriber function', fakeAsync(() => {
    spyOn(component, 'closeModal').and.callThrough();
    spyOn(managementService, 'deleteSubscriber').and.returnValue(of({}));
    spyOn(managementService, 'deleteDevice').and.returnValue(of({}));
    spyOn(managementService, 'deleteUnassociated').and.returnValue(of({}));
    component.deleteSubscriber();
    fixture.detectChanges();
    component.unassociateAndDelete();
    fixture.detectChanges();
    component.unassoDeleteWthFoundationApi();
    fixture.detectChanges();
    component.deleteUnassociated();
    fixture.detectChanges();
    component.removeDevice();
    component.cancelModel();
    component.modelClose();
    fixture.detectChanges();
    fixture.detectChanges();
    flush(3100);
    //expect(component.closeModal).toBeTruthy();
  }));
  it('deleteSubscriber function error handling', () => {
    spyOn(component, 'closeModal').and.callThrough();
    spyOn(managementService, 'deleteSubscriber').and.returnValue(throwError(sbmnt.error));
    spyOn(managementService, 'deleteDevice').and.returnValue(throwError(sbmnt.error));
    spyOn(managementService, 'deleteUnassociated').and.returnValue(throwError(sbmnt.error));
    component.deleteUnassociated();
    component.removeDevice();
    //expect(component.closeModal).toBeTruthy();
  });
  //delete subscriber end








  it('should set showDeleteBtn to true when event target value is "delete"', () => {
    const event = {
      target: {
        value: 'delete'
      }
    };
    component.getDeleteOption(event);
    expect(component.showDeleteBtn).toBeTrue();
  });

  it('should set showDeleteBtnCIQorCWX to "deleteCIQ" when event target value is "deleteCIQ"', () => {
    const event = {
      target: {
        value: 'deleteCIQ'
      }
    };
    component.getDeleteOption(event);
    expect(component.showDeleteBtnCIQorCWX).toBe('deleteCIQ');
  });

  it('should set showDeleteBtnCIQorCWX to "deleteCommandWx" when event target value is "deleteCommandWx"', () => {
    const event = {
      target: {
        value: 'deleteCommandWx'
      }
    };
    component.getDeleteOption(event);
    expect(component.showDeleteBtnCIQorCWX).toBe('deleteCommandWx');
  });

  it('should set showDeleteBtn and showDeleteBtnCIQorCWX to false when event target value is not "delete", "deleteCIQ", or "deleteCommandWx"', () => {
    const event = {
      target: {
        value: 'other'
      }
    };
    component.getDeleteOption(event);
    expect(component.showDeleteBtn).toBeFalse();
    expect(component.showDeleteBtnCIQorCWX).toBe('');
  });

  it('should set dataObj.option to event target value', () => {
    const event = {
      target: {
        value: 'delete'
      }
    };
    component.getDeleteOption(event);
    expect(component.dataObj.option).toBe('delete');
  });

  it('performSearch fun test', fakeAsync(() => {
    spyOn(service, 'performSearch').and.returnValue(of(sbmnt.subscriber_data));

    component.performSearch();
    component.search('123abc');
    flush(2000)
    expect(component.onSearch).toBeTruthy();
  }));










});
