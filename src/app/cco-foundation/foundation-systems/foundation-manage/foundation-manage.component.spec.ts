import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { FoundationCommonService } from '../../cco-foundation-service/foundation-common.service';

import { FoundationManageComponent } from './foundation-manage.component';

describe('FoundationManageComponent', () => {
  let component: FoundationManageComponent;
  let fixture: ComponentFixture<FoundationManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundationManageComponent ],
      imports:[HttpClientTestingModule
, RouterTestingModule],
      providers:[TranslateService,FoundationCommonService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
