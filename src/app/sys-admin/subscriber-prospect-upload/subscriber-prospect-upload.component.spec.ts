import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { ProspectSubscriberService } from '../services/prospect-subscriber.service';

import { SubscriberProspectUploadComponent } from './subscriber-prospect-upload.component';
import { OrganizationApiService } from '../services/organization-api.service';

describe('SubscriberProspectUploadComponent', () => {
  let component: SubscriberProspectUploadComponent;
  let fixture: ComponentFixture<SubscriberProspectUploadComponent>;
  let dtInstance: jasmine.SpyObj<DataTables.Api>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscriberProspectUploadComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule,
        HttpClientTestingModule, DataTablesModule, FormsModule],
      providers: [
        {
          provide: CommonService, useValue: {
            currentPageAdder: jasmine.createSpy(),
            pageErrorHandle: jasmine.createSpy().and.returnValue(''),
          }
        },
        {
          provide: Router, useValue: {
            url: 'file upload',
            navigate: jasmine.createSpy(),
          }
        }, {
          provide: SsoAuthService, useValue: {
            getRedirectModule: jasmine.createSpy().and.returnValue(''),
            getOrganizationID: jasmine.createSpy().and.returnValue(''),
            getEntitlements: () => (of({})),
          }
        }, 
        { provide: TranslateService, useClass: CustomTranslateService },
        {
          provide: Title, useValue: {
            setTitle: jasmine.createSpy(),
          }
        }, {
          provide: NgbModal, useValue: {
            open: jasmine.createSpy(),
            dismissAll: jasmine.createSpy(),
          }
        },
        {
          provide: ProspectSubscriberService, useValue: {
            getFileList: () => of([]),
            saveSubscriberFile: () => of(true),
            saveProspectFile: () => of(false),
            deleteProspect: () => of(true),
            deleteSubscriber: () => of(false),
          }
        }, {
          provide: OrganizationApiService, useValue: {
            orgInfoEntitlement: () => (of({}))
          }
        }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(SubscriberProspectUploadComponent);
        dtInstance = jasmine.createSpyObj('DataTables.Api', ['destroy','search', 'draw']);
        dtInstance.search.and.returnValue(dtInstance); 
        component = fixture.componentInstance;
        component.dtElement = { dtInstance: Promise.resolve(dtInstance) } as any;   

      });
  });

  it('should load data', () => {
    //arrange
    spyOn(component, 'tableLanguageOptions');
    spyOn(component, 'getFileList');
    spyOn(component, 'getorgInfoData');
    component.MODULE = 'systemAdministration';

    //act
    fixture.detectChanges();
    //assert
    expect(component.tableLanguageOptions).toHaveBeenCalled();
    expect(component.getFileList).toHaveBeenCalled();
    expect(component.getorgInfoData).toHaveBeenCalled();
  });

  it('should load data ', () => {
    spyOn(component, 'showApps');
    component.MODULE = 'cmc';
    fixture.detectChanges();
    expect(component.showApps).toHaveBeenCalled();
  });

  it('should call subscriberSelected ', () => {
    let checked = true;
    component.subscriberSelected(checked);
  });

  it('should call prospectSelected ', () => {
    let checked = true;
    component.prospectSelected(checked);
  });

  it('should get File List ', () => {
    //arrange
    spyOn(component, 'reRender');
    spyOn((<any>component).prospectSubscriberService, 'getFileList').and.returnValue(of([{listType:'prospects'}]));
    component.apps.cmcPro = false;
    //act
    component.getFileList();
    //assert
    expect(component.reRender).toHaveBeenCalled();
    expect(component.prospectListError).toBeFalsy();
    // expect(component.prospectLisData).toEqual([]);
  });

  it('should get File List ,error response', () => {
    //arrange
    spyOn(component, 'errorHandler');
    spyOn((<any>component).prospectSubscriberService, 'getFileList').and.returnValue(throwError(''));
    //act
    component.getFileList();
    //assert
    expect(component.prospectListError).toBeTruthy();
    expect(component.loading).toBeFalsy();
    expect(component.errorHandler).toHaveBeenCalled();
    expect(component.successMessage).toEqual('');
  });

  it('should save subscriber File ', () => {
    //arrange
    spyOn(component, 'getFileList');
    spyOn((<any>component).prospectSubscriberService, 'saveSubscriberFile').and.returnValue(of(true));
    //@ts-ignore
    component.selectedFile = '=qwertyuiop';
    component.selectedFileName = 'subscriber.csv';
    component.subscriberChecked = true;
    component.prospectChecked = false;
    component.language = [];
    //act
    component.saveFile();
    //assert
    expect((<any>component).prospectSubscriberService.saveSubscriberFile).toHaveBeenCalledWith(component.selectedFile, component.selectedFileName);
    expect(component.getFileList).toHaveBeenCalled();

  });

  it('should save prospect File ', () => {
    //arrange
    spyOn(component, 'getFileList');
    spyOn((<any>component).prospectSubscriberService, 'saveProspectFile').and.returnValue(of(false));
    //@ts-ignore
    component.selectedFile = '=qwertyuiop';
    component.selectedFileName = 'prospect.csv';
    component.subscriberChecked = false;
    component.prospectChecked = true;
    component.language = [];
    //act
    component.saveFile();
    //assert
    expect((<any>component).prospectSubscriberService.saveProspectFile).toHaveBeenCalledWith(component.selectedFile, component.selectedFileName);
    expect(component.getFileList).toHaveBeenCalled();

  });

  it('should save prospect File,error response ', () => {
    //arrange
    spyOn((<any>component).prospectSubscriberService, 'saveProspectFile').and.returnValue(throwError(''));
    //@ts-ignore
    component.selectedFile = '=qwertyuiop';
    component.selectedFileName = 'prospect.csv';
    component.subscriberChecked = false;
    component.prospectChecked = true;
    component.language = [];
    spyOn(component, 'errorHandler');
    //act
    component.saveFile();
    //assert
    expect((<any>component).prospectSubscriberService.saveProspectFile).toHaveBeenCalledWith(component.selectedFile, component.selectedFileName);
    expect(component.errorHandler).toHaveBeenCalled();
    expect(component.loading).toBeFalsy();
  });

  it('should delete prospect File ', fakeAsync(() => {
    //arrange

    //@ts-ignore
    component.fileTodelete = { id: '111', listType: 'prospects' };
    spyOn(component, 'getFileList');
    spyOn((<any>component).prospectSubscriberService, 'deleteProspect').and.returnValue(of(true));
    component.language = [];
    //act
    component.deleteFile();
    //assert
    expect((<any>component).prospectSubscriberService.deleteProspect).toHaveBeenCalledWith('111');
    expect(component.getFileList).toHaveBeenCalled();
    setTimeout(() => {

    },500);
    flush(500);
  }));

  it('should delete Subscriber File ', () => {
    //arrange

    //@ts-ignore
    component.fileTodelete = { id: '1111', listType: 'subscribers' };
    spyOn(component, 'getFileList');
    spyOn((<any>component).prospectSubscriberService, 'deleteSubscriber').and.returnValue(of(false));
    component.language = [];
    //act
    component.deleteFile();
    //assert
    expect((<any>component).prospectSubscriberService.deleteSubscriber).toHaveBeenCalledWith('1111');
    expect(component.getFileList).toHaveBeenCalled();

  });

  it('should delete Subscriber File,error response ', () => {
    //arrange

    //@ts-ignore
    component.fileTodelete = { id: '1111', listType: 'subscribers' };
    spyOn((<any>component).prospectSubscriberService, 'deleteSubscriber').and.returnValue(throwError(''));
    component.language = [];
    spyOn(component, 'errorHandler');
    //act
    component.deleteFile();
    //assert
    expect((<any>component).prospectSubscriberService.deleteSubscriber).toHaveBeenCalledWith('1111');
    expect(component.errorHandler).toHaveBeenCalled();
    expect(component.loading).toBeFalsy();
  });

  // it('should file Selected', fakeAsync(() => {
  //   //arrange
  //   let event = { target: { files: [{ name: 'sample.csv' }], value: 'sample.csv' } };
  //   spyOn(component, 'openSubscriberFileNameModal');
  //   spyOn(component, 'subscriberSelected');
  //   component.language = [];

  //   //act
  //   component.fileSelected(event, {} as any);

  //   setTimeout(() => {
  //     spyOn(component,'scrollTop');
  //     component.fileSelected(event, {} as any);
  //   }, 200);
  //   flush(200)

  //   //assert
  //   expect(component.openSubscriberFileNameModal).toHaveBeenCalled();
  //   expect(component.subscriberSelected).toHaveBeenCalledWith(true);
  //   expect(component.selectedFileName).toEqual('sample');
  //   expect(event.target.value).toEqual('');
  // }));

  // it('should not file Selected', () => {
  //   let event = { target: { files: [{ name: 'sample.xls' }], value: 'sample.xls' } };
  //   spyOn(component, 'openSubscriberFileNameModal');
  //   spyOn(component, 'subscriberSelected');
  //   component.language = [];

  //   component.fileSelected(event, {} as any);

  //   expect(component.openSubscriberFileNameModal).not.toHaveBeenCalled();
  //   expect(component.subscriberSelected).not.toHaveBeenCalled();
  //   expect(component.selectedFileName).toEqual('');
  //   expect(event.target.value).toEqual('sample.xls');
  // });

  it('should get closeAlert ', () => {
    //arrange
    //act
    component.closeAlert();
    //assert
    expect(component.errorMessage).toEqual('');
    expect(component.successMessage).toEqual('');
  });

  it('should redirect to FileUpload', () => {
    //arrange
    //act
    component.redirectToFileUpload();
    //assert
    expect((component as any).router.navigate).toHaveBeenCalledWith(['organization-admin/subscriber-prospect-upload']);
  });

  it('should clear text ', () => {
    //arrange
    component.searchText = 'sample';
    spyOn(component, 'searchName');
    //act
    component.clearText();
    //assert
    expect(component.searchText).toEqual('');
    expect(component.searchName).toHaveBeenCalledWith(component.searchText);
  });

  it('should  get errorhandler ', () => {
    //arrange
    var err = { error: { errorDesc: 'error' } };
    //act    
    //@ts-ignore
    component.errorHandler(err);
    //assert
    expect(component.errorMessage).toEqual('error');


    //arrange
    var err1 = { error: { status: 500 } };
    //act    
    //@ts-ignore
    component.errorHandler(err1);
    //assert
    expect(component.errorMessage).toEqual('Internal Server Error');

    //arrange
    var err2 = { error: { status: 0, statusText: 'Unknown Error' } };
    //act    
    //@ts-ignore
    component.errorHandler(err2);
    //assert
    // expect(component.errorMessage).toEqual('Unknown Error - Please refresh the page'); // remove later
    expect(component.errorMessage).toEqual('An unknown error has occurred. Refresh the page to try again');

    //arrange
    var err3 = { error: { status: 401 } };
    //act    
    //@ts-ignore
    component.errorHandler(err3);
    //assert
    expect(component.errorMessage).toEqual('User Unauthorized');

    //arrange
    var err4 = {};
    //act    
    //@ts-ignore
    component.errorHandler(err4);
    //assert
    expect(component.errorMessage).toEqual('');

    var err5= { error: { messagw: 'Error' } };
    //act    
    //@ts-ignore
    component.errorHandler(err5);
    //assert
    expect(component.errorMessage).toEqual('');
  });

  it('should open SubscriberDeleteModal', () => {
    //arrange
    let item = {
      id: '1001',
      listName: 'abc',
      listType: 'prospect',
      orgId: 12222,
      processed: true,
      createdTime: Date.now().toString()
    };
    //act
    component.openSubscriberDeleteModal(item, {});
    //assert
    expect(component.fileTodelete).toEqual(item);
  });

  it('should open openSubscriberFileNameModal', () => {
    //arrange
    //act
    component.openSubscriberFileNameModal({});
    //assert
    expect(component.modalRef).toEqual(undefined);
  });

  it('should open openSubscriberEditFileNameModal', () => {
    //arrange
    //act
    component.openSubscriberEditFileNameModal({});
    //assert
    expect(component.modalRef).toEqual(undefined);
  });

  it('should open openSubscriberUploadModal', () => {
    //arrange
    component.errorMessage = 'errorMessage';
    component.successMessage = 'successMessage';
    //act
    component.openSubscriberUploadModal({});
    //assert
    expect(component.errorMessage).toEqual('');
    expect(component.successMessage).toEqual('');
  });

  it('should goToSubscriber', () => {
    //arrange
    let item = {
      id: '1001',
      listName: 'abc',
      listType: 'prospect',
      orgId: 12222,
      processed: true,
      createdTime: Date.now().toString()
    };
    //act
    component.goToSubscriber(item);
    //assert
    expect((component as any).router.navigate).toHaveBeenCalledWith(['organization-admin/subscriber-prospect-list'], { state: { selectedFile: item } });
  });

  it('should saveFile', fakeAsync(() => {
    component.subscriberChecked = false;
    component.prospectChecked = false;
    component.language = [];
    component.saveFile();
    setTimeout(() => {

    },300);
    flush(300);
  }));

  it('should call searchName', async () => {
    const searchText = 'test';
    await component.searchName(searchText);
    expect(dtInstance.search).toHaveBeenCalledWith(searchText);
    expect(dtInstance.draw).toHaveBeenCalled();
  });

  it('should call getFileList', fakeAsync(() => {
    spyOn((<any>component).prospectSubscriberService, 'getFileList').and.returnValue(of([{listType:'prospects'}]));
    component.apps.cmcPro = true;
    component.getFileList();

    setTimeout(() => {
      component.searchText = 'text';
      component.getFileList();
    }, 500);
    flush(500)

  }));

  it('it shold call validateFileName',  () => {
    component.validateFileName();
  })

  it('it shold call showApps',  () => {
    let entitlements = {209:{appType:209}};
    spyOn((component as any).sso,'getEntitlements').and.returnValue(of(entitlements));
    component.showApps();
    expect((component as any).sso.getEntitlements).toHaveBeenCalled();
  });

  it('it shold call getorgInfoData',  () => {
    component.getorgInfoData();
  });

  it('it shold call removeUnwantedSpace',  () => {
    component.removeUnwantedSpace('filename','filename');
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
    
});
