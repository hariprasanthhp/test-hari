import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import { FoundationReportsComponent } from './reports.component';

describe('FoundationReportsComponent', () => {
  let component: FoundationReportsComponent;
  let fixture: ComponentFixture<FoundationReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoundationReportsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
, NgSelectModule],
      providers: [TranslateService,  SsoAuthService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
