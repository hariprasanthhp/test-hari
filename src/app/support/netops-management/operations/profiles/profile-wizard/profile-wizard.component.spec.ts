import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ProfileComponent } from 'src/app/support/support-application/experience-iq/profile/profile.component';
import { EnglishJSON } from 'src/assets/language/english.service';
import { SCOPES } from 'src/assets/mockdata/shared/services/scopes';
import { categoryConfigData, innerProfileCategoryData, profileConfigData, profiles, saveprofileData, selectedCategory } from 'src/assets/mockdata/support/netops-management/operations/profiles/profiles.data';
import { environment } from 'src/environments/environment';
import { OperationsModule } from '../../operations.module';
import { CategoryConfigurationService } from '../../services/category-config.service';
import { ProfileService } from '../../services/profile.service';
import { ProfileWizardComponent } from './profile-wizard.component';

describe('ProfileWizardComponent', () => {
  let component: ProfileWizardComponent;
  let fixture: ComponentFixture<ProfileWizardComponent>;
  let profileService: ProfileService;
  let categoryConfigService: CategoryConfigurationService;
  let languageService: TranslateService;
  let route: ActivatedRoute;
  let router: Router;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileWizardComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule, OperationsModule,
        RouterTestingModule.withRoutes([
          { path: 'support/netops-management/operations/profiles', component: ProfileComponent },
        ]),
      ],
      providers: [
        TranslateService, SsoAuthService, CategoryConfigurationService, ProfileService
      ]
    })
      .compileComponents().then(() => {
        profileService = TestBed.inject(ProfileService);
        categoryConfigService = TestBed.inject(CategoryConfigurationService);
        fixture = TestBed.createComponent(ProfileWizardComponent);
        languageService = TestBed.inject(TranslateService);
        component = fixture.componentInstance;
        component.orgId = "470053";
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        httpTestingController = TestBed.inject(HttpTestingController);



        fixture.detectChanges();
        localStorage.setItem('calix.scopes', JSON.stringify(SCOPES));
      });
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ProfileWizardComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    let eng = new EnglishJSON;
    languageService.selectedLanguage.next(of(eng));
    environment.VALIDATE_SCOPE = "true";
    spyOn(categoryConfigService, 'categoryConfigData').and.returnValue(of(profileConfigData))
    spyOn(categoryConfigService, 'innerProfileCategory').and.returnValue(of(innerProfileCategoryData))


    component.ngOnInit();


    expect(component).toBeTruthy();
  });

  it('should save/updtate profile', () => {
    let obj = {
      "_id": "5f33aef0-09c2-4887-8c9d-ec153ab46427"
    }
    component.isNewRecord = true;
    component.addProfileObj = saveprofileData
    spyOn(profileService, 'addProfile').and.returnValue(of(obj))
    spyOn(component, 'onSave').and.callThrough();
    component.onSave();
    //console.log(component.profileID)
    expect(component.profileID._id).toBe('5f33aef0-09c2-4887-8c9d-ec153ab46427', "Wrong Id");
    expect(component.onSave).toHaveBeenCalled();
    expect(component.onSave).toHaveBeenCalledTimes(1);
  });
  it('should get profiles data', () => {
    spyOn(profileService, 'getProfileList').and.returnValue(of(profiles));
    spyOn(component, 'getProfileData').and.callThrough();
    component.getProfileData();
    expect(component.profileTableData).toBeTruthy("No data available");
    expect(component.profileTableData?.length).toBe(1, "Length is wrong");
    expect(component.profileTableData[0]?.configurations[0].category).toMatch("Data Service");
  });
  it('should patchValue', () => {
    spyOn(component, 'patchValue').and.callThrough();
    component.patchValue();
    expect(component.patchValue).toHaveBeenCalled();
    expect(component.patchValue).toHaveBeenCalledTimes(1);
  });
  // it('should getCategoryObj', () => {
  //   component.categoryConfigData = categoryConfigData
  //   spyOn(component, 'getCategoryObj').and.callThrough();

  //   component.getCategoryObj(selectedCategory);
  //   expect(component.getCategoryObj).toHaveBeenCalled();
  //   expect(component.getCategoryObj).toHaveBeenCalledTimes(1);
  // });
});
