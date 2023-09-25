import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { FoundationManageModule } from '../../foundation-manage.module';

import { SystemAdvancedComponent } from './system-advanced.component';

describe('SystemAdvancedComponent', () => {
  let component: SystemAdvancedComponent;
  let fixture: ComponentFixture<SystemAdvancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemAdvancedComponent ],
      imports:[HttpClientTestingModule
, RouterTestingModule, FoundationManageModule],
      providers:[TranslateService,SsoAuthService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
