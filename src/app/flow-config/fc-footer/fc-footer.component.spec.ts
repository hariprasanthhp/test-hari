import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcFooterComponent } from './fc-footer.component';

describe('FcFooterComponent', () => {
  let component: FcFooterComponent;
  let fixture: ComponentFixture<FcFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FcFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
