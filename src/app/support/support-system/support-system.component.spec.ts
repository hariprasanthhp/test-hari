import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import { SupportSystemComponent } from './support-system.component';
import { SupportSystemModule } from './support-system.module';

describe('SupportSystemComponent', () => {
  let component: SupportSystemComponent;
  let fixture: ComponentFixture<SupportSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportSystemComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
, SupportSystemModule
      ],
      providers: [SsoAuthService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
