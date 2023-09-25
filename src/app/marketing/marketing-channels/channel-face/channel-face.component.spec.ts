import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ChannelFaceComponent } from './channel-face.component';
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
import { of, Subject, throwError } from 'rxjs';
import { errorStatus500, errorStatus504 } from 'src/assets/mockdata/shared/error.data';

describe('ChannelFaceComponent', () => {
  let component: ChannelFaceComponent;
  let fixture: ComponentFixture<ChannelFaceComponent>;
  let dtInstance: jasmine.SpyObj<DataTables.Api>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChannelFaceComponent],
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
        fixture = TestBed.createComponent(ChannelFaceComponent);
        dtInstance = jasmine.createSpyObj('DataTables.Api', ['destroy', 'search', 'draw']);
        dtInstance.search.and.returnValue(dtInstance);
        component = fixture.componentInstance;
        component.dtElement = { dtInstance: Promise.resolve(dtInstance) } as any;
        component.languageSubject = new Subject();
        component.dtTrigger = new Subject();
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

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

  it('should call search_Text_Valuefun', async () => {
    await component.search_Text_Valuefun();
    spyOn(component,'getViewResult');
    expect(component.search_Text_Value).toBe('');
    // expect(component.getViewResult).toHaveBeenCalledWith('SearchData');
  });

  it('should get view result', fakeAsync(() => {
    let res = { campaigns: ['test12'], lastUpdate: '' };
    spyOn((<any>component).http,'get').and.returnValue(of(res))
    component.selectVal = '3';
    component.isRerender = true;
    component.getViewResult(3);
    tick(150);

    expect((component as any).http.get).toHaveBeenCalled();

    component.isRerender = false;
    component.getViewResult(3);
    tick(150);
  }));

  it('should get view result error', () => {
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus500))
    component.isRerender = true;
    component.getViewResult(3);
    expect((component as any).http.get).toHaveBeenCalled();

    component.isRerender = false;
    component.getViewResult(3);
  });

  it('should get view result error', () => {
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus504))
    component.getViewResult(3);
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should call errorReset', () => {
    component.errorReset();
    expect(component.loading).toBeFalsy();
    expect(component.facebookError  ).toBeFalsy();
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

  it('should call ngOnDestroy', () => {
    spyOn(component.languageSubject, 'unsubscribe');
    spyOn(component.dtTrigger, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.languageSubject.unsubscribe);
    expect(component.dtTrigger.unsubscribe);
  });
});
