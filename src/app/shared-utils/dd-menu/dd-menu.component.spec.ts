import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import { DdMenuComponent } from './dd-menu.component';

describe('DdMenuComponent', () => {
  let component: DdMenuComponent;
  let fixture: ComponentFixture<DdMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DdMenuComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [SsoAuthService, TranslateService, CustomTranslateService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
