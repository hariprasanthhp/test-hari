import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityExperienceComponent } from './quality-experience.component';

describe('QualityExperienceComponent', () => {
  let component: QualityExperienceComponent;
  let fixture: ComponentFixture<QualityExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
