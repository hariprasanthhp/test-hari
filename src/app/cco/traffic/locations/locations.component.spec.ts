import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { scopes } from 'src/assets/mockdata/shared/scopes.data';
import { environment } from 'src/environments/environment';

import { LocationsComponent } from './locations.component';

describe('LocationsComponent', () => {
  let component: LocationsComponent;
  let fixture: ComponentFixture<LocationsComponent>;
  let translateService: TranslateService;
  let ssoAuthService: SsoAuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationsComponent],
      imports: [
        RouterTestingModule, 
        HttpClientTestingModule
      ],
      providers: [
        TranslateService, 
        SsoAuthService
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LocationsComponent);
        translateService = TestBed.inject(TranslateService);
        ssoAuthService = TestBed.inject(SsoAuthService);
        component = fixture.componentInstance; 
      });
  });

  it('should initialized ngOnInit()', () => {
    spyOn(ssoAuthService, 'getScopes').and.returnValue(scopes);
    let englishJSON = new EnglishJSON;
    translateService.selectedLanguage.next(englishJSON.data);
    component.ngOnInit();
    environment.VALIDATE_SCOPE = 'true';
    component.ngOnInit();
    component.ngOnDestroy();
  });


});
