import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrositePreviewComponent } from './microsite-preview.component';

describe('MicrositePreviewComponent', () => {
  let component: MicrositePreviewComponent;
  let fixture: ComponentFixture<MicrositePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrositePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrositePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
