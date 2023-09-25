import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from '../shared/services/sso-auth.service';

import { CcoComponent } from './cco.component';
import { CcoModule } from './cco.module';
import { HealthService } from './health/service/health.service';
import { RealtimeComponent } from './issues/realtime/realtime.component';
import { WebsocketService } from './shared/services/websocket.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CcoComponent', () => {
  let component: CcoComponent;
  let fixture: ComponentFixture<CcoComponent>;
  let router: Router;
  let sso: SsoAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcoComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        CcoModule
      ],
      providers: [
        TranslateService,
        SsoAuthService,
        HealthService,
        WebsocketService,
        Title
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CcoComponent);
        router = TestBed.inject(Router);
        sso = TestBed.inject(SsoAuthService);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  });

  it('should initialize', () => {
    // spyOnProperty(router, 'url', 'get').and.returnValue('/cco/traffic/realtime')
    spyOn(component, 'verifyTOS');
    component.ngOnInit();
   // expect(component.menus.home).toBeTrue();
    expect(component.verifyTOS).toHaveBeenCalled();
  });

  it('verify TOS', () => {
    spyOn(sso, 'isCcoTermsAccept').and.returnValue(true)
    component.verifyTOS();
    expect(component.tosAgreed).toBeTrue();
  });

});
