import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeComponent } from './realtime.component';
import { TranslateService } from 'src/app-services/translate.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('RealtimeComponent', () => {
  let component: RealtimeComponent;
  let fixture: ComponentFixture<RealtimeComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule
],
      declarations: [RealtimeComponent],
      providers: [TranslateService, SsoAuthService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
