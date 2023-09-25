import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederatedDashboardFooterComponent } from './federated-dashboard-footer.component';

describe('FederatedDashboardFooterComponent', () => {
  let component: FederatedDashboardFooterComponent;
  let fixture: ComponentFixture<FederatedDashboardFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FederatedDashboardFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FederatedDashboardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
