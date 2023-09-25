import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterService } from 'src/app-services/routing.services';
import { TranslateService } from 'src/app-services/translate.service';
import { WhitelabelService } from 'src/app/shad/service/whitelabel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../../services/common.service';
import { OrganizationApiService } from '../../services/organization-api.service';

import { CommandiqComponent } from './commandiq.component';

describe('CommandiqComponent', () => {
  let component: CommandiqComponent;
  let fixture: ComponentFixture<CommandiqComponent>;
  let router: Router;
  let service: WhitelabelService;
  let languageService: TranslateService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandiqComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [CommonService, RouterService, SsoAuthService, OrganizationApiService, TranslateService, Title]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandiqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
