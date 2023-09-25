import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RecipientsComponent } from './recipients.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTablesModule } from 'angular-datatables';
import { Subject, of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ThresholdService } from 'src/app/sys-admin/cco-admin/cco-health-threshold/threshold.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { HttpClient } from '@angular/common/http';

describe('RecipientsComponent', () => {
  let component: RecipientsComponent;
  let fixture: ComponentFixture<RecipientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipientsComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, DataTablesModule, FormsModule, RouterTestingModule, ReactiveFormsModule
      ],
      providers: [
        { provide: TranslateService, useClass: CustomTranslateService }
        ,
        {
          provide: CommonService, useValue: {
            pageErrorHandle: () => (''),
          }
        },
        {
          provide: HttpClient, useValue: {
            get: () => of(),
            post: () => of(),
          }
        }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(RecipientsComponent);
        component = fixture.componentInstance;
        component.languageSubject = new Subject();
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load data', () => {
    //arrange  
    spyOn(component, 'listenSearch');
    spyOn(component, 'subscribeCount');
    //act
    component.ngOnInit();
    //assert
    expect(component.listenSearch).toHaveBeenCalled();
    expect(component.subscribeCount).toHaveBeenCalledWith('');
  });
  it('should load listen Search', () => {
    //act
    component.listenSearch();
    //assert
    expect(component.list).toEqual([]);
  });

  it('should get Count', () => {
    //arrange 
    const value = '';
    component.searchRec.setValue('sample');
    spyOn((component as any).http, 'get').and.returnValue(of({}));
    //act
    component.getCount(value);
    //assert
    expect(component.loading).toBeTruthy();
    expect((component as any).http.get).toHaveBeenCalled();

  });

  it('should get Count, error response', () => {
    //arrange 
    const value = 'sample';
    spyOn((component as any).http, 'get').and.returnValue(throwError('api-error'));
    component.showErrorMessage = () => { };
    (component as any).commonOrgService.pageErrorHandle = () => { };
    //act
    component.getCount(value);
    //assert
    expect(component.loading).toBeTruthy();
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get subscribeCount', () => {
    //arrange 
    const value = 'sample';
    spyOn((component as any).http, 'get').and.returnValue(of({}));
    component.initLoad = false;
    spyOn(component, 'getData');
    //act
    component.subscribeCount(value);
    //assert
    expect((component as any).http.get).toHaveBeenCalled();
    expect(component.getData).toHaveBeenCalled();
  });
  it('should get subscribeCount,else case', () => {
    //arrange 
    const value = 'sample';
    spyOn((component as any).http, 'get').and.returnValue(of({}));
    component.initLoad = true;
    spyOn(component, 'redraw');
    //act
    component.subscribeCount(value);
    //assert
    expect((component as any).http.get).toHaveBeenCalled();
    expect(component.redraw).toHaveBeenCalled();
  });

  it('should get data', () => {
    //arrange
    spyOn(component, 'tableLanguageOptions');
    spyOn((component as any).http, 'get').and.returnValue(of([]));
    //act
    component.getData();
    (component.dtOptions.ajax as DataTables.FunctionAjax)({ start: '1', length: 2, search: { value: 'se' } }, () => { }, null);
    //assert
    expect(component.tableLanguageOptions).toHaveBeenCalled();
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get data, error response', () => {
    //arrange
    spyOn(component, 'showErrorMessage');
    spyOn(component, 'tableLanguageOptions');
    spyOn((component as any).http, 'get').and.returnValue(throwError(''));
    //act
    component.getData();
    (component.dtOptions.ajax as DataTables.FunctionAjax)({ start: '1', length: 2, search: { value: 'se' } }, () => { }, null);
    //assert
    expect(component.tableLanguageOptions).toHaveBeenCalled();
    expect((component as any).http.get).toHaveBeenCalled();
    expect(component.showErrorMessage).toHaveBeenCalled();
  });

  it('should get tableLanguageOptions', () => {
    const trans = (component as any).translateService;

    //arrange
    component.language = { fileLanguage: 'de_DE' };
    //act
    component.tableLanguageOptions();
    //assert
    expect(component.dtOptions.language).toEqual(trans.de_DE);

    //arrange
    component.language = { fileLanguage: 'fr' };
    //act
    component.tableLanguageOptions();
    //assert
    expect(component.dtOptions.language).toEqual(trans.fr);

    //arrange
    component.language = { fileLanguage: 'es' };
    //act
    component.tableLanguageOptions();
    //assert
    expect(component.dtOptions.language).toEqual(trans.es);

    //arrange
    component.language = { fileLanguage: 'en' };
    //act
    component.tableLanguageOptions();
    //assert
    expect(component.dtOptions.language).toEqual(undefined);
  });

  it('should load ngOnDestroy', () => {
    //arrange
    component.searchSub = { unsubscribe: () => { } };
    spyOn(component.searchSub, 'unsubscribe');
    //act
    component.ngOnDestroy();
    //assert
    expect(component.searchSub.unsubscribe).toHaveBeenCalled();
  });

  it('should load closeAlert', () => {
    //arrange
    //act
    component.closeAlert();
    //assert
    expect(component.error).toBeFalsy();
    expect(component.success).toBeFalsy();
  });

  it('should show ErrorMessage', () => {
    //arrange
    let message = "msg"
    //act
    component.showErrorMessage(message);
    //assert
    expect(component.errorInfo).toEqual(message);
    expect(component.error).toBeTruthy();
  });

  it('should clear Search Input', () => {
    //arrange
    spyOn(component, 'subscribeCount');
    //act
    component.clearSearchInp();
    //assert
    expect(component.subscribeCount).toHaveBeenCalled();
  });

  it('should do Refresh', () => {
    //arrange 
    spyOn((component as any).http, 'post').and.returnValue(of({}));
    spyOn(component, 'subscribeCount');
    //act
    component.doRefresh();
    //assert
    expect((component as any).http.post).toHaveBeenCalled();
    expect(component.subscribeCount).toHaveBeenCalledWith('', true);
  });

  it('should do Refresh,error response', () => {
    //arrange 
    spyOn((component as any).http, 'post').and.returnValue(throwError({}));
    spyOn(component, 'showErrorMessage');
    //act
    component.doRefresh();
    //assert
    expect((component as any).http.post).toHaveBeenCalled();
    expect(component.showErrorMessage).toHaveBeenCalled();
  });

  it('should  get redraw', fakeAsync(() => {
    //arrange
    const draw = { draw: () => { } };
    const resp = { search: () => draw };
    spyOn(resp, 'search').and.returnValue(draw);
    //@ts-ignore
    component.dtElement = { dtInstance: Promise.resolve(resp) };
    //act
    component.redraw();
    tick(200)
    //assert
    expect(resp.search).toHaveBeenCalled();
  }));
});
