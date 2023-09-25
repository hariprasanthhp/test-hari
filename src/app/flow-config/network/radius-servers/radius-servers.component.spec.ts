import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { CommonFunctionsService } from '../../services/common-functions.service';
import { NetworkSubnetsApiService } from '../../services/network-subnets-api.service';

import { RadiusServersComponent } from './radius-servers.component';

describe('RadiusServersComponent', () => {
  let component: RadiusServersComponent;
  let fixture: ComponentFixture<RadiusServersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiusServersComponent ],
      imports: [
        RouterTestingModule, HttpClientTestingModule
, DataTablesModule, FormsModule
      ],
      providers: [
        SsoAuthService, CommonFunctionsService, NgbModal, CommonService, TranslateService, NetworkSubnetsApiService, Title
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiusServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
