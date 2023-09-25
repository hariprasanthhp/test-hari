import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonHistoryFilterComponent } from './common-history-filter.component';

describe('CommonHistoryFilterComponent', () => {
  let component: CommonHistoryFilterComponent;
  let fixture: ComponentFixture<CommonHistoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonHistoryFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonHistoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
