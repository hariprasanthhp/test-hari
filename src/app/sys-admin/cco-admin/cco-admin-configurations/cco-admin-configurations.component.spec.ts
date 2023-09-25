import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../../services/common.service';
import { RegionApiService } from '../../services/region-api.service';

import { CcoAdminConfigurationsComponent } from './cco-admin-configurations.component';

describe('CcoAdminConfigurationsComponent', () => {
  let component: CcoAdminConfigurationsComponent;
  let fixture: ComponentFixture<CcoAdminConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcoAdminConfigurationsComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, DataTablesModule, FormsModule, RouterTestingModule, ReactiveFormsModule
      ],
      providers: [
        {
          provide: SsoAuthService, useValue: {
            getRedirectModule: jasmine.createSpy().and.returnValue(of('')),
          }
        },
        {
          provide: Title, useValue: {
            setTitle: jasmine.createSpy(),
          }
        },

        { provide: TranslateService, useClass: CustomTranslateService }
        , FormBuilder,
        {
          provide: NgbModal, useValue: {
            open: jasmine.createSpy(),
            dismissAll: jasmine.createSpy(),
          }
        },
        {
          provide: HttpClient, useValue: {
            get: jasmine.createSpy().and.returnValue(of({})),
          }
        },
        {
          provide: Router, useValue: {
            navigate: jasmine.createSpy(),
            navigateByUrl: jasmine.createSpy(),
            url: jasmine.createSpy(),
          }
        },
        {
          provide: CommonService, useValue: {
            currentPageAdder: jasmine.createSpy(),
          }
        },
        {
          provide: RegionApiService, useValue: {
            regionList: jasmine.createSpy().and.returnValue(of({ regions: { length: 5 } })),
            locationDelete: jasmine.createSpy().and.returnValue(of({})),
            locationUpdate: jasmine.createSpy().and.returnValue(of({})),
            locationAdd: jasmine.createSpy().and.returnValue(of({})),
            regionDelete: jasmine.createSpy().and.returnValue(of({})),
            regionUpdate: jasmine.createSpy().and.returnValue(of({})),
            regionAdd: jasmine.createSpy().and.returnValue(of([])),
            regionListCount: jasmine.createSpy().and.returnValue(of({ count: 12 })),
          }
        }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(CcoAdminConfigurationsComponent);
        component = fixture.componentInstance;
      });
  });

  // it('should create', () => {
  //   fixture.detectChanges();
  //   expect(component).toBeTruthy();
  // });

  // it('should load data', () => {
  //   //arrange
  //   spyOn(component, 'getRegionListCount');
  //   spyOn(component, 'loadRegionData');
  //   spyOn(component, 'tableLanguageOptions');
  //   //act
  //   fixture.detectChanges();
  //   //assert
  //   expect(component.getRegionListCount).toHaveBeenCalled();
  //   expect(component.loadRegionData).toHaveBeenCalled();
  //   expect(component.tableLanguageOptions).toHaveBeenCalled();
  // });

  it('should  get Region ListCount', () => {
    //arrange
    spyOn(component, 'newRedraw');
    //act
    component.getRegionListCount();
    //assert
    expect(component.totalCount).toEqual(12);
    expect(component.filteredCount).toEqual(12);
    expect(component.newRedraw).toHaveBeenCalled();

  });

  it('should  refresh CurrentPage', () => {
    //arrange
    spyOn(component, 'reload');
    //act
    component.refreshCurrentPage();
    //assert
    expect(component.searchText).toEqual('');
    expect(component.showResult).toBeFalsy();
    expect(component.filteredCount).toEqual(0);
    expect(component.totalCount).toEqual(12);
    expect(component.reload).toHaveBeenCalled();

  });

  it('should add Region', () => {
    //arrange
    spyOn(component, 'closeModal');
    spyOn(component, 'refreshCurrentPage');

    component.regionGroup = (component as any).formBuilder.group({
      regionName: ['chennai'],
      locationName: ['tamilnadu']
    });
    component.locationGroup = (component as any).formBuilder.group({
      locationName: ['tamilnadu']
    });

    //act
    component.addRegion();
    //assert
    expect((component as any).regionService.regionAdd).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalled();
    expect(component.refreshCurrentPage).toHaveBeenCalled();
  });

  it('should edit Region', () => {
    //arrange
    spyOn(component, 'closeModal');
    spyOn(component, 'refreshCurrentPage');

    component.regionGroup = (component as any).formBuilder.group({
      regionName: ['chennai'],
      locationName: ['tamilnadu']
    });
    component.locationGroup = (component as any).formBuilder.group({
      locationName: ['tamilnadu']
    });
    component.selectedRegion = { id: '1231' };

    //act
    component.editRegion();
    //assert
    expect((component as any).regionService.regionUpdate).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalled();
    expect(component.refreshCurrentPage).toHaveBeenCalled();
  });

  it('should delete Region', () => {
    //arrange
    spyOn(component, 'closeModal');
    spyOn(component, 'refreshCurrentPage');
    component.selectedRegion = { id: '1231' };

    //act
    component.deleteRegion();
    //assert
    expect((component as any).regionService.regionDelete).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalled();
    expect(component.refreshCurrentPage).toHaveBeenCalled();
  });
  it('should add Location', () => {
    //arrange
    spyOn(component, 'closeModal');
    spyOn(component, 'refreshCurrentPage');

    component.regionGroup = (component as any).formBuilder.group({
      regionName: ['chennai'],
      locationName: ['tamilnadu']
    });
    component.locationGroup = (component as any).formBuilder.group({
      locationName: ['tamilnadu']
    });
    component.selectedRegion = { id: '1231' };

    //act
    component.addLocation();
    //assert
    expect((component as any).regionService.locationAdd).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalled();
    expect(component.refreshCurrentPage).toHaveBeenCalled();
  });

  it('should edit Location', () => {
    //arrange
    spyOn(component, 'closeModal');
    spyOn(component, 'refreshCurrentPage');

    component.regionGroup = (component as any).formBuilder.group({
      regionName: ['chennai'],
      locationName: ['tamilnadu']
    });
    component.locationGroup = (component as any).formBuilder.group({
      locationName: ['tamilnadu']
    });
    component.selectedRegion = { id: '1231' };
    component.selectedLocation = { id: '1232' };
    //act
    component.editLocation();
    //assert
    expect((component as any).regionService.locationUpdate).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalled();
    expect(component.refreshCurrentPage).toHaveBeenCalled();
  });

  it('should delete Location', () => {
    //arrange
    spyOn(component, 'closeModal');
    spyOn(component, 'refreshCurrentPage');
    component.selectedRegion = { id: '1231' };
    component.selectedLocation = { id: '1232' };
    //act
    component.deleteLocation();
    //assert
    expect((component as any).regionService.locationDelete).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalled();
    expect(component.refreshCurrentPage).toHaveBeenCalled();
  });

  it('should get Filtered List Count', () => {
    //arrange
    spyOn(component, 'reload');
    //act
    component.getFilteredListCount();
    //assert
    expect((component as any).regionService.regionList).toHaveBeenCalled();
    expect(component.totalCount).toEqual(5);
    expect(component.reload).toHaveBeenCalled();
  });

});
