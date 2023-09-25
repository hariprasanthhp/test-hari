import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { ChannelConstantComponent } from './channel-constant.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Title } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { errorStatus500, errorStatus504 } from 'src/assets/mockdata/shared/error.data';

describe('ChannelConstantComponent', () => {
  let component: ChannelConstantComponent;
  let fixture: ComponentFixture<ChannelConstantComponent>;
  let dtInstance: jasmine.SpyObj<DataTables.Api>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChannelConstantComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule
        , NgSelectModule],
      providers: [{ provide: NgbModal, useValue: {} },
      { provide: TranslateService, useClass: CustomTranslateService },
      { provide: SsoAuthService, useValue: {} },
      { provide: ActivatedRoute, useValue: {} },
      { provide: Location, useValue: {} },
      {
        provide: Router, useValue: {
          navigate: jasmine.createSpy(),

        }
      },
      {
        provide: HttpClient, useValue: {
          get: () => (of({})),
        }
      },

      {
        provide: Title, useValue: {
          setTitle: jasmine.createSpy(),
        }
      },]

    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ChannelConstantComponent);
        dtInstance = jasmine.createSpyObj('DataTables.Api', ['destroy','search', 'draw']);
        dtInstance.search.and.returnValue(dtInstance); 
        component = fixture.componentInstance;
        component.languageSubject = new Subject();
        component.dtTrigger = new Subject();
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

  it('should call search_Text_Valuefun', () => {
    component.search_Text_Value =''
    component.getViewResult(1);
    component.search_Text_Valuefun();
  });

  it('should call errorReset', () => {
    component.errorReset();
    expect(component.loading).toBeFalsy();
    expect(component.mailchimpError ).toBeFalsy();

  }); 

  it('should get view result', fakeAsync(() => {
    let res = { campaigns: ['test12'], lastUpdate: '' };
    spyOn((<any>component).http,'get').and.returnValue(of(res));
    
    component.getViewResult(3);
    setTimeout(() => {
      component.isRerender = true;
      component.search_Text_Value = 'Text';
      spyOn(component,'searchName');
      expect(component.searchName).toHaveBeenCalledWith('Text');
    },300)
    flush(300)
    expect((component as any).http.get).toHaveBeenCalled();
  }));

  it('should get view result error', fakeAsync(() => {
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus500));
    component.isRerender = true;

    component.getViewResult(3);
    tick(150);

    expect((component as any).http.get).toHaveBeenCalled();
  }));

  it('should get view result error', fakeAsync(() => {
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus504));

    component.getViewResult(3);
    tick(150);

    expect((component as any).http.get).toHaveBeenCalled();
  }));

  it('should call searchName', async () => {
    const searchText = 'test';
    await component.searchName(searchText);
    expect(dtInstance.search).toHaveBeenCalledWith(searchText);
    expect(dtInstance.draw).toHaveBeenCalled();
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

  it('should call ngOnDestroy', () => {
    spyOn(component.languageSubject, 'unsubscribe');
    spyOn(component.dtTrigger, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.languageSubject.unsubscribe);
    expect(component.dtTrigger.unsubscribe);
  });


});
