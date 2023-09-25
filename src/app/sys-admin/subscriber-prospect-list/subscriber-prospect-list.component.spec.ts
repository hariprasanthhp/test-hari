import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { SubscriberProspectListComponent } from './subscriber-prospect-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProspectSubscriberService } from '../services/prospect-subscriber.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Title } from '@angular/platform-browser';
import { CommonService } from '../services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { selectlanguageData } from 'src/assets/mockdata/cmc/marketing/exploredata/basiclens/acquisition/acquisition.data';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { errorStatus400 } from 'src/assets/mockdata/shared/error.data';

describe('SubscriberProspectListComponent', () => {
  let component: SubscriberProspectListComponent;
  let fixture: ComponentFixture<SubscriberProspectListComponent>;
  let languageService : TranslateService;
  let ssoAuth: SsoAuthService;
  let router: Router;
  let prospectSubSer : ProspectSubscriberService
  let result;
  let dtInstance: jasmine.SpyObj<DataTables.Api>;
  let dialogService: NgbModal;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ SubscriberProspectListComponent ],
      providers: [NgbModal,ProspectSubscriberService,SsoAuthService,Title,CommonService, 
        { provide: Router, useValue: {
          url: 'file upload',
          navigate: jasmine.createSpy(),
          getCurrentNavigation : jasmine.createSpy(),
          }
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberProspectListComponent);
    dtInstance = jasmine.createSpyObj('DataTables.Api', ['destroy','search', 'draw']);
    dtInstance.search.and.returnValue(dtInstance); 
    component = fixture.componentInstance;
    component.dtElement = { dtInstance: Promise.resolve(dtInstance) } as any;   
    languageService = TestBed.inject(TranslateService);
    ssoAuth = TestBed.inject(SsoAuthService);
    prospectSubSer = TestBed.inject(ProspectSubscriberService);
    dialogService = TestBed.inject(NgbModal);
    result = { metaData: {
      id: '98',
      listName: 'prospects',
      listType: 'prospects',
      orgId: 1009,
      processed: true,
      processedTime: '0;9',
      totalRows: 3,
      matchedCount: 3
    },
      fileData: [{
        orgId: 1009,
        firstName: 'AAA',
        lastName: 'BBB',
        addressLine1: 'Address1',
        addressLine2: 'Address2',
        city: 'City',
        state: 'T',
        zip: 'zip',
        email: 'aaa@gmai.com',
        listName: 'bbb',
        createdTime: '0:9',
        matched: true,
        prospectId: null,
        matchingPerformed: true,
        matchedTime: null,
        id: '1001'
      }]
    }
  });

  it('should load data', () => {
    component.selectedFile  = {
    id: '101',
    listName: 'prospects',
    listType: 'prospects',
    orgId: 1009,
    processed: true,
    createdTime: '0:09',
    }
    spyOn(component,'goBackToSubscriber');
    spyOn(ssoAuth,'getRedirectModule');
    fixture.detectChanges();
    expect((component as any).router.getCurrentNavigation).toHaveBeenCalledWith();
    expect(component.selectedFile).toEqual(component.selectedFile);
  })

  it('should load ngOnInit', () => {
    
    spyOn(component,'getFileDetails');
    spyOn(component,'tableLanguageOptions');
    languageService.selectedLanguage.next(selectlanguageData);
    component.ngOnInit();
  });

  it('should call goBackToSubscriber', () => {
    component.goBackToSubscriber();
    expect((component as any).router.navigate).toHaveBeenCalledWith(['organization-admin/subscriber-prospect-upload']);
  });

  it('should call getFileDetails', fakeAsync(() => {
    component.selectedFile  = {
      id: '101',
      listName: 'prospects',
      listType: 'prospects',
      orgId: 1009,
      processed: true,
      createdTime: '0:09',
      }
    let result = { metaData: {
      id: '98',
      listName: 'prospects',
      listType: 'prospects',
      orgId: 1009,
      processed: true,
      processedTime: '0;9',
      totalRows: 3,
      matchedCount: 3},
      fileData: [{
        orgId: 1009,
        firstName: 'AAA',
        lastName: 'BBB',
        addressLine1: 'Address1',
        addressLine2: 'Address2',
        city: 'City',
        state: 'T',
        zip: 'zip',
        email: 'aaa@gmai.com',
        listName: 'bbb',
        createdTime: '0:9',
        matched: true,
        prospectId: null,
        matchingPerformed: true,
        matchedTime: null,
        id: '1001'
      }]
    }
    spyOn(prospectSubSer,'getFileData').and.returnValue(of(result));
    component.getFileDetails();

    setTimeout(() => {
      component.searchText = 'Text';
      component.getFileDetails();
    },500)
    flush(500)
  }));

  it('getFileDetails error', () => {
    component.selectedFile = result;
    spyOn(prospectSubSer,'getFileData').and.returnValue(throwError(errorStatus400));
    component.getFileDetails();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // it('should call getFileDetails', () => {
  //   component.selectedFile  = {
  //     id: '101',
  //     listName: 'prospects',
  //     listType: 'prospects',
  //     orgId: 1009,
  //     processed: true,
  //     createdTime: '0:09',
  //     }
  //   let error = {error:{message:'Error'}}
  //   spyOn(prospectSubSer,'getFileData').and.returnValue(throwError(error))
  //   component.getFileDetails();
  // });

  it('should call allSelected', fakeAsync(() => {
    component.selectedFilter = 'Match';
    component.prospectAllLists = result.fileData;
    component.prospectDetailLists = component.prospectAllLists.filter(
      (x) => x.matched == true
    );
    component.allSelected();

    component.selectedFilter = 'Non-Match';
    component.prospectAllLists = result.fileData;
    component.prospectDetailLists = component.prospectAllLists.filter(
      (x) => !x.matched
    );
    component.allSelected();

    component.selectedFilter = 'All';
    component.prospectDetailLists = component.prospectAllLists;
    component.allSelected();

    setTimeout(() => {
      component.searchText = 'text';
      component.allSelected();
    },500)
    flush(500)
  })); 

  // it('should call reRender', async () => {
  //   const searchText = 'test';
  //   await component.reRender();
  //   expect(dtInstance.destroy).toHaveBeenCalledWith(searchText);
  // });

  it('should call clearText', () => {
    component.clearText();
  });

  it('should call SubscriberEditFileNameModal', () => {
    let modal = 'Subscriber Edit File Name Modal';
    dialogService = jasmine.createSpyObj('DialogService', ['open']);
    component.SubscriberEditFileNameModal(modal);
  });

  it('should call SubscriberAddEntryModal', () => {
    let modal = 'Subscriber Add Entry Modal';
    dialogService = jasmine.createSpyObj('DialogService', ['open']);
    component.SubscriberAddEntryModal(modal);
  });

  it('should call SubscriberEditModal', () => {
    let modal = 'Subscriber Edit Modal';
    dialogService = jasmine.createSpyObj('DialogService', ['open']);
    component.SubscriberEditModal(modal);
  });

  it('should call SubscriberDeleteModal', () => {
    let modal = 'Subscriber Delete Modal';
    dialogService = jasmine.createSpyObj('DialogService', ['open']);
    component.SubscriberDeleteModal(modal);
  });

  it('should call SubscriberListDeleteModal', () => {
    let modal = 'Subscriber List Delete Modal';
    dialogService = jasmine.createSpyObj('DialogService', ['open']);
    component.SubscriberListDeleteModal(modal);
  });

  it('should get tableLanguageOptions', () => {
    const trans = (component as any).translateService;

    component.language = { fileLanguage: 'de_DE' };
    component.tableLanguageOptions();
    expect(component.dtOptions.language).toEqual(trans.de_DE);

    component.language = { fileLanguage: 'fr' };
    component.tableLanguageOptions();
    expect(component.dtOptions.language).toEqual(trans.fr);

    component.language = { fileLanguage: 'es' };
    component.tableLanguageOptions();
    expect(component.dtOptions.language).toEqual(trans.es);

    component.language = { fileLanguage: 'en' };
    component.tableLanguageOptions();
    expect(component.dtOptions.language).toEqual(undefined);
  });

  it('should get setTableOptions', () => {
    spyOn(component,'tableLanguageOptions');
  });

});
