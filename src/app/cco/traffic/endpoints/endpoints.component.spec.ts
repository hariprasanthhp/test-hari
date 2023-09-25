import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { HighchartsChartModule } from 'highcharts-angular';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { scopes } from 'src/assets/mockdata/shared/scopes.data';
import { environment } from 'src/environments/environment';
import { WebsocketService } from '../../shared/services/websocket.service';
import { EndpointsComponent } from './endpoints.component';
import { RealtimeComponent } from './realtime/realtime.component';
import { ReportsComponent } from './reports/reports.component';

describe('EndpointsComponent', () => {
  let component: EndpointsComponent;
  let fixture: ComponentFixture<EndpointsComponent>;
  let translateService: TranslateService;
  let ssoAuthService: SsoAuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndpointsComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'cco/traffic/endpoints/realtime', component: RealtimeComponent},
          {path: 'cco/traffic/endpoints/reports', component: ReportsComponent},
        ]),
        HttpClientTestingModule,
        CommonModule,
        HighchartsChartModule,
        NgSelectModule
      ],
      providers: [
        TranslateService,
        WebsocketService,
        SsoAuthService
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(EndpointsComponent);
      component = fixture.componentInstance;
      translateService = TestBed.inject(TranslateService);
      ssoAuthService = TestBed.inject(SsoAuthService);
      fixture.detectChanges();
    });
  });

  it('should initialized ngOnInit()', () => {
    spyOn(ssoAuthService, 'getScopes').and.returnValue(scopes);
    let englishJSON = new EnglishJSON;
    translateService.selectedLanguage.next(englishJSON.data);
    component.ngOnInit();
    environment.VALIDATE_SCOPE = 'true';
    component.ngOnInit();
    component.ngOnDestroy();
  });

  it('goToRealtime and goToReports', () => {
    component.goToReports();
    component.goToRealtime();
  });

});
