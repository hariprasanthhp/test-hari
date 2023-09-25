import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { LocationComponent } from './location.component';

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [{ provide: TranslateService, useClass: CustomTranslateService },

      {
        provide: SsoAuthService, useValue: {
        }
      }]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(LocationComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange

    //act
    fixture.detectChanges();
    //assert
    expect(component.menus[0].link).toEqual('realtime');
    expect(component.menus[1].link).toEqual('reports');
  });
});
