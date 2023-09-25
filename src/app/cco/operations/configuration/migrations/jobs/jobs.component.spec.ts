import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsComponent } from './jobs.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DownloadService } from 'src/app/shared/services/download.service';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobsComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        {
          provide: SsoAuthService, useValue: {
            hasPageAccess$: of({ access: true }),
            getScopes: () => ({ "cloud.rbac.coc.operations.configuration.axosmigration": ["read", "write"] }),
            getOrgId: () => ""
          }
        }, WindowRefService,
        { provide: TranslateService, useClass: CustomTranslateService }
        ,
        {
          provide: Router, useValue: {
            navigate: () => "",
          }
        },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(JobsComponent);
        component = fixture.componentInstance;
      });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load ngOnInit', () => {
    //arrange
    spyOn(component, 'getProfileList');
    spyOn(component, 'getJobList');
    //act
    component.ngOnInit();
    //assert
    expect(component.getProfileList).toHaveBeenCalled();
    expect(component.getJobList).toHaveBeenCalled();
  });


  it('should load ngOnDestroy', () => {
    //arrange
    (component as any).languageSubject = { unsubscribe: () => { } };
    //act
    component.ngOnDestroy();
  });
});
