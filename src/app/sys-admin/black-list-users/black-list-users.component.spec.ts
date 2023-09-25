import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { BlackListUsersService } from '../services/black-list-users.service';
import { CommonService } from '../services/common.service';

import { BlackListUsersComponent } from './black-list-users.component';

describe('BlackListUsersComponent', () => {
  let component: BlackListUsersComponent;
  let fixture: ComponentFixture<BlackListUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackListUsersComponent ],
      imports: [
       HttpClientTestingModule
, RouterTestingModule, DataTablesModule
      ],
      providers: [
        CommonService, SsoAuthService, NgbModal, BlackListUsersService, TranslateService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
