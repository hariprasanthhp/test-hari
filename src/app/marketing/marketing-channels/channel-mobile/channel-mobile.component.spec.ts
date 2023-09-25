import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ChannelMobileComponent } from './channel-mobile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Title } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { errorStatus500, errorStatus504 } from 'src/assets/mockdata/shared/error.data';

describe('ChannelMobileComponent', () => {
  let component: ChannelMobileComponent;
  let fixture: ComponentFixture<ChannelMobileComponent>;
  let dtInstance: jasmine.SpyObj<DataTables.Api>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChannelMobileComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule
        , NgSelectModule],
      providers: [{ provide: NgbModal, useValue: {} },
      { provide: TranslateService, useClass: CustomTranslateService },
      { provide: SsoAuthService, useValue: {} },
      { provide: ActivatedRoute, useValue: {} },
      {
        provide: Title, useValue: {
          setTitle: jasmine.createSpy(),
        }
      },
      {
        provide: Router, useValue: {
          navigate: jasmine.createSpy(),

        }
      },
      {
        provide: HttpClient, useValue: {
          get: () => (of({})),
        }
      },]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ChannelMobileComponent);
        dtInstance = jasmine.createSpyObj('DataTables.Api', ['destroy','search', 'draw','clear']);
        dtInstance.search.and.returnValue(dtInstance); 
        component = fixture.componentInstance;
        component.dtElement = { dtInstance: Promise.resolve(dtInstance) } as any;   
      });
  });
  // it('should create', () => {
  //   fixture.detectChanges();
  //   expect(component).toBeTruthy();
  // });

  it('should load data', () => {
    //arrange 
    spyOn(component, 'getViewResult');
    spyOn(component, 'setLanguageTimeFrame');
    spyOn(component, 'tableLanguageOptions');
    //@ts-ignore
    component.dtElement = { dtInstance: Promise.resolve() };
    //act
    fixture.detectChanges();
    //assert
    expect(component.getViewResult).toHaveBeenCalled();
    expect(component.setLanguageTimeFrame).toHaveBeenCalled();
    expect(component.tableLanguageOptions).toHaveBeenCalled();
  });

  
  it('should call setLanguageTimeFrame', () => {
    component.language = {channelmonth:{month_1:'month_1'}};
    component.setLanguageTimeFrame();
    component.timeframes = [{ value: '1', name: component.language.channelmonth.month_1 }] 
  });

  it('should get view result', () => {
    let res = ['test12'];
    spyOn((<any>component).http,'get').and.returnValue(of(res));
    spyOn(component,'searchName');
    component.selectVal = '3';
    component.isRerender = true;
    component.search_Text_Value = 'Text';
    component.getViewResult(3);
    expect(component.searchName).toHaveBeenCalledWith(component.search_Text_Value);
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get view result', () => {
    spyOn((<any>component).http,'get').and.returnValue(of(null));
    component.getViewResult(3);
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get view result error', () => {
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus500));
    component.getViewResult(3);
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get view result error', () => {
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus504));
    component.getViewResult(3);
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get view result error', () => {
    let errorStatus502 = {message:'Error',status:502}
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus502));
    component.getViewResult(3);
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should call ngOnDestroy', () => {
    component.languageSubject = { unsubscribe: () => { } };
    spyOn(component.languageSubject, 'unsubscribe');
    spyOn(component.dtTrigger, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.dtTrigger.unsubscribe).toHaveBeenCalled();
    expect(component.languageSubject.unsubscribe).toHaveBeenCalled();
  });

  it('should call searchName', async () => {
    const searchText = 'test';
    await component.searchName(searchText);
    expect(dtInstance.search).toHaveBeenCalledWith(searchText);
    expect(dtInstance.draw).toHaveBeenCalled();
  });

  it('should call rerender', async () => {
    spyOn((<any>component).dtTrigger,'next');
    await component.rerender();
    expect(dtInstance.clear).toHaveBeenCalledWith();
    expect(dtInstance.destroy).toHaveBeenCalled();
  });

  it('should call search_Text_Valuefun', () => {
    component.search_Text_Value =''
    component.getViewResult(1);
    component.search_Text_Valuefun();
  });

  it('should call errorReset', () => {
    component.errorReset();
    expect(component.loading).toBeFalsy();
    // expect(component.mailchimpError ).toBeFalsy();
  }); 

  it('should call selectTimeFrame', () => {
    let data = 'Month 1';
    component.selectTimeFrame(data);
    component.timeframes = [
      { value: 'Active', name: 'Month 1'},
    ];
    component.timeframes.filter(
      x => {
        x.name = data;
        expect(x.name).toEqual(data);
      }
    );
  });

  it('should call closeModal', () => {
    component.closeModal();
  });

  it('should call getTimestamp', () => {
    let date = new Date();
    component.getTimestamp(date);
  });
});