import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterService } from 'src/app-services/routing.services';
import { TranslateService } from 'src/app-services/translate.service';
import { WhitelabelService } from 'src/app/shad/service/whitelabel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../../services/common.service';
import { OrganizationApiService } from '../../services/organization-api.service';

import { CommandiqCreateComponent } from './commandiq-create.component';

describe('CommandiqCreateComponent', () => {
  let component: CommandiqCreateComponent;
  let fixture: ComponentFixture<CommandiqCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandiqCreateComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [CommonService, WhitelabelService, RouterService, SsoAuthService, OrganizationApiService, TranslateService, Title]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandiqCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
