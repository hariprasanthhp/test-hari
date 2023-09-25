import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmUsersComponent } from './confirm-users.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MycommunityIqService } from '../../services/mycommunity-iq.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('ConfirmUsersComponent', () => {
  let component: ConfirmUsersComponent;
  let fixture: ComponentFixture<ConfirmUsersComponent>,
      dialogService: NgbModal,
     myCommunityIqService: MycommunityIqService,
     router: Router,
     translateService: TranslateService,
     commonOrgService: CommonService;
     let routerSpy = { navigate: jasmine.createSpy('navigate'), url: '/organization-admin/SmartTownWi-Fi/confirm-users' };

     
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmUsersComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers:[{ provide: Router, useValue: routerSpy }]
    })
    .compileComponents().then(()=>{
      dialogService =  TestBed.inject(NgbModal);
      myCommunityIqService = TestBed.inject(MycommunityIqService);
      router = TestBed.inject(Router);
      translateService = TestBed.inject(TranslateService);
      commonOrgService = TestBed.inject(CommonService);
      fixture = TestBed.createComponent(ConfirmUsersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
  beforeEach(() => {
    component.microSiteList = [
      { id: 1, communityName: 'Community A' },
      { id: 2, communityName: 'Community B' },
      { id: 3, communityName: 'Community C' }
    ];
    component.orgId = 123;
    component.userList = [
      { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', community: [{ communityName: 'Community A' }] },
      { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', community: [{ communityName: 'Community B' }] },
      { firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com', community: [{ communityName: 'Community C' }] }
    ];
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find missing values and set error status', () => {
    const value = [
      { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', community: [{ communityName: 'Community A' }] },
      { firstName: '', lastName: 'Doe', email: 'jane.doe@example.com', community: [{ communityName: 'Community B' }] },
      { firstName: 'Jane', lastName: '', email: 'jane.doe@example.com', community: [{ communityName: 'Community C' }] },
      { firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com', community: [{ communityName: 'Community D' }] },
      { firstName: 'Alice', lastName: 'Jones', email: 'alice.jones@example.com', community: [] },
      { firstName: 'Charlie', lastName: 'Brown', email: 'charlie.brown@example.com', community: [{ communityName: 'Community A' }, { communityName: 'Community B' }] },
      { firstName: 'David', lastName: 'Lee', email: 'david.lee@example.com', community: [{ communityName: 'Community C' }, { communityName: 'Community D' }] },
      { firstName: 'Eve', lastName: 'Wong', email: 'eve.wong@example.com', community: [{ communityName: 'Community E' }] },
      { firstName: 'Frank', lastName: 'Chen', email: 'frank.chen@example.com', community: [{ communityName: 'Community F' }] },
      { firstName: 'Grace', lastName: 'Lin', email: 'grace.lin@example.com', community: [{ communityName: 'Community G' }] },
      // { firstName: 'Frank', lastName: 'Chen', email: 'frank.chenexample.com', community: [{ communityName: 'Community F' }] },
      // { firstName: 'Grace', lastName: 'Lin', email: '', community: [{ communityName: 'Community G' }] }
    ];
    component.findMissingValuesForErrorPopUp(value);
    expect(component.missingvalues).toEqual([
      '<b>Row 2:</b> Empty value in “First Name” column',
      '<b>Row 3:</b> Empty value in “Last Name” column',
      '<b>Row 4:</b> Community “Community D” is not available',
      '<b>Row 5:</b> Empty value in “Community Name” column',
      '<b>Row 7:</b> Community “Community D” is not available',
      '<b>Row 8:</b> Community “Community E” is not available',
      '<b>Row 9:</b> Community “Community F” is not available',
      '<b>Row 10:</b> Community “Community G” is not available'
      // '<b>Row 11:</b> Invalid email syntax',
      // '<b>Row 12:</b> Community “Email” is not available'
    ]);
    expect(component.statusIconInfo).toEqual([, 'error', 'error', 'error', 'error',, 'error', 'error', 'error', 'error']);
    expect(component.errorInAllLines).toBeFalse();
  });

  it('should not find any missing values', () => {
    const value = [
      { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', community: [{ communityName: 'Community A' }] },
      { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', community: [{ communityName: 'Community B' }] },
      { firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com', community: [{ communityName: 'Community C' }] }
    ];
    component.findMissingValuesForErrorPopUp(value);
    expect(component.missingvalues).toEqual([]);
    // expect(component.statusIconInfo).toEqual(['', '', '']);
    expect(component.errorInAllLines).toBeFalse();
  });
  it('should save users and update status', () => {
    spyOn(component,'recursionSaveUsers');
    spyOn(myCommunityIqService,"saveUsers").and.returnValue(of({}));
    component.saveUsers();
    expect(myCommunityIqService.saveUsers).toHaveBeenCalledWith(component.userList[0], component.orgId);
    expect(component.statusIconInfo).toEqual(['success']);
    expect(component.recursionSaveUsers).toHaveBeenCalled();
  });

  it('should handle errors', () => {
    spyOn(component,"pageErrorHandle");
    spyOn(myCommunityIqService,"saveUsers").and.returnValue(throwError('Error'));
    component.saveUsers();
    expect(myCommunityIqService.saveUsers).toHaveBeenCalledWith(component.userList[0], component.orgId);
    expect(component.statusIconInfo).toEqual(['inprogress']);
    expect(component.pageErrorHandle).toHaveBeenCalled();
  });

  it('should sort the user list', () => {
    component.sortedColumnDetails = [1, 'asc'];
    component.saveUsers(true);
    expect(component.userList).toEqual([
      { firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com', community: [{ communityName: 'Community C' }] },
      { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', community: [{ communityName: 'Community B' }] },
      { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', community: [{ communityName: 'Community A' }] }
    ]);
    // expect(component.statusIconInfo).toEqual([]);
    expect(component.submissionStatus).toEqual('in progress');
  });

  it('should set the savedSubscribersCount and statusIconInfo', () => {
    spyOn(component,'recursionSaveUsers');
    component.savedSubscribersCount = undefined;
    component.saveUsers();
    expect(component.savedSubscribersCount).toEqual(0);
    expect(component.statusIconInfo).toEqual(['inprogress']);
    // expect(component.recursionSaveUsers).toHaveBeenCalled();
  });

  it('should handle errorFound returning false', () => {
    spyOn(component, 'errorFound').and.returnValue(false);
    spyOn(component,'recursionSaveUsers');
    component.saveUsers();
    expect(component.statusIconInfo).toEqual(['error']);
    expect(component.recursionSaveUsers).toHaveBeenCalled();
  });

  it('should handle errorFound returning true', () => {
    spyOn(component, 'errorFound').and.returnValue(true);
    spyOn(component,'recursionSaveUsers');
    spyOn(myCommunityIqService,'saveUsers').and.returnValue(of({}));
    component.saveUsers();
    expect(component.statusIconInfo).toEqual(['success']);
    expect(component.recursionSaveUsers).toHaveBeenCalled();
  });
  it('should call Page Error Handler with 401', () => {
    component.pageErrorHandle(new HttpErrorResponse({ status: 401 }));

  })
  it('should call Page Error Handler with 400', () => {
    spyOn(commonOrgService, 'pageErrorHandle');
    component.pageErrorHandle(new HttpErrorResponse({ status: 400 }));
    expect(commonOrgService.pageErrorHandle).toHaveBeenCalled();

  })
  it('should update status and call close() when all users are saved', () => {
    component.savedSubscribersCount = 2;
    spyOn(component,"close")
    component.recursionSaveUsers();
    expect(component.submissionStatus).toEqual('success');
    expect(component.close).toHaveBeenCalled();
  });

  it('should update status and call saveUsers()', () => {
    component.savedSubscribersCount = 0;
    component.submissionStatus = 'in progress'
    spyOn(component,"saveUsers")
    component.recursionSaveUsers();
    expect(component.savedSubscribersCount).toEqual(1);
    expect(component.saveUsers).toHaveBeenCalled();
  });
  it('should return a rounded value',()=>{
    Array.from({length:10},()=> Math.random() * 10).forEach(num => expect(component.getRoundedValue(num)).toEqual(Math.round(num)))
    
  })
  it('should update properties based on emitted values and call back', () => {
    component.statusIconInfo = ['', '', ''];
    component.userList = [];
    component.dtOptions = {};
    component.sortedColumnDetails = [];
    component._iDisplayStart = 0;
    spyOn(component, 'findMissingValuesForErrorPopUp');
    const userList = [
      { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', community: [{ communityName: 'Community A' }] },
      { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', community: [{ communityName: 'Community B' }] },
      { firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com', community: [{ communityName: 'Community C' }] }
    ];
    myCommunityIqService.communityListSubject.next(userList);
    component.GetCSVValue();
    expect(component.rowcn).toEqual(userList.length);
    expect(component.statusIconInfo).toEqual(['', '', '']);
    expect(component.userList).toEqual(userList);
    expect(component.dtOptions.displayStart).toEqual(0);
    expect(component.sortedColumnDetails).toEqual([]);
    expect(component._iDisplayStart).toEqual(0);
    expect(component.findMissingValuesForErrorPopUp).toHaveBeenCalledWith(userList);
    component.goBack()
  });
  it('should update properties based on emitted values', () => {
    spyOn(component, 'GetCSVValue');

    const microSiteList = [{ id: 1, name: 'Microsite A' }, { id: 2, name: 'Microsite B' }];
    spyOn(myCommunityIqService,"GetMicrosite").and.returnValue(of(microSiteList));
    component.getMicroSites();
    expect(component.microSiteList).toEqual(microSiteList);
    expect(component.GetCSVValue).toHaveBeenCalled();
    expect(component.loader).toBe(false);
  });

  it('should handle errors', () => {
    spyOn(component, 'pageErrorHandle');
    spyOn(myCommunityIqService,"GetMicrosite").and.returnValue(throwError(new HttpErrorResponse({status:401})));
    component.getMicroSites();
    expect(component.loader).toBe(false);
    expect(component.pageErrorHandle).toHaveBeenCalled();
  });
  it('should call changeTableStatusLanguage', () => {
    let tempObj = {
      _iDisplayStart: 0,
      _iDisplayLength: 10,
      _iRecordsDisplay: 10,
      _iRecordsTotal: 100,
      oPreviousSearch: {
        sSearch: ''
      }
    }
    component.changeTableStatusLanguage(tempObj);
  });
  it('should dismiss all dialogs', () => {
    spyOn(dialogService,'dismissAll');
    component.close();
    expect(dialogService.dismissAll).toHaveBeenCalled();
  });
  it('should set properties based on the selected language', () => {
    component.subscriptions = [];
    component.dtOptions = {};
    component.tableCounts = {};
    spyOn(component, 'changeTableStatusLanguage');
    const selectedLanguage = 'en';
    translateService.defualtLanguage = selectedLanguage;
    translateService.selectedLanguage.next(selectedLanguage);
    component.ngOnInit();
    expect(component.language).toEqual(selectedLanguage);
    // expect(component.dtOptions.language).toEqual(selectedLanguage);
    expect(component.changeTableStatusLanguage).toHaveBeenCalled();
  });

  it('should subscribe to the selectedLanguage observable', () => {
    component.subscriptions = [];
    component.dtOptions = {};
    component.tableCounts = {};
    spyOn(component, 'changeTableStatusLanguage');
    const selectedLanguage = 'en';
    translateService.defualtLanguage = selectedLanguage;
    translateService.selectedLanguage.next(selectedLanguage);
    component.ngOnInit();
    // expect(component.subscriptions.length).toEqual(1);
  });
  it('should open the errors found modal', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);
    component.dialogService = dialogService;
    component.userList = [
      { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', community: [{ communityName: 'Community A' }] },
      { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', community: [{ communityName: 'Community B' }] },
      { firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com', community: [{ communityName: 'Community C' }] }
    ];
    spyOn(component, 'findMissingValuesForErrorPopUp');
    const modal = {};
    component.openErrorsFoundModal(modal);
    expect(component.findMissingValuesForErrorPopUp).toHaveBeenCalledWith(component.userList);
    expect(dialogService.open).toHaveBeenCalledWith(modal, { size: 'xl', centered: true, windowClass: 'errors-found-modal' });
  });
  it('should open the stop user popup', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);
    component.dialogService = dialogService;
    const modal = {};
    component.openStopUserPopup(modal);
    expect(dialogService.open).toHaveBeenCalledWith(modal, { size: 'xl', centered: true, windowClass: 'stop-user-modal' });
  });
});
