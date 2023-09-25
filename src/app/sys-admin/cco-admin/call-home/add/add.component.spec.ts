import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { GeoCodingService } from 'src/app/shared/geo-coding.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WorkflowService } from 'src/app/support/netops-management/operations/services/workflow.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { AddComponent } from './add.component';
import { IssueService } from 'src/app/cco/issues/service/issue.service';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule
        , RouterTestingModule, NgSelectModule
      ],
      providers: [
        FormBuilder, {
          provide: HttpClient, useValue: {
            get: () => of([{}]),
            post: jasmine.createSpy().and.returnValue(of({})),
            put: jasmine.createSpy().and.returnValue(of({})),

          }
        },
        {
          provide: SsoAuthService, useValue: {
            getOrganizationID: jasmine.createSpy().and.returnValue('1222'),
            getOrgId: jasmine.createSpy().and.returnValue(''),
            getScopes: () => ({ 'cloud.rbac.coc.operations.systemonboarding.axoscallhome': 'write' })
          }
        },
        {
          provide: Router, useValue: {
            navigate: jasmine.createSpy(),
            url: jasmine.createSpy(),
          }
        }, { provide: TranslateService, useClass: CustomTranslateService },
        {
          provide: CommonService, useValue: {
            pageErrorHandle: jasmine.createSpy().and.returnValue(''),
          }
        },
        {
          provide: GeoCodingService, useValue: {
            getLatLonglocations: jasmine.createSpy().and.returnValue(of({})),
          }
        },
        {
          provide: WorkflowService, useValue: {
            enforceMinMax: jasmine.createSpy().and.returnValue(''),
          }
        },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: { paramMap: { get: jasmine.createSpy().and.returnValue('1111') } },
          }
        },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AddComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange  
    spyOn(component, 'getRegions');
    //act
    fixture.detectChanges();
    //assert
    expect(component.ORG_ID).toEqual('1222');
    expect((component as any).geoService.getLatLonglocations).toHaveBeenCalledWith('chennai');
    expect(component.id).toEqual('1111');
    expect(component.isEditPage).toBeTruthy();
    expect(component.getRegions).toHaveBeenCalled();
  });

  // it('should get Regions', () => {
  //   //arrange
  //   spyOn((<any>component).http, 'get').and.returnValue(of({ regions: ['chennnai'] }));

  //   //act
  //   component.getRegions();
  //   //assert
  //   expect((component as any).http.get).toHaveBeenCalled();
  // });
  it('should load LocationValue', () => {
    //arrange
    spyOn((<any>component).http, 'get').and.returnValue(of({ regions: ['chennnai'] }));
    component.callHomeForm.controls.region.setValue('chennnai');
    const eve = '';
    //act
    component.loadLocationValue(eve);
    //assert
    expect((component as any).http.get).toHaveBeenCalled();
    expect(component.locationDataArray).toEqual({ regions: ['chennnai'] });
  });

  it('should save', () => {
    //arrange
    spyOn((<any>component).http, 'get').and.returnValue(of({}));
    const Param = { region: '', location: '' };
    //act
    component.save(Param);
    //assert
    expect((component as any).http.get).toHaveBeenCalled();
    expect(component.validId).toBeFalsy();
  });

});
