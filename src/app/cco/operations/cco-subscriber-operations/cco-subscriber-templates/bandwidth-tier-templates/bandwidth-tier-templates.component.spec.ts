import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BandwidthTierTemplatesComponent } from './bandwidth-tier-templates.component';

describe('BandwidthTierTemplatesComponent', () => {
  let component: BandwidthTierTemplatesComponent;
  let fixture: ComponentFixture<BandwidthTierTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BandwidthTierTemplatesComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandwidthTierTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
