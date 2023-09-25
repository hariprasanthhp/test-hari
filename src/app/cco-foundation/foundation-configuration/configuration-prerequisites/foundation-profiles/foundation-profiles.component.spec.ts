import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationProfilesComponent } from './foundation-profiles.component';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FoundationProfilesComponent', () => {
  let component: FoundationProfilesComponent;
  let fixture: ComponentFixture<FoundationProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundationProfilesComponent ],
      imports:[RouterTestingModule, HttpClientTestingModule],
      providers: [TranslateService,  SsoAuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
