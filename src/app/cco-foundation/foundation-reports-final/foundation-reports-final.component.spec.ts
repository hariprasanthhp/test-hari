import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';
import { FoundationHomeService } from '../foundation-home/foundation-home.service';

import { FoundationReportsFinalComponent } from './foundation-reports-final.component';

describe('FoundationReportsFinalComponent', () => {
  let component: FoundationReportsFinalComponent;
  let fixture: ComponentFixture<FoundationReportsFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundationReportsFinalComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule
, NgSelectModule],
      providers: [TranslateService, NgbModal, SsoAuthService, FoundationHomeService, NetopsServiceService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationReportsFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
