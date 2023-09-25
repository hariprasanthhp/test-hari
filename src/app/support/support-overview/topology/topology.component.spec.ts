import { HttpClient
 } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from '../../data.service';
import { SharedModule } from '../../shared/shared.module';

import { TopologyComponent } from './topology.component';

describe('TopologyComponent', () => {
  let component: TopologyComponent;
  let fixture: ComponentFixture<TopologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopologyComponent],
      imports: [HttpClientTestingModule
, RouterTestingModule, SharedModule, FormsModule, ReactiveFormsModule],
      providers: [DataServiceService, TranslateService, HttpClient, NgxSpinnerService, SsoAuthService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
