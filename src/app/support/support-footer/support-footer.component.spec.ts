import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SupportFooterComponent } from './support-footer.component';
import { TranslateService } from './../../../app-services/translate.service';
import { SsoAuthService } from '../../shared/services/sso-auth.service'

describe('SupportFooterComponent', () => {
  let component: SupportFooterComponent;
  let fixture: ComponentFixture<SupportFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportFooterComponent ],
      imports:[RouterTestingModule,HttpClientTestingModule
],
      providers:[TranslateService,SsoAuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
