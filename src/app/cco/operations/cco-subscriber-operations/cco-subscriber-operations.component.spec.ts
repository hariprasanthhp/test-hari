import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import { CcoSubscriberOperationsComponent } from './cco-subscriber-operations.component';

describe('CcoSubscriberOperationsComponent', () => {
  let component: CcoSubscriberOperationsComponent;
  let fixture: ComponentFixture<CcoSubscriberOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcoSubscriberOperationsComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [
        TranslateService, SsoAuthService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoSubscriberOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
