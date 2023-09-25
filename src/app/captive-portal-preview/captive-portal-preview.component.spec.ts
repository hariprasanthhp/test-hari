import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptivePortalPreviewComponent } from './captive-portal-preview.component';

describe('CaptivePortalPreviewComponent', () => {
  let component: CaptivePortalPreviewComponent;
  let fixture: ComponentFixture<CaptivePortalPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptivePortalPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptivePortalPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
