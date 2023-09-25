import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BandwidthTierComponent } from './bandwidth-tier.component';

describe('BandwidthTierComponent', () => {
  let component: BandwidthTierComponent;
  let fixture: ComponentFixture<BandwidthTierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BandwidthTierComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandwidthTierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
