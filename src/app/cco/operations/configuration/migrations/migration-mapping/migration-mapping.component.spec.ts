import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MigrationMappingComponent } from './migration-mapping.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { HttpClient } from '@angular/common/http';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';

describe('MigrationMappingComponent', () => {
  let component: MigrationMappingComponent;
  let fixture: ComponentFixture<MigrationMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MigrationMappingComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      providers: [
        TranslateService, SsoAuthService, HttpClient, WindowRefService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrationMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
