import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';

import { ProfileDetailDeviceComponent } from './profile-detail-device.component';

describe('ProfileDetailDeviceComponent', () => {
  let component: ProfileDetailDeviceComponent;
  let fixture: ComponentFixture<ProfileDetailDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDetailDeviceComponent ],
      imports:[RouterTestingModule,HttpClientTestingModule
],
      providers:[TranslateService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDetailDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
