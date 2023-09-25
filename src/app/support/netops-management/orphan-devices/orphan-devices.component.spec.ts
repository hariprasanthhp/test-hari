import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { DataServiceService } from '../../data.service';

import { OrphanDevicesComponent } from './orphan-devices.component';
import { OrphandevicesService } from './orphandevices.service';

describe('OrphanDevicesComponent', () => {
  let component: OrphanDevicesComponent;
  let fixture: ComponentFixture<OrphanDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrphanDevicesComponent],
      imports: [RouterTestingModule,HttpClientTestingModule],
      providers: [TranslateService, OrphandevicesService, SsoAuthService, DateUtilsService,
        DataServiceService, CommonService, Title]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrphanDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
