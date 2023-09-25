import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederatedDashboardHeaderComponent } from './federated-dashboard-header.component';

describe('FederatedDashboardHeaderComponent', () => {
  let component: FederatedDashboardHeaderComponent;
  let fixture: ComponentFixture<FederatedDashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FederatedDashboardHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FederatedDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
