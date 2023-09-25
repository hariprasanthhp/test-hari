import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTablesModule } from 'angular-datatables';
import { of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { zipcodeData } from 'src/assets/mockdata/admin/zipcodeupload/zipcodeupload.data';
import { CommonService } from '../services/common.service';
import { ZipCodeApiService } from '../services/zipcode-upload.service';
import { ZipCodeUploadComponent } from './zip-code-upload.component';
import { errorStatus400 } from 'src/assets/mockdata/shared/error.data';
import { TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

class MyZipCodeUploadComponent {
  fileSelected(event,modal:TemplateRef<any>) {
    const file: File = event.target.files[0];
    
  }
}

describe('ZipCodeUploadComponent', () => {
  let component: ZipCodeUploadComponent;
  let fixture: ComponentFixture<ZipCodeUploadComponent>;
  let router: Router
  let service: ZipCodeApiService
  let languageService: TranslateService
  let routerSpy = {navigate: jasmine.createSpy('navigate'), url: '/organization-admin/zip-code-upload'};
  let dtInstance: jasmine.SpyObj<DataTables.Api>;
  let dialogService: NgbModal;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZipCodeUploadComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'organization-admin/zip-code-upload', component: ZipCodeUploadComponent },
      ]), HttpClientTestingModule, DataTablesModule, FormsModule],
      providers: [TranslateService, Title, ZipCodeApiService, CommonService, SsoAuthService,{ provide: Router, useValue: routerSpy }]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ZipCodeUploadComponent);
        dtInstance = jasmine.createSpyObj('DataTables.Api', ['destroy','search', 'draw']);
        dtInstance.search.and.returnValue(dtInstance); 
        component = fixture.componentInstance;
        dialogService = TestBed.inject(NgbModal);
        service = TestBed.inject(ZipCodeApiService)
        languageService = TestBed.inject(TranslateService)
        router = TestBed.inject(Router);
        component.dtElement = { dtInstance: Promise.resolve(dtInstance) } as any; 
      });
  });

  it('should initialize onInit()', () => {
    spyOn(component, 'tableLanguageOptions').and.callThrough()
    languageService.selectedLanguage.subscribe(data => {
      component.language = data;
    })
    component.ngOnInit()
    expect(component.tableLanguageOptions).toHaveBeenCalled()
    expect(component.tableLanguageOptions).toHaveBeenCalledTimes(1)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call clearText', () => {
    spyOn(component,'searchName');
    component.clearText();  
  });

  it('should call getZipcodeListNames', () => {
    spyOn(service,'zipCodeListNames').and.returnValue(of(zipcodeData));
    spyOn(component,'rerender');
    component.isRerender = true;
    component.getZipcodeListNames();
  });

  it('should call getZipcodeListNames', () => {
    spyOn(service,'zipCodeListNames').and.returnValue(of(zipcodeData));
    spyOn(component,'rerender');
    component.isRerender = false;
    component.getZipcodeListNames();
  });

  it('should call getZipcodeListNames', () => {
    let error = {error:{errorDesc:'desc'}}
    spyOn(service,'zipCodeListNames').and.returnValue(throwError(error));
    spyOn(component,'rerender');
    component.isRerender = false;
    component.getZipcodeListNames();
  });

  it('should call saveZipPlusCsv', fakeAsync(() => {
       component.zipData = {
          list_name: "zipcodearundata",
          zip_data: [{
            "zipcode": "68521",
            "zipPlusFour": "1222",
            "hasService": "Yes"
          }]
        };
    component.language = [];
    spyOn(service, 'saveZipPlusFile').and.returnValue(of(true))
    component.saveZipPlusCsv();
    setTimeout(() => {
      spyOn(component,'zipcodeFilter');
      component.saveZipPlusCsv();
    },600)
    flush(600)
  }));

  it('should call saveZipPlusCsv', fakeAsync(() => {
    component.zipData = {
       list_name: "zipcodearundata",
       zip_data: [{
         "zipcode": "68521",
         "zipPlusFour": "1222",
         "hasService": "Yes"
       }]
     };
     let error = {error:{errorDesc:'desc'}}

 spyOn(service, 'saveZipPlusFile').and.returnValue(throwError(error))
 component.saveZipPlusCsv();
 setTimeout(() => {
   spyOn(component,'zipcodeFilter');
   component.saveZipPlusCsv();
 },600)
 flush(600)
}));

  it('should call resetUploadCsv', () => {
    component.resetUploadCsv();
  });

  it('should call messageModalOpen', () => {
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.messageModalOpen();
  });

  it('should call modalOpen', () => {
    let modal = 'Open Modal'
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.modalOpen(modal);
  });

  it('should call uploadModalOpen', () => {
    let modal = 'Upload Modal Open'
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.uploadModalOpen(modal);
  });

  it('should call delModalOpen', () => {
    let modal = 'Delete Modal'
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.delModalOpen(modal);
  });

  it('should call uploadModal', () => {
    let modal = 'Upload Modal'
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.uploadModal(modal);
  });

  
  it('should update zipcodeData details ', () => {
    spyOn(service, 'modifyZipcode').and.returnValue(of(true))
    component.updateZipcodeName()
  })

  it('should update zipcodeData details ', () => {
    spyOn(service, 'modifyZipcode').and.returnValue(of(false))
    component.updateZipcodeName()
  })

  it('should update zipcodeData details ', () => {
    let error = {error:{errorDesc:'desc'}}
    spyOn(service, 'modifyZipcode').and.returnValue(throwError(error));
    component.updateZipcodeName();
  })

  it('should delete zipcodeData details ', () => {
    component.zipcodeName = 'zipcode'
    spyOn(service, 'removeZipcode').and.returnValue(of(true))
    component.deleteZipcodeName()
  })

  it('should delete zipcodeData details ', () => {
    component.zipcodeName = 'zipcode'
    spyOn(service, 'removeZipcode').and.returnValue(of(false))
    component.deleteZipcodeName()
  })

  it('should delete zipcodeData details ', () => {
    let error = {error:{errorDesc:'desc'}}
    component.zipcodeName = 'zipcode'
    spyOn(service, 'removeZipcode').and.returnValue(throwError(error))
    component.deleteZipcodeName()
  })

  it('should call setTableOptions', () => {
    let type = 'language';
    spyOn(component,'tableLanguageOptions');
    component.setTableOptions(type);
  });

  it('should call setTableOptions', () => {
    let type = '';
    spyOn(component,'tableLanguageOptions');
    component.setTableOptions(type);
  });

  it('should get tableLanguageOptions', () => {
    const trans = (component as any).translateService;

    component.language = { fileLanguage: 'de_DE' };
    component.tableLanguageOptions();
    expect(component.zipCodeFilterOptions.language).toEqual(trans.de_DE);

    component.language = { fileLanguage: 'fr' };
    component.tableLanguageOptions();
    expect(component.zipCodeFilterOptions.language).toEqual(trans.fr);

    component.language = { fileLanguage: 'es' };
    component.tableLanguageOptions();
    expect(component.zipCodeFilterOptions.language).toEqual(trans.es);

    component.language = { fileLanguage: 'en' };
    component.tableLanguageOptions();
    expect(component.zipCodeFilterOptions.language).toEqual(undefined);
  });

  it('should get onChangeZipcodeFilterName', () => {
    let event :any =  [];
    component.onChangeZipcodeFilterName(event);

    event = 'Name';
    component.onChangeZipcodeFilterName(event);

    event = [{data:{}}];
    component.onChangeZipcodeFilterName(event);
  });

  it('should  get errorhandler ', () => {
    var err = { error: { errorDesc: 'error' } };
    //@ts-ignore
    component.errorHandler(err);
    expect(component.errorMessage).toEqual('error');


    var err1 = { error: { status: 500 } };
    //@ts-ignore
    component.errorHandler(err1);
    expect(component.errorMessage).toEqual('Internal Server Error');

    var err2 = { error: { status: 0, statusText: 'Unknown Error' } };
    //@ts-ignore
    component.errorHandler(err2);
    expect(component.errorMessage).toEqual('Unknown Error - Please refresh the page');

    var err3 = { error: { status: 401 } };
    //@ts-ignore
    component.errorHandler(err3);
    expect(component.errorMessage).toEqual('User Unauthorized');
  });

  it('should  get validateFileName ', () => {
    let value = 'Zipcode'
    component.listName = value.replace(/[^a-zA-Z0-9 ]+/g, '');

    component.validateFileName(value);
  });

  it('should  get isValidZipCode ', () => {
    component.isValidZipCode('Zipcode');
  });

  it('should  get isValidZipPlus ', () => {
    component.isValidZipPlus('Zipcode');
  });

  it('should  get isValidService ', () => {
    component.isValidService('Zipcode');
  });

  it('should  get removeUnwantedSpace ', () => {
    component.removeUnwantedSpace('Name','ZipCode');
  });

  it('should handle file selection', () => {
    const mockFile = new File([''], 'filename.xlsx', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    const mockModal: TemplateRef<any> = {} as TemplateRef<any>;
    const reader = new FileReader();
    let rawData =reader.result;
    spyOn(reader,'onload');

    component.fileSelected(mockEvt, mockModal);
    expect(mockEvt.target.files[0]).toEqual(mockFile);
  });

  it('should call searchName', async () => {
    const searchText = 'test';
    await component.searchName(searchText);
    expect(dtInstance.search).toHaveBeenCalledWith(searchText);
    expect(dtInstance.draw).toHaveBeenCalled();
  });

  it('should call rerender', async () => {
    await component.rerender();
    expect(dtInstance.destroy).toHaveBeenCalled();
  });

});
