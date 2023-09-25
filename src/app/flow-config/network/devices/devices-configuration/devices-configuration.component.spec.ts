import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesConfigurationComponent } from './devices-configuration.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('DevicesConfigurationComponent', () => {
  let component: DevicesConfigurationComponent;
  let fixture: ComponentFixture<DevicesConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],

      declarations: [ DevicesConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
