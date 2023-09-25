import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FavoriteEndpointsComponent } from './favorite-endpoints.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { FavoritesApiService, FilterPresets } from '../favorites-api.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { maskString } from 'src/app/cco/shared/functions/cco-mask';
import { mockDeleteEndpoint, mockDeleteItem, mockFavoriteEndPoints, mockSampleFavorite, mockSaveFavorite, mockSelectedendpoint } from 'src/assets/mockdata/cco/traffic/shared/favouriteEndpoints.data';

describe('FavoriteEndpointsComponent', () => {
  let component: FavoriteEndpointsComponent;
  let fixture: ComponentFixture<FavoriteEndpointsComponent>;
  let cdRef: ChangeDetectorRef;
  let translateService: TranslateService;
  let favoritesApiService: FavoritesApiService;
  let commonService: CommonService;
  let dialogService: NgbModal;
  let router: Router;
  let httpMock: HttpTestingController;  
  let dtInstance: jasmine.SpyObj<DataTables.Api>;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteEndpointsComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [FavoritesApiService,NgbModal]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteEndpointsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    favoritesApiService = TestBed.inject(FavoritesApiService);
    dialogService = TestBed.inject(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch favoriteEndPoints ', () => {
    

    spyOn(favoritesApiService, 'getAllFavorites').and.returnValue(
      of(mockFavoriteEndPoints)
    );

    (component as any).viewAllEndPoints();

    fixture.detectChanges(); 

    expect(favoritesApiService.getAllFavorites).toHaveBeenCalledWith((component as any).settingType);
    expect(component.favoriteEndPoints).toEqual(mockFavoriteEndPoints);
  });

  it('should handle error response', () => {
    const mockError = new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error' });

    spyOn(favoritesApiService, 'getAllFavorites').and.returnValue(
      throwError(mockError)
    );
    (component as any).viewAllEndPoints();

    fixture.detectChanges(); 
  });
  
  
  it('should mask sensitive info in favoriteEndPoints', () => {
    component.showSensitiveInfo = false;
    component.favoriteEndPoints;
    component.processMaskNames();
    fixture.detectChanges();
    component.favoriteEndPoints.forEach((f) => {
      expect(f.settingName).toBe(maskString(f.settingName));
      expect(f.settingJsonTyped.endPointName).toBe(maskString(f.settingJsonTyped.endPointName));
    });
  });

  it('should get tableLanguageOptions', () => {
    const trans = (component as any).translateService;

    component.language = { fileLanguage: 'de_DE' };
    (component as any).tableLanguageOptions();
    expect(component.dtOptions.language).toEqual(trans.de_DE);

    component.language = { fileLanguage: 'fr' };
    (component as any).tableLanguageOptions();
    expect(component.dtOptions.language).toEqual(trans.fr);

    component.language = { fileLanguage: 'es' };
    (component as any).tableLanguageOptions();
    expect(component.dtOptions.language).toEqual(trans.es);

    component.language = { fileLanguage: 'en' };
    (component as any).tableLanguageOptions();
    expect(component.dtOptions.language).toEqual(undefined);
  });
  it('should call rerender', async () => {
    spyOn((component as any).dtTrigger,'next');
    await (component as any).reRender();
  });
  it('should call rerender', fakeAsync(() => {
    spyOn((component as any).dtTrigger, 'next');

    (component as any).reRender();

    tick(200);

  }));

  it('should call saveFavorite and update favoriteEndPoints ', () => {
   
    spyOn(favoritesApiService, 'saveFavorite').and.returnValue(of(mockSaveFavorite));
    component.saveEndPoint();

    expect(favoritesApiService.saveFavorite).toHaveBeenCalled();

    fixture.detectChanges();

    expect(component.favoriteEndPoints[0]).toEqual(mockSaveFavorite);

  });

  it('should handle error from saveFavorite', () => {
    const mockError = new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error' });

    spyOn(favoritesApiService, 'saveFavorite').and.returnValue(
      throwError(mockError)
    );
 


    component.saveEndPoint();

  
  });

  it('should deletableEndPoint correctly', () => {
    component.deleteEndPoint(mockDeleteEndpoint);

    expect(component.isDeleteSelected).toBe(true);
    expect(component.deletableEndPoint).toBe(mockDeleteEndpoint);
  });

  it(' call closeAlert', () => {
    spyOn(component, 'closeAlert');
    component.deleteEndPoint(mockDeleteItem);
    expect(component.closeAlert).toHaveBeenCalled();
  });
  it('should call deleteFavorite and update favoriteEndPoints ', () => {
    const mockId = 'e415d9e9-691c-40b6-816c-4f91d7c81015';

    const deleteFavoriteSpy = spyOn(favoritesApiService, 'deleteFavorite').and.returnValue(of(true));

    component.confirmDelete(mockId);

    expect(deleteFavoriteSpy).toHaveBeenCalledWith(mockId);

    fixture.detectChanges();
});

it('should navigate with query parameters', () => {
  

  spyOn(window.sessionStorage, 'setItem'); 
  const router = TestBed.inject(Router);
  spyOn(router, 'navigate');

  component.onSelectEndPoint(mockSelectedendpoint);

  expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
    'endpointName',
    mockSelectedendpoint.settingJsonTyped.endPointName
  );
});
it('should set isDeleteSelected to false and trigger reRender', () => {

  component.modalManageEndpoint();

  expect(component.isDeleteSelected).toBe(false);
  expect(component.loading).toBe(true);

  fixture.detectChanges();
});
it('should call viewAllEndPoints when showSensitiveInfo changes', () => {
  const changesWithValue: SimpleChanges = {
    showSensitiveInfo: {
      currentValue: true,
      previousValue: false,
      firstChange: false,
      isFirstChange: function (): boolean {
        throw new Error('Function not implemented.');
      }
    },
  };

  

  spyOn((component as any), 'viewAllEndPoints');

  component.ngOnChanges(changesWithValue);

  expect((component as any).viewAllEndPoints).toHaveBeenCalled();
});
it('should return true when both endPointId and endPointName are truthy', () => {
  component.endPointId = 'someId';
  component.endPointName = 'someName';

  const result = component.isEndPointPage;

  expect(result).toBe(true);
});
it('should return false when either endPointId or endPointName is falsy', () => {
  component.endPointId = 'someId';
  component.endPointName = null;

  const result1 = component.isEndPointPage;

  expect(result1).toBe(false);

  component.endPointId = null;
  component.endPointName = 'someName';

  const result2 = component.isEndPointPage;

  expect(result2).toBe(false);

  component.endPointId = null;
  component.endPointName = null;

  const result3 = component.isEndPointPage;

  expect(result3).toBe(false);
});
it('should return the selected endpoint when found in favoriteEndPoints', () => {
  

  component.endPointId = '001Id';

  component.favoriteEndPoints = [mockSampleFavorite];

  const result = component.selectedEndPoint;

  expect(result).toEqual(mockSampleFavorite);
});

it('should return undefined if endpoint  not found in favoriteEndPoints', () => {
  component.endPointId = 'nill';

  component.favoriteEndPoints = [];

  const result = component.selectedEndPoint;

  expect(result).toBeUndefined();
});

it('should set isDeleteSelected to false when cancelDelete is called', () => {
    component.isDeleteSelected = true;

  component.cancelDelete();

  expect(component.isDeleteSelected).toBe(false);
});
});
