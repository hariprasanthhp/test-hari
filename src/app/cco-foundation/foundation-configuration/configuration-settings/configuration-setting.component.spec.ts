import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import { ConfigurationSettingComponent } from './configuration-setting.component';

describe('ConfigurationSettingComponent', () => {
  let component: ConfigurationSettingComponent;
  let fixture: ComponentFixture<ConfigurationSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationSettingComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule
, NgSelectModule],
      providers: [TranslateService,  SsoAuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
