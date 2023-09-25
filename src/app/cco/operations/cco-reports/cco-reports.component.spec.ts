import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import { CcoReportsComponent } from './cco-reports.component';

describe('CcoReportsComponent', () => {
  let component: CcoReportsComponent;
  let fixture: ComponentFixture<CcoReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcoReportsComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      providers: [
        TranslateService, SsoAuthService]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(CcoReportsComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  // it('should initialized onInit', () => {
  //   component.ngOnInit();
  //   expect(component.language).toBeTruthy();
  //   expect(component.unmappedIPsAccess).toBeTruthy();
  // });
});
