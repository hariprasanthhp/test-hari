import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPortalVisitorsComponent } from './customer-portal-visitors.component';
import { FormGroupDirective } from '@angular/forms';

describe('CustomerPortalVisitorsComponent', () => {
  let component: CustomerPortalVisitorsComponent;
  let fixture: ComponentFixture<CustomerPortalVisitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CustomerPortalVisitorsComponent
      ],
      providers: [
        FormGroupDirective
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPortalVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    component.loginRetentionChanged();
  });
});
