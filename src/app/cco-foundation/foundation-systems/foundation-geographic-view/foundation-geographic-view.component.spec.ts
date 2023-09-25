import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { FoundationCommonService } from '../../cco-foundation-service/foundation-common.service';

import { FoundationGeographicViewComponent } from './foundation-geographic-view.component';

describe('FoundationGeographicViewComponent', () => {
  let component: FoundationGeographicViewComponent;
  let fixture: ComponentFixture<FoundationGeographicViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundationGeographicViewComponent ],
      imports:[HttpClientTestingModule
, RouterTestingModule],
      providers:[TranslateService,FoundationCommonService,Title]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationGeographicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
