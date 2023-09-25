import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsDbComponent } from './cms-db.component';

describe('CmsDbComponent', () => {
  let component: CmsDbComponent;
  let fixture: ComponentFixture<CmsDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsDbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
