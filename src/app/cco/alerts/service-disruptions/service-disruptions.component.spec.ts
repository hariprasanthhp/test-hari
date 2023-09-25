import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDisruptionsComponent } from './service-disruptions.component';

describe('ServiceDisruptionsComponent', () => {
  let component: ServiceDisruptionsComponent;
  let fixture: ComponentFixture<ServiceDisruptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDisruptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDisruptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
