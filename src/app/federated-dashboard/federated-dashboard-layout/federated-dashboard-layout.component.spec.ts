import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederatedDashboardLayoutComponent } from './federated-dashboard-layout.component';

describe('FederatedDashboardLayoutComponent', () => {
  let component: FederatedDashboardLayoutComponent;
  let fixture: ComponentFixture<FederatedDashboardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FederatedDashboardLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FederatedDashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
