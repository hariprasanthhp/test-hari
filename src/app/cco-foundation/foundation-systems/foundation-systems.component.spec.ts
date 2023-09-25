import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';
import { FoundationCommonService } from '../cco-foundation-service/foundation-common.service';
import { FoundationHomeService } from '../foundation-home/foundation-home.service';

import { FoundationSystemsComponent } from './foundation-systems.component';

describe('FoundationSystemsComponent', () => {
  let component: FoundationSystemsComponent;
  let fixture: ComponentFixture<FoundationSystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundationSystemsComponent ],
      imports:[HttpClientTestingModule
, RouterTestingModule],
      providers:[TranslateService,SsoAuthService,
        FoundationCommonService,
        NgbModal,
        FoundationHomeService,
        NetopsServiceService,Title]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
