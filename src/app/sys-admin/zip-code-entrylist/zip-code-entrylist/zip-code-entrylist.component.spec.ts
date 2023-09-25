import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTablesModule } from 'angular-datatables';
import { TranslateService } from 'src/app-services/translate.service';
import { ZipCodeApiService } from '../../services/zipcode-upload.service';
import { of, throwError } from 'rxjs';
import { ZipCodeEntrylistComponent } from './zip-code-entrylist.component';
import { add_Zip_ZipPlusFour, update_Zip_ZipPlusfour, zipcodeList } from 'src/assets/mockdata/admin/zipcodeupload/zipocdelist.data';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('ZipCodeEntrylistComponent', () => {
  let component: ZipCodeEntrylistComponent;
  let fixture: ComponentFixture<ZipCodeEntrylistComponent>;
  let router: Router;
  let service: ZipCodeApiService;
  let languageService: TranslateService;
  const routerSpy = jasmine.createSpyObj('Router', ['getCurrentNavigation', 'navigate']);
  let sso: SsoAuthService;
  let dtInstance: jasmine.SpyObj<DataTables.Api>;
  let dialogService: NgbModal;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ZipCodeEntrylistComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        DataTablesModule,
        FormsModule],
      providers: [ZipCodeApiService,
        Title,
        TranslateService,
        {
          provide: SsoAuthService, useValue: {
            getOrganizationID: jasmine.createSpy().and.returnValue(of('')),
            getRedirectModule: jasmine.createSpy().and.returnValue(of('')),
          }
        },
        { provide: Router, useValue: routerSpy }]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ZipCodeEntrylistComponent);
      dtInstance = jasmine.createSpyObj('DataTables.Api', ['destroy','search', 'draw']);
      dtInstance.search.and.returnValue(dtInstance);
      component = fixture.componentInstance;
      dialogService = TestBed.inject(NgbModal);
      service = TestBed.inject(ZipCodeApiService)
      router = TestBed.inject(Router)
      languageService = TestBed.inject(TranslateService)
      sso = TestBed.inject(SsoAuthService)
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

  it('should addZipcode Details', () => {
    spyOn(service, 'addZipcodeEntryList').and.returnValue(of(add_Zip_ZipPlusFour))
    spyOn(component, 'postZipcodeToList').and.callThrough()
    component.postZipcodeToList()
    expect(component.addZipResponse).toBeTruthy('value is not matched')
    expect(component.addZipResponse).toBe(add_Zip_ZipPlusFour, 'value is mimatch')
    expect(component.postZipcodeToList).toHaveBeenCalled()
    expect(component.postZipcodeToList).toHaveBeenCalledTimes(1)
  })

  it('should postZipcodeToList Details', () => {
    let error = {error:{errorDesc:'Error'}}
    spyOn(service, 'addZipcodeEntryList').and.returnValue(throwError(error))
    component.postZipcodeToList()
  })

  it('should updateEntryZipcode Details', () => {
    spyOn(service, 'editZipcodeEntryList').and.returnValue(of(update_Zip_ZipPlusfour))
    spyOn(component, 'updatedEntryZipcode').and.callThrough()
    component.updatedEntryZipcode()
    expect(component.updateEntryZipResponse).toBeTruthy('value is not matched')
    expect(component.updateEntryZipResponse).toBe(update_Zip_ZipPlusfour, 'value is mimatch')
    expect(component.updatedEntryZipcode).toHaveBeenCalled()
    expect(component.updatedEntryZipcode).toHaveBeenCalledTimes(1)
  })

  it('should updatedEntryZipcode   Details', () => {
    let error = {error:{errorDesc:'Error'}}
    spyOn(service, 'editZipcodeEntryList').and.returnValue(throwError(error))
    component.updatedEntryZipcode ()
  })

  it('should removeEntryZipcode Details', () => {
    spyOn(service, 'deleteZipcodeEntryList').and.returnValue(of(true))
    spyOn(component, 'deleteEntryZipcodes').and.callThrough()
    component.deleteEntryZipcodes()
    expect(component.deleteResponse).toBeTruthy('value is not matched')
    expect(component.deleteResponse).toBe(true, 'value is true')
    expect(component.deleteEntryZipcodes).toHaveBeenCalled()
    expect(component.deleteEntryZipcodes).toHaveBeenCalledTimes(1)
  })

  it('should deleteEntryZipcodes', () => {
    let error = {error:{errorDesc:'Error'}}
    spyOn(service, 'deleteZipcodeEntryList').and.returnValue(throwError(error))
    component.deleteEntryZipcodes()
  })

  it('should getEntryZipcode Details', () => {
    component.selectedListName = 'zipcode';
    spyOn(service, 'zipCodeEntryList').and.returnValue(of(zipcodeList))
    spyOn(component, 'getZipcodeEntryList').and.callThrough()
    component.isRerender = true;
    component.searchText = 'Text'
    component.getZipcodeEntryList()
    expect(component.zipCodeDetailLists).toBeTruthy('value is not matched')
    expect(component.zipCodeDetailLists).toBe(zipcodeList, 'value is true')
    expect(component.getZipcodeEntryList).toHaveBeenCalled()
    expect(component.getZipcodeEntryList).toHaveBeenCalledTimes(1)
  })

  it('should getEntryZipcode Details', () => {
    spyOn(service, 'zipCodeEntryList').and.returnValue(of(zipcodeList))
    component.isRerender = false;
    component.getZipcodeEntryList()
  })

  it('should getEntryZipcode Details', () => {
    let error = {error:{errorDesc:'Error'}}
    spyOn(service, 'zipCodeEntryList').and.returnValue(throwError(error))
    component.isRerender = false;
    component.getZipcodeEntryList()
  })

  it('should updateZipName Details',()=>{
    spyOn(service,'modifyZipcode').and.returnValue(of(true))
    component.updateZipcodeName()
    expect(component.updateZipNameResponse).toBeTruthy('value is not matched')
    expect(component.updateZipNameResponse).toBe(true,'value is true')
  })

  it('should updateZipcodeName ', () => {
    let error = {error:{errorDesc:'Error'}}
    spyOn(service, 'modifyZipcode').and.returnValue(throwError(error))
    component.updateZipcodeName()
  })

  it('should deleteZipcodeName Details',()=>{
    spyOn(service,'removeZipcode').and.returnValue(of(true))
    component.deleteZipcodeName()
  })

  it('should deleteZipcodeName ', () => {
    let error = {error:{errorDesc:'Error'}}
    spyOn(service, 'removeZipcode').and.returnValue(throwError(error))
    component.deleteZipcodeName()
  })


  it('should close Error Alert details', () => {
     spyOn(component,'closeAlert').and.callThrough()
     expect(component.requiredZipcodeNameShow).toBeFalsy()
     expect(component.errorShow).toBeFalsy()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchName', async () => {
    const searchText = 'test';
    await component.searchName(searchText);
    expect(dtInstance.search).toHaveBeenCalledWith(searchText);
    expect(dtInstance.draw).toHaveBeenCalled();
  });

  it('should call delModalOpen', () => {
    let modal = 'Delete Modal'
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.delModalOpen(modal);
  });

  it('should call modalOpen', () => {
    let modal = 'Open Modal'
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.modalOpen(modal);
  });

  it('should call addZipcodeToList', () => {
    let modal = 'Open Modal'
    dialogService = jasmine.createSpyObj('DialogService', ['open']);

    component.addZipcodeToList();
  });

  it('should call clearText', () => {
    spyOn(component,'searchName');
    component.clearText();  
  });

  it('should call deleteEntryListZipcode', () => {
    let id = '0011'
    dialogService = jasmine.createSpyObj('DialogService', ['open']);
    component.zipCodeDetailLists = [{id:"32a3a640-432a-4f66-9ac4-c16a0bb6f4a1",checked:false,orgId:12921722}]
    component.deleteEntryListZipcode(id);
    component.deleteZipcodeZipPlusfour = component.zipCodeDetailLists.filter((x) => {
      // return arr.indexOf(x['id']) !== -1
    })
  });

  it('should call selectAll', () => {
    component.info = {
      page: 1,
        pages: 5,
        start: 1,
        end: 2,
        length: 5,
        recordsTotal: 6,
        recordsDisplay: 4,
        serverSide: true
    }
    component.zipCodeDetailLists = [{id:"32a3a640-432a-4f66-9ac4-c16a0bb6f4a1",checked:false,orgId:12921722}] 
    component.selectAll(true);

    component.selectAll(false);
  });

  it('should call selectedOne', () => {
    component.info = {
      page: 1,
        pages: 5,
        start: 1,
        end: 2,
        length: 5,
        recordsTotal: 6,
        recordsDisplay: 4,
        serverSide: true
    }
    component.zipCodeDetailLists = [{id:"32a3a640-432a-4f66-9ac4-c16a0bb6f4a1",checked:false,orgId:12921722}] 
    component.selectedOne(true,0);

    component.selectedOne(false,0);
  });

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
    expect(component.zipCodeDtOptions.language).toEqual(trans.de_DE);

    component.language = { fileLanguage: 'fr' };
    component.tableLanguageOptions();
    expect(component.zipCodeDtOptions.language).toEqual(trans.fr);

    component.language = { fileLanguage: 'es' };
    component.tableLanguageOptions();
    expect(component.zipCodeDtOptions.language).toEqual(trans.es);

    component.language = { fileLanguage: 'en' };
    component.tableLanguageOptions();
    expect(component.zipCodeDtOptions.language).toEqual(undefined);
  });

  it('should call editZip', () => {
    let modal = 'Edit Zip';
    component.editZip(modal)
  });

  it('should get onChangeZipcodeFilterName', () => {
    let event :any =  [];
    component.onChangeZipcodeFilterName(event);

    event = 'Name';
    component.onChangeZipcodeFilterName(event);

    event = [{data:{}}];
    component.onChangeZipcodeFilterName(event);
  });

  it('should call onChangeEditZipcode', () => {
    let event  =  '12345';
    component.entryZipcode = event;
    component.zipcodePlusError = false;
    component.previousValue = false;
    component.onChangeEditZipcode(event);
  });

  it('should call onChangeEditZipPlusFour', () => {
    let event  =  '1234';
    component.entryPlusFour = event;
    component.zipcodeNameError = false;
    component.onChangeEditZipPlusFour(event);
  });

  it('should call onChangeAddZipcode', () => {
    let event  =  '12345';
    component.addZipcode = event;
    component.zipcodeNameError = false;
    component.onChangeAddZipcode(event);
  });

  it('should call onChangeAddZipPlusFour', () => {
    let event  =  '1234';
    component.addZipPlusfour = event;
    component.zipcodeNameError = false;
    component.onChangeAddZipPlusFour(event);
  });

  it('should  get errorhandler ', () => {
    var err1 = { error: { status: 500 } };
    //@ts-ignore
    component.errorHandler(err1);
    expect(component.errorMessage).toEqual('Internal Server Error');

    var err2 = { error: { status: 0, statusText: 'Unknown Error' } };
    //@ts-ignore
    component.errorHandler(err2);
    expect(component.errorMessage).toEqual('An unknown error has occurred. Refresh the page to try again');

    var err3 = { error: { status: 401 } };
    //@ts-ignore
    component.errorHandler(err3);
    expect(component.errorMessage).toEqual('User Unauthorized');
  });

  it('should  get removeUnwantedSpace ', () => {
    component.removeUnwantedSpace('Name','ZipCode');
  });

  it('should  get hasServiceChange ', () => {
    let event = true;
    component.previousEntryChecked = event;
    component.entryZipcode = '222';
    component.previousValue = '222';
    component.entryPlusFour = '1234';
    component.previousZipPlusFourValue = '1234';
    component.hasServiceChange(event);
  });

  it('should  get hasServiceChange ', () => {
    let event = true;
    component.previousEntryChecked = event;
    component.zipcodeNameError = false;
    component.zipcodePlusError = false;
    component.entryZipcode = '12345';
    component.hasServiceChange(event);
  });

  it('should  get hasServiceChange ', () => {
    let event = true;
    component.previousEntryChecked = event;
    component.zipcodeNameError = true;
    component.zipcodePlusError = true;
    component.entryZipcode = '12345';
    component.hasServiceChange(event);
  });

});
