import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { EndpointCountByMapper } from 'src/assets/mockdata/cco/operations/cco-reports/endpointCount.data';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { scopes } from 'src/assets/mockdata/shared/scopes.data';
import { environment } from 'src/environments/environment';

import { EndpointCountBymapperComponent } from './endpoint-count-bymapper.component';

describe('EndpointCountBymapperComponent', () => {
  let component: EndpointCountBymapperComponent;
  let fixture: ComponentFixture<EndpointCountBymapperComponent>;
  let httpTestingController: HttpTestingController;
  let ssoAuthService: SsoAuthService;
  let translateService: TranslateService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndpointCountBymapperComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        CalendarModule
      ],
      providers: [
        TranslateService,
        SsoAuthService,
        ExportExcelService,
        NgbModal
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EndpointCountBymapperComponent);
        ssoAuthService = TestBed.inject(SsoAuthService);
        translateService = TestBed.inject(TranslateService);
        httpTestingController = TestBed.inject(HttpTestingController);
        component = fixture.componentInstance;
      });
  });

  it('ngOnInit', () => {
    spyOn(ssoAuthService, 'getScopes').and.returnValue(scopes);
    let englishJSON = new EnglishJSON;
    translateService.selectedLanguage.next(englishJSON.data);
    component.ngOnInit();

    environment.VALIDATE_SCOPE = 'true';
    component.ngOnInit();
    environment.VALIDATE_SCOPE = undefined;
    component.ngOnInit();
  })

  it('should call on submit', () => {
    component.selectedFromDate = '09-29-2022';
    component.selectedToDate = '10-06-2022';
    component.onSubmit();
    expect(component.runClicked).toBeTruthy();
    expect(component.loading).toBeTrue();
    component.selectedToDate = undefined;
    component.onSubmit();
  })

  it('should call on submit with undefined', () => {
    component.selectedFromDate = undefined;
    component.selectedToDate = undefined;
    component.onSubmit();
    expect(component.runClicked).toBeFalsy();
    expect(component.loading).toBeFalse();
    component.selectedToDate = '10-06-2022';
    component.onSubmit();
  })

  it('openModel and selectFromDate and selectToDate', () => {
    component.openModel();
    component.selectFromDate();
    component.selectToDate();
    component.exportDataConvertor(EndpointCountByMapper);
  })

  it('should call on loadData', () => {
    let englishJSON = new EnglishJSON;
    component.language = englishJSON.data;
    let date = new Date();
    component.fromDate = new Date(date.getTime() - (6 * 24 * 60 * 60 * 1000))
    component.toDate = new Date();
    component.loadChartData(EndpointCountByMapper);
  })

  it('should handle error 401', () => {
    component.handleError(errorStatus401);
  });

});
