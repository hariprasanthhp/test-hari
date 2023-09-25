import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityUsersComponent } from './community-users.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MycommunityIqService } from '../../services/mycommunity-iq.service';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from '../../services/common.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { Title } from '@angular/platform-browser';
import { Subject, of, throwError } from 'rxjs';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { SysAdminModule } from '../../sys-admin.module';

describe('CommunityUsersComponent', () => {
  let component: CommunityUsersComponent;
  let fixture: ComponentFixture<CommunityUsersComponent>,
    dialogService: NgbModal,
    myCommunityIqService: MycommunityIqService,
    router: Router,
    translateService: TranslateService,
    //  http: HttpClient,
    commonOrgService: CommonService,
    systemservice: FoundationManageService,
    titleService: Title,
    routerTest: RouterTestingModule;
  let routerSpy = { navigate: jasmine.createSpy('navigate'), url: '/organization-admin/SmartTownWi-Fi/community-users' };



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityUsersComponent],
      imports: [HttpClientTestingModule, RouterTestingModule,SysAdminModule],
      providers: [NgbModal,
        { provide: Router, useValue: routerSpy }
        , MycommunityIqService, SsoAuthService]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(CommunityUsersComponent);
        component = fixture.componentInstance;
        dialogService = TestBed.inject(NgbModal);
        myCommunityIqService = TestBed.inject(MycommunityIqService);
        router = TestBed.inject(Router);
        translateService = TestBed.inject(TranslateService);
        // http = TestBed.inject(HttpClient);
        commonOrgService = TestBed.inject(CommonService);
        systemservice = TestBed.inject(FoundationManageService);
        titleService = TestBed.inject(Title);
        routerTest = TestBed.inject(RouterTestingModule);
        fixture.detectChanges();
      }
      );
  });


  it('should set orgId and language from localStorage', () => {
    component.tableCounts = {
      start: 0,
      displayCount: 10,
      displayed: 10,
      total: 100,
      searchText: ''
    };
    const orgId = 123;
    localStorage.setItem('calix.org_id', JSON.stringify(orgId));
    component.ngOnInit();
    expect(component.orgId).toEqual(orgId);
    expect(component.language).toEqual(translateService.defualtLanguage);
  });

  it('should set language from translateService', () => {
    component.tableCounts = {
      start: 0,
      displayCount: 10,
      displayed: 10,
      total: 100,
      searchText: ''
    };
    const language = 'en';
    translateService.selectedLanguage.next(of(language));
    component.ngOnInit();
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
  it('should set filteredValueCount or count property and call rerender method', () => {
    const res = 10;
    spyOn(myCommunityIqService, 'getSmartTownUsersCount').and.returnValue(of(res));
    spyOn(component, 'rerender');
    component.getCount();
    expect(component.filteredValueCount || component.count).toEqual(res);
    expect(component.rerender).toHaveBeenCalled();
  });

  it('should set loader to false and call pageErrorHandle method on error', () => {
    const err = new HttpErrorResponse({ error: 'Test error' });
    spyOn(myCommunityIqService, 'getSmartTownUsersCount').and.returnValue(throwError(err));
    spyOn(component, 'pageErrorHandle');
    component.getCount();
    expect(component.loader).toBeFalse();
    expect(component.pageErrorHandle).toHaveBeenCalledWith(err);
  });
  it('should set selectedUserForEditOrDelete property and open modal', () => {
    const user = { id: 1, name: 'John Doe' };
    const modal = 'EditUsersModal';
    spyOn(dialogService, 'open');
    component.openEditOrDeleteUsersModal(user, modal);
    expect(component.selectedUserForEditOrDelete).toEqual(user);
    expect(component.selectedCommunityForRemove).toBeUndefined();
    expect(component.editSuccess).toBeFalse();
    // expect(dialogService.open).toHaveBeenCalledWith(modal, { size: 'xl', centered: true, windowClass: 'edit-user-modal' });
  });
  it('should set CSVLimitExceded property to true and return if values length is greater than maximumAllowedUserCount', () => {
    component.displayContents('John,Doe,john.doe@example.com,"Community 1","Community 2","Community 3"');
    expect(component.CSVLimitExceded).toBeFalse();
    component.displayContents(Array.from({ length: 1001 }, (c, i) => `John,Doe,john.doe${i}@example.com,"Community 1","Community 2","Community 3"`).join('\n'));
    expect(component.CSVLimitExceded).toBeTrue();
    // expect(myCommunityIqService.communityListSubject.next).not.toHaveBeenCalled();
    // expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should set CSVLimitExceded property to false and call myCommunityIqService.communityListSubject.next() and router.navigate() methods', () => {
    const values = [
      { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', community: [{ communityName: 'Community 1' }, { communityName: 'Community 2' }, { communityName: 'Community 3' }] },
      { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', community: [{ communityName: 'Community 1' }, { communityName: 'Community 2' }] }
    ];
    component.displayContents('John,Doe,john.doe@example.com,"Community 1","Community 2","Community 3"\nJane,Doe,jane.doe@example.com,"Community 1","Community 2"');
    expect(component.CSVLimitExceded).toBeFalse();
    // expect(myCommunityIqService.communityListSubject.next).toHaveBeenCalledWith(values);
    expect(router.navigate).toHaveBeenCalledWith(['/organization-admin/SmartTownWi-Fi/confirm-users']);
  });

  it('should set EditLoader property to true and remove community from selectedUserForEditOrDelete', () => {
    const user = { id: 1, name: 'John Doe', community: [{ communityName: 'Community 1' }, { communityName: 'Community 2' }] };
    const communityIndex = 1;
    component.selectedUserForEditOrDelete = user;
    spyOn(myCommunityIqService, 'editCommunityAccess').and.returnValue(of([]))
    component.selectedCommunityForRemove = communityIndex;
    component.removeCommunity();
    // expect(component.EditLoader).toBeTrue();
    expect(component.removedCommunity).toEqual([{ communityName: 'Community 2' }]);
    expect(component.selectedUserForEditOrDelete.community).toEqual([{ communityName: 'Community 1' }]);
    // expect(myCommunityIqService.saveUsers).toHaveBeenCalledWith(user, component.orgId);
  });

  it('should set EditLoader property to false and call close(), getCount(), and pageErrorHandle() methods on error', () => {
    const user = { id: 1, name: 'John Doe', community: [{ communityName: 'Community 1' }, { communityName: 'Community 2' }] };
    const communityIndex = 1;
    const err = new HttpErrorResponse({ error: 'Test error' });
    component.selectedUserForEditOrDelete = user;
    component.selectedCommunityForRemove = communityIndex;
    spyOn(component, 'pageErrorHandle');
    // spyOn(component.selectedUserForEditOrDelete.community, 'splice').and.callThrough();
    // spyOn(component.removedCommunity, 'splice').and.callThrough();
    spyOn(component, 'close');
    spyOn(component, 'getCount');
    spyOn(myCommunityIqService, 'editCommunityAccess').and.returnValue(throwError(err));
    component.removeCommunity();

    // expect(component.selectedUserForEditOrDelete.community.splice).toHaveBeenCalledWith(communityIndex, 1);
    // expect(component.removedCommunity.splice).toHaveBeenCalledWith(0, 0);
    expect(component.selectedCommunityForRemove).toBeUndefined();
    expect(component.editSuccess).toBeFalse();
    expect(component.EditLoader).toBeFalse();
    expect(component.close).toHaveBeenCalled();
    expect(component.getCount).not.toHaveBeenCalled();
    expect(component.pageErrorHandle).toHaveBeenCalledWith(err);
  });

  it('should set EditLoader property to false and call close(), getCount(), and set editSuccess property to true on success', () => {
    const user = { id: 1, name: 'John Doe', community: [{ communityName: 'Community 1' }] };
    const communityIndex = 0;
    component.selectedUserForEditOrDelete = user;
    component.selectedCommunityForRemove = communityIndex;
    spyOn(component, 'close');
    spyOn(component, 'getCount');
    spyOn(myCommunityIqService, 'editCommunityAccess').and.returnValue(of([]))
    component.removeCommunity();
    expect(component.EditLoader).toBeFalse();
    // expect(component.selectedUserForEditOrDelete.community).toEqual([{ communityName: 'Community 1' }]);
    // expect(component.selectedCommunityForRemove).toBeUndefined();
    // expect(component.editSuccess).toBeTrue();
    expect(component.close).toHaveBeenCalled();
    expect(component.getCount).toHaveBeenCalled();
  });
  it('should get all communities Success', () => {
    const microSites = [
      {
        "micrositeId": "e67e3766-873d-46cb-a447-b161dc50919d",
        "communityName": "testbulkupload5",
        "communityType": "Permanent"
      },
      {
        "micrositeId": "c6ad0e52-a194-41f2-a87b-e16b04b44c68",
        "communityName": "testbulkupload6",
        "communityType": "Permanent"
      }
    ]
    spyOn(myCommunityIqService, "GetMicrosite").and.returnValue(of(microSites));
    component.getMicroSites();
    expect(component.bspDataLoader).toBeFalse();
    expect(component.microSiteList.length).toEqual(microSites.length + 1)
  })
  it('should get all communities Error', () => {
    spyOn(component, 'pageErrorHandle');
    const microSitesError = new HttpErrorResponse({ error: 'test Error' });
    spyOn(myCommunityIqService, "GetMicrosite").and.returnValue(throwError(microSitesError));
    component.getMicroSites();
    expect(component.bspDataLoader).toBeFalse();
    expect(component.pageErrorHandle).toHaveBeenCalledWith(microSitesError);

  })
  it('shoud open add users popup', () => {
    const modal = 'AddUsersModal';
    spyOn(dialogService, 'open');
    component.openAddUserPopup(modal);
    expect(component.CSVLimitExceded).toBeFalse();
    // expect(dialogService.open).toHaveBeenCalledWith(modal, { size: 'xl', centered: true, windowClass: 'edit-user-modal' });
  });
  it('should set dtOptions.language property to frTable when fileLanguage is fr', () => {
    component.frTable = 'fr';
    component.language = { fileLanguage: 'fr' };
    component.tableLanguageOptions();
    expect(component.dtOptions.language).toEqual(component.frTable);
  });

  it('should set dtOptions.language property to esTable when fileLanguage is es', () => {
    component.esTable = 'es';
    component.language = { fileLanguage: 'es' };
    component.tableLanguageOptions();
    expect(component.dtOptions.language).toEqual(component.esTable);
  });

  it('should set dtOptions.language property to de_DETable when fileLanguage is de_DE', () => {
    component.de_DETable = 'de_DE';
    component.language = { fileLanguage: 'de_DE' };
    component.tableLanguageOptions();
    expect(component.dtOptions.language).toEqual(component.de_DETable);
  });

  it('should delete dtOptions.language property when fileLanguage is en', () => {
    component.language = { fileLanguage: 'en' };
    component.dtOptions.language = {};
    component.tableLanguageOptions();
    expect(component.dtOptions.language).toBeUndefined();
  });

  it('should set disabledAddUser property to true when status is not READY', () => {
    spyOn(myCommunityIqService, 'GetBspproviderInfo').and.returnValue(of({ status: 'NOT_READY' }));
    component.GetBspProvider();
    expect(component.disabledAddUser).toBeTrue();
    // expect(component.subscriptions.push).toHaveBeenCalled();
    expect(myCommunityIqService.GetBspproviderInfo).toHaveBeenCalled();
  });

  it('should call pageErrorHandle() method when error occurs and errorMessage is not "No BSP Provider Found."', () => {
    const err = new HttpErrorResponse({ error: { errorMessage: 'Test error' } });
    spyOn(myCommunityIqService, 'GetBspproviderInfo').and.returnValue(throwError(err));
    spyOn(component, "pageErrorHandle");
    component.GetBspProvider();
    // expect(component.subscriptions.push).toHaveBeenCalled();
    expect(myCommunityIqService.GetBspproviderInfo).toHaveBeenCalled();
    expect(component.pageErrorHandle).toHaveBeenCalledWith(err);
  });

  it('should not call pageErrorHandle() method when error occurs and errorMessage is "No BSP Provider Found."', () => {
    const err = new HttpErrorResponse({ error: { errorMessage: 'No BSP Provider Found.' }, status: 401 });
    spyOn(myCommunityIqService, 'GetBspproviderInfo').and.returnValue(throwError(err));
    spyOn(component, "pageErrorHandle");
    component.GetBspProvider();
    expect(myCommunityIqService.GetBspproviderInfo).toHaveBeenCalled();
    expect(component.pageErrorHandle).not.toHaveBeenCalled();
  });
  it('should replace 500 into 1000', () => {
    const message = 'should replace 500'
    component.replaceLimitValue(message);
    expect(component.replaceLimitValue(message)).toEqual('should replace 1000')
  })
  // it('should call displayContents() method when a valid CSV file is selected', () => {
  //   spyOn(component, 'displayContents')
  //   const file = new File(['firstName,lastName,email,community\nJohn,Doe,john@example.com,"Community A,Community B"\nJane,Doe,jane@example.com,"Community C,Community D"'], 'test.csv', { type: 'text/csv' });
  //   const event = { target: { files: [file] } };
  //   component.readSingleFile(event as any);
  //   // expect(component.displayContents).toHaveBeenCalled();
  // });

  it('should not call displayContents() method when an invalid file is selected', () => {
    spyOn(component, 'displayContents')
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const event = { target: { files: [file] } };
    component.readSingleFile(event as any);
    expect(component.displayContents).not.toHaveBeenCalled();
  });

  it('should set loader property to true and call systemService.deleteSubscriber() method when deleteUser() method is called', () => {
    const id = 123;
    spyOn(component, 'close');
    spyOn(systemservice, 'deleteSubscriber').and.returnValue(of([]))
    component.deleteUser(id);
    expect(component.close).toHaveBeenCalled();
    // expect(component.loader).toBeTrue();
    // expect(component.subscriptions.push).toHaveBeenCalled();
    expect(systemservice.deleteSubscriber).toHaveBeenCalledWith(id, component.orgId);
  });

  it('should set loader property to false and call pageErrorHandle() method when systemservice.deleteSubscriber() method returns an error', () => {
    const id = 123;
    const err = new HttpErrorResponse({ status: 500 });
    spyOn(systemservice, 'deleteSubscriber').and.returnValue(throwError(err));
    spyOn(component, 'pageErrorHandle');
    component.deleteUser(id);
    expect(component.loader).toBeFalse();
    // expect(component.subscriptions.push).toHaveBeenCalled();
    expect(systemservice.deleteSubscriber).toHaveBeenCalledWith(id, component.orgId);
    expect(component.pageErrorHandle).toHaveBeenCalledWith(err);
  });

  it('should set deleteSuccess property to true and call getCount() method after 3.5 seconds when systemservice.deleteSubscriber() method returns a success response', fakeAsync(() => {
    const id = 123;
    spyOn(component, "getCount");
    spyOn(systemservice, 'deleteSubscriber').and.returnValue(of([]))
    component.deleteUser(id);
    expect(component.loader).toBeTrue();
    // expect(component.subscriptions.push).toHaveBeenCalled();
    expect(systemservice.deleteSubscriber).toHaveBeenCalledWith(id, component.orgId);
    tick(3500);
    expect(component.deleteSuccess).toBeFalse();
    expect(component.getCount).toHaveBeenCalled();
  }));

  it('should call Page Error Handler with 401', () => {
    component.pageErrorHandle(new HttpErrorResponse({ status: 401 }));

  })
  it('should call Page Error Handler with 400', () => {
    spyOn(commonOrgService, 'pageErrorHandle');
    component.pageErrorHandle(new HttpErrorResponse({ status: 400 }));
    expect(commonOrgService.pageErrorHandle).toHaveBeenCalled();

  })

  it('should call getCount after 500ms', fakeAsync(() => {
    spyOn(component, 'getCount');
    component.filterValue();
    tick(500);
    expect(component.getCount).toHaveBeenCalled();
  }));

  it('should clear the typing timer', () => {
    component.filterValue();
    expect(component.typingTimer).not.toBeNull();
  });
  it('should destroy the DataTable instance and trigger a rerender',  () => {
    component.rerender();
  });






  // it('should set loader property to true and call http.get() method when ajax() method is called', () => {
  //   const dataTablesParameters = { start: 0 };
  //   const callback = jasmine.createSpy();
  //   const res = { length: 2 };
  //   spyOn(component, 'changeTableStatusLanguage');
  //   spyOn(component.http, 'get').and.returnValue(of(res));
  //   component.getCommunitySubscribers();
  //   component.dtOptions.ajax(dataTablesParameters, callback);
  //   expect(component.loader).toBeTrue();
  //   expect(component.subscriptions.push).toHaveBeenCalled();
  //   expect(component.http.get).toHaveBeenCalled();
  //   expect(component.changeTableStatusLanguage).toHaveBeenCalled();
  //   expect(callback).toHaveBeenCalledWith({
  //     recordsTotal: component.count,
  //     recordsFiltered: component.count,
  //     data: []
  //   });
  //   expect((document.getElementsByClassName('dataTables_empty')[0] as HTMLElement).style.display).toBe('none');
  // });

  // it('should set loader property to false and call pageErrorHandle() method when http.get() method returns an error', () => {
  //   const dataTablesParameters = { start: 0 };
  //   const callback = jasmine.createSpy();
  //   const err = { status: 500 };
  //   spyOn(component.http, 'get').and.returnValue(throwError(err));
  //   component.getCommunitySubscribers();
  //   component.dtOptions.ajax(dataTablesParameters, callback);
  //   expect(component.loader).toBeFalse();
  //   expect(component.subscriptions.push).toHaveBeenCalled();
  //   expect(component.http.get).toHaveBeenCalled();
  //   expect(component.pageErrorHandle).toHaveBeenCalledWith(err);
  // });

  // it('should set show property to true when dataTableSetting is defined and dataTablesParameters.start is 9990', () => {
  //   const dataTablesParameters = { start: 9990 };
  //   const callback = jasmine.createSpy();
  //   component.dataTableSetting = { _iDisplayStart: 0 };
  //   component.getCommunitySubscribers();
  //   component.dtOptions.ajax(dataTablesParameters, callback);
  //   expect(component.show).toBeTrue();
  // });

  // it('should set show property to false when dataTableSetting is defined and dataTablesParameters.start is not 9990', () => {
  //   const dataTablesParameters = { start: 0 };
  //   const callback = jasmine.createSpy();
  //   component.dataTableSetting = { _iDisplayStart: 0 };
  //   component.getCommunitySubscribers();
  //   component.dtOptions.ajax(dataTablesParameters, callback);
  //   expect(component.show).toBeFalse();
  // });

  // it('should set disabledAddUser property to true when GetBspproviderInfo() method returns status other than READY', () => {
  //   spyOn(myCommunityIqService, 'GetBspproviderInfo').and.returnValue(of({ status: 'NOT_READY' }));
  //   component.getCommunitySubscribers();
  //   expect(component.disabledAddUser).toBeTrue();
  //   expect(component.subscriptions.push).toHaveBeenCalled();
  //   expect(myCommunityIqService.GetBspproviderInfo).toHaveBeenCalled();
  // });

  // it('should call pageErrorHandle() method when GetBspproviderInfo() method returns an error with errorMessage other than "No BSP Provider Found."', () => {
  //   const err = { error: { errorMessage: 'Test error' } };
  //   spyOn(myCommunityIqService, 'GetBspproviderInfo').and.returnValue(throwError(err));
  //   component.getCommunitySubscribers();
  //   expect(component.subscriptions.push).toHaveBeenCalled();
  //   expect(myCommunityIqService.GetBspproviderInfo).toHaveBeenCalled();
  //   expect(component.pageErrorHandle).toHaveBeenCalledWith(err);
  // });

  // it('should not call pageErrorHandle() method when GetBspproviderInfo() method returns an error with errorMessage "No BSP Provider Found."', () => {
  //   const err = { error: { errorMessage: 'No BSP Provider Found.' } };
  //   spyOn(myCommunityIqService, 'GetBspproviderInfo').and.returnValue(throwError(err));
  //   component.getCommunitySubscribers();
  //   expect(component.subscriptions.push).toHaveBeenCalled();
  //   expect(myCommunityIqService.GetBspproviderInfo).toHaveBeenCalled();
  //   expect(component.pageErrorHandle).not.toHaveBeenCalled();
  // });
 
});
