import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { SCOPES } from 'src/assets/mockdata/shared/services/scopes';
import { categoryConfigData } from 'src/assets/mockdata/support/netops-management/operations/profiles/profiles.data';
import { environment } from 'src/environments/environment';
import { CategoryConfigurationService } from '../../../services/category-config.service';
import { ProfileService } from '../../../services/profile.service';

import { ProfileBuildWizardComponent } from './profile-build-wizard.component';

describe('ProfileBuildWizardComponent', () => {
  let component: ProfileBuildWizardComponent;
  let fixture: ComponentFixture<ProfileBuildWizardComponent>;

  let profileService: CategoryConfigurationService;
  let languageService: TranslateService;
  let route: ActivatedRoute;
  let router: Router;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileBuildWizardComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [
        TranslateService, CategoryConfigurationService
      ]
    })
      .compileComponents().then(() => {
        profileService = TestBed.inject(CategoryConfigurationService);
        fixture = TestBed.createComponent(ProfileBuildWizardComponent);
        languageService = TestBed.inject(TranslateService);
        component = fixture.componentInstance;
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
        localStorage.setItem('calix.scopes', JSON.stringify(SCOPES));
      });
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ProfileBuildWizardComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });


  it('should create', () => {
    let eng = new EnglishJSON;
    languageService.selectedLanguage.next(of(eng));
    environment.VALIDATE_SCOPE = "true";
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
  it('should onaddCategClicked', () => {
    component.categoryConfigData = categoryConfigData
    spyOn(component, 'onaddCategClicked').and.callThrough();
    component.onaddCategClicked();
    expect(component.onaddCategClicked).toHaveBeenCalled();
    expect(component.onaddCategClicked).toHaveBeenCalledTimes(1);
  });
  it('should categoryChange', () => {
    component.categoryConfigData = categoryConfigData
    spyOn(component, 'categoryChange').and.callThrough();
    component.categoryChange();
    expect(component.categoryChange).toHaveBeenCalled();
    expect(component.categoryChange).toHaveBeenCalledTimes(1);
  });
  it('should deleteCategory', () => {
    component.categoryConfigData = categoryConfigData
    spyOn(component, 'deleteCategory').and.callThrough();
    component.deleteCategory(0, 'DHCP Server');
    expect(component.deleteCategory).toHaveBeenCalled();
    expect(component.deleteCategory).toHaveBeenCalledTimes(1);
  });
  it('should getCategoryObj', () => {
    component.categoryConfigData = categoryConfigData
    spyOn(component, 'getCategoryObj').and.callThrough();
    component.getCategoryObj();
    expect(component.getCategoryObj).toHaveBeenCalled();
    expect(component.getCategoryObj).toHaveBeenCalledTimes(1);
  });

});
