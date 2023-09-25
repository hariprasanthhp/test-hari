import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { searchSubscriber, searchSubscriberNoRecords } from 'src/assets/mockdata/support/subscriber-search/subscribersearch';
import { DataServiceService } from '../data.service';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let service: DataServiceService;
  let sso: SsoAuthService;
  let router: Router;
  let fixture: ComponentFixture<SearchComponent>;
  let mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/support/home' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        RouterTestingModule, 
        HttpClientTestingModule
      ],
      providers: [
        DataServiceService, 
        SsoAuthService,
        { provide: Router, useValue: mockUrl }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(DataServiceService);
    sso = TestBed.inject(SsoAuthService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialized subscriber search onInit()', () => {
    spyOn(service, 'performSearch').and.returnValue(of(searchSubscriber));
    component.ngOnInit();
    // fixture.detectChanges();
  })

  it('should initialized subscriber search onInit()', () => {
    spyOn(service, 'performSearch').and.returnValue(of(searchSubscriberNoRecords));
    component.ngOnInit();
    // fixture.detectChanges();
  })

  it('subscriber search error onInit()', () => {
    spyOn(service, 'performSearch').and.returnValue(throwError(errorStatus401));
    component.ngOnInit();
    // fixture.detectChanges();
  })
});
