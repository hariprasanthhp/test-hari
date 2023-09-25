import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import { CcoNetworkOperationsComponent } from './cco-network-operations.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CcoNetworkOperationsComponent', () => {
  let component: CcoNetworkOperationsComponent;
  let fixture: ComponentFixture<CcoNetworkOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcoNetworkOperationsComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [
        TranslateService, SsoAuthService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoNetworkOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
