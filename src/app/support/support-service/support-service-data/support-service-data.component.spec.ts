import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SupportServiceDataComponent } from './support-service-data.component';

describe('SupportServiceDataComponent', () => {
  let component: SupportServiceDataComponent;
  let fixture: ComponentFixture<SupportServiceDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportServiceDataComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportServiceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
