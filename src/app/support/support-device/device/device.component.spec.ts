import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { alldevices, devicedetail } from 'src/assets/mockdata/support/devices/devices';
import { DeviceService } from '../service/device.service';

import { DeviceComponent } from './device.component';

describe('DeviceComponent', () => {
  let component: DeviceComponent;
  let fixture: ComponentFixture<DeviceComponent>;
  let deviceService: DeviceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
],
      providers: [TranslateService, SsoAuthService, DeviceService]
    })
      .compileComponents()
      .then(()=>{
        deviceService = TestBed.inject(DeviceService);
        fixture= TestBed.createComponent(DeviceComponent);
        component= fixture.componentInstance;
        fixture.detectChanges();
      })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialized device onInit()', () => {
    component.ngOnInit();
    expect(component.deviceReleaseDatecal).toBeTruthy();
    fixture.detectChanges();
  })

  it('working deviceReleaseDatecal', () => {
    component.ngOnInit();
    component.currentTime = 1665739315489;
    component.deviceReleaseDatecal(1665668715000);
    console.log(component.remainingdate);
    expect(component.remainingdate).toBeTruthy();
    fixture.detectChanges();
  })
  
});
