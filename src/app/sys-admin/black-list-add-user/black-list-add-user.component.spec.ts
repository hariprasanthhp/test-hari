import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { BlackListUsersService } from '../services/black-list-users.service';
import { CommonService } from '../services/common.service';
import { OrganizationApiService } from '../services/organization-api.service';

import { BlackListAddUserComponent } from './black-list-add-user.component';

describe('BlackListAddUserComponent', () => {
  let component: BlackListAddUserComponent;
  let fixture: ComponentFixture<BlackListAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackListAddUserComponent ],
      imports: [
       HttpClientTestingModule
, RouterTestingModule,NgSelectModule, FormsModule
      ],
      providers: [
        CommonService, SsoAuthService, CustomTranslateService, BlackListUsersService, OrganizationApiService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackListAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
