import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from '../services/common.service';
import { OrganizationsService } from '../services/organizations.service';
import { AddOrganizationComponent } from './add-organization.component';

describe('AddOrganizationComponent', () => {
  let component: AddOrganizationComponent;
  let fixture: ComponentFixture<AddOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrganizationComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [
        {
          provide: CommonService, useValue: {
            currentPageAdder: jasmine.createSpy(),
            pageErrorHandle: jasmine.createSpy().and.returnValue(''),
            pageScrollTop: jasmine.createSpy(),
          }
        },
        {
          provide: Router, useValue: {
            navigate: jasmine.createSpy(),

          }
        }, {
          provide: OrganizationsService, useValue: {
            AddOrg: jasmine.createSpy().and.returnValue(of({})),

          }
        }, { provide: TranslateService, useClass: CustomTranslateService },
        {
          provide: Title, useValue: {
            setTitle: jasmine.createSpy(),
          }
        }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AddOrganizationComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange
    //act
    fixture.detectChanges();
    //expect
    expect(component.success).toBeFalsy();
    expect(component.nameError).toBeFalsy();

  });

  it('should add New Org', () => {
    //arrange 
    spyOn(component, 'validation');
    //act
    component.addNewOrg();
    //assert
    expect(component.validation).toHaveBeenCalled();
    expect((component as any).api.AddOrg).toHaveBeenCalled();
    expect(component.loader).toBeFalsy();
    expect(component.successInfo).toEqual('Organization added Successfully');
    expect(component.success).toBeTruthy();
    expect((component as any).commonOrgService.pageScrollTop).toHaveBeenCalled();
  });
});
